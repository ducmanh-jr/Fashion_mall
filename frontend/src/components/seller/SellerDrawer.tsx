'use client';

import React, { useMemo } from 'react';
import type { Product } from '@/types';
import { formatVND, calculateSellerFinancials, detectBrand, generateSkuCode } from '@/lib/utils';

interface SellerDrawerProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (product: Product) => void;
}

export const SellerDrawer: React.FC<SellerDrawerProps> = ({
  isOpen,
  product,
  onClose,
  onShowToast,
  onEditProduct,
  onDeleteProduct,
}) => {
  const brandName = useMemo(() => {
    if (!product) return 'AETHELGARD';
    return detectBrand(product.name);
  }, [product]);

  const skuCode = useMemo(() => {
    if (!product) return 'AE-00101';
    return product.sku || generateSkuCode(product.name, product.id);
  }, [product]);

  const financials = useMemo(() => {
    return calculateSellerFinancials(product?.basePrice || 0);
  }, [product]);

  const isFootwear = useMemo(() => {
    if (!product) return false;
    const lowerName = product.name.toLowerCase();
    const lowerCat = (product.categoryName || '').toLowerCase();
    return lowerName.includes('giày') || lowerCat.includes('sneaker');
  }, [product]);

  if (!product) return null;

  const copySku = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(skuCode);
      onShowToast(`Đã sao chép mã ${skuCode} vào clipboard!`);
    } else {
      onShowToast(`Mã SKU: ${skuCode}`);
    }
  };

  const quickRestock = () => {
    onShowToast(`Đã ghi nhận tạo phiếu nhập thêm +20 sản phẩm cho "${product.name}"!`);
  };

  return (
    <div
      id="seller-dual-drawer-backdrop"
      className={`seller-dual-drawer-backdrop ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="seller-drawer-wrapper">
        {/* SECONDARY PANEL (LEFT): KHO HÀNG & THÔNG SỐ VẬN HÀNH */}
        <div className="seller-panel seller-panel-secondary">
          <div className="seller-panel-header">
            <h4 className="text-slate-900 font-bold text-sm">Kho Hàng & Vận Hành</h4>
            <span className="sku-tag">SKU #{skuCode}</span>
          </div>

          <div className="seller-panel-body">
            {/* Inventory Overview */}
            <div className="inventory-stats-grid">
              <div className="inv-stat-card avail">
                <span className="inv-val">{product.stockQuantity ?? 30}</span>
                <span className="inv-sub">Tồn kho khả dụng</span>
              </div>
              <div className="inv-stat-card">
                <span className="inv-val">8</span>
                <span className="inv-sub">Đang giao hàng</span>
              </div>
              <div className="inv-stat-card">
                <span className="inv-val">3</span>
                <span className="inv-sub">Chờ đóng gói</span>
              </div>
            </div>

            {/* Inventory Progress Bar */}
            <div className="inv-progress-wrap">
              <div className="inv-progress-bar">
                <div
                  className="inv-progress-fill"
                  style={{ width: `${Math.min(100, ((product.stockQuantity ?? 30) / 50) * 100)}%` }}
                />
              </div>
              <div className="inv-progress-label">
                <span>Mức an toàn: 10 sp</span>
                <span>Tối đa: 50 sp</span>
              </div>
            </div>

            {/* Variants table */}
            <div className="seller-section-box">
              <div className="seller-section-title">
                Phân Loại Phiên Bản
                <span className="extra-info">Tồn kho theo size/màu</span>
              </div>
              <div className="variants-table-wrap">
                <table className="variants-table">
                  <thead>
                    <tr>
                      <th>Phân loại</th>
                      <th>SKU Phụ</th>
                      <th>Tồn</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Màu Đen / Size M</td>
                      <td>{skuCode}-BLK-M</td>
                      <td>14</td>
                      <td><span className="text-emerald-600 font-semibold">Sẵn sàng</span></td>
                    </tr>
                    <tr>
                      <td>Màu Trắng / Size L</td>
                      <td>{skuCode}-WHT-L</td>
                      <td>11</td>
                      <td><span className="text-emerald-600 font-semibold">Sẵn sàng</span></td>
                    </tr>
                    <tr>
                      <td>Màu Be / Size S</td>
                      <td>{skuCode}-BEI-S</td>
                      <td>5</td>
                      <td><span className="text-amber-600 font-semibold">Sắp hết</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipping specs */}
            <div className="seller-section-box">
              <div className="seller-section-title">Thông Số Lưu Kho & Đóng Gói</div>
              <div className="shipping-spec-list">
                <div className="shipping-spec-item">
                  <span>Khối lượng đóng gói:</span>
                  <strong>{isFootwear ? '950 gram' : '520 gram'}</strong>
                </div>
                <div className="shipping-spec-item">
                  <span>Kích thước đóng hộp (D x R x C):</span>
                  <strong>{isFootwear ? '34 x 22 x 13 cm' : '30 x 20 x 5 cm'}</strong>
                </div>
                <div className="shipping-spec-item">
                  <span>Kênh giao hàng tích hợp:</span>
                  <strong>Hỏa Tốc 2H, Chuẩn Aethelgard</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="seller-drawer-actions">
            <button className="btn-seller-secondary" onClick={quickRestock} type="button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Nhập Thêm Kho Hàng
            </button>
            <button className="btn-seller-secondary" onClick={copySku} type="button">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Sao Chép Mã Quản Lý (SKU)
            </button>
          </div>
        </div>

        {/* PRIMARY PANEL (RIGHT): THÔNG TIN SẢN PHẨM & TÀI CHÍNH LỢI NHUẬN */}
        <div className="seller-panel seller-panel-primary">
          <div className="seller-panel-header">
            <div className="seller-header-badge-group">
              <span className="badge-portal">DỮ LIỆU NGƯỜI BÁN</span>
              <span className="badge-active-status">Đang Bán (Active)</span>
            </div>
            <button
              className="btn-drawer-close"
              title="Đóng bảng chi tiết"
              onClick={onClose}
              type="button"
            >
              &times;
            </button>
          </div>

          <div className="seller-panel-body">
            {/* Hero overview */}
            <div className="seller-product-hero">
              <div className="seller-hero-img-box">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
                  }}
                />
              </div>
              <div className="seller-hero-meta">
                <div className="seller-hero-identifiers">
                  <span className="brand-badge-pill">{brandName}</span>
                  <span className="sku-tag">SKU: {skuCode}</span>
                </div>
                <h3>{product.name}</h3>
                <p className="seller-category-crumb">
                  Aethelgard Mall / {product.categoryName || 'Thời Trang'}
                </p>
              </div>
            </div>

            {/* Giá Cả & Phân Tích Lợi Nhuận */}
            <div className="seller-section-box">
              <div className="seller-section-title">
                Giá Cả & Phân Tích Lợi Nhuận
                <span className="extra-info">Tỷ suất biên ròng</span>
              </div>

              <div className="seller-pricing-grid">
                <div className="seller-price-stat">
                  <span className="stat-label">Giá bán lẻ (Retail)</span>
                  <span className="stat-val">{formatVND(product.basePrice)}</span>
                </div>
                <div className="seller-price-stat">
                  <span className="stat-label">Giá niêm yết gốc</span>
                  <span className="stat-val subtext-strike">{formatVND(financials.originalPrice)}</span>
                </div>
                <div className="seller-price-stat">
                  <span className="stat-label">Giá vốn nhập (COGS)</span>
                  <span className="stat-val text-slate-600">{formatVND(financials.cogsPrice)}</span>
                </div>
                <div className="seller-price-stat highlight-profit">
                  <span className="stat-label">Biên Lợi Nhuận Ròng</span>
                  <span className="stat-val profit-rate">+{financials.marginPercent}%</span>
                </div>
              </div>

              {/* Bảng hạch toán chi tiết */}
              <div className="seller-ledger-list">
                <div className="ledger-row">
                  <span>Doanh thu gộp dự kiến:</span>
                  <strong>{formatVND(product.basePrice)}</strong>
                </div>
                <div className="ledger-row">
                  <span>- Giá vốn hàng bán (COGS):</span>
                  <span>-{formatVND(financials.cogsPrice)}</span>
                </div>
                <div className="ledger-row">
                  <span>- Phí sàn Aethelgard Mall (3.5%):</span>
                  <span>-{formatVND(financials.platformFee)}</span>
                </div>
                <div className="ledger-row">
                  <span>- Thuế GTGT VAT khấu trừ (8%):</span>
                  <span>-{formatVND(financials.vatFee)}</span>
                </div>
                <div className="ledger-row total-net">
                  <span>LỢI NHUẬN RÒNG THỰC NHẬN:</span>
                  <span className="net-profit-val">+{formatVND(financials.netProfit)}</span>
                </div>
              </div>
            </div>

            {/* Hiệu suất kinh doanh 30 ngày */}
            <div className="seller-section-box">
              <div className="seller-section-title">Hiệu Suất Kinh Doanh (30 Ngày)</div>
              <div className="seller-metrics-row">
                <div className="metric-pill-card">
                  <span className="m-val">12.4K</span>
                  <span className="m-label">Lượt xem</span>
                </div>
                <div className="metric-pill-card">
                  <span className="m-val">845</span>
                  <span className="m-label">Thêm vào giỏ</span>
                </div>
                <div className="metric-pill-card">
                  <span className="m-val">4.2%</span>
                  <span className="m-label">Tỷ lệ CVR</span>
                </div>
                <div className="metric-pill-card">
                  <span className="m-val">5.0 ★</span>
                  <span className="m-label">Đánh giá</span>
                </div>
              </div>
            </div>

            {/* Mô tả & Hướng dẫn sản phẩm */}
            <div className="seller-section-box">
              <div className="seller-section-title">Mô Tả & Hướng Dẫn Sản Phẩm</div>
              <p className="text-[0.85rem] leading-relaxed text-slate-600">
                {product.description}
              </p>
            </div>
          </div>

          <div className="seller-drawer-actions flex flex-col gap-2">
            <a
              href={`/product-detail/${product.id}`}
              className="btn-seller-primary no-underline flex items-center justify-center gap-2"
            >
              Xem Trang Sản Phẩm Khách Hàng &rarr;
            </a>
            <div className="flex gap-2">
              <button
                className="btn-seller-secondary flex-1"
                onClick={() => {
                  onClose();
                  onEditProduct?.(product);
                }}
                type="button"
              >
                Chỉnh Sửa Niêm Yết
              </button>
              {onDeleteProduct && (
                <button
                  className="px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-colors"
                  onClick={() => {
                    onClose();
                    onDeleteProduct(product);
                  }}
                  type="button"
                >
                  Xóa
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
