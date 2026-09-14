/**
 * Task 2 BE: Express Router for Product & Inventory Management API (HTTMDTTHA-37)
 * Developer: Nguyen Duc Manh
 */

const express = require('express');
const ProductService = require('./product-service');

function createProductApi(productService = new ProductService()) {
  const router = express.Router();

  // POST /api/products - Create product (US-08)
  router.post('/products', (req, res) => {
    try {
      const product = productService.createProduct(req.body);
      return res.status(201).json({ success: true, message: 'Đăng sản phẩm thành công', data: product });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // POST /api/products/:id/images - Upload images (US-09)
  router.post('/products/:id/images', (req, res) => {
    try {
      const productId = Number(req.params.id);
      const { images } = req.body;
      const uploaded = productService.uploadProductImages(productId, images);
      return res.status(200).json({ success: true, message: 'Tải ảnh sản phẩm thành công', data: uploaded });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // PUT /api/products/:id/inventory - Update inventory (US-10)
  router.put('/products/:id/inventory', (req, res) => {
    try {
      const productId = Number(req.params.id);
      const { quantity, low_stock_threshold } = req.body;
      const inventory = productService.updateInventory(productId, quantity, low_stock_threshold);
      return res.status(200).json({ success: true, message: 'Cập nhật tồn kho thành công', data: inventory });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  // PUT /api/products/:id - Edit product or status (US-11)
  router.put('/products/:id', (req, res) => {
    try {
      const productId = Number(req.params.id);
      const updated = productService.updateProduct(productId, req.body);
      return res.status(200).json({ success: true, message: 'Cập nhật sản phẩm thành công', data: updated });
    } catch (err) {
      return res.status(404).json({ success: false, message: err.message });
    }
  });

  // GET /api/products/:id - Get detail
  router.get('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const detail = productService.getProductDetail(productId);
    if (!detail) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    return res.status(200).json({ success: true, data: detail });
  });

  return router;
}

module.exports = createProductApi;
