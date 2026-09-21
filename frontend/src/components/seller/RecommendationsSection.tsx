'use client';

import React from 'react';
import type { Product } from '@/types';
import { SellerProductCard } from './SellerProductCard';

interface RecommendationsSectionProps {
  products: Product[];
  onOpenDrawer: (product: Product) => void;
  onShowToast: (message: string) => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  products,
  onOpenDrawer,
  onShowToast,
}) => {
  return (
    <section className="page-section recommendations-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Explore our recommendations</h2>
          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={() => onShowToast('Hiển thị sản phẩm trước')}
              type="button"
            >
              &larr;
            </button>
            <button
              className="carousel-btn"
              onClick={() => onShowToast('Hiển thị sản phẩm tiếp theo')}
              type="button"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div id="recommendations-grid" className="recommendations-grid">
          {products.slice(0, 4).map((p) => (
            <SellerProductCard
              key={p.id}
              product={p}
              onClick={onOpenDrawer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
