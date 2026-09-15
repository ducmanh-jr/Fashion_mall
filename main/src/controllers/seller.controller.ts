import { Request, Response, NextFunction } from "express";
import { SellerService } from "../services/seller.service.js";

export class SellerController {
  // 1. Dashboard
  static getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const stats = SellerService.getDashboardStats(sellerId);
      res.json({ success: true, data: stats });
    } catch (err) {
      next(err);
    }
  }

  // 2. Shop Profile
  static getShop(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const shop = SellerService.getShopProfile(sellerId);
      res.json({ success: true, data: shop });
    } catch (err) {
      next(err);
    }
  }

  static updateShop(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const updated = SellerService.updateShopProfile(sellerId, req.body);
      res.json({ success: true, message: "Cập nhật hồ sơ cửa hàng thành công!", data: updated });
    } catch (err) {
      next(err);
    }
  }

  // 3. Products
  static getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const filters = {
        search: req.query.search as string,
        categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
        status: req.query.status as string
      };
      const products = SellerService.getProducts(sellerId, filters);
      res.json({ success: true, count: products.length, data: products });
    } catch (err) {
      next(err);
    }
  }

  static getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const productId = Number(req.params.id);
      const product = SellerService.getProductById(sellerId, productId);
      if (!product) {
        res.status(404).json({ success: false, error: "Không tìm thấy sản phẩm." });
        return;
      }
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  static createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const created = SellerService.createProduct(sellerId, req.body);
      res.status(201).json({ success: true, message: "Thêm sản phẩm mới thành công!", data: created });
    } catch (err) {
      next(err);
    }
  }

  static updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const productId = Number(req.params.id);
      const updated = SellerService.updateProduct(sellerId, productId, req.body);
      res.json({ success: true, message: "Cập nhật sản phẩm thành công!", data: updated });
    } catch (err) {
      next(err);
    }
  }

  static deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const productId = Number(req.params.id);
      SellerService.deleteProduct(sellerId, productId);
      res.json({ success: true, message: "Đã lưu trữ sản phẩm thành công." });
    } catch (err) {
      next(err);
    }
  }

  // 4. Inventory
  static getInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const inventory = SellerService.getInventory(sellerId);
      res.json({ success: true, data: inventory });
    } catch (err) {
      next(err);
    }
  }

  static updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = Number(req.params.id);
      const { quantity, lowStockThreshold } = req.body;
      SellerService.updateStock(productId, Number(quantity), lowStockThreshold !== undefined ? Number(lowStockThreshold) : 5);
      res.json({ success: true, message: "Cập nhật số lượng tồn kho thành công!" });
    } catch (err) {
      next(err);
    }
  }

  // 5. Orders
  static getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const status = req.query.status as string;
      const orders = SellerService.getOrders(sellerId, status);
      res.json({ success: true, count: orders.length, data: orders });
    } catch (err) {
      next(err);
    }
  }

  static getOrderDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = Number(req.params.id);
      const order = SellerService.getOrderDetail(orderId);
      if (!order) {
        res.status(404).json({ success: false, error: "Không tìm thấy đơn hàng." });
        return;
      }
      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  }

  static updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = Number(req.params.id);
      const { status } = req.body;
      SellerService.updateOrderStatus(orderId, status);
      res.json({ success: true, message: `Đã cập nhật trạng thái đơn hàng sang ${status}` });
    } catch (err) {
      next(err);
    }
  }

  // 6. Shipping Channels
  static getShipping(req: Request, res: Response, next: NextFunction) {
    try {
      const channels = SellerService.getShippingChannels();
      res.json({ success: true, data: channels });
    } catch (err) {
      next(err);
    }
  }

  static toggleShipping(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { isEnabled } = req.body;
      SellerService.toggleShippingChannel(id, Boolean(isEnabled));
      res.json({ success: true, message: "Cập nhật kênh vận chuyển thành công!" });
    } catch (err) {
      next(err);
    }
  }

  // 7. Promotions
  static getPromotions(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId = 1;
      const promotions = SellerService.getPromotions(shopId);
      res.json({ success: true, data: promotions });
    } catch (err) {
      next(err);
    }
  }

  static createPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const shopId = 1;
      const promo = SellerService.createPromotion(shopId, req.body);
      res.status(201).json({ success: true, message: "Tạo mã khuyến mãi thành công!", data: promo });
    } catch (err) {
      next(err);
    }
  }

  static togglePromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { isActive } = req.body;
      SellerService.togglePromotion(id, Boolean(isActive));
      res.json({ success: true, message: "Cập nhật trạng thái voucher thành công!" });
    } catch (err) {
      next(err);
    }
  }

  // 8. Finance / Wallet
  static getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const wallet = SellerService.getWallet(sellerId);
      res.json({ success: true, data: wallet });
    } catch (err) {
      next(err);
    }
  }

  static requestWithdraw(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const { amount, note } = req.body;
      const wallet = SellerService.requestWithdraw(sellerId, Number(amount), note);
      res.json({ success: true, message: "Yêu cầu rút tiền thành công!", data: wallet });
    } catch (err) {
      next(err);
    }
  }

  // 9. Analytics
  static getAnalytics(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const analytics = SellerService.getAnalytics(sellerId);
      res.json({ success: true, data: analytics });
    } catch (err) {
      next(err);
    }
  }

  // 10. Reviews
  static getReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const sellerId = (req as any).user?.id || 1;
      const reviews = SellerService.getReviews(sellerId);
      res.json({ success: true, data: reviews });
    } catch (err) {
      next(err);
    }
  }

  static replyReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = Number(req.params.id);
      const { reply } = req.body;
      SellerService.replyReview(reviewId, reply);
      res.json({ success: true, message: "Đã gửi phản hồi đánh giá thành công!" });
    } catch (err) {
      next(err);
    }
  }

  // 11. AI Description
  static generateAIDescription(req: Request, res: Response, next: NextFunction) {
    try {
      const aiResult = SellerService.generateAIDescription(req.body);
      res.json({ success: true, data: aiResult });
    } catch (err) {
      next(err);
    }
  }
}
