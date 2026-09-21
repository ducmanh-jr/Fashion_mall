'use client';

import React from 'react';
import type { Category } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  totalProductsCount: number;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  quickFilterType: string;
  onQuickFilterChange: (val: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  sortOrder: string;
  onSortOrderChange: (val: string) => void;
  onReset: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  totalProductsCount,
  categoryFilter,
  onCategoryChange,
  quickFilterType,
  onQuickFilterChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}) => {
  return (
    <aside className="sidebar-filters">
      <div className="sidebar-header">
        <h3>Category</h3>
      </div>

      {/* Category Select Filter Dropdown */}
      <div className="filter-group">
        <label htmlFor="category-select" className="filter-label">
          Danh Mục Sản Phẩm
        </label>
        <select
          id="category-select"
          className="form-control"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tất Cả Sản Phẩm ({totalProductsCount})</option>
          <option value="1">Giày Sneaker & Thể Thao</option>
          <option value="2">Thời Trang Streetwear & Áo Khoác</option>
          <option value="3">Quần & Phụ Kiện Thời Trang</option>
          <option value="4">Gia Dụng & Đời Sống</option>
        </select>
      </div>

      {/* Category Subnav */}
      <ul className="category-subnav">
        <li
          className={`subnav-item ${categoryFilter === '' ? 'active' : ''}`}
          onClick={() => onCategoryChange('')}
          style={{ cursor: 'pointer' }}
        >
          <span>All Product</span>
          <span className="count-tag">{totalProductsCount}</span>
        </li>
        <li
          className={`subnav-item ${categoryFilter === '1' ? 'active' : ''}`}
          onClick={() => onCategoryChange('1')}
          style={{ cursor: 'pointer' }}
        >
          <span>Sneakers & Shoes</span>
        </li>
        <li
          className={`subnav-item ${categoryFilter === '2' ? 'active' : ''}`}
          onClick={() => onCategoryChange('2')}
          style={{ cursor: 'pointer' }}
        >
          <span>Streetwear & Jackets</span>
        </li>
        <li
          className={`subnav-item ${categoryFilter === '3' ? 'active' : ''}`}
          onClick={() => onCategoryChange('3')}
          style={{ cursor: 'pointer' }}
        >
          <span>Pants & Accessories</span>
        </li>
        <li
          className={`subnav-item ${categoryFilter === '4' ? 'active' : ''}`}
          onClick={() => onCategoryChange('4')}
          style={{ cursor: 'pointer' }}
        >
          <span>Home & Living</span>
        </li>
      </ul>

      <div className="filter-divider" />

      {/* Quick Filter Nav */}
      <div className="quick-nav-links">
        <button
          type="button"
          className={`quick-link text-left bg-transparent border-0 cursor-pointer ${
            quickFilterType === 'newest' ? 'font-bold' : ''
          }`}
          onClick={() => {
            onQuickFilterChange('newest');
            onSortOrderChange('newest');
          }}
        >
          New Arrival
        </button>
        <button
          type="button"
          className={`quick-link text-left bg-transparent border-0 cursor-pointer ${
            quickFilterType === 'bestseller' ? 'font-bold' : ''
          }`}
          onClick={() => onQuickFilterChange('bestseller')}
        >
          Best Seller
        </button>
        <button
          type="button"
          className={`quick-link text-left bg-transparent border-0 cursor-pointer ${
            quickFilterType === 'discount' ? 'font-bold' : ''
          }`}
          onClick={() => onQuickFilterChange('discount')}
        >
          On Discount
        </button>
      </div>

      <div className="filter-divider" />

      {/* Price Range Filter */}
      <div className="filter-group">
        <label className="filter-label">Khoảng Giá (VNĐ)</label>
        <div className="price-inputs">
          <input
            type="number"
            id="min-price"
            placeholder="Từ giá"
            min="0"
            className="form-control"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            id="max-price"
            placeholder="Đến giá"
            min="0"
            className="form-control"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
      </div>

      {/* Sort Filter */}
      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">
          Sắp Xếp Theo
        </label>
        <select
          id="sort-select"
          className="form-control"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
        >
          <option value="newest">Hàng mới nhất</option>
          <option value="price_asc">Giá: Thấp đến Cao</option>
          <option value="price_desc">Giá: Cao đến Thấp</option>
        </select>
      </div>

      <button
        id="reset-filters-btn"
        className="btn-secondary btn-full"
        onClick={onReset}
        type="button"
      >
        Reset Filters
      </button>
    </aside>
  );
};
