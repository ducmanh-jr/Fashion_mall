/**
 * Task 3 BE: Express Router for Search, Filter & Sort API (HTTMDTTHA-38)
 * Developer: Nguyen Duc Manh
 */

const express = require('express');
const SearchService = require('./search-service');

function createSearchApi(searchService = new SearchService()) {
  const router = express.Router();

  // GET /api/products/search - Search, Filter & Sort Products (US-12, US-13, US-14)
  router.get('/products/search', (req, res) => {
    try {
      const { keyword, category_id, min_price, max_price, sort_by, limit, offset } = req.query;
      const result = searchService.searchProducts({
        keyword,
        category_id,
        min_price,
        max_price,
        sort_by,
        limit,
        offset
      });
      return res.status(200).json({ success: true, message: 'Tìm kiếm sản phẩm thành công', data: result });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  });

  return router;
}

module.exports = createSearchApi;
