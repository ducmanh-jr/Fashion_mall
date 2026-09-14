import { queryOne, queryAll } from "../database/connection.js";
import { IProduct, IProductVariant, ICategory, IBrand, ProductQueryFilter } from "../types/product.types.js";

export class ProductService {
  static getProducts(filter: ProductQueryFilter = {}): { products: IProduct[]; total: number; page: number; limit: number } {
    let whereClauses: string[] = ["p.status = 'ACTIVE'"];
    let params: (string | number)[] = [];

    if (filter.category_id) {
      whereClauses.push("p.category_id = ?");
      params.push(filter.category_id);
    }

    if (filter.brand_id) {
      whereClauses.push("p.brand_id = ?");
      params.push(filter.brand_id);
    }

    if (filter.min_price !== undefined) {
      whereClauses.push("p.base_price >= ?");
      params.push(filter.min_price);
    }

    if (filter.max_price !== undefined) {
      whereClauses.push("p.base_price <= ?");
      params.push(filter.max_price);
    }

    if (filter.rating !== undefined) {
      whereClauses.push("p.rating >= ?");
      params.push(filter.rating);
    }

    if (filter.search && filter.search.trim()) {
      const keyword = `%${filter.search.trim()}%`;
      whereClauses.push("(p.name LIKE ? OR b.name LIKE ? OR p.description LIKE ?)");
      params.push(keyword, keyword, keyword);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const countSql = `
      SELECT COUNT(*) as count 
      FROM Products p
      LEFT JOIN Brands b ON p.brand_id = b.id
      ${whereSql}
    `;
    const countResult = queryOne<{ count: number }>(countSql, ...params);
    const total = countResult?.count || 0;

    let orderSql = "ORDER BY p.is_featured DESC, p.id DESC";
    if (filter.sort_by === "price_asc") orderSql = "ORDER BY p.base_price ASC";
    if (filter.sort_by === "price_desc") orderSql = "ORDER BY p.base_price DESC";
    if (filter.sort_by === "rating") orderSql = "ORDER BY p.rating DESC";
    if (filter.sort_by === "latest") orderSql = "ORDER BY p.created_at DESC";

    const page = Math.max(1, filter.page || 1);
    const limit = Math.max(1, filter.limit || 12);
    const offset = (page - 1) * limit;

    const querySql = `
      SELECT 
        p.id, p.category_id, p.brand_id, p.name, p.slug, p.description, 
        p.base_price, p.rating, p.is_featured, p.created_at,
        c.name as category_name,
        b.name as brand_name,
        (SELECT image_url FROM Product_Images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as thumbnail
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Brands b ON p.brand_id = b.id
      ${whereSql}
      ${orderSql}
      LIMIT ? OFFSET ?
    `;

    const products = queryAll<IProduct>(querySql, ...params, limit, offset);

    for (const p of products) {
      p.variants = queryAll<IProductVariant>(`
        SELECT id, product_id, sku, size, color, price, stock_quantity, image_url 
        FROM Product_Variants 
        WHERE product_id = ?
      `, p.id);

      if (!p.thumbnail && p.variants.length > 0) {
        p.thumbnail = p.variants[0].image_url;
      }
    }

    return { products, total, page, limit };
  }

  static getProductById(id: number): IProduct {
    const product = queryOne<IProduct>(`
      SELECT 
        p.id, p.category_id, p.brand_id, p.name, p.slug, p.description, 
        p.base_price, p.rating, p.is_featured, p.created_at,
        c.name as category_name,
        b.name as brand_name,
        (SELECT image_url FROM Product_Images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as thumbnail
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Brands b ON p.brand_id = b.id
      WHERE p.id = ? AND p.status = 'ACTIVE'
    `, id);

    if (!product) {
      throw new Error("Không tìm thấy sản phẩm.");
    }

    product.variants = queryAll<IProductVariant>(`
      SELECT id, product_id, sku, size, color, price, stock_quantity, image_url 
      FROM Product_Variants 
      WHERE product_id = ?
    `, product.id);

    return product;
  }

  static getCategories(): ICategory[] {
    return queryAll<ICategory>("SELECT * FROM Categories WHERE status = 'ACTIVE' ORDER BY id ASC");
  }

  static getBrands(): IBrand[] {
    return queryAll<IBrand>("SELECT * FROM Brands ORDER BY id ASC");
  }
}
