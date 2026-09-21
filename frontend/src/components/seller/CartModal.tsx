'use client';

import React from 'react';
import type { Product } from '@/types';
import { formatVND } from '@/lib/utils';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  totalQty: number;
  totalAmount: number;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  cart,
  totalQty,
  totalAmount,
  onClose,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div id="cart-modal" className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Giỏ Hàng Mua Sắm ({totalQty})</h2>
          <button id="close-cart-btn" className="close-btn" onClick={onClose} type="button">
            &times;
          </button>
        </div>

        <div id="cart-items-list" className="cart-items-container">
          {cart.length === 0 ? (
            <p className="empty-cart-msg">Giỏ hàng của bạn đang trống.</p>
          ) : (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item-row">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="cart-item-thumb"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
                  }}
                />
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <p className="cart-item-sku">SKU: {product.sku}</p>
                  <p className="cart-item-price">
                    {formatVND(product.basePrice)} &times; {quantity}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-remove-item"
                  onClick={() => onRemoveItem(product.id)}
                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Xóa
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Tổng số lượng:</span>
            <strong id="modal-cart-qty">{totalQty} món</strong>
          </div>
          <div className="summary-row grand-total">
            <span>Tổng tiền:</span>
            <strong id="modal-cart-total" className="accent-price">
              {formatVND(totalAmount)}
            </strong>
          </div>
        </div>

        <div className="modal-actions">
          <button id="clear-cart-btn" className="btn-secondary" onClick={onClearCart} type="button">
            Xóa tất cả
          </button>
          <button
            id="proceed-checkout-btn"
            className="btn-primary"
            onClick={onProceedCheckout}
            type="button"
          >
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};
