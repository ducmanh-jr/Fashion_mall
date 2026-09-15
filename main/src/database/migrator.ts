import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Migrator {
  static up(): void {
    console.log(">> [Migrator] Đang khởi chạy schema CSDL...");
    const schemaPath = path.resolve(__dirname, "schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");
    db.exec(sql);
    console.log("✅ [Migrator] Tạo 12 bảng CSDL và indexes thành công!");
  }

  static seed(): void {
    console.log(">> [Migrator] Đang nạp dữ liệu mẫu (seed data)...");
    const seedPath = path.resolve(__dirname, "seed.sql");
    const sql = fs.readFileSync(seedPath, "utf-8");
    db.exec(sql);
    console.log("✅ [Migrator] Nạp dữ liệu mẫu cho Users, Brands, Products, Variants thành công!");
  }

  static down(): void {
    console.log(">> [Migrator] Đang xóa sạch các bảng CSDL...");
    db.exec(`
      DROP TABLE IF EXISTS Product_Reviews;
      DROP TABLE IF EXISTS Wallet_Transactions;
      DROP TABLE IF EXISTS Seller_Wallets;
      DROP TABLE IF EXISTS Promotions;
      DROP TABLE IF EXISTS Shipping_Channels;
      DROP TABLE IF EXISTS Shops;
      DROP TABLE IF EXISTS Order_Status_Histories;
      DROP TABLE IF EXISTS Payments;
      DROP TABLE IF EXISTS Order_Items;
      DROP TABLE IF EXISTS Orders;
      DROP TABLE IF EXISTS Cart_Items;
      DROP TABLE IF EXISTS Carts;
      DROP TABLE IF EXISTS Inventories;
      DROP TABLE IF EXISTS Product_Images;
      DROP TABLE IF EXISTS Product_Variants;
      DROP TABLE IF EXISTS Products;
      DROP TABLE IF EXISTS Brands;
      DROP TABLE IF EXISTS Categories;
      DROP TABLE IF EXISTS Users;
    `);
    console.log("✅ [Migrator] Đã xóa toàn bộ bảng!");
  }
}

// CLI execution
const command = process.argv[2];
if (command === "up") {
  Migrator.up();
} else if (command === "seed") {
  Migrator.seed();
} else if (command === "down") {
  Migrator.down();
} else if (command === "reset") {
  Migrator.down();
  Migrator.up();
  Migrator.seed();
}
