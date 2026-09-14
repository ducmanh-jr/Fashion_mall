import assert from "node:assert";
import { Migrator } from "../src/database/migrator.js";
import { AuthService } from "../src/services/auth.service.js";
import { ProductService } from "../src/services/product.service.js";
import { CartService } from "../src/services/cart.service.js";
import { OrderService } from "../src/services/order.service.js";
import { db } from "../src/database/connection.js";

async function runE2ETests() {
  console.log("==========================================================");
  console.log("🚀 CHẠY AUTOMATED E2E INTEGRATION TEST SUITE (TypeScript)");
  console.log("==========================================================");

  let passed = 0;
  let total = 0;

  function test(name: string, fn: () => void | Promise<void>) {
    total++;
    try {
      fn();
      passed++;
      console.log(`  ✅ [PASS] ${name}`);
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  async function asyncTest(name: string, fn: () => Promise<void>) {
    total++;
    try {
      await fn();
      passed++;
      console.log(`  ✅ [PASS] ${name}`);
    } catch (err: any) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  // 1. Database & Migrations
  test("CSDL: Migration up & seed nạp đầy đủ bảng và dữ liệu mẫu", () => {
    Migrator.up();
    Migrator.seed();
    const tables = db.prepare("SELECT count(*) as cnt FROM sqlite_master WHERE type='table'").get() as { cnt: number };
    assert(tables.cnt >= 10, "Cần có ít nhất 10 bảng CSDL");
  });

  // 2. Auth Service
  let testUserToken = "";
  let testUserId = 0;
  const testEmail = `test_${Date.now()}@fashionmall.com`;

  await asyncTest("Auth: Đăng ký tài khoản mới và băm mật khẩu", async () => {
    const res = await AuthService.register({
      full_name: "Test Developer",
      email: testEmail,
      password: "Password123@",
      phone: "0912345678"
    });
    assert(res.user.id !== undefined, "User ID phải tồn tại");
    assert(res.token && res.token.length > 20, "JWT Token phải hợp lệ");
    testUserId = res.user.id!;
  });

  await asyncTest("Auth: Đăng nhập với mật khẩu đúng và trả về JWT Token", async () => {
    const res = await AuthService.login({
      email: testEmail,
      password: "Password123@"
    });
    assert(res.user.email === testEmail, "Email trả về phải khớp");
    assert(res.token, "Token phải tồn tại");
    testUserToken = res.token;
  });

  await asyncTest("Auth: Đăng nhập với mật khẩu sai phải ném ngoại lệ", async () => {
    let threw = false;
    try {
      await AuthService.login({
        email: testEmail,
        password: "WrongPassword"
      });
    } catch {
      threw = true;
    }
    assert(threw, "Phải bắt lỗi sai mật khẩu");
  });

  // 3. Product Service
  test("Catalog: Lấy danh sách sản phẩm và phân trang", () => {
    const res = ProductService.getProducts({ page: 1, limit: 10 });
    assert(res.products.length > 0, "Phải có sản phẩm mẫu trong CSDL");
    assert(res.total >= res.products.length, "Total phải lớn hơn hoặc bằng số lượng trả về");
    assert(res.products[0].variants !== undefined, "Sản phẩm phải có biến thể");
  });

  test("Catalog: Lọc sản phẩm theo thương hiệu (Brand)", () => {
    const res = ProductService.getProducts({ brand_id: 1 }); // Nike
    assert(res.products.length > 0, "Phải tìm thấy sản phẩm Nike");
    for (const p of res.products) {
      assert.strictEqual(p.brand_id, 1, "Tất cả sản phẩm phải thuộc Brand ID 1");
    }
  });

  test("Catalog: Lấy danh mục (Categories) và thương hiệu (Brands)", () => {
    const categories = ProductService.getCategories();
    const brands = ProductService.getBrands();
    assert(categories.length > 0, "Phải có danh mục");
    assert(brands.length > 0, "Phải có thương hiệu");
  });

  // 4. Cart Service
  test("Cart: Thêm sản phẩm vào giỏ hàng và tính toán tổng tiền", () => {
    const products = ProductService.getProducts();
    const firstVariant = products.products[0].variants![0];

    const cart = CartService.addToCart(testUserId, {
      variant_id: firstVariant.id,
      quantity: 2
    });

    assert(cart.items.length === 1, "Giỏ hàng phải có 1 mục");
    assert.strictEqual(cart.items[0].quantity, 2, "Số lượng trong giỏ phải là 2");
    assert(cart.subtotal > 0, "Subtotal phải lớn hơn 0");
    assert(cart.total > cart.subtotal, "Total phải bao gồm thuế và phí ship");
  });

  test("Cart: Cập nhật số lượng mặt hàng trong giỏ", () => {
    let cart = CartService.getCart(testUserId);
    const itemId = cart.items[0].id;

    cart = CartService.updateQuantity(testUserId, itemId, { quantity: 1 });
    assert.strictEqual(cart.items[0].quantity, 1, "Số lượng sau cập nhật phải là 1");
  });

  // 5. Order Service
  test("Order: Tạo đơn hàng mới từ giỏ hàng và trừ tồn kho", () => {
    const cartBefore = CartService.getCart(testUserId);
    const variantId = cartBefore.items[0].variant_id;
    const variantBefore = db.prepare("SELECT stock_quantity FROM Product_Variants WHERE id = ?").get(variantId) as { stock_quantity: number };

    const order = OrderService.createOrder(testUserId, {
      customer_name: "Test Developer",
      customer_phone: "0912345678",
      shipping_address: "123 Đường Thời Trang, Hà Nội",
      payment_method: "COD",
      note: "Giao giờ hành chính"
    });

    assert(order.id > 0, "Order ID phải được sinh tự động");
    assert(order.order_code.startsWith("ORD-"), "Mã đơn hàng phải bắt đầu bằng ORD-");
    assert.strictEqual(order.status, "PENDING", "Trạng thái ban đầu phải là PENDING");

    // Stock check
    const variantAfter = db.prepare("SELECT stock_quantity FROM Product_Variants WHERE id = ?").get(variantId) as { stock_quantity: number };
    assert.strictEqual(variantAfter.stock_quantity, variantBefore.stock_quantity - 1, "Tồn kho phải giảm đi 1");

    // Cart cleared check
    const cartAfter = CartService.getCart(testUserId);
    assert.strictEqual(cartAfter.items.length, 0, "Giỏ hàng phải được làm trống sau khi đặt hàng");
  });

  test("Order: Tra cứu lịch sử đơn hàng của người dùng", () => {
    const orders = OrderService.getOrdersByUser(testUserId);
    assert(orders.length >= 1, "Người dùng phải có ít nhất 1 đơn hàng");
    assert(orders[0].items !== undefined && orders[0].items.length > 0, "Đơn hàng phải chứa chi tiết sản phẩm");
  });

  test("Order: Hủy đơn hàng và tự động hoàn tồn kho", () => {
    const orders = OrderService.getOrdersByUser(testUserId);
    const orderId = orders[0].id;
    const variantId = orders[0].items![0].variant_id;
    const variantBefore = db.prepare("SELECT stock_quantity FROM Product_Variants WHERE id = ?").get(variantId) as { stock_quantity: number };

    const cancelledOrder = OrderService.cancelOrder(testUserId, orderId);
    assert.strictEqual(cancelledOrder.status, "CANCELLED", "Trạng thái phải là CANCELLED");

    const variantAfter = db.prepare("SELECT stock_quantity FROM Product_Variants WHERE id = ?").get(variantId) as { stock_quantity: number };
    assert.strictEqual(variantAfter.stock_quantity, variantBefore.stock_quantity + 1, "Tồn kho phải được hoàn lại");
  });

  console.log("==========================================================");
  console.log(`🎯 KẾT QUẢ KIỂM THỬ: ${passed}/${total} TEST CASES PASS (${Math.round((passed/total)*100)}%)`);
  console.log("==========================================================");

  if (passed === total) {
    console.log("✨ TẤT CẢ CÁC MODULE TYPESCRIPT HOẠT ĐỘNG HOÀN HẢO!");
  } else {
    process.exit(1);
  }
}

runE2ETests();
