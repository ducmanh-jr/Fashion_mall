import { db, queryAll, queryOne, execute } from "../database/connection.js";
import {
  ShopProfile,
  UpdateShopDTO,
  SellerProductItem,
  CreateProductDTO,
  UpdateProductDTO,
  InventoryItem,
  SellerOrderItem,
  ShippingChannel,
  PromotionItem,
  CreatePromotionDTO,
  SellerWalletInfo,
  ReviewItem,
  DashboardStats,
  AIDescriptionRequest,
  AIDescriptionResponse
} from "../types/seller.types.js";

export class SellerService {
  /**
   * 1. Dashboard Overview Stats (Module 2)
   */
  static getDashboardStats(sellerId: number = 1): DashboardStats {
    const revenueRow = queryOne<{ total: number }>(
      `SELECT COALESCE(SUM(total_amount), 0) as total 
       FROM Orders 
       WHERE status = 'COMPLETED'`
    );
    const totalRevenue = revenueRow ? Number(revenueRow.total) : 0;

    const todayRow = queryOne<{ total: number }>(
      `SELECT COALESCE(SUM(total_amount), 0) as total 
       FROM Orders 
       WHERE status = 'COMPLETED' AND date(created_at) = date('now')`
    );
    const todayRevenue = todayRow ? Number(todayRow.total) : 0;

    const totalOrdersRow = queryOne<{ count: number }>(`SELECT COUNT(*) as count FROM Orders`);
    const totalOrders = totalOrdersRow ? Number(totalOrdersRow.count) : 0;

    const pendingOrdersRow = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM Orders WHERE status IN ('PENDING', 'CONFIRMED')`
    );
    const pendingOrders = pendingOrdersRow ? Number(pendingOrdersRow.count) : 0;

    const totalProductsRow = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM Products WHERE seller_id = ? AND status != 'ARCHIVED'`,
      sellerId
    );
    const totalProducts = totalProductsRow ? Number(totalProductsRow.count) : 0;

    const lowStockRow = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM Inventories WHERE status = 'LOW_STOCK' OR quantity <= low_stock_threshold`
    );
    const lowStockCount = lowStockRow ? Number(lowStockRow.count) : 0;

    const shop = this.getShopProfile(sellerId);
    const shopRating = shop ? shop.rating : 5.0;

    const recentOrders = this.getOrders(sellerId).slice(0, 5);

    const monthlyRevenueChart = [
      { month: "T5/26", revenue: 45000000 },
      { month: "T6/26", revenue: 68000000 },
      { month: "T7/26", revenue: 89000000 },
      { month: "T8/26", revenue: 112000000 },
      { month: "T9/26", revenue: Math.max(totalRevenue, 135000000) }
    ];

    return {
      todayRevenue,
      totalRevenue,
      totalOrders,
      pendingOrders,
      totalProducts,
      lowStockCount,
      shopRating,
      recentOrders,
      monthlyRevenueChart
    };
  }

  /**
   * 2. Shop Profile (Module 3)
   */
  static getShopProfile(sellerId: number = 1): ShopProfile {
    let shop = queryOne<any>(`SELECT * FROM Shops WHERE seller_id = ?`, sellerId);
    if (!shop) {
      execute(
        `INSERT INTO Shops (seller_id, shop_name, slug, logo_url, banner_url, bio, warehouse_address, phone, email, rating, is_vacation_mode)
         VALUES (?, 'Aethelgard Luxury Studio', 'aethelgard-luxury', 'img/fashion mood board.jpg', 'img/fashion mood board.jpg', 
         'Nhà mốt phân phối thời trang xa xỉ, Haute Couture & Streetwear phiên bản giới hạn chính hãng.', 
         'Tầng 18, Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội', '0988888888', 'seller@aethelgard.vn', 4.95, 0)`,
        sellerId
      );
      shop = queryOne<any>(`SELECT * FROM Shops WHERE seller_id = ?`, sellerId);
    }
    return {
      ...shop,
      rating: Number(shop.rating),
      is_vacation_mode: Boolean(shop.is_vacation_mode)
    };
  }

  static updateShopProfile(sellerId: number, dto: UpdateShopDTO): ShopProfile {
    const current = this.getShopProfile(sellerId);
    execute(
      `UPDATE Shops 
       SET shop_name = ?, bio = ?, warehouse_address = ?, phone = ?, email = ?, logo_url = ?, banner_url = ?, is_vacation_mode = ?
       WHERE seller_id = ?`,
      dto.shop_name ?? current.shop_name,
      dto.bio ?? current.bio,
      dto.warehouse_address ?? current.warehouse_address,
      dto.phone ?? current.phone,
      dto.email ?? current.email,
      dto.logo_url ?? current.logo_url,
      dto.banner_url ?? current.banner_url,
      dto.is_vacation_mode !== undefined ? (dto.is_vacation_mode ? 1 : 0) : (current.is_vacation_mode ? 1 : 0),
      sellerId
    );
    return this.getShopProfile(sellerId);
  }

  /**
   * 3. Product Management (Module 4, 5, 6)
   */
  static getProducts(sellerId: number = 1, filters?: { search?: string; categoryId?: number; status?: string }): SellerProductItem[] {
    let sql = `
      SELECT p.*, c.name as category_name, b.name as brand_name,
             COALESCE(i.quantity, (SELECT SUM(stock_quantity) FROM Product_Variants pv WHERE pv.product_id = p.id), 0) as total_stock,
             (SELECT image_url FROM Product_Images pi WHERE pi.product_id = p.id ORDER BY pi.is_primary DESC, pi.display_order ASC LIMIT 1) as image_url,
             (SELECT COUNT(*) FROM Product_Variants pv WHERE pv.product_id = p.id) as variant_count
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Brands b ON p.brand_id = b.id
      LEFT JOIN Inventories i ON p.id = i.product_id
      WHERE p.seller_id = ? AND p.status != 'ARCHIVED'
    `;
    const params: any[] = [sellerId];

    if (filters?.search) {
      sql += ` AND p.name LIKE ?`;
      params.push(`%${filters.search}%`);
    }
    if (filters?.categoryId) {
      sql += ` AND p.category_id = ?`;
      params.push(filters.categoryId);
    }
    if (filters?.status) {
      sql += ` AND p.status = ?`;
      params.push(filters.status);
    }

    sql += ` ORDER BY p.id DESC`;

    const rows = queryAll<any>(sql, ...params);
    return rows.map(r => ({
      ...r,
      base_price: Number(r.base_price),
      rating: Number(r.rating),
      is_featured: Boolean(r.is_featured),
      total_stock: Number(r.total_stock) || 0,
      variant_count: Number(r.variant_count) || 0
    }));
  }

  static getProductById(sellerId: number, productId: number) {
    const product = queryOne<any>(
      `SELECT p.*, c.name as category_name, b.name as brand_name
       FROM Products p
       LEFT JOIN Categories c ON p.category_id = c.id
       LEFT JOIN Brands b ON p.brand_id = b.id
       WHERE p.id = ? AND p.seller_id = ?`,
      productId,
      sellerId
    );
    if (!product) return null;

    const variants = queryAll<any>(`SELECT * FROM Product_Variants WHERE product_id = ?`, productId);
    const images = queryAll<any>(`SELECT * FROM Product_Images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC`, productId);
    const inventory = queryOne<any>(`SELECT * FROM Inventories WHERE product_id = ?`, productId);

    return {
      ...product,
      base_price: Number(product.base_price),
      rating: Number(product.rating),
      is_featured: Boolean(product.is_featured),
      variants: variants.map(v => ({ ...v, price: Number(v.price), stock_quantity: Number(v.stock_quantity) })),
      images,
      inventory: inventory ? { ...inventory, quantity: Number(inventory.quantity) } : null
    };
  }

  static createProduct(sellerId: number, dto: CreateProductDTO) {
    const slug = dto.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4);

    const insertResult = execute(
      `INSERT INTO Products (seller_id, category_id, brand_id, name, slug, description, base_price, rating, is_featured, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 5.0, ?, 'ACTIVE')`,
      sellerId,
      dto.category_id,
      dto.brand_id,
      dto.name,
      slug,
      dto.description,
      dto.base_price,
      dto.is_featured ? 1 : 0
    );

    const productId = Number(insertResult.lastInsertRowid);
    let totalStock = 0;

    if (dto.variants && dto.variants.length > 0) {
      for (const v of dto.variants) {
        execute(
          `INSERT INTO Product_Variants (product_id, sku, size, color, price, stock_quantity, image_url)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          productId,
          v.sku,
          v.size,
          v.color,
          v.price || dto.base_price,
          v.stock_quantity,
          v.image_url || dto.image_url || "img/fashion mood board.jpg"
        );
        totalStock += Number(v.stock_quantity);
      }
    } else {
      execute(
        `INSERT INTO Product_Variants (product_id, sku, size, color, price, stock_quantity, image_url)
         VALUES (?, ?, 'Freesize', 'Tiêu chuẩn', ?, 50, ?)`,
        productId,
        `SKU-${productId}-STD`,
        dto.base_price,
        dto.image_url || "img/fashion mood board.jpg"
      );
      totalStock = 50;
    }

    // Insert primary image
    if (dto.image_url) {
      execute(
        `INSERT INTO Product_Images (product_id, image_url, is_primary, display_order)
         VALUES (?, ?, 1, 1)`,
        productId,
        dto.image_url
      );
    }

    // Insert Inventory
    execute(
      `INSERT INTO Inventories (product_id, quantity, reserved_quantity, low_stock_threshold, status)
       VALUES (?, ?, 0, 5, ?)`,
      productId,
      totalStock,
      totalStock > 5 ? 'IN_STOCK' : 'LOW_STOCK'
    );

    return this.getProductById(sellerId, productId);
  }

  static updateProduct(sellerId: number, productId: number, dto: UpdateProductDTO) {
    const current = queryOne<any>(`SELECT * FROM Products WHERE id = ? AND seller_id = ?`, productId, sellerId);
    if (!current) throw new Error("Sản phẩm không tồn tại hoặc bạn không có quyền cập nhật.");

    execute(
      `UPDATE Products 
       SET name = ?, category_id = ?, brand_id = ?, description = ?, base_price = ?, status = ?, is_featured = ?
       WHERE id = ?`,
      dto.name ?? current.name,
      dto.category_id ?? current.category_id,
      dto.brand_id ?? current.brand_id,
      dto.description ?? current.description,
      dto.base_price ?? current.base_price,
      dto.status ?? current.status,
      dto.is_featured !== undefined ? (dto.is_featured ? 1 : 0) : current.is_featured,
      productId
    );

    return this.getProductById(sellerId, productId);
  }

  static deleteProduct(sellerId: number, productId: number): boolean {
    const product = queryOne<any>(`SELECT id FROM Products WHERE id = ? AND seller_id = ?`, productId, sellerId);
    if (!product) return false;

    execute(`UPDATE Products SET status = 'ARCHIVED' WHERE id = ?`, productId);
    return true;
  }

  /**
   * 4. Inventory Management (Module 7)
   */
  static getInventory(sellerId: number = 1): InventoryItem[] {
    const rows = queryAll<any>(
      `SELECT p.id as product_id, p.name as product_name, p.slug, p.base_price,
              COALESCE(i.quantity, 0) as quantity,
              COALESCE(i.reserved_quantity, 0) as reserved_quantity,
              COALESCE(i.low_stock_threshold, 5) as low_stock_threshold,
              COALESCE(i.status, 'IN_STOCK') as status,
              (SELECT image_url FROM Product_Images pi WHERE pi.product_id = p.id ORDER BY pi.is_primary DESC LIMIT 1) as image_url
       FROM Products p
       LEFT JOIN Inventories i ON p.id = i.product_id
       WHERE p.seller_id = ? AND p.status != 'ARCHIVED'
       ORDER BY quantity ASC, p.id DESC`,
      sellerId
    );

    return rows.map(r => ({
      product_id: r.product_id,
      product_name: r.product_name,
      slug: r.slug,
      base_price: Number(r.base_price),
      image_url: r.image_url || "img/fashion mood board.jpg",
      quantity: Number(r.quantity),
      reserved_quantity: Number(r.reserved_quantity),
      low_stock_threshold: Number(r.low_stock_threshold),
      status: Number(r.quantity) === 0 ? "OUT_OF_STOCK" : Number(r.quantity) <= Number(r.low_stock_threshold) ? "LOW_STOCK" : "IN_STOCK"
    }));
  }

  static updateStock(productId: number, quantity: number, lowStockThreshold: number = 5): boolean {
    const status = quantity === 0 ? "OUT_OF_STOCK" : quantity <= lowStockThreshold ? "LOW_STOCK" : "IN_STOCK";
    const exists = queryOne<any>(`SELECT id FROM Inventories WHERE product_id = ?`, productId);
    if (exists) {
      execute(
        `UPDATE Inventories SET quantity = ?, low_stock_threshold = ?, status = ? WHERE product_id = ?`,
        quantity,
        lowStockThreshold,
        status,
        productId
      );
    } else {
      execute(
        `INSERT INTO Inventories (product_id, quantity, reserved_quantity, low_stock_threshold, status)
         VALUES (?, ?, 0, ?, ?)`,
        productId,
        quantity,
        lowStockThreshold,
        status
      );
    }
    return true;
  }

  /**
   * 5. Order Management (Module 8 & 9)
   */
  static getOrders(sellerId: number = 1, status?: string): SellerOrderItem[] {
    let sql = `
      SELECT o.*,
             (SELECT COUNT(*) FROM Order_Items oi WHERE oi.order_id = o.id) as item_count
      FROM Orders o
      WHERE 1=1
    `;
    const params: any[] = [];
    if (status) {
      sql += ` AND o.status = ?`;
      params.push(status);
    }
    sql += ` ORDER BY o.id DESC`;

    const rows = queryAll<any>(sql, ...params);
    return rows.map(r => ({
      id: r.id,
      order_code: r.order_code,
      customer_name: r.customer_name,
      customer_phone: r.customer_phone,
      shipping_address: r.shipping_address,
      note: r.note,
      subtotal: Number(r.subtotal),
      discount: Number(r.discount),
      shipping_fee: Number(r.shipping_fee),
      total_amount: Number(r.total_amount),
      status: r.status,
      payment_status: r.payment_status,
      created_at: r.created_at,
      item_count: Number(r.item_count) || 0
    }));
  }

  static getOrderDetail(orderId: number): SellerOrderItem | null {
    const order = queryOne<any>(`SELECT * FROM Orders WHERE id = ?`, orderId);
    if (!order) return null;

    const items = queryAll<any>(`SELECT * FROM Order_Items WHERE order_id = ?`, orderId);
    return {
      id: order.id,
      order_code: order.order_code,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      shipping_address: order.shipping_address,
      note: order.note,
      subtotal: Number(order.subtotal),
      discount: Number(order.discount),
      shipping_fee: Number(order.shipping_fee),
      total_amount: Number(order.total_amount),
      status: order.status,
      payment_status: order.payment_status,
      created_at: order.created_at,
      item_count: items.length,
      items: items.map(i => ({
        id: i.id,
        product_name: i.product_name,
        size: i.size,
        color: i.color,
        price: Number(i.price),
        quantity: Number(i.quantity),
        subtotal: Number(i.subtotal)
      }))
    };
  }

  static updateOrderStatus(orderId: number, status: string): boolean {
    const valid = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED", "CANCELLED"];
    if (!valid.includes(status)) throw new Error("Trạng thái đơn hàng không hợp lệ.");

    execute(`UPDATE Orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, status, orderId);

    // If completed, ensure payment status is PAID
    if (status === "COMPLETED") {
      execute(`UPDATE Orders SET payment_status = 'PAID' WHERE id = ?`, orderId);
    }
    return true;
  }

  /**
   * 6. Shipping Channels (Module 10)
   */
  static getShippingChannels(): ShippingChannel[] {
    const rows = queryAll<any>(`SELECT * FROM Shipping_Channels ORDER BY id ASC`);
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      code: r.code,
      is_enabled: Boolean(r.is_enabled),
      cost: Number(r.cost),
      estimated_days: r.estimated_days
    }));
  }

  static toggleShippingChannel(id: number, isEnabled: boolean): boolean {
    execute(`UPDATE Shipping_Channels SET is_enabled = ? WHERE id = ?`, isEnabled ? 1 : 0, id);
    return true;
  }

  /**
   * 7. Promotions / Vouchers (Module 11)
   */
  static getPromotions(shopId: number = 1): PromotionItem[] {
    const rows = queryAll<any>(`SELECT * FROM Promotions WHERE shop_id = ? ORDER BY id DESC`, shopId);
    return rows.map(r => ({
      ...r,
      discount_value: Number(r.discount_value),
      min_order_value: Number(r.min_order_value),
      usage_limit: Number(r.usage_limit),
      used_count: Number(r.used_count),
      is_active: Boolean(r.is_active)
    }));
  }

  static createPromotion(shopId: number, dto: CreatePromotionDTO): PromotionItem {
    const code = dto.voucher_code.toUpperCase().trim();
    const existing = queryOne<any>(`SELECT id FROM Promotions WHERE voucher_code = ?`, code);
    if (existing) throw new Error(`Mã khuyến mãi '${code}' đã tồn tại.`);

    const res = execute(
      `INSERT INTO Promotions (shop_id, voucher_code, title, discount_type, discount_value, min_order_value, usage_limit, used_count, start_date, end_date, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 1)`,
      shopId,
      code,
      dto.title,
      dto.discount_type,
      dto.discount_value,
      dto.min_order_value || 0,
      dto.usage_limit || 100,
      dto.start_date || new Date().toISOString().slice(0, 19).replace("T", " "),
      dto.end_date
    );

    const inserted = queryOne<any>(`SELECT * FROM Promotions WHERE id = ?`, res.lastInsertRowid);
    return {
      ...inserted,
      discount_value: Number(inserted.discount_value),
      min_order_value: Number(inserted.min_order_value),
      usage_limit: Number(inserted.usage_limit),
      used_count: Number(inserted.used_count),
      is_active: Boolean(inserted.is_active)
    };
  }

  static togglePromotion(id: number, isActive: boolean): boolean {
    execute(`UPDATE Promotions SET is_active = ? WHERE id = ?`, isActive ? 1 : 0, id);
    return true;
  }

  /**
   * 8. Finance / Wallet (Module 12)
   */
  static getWallet(sellerId: number = 1): SellerWalletInfo {
    let wallet = queryOne<any>(`SELECT * FROM Seller_Wallets WHERE seller_id = ?`, sellerId);
    if (!wallet) {
      execute(
        `INSERT INTO Seller_Wallets (seller_id, available_balance, pending_balance, bank_name, bank_account_number, bank_account_name)
         VALUES (?, 148500000, 32600000, 'Techcombank', '19036888999018', 'NGUYEN DUC MANH')`,
        sellerId
      );
      wallet = queryOne<any>(`SELECT * FROM Seller_Wallets WHERE seller_id = ?`, sellerId);
    }

    const transactions = queryAll<any>(
      `SELECT * FROM Wallet_Transactions WHERE wallet_id = ? ORDER BY id DESC LIMIT 20`,
      wallet.id
    );

    return {
      id: wallet.id,
      seller_id: wallet.seller_id,
      available_balance: Number(wallet.available_balance),
      pending_balance: Number(wallet.pending_balance),
      bank_name: wallet.bank_name,
      bank_account_number: wallet.bank_account_number,
      bank_account_name: wallet.bank_account_name,
      transactions: transactions.map(t => ({
        id: t.id,
        type: t.type,
        amount: Number(t.amount),
        note: t.note,
        status: t.status,
        created_at: t.created_at
      }))
    };
  }

  static requestWithdraw(sellerId: number, amount: number, note?: string) {
    if (amount <= 0) throw new Error("Số tiền rút phải lớn hơn 0đ.");
    const wallet = this.getWallet(sellerId);
    if (wallet.available_balance < amount) {
      throw new Error(`Số dư khả dụng (${wallet.available_balance.toLocaleString("vi-VN")}đ) không đủ để rút ${amount.toLocaleString("vi-VN")}đ.`);
    }

    const newBalance = wallet.available_balance - amount;
    execute(`UPDATE Seller_Wallets SET available_balance = ? WHERE id = ?`, newBalance, wallet.id);

    execute(
      `INSERT INTO Wallet_Transactions (wallet_id, type, amount, note, status)
       VALUES (?, 'WITHDRAW', ?, ?, 'COMPLETED')`,
      wallet.id,
      amount,
      note || `Rút tiền về ${wallet.bank_name} - ${wallet.bank_account_number}`
    );

    return this.getWallet(sellerId);
  }

  /**
   * 9. Analytics & Business Intelligence (Module 13)
   */
  static getAnalytics(sellerId: number = 1) {
    const stats = this.getDashboardStats(sellerId);

    // Best selling products
    const bestSellers = queryAll<any>(
      `SELECT p.id, p.name, p.base_price,
              COALESCE(SUM(oi.quantity), 0) as units_sold,
              COALESCE(SUM(oi.subtotal), 0) as total_revenue,
              (SELECT image_url FROM Product_Images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC LIMIT 1) as image_url
       FROM Products p
       LEFT JOIN Product_Variants pv ON pv.product_id = p.id
       LEFT JOIN Order_Items oi ON oi.variant_id = pv.id
       WHERE p.seller_id = ? AND p.status != 'ARCHIVED'
       GROUP BY p.id
       ORDER BY total_revenue DESC
       LIMIT 5`,
      sellerId
    );

    // Orders status breakdown
    const statusCounts = queryAll<any>(
      `SELECT status, COUNT(*) as count FROM Orders GROUP BY status`
    );

    return {
      stats,
      bestSellers: bestSellers.map(b => ({
        ...b,
        base_price: Number(b.base_price),
        units_sold: Number(b.units_sold),
        total_revenue: Number(b.total_revenue),
        image_url: b.image_url || "img/fashion mood board.jpg"
      })),
      statusBreakdown: statusCounts.reduce((acc, curr) => {
        acc[curr.status] = Number(curr.count);
        return acc;
      }, {} as Record<string, number>),
      conversionRate: 3.82,
      averageOrderValue: stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0
    };
  }

  /**
   * 10. Reviews & Customer Feedback (Module 14)
   */
  static getReviews(sellerId: number = 1): ReviewItem[] {
    const rows = queryAll<any>(
      `SELECT r.*, p.name as product_name,
              (SELECT image_url FROM Product_Images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC LIMIT 1) as product_image
       FROM Product_Reviews r
       JOIN Products p ON r.product_id = p.id
       WHERE p.seller_id = ?
       ORDER BY r.id DESC`,
      sellerId
    );

    return rows.map(r => ({
      id: r.id,
      product_id: r.product_id,
      product_name: r.product_name,
      product_image: r.product_image || "img/fashion mood board.jpg",
      customer_name: r.customer_name,
      rating: Number(r.rating),
      comment: r.comment,
      seller_reply: r.seller_reply,
      reply_at: r.reply_at,
      created_at: r.created_at
    }));
  }

  static replyReview(reviewId: number, reply: string): boolean {
    if (!reply || !reply.trim()) throw new Error("Nội dung phản hồi không được để trống.");
    execute(
      `UPDATE Product_Reviews 
       SET seller_reply = ?, reply_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      reply.trim(),
      reviewId
    );
    return true;
  }

  /**
   * 11. AI Fashion Copywriter Engine (Module 5 & AI Tooling)
   */
  static generateAIDescription(request: AIDescriptionRequest): AIDescriptionResponse {
    const tone = request.tone || "luxury";
    const brand = request.brand || "Aethelgard";
    const name = request.productName || "Sản phẩm thời trang cao cấp";

    const toneDescriptions = {
      luxury: {
        highlight: `Biểu tượng thanh lịch đương đại – Chế tác thủ công đỉnh cao từ nhà mốt ${brand}`,
        editorial: `Tuyệt tác ${name} đại diện cho tuyên ngôn thẩm mỹ xa xỉ không phô trương (Quiet Luxury). Từng đường kim mũi chỉ được hoàn thiện bởi những nghệ nhân bậc thầy, lựa chọn từ những thước vải thượng hạng nhất. Thiết kế tôn vinh phom dáng quý phái, mang lại vẻ quyền lực và cuốn hút tuyệt đối trong mọi không gian tiệc tối hay sự kiện đẳng cấp.`,
        materialAndFit: `• Chất liệu: 100% Cotton hữu cơ dệt mật độ cao kết hợp da bê Ý mềm mịn.\n• Form dáng: Tailored Fit tôn đường cong cơ thể tự nhiên nhưng vẫn giữ trọn vẹn sự thoải mái.\n• Chi tiết: Phụ kiện kim loại mạ palladium chống oxy hóa, khắc laser tinh xảo.`,
        stylingTips: `Phối cùng quần tây xếp ly cạp cao, giày da monkstrap hoặc chelsea boots da bóng. Khoác thêm blazer dạ tweed để nhân đôi khí chất vương giả.`
      },
      streetwear: {
        highlight: `Cú hích thời trang ngầm đường phố (Underground Haute) – Độc bản từ ${brand}`,
        editorial: `Lấy cảm hứng từ văn hóa Cyberpunk và hip-hop thế hệ mới, ${name} phá vỡ mọi quy chuẩn an toàn. Cấu trúc deconstructed với các nếp cắt bất đối xứng, wash màu vintage tạo hiệu ứng worn-in gai góc. Một item không thể thiếu cho những tín đồ dẫn đầu xu hướng (trendsetters).`,
        materialAndFit: `• Chất liệu: Denim dệt thoi 14oz siêu dày dặn kết hợp lưới kỹ thuật thoáng khí.\n• Form dáng: Oversized boxy silhouette, vai trễ phóng khoáng chuẩn phong cách Harajuku.\n• Chi tiết: Đinh tán thép, khóa kéo 2 chiều YKK bản lớn độc bản.`,
        stylingTips: `Layering cùng áo thun graphic vintage, quần cargo nhiều túi ống rộng và đôi chunky sneaker Balenciaga Track hoặc Samba cổ điển.`
      },
      minimalist: {
        highlight: `Vẻ đẹp thuần khiết tối giản – Triết lý 'Less is More' cùng ${brand}`,
        editorial: `Cắt bỏ mọi chi tiết thừa thãi để chất lượng chất liệu tự lên tiếng. ${name} sinh ra dành cho những ai tìm kiếm sự cân bằng hoàn hảo giữa công năng và vẻ đẹp thẩm mỹ tinh tế. Gam màu trung tính thanh lịch trường tồn qua thời gian, không bao giờ lỗi mốt.`,
        materialAndFit: `• Chất liệu: Modal cao cấp kết hợp sợi lanh tự nhiên, thoáng mát và mềm mượt trên da.\n• Form dáng: Relaxed Regular vừa vặn, buông rủ thanh thoát.\n• Chi tiết: Khuy xà cừ tự nhiên, đường may giấu chỉ tinh mỹ.`,
        stylingTips: `Kết hợp cùng quần âu màu be hoặc ghi xám, sneaker trắng tối giản và đồng hồ mặt vuông dây da cổ điển.`
      },
      sporty: {
        highlight: `Bứt phá giới hạn chuyển động – Công nghệ thể thao đỉnh cao từ ${brand}`,
        editorial: `Được thiết kế cho lối sống năng động và khát khao chinh phục, ${name} tích hợp công nghệ thấm hút siêu tốc và đàn hồi 4 chiều. Tự tin tỏa sáng từ phòng tập gym cao cấp đến những buổi chạy việt dã cuối tuần.`,
        materialAndFit: `• Chất liệu: Spandex pha Polyester tái chế thế hệ mới, kháng khuẩn khử mùi vượt trội.\n• Form dáng: Athletic Slim ôm sát cơ bắp, hỗ trợ tối đa khi vận động cường độ cao.\n• Chi tiết: Dải phản quang 3M an toàn khi chạy ban đêm.`,
        stylingTips: `Mặc cùng quần short chạy bộ chuyên dụng, tất cổ cao dệt gân và đôi giày chạy đệm khí Zoom Air rực rỡ.`
      }
    };

    const selected = toneDescriptions[tone] || toneDescriptions.luxury;

    return {
      title: `${name} | Bộ Sưu Tập Chính Hãng ${brand} 2026`,
      highlight: selected.highlight,
      editorialDescription: selected.editorial,
      materialAndFit: selected.materialAndFit,
      stylingTips: selected.stylingTips,
      hashtags: [
        `#${brand.replace(/\s+/g, "")}`,
        `#FashionLuxury`,
        `#EditorialStyle`,
        `#OutfitOfTheDay`,
        `#DMFashionMall`,
        `#StreetwearVietnam`
      ]
    };
  }
}
