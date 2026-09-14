import { Response, NextFunction } from "express";
import { OrderService } from "../services/order.service.js";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export class OrderController {
  static createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const { customer_name, customer_phone, shipping_address, payment_method, note } = req.body;

      if (!customer_name || !customer_phone || !shipping_address || !payment_method) {
        throw new Error("Vui lòng nhập đầy đủ: Tên, Số điện thoại, Địa chỉ nhận hàng và Phương thức thanh toán.");
      }

      const order = OrderService.createOrder(req.user.userId, {
        customer_name,
        customer_phone,
        shipping_address,
        payment_method,
        note
      });

      res.status(201).json({
        success: true,
        message: "Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại DM Fashion Mall.",
        data: order
      });
    } catch (err) {
      next(err);
    }
  }

  static getMyOrders(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const orders = OrderService.getOrdersByUser(req.user.userId);
      res.json({ success: true, data: orders });
    } catch (err) {
      next(err);
    }
  }

  static getOrderById(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const orderId = Number(req.params.id);
      const order = OrderService.getOrderById(req.user.userId, orderId);
      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  }

  static cancelOrder(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const orderId = Number(req.params.id);
      const order = OrderService.cancelOrder(req.user.userId, orderId);
      res.json({ success: true, message: "Đã hủy đơn hàng thành công.", data: order });
    } catch (err) {
      next(err);
    }
  }
}
