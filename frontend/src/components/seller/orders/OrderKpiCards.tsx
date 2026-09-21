'use client';

import React from 'react';

interface OrderKpiCardsProps {
  totalCount: number;
  pendingCount: number;
  confirmedCount: number;
  shippedCount: number;
  deliveredCount: number;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const OrderKpiCards: React.FC<OrderKpiCardsProps> = ({
  totalCount,
  pendingCount,
  confirmedCount,
  shippedCount,
  deliveredCount,
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="orders-kpi-grid">
      <div
        className={`order-kpi-card cursor-pointer ${currentFilter === 'ALL' ? 'active' : ''}`}
        onClick={() => onFilterChange('ALL')}
        role="button"
        tabIndex={0}
      >
        <span className="kpi-num">{totalCount}</span>
        <span className="kpi-label">Tổng Đơn Hàng</span>
      </div>

      <div
        className={`order-kpi-card cursor-pointer ${currentFilter === 'PENDING' ? 'active' : ''}`}
        onClick={() => onFilterChange('PENDING')}
        role="button"
        tabIndex={0}
      >
        <span className="kpi-num text-amber-600">{pendingCount}</span>
        <span className="kpi-label">Chờ Xác Nhận</span>
      </div>

      <div
        className={`order-kpi-card cursor-pointer ${currentFilter === 'CONFIRMED' ? 'active' : ''}`}
        onClick={() => onFilterChange('CONFIRMED')}
        role="button"
        tabIndex={0}
      >
        <span className="kpi-num text-sky-600">{confirmedCount}</span>
        <span className="kpi-label">Đã Xác Nhận</span>
      </div>

      <div
        className={`order-kpi-card cursor-pointer ${currentFilter === 'SHIPPED' ? 'active' : ''}`}
        onClick={() => onFilterChange('SHIPPED')}
        role="button"
        tabIndex={0}
      >
        <span className="kpi-num text-orange-600">{shippedCount}</span>
        <span className="kpi-label">Đang Vận Chuyển</span>
      </div>

      <div
        className={`order-kpi-card cursor-pointer ${currentFilter === 'DELIVERED' ? 'active' : ''}`}
        onClick={() => onFilterChange('DELIVERED')}
        role="button"
        tabIndex={0}
      >
        <span className="kpi-num text-emerald-600">{deliveredCount}</span>
        <span className="kpi-label">Giao Thành Công</span>
      </div>
    </div>
  );
};
