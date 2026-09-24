'use client';

import React, { useState } from 'react';
import type { Order } from '@/types';
import { formatVND } from '@/lib/utils';

interface OrderTrackingDrawerProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onLookup?: (id: string) => void;
  onShowToast?: (message: string) => void;
  onConfirmOrder?: (order: Order) => void;
  onShipOrder?: (order: Order) => void;
  onDeliverOrder?: (order: Order) => void;
  onCancelOrder?: (order: Order) => void;
}

export const OrderTrackingDrawer: React.FC<OrderTrackingDrawerProps> = ({
  isOpen,
  order,
  onClose,
  onLookup,
  onShowToast,
  onConfirmOrder,
  onShipOrder,
  onDeliverOrder,
  onCancelOrder,
}) => {
  const [lookupId, setLookupId] = useState('');

  if (!isOpen || !order) return null;

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupId.trim()) {
      onLookup?.(lookupId.trim());
    }
  };

  const step = order.progressStep || 1;
  const stepPercent =
    step === 1 ? '0%' : step === 2 ? '33.33%' : step === 3 ? '66.66%' : '100%';

  return (
    <div
      id="track-order-modal"
      className="track-drawer-backdrop active"
      onClick={(e) => {
        if (
          e.target === e.currentTarget ||
          (e.target as HTMLElement).classList.contains('track-drawer-wrapper')
        ) {
          onClose();
        }
      }}
    >
      <div className="track-drawer-wrapper">
        {/* SECONDARY PANEL (LEFT) */}
        <div className="track-panel track-panel-secondary">
          <div className="track-panel-header">
            <h3>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Vận Đơn & Giao Nhận
            </h3>
            <span className="badge-transit">In transit</span>
          </div>

          <div className="track-panel-body">
            {/* Tracking Carrier Details */}
            <div className="track-card">
              <div className="track-card-title">Tracking Information</div>
              <div className="carrier-info-grid mt-2">
                <div className="carrier-col">
                  <div className="carrier-name-row">
                    <span>{order.carrier}</span>
                  </div>
                  <div className="tracking-code-val">Tracking #: {order.trackingCode}</div>
                  <div className="mt-1.5 text-[0.78rem] text-slate-500">
                    Dự kiến giao: <strong className="text-slate-900">{order.estimatedDelivery}</strong>
                  </div>
                </div>

                <div className="carrier-col border-t border-dashed border-slate-200 pt-2 mt-1">
                  <div className="font-semibold text-slate-500 text-[0.74rem]">Cập Nhật Gần Nhất</div>
                  <p className="text-[0.78rem] text-slate-900 mt-0.5">
                    {order.lastUpdate || order.lastUpdateLocation || 'Đang luân chuyển qua trạm phân phối'}
                  </p>
                  <div className="mt-1 text-[0.74rem] font-semibold text-slate-500">
                    Vị Trí Hiện Tại: <span className="text-slate-900 font-bold">{order.lastLocation || order.lastUpdateLocation || 'Kho Tổng'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="half-card">
              <div className="half-card-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Địa Chỉ Giao Hàng
              </div>
              <div className="half-card-content">
                <strong>{order.customerName}</strong><br />
                <span>{order.shippingAddress}</span><br />
                <span className="block mt-1 font-semibold">{order.customerPhone}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="half-card">
              <div className="half-card-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Phương Thức Thanh Toán
              </div>
              <div className="half-card-content">
                <strong>{order.paymentMethod}</strong><br />
                <span className="text-[0.75rem] text-slate-500">Cổng Aethelgard Gateway bảo mật</span><br />
                <span className="block mt-1.5 font-bold text-emerald-600">
                  Tổng: {formatVND(order.totalAmount)}
                </span>
              </div>
            </div>

            {/* Quick Lookup */}
            <div className="track-card">
              <div className="track-card-title">Find Another Order</div>
              <div className="track-card-subtitle">Tra cứu mã đơn khác trong hệ thống</div>
              <form onSubmit={handleLookupSubmit}>
                <div className="track-inputs-row" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="track-input-group">
                    <input
                      type="text"
                      value={lookupId}
                      onChange={(e) => setLookupId(e.target.value)}
                      placeholder="e.g. AG-2024-7890"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-track-submit">
                  Tra Cứu Bưu Kiện
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* PRIMARY PANEL (RIGHT) */}
        <div className="track-panel track-panel-primary">
          <div className="track-panel-header">
            <div className="track-order-summary-header flex-1 mr-3">
              <div className="order-headline-left">
                <div className="order-title-code">
                  <span>Order {order.orderCode || order.id}</span>
                  <span className={`badge-order-status ${order.status}`}>
                    {order.statusLabel}
                  </span>
                </div>
                <div className="order-date-text">
                  Placed on {order.placedDateText || order.createdAt}
                </div>
              </div>

              <div className="order-header-buttons">
                <button className="btn-order-action" onClick={() => window.print()} type="button">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Invoice
                </button>
                <button className="btn-order-action" onClick={() => window.print()} type="button">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Print
                </button>
              </div>
            </div>

            <button className="track-panel-close" onClick={onClose} type="button">
              &times;
            </button>
          </div>

          <div className="track-panel-body">
            {/* Delivery Progress Stepper (4 steps) */}
            <div className="track-card">
              <div className="stepper-header">
                <h3>Delivery Progress</h3>
                <span>Estimated delivery: {order.estimatedDelivery}</span>
              </div>

              <div className="delivery-progress-bar-wrap">
                <div
                  className="delivery-progress-line-fill"
                  style={{ width: stepPercent }}
                />

                <div className="stepper-steps-row">
                  {['Order Placed', 'Confirmed', 'Shipped', 'Delivered'].map((title, idx) => {
                    const stepNum = idx + 1;
                    const isDone = stepNum <= step;
                    const isCurrent = stepNum === step;

                    return (
                      <div
                        key={title}
                        className={`stepper-step-node ${isDone ? 'completed' : ''} ${
                          isCurrent ? 'current' : ''
                        }`}
                      >
                        <div className="node-circle">{isDone ? '✓' : stepNum}</div>
                        <span className="node-title">{title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items Detail */}
            <div className="track-card">
              <div className="track-card-title">Chi Tiết Kiện Hàng</div>
              <div className="track-items-list mt-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="track-item-row flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded-md border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
                        }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.productName}</h4>
                        <p className="text-xs text-slate-500">{item.specs}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-slate-900">{formatVND(item.price)}</div>
                      <div className="text-xs text-slate-500">Số lượng: x{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Summary */}
              <div className="border-t border-slate-200 mt-4 pt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tiền hàng (Subtotal):</span>
                  <strong>{formatVND(order.subtotal)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <strong>{formatVND(order.shippingCharge)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Thuế VAT (8%):</span>
                  <strong>{formatVND(order.taxes)}</strong>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>Giảm giá khuyến mãi:</span>
                    <strong>-{formatVND(order.discount)}</strong>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                  <span>TỔNG CỘNG:</span>
                  <span className="text-purple-600">{formatVND(order.totalAmount)}</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end">
                {order.status === 'PENDING' && onConfirmOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      onConfirmOrder(order);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Xác Nhận Đơn Hàng
                  </button>
                )}

                {(order.status === 'CONFIRMED' || order.status === 'PROCESSING') && onShipOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      onShipOrder(order);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Giao Vận Chuyển FedEx
                  </button>
                )}

                {order.status === 'SHIPPED' && onDeliverOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      onDeliverOrder(order);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                  >
                    Xác Nhận Đã Giao
                  </button>
                )}

                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && onCancelOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      onCancelOrder(order);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-all cursor-pointer"
                  >
                    Hủy Đơn Hàng
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
