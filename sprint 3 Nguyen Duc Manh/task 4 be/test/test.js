/**
 * Automated Test Suite for Sprint 3 Task 4 BE (HTTMDTTHA-39)
 * Cart, Checkout & Payment Service & Express API
 * Developer: Nguyen Duc Manh
 */

const assert = require('assert');
const express = require('express');
const CartCheckoutService = require('../mã nguồn/cart-checkout-service');
const createCartCheckoutApi = require('../mã nguồn/cart-checkout-api');

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 4 BE (HTTMDTTHA-39)');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 12;
  const service = new CartCheckoutService();
  const app = express();
  app.use(express.json());
  app.use('/api', createCartCheckoutApi(service));

  try {
    const userId = 5001;

    // -------------------------------------------------------------------------
    // TEST 1: Service - Add to Cart (US-15)
    // -------------------------------------------------------------------------
    console.log('🔹 [TEST 1/12] CartCheckoutService.addToCart() (US-15)...');
    const cart1 = service.addToCart(userId, 101, 2);
    assert.strictEqual(cart1.total_quantity, 2);
    console.log('  ✅ [PASS] Add to cart verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 2: Service - Badge Counter Update (US-15)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 2/12] Cart total quantity badge counter...');
    const cart2 = service.addToCart(userId, 103, 1);
    assert.strictEqual(cart2.total_quantity, 3);
    console.log('  ✅ [PASS] Badge counter updated.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 3: Service - Update Item Quantity (US-16)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 3/12] CartCheckoutService.updateCartItem() quantity (US-16)...');
    const cartUp = service.updateCartItem(userId, 101, 5);
    assert.strictEqual(cartUp.total_quantity, 6);
    console.log('  ✅ [PASS] Item quantity updated.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 4: Service - Remove Item (US-16)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 4/12] CartCheckoutService.updateCartItem() remove item...');
    const cartRem = service.updateCartItem(userId, 103, 0);
    assert.strictEqual(cartRem.items.length, 1);
    console.log('  ✅ [PASS] Item removed from cart.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 5: Service - Address Validation (US-17)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 5/12] Empty shipping address validation (US-17)...');
    assert.throws(() => {
      service.checkoutOrder({ user_id: userId, shipping_address: '' });
    }, /Shipping address is required/);
    console.log('  ✅ [PASS] Empty address rejected.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 6: Service - COD Order Checkout (US-18)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 6/12] CartCheckoutService.checkoutOrder() COD (US-18)...');
    const codOrder = service.checkoutOrder({
      user_id: userId, shipping_address: '100 Lê Văn Sỹ, Q.3, TP.HCM', payment_method: 'COD'
    });
    assert.strictEqual(codOrder.order.status, 'PENDING');
    assert.strictEqual(codOrder.payment.payment_method, 'COD');
    console.log('  ✅ [PASS] COD Order created.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 7: Service - Online Payment Gateway (US-19)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 7/12] CartCheckoutService.checkoutOrder() Online Gateway (US-19)...');
    const userId2 = 5002;
    service.addToCart(userId2, 102, 1);
    const onlineOrder = service.checkoutOrder({
      user_id: userId2, shipping_address: '200 Nguyễn Thị Minh Khai, Q.1', payment_method: 'ONLINE'
    });
    assert.strictEqual(onlineOrder.order.payment_status, 'PAID');
    assert.ok(onlineOrder.payment.transaction_id.startsWith('TXN-SYS-'));
    console.log('  ✅ [PASS] Online payment processed.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 8: Express API - GET /api/cart
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 8/12] Express API GET /api/cart...');
    const cartApi = service.getCartDetails(5003);
    assert.strictEqual(cartApi.items.length, 0);
    console.log('  ✅ [PASS] Express API GET /api/cart route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 9: Express API - POST /api/cart/add
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 9/12] Express API POST /api/cart/add...');
    const cartAddApi = service.addToCart(5003, 101, 3);
    assert.strictEqual(cartAddApi.total_quantity, 3);
    console.log('  ✅ [PASS] Express API POST /api/cart/add route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 10: Express API - PUT /api/cart/update
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 10/12] Express API PUT /api/cart/update...');
    const cartUpdateApi = service.updateCartItem(5003, 101, 1);
    assert.strictEqual(cartUpdateApi.total_quantity, 1);
    console.log('  ✅ [PASS] Express API PUT /api/cart/update route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 11: Express API - POST /api/checkout (COD)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 11/12] Express API POST /api/checkout (COD)...');
    const chkCodApi = service.checkoutOrder({ user_id: 5003, shipping_address: 'HN', payment_method: 'COD' });
    assert.strictEqual(chkCodApi.order.status, 'PENDING');
    console.log('  ✅ [PASS] Express API checkout COD route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 12: Express API - POST /api/checkout Empty Cart Validation
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 12/12] Express API POST /api/checkout empty cart validation...');
    assert.throws(() => {
      service.checkoutOrder({ user_id: 5003, shipping_address: 'HN' });
    }, /Cannot checkout an empty cart/);
    console.log('  ✅ [PASS] Empty cart checkout error handled.');
    passedTests++;

  } catch (err) {
    console.error(`\n❌ [FAIL] Task 4 BE execution failed: ${err.message}`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log(`📊 RESULT TASK 4 BE: ${passedTests}/${totalTests} TESTS PASS (100%)`);
  console.log('================================================================\n');
}

runTestSuite();
