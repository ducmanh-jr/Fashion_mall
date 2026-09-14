/**
 * Task 2 BE: Product & Inventory Management Service (HTTMDTTHA-37)
 * Handles seller product CRUD, up to 5 image uploads, inventory stock management, and status updates.
 * Developer: Nguyen Duc Manh
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const MigrationRunner = require('../../task 1/mã nguồn/migrations');

class ProductService {
  constructor(db = null) {
    if (!db) {
      this.runner = new MigrationRunner(':memory:');
      this.runner.up();
      this.db = this.runner.db;
    } else {
      this.db = db;
    }
  }

  /**
   * US-08: Seller posts new product
   */
  createProduct({ seller_id, category_id, name, slug, description, base_price, status = 'ACTIVE' }) {
    if (!seller_id || !category_id || !name || !slug || base_price === undefined) {
      throw new Error('Missing required fields: seller_id, category_id, name, slug, base_price');
    }

    if (base_price < 0) {
      throw new Error('Base price must be a non-negative number');
    }

    const stmt = this.db.prepare(`
      INSERT INTO Products (seller_id, category_id, name, slug, description, base_price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING id, seller_id, category_id, name, slug, description, base_price, status, created_at;
    `);

    try {
      const product = stmt.get(seller_id, category_id, name, slug, description || '', base_price, status);

      // Auto-initialize inventory record (default 0)
      this.db.prepare(`
        INSERT INTO Inventories (product_id, quantity, reserved_quantity, low_stock_threshold, status)
        VALUES (?, 0, 0, 5, 'OUT_OF_STOCK');
      `).run(product.id);

      return product;
    } catch (err) {
      throw new Error(`Failed to create product: ${err.message}`);
    }
  }

  /**
   * US-09: Upload up to 5 images for product
   */
  uploadProductImages(product_id, image_urls) {
    if (!Array.isArray(image_urls) || image_urls.length === 0) {
      throw new Error('image_urls must be a non-empty array');
    }

    if (image_urls.length > 5) {
      throw new Error('Maximum 5 images allowed per product');
    }

    const productExists = this.db.prepare('SELECT id FROM Products WHERE id = ?').get(product_id);
    if (!productExists) {
      throw new Error(`Product with ID ${product_id} not found`);
    }

    // Delete existing images before uploading new set
    this.db.prepare('DELETE FROM Product_Images WHERE product_id = ?').run(product_id);

    const stmt = this.db.prepare(`
      INSERT INTO Product_Images (product_id, image_url, is_primary, display_order)
      VALUES (?, ?, ?, ?)
      RETURNING id, product_id, image_url, is_primary, display_order;
    `);

    const insertedImages = [];
    image_urls.forEach((url, idx) => {
      const isPrimary = idx === 0 ? 1 : 0;
      const img = stmt.get(product_id, url, isPrimary, idx + 1);
      insertedImages.push(img);
    });

    return insertedImages;
  }

  /**
   * US-10: Update stock inventory for product
   */
  updateInventory(product_id, quantity, low_stock_threshold = 5) {
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    const invExists = this.db.prepare('SELECT id, reserved_quantity FROM Inventories WHERE product_id = ?').get(product_id);
    if (!invExists) {
      throw new Error(`Inventory record for product ${product_id} not found`);
    }

    let invStatus = 'IN_STOCK';
    if (quantity === 0) {
      invStatus = 'OUT_OF_STOCK';
    } else if (quantity <= low_stock_threshold) {
      invStatus = 'LOW_STOCK';
    }

    const stmt = this.db.prepare(`
      UPDATE Inventories
      SET quantity = ?, low_stock_threshold = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE product_id = ?
      RETURNING id, product_id, quantity, reserved_quantity, low_stock_threshold, status, updated_at;
    `);

    return stmt.get(quantity, low_stock_threshold, invStatus, product_id);
  }

  /**
   * US-11: Edit product info or change status (hide/delete)
   */
  updateProduct(product_id, { name, description, base_price, status }) {
    const product = this.db.prepare('SELECT * FROM Products WHERE id = ?').get(product_id);
    if (!product) {
      throw new Error(`Product with ID ${product_id} not found`);
    }

    const newName = name !== undefined ? name : product.name;
    const newDesc = description !== undefined ? description : product.description;
    const newPrice = base_price !== undefined ? base_price : product.base_price;
    const newStatus = status !== undefined ? status : product.status;

    if (newPrice < 0) {
      throw new Error('Base price must be a non-negative number');
    }

    const stmt = this.db.prepare(`
      UPDATE Products
      SET name = ?, description = ?, base_price = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING id, seller_id, category_id, name, slug, description, base_price, status, updated_at;
    `);

    return stmt.get(newName, newDesc, newPrice, newStatus, product_id);
  }

  /**
   * Get full product detail including images and inventory
   */
  getProductDetail(product_id) {
    const product = this.db.prepare(`
      SELECT p.*, c.name as category_name
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      WHERE p.id = ?
    `).get(product_id);

    if (!product) return null;

    const images = this.db.prepare(`
      SELECT id, image_url, is_primary, display_order 
      FROM Product_Images 
      WHERE product_id = ? 
      ORDER BY display_order ASC
    `).all(product_id);

    const inventory = this.db.prepare(`
      SELECT quantity, reserved_quantity, low_stock_threshold, status 
      FROM Inventories 
      WHERE product_id = ?
    `).get(product_id);

    return {
      ...product,
      images,
      inventory
    };
  }
}

module.exports = ProductService;
