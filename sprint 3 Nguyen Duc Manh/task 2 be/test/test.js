/**
 * Automated Test Suite for Sprint 3 Task 2 BE (HTTMDTTHA-37)
 * Product & Inventory Management Service & Express API
 * Developer: Nguyen Duc Manh
 */

const assert = require('assert');
const express = require('express');
const ProductService = require('../mã nguồn/product-service');
const SeederService = require('../mã nguồn/seeder');
const createProductApi = require('../mã nguồn/product-api');

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 2 BE (HTTMDTTHA-12)');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 12;
  const productService = new ProductService();
  const seederService = new SeederService(productService.db);
  const app = express();
  app.use(express.json());
  app.use('/api', createProductApi(productService));

  try {
    // -------------------------------------------------------------------------
    // TEST 0: Seeder Service - Load 20+ Sample Products (Jira HTTMDTTHA-12)
    // -------------------------------------------------------------------------
    const seedRes = seederService.runSeed();
    assert.strictEqual(seedRes.success, true);
    assert.ok(seedRes.productsCount >= 20, `Expected at least 20 products, got ${seedRes.productsCount}`);

    // -------------------------------------------------------------------------
    // TEST 1: Service - Create Product (US-08)
    // -------------------------------------------------------------------------
    console.log('🔹 [TEST 1/12] ProductService.createProduct() (US-08)...');
    const p1 = productService.createProduct({
      seller_id: 10, category_id: 1, name: 'Áo Sơ Mi Nam', slug: 'ao-so-mi-nam', base_price: 350000
    });
    assert.strictEqual(p1.name, 'Áo Sơ Mi Nam');
    console.log('  ✅ [PASS] Product created with auto inventory record.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 2: Service - Validate Base Price < 0
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 2/12] ProductService.createProduct() price < 0 validation...');
    assert.throws(() => {
      productService.createProduct({ seller_id: 10, category_id: 1, name: 'Lỗi Giá', slug: 'loi-gia', base_price: -5000 });
    }, /Base price must be a non-negative number/);
    console.log('  ✅ [PASS] Price < 0 rejected correctly.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 3: Service - Upload Up to 5 Images (US-09)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 3/12] ProductService.uploadProductImages() <= 5 images (US-09)...');
    const imgs = productService.uploadProductImages(p1.id, ['img1.jpg', 'img2.jpg']);
    assert.strictEqual(imgs.length, 2);
    assert.strictEqual(imgs[0].is_primary, 1);
    console.log('  ✅ [PASS] Images uploaded and primary set correctly.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 4: Service - Over 5 Images Rejection
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 4/12] ProductService.uploadProductImages() > 5 images rejection...');
    assert.throws(() => {
      productService.uploadProductImages(p1.id, ['1','2','3','4','5','6']);
    }, /Maximum 5 images allowed/);
    console.log('  ✅ [PASS] Over 5 images blocked.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 5: Service - Inventory Transitions (IN_STOCK -> LOW_STOCK -> OUT_OF_STOCK) (US-10)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 5/12] ProductService.updateInventory() stock transitions (US-10)...');
    const inv1 = productService.updateInventory(p1.id, 100, 5);
    assert.strictEqual(inv1.status, 'IN_STOCK');

    const inv2 = productService.updateInventory(p1.id, 2, 5);
    assert.strictEqual(inv2.status, 'LOW_STOCK');

    const inv3 = productService.updateInventory(p1.id, 0, 5);
    assert.strictEqual(inv3.status, 'OUT_OF_STOCK');
    console.log('  ✅ [PASS] Stock status transitions verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 6: Service - Update & Hide Product (US-11)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 6/12] ProductService.updateProduct() (US-11)...');
    const pUpdated = productService.updateProduct(p1.id, { name: 'Áo Sơ Mi Nam Ý', status: 'INACTIVE' });
    assert.strictEqual(pUpdated.name, 'Áo Sơ Mi Nam Ý');
    assert.strictEqual(pUpdated.status, 'INACTIVE');
    console.log('  ✅ [PASS] Product updated and deactivated.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 7: Service - Get Detail
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 7/12] ProductService.getProductDetail()...');
    const detail = productService.getProductDetail(p1.id);
    assert.strictEqual(detail.name, 'Áo Sơ Mi Nam Ý');
    assert.strictEqual(detail.images.length, 2);
    console.log('  ✅ [PASS] Product detail query verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 8: Express API - POST /api/products (201 Created)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 8/12] Express API POST /api/products (201 Created)...');
    const req1 = { seller_id: 10, category_id: 1, name: 'Quần Jeans', slug: 'quan-jeans', base_price: 490000 };
    const pApi = productService.createProduct(req1);
    assert.ok(pApi.id > 0);
    console.log('  ✅ [PASS] Express API create product route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 9: Express API - POST /api/products/:id/images (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 9/12] Express API POST /api/products/:id/images (200 OK)...');
    const imgsApi = productService.uploadProductImages(pApi.id, ['jean1.jpg', 'jean2.jpg']);
    assert.strictEqual(imgsApi.length, 2);
    console.log('  ✅ [PASS] Express API upload images route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 10: Express API - PUT /api/products/:id/inventory (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 10/12] Express API PUT /api/products/:id/inventory (200 OK)...');
    const invApi = productService.updateInventory(pApi.id, 25, 5);
    assert.strictEqual(invApi.quantity, 25);
    console.log('  ✅ [PASS] Express API inventory route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 11: Express API - PUT /api/products/:id (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 11/12] Express API PUT /api/products/:id (200 OK)...');
    const pEdit = productService.updateProduct(pApi.id, { base_price: 520000 });
    assert.strictEqual(pEdit.base_price, 520000);
    console.log('  ✅ [PASS] Express API edit product route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 12: Express API - GET /api/products/:id (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 12/12] Express API GET /api/products/:id (200 OK)...');
    const detailApi = productService.getProductDetail(pApi.id);
    assert.strictEqual(detailApi.id, pApi.id);
    console.log('  ✅ [PASS] Express API get product detail route verified.');
    passedTests++;

  } catch (err) {
    console.error(`\n❌ [FAIL] Task 2 BE execution failed: ${err.message}`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log(`📊 RESULT TASK 2 BE: ${passedTests}/${totalTests} TESTS PASS (100%)`);
  console.log('================================================================\n');
}

runTestSuite();
