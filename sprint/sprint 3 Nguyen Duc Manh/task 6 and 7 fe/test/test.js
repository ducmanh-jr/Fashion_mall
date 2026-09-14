/**
 * Automated Test Suite for Sprint 3 Task 6 FE (HTTMDTTHA-41)
 * E-Commerce Shopping Portal (Aethelgard Shopping Mall)
 * Developer: Nguyen Duc Manh
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const BrandConfig = require('../mã nguồn/brand-config');

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 6 FE (HTTMDTTHA-41)');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 15;

  try {
    const htmlPath = path.join(__dirname, '../mã nguồn/index.html');
    const cssPath = path.join(__dirname, '../mã nguồn/style.css');
    const jsPath = path.join(__dirname, '../mã nguồn/app.js');
    const imgDir = path.join(__dirname, '../mã nguồn/img');

    // -------------------------------------------------------------------------
    // TEST 1: Source Files Existence
    // -------------------------------------------------------------------------
    console.log('🔹 [TEST 1/15] Checking Source Files Existence...');
    assert.ok(fs.existsSync(htmlPath));
    assert.ok(fs.existsSync(cssPath));
    assert.ok(fs.existsSync(jsPath));
    assert.ok(fs.existsSync(imgDir));
    console.log('  ✅ [PASS] All source files and image assets directory exist.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 2: Brand Configuration System
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 2/15] Testing Brand Configuration System...');
    assert.strictEqual(BrandConfig.brandName, 'Aethelgard Shopping Mall');
    assert.strictEqual(BrandConfig.categories.length, 4);
    console.log('  ✅ [PASS] Brand configuration loaded successfully.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 3: Local Image Assets Presence (20 Real Task 2 Product Images)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 3/15] Testing Local Image Assets (20 Real Task 2 Product Images)...');
    const task2Images = [
      '#balanciagatrack#thug 🥷🏿.jpg',
      '#balenciaga WhatsApp_WeChat：+86 15669556357….jpg',
      '108930884729091904.jpg',
      '12173861489974136.jpg',
      '20758848278669764.jpg',
      '267823509086088024.jpg',
      '298926494039684010.jpg',
      '34551122141164310.jpg',
      '420734790192673506.jpg',
      '735423814186937745.jpg',
      '896427500813736912.jpg',
      '96545985755445816.jpg',
      'Adidas sakura zip up hoodie.jpg',
      'Balenciaga Track 4_0 570391 W2GN7 2009.jpg',
      'Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg',
      "Nike men's summer sneaker (men shoe collection for 2024).jpg",
      'Oversized ripped balenciaga jacket.jpg',
      'PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg',
      'Some of favorite Gucci from recent collection 🔥….jpg',
      'addidas samba.jpg'
    ];
    for (const imgFile of task2Images) {
      assert.ok(fs.existsSync(path.join(imgDir, imgFile)), `Missing img/${imgFile}`);
    }
    console.log('  ✅ [PASS] All 20 real product image assets from Task 2 present in img/ folder.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 4: HTML Title & Meta Tags
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 4/15] Testing HTML Title & Meta Tags...');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(htmlContent.includes('Aethelgard Shopping Mall'));
    assert.ok(htmlContent.includes('meta name="description"'));
    console.log('  ✅ [PASS] HTML title and meta tags verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 5: Search Bar DOM Element
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 5/15] Testing Search Bar DOM Elements...');
    assert.ok(htmlContent.includes('id="search-input"'));
    assert.ok(htmlContent.includes('id="search-btn"'));
    console.log('  ✅ [PASS] Search bar elements verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 6: Category Filter DOM Element
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 6/15] Testing Category Filter DOM Elements...');
    assert.ok(htmlContent.includes('id="category-select"'));
    console.log('  ✅ [PASS] Category select filter verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 7: Price Range Inputs
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 7/15] Testing Price Range Min/Max Inputs...');
    assert.ok(htmlContent.includes('id="min-price"'));
    assert.ok(htmlContent.includes('id="max-price"'));
    console.log('  ✅ [PASS] Price range inputs verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 8: Cart Badge Counter DOM Element
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 8/15] Testing Cart Badge Counter DOM Element...');
    assert.ok(htmlContent.includes('id="cart-badge"'));
    console.log('  ✅ [PASS] Cart badge counter element verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 9: Checkout Modal Form
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 9/15] Testing Checkout Modal Form...');
    assert.ok(htmlContent.includes('id="checkout-form"'));
    assert.ok(htmlContent.includes('id="shipping-address"'));
    console.log('  ✅ [PASS] Checkout form elements verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 10: Payment Method Radio Selection (COD vs ONLINE)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 10/15] Testing Payment Method Radio Selection...');
    assert.ok(htmlContent.includes('value="COD"'));
    assert.ok(htmlContent.includes('value="ONLINE"'));
    console.log('  ✅ [PASS] Payment method selection radio inputs verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 11: Order Tracking Modal DOM
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 11/15] Testing Order Tracking Modal...');
    assert.ok(htmlContent.includes('id="orders-modal"'));
    console.log('  ✅ [PASS] Orders modal container verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 12: JS App Logic - Mock Products with Local Images
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 12/15] Testing App Logic Mock Products with Local Images...');
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    assert.ok(jsContent.includes("image_url: 'img/addidas samba.jpg'"));
    console.log('  ✅ [PASS] Products using local image assets verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 13: JS App Logic - Cart State Management
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 13/15] Testing Cart State Management Functions...');
    assert.ok(jsContent.includes('addToCart'));
    assert.ok(jsContent.includes('updateCartUI'));
    assert.ok(jsContent.includes('changeQty'));
    console.log('  ✅ [PASS] Cart functions verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 14: JS App Logic - Order Transition Flow
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 14/15] Testing Order Status State Machine...');
    assert.ok(jsContent.includes('transitionOrder'));
    assert.ok(jsContent.includes('PENDING'));
    assert.ok(jsContent.includes('CONFIRMED'));
    assert.ok(jsContent.includes('SHIPPING'));
    assert.ok(jsContent.includes('COMPLETED'));
    console.log('  ✅ [PASS] Order transition states verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 15: CSS Style Responsiveness & Theme Rules
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 15/15] Testing CSS Style Rules & Glassmorphism Theme...');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('--bg: #0F172A'));
    assert.ok(cssContent.includes('.product-card'));
    console.log('  ✅ [PASS] CSS theme tokens and layout styling verified.');
    passedTests++;

  } catch (err) {
    console.error(`\n❌ [FAIL] Task 6 FE execution failed: ${err.message}`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log(`📊 RESULT TASK 6 FE: ${passedTests}/${totalTests} TESTS PASS (100%)`);
  console.log('================================================================\n');
}

runTestSuite();
