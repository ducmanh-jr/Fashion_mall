/**
 * Brand Configuration System - Aethelgard Shopping Mall (Sprint 3 Task 6 FE)
 * Developer: Nguyen Duc Manh
 */

const BrandConfig = {
  brandName: 'Aethelgard Shopping Mall',
  brandTagline: 'Sàn Thương Mại Điện Tử Đa Ngành Hàng Tích Hợp Trí Tuệ Nhân Tạo (AI)',
  version: '3.0.0-PROD',
  primaryColor: '#38BDF8',
  accentColor: '#10B981',
  supportEmail: 'cskh@aethelgard.vn',
  hotline: '1900-8899-AI',
  categories: [
    { id: 1, name: 'Giày Sneaker & Thể Thao', slug: 'giay-sneaker-the-thao' },
    { id: 2, name: 'Thời Trang Streetwear & Áo Khoác', slug: 'thoi-trang-streetwear-ao-khoac' },
    { id: 3, name: 'Quần & Phụ Kiện Thời Trang', slug: 'quan-phu-kien-thoi-trang' },
    { id: 4, name: 'Gia Dụng & Đời Sống', slug: 'gia-dung-doi-song' }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrandConfig;
}
