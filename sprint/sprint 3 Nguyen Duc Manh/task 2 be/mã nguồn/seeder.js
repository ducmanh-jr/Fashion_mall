/**
 * Task 2 BE: Catalog & Order Seeder Service (HTTMDTTHA-12)
 * Seeds sample categories, 20 real products with exact user-provided image files, inventory, and order records.
 * Developer: Nguyen Duc Manh
 */

const categoriesData = [
  { id: 1, name: 'Giày Sneaker & Thể Thao', slug: 'giay-sneaker-the-thao', description: 'Giày thể thao, sneaker chính hãng từ Adidas, Nike, Puma, Balenciaga, Gucci' },
  { id: 2, name: 'Thời Trang Streetwear & Áo Khoác', slug: 'thoi-trang-streetwear-ao-khoac', description: 'Áo hoodie, sweater, jacket và t-shirt phong cách streetwear' },
  { id: 3, name: 'Quần & Phụ Kiện Thời Trang', slug: 'quan-phu-kien-thoi-trang', description: 'Quần cargo, jogger, túi xách, mũ, kính mát và phụ kiện cao cấp' }
];

const sampleProducts = [
  // 1. Giày Adidas Samba OG Classic
  { id: 101, seller_id: 10, category_id: 1, name: 'Giày Adidas Samba OG Classic White Black', slug: 'giay-adidas-samba-og-classic', base_price: 2790000.00, stock: 45, images: ['img/addidas samba.jpg'] },
  
  // 2. Áo Hoodie Zip Adidas Sakura
  { id: 102, seller_id: 10, category_id: 2, name: 'Áo Hoodie Zip Adidas Sakura Special Edition', slug: 'ao-hoodie-zip-adidas-sakura', base_price: 2190000.00, stock: 30, images: ['img/Adidas sakura zip up hoodie.jpg'] },
  
  // 3. Giày Balenciaga Track 4.0
  { id: 103, seller_id: 10, category_id: 1, name: 'Giày Balenciaga Track 4.0 Mesh & Nylon 2009', slug: 'giay-balenciaga-track-40-mesh-nylon', base_price: 24500000.00, stock: 12, images: ['img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg'] },
  
  // 4. Giày Balenciaga Track Thug Edition
  { id: 104, seller_id: 10, category_id: 1, name: 'Giày Balenciaga Track Thug Edition Black', slug: 'giay-balenciaga-track-thug-edition-black', base_price: 23900000.00, stock: 8, images: ['img/#balanciagatrack#thug 🥷🏿.jpg'] },
  
  // 5. Giày Balenciaga Runner Multi-Color
  { id: 105, seller_id: 10, category_id: 1, name: 'Giày Balenciaga Runner Multi-Color Vintage', slug: 'giay-balenciaga-runner-multi-color', base_price: 25900000.00, stock: 15, images: ['img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg'] },
  
  // 6. Giày Sneaker Gucci Ace Web Leather
  { id: 106, seller_id: 11, category_id: 1, name: 'Giày Sneaker Thể Thao Gucci Ace Web Leather', slug: 'giay-sneaker-the-thao-gucci-ace-web', base_price: 18900000.00, stock: 20, images: ['img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg'] },
  
  // 7. Giày Gucci Screener Collection
  { id: 107, seller_id: 11, category_id: 1, name: 'Giày Gucci Screener Leather Sneaker Collection', slug: 'giay-gucci-screener-leather-sneaker', base_price: 19800000.00, stock: 14, images: ['img/Some of favorite Gucci from recent collection 🔥….jpg'] },
  
  // 8. Giày Nike Air Max Summer 2024
  { id: 108, seller_id: 11, category_id: 1, name: 'Giày Nike Air Max Summer Collection 2024', slug: 'giay-nike-air-max-summer-2024', base_price: 3890000.00, stock: 60, images: ["img/Nike men's summer sneaker (men shoe collection for 2024).jpg"] },
  
  // 9. Giày Puma Suede Classic
  { id: 109, seller_id: 11, category_id: 1, name: 'Giày Puma Suede Classic Fall Footwear Edition', slug: 'giay-puma-suede-classic-fall-footwear', base_price: 2190000.00, stock: 85, images: ['img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg'] },
  
  // 10. Áo Khoác Oversized Balenciaga Ripped
  { id: 110, seller_id: 12, category_id: 2, name: 'Áo Khoác Denim Oversized Ripped Balenciaga Vintage', slug: 'ao-khoac-denim-oversized-ripped-balenciaga', base_price: 32000000.00, stock: 5, images: ['img/Oversized ripped balenciaga jacket.jpg'] },
  
  // 11. Áo T-Shirt Streetwear Graphic Print
  { id: 111, seller_id: 12, category_id: 2, name: 'Áo T-Shirt Streetwear Oversized Graphic Print', slug: 'ao-t-shirt-streetwear-oversized-graphic', base_price: 450000.00, stock: 120, images: ['img/108930884729091904.jpg'] },
  
  // 12. Áo Sweater Unisex Thermal Fleece
  { id: 112, seller_id: 12, category_id: 2, name: 'Áo Sweater Unisex Thermal Fleece Warm', slug: 'ao-sweater-unisex-thermal-fleece', base_price: 690000.00, stock: 95, images: ['img/12173861489974136.jpg'] },
  
  // 13. Quần Cargo Pants Multi-Pocket
  { id: 113, seller_id: 13, category_id: 3, name: 'Quần Cargo Pants Multi-Pocket Tactical Heavyweight', slug: 'quan-cargo-pants-multi-pocket-tactical', base_price: 790000.00, stock: 75, images: ['img/20758848278669764.jpg'] },
  
  // 14. Mũ Snapback Streetwear Embroidered
  { id: 114, seller_id: 13, category_id: 3, name: 'Mũ Cap Snapback Streetwear Embroidered Logo', slug: 'mu-cap-snapback-streetwear-embroidered', base_price: 350000.00, stock: 150, images: ['img/267823509086088024.jpg'] },
  
  // 15. Túi Crossbody Bag Urban Techwear
  { id: 115, seller_id: 13, category_id: 3, name: 'Túi Crossbody Bag Waterproof Urban Techwear', slug: 'tui-crossbody-bag-waterproof-urban-techwear', base_price: 890000.00, stock: 40, images: ['img/298926494039684010.jpg'] },
  
  // 16. Áo Varsity Jacket Leather Sleeve
  { id: 116, seller_id: 12, category_id: 2, name: 'Áo Varsity Jacket Leather Sleeve College Style', slug: 'ao-varsity-jacket-leather-sleeve-college', base_price: 1890000.00, stock: 25, images: ['img/34551122141164310.jpg'] },
  
  // 17. Quần Jogger Pants Cotton Slim Fit
  { id: 117, seller_id: 13, category_id: 3, name: 'Quần Jogger Pants Cotton Slim Fit Sporty', slug: 'quan-jogger-pants-cotton-slim-fit', base_price: 490000.00, stock: 110, images: ['img/420734790192673506.jpg'] },
  
  // 18. Kính Mát Retro Sunglasses UV400
  { id: 118, seller_id: 14, category_id: 3, name: 'Kính Mát Retro Sunglasses UV400 Protection', slug: 'kinh-mat-retro-sunglasses-uv400', base_price: 590000.00, stock: 65, images: ['img/735423814186937745.jpg'] },
  
  // 19. Thắt Lưng Leather Belt Buckle Signature
  { id: 119, seller_id: 14, category_id: 3, name: 'Thắt Lưng Leather Belt Buckle Signature Edition', slug: 'that-lung-leather-belt-buckle-signature', base_price: 850000.00, stock: 50, images: ['img/896427500813736912.jpg'] },
  
  // 20. Balo Backpack Multi-Function Waterproof 25L
  { id: 120, seller_id: 14, category_id: 3, name: 'Balo Backpack Multi-Function Waterproof 25L', slug: 'balo-backpack-multi-function-waterproof-25l', base_price: 1250000.00, stock: 35, images: ['img/96545985755445816.jpg'] }
];

class SeederService {
  constructor(db) {
    this.db = db;
  }

  /**
   * Seed all 20 exact products, categories, real image paths, inventory, and sample orders (Jira HTTMDTTHA-12)
   */
  runSeed() {
    // 1. Seed Categories
    const catStmt = this.db.prepare(`
      INSERT OR REPLACE INTO Categories (id, name, slug, description, status)
      VALUES (?, ?, ?, ?, 'ACTIVE');
    `);
    categoriesData.forEach(c => catStmt.run(c.id, c.name, c.slug, c.description));

    // 2. Seed Products & Inventories & Images
    const prodStmt = this.db.prepare(`
      INSERT OR REPLACE INTO Products (id, seller_id, category_id, name, slug, description, base_price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE');
    `);

    const invStmt = this.db.prepare(`
      INSERT OR REPLACE INTO Inventories (product_id, quantity, reserved_quantity, low_stock_threshold, status)
      VALUES (?, ?, 0, 5, ?);
    `);

    const imgStmt = this.db.prepare(`
      INSERT INTO Product_Images (product_id, image_url, is_primary, display_order)
      VALUES (?, ?, ?, ?);
    `);

    sampleProducts.forEach(p => {
      prodStmt.run(p.id, p.seller_id, p.category_id, p.name, p.slug, `Mô tả sản phẩm mẫu cao cấp cho ${p.name}`, p.base_price);
      
      let stockStatus = 'IN_STOCK';
      if (p.stock === 0) stockStatus = 'OUT_OF_STOCK';
      else if (p.stock <= 5) stockStatus = 'LOW_STOCK';
      
      invStmt.run(p.id, p.stock, stockStatus);

      // Clean existing images and insert primary/gallery images
      this.db.prepare('DELETE FROM Product_Images WHERE product_id = ?').run(p.id);
      p.images.forEach((url, idx) => {
        imgStmt.run(p.id, url, idx === 0 ? 1 : 0, idx + 1);
      });
    });

    // 3. Seed Sample Orders & Payment Records
    this.db.prepare(`
      INSERT OR REPLACE INTO Orders (id, order_code, user_id, total_amount, shipping_address, status, payment_status)
      VALUES 
      (1, 'ORD-2026-001', 1001, 2790000.00, '123 Le Loi, Q1, HCM', 'PENDING', 'UNPAID'),
      (2, 'ORD-2026-002', 1002, 18900000.00, '456 Tran Hung Dao, Q5, HCM', 'PENDING', 'UNPAID'),
      (3, 'ORD-2026-003', 1003, 34990000.00, '789 Nguyen Hue, Q1, HCM', 'CONFIRMED', 'PAID');
    `).run();

    this.db.prepare(`
      INSERT OR REPLACE INTO Order_Items (id, order_id, product_id, price, quantity, subtotal)
      VALUES 
      (1, 1, 101, 2790000.00, 1, 2790000.00),
      (2, 2, 106, 18900000.00, 1, 18900000.00),
      (3, 3, 102, 34990000.00, 1, 34990000.00);
    `).run();

    return {
      success: true,
      categoriesCount: categoriesData.length,
      productsCount: sampleProducts.length,
      message: `Seeded ${categoriesData.length} categories, ${sampleProducts.length} real sample products with exact image assets successfully.`
    };
  }
}

module.exports = SeederService;
