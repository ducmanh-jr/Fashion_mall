'use client';

import React from 'react';

interface OrderFilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  counts: {
    all: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
  };
}

export const OrderFilterBar: React.FC<OrderFilterBarProps> = ({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}) => {
  return (
    <div className="orders-filter-bar">
      <div className="orders-tab-group">
        <button
          className={`order-tab-btn ${currentFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => onFilterChange('ALL')}
          type="button"
        >
          Tất Cả ({counts.all})
        </button>
        <button
          className={`order-tab-btn ${currentFilter === 'PENDING' ? 'active' : ''}`}
          onClick={() => onFilterChange('PENDING')}
          type="button"
        >
          Chờ Duyệt ({counts.pending})
        </button>
        <button
          className={`order-tab-btn ${currentFilter === 'CONFIRMED' ? 'active' : ''}`}
          onClick={() => onFilterChange('CONFIRMED')}
          type="button"
        >
          Đã Xác Nhận ({counts.confirmed})
        </button>
        <button
          className={`order-tab-btn ${currentFilter === 'SHIPPED' ? 'active' : ''}`}
          onClick={() => onFilterChange('SHIPPED')}
          type="button"
        >
          Đang Giao ({counts.shipped})
        </button>
        <button
          className={`order-tab-btn ${currentFilter === 'DELIVERED' ? 'active' : ''}`}
          onClick={() => onFilterChange('DELIVERED')}
          type="button"
        >
          Đã Giao ({counts.delivered})
        </button>
      </div>

      <div className="orders-search-box">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          id="orders-search-input"
          placeholder="Tìm mã đơn, tên khách, tracking..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
