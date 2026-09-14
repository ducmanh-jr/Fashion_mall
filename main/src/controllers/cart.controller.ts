import { Response, NextFunction } from "express";
import { CartService } from "../services/cart.service.js";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

export class CartController {
  static getCart(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const cart = CartService.getCart(req.user.userId);
      res.json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  }

  static addToCart(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const { variant_id, quantity } = req.body;
      if (!variant_id || !quantity) {
        throw new Error("variant_id và quantity là bắt buộc.");
      }
      const cart = CartService.addToCart(req.user.userId, {
        variant_id: Number(variant_id),
        quantity: Number(quantity)
      });
      res.json({ success: true, message: "Đã thêm vào giỏ hàng thành công!", data: cart });
    } catch (err) {
      next(err);
    }
  }

  static updateItem(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const itemId = Number(req.params.id);
      const { quantity } = req.body;
      const cart = CartService.updateQuantity(req.user.userId, itemId, { quantity: Number(quantity) });
      res.json({ success: true, data: cart });
    } catch (err) {
      next(err);
    }
  }

  static removeItem(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      const itemId = Number(req.params.id);
      const cart = CartService.removeItem(req.user.userId, itemId);
      res.json({ success: true, message: "Đã xóa sản phẩm khỏi giỏ hàng.", data: cart });
    } catch (err) {
      next(err);
    }
  }

  static clearCart(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
      if (!req.user) throw new Error("Chưa xác thực.");
      CartService.clearCart(req.user.userId);
      res.json({ success: true, message: "Đã xóa toàn bộ giỏ hàng." });
    } catch (err) {
      next(err);
    }
  }
}
