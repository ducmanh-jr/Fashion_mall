/**
 * Task 5 BE: Express Router for Order Management & Revenue API (HTTMDTTHA-40)
 * Developer: Nguyen Duc Manh
 */

const express = require('express');
const OrderService = require('./order-service');

function createOrderApi(orderService = new OrderService()) {
  const router = express.Router();

  // GET /api/orders/my-orders - Customer Order History (US-20)
  router.get('/orders/my-orders', (req, res) => {
    try {
      const userId = Number(req.query.user_id || 1001);
      const orders = orderService.getCustomerOrders(userId);
      return res.status(200).json({ success: true, data: orders });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // PUT /api/orders/:id/status - Seller Status Transition (US-21, US-22)
  router.put('/orders/:id/status', (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const { new_status, changed_by, note } = req.body;
      const result = orderService.updateOrderStatus({
        order_id: orderId,
        new_status,
        changed_by,
        note
      });
      return res.status(200).json({ success: true, message: 'Đã cập nhật trạng thái đơn hàng', data: result });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // GET /api/admin/dashboard - Admin Summary & Daily Revenue (US-23)
  router.get('/admin/dashboard', (req, res) => {
    try {
      const dashboard = orderService.getAdminDashboard();
      return res.status(200).json({ success: true, data: dashboard });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  return router;
}

module.exports = createOrderApi;
