/**
 * Task 4 BE: Express Router for Cart, Checkout & Payment API (HTTMDTTHA-39)
 * Developer: Nguyen Duc Manh
 */

const express = require('express');
const CartCheckoutService = require('./cart-checkout-service');

function createCartCheckoutApi(service = new CartCheckoutService()) {
  const router = express.Router();

  // GET /api/cart - Get Cart Details (US-15)
  router.get('/cart', (req, res) => {
    try {
      const userId = Number(req.query.user_id || 1001);
      const cart = service.getCartDetails(userId);
      return res.status(200).json({ success: true, data: cart });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // POST /api/cart/add - Add Item to Cart (US-15)
  router.post('/cart/add', (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;
      const cart = service.addToCart(user_id, product_id, quantity);
      return res.status(200).json({ success: true, message: 'Đã thêm vào giỏ hàng', data: cart });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // PUT /api/cart/update - Update Cart Item Quantity (US-16)
  router.put('/cart/update', (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;
      const cart = service.updateCartItem(user_id, product_id, quantity);
      return res.status(200).json({ success: true, message: 'Đã cập nhật giỏ hàng', data: cart });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // POST /api/checkout - Place Order (COD / Online) (US-17, US-18, US-19)
  router.post('/checkout', (req, res) => {
    try {
      const result = service.checkoutOrder(req.body);
      return res.status(201).json({ success: true, message: 'Đặt hàng thành công', data: result });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  return router;
}

module.exports = createCartCheckoutApi;
