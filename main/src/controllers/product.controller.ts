import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductController {
  static getProducts(req: Request, res: Response, next: NextFunction): void {
    try {
      const filter = {
        category_id: req.query.category_id ? Number(req.query.category_id) : undefined,
        brand_id: req.query.brand_id ? Number(req.query.brand_id) : undefined,
        min_price: req.query.min_price ? Number(req.query.min_price) : undefined,
        max_price: req.query.max_price ? Number(req.query.max_price) : undefined,
        rating: req.query.rating ? Number(req.query.rating) : undefined,
        search: req.query.search ? String(req.query.search) : undefined,
        sort_by: req.query.sort_by as any,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12
      };

      const result = ProductService.getProducts(filter);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static getProductById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const product = ProductService.getProductById(id);
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }

  static getCategories(req: Request, res: Response, next: NextFunction): void {
    try {
      const categories = ProductService.getCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  }

  static getBrands(req: Request, res: Response, next: NextFunction): void {
    try {
      const brands = ProductService.getBrands();
      res.json({ success: true, data: brands });
    } catch (err) {
      next(err);
    }
  }
}
