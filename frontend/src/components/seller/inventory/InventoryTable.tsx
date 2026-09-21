'use client';

import React from 'react';
import type { InventoryItem } from '@/types';
import { formatVND } from '@/lib/utils';

interface InventoryTableProps {
  items: InventoryItem[];
  onOpenRestock: (item: InventoryItem) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, onOpenRestock }) => {
  return (
    <div className="inv-table-card">
      <table className="inv-table">
        <thead>
          <tr>
            <th>Sản Phẩm & Biến Thể</th>
            <th>Mã SKU</th>
            <th>Tồn Khả Dụng</th>
            <th>Ngưỡng Cảnh Báo</th>
            <th>Giá Bán Lẻ</th>
            <th>Trạng Thái</th>
            <th style={{ textAlign: 'right' }}>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-10 text-slate-500">
                Không tìm thấy sản phẩm nào trong kho.
              </td>
            </tr>
          ) : (
            items.map((item) => {
              const statusClass =
                item.stockStatus === 'IN_STOCK'
                  ? 'status-instock'
                  : item.stockStatus === 'LOW_STOCK'
                  ? 'status-low'
                  : 'status-out';

              const statusLabel =
                item.stockStatus === 'IN_STOCK'
                  ? 'Còn Hàng'
                  : item.stockStatus === 'LOW_STOCK'
                  ? 'Sắp Hết'
                  : 'Hết Hàng';

              return (
                <tr key={item.id}>
                  <td>
                    <div className="inv-product-cell">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="inv-thumb"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
                        }}
                      />
                      <div className="inv-meta">
                        <div className="inv-title">{item.name}</div>
                        <span className="inv-category-tag">{item.categoryName}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inv-sku-badge">{item.sku}</span>
                  </td>
                  <td>
                    <div className="font-bold text-slate-900 text-sm">
                      {item.stockQuantity} sp
                    </div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-500">{item.safetyThreshold || 10} sp</div>
                  </td>
                  <td>
                    <div className="font-bold text-slate-900 text-sm">
                      {formatVND(item.price)}
                    </div>
                  </td>
                  <td>
                    <span className={`inv-status-pill ${statusClass}`}>{statusLabel}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn-inv-action primary"
                      onClick={() => onOpenRestock(item)}
                    >
                      + Nhập Thêm
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
