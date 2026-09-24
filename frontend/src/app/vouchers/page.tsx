'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, Percent, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';

interface VoucherItem {
  id: string;
  code: string;
  name: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
}

const initialVouchers: VoucherItem[] = [
  {
    id: 'VOUCHER-01',
    code: 'AETHEL10',
    name: 'Ưu đãi Khai xuân Giảm 10%',
    discountType: 'percent',
    discountValue: 10,
    minOrderAmount: 2000000,
    maxDiscount: 500000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    maxUses: 500,
    usedCount: 142,
    isActive: true,
  },
  {
    id: 'VOUCHER-02',
    code: 'VIP500K',
    name: 'Tri ân Khách Hàng VIP Trừ 500K',
    discountType: 'fixed',
    discountValue: 500000,
    minOrderAmount: 5000000,
    startDate: '2026-02-01',
    endDate: '2026-10-31',
    maxUses: 100,
    usedCount: 38,
    isActive: true,
  },
  {
    id: 'VOUCHER-03',
    code: 'FREESHIP',
    name: 'Miễn phí Vận chuyển Toàn quốc',
    discountType: 'fixed',
    discountValue: 50000,
    minOrderAmount: 1000000,
    startDate: '2026-01-15',
    endDate: '2026-12-31',
    maxUses: 1000,
    usedCount: 620,
    isActive: true,
  },
];

export default function VouchersPage() {
  const { showToast } = useToast();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [vouchers, setVouchers] = useState<VoucherItem[]>(initialVouchers);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderAmount, setMinOrderAmount] = useState<number>(1000000);
  const [maxDiscount, setMaxDiscount] = useState<number>(200000);
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [maxUses, setMaxUses] = useState<number>(200);

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      showToast('Vui lòng nhập mã khuyến mãi.');
      return;
    }

    const newVoucher: VoucherItem = {
      id: `VOUCHER-${Date.now()}`,
      code: code.trim().toUpperCase(),
      name: name.trim() || `Mã khuyến mãi ${code.toUpperCase()}`,
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      maxDiscount: discountType === 'percent' ? Number(maxDiscount) || undefined : undefined,
      startDate,
      endDate,
      maxUses: Number(maxUses) || 100,
      usedCount: 0,
      isActive: true,
    };

    setVouchers([newVoucher, ...vouchers]);
    showToast(`Đã tạo thành công voucher khuyến mãi "${newVoucher.code}"!`);
    setShowCreateModal(false);
    setCode('');
    setName('');
  };

  const handleDeleteVoucher = async (v: VoucherItem) => {
    const isConfirmed = await confirm({
      title: 'Xóa Mã Khuyến Mãi',
      message: `Bạn có chắc muốn xóa mã voucher "${v.code}"? Khách hàng sẽ không thể tiếp tục áp dụng mã này khi mua sắm.`,
      confirmText: 'Xác Nhận Xóa',
      cancelText: 'Hủy',
      tone: 'danger',
    });

    if (!isConfirmed) return;

    setVouchers((prev) => prev.filter((item) => item.id !== v.id));
    showToast(`Đã xóa voucher "${v.code}".`);
  };

  const handleToggleStatus = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v))
    );
    showToast('Đã thay đổi trạng thái kích hoạt của voucher.');
  };

  return (
    <div className="orders-app-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-7 h-7 text-indigo-600" />
            <span>Quản Lý Khuyến Mãi & Mã Giảm Giá</span>
          </h1>
          <p className="text-xs text-slate-500">
            Tạo chương trình giảm giá kích cầu mua sắm và giữ chân khách hàng trung thành của gian hàng
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Mã Khuyến Mãi Mới</span>
        </button>
      </div>

      {/* Grid Danh Sách Voucher */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vouchers.map((v) => (
          <div
            key={v.id}
            className={`rounded-2xl border p-5 transition-all shadow-sm flex flex-col justify-between ${
              v.isActive ? 'border-indigo-100 bg-white' : 'border-slate-200 bg-slate-50 opacity-70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 font-mono font-extrabold text-sm text-indigo-700 tracking-wider">
                  {v.code}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(v.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                    v.isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {v.isActive ? 'ĐANG KÍCH HOẠT' : 'TẠM DỪNG'}
                </button>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1">{v.name}</h4>

              <div className="text-xl font-extrabold text-indigo-600 mb-3">
                {v.discountType === 'percent'
                  ? `Giảm ${v.discountValue}%`
                  : `Giảm ${v.discountValue.toLocaleString('vi-VN')} đ`}
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Đơn tối thiểu:</span>
                  <span className="font-semibold text-slate-700">
                    {v.minOrderAmount.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                {v.maxDiscount && (
                  <div className="flex justify-between">
                    <span>Giảm tối đa:</span>
                    <span className="font-semibold text-slate-700">
                      {v.maxDiscount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Thời gian hiệu lực:</span>
                  <span className="font-semibold text-slate-700">
                    {v.startDate} đến {v.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Đã sử dụng:</span>
                  <span className="font-semibold text-slate-700">
                    {v.usedCount} / {v.maxUses} lượt
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-[11px] text-slate-400">ID: {v.id}</span>
              <button
                type="button"
                onClick={() => handleDeleteVoucher(v)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Xóa voucher"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tạo Voucher Mới */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Tạo Mã Voucher Khuyến Mãi</h3>
            <p className="text-xs text-slate-500 mb-6">Thiết lập chính sách giảm giá riêng của gian hàng</p>

            <form onSubmit={handleCreateVoucher} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mã Code *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="VD: SALE2026"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-mono uppercase focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Loại Giảm Giá</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    <option value="percent">Giảm theo %</option>
                    <option value="fixed">Giảm số tiền cố định</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Chiến Dịch Khuyến Mãi</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Khuyến Mãi Mùa Lễ Hội"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {discountType === 'percent' ? 'Mức Giảm (%)' : 'Mức Giảm (VND)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Đơn Tối Thiểu (VND)</label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày Bắt Đầu</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày Kết Thúc</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Lượt Dùng Tối Đa</label>
                <input
                  type="number"
                  min="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/3 h-11 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer"
                >
                  Tạo Voucher Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog}
    </div>
  );
}
