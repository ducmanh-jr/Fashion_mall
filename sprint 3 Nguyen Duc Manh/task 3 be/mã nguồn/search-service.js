/**
 * Task 3 BE: Search, Filter & Sort Service (HTTMDTTHA-38)
 * Handles customer product search by keyword, multi-criteria filtering (Category, Min/Max Price),
 * and sorting options (Price ASC, Price DESC, Newest).
 * Developer: Nguyen Duc Manh
 */

const { DatabaseSync } = require('node:sqlite');
const MigrationRunner = require('../../task 1/mã nguồn/migrations');
const SeederService = require('../../task 2 be/mã nguồn/seeder');

class SearchService {
  constructor(db = null) {
    if (!db) {
      this.runner = new MigrationRunner(':memory:');
      this.runner.up();
      this.db = this.runner.db;
      new SeederService(this.db).runSeed();
    } else {
      this.db = db;
    }
  }

  /**
   * Search, Filter and Sort Products
   * US-12: Keyword search (name/description)
   * US-13: Filter by category_id, min_price, max_price
   * US-14: Sort by price_asc, price_desc, newest
   */
  searchProducts({ keyword = '', category_id = null, min_price = null, max_price = null, sort_by = 'newest', limit = 20, offset = 0 }) {
    let query = `
      SELECT p.id, p.seller_id, p.category_id, p.name, p.slug, p.description, p.base_price, p.status, p.created_at,
             c.name as category_name,
             (SELECT image_url FROM Product_Images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image,
             i.quantity as stock_quantity, i.status as stock_status
      FROM Products p
      LEFT JOIN Categories c ON p.category_id = c.id
      LEFT JOIN Inventories i ON p.id = i.product_id
      WHERE p.status = 'ACTIVE'
    `;

    const params = [];

    // US-12: Keyword search
    if (keyword && keyword.trim() !== '') {
      query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      const term = `%${keyword.trim()}%`;
      params.push(term, term);
    }

    // US-13: Filter by category
    if (category_id !== null && category_id !== undefined && category_id !== '') {
      query += ` AND p.category_id = ?`;
      params.push(Number(category_id));
    }

    // US-13: Filter by price range
    if (min_price !== null && min_price !== undefined && min_price !== '') {
      query += ` AND p.base_price >= ?`;
      params.push(Number(min_price));
    }
    if (max_price !== null && max_price !== undefined && max_price !== '') {
      query += ` AND p.base_price <= ?`;
      params.push(Number(max_price));
    }

    // US-14: Sorting
    if (sort_by === 'price_asc') {
      query += ` ORDER BY p.base_price ASC`;
    } else if (sort_by === 'price_desc') {
      query += ` ORDER BY p.base_price DESC`;
    } else { // default 'newest'
      query += ` ORDER BY p.created_at DESC, p.id DESC`;
    }

    query += ` LIMIT ? OFFSET ?;`;
    params.push(Number(limit), Number(offset));

    const stmt = this.db.prepare(query);
    const results = stmt.all(...params);

    return {
      total: results.length,
      products: results
    };
  }
}

module.exports = SearchService;
