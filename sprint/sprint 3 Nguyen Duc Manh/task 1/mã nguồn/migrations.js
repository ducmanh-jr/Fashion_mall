/**
 * Migration Runner for Catalog, Cart, Order & Payment Database (HTTMDTTHA-36)
 * Built with native Node.js SQLite (DatabaseSync)
 * Developer: Nguyen Duc Manh
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

class MigrationRunner {
  constructor(dbPath = ':memory:') {
    this.db = new DatabaseSync(dbPath);
    // Enforce foreign key constraints in SQLite
    this.db.exec('PRAGMA foreign_keys = ON;');
  }

  /**
   * Run forward migration: Creates all 10 tables and indexes
   */
  up() {
    try {
      const sql = fs.readFileSync(SCHEMA_PATH, 'utf8');
      this.db.exec(sql);
      return { success: true, message: 'Migrations applied successfully (10 tables created).' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Run reverse migration: Drops all 10 tables in reverse dependency order
   */
  down() {
    try {
      const dropOrder = [
        'Order_Status_Histories',
        'Payments',
        'Order_Items',
        'Orders',
        'Cart_Items',
        'Carts',
        'Inventories',
        'Product_Images',
        'Products',
        'Categories'
      ];

      for (const table of dropOrder) {
        this.db.exec(`DROP TABLE IF EXISTS ${table};`);
      }
      return { success: true, message: 'Rollback completed (All 10 tables dropped).' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get list of created tables in the database
   */
  getTables() {
    const stmt = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;");
    const rows = stmt.all();
    return rows.map(r => r.name);
  }

  /**
   * Check if a table exists
   */
  hasTable(tableName) {
    const tables = this.getTables();
    return tables.includes(tableName);
  }

  /**
   * Close database connection
   */
  close() {
    this.db.close();
  }
}

module.exports = MigrationRunner;

// If executed directly from CLI: node migrations.js [up|down|status]
if (require.main === module) {
  const command = process.argv[2] || 'up';
  const runner = new MigrationRunner('shoppe_sprint3.db');

  if (command === 'up') {
    console.log(runner.up().message);
  } else if (command === 'down') {
    console.log(runner.down().message);
  } else if (command === 'status') {
    console.log('Tables present:', runner.getTables());
  } else {
    console.log('Unknown command. Use up, down, or status.');
  }
}
