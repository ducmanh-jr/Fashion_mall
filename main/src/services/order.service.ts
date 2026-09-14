import { queryOne, queryAll, execute } from "../database/connection.js";
import { IOrder, IOrderItem, IPayment, CreateOrderDTO, PaymentStatus } from "../types/order.types.js";
import { CartService } from "./cart.service.js";

export class OrderService {
  static createOrder(userId: number, dto: CreateOrderDTO): IOrder {
    const cart = CartService.getCart(userId);
    if (!cart.items || cart.items.length === 0) {
      throw new Error("Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi đặt hàng.");
    }

    // Verify stock availability
    for (const item of cart.items) {
      const variant = queryOne<{ stock_quantity: number }>("SELECT stock_quantity FROM Product_Variants WHERE id = ?", item.variant_id);
      if (!variant || variant.stock_quantity < item.quantity) {
        throw new Error(`Sản phẩm "${item.product_name}" không đủ số lượng trong kho.`);
      }
    }

    const orderCode = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(100 + Math.random() * 900)}`;

    const orderSql = `
      INSERT INTO Orders (
        order_code, user_id, customer_name, customer_phone, shipping_address, 
        note, subtotal, discount, shipping_fee, total_amount, status, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', 'UNPAID')
      RETURNING *;
    `;

    const order = queryOne<IOrder>(
      orderSql,
      orderCode,
      userId,
      dto.customer_name.trim(),
      dto.customer_phone.trim(),
      dto.shipping_address.trim(),
      dto.note?.trim() || null,
      cart.subtotal,
      cart.discount,
      cart.shipping_fee,
      cart.total
    )!;

    const orderItems: IOrderItem[] = [];
    for (const item of cart.items) {
      const price = item.price || item.price_at_addition || 0;
      const subtotal = price * item.quantity;

      execute(`
        INSERT INTO Order_Items (order_id, variant_id, product_name, size, color, price, quantity, subtotal)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      `, order.id, item.variant_id, item.product_name || "Sản phẩm thời trang", item.size || "FREE", item.color || "Default", price, item.quantity, subtotal);

      execute("UPDATE Product_Variants SET stock_quantity = stock_quantity - ? WHERE id = ?;", item.quantity, item.variant_id);

      orderItems.push({
        variant_id: item.variant_id,
        product_name: item.product_name || "Sản phẩm thời trang",
        size: item.size || "FREE",
        color: item.color || "Default",
        price,
        quantity: item.quantity,
        subtotal
      });
    }

    const paymentStatus: PaymentStatus = dto.payment_method === "COD" ? "PENDING" : "PAID";
    const payment = queryOne<IPayment>(`
      INSERT INTO Payments (order_id, payment_method, transaction_id, amount, status, paid_at)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *;
    `, order.id, dto.payment_method, `TXN-${order.id}-${Date.now()}`, order.total_amount, paymentStatus, dto.payment_method !== "COD" ? new Date().toISOString() : null);

    // Clear cart after checkout
    CartService.clearCart(userId);

    order.items = orderItems;
    order.payment = payment;

    return order;
  }

  static getOrdersByUser(userId: number): IOrder[] {
    const orders = queryAll<IOrder>("SELECT * FROM Orders WHERE user_id = ? ORDER BY id DESC", userId);

    for (const order of orders) {
      order.items = queryAll<IOrderItem>("SELECT * FROM Order_Items WHERE order_id = ?", order.id);
      order.payment = queryOne<IPayment>("SELECT * FROM Payments WHERE order_id = ?", order.id);
    }

    return orders;
  }

  static getOrderById(userId: number, orderId: number): IOrder {
    const order = queryOne<IOrder>("SELECT * FROM Orders WHERE id = ? AND user_id = ?", orderId, userId);

    if (!order) {
      throw new Error("Không tìm thấy đơn hàng yêu cầu.");
    }

    order.items = queryAll<IOrderItem>("SELECT * FROM Order_Items WHERE order_id = ?", order.id);
    order.payment = queryOne<IPayment>("SELECT * FROM Payments WHERE order_id = ?", order.id);

    return order;
  }

  static cancelOrder(userId: number, orderId: number): IOrder {
    const order = this.getOrderById(userId, orderId);
    if (order.status !== "PENDING") {
      throw new Error(`Không thể hủy đơn hàng ở trạng thái "${order.status}".`);
    }

    if (order.items) {
      for (const item of order.items) {
        execute("UPDATE Product_Variants SET stock_quantity = stock_quantity + ? WHERE id = ?", item.quantity, item.variant_id);
      }
    }

    execute("UPDATE Orders SET status = 'CANCELLED', updated_at = CURRENT_TIMESTAMP WHERE id = ?", orderId);
    order.status = "CANCELLED";
    return order;
  }
}
