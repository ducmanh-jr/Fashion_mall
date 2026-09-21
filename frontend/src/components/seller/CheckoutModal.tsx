'use client';

import React, { useState } from 'react';
import { formatVND } from '@/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  totalAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  totalAmount,
  onClose,
  onSuccess,
}) => {
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
    setAddress('');
    setNote('');
  };

  return (
    <div id="checkout-modal" className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Thanh Toán Đơn Hàng</h2>
          <button id="close-checkout-btn" className="close-btn" onClick={onClose} type="button">
            &times;
          </button>
        </div>

        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label htmlFor="shipping-address">Địa chỉ giao hàng (*)</label>
            <textarea
              id="shipping-address"
              required
              placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành..."
              className="form-control"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label htmlFor="order-note">Ghi chú đơn hàng (Tùy chọn)</label>
            <input
              type="text"
              id="order-note"
              placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi tới..."
              className="form-control"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Phương thức thanh toán</label>
            <div className="radio-group" style={{ marginTop: 8 }}>
              <label
                className="radio-card"
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: 12,
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  marginBottom: 8,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                />
                <div className="radio-content">
                  <strong>Thanh toán khi nhận hàng (COD)</strong>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
                    Trả tiền mặt trực tiếp cho shipper khi nhận hàng
                  </p>
                </div>
              </label>

              <label
                className="radio-card"
                style={{
                  display: 'flex',
                  gap: 10,
                  padding: 12,
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="ONLINE"
                  checked={paymentMethod === 'ONLINE'}
                  onChange={() => setPaymentMethod('ONLINE')}
                />
                <div className="radio-content">
                  <strong>Thanh toán trực tuyến (Online Gateway)</strong>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>
                    Thanh toán qua cổng hệ thống (Xác nhận tự động)
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="checkout-footer" style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
            <div
              className="summary-row"
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}
            >
              <span>Tổng thanh toán:</span>
              <strong
                id="checkout-total"
                className="accent-price"
                style={{ fontSize: '1.2rem', color: '#8065c9' }}
              >
                {formatVND(totalAmount)}
              </strong>
            </div>
            <button
              type="submit"
              className="btn-primary btn-large"
              style={{
                width: '100%',
                padding: '12px',
                background: '#8065c9',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Xác Nhận Đặt Hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
