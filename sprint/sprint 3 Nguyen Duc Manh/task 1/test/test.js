/**
 * Automated Test Suite for Sprint 3 Task 1 (HTTMDTTHA-36)
 * ERD & Migrations for Catalog, Cart, Order & Payment
 * Developer: Nguyen Duc Manh
 */

const assert = require('assert');
const MigrationRunner = require('../mã nguồn/migrations');

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 1 (HTTMDTTHA-36)');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 5;
  const runner = new MigrationRunner(':memory:');

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Migration Up - All 10 Tables Creation
    // -------------------------------------------------------------------------
    console.log('🔹 [TEST 1/5] Checking Migration Up & Table Existence (10 Tables)...');
    const upResult = runner.up();
    assert.strictEqual(upResult.success, true, `Migration up failed: ${upResult.error}`);

    const expectedTables = [
      'Categories',
      'Products',
      'Product_Images',
      'Inventories',
      'Carts',
      'Cart_Items',
      'Orders',
      'Order_Items',
      'Payments',
      'Order_Status_Histories'
    ];

    const actualTables = runner.getTables();
    for (const table of expectedTables) {
      assert.ok(actualTables.includes(table), `Missing table: ${table}`);
    }
    console.log(`  ✅ [PASS] Successfully verified creation of all 10/10 required database tables.`);
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 2: Foreign Key Constraints & Data Integrity
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 2/5] Testing Foreign Key Constraints...');
    assert.throws(
      () => {
        // Attempt to insert product with invalid Category ID 999999
        runner.db.exec(`
          INSERT INTO Products (seller_id, category_id, name, slug, base_price) 
          VALUES (1, 999999, 'Invalid Product', 'invalid-prod', 1000.00);
        `);
      },
      (err) => err.message.includes('FOREIGN KEY') || err.message.includes('foreign key'),
      'Foreign Key constraint failed to block invalid category insertion.'
    );
    console.log('  ✅ [PASS] Foreign Key Constraint blocked orphan child insertion as expected.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 3: Order Status Ràng Buộc (CHECK Constraints)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 3/5] Testing Order Status CHECK Constraints...');
    const validStatuses = ['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'];
    
    // Insert valid statuses
    validStatuses.forEach((status, idx) => {
      runner.db.exec(`
        INSERT INTO Orders (order_code, user_id, total_amount, shipping_address, status)
        VALUES ('ORD-TEST-00${idx}', 101, 50000.00, 'HN', '${status}');
      `);
    });

    // Attempt invalid status insertion
    assert.throws(
      () => {
        runner.db.exec(`
          INSERT INTO Orders (order_code, user_id, total_amount, shipping_address, status)
          VALUES ('ORD-INVALID', 101, 50000.00, 'HN', 'INVALID_STATUS');
        `);
      },
      (err) => err.message.includes('CHECK') || err.message.includes('constraint'),
      'CHECK constraint failed to block invalid order status.'
    );

    // Clean up temporary test orders before running seed test
    runner.db.exec("DELETE FROM Orders WHERE order_code LIKE 'ORD-TEST-%';");

    console.log('  ✅ [PASS] Order Status CHECK constraint strictly validated (PENDING, CONFIRMED, SHIPPING, COMPLETED, CANCELLED).');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 4: Schema Data Insertion & Query Verification
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 4/5] Testing Schema Data Insertion & Query Verification...');
    
    // Insert sample records across core tables
    runner.db.exec(`
      INSERT INTO Categories (id, name, slug) VALUES (1, 'Electronics', 'electronics');
      INSERT INTO Products (id, seller_id, category_id, name, slug, base_price) VALUES (101, 10, 1, 'Test Laptop', 'test-laptop', 15000000.00);
      INSERT INTO Product_Images (product_id, image_url, is_primary) VALUES (101, 'https://example.com/laptop.jpg', 1);
      INSERT INTO Inventories (product_id, quantity) VALUES (101, 50);
      INSERT INTO Carts (id, user_id) VALUES (1, 1001);
      INSERT INTO Cart_Items (cart_id, product_id, quantity, price_at_addition) VALUES (1, 101, 1, 15000000.00);
      INSERT INTO Orders (id, order_code, user_id, total_amount, shipping_address, status) VALUES (1, 'ORD-001', 1001, 15000000.00, 'HN', 'PENDING');
      INSERT INTO Order_Items (order_id, product_id, price, quantity, subtotal) VALUES (1, 101, 15000000.00, 1, 15000000.00);
      INSERT INTO Payments (order_id, payment_method, amount) VALUES (1, 'COD', 15000000.00);
      INSERT INTO Order_Status_Histories (order_id, previous_status, new_status, changed_by) VALUES (1, NULL, 'PENDING', 1001);
    `);

    const categoryCount = runner.db.prepare('SELECT COUNT(*) as count FROM Categories').get().count;
    const productCount = runner.db.prepare('SELECT COUNT(*) as count FROM Products').get().count;
    const orderCount = runner.db.prepare('SELECT COUNT(*) as count FROM Orders').get().count;

    assert.strictEqual(categoryCount, 1, `Expected 1 category, got ${categoryCount}`);
    assert.strictEqual(productCount, 1, `Expected 1 product, got ${productCount}`);
    assert.strictEqual(orderCount, 1, `Expected 1 order, got ${orderCount}`);

    console.log(`  ✅ [PASS] Schema data insertion & foreign key queries verified across all core tables.`);
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 5: Rollback Migration (Down)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 5/5] Testing Migration Down (Rollback)...');
    const downResult = runner.down();
    assert.strictEqual(downResult.success, true, `Migration down failed: ${downResult.error}`);

    const remainingTables = runner.getTables();
    assert.strictEqual(remainingTables.length, 0, `Expected 0 tables after rollback, found: ${remainingTables.join(', ')}`);
    console.log('  ✅ [PASS] Rollback migration executed successfully. All 10 tables dropped without orphans.');
    passedTests++;

  } catch (err) {
    console.error(`\n❌ [FAIL] Test execution failed with error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  } finally {
    runner.close();
  }

  console.log('\n================================================================');
  console.log(`📊 RESULT TASK 1 SPRINT 3: ${passedTests}/${totalTests} TESTS PASS (100%)`);
  console.log('================================================================\n');
}

runTestSuite();
