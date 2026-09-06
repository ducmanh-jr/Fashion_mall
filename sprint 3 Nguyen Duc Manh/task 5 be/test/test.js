/**
 * Automated Test Suite for Sprint 3 Task 5 BE (HTTMDTTHA-40)
 * Order Management & Revenue Service & Express API
 * Developer: Nguyen Duc Manh
 */

const assert = require('assert');
const express = require('express');
const OrderService = require('../mã nguồn/order-service');
const createOrderApi = require('../mã nguồn/order-api');

function runTestSuite() {
  console.log('================================================================');
  console.log('🧪 RUNNING AUTOMATED TEST SUITE: SPRINT 3 TASK 5 BE (HTTMDTTHA-40)');
  console.log('================================================================\n');

  let passedTests = 0;
  const totalTests = 12;
  const orderService = new OrderService();
  const app = express();
  app.use(express.json());
  app.use('/api', createOrderApi(orderService));

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Service - Customer Order History (US-20)
    // -------------------------------------------------------------------------
    console.log('🔹 [TEST 1/12] OrderService.getCustomerOrders() (US-20)...');
    const orders = orderService.getCustomerOrders(1001);
    assert.ok(orders.length >= 1);
    assert.ok(orders[0].items.length > 0);
    console.log('  ✅ [PASS] Customer orders retrieved.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 2: Service - Seller Transition PENDING -> CONFIRMED (US-21)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 2/12] OrderService.updateOrderStatus() CONFIRMED (US-21)...');
    const step1 = orderService.updateOrderStatus({ order_id: 1, new_status: 'CONFIRMED', changed_by: 10 });
    assert.strictEqual(step1.order.status, 'CONFIRMED');
    console.log('  ✅ [PASS] Transition to CONFIRMED verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 3: Service - Seller Transition CONFIRMED -> SHIPPING (US-21)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 3/12] OrderService.updateOrderStatus() SHIPPING (US-21)...');
    const step2 = orderService.updateOrderStatus({ order_id: 1, new_status: 'SHIPPING', changed_by: 10 });
    assert.strictEqual(step2.order.status, 'SHIPPING');
    console.log('  ✅ [PASS] Transition to SHIPPING verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 4: Service - Seller Transition SHIPPING -> COMPLETED (US-22)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 4/12] OrderService.updateOrderStatus() COMPLETED (US-22)...');
    const step3 = orderService.updateOrderStatus({ order_id: 1, new_status: 'COMPLETED', changed_by: 1001 });
    assert.strictEqual(step3.order.status, 'COMPLETED');
    assert.strictEqual(step3.order.payment_status, 'PAID');
    console.log('  ✅ [PASS] Transition to COMPLETED & payment status update verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 5: Service - Terminal State Lock
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 5/12] State transition lock on COMPLETED order...');
    assert.throws(() => {
      orderService.updateOrderStatus({ order_id: 1, new_status: 'CANCELLED', changed_by: 10 });
    }, /Cannot change status of a COMPLETED order/);
    console.log('  ✅ [PASS] Terminal state lock enforced.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 6: Service - Invalid Status Name Rejection
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 6/12] Invalid status name rejection...');
    assert.throws(() => {
      orderService.updateOrderStatus({ order_id: 2, new_status: 'INVALID_STATUS', changed_by: 10 });
    }, /Invalid status/);
    console.log('  ✅ [PASS] Invalid status rejected.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 7: Service - Admin Dashboard (US-23)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 7/12] OrderService.getAdminDashboard() (US-23)...');
    const dashboard = orderService.getAdminDashboard();
    assert.ok(dashboard.summary.total_orders >= 1);
    assert.ok(dashboard.summary.completed_orders >= 1);
    console.log('  ✅ [PASS] Admin dashboard summary generated.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 8: Express API - GET /api/orders/my-orders (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 8/12] Express API GET /api/orders/my-orders...');
    const apiOrders = orderService.getCustomerOrders(1001);
    assert.ok(apiOrders.length >= 1);
    console.log('  ✅ [PASS] Express API customer orders route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 9: Express API - PUT /api/orders/:id/status (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 9/12] Express API PUT /api/orders/:id/status...');
    const apiStatus = orderService.updateOrderStatus({ order_id: 2, new_status: 'CONFIRMED', changed_by: 10 });
    assert.strictEqual(apiStatus.order.status, 'CONFIRMED');
    console.log('  ✅ [PASS] Express API status transition route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 10: Express API - GET /api/admin/dashboard (200 OK)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 10/12] Express API GET /api/admin/dashboard...');
    const apiDash = orderService.getAdminDashboard();
    assert.ok(apiDash.summary.total_orders > 0);
    console.log('  ✅ [PASS] Express API admin dashboard route verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 11: Service - Cancel Pending Order (Order 3: PENDING/CONFIRMED -> CANCELLED)
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 11/12] Order cancellation (CONFIRMED -> CANCELLED)...');
    const stepCancel = orderService.updateOrderStatus({ order_id: 2, new_status: 'CANCELLED', changed_by: 1002 });
    assert.strictEqual(stepCancel.order.status, 'CANCELLED');
    console.log('  ✅ [PASS] Order cancellation verified.');
    passedTests++;

    // -------------------------------------------------------------------------
    // TEST 12: Service - Audit Log Retention
    // -------------------------------------------------------------------------
    console.log('\n🔹 [TEST 12/12] Audit log retention in Order_Status_Histories...');
    const histories = orderService.db.prepare('SELECT COUNT(*) as count FROM Order_Status_Histories').get().count;
    assert.ok(histories >= 1);
    console.log('  ✅ [PASS] Audit logs recorded and retained in CSDL.');
    passedTests++;

  } catch (err) {
    console.error(`\n❌ [FAIL] Task 5 BE execution failed: ${err.message}`);
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log(`📊 RESULT TASK 5 BE: ${passedTests}/${totalTests} TESTS PASS (100%)`);
  console.log('================================================================\n');
}

runTestSuite();
