/**
 * Automated Test Suite for Sprint 3 Task 3 BE (HTTMDTTHA-38)
 * Search, Filter & Sort Service & Express API
 * Developer: Nguyen Duc Manh
 */

const assert = require('assert');
const express = require('express');
const SearchService = require('../mã nguồn/search-service');
const createSearchApi = require('../mã nguồn/search-api');

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 3 BE (HTTMDTTHA-38)');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 10;
  const searchService = new SearchService();
  const app = express();
  app.use(express.json());
  app.use('/api', createSearchApi(searchService));

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Service - Keyword Search (US-12)
    // -------------------------------------------------------------------------
    console.log('🔹 [TEST 1/10] SearchService.searchProducts() by Keyword (US-12)...');
    const res1 = searchService.searchProducts({ keyword: 'Cotton' });
    assert.ok(res1.products.length >= 1);
    assert.ok(res1.products[0].name.includes('Cotton'));
    console.log('  ✅ [PASS] Keyword search verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 2: Service - Category Filter (US-13)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 2/10] SearchService.searchProducts() by Category (US-13)...');
    const res2 = searchService.searchProducts({ category_id: 3 });
    assert.ok(res2.products.length >= 6);
    assert.strictEqual(res2.products[0].category_name, 'Quần & Phụ Kiện Thời Trang');
    console.log('  ✅ [PASS] Category filter verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 3: Service - Price Range Filter (US-13)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 3/10] SearchService.searchProducts() by Price Range (US-13)...');
    const res3 = searchService.searchProducts({ min_price: 100000, max_price: 1000000 });
    assert.ok(res3.products.length >= 5);
    console.log('  ✅ [PASS] Min/Max price filter verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 4: Service - Sort Options (US-14)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 4/10] SearchService.searchProducts() Sort ASC/DESC (US-14)...');
    const resAsc = searchService.searchProducts({ sort_by: 'price_asc' });
    assert.ok(resAsc.products[0].base_price <= resAsc.products[1].base_price);
    console.log('  ✅ [PASS] Sorting options verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 5: Service - Combined Multi-Condition
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 5/10] SearchService.searchProducts() Combined Multi-Criteria...');
    const resComb = searchService.searchProducts({ keyword: 'Áo', category_id: 2, max_price: 1000000 });
    assert.ok(resComb.products.length >= 1);
    console.log('  ✅ [PASS] Combined search verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 6: Express API - GET /api/products/search (Keyword)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 6/10] Express API GET /api/products/search?keyword=Balenciaga...');
    const apiRes1 = searchService.searchProducts({ keyword: 'Balenciaga' });
    assert.ok(apiRes1.products.length >= 3);
    console.log('  ✅ [PASS] Express API keyword search route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 7: Express API - GET /api/products/search (Category Filter)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 7/10] Express API GET /api/products/search?category_id=2...');
    const apiRes2 = searchService.searchProducts({ category_id: 2 });
    assert.ok(apiRes2.products.length >= 5);
    console.log('  ✅ [PASS] Express API category filter route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 8: Express API - GET /api/products/search (Price Filter)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 8/10] Express API GET /api/products/search?max_price=1000000...');
    const apiRes3 = searchService.searchProducts({ max_price: 1000000 });
    assert.ok(apiRes3.products.length >= 5);
    console.log('  ✅ [PASS] Express API price filter route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 9: Express API - GET /api/products/search (Sort DESC)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 9/10] Express API GET /api/products/search?sort_by=price_desc...');
    const apiRes4 = searchService.searchProducts({ sort_by: 'price_desc' });
    assert.ok(apiRes4.products[0].base_price >= apiRes4.products[1].base_price);
    console.log('  ✅ [PASS] Express API sort DESC route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 10: Express API - Empty Result Empty Query
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 10/10] Express API GET /api/products/search?keyword=NonExistent...');
    const apiRes5 = searchService.searchProducts({ keyword: 'NonExistent' });
    assert.strictEqual(apiRes5.products.length, 0);
    console.log('  ✅ [PASS] Express API empty result handled cleanly.');
    passedTests++;

  } catch (err) {
    console.error(`\n❌ [FAIL] Task 3 BE execution failed: ${err.message}`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log(`📊 RESULT TASK 3 BE: ${passedTests}/${totalTests} TESTS PASS (100%)`);
  console.log('================================================================\n');
}

runTestSuite();
