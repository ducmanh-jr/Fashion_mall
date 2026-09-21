'use client';

import React from 'react';
import type { InventoryItem } from '@/types';

interface RestockModalProps {
  isOpen: boolean;
  item: InventoryItem | null;
  quantity: number;
  onQuantityChange: (val: number) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  item,
  quantity,
  onQuantityChange,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-scale-up">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>📦</span> Nhập Thêm Kho Hàng
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xl"
            type="button"
          >
            &times;
          </button>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 mb-4">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-14 h-14 object-cover rounded-lg border bg-white"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/img/products/adidas-samba.jpg';
            }}
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-slate-900 truncate">{item.name}</h4>
            <p className="text-xs text-slate-500 font-mono mt-0.5">SKU: {item.sku}</p>
            <p className="text-xs font-semibold text-slate-700 mt-1">
              Tồn khả dụng hiện tại:{' '}
              <strong className="text-blue-600 font-bold">{item.stockQuantity}</strong>
            </p>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Số lượng nhập thêm
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-lg border border-slate-300 font-bold text-lg hover:bg-slate-100"
              onClick={() => onQuantityChange(Math.max(1, quantity - 5))}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => onQuantityChange(Math.max(1, Number(e.target.value) || 1))}
              className="flex-1 text-center font-bold text-lg py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="w-10 h-10 rounded-lg border border-slate-300 font-bold text-lg hover:bg-slate-100"
              onClick={() => onQuantityChange(quantity + 5)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50"
            onClick={onClose}
          >
            Hủy Bỏ
          </button>
          <button
            type="button"
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm"
            onClick={onConfirm}
          >
            Xác Nhận Nhập
          </button>
        </div>
      </div>
    </div>
  );
};
