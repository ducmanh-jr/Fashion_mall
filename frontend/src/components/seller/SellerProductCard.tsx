'use client';

import React from 'react';
import type { Product } from '@/types';
import { formatVND } from '@/lib/utils';

interface SellerProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const SellerProductCard: React.FC<SellerProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="product-card cursor-pointer"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(product);
        }
      }}
    >
      <div className="product-card-top flex justify-between items-center">
        <span className="category-tag-top">{product.categoryName || 'Thời Trang'}</span>
        {product.discountPercent && product.discountPercent > 0 ? (
          <span className="bg-red-500 text-white text-[0.7rem] font-extrabold px-1.5 py-0.5 rounded">
            -{product.discountPercent}%
          </span>
        ) : null}
      </div>

      <div className="product-img-box">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating-row">
          <span>★ {product.rating || 5.0}</span>
          <span className="review-count">({product.reviewCount || 40} Reviews)</span>
        </div>
        <div className="product-price-row">
          <span className="price-amount">{formatVND(product.basePrice)}</span>
        </div>
        <div className="product-seller-footer">
          <span className="card-sku-code">SKU: {product.sku}</span>
          <span className="card-seller-cta">Dữ liệu người bán &rarr;</span>
        </div>
      </div>
    </div>
  );
};
