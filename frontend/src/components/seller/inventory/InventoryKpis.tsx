'use client';

import React from 'react';
import { formatVND } from '@/lib/utils';

interface InventoryKpisProps {
  totalSku: number;
  totalAvailable: number;
  totalValue: number;
  lowStockCount: number;
}

export const InventoryKpis: React.FC<InventoryKpisProps> = ({
  totalSku,
  totalAvailable,
  totalValue,
  lowStockCount,
}) => {
  return (
    <div className="inv-kpi-grid">
      <div className="inv-kpi-card">
        <div className="inv-kpi-header">
          <span className="inv-kpi-label">Tổng Danh Mục SKU</span>
          <span className="inv-kpi-icon">🏷️</span>
        </div>
        <div className="inv-kpi-num">{totalSku}</div>
        <div className="inv-kpi-sub">Đang lưu hành hệ thống</div>
      </div>

      <div className="inv-kpi-card">
        <div className="inv-kpi-header">
          <span className="inv-kpi-label">Tổng Lượng Tồn Kho</span>
          <span className="inv-kpi-icon">📦</span>
        </div>
        <div className="inv-kpi-num">{totalAvailable}</div>
        <div className="inv-kpi-sub">Sản phẩm sẵn sàng giao</div>
      </div>

      <div className="inv-kpi-card">
        <div className="inv-kpi-header">
          <span className="inv-kpi-label">Giá Trị Tồn Kho</span>
          <span className="inv-kpi-icon">💰</span>
        </div>
        <div className="inv-kpi-num" style={{ fontSize: '1.45rem', color: '#10B981' }}>
          {formatVND(totalValue)}
        </div>
        <div className="inv-kpi-sub">Ước tính theo giá bán lẻ</div>
      </div>

      <div className="inv-kpi-card">
        <div className="inv-kpi-header">
          <span className="inv-kpi-label">Cảnh Báo Nhập Hàng</span>
          <span className="inv-kpi-icon">⚠️</span>
        </div>
        <div className="inv-kpi-num" style={{ color: '#EF4444' }}>
          {lowStockCount}
        </div>
        <div className="inv-kpi-sub">Dưới ngưỡng an toàn (10 SKU)</div>
      </div>
    </div>
  );
};
