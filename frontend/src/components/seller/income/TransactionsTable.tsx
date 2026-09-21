'use client';

import React from 'react';
import type { Transaction } from '@/types';

interface TransactionsTableProps {
  transactions: Transaction[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const isAllSelected =
    transactions.length > 0 && selectedIds.length === transactions.length;

  return (
    <div className="income-table-card">
      <div className="table-top-bar">
        <h3>Giao Dịch Gần Đây</h3>
        <span className="text-xs text-slate-500">
          Đã chọn {selectedIds.length} / {transactions.length} giao dịch
        </span>
      </div>

      <table className="income-tx-table">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                aria-label="Chọn tất cả"
              />
            </th>
            <th>Mã GD</th>
            <th>Khách Hàng</th>
            <th>Sản Phẩm Đặt Hàng</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-10 text-slate-500">
                Không tìm thấy giao dịch nào.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => {
              const isSelected = selectedIds.includes(tx.id);

              return (
                <tr key={tx.id} className={isSelected ? 'row-selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(tx.id)}
                      aria-label={`Chọn giao dịch ${tx.id}`}
                    />
                  </td>
                  <td>
                    <span className="font-mono font-bold text-xs text-purple-700">
                      {tx.id}
                    </span>
                  </td>
                  <td>
                    <div className="font-bold text-sm text-slate-900">{tx.customer}</div>
                  </td>
                  <td>
                    <div className="text-sm text-slate-700 max-w-xs truncate">{tx.product}</div>
                  </td>
                  <td>
                    <div className="font-semibold text-sm text-slate-800">x{tx.qty}</div>
                  </td>
                  <td>
                    <div className="text-xs text-slate-600">{tx.unitPrice}</div>
                  </td>
                  <td>
                    <div className="font-bold text-sm text-slate-900">{tx.total}</div>
                  </td>
                  <td>
                    <span
                      className={`tx-badge ${
                        tx.status === 'Success'
                          ? 'success'
                          : tx.status === 'Pending'
                          ? 'pending'
                          : 'refunded'
                      }`}
                    >
                      {tx.status === 'Success'
                        ? 'Thành công'
                        : tx.status === 'Pending'
                        ? 'Chờ xử lý'
                        : 'Hoàn tiền'}
                    </span>
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
