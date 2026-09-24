'use client';

import React from 'react';
import type { Order } from '@/types';
import { formatVND } from '@/lib/utils';

interface OrderTableProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onConfirmOrder?: (order: Order) => void;
  onShipOrder?: (order: Order) => void;
  onDeliverOrder?: (order: Order) => void;
  onCancelOrder?: (order: Order) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, onSelectOrder }) => {
  return (
    <div className="orders-table-wrapper">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Mã Đơn</th>
            <th>Thời Gian</th>
            <th>Khách Hàng</th>
            <th>Sản Phẩm</th>
            <th>Đơn Vị / Tracking</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th style={{ width: '32px', textAlign: 'right' }} />
          </tr>
        </thead>
        <tbody id="orders-table-body">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-10 text-slate-500">
                Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.
              </td>
            </tr>
          ) : (
            orders.map((o) => {
              const firstItem = o.items && o.items.length > 0 ? o.items[0] : null;
              const moreItemsText =
                o.items && o.items.length > 1 ? ` +${o.items.length - 1} món khác` : '';

              return (
                <tr
                  key={o.id || o.orderCode}
                  className="order-clickable-row cursor-pointer"
                  onClick={() => onSelectOrder(o)}
                >
                  <td>
                    <span className="order-code-badge">#{o.orderCode || o.id}</span>
                  </td>
                  <td>
                    <div className="text-[0.82rem] font-semibold text-slate-700">
                      {o.createdAt}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-slate-900">{o.customerName}</div>
                    <div className="text-[0.74rem] text-slate-500">{o.customerPhone}</div>
                  </td>
                  <td>
                    {firstItem ? (
                      <div className="order-item-cell">
                        <img
                          className="order-thumb-img"
                          src={firstItem.imageUrl}
                          alt={firstItem.productName}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
                          }}
                        />
                        <div className="order-item-meta">
                          <strong>{firstItem.productName}</strong>
                          <span>
                            {firstItem.specs}{' '}
                            {moreItemsText && (
                              <strong className="text-purple-600">{moreItemsText}</strong>
                            )}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">Không có sản phẩm</span>
                    )}
                  </td>
                  <td>
                    <div className="font-semibold text-[0.82rem] text-slate-900">{o.carrier}</div>
                    <div className="font-mono text-[0.74rem] text-slate-500">{o.trackingCode}</div>
                  </td>
                  <td>
                    <div className="font-bold text-slate-900 text-[0.88rem]">
                      {formatVND(o.totalAmount)}
                    </div>
                    <div className="text-[0.72rem] text-slate-500">
                      {o.paymentMethod.includes('COD') ? 'COD' : 'Đã thanh toán'}
                    </div>
                  </td>
                  <td>
                    <span className={`badge-order-status ${o.status}`}>{o.statusLabel}</span>
                  </td>
                  <td className="text-right">
                    <span className="text-slate-400 text-lg font-bold">›</span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
