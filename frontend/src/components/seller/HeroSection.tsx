'use client';

import React from 'react';

interface HeroSectionProps {
  searchTerm: string;
  onSearchTermChange: (val: string) => void;
  onScrollToCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  onSearchTermChange,
  onScrollToCatalog,
}) => {
  return (
    <section className="page-section hero-section" id="hero">
      <div className="hero-backdrop">
        <h1 className="hero-watermark">AETHELGARD</h1>
      </div>

      <div className="hero-content-wrapper">
        <h2 className="hero-tagline">Give All You Need</h2>
        <p className="hero-subtitle">
          Khám phá bộ sưu tập thời trang, sneaker & phụ kiện cao cấp tích hợp AI
        </p>

        {/* SEARCH BAR FLOATING CARD */}
        <div className="search-floating-card">
          <div className="search-box">
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder="Search on Aethelgard Mall..."
              aria-label="Tìm kiếm sản phẩm"
            />
            <button
              id="search-btn"
              className="btn-search"
              onClick={onScrollToCatalog}
              type="button"
            >
              Search
            </button>
          </div>
        </div>

        <div
          className="scroll-down-indicator cursor-pointer select-none"
          onClick={onScrollToCatalog}
          role="button"
          tabIndex={0}
          title="Cuộn xuống khám phá sản phẩm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onScrollToCatalog();
          }}
        >
          <span>Cuộn xuống khám phá sản phẩm</span>
          <div className="scroll-arrow">&darr;</div>
        </div>
      </div>
    </section>
  );
};
