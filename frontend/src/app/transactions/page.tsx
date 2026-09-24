'use client';

import React, { useState } from 'react';
import {
  Wallet,
  Building,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  Clock,
  PlusCircle,
  CreditCard,
  ShieldCheck,
  Receipt,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Transaction {
  id: string;
  orderCode?: string;
  type: 'PAYMENT_RECEIVED' | 'COMMISSION_FEE' | 'WITHDRAWAL';
  amount: number;
  status: 'SUCCESS' | 'PENDING';
  date: string;
  note: string;
}

const initialTransactions: Transaction[] = [
  {
    id: 'TX-2026-901',
    orderCode: 'AG-2024-7890',
    type: 'PAYMENT_RECEIVED',
    amount: 30400000,
    status: 'SUCCESS',
    date: '2026-09-22 14:35',
    note: 'Thanh toán đơn hàng từ Esther Howard qua Visa',
  },
  {
    id: 'TX-2026-902',
    orderCode: 'AG-2024-7890',
    type: 'COMMISSION_FEE',
    amount: -1064000,
    status: 'SUCCESS',
    date: '2026-09-22 14:35',
    note: 'Chiết khấu phí sàn Aethelgard Mall (3.5%)',
  },
  {
    id: 'TX-2026-903',
    type: 'WITHDRAWAL',
    amount: -25000000,
    status: 'SUCCESS',
    date: '2026-09-18 10:15',
    note: 'Rút tiền về Vietcombank (STK: 0011004123456)',
  },
  {
    id: 'TX-2026-904',
    orderCode: 'AG-2024-7892',
    type: 'PAYMENT_RECEIVED',
    amount: 14500000,
    status: 'SUCCESS',
    date: '2026-09-15 16:40',
    note: 'Thanh toán đơn hàng từ Cameron Williamson qua MoMo',
  },
  {
    id: 'TX-2026-905',
    orderCode: 'AG-2024-7892',
    type: 'COMMISSION_FEE',
    amount: -507500,
    status: 'SUCCESS',
    date: '2026-09-15 16:40',
    note: 'Chiết khấu phí sàn Aethelgard Mall (3.5%)',
  },
];

export default function TransactionsPage() {
  const { showToast } = useToast();
  const { confirm, confirmDialog } = useConfirmDialog();

  // Ví & Ngân hàng
  const [balance, setBalance] = useState<number>(48250000);
  const [pendingBalance, setPendingBalance] = useState<number>(12300000);
  const [bankName, setBankName] = useState('Vietcombank - Ngân Hàng Ngoại Thương');
  const [accountNumber, setAccountNumber] = useState('0011004123456');
  const [accountHolder, setAccountHolder] = useState('NGUYEN DUC MANH');
  const [isEditingBank, setIsEditingBank] = useState(false);

  // Rút tiền
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(10000000);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingBank(false);
    showToast('Đã lưu thông tin tài khoản ngân hàng thụ hưởng thành công!');
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0) {
      showToast('Số tiền rút phải lớn hơn 0.');
      return;
    }
    if (withdrawAmount > balance) {
      showToast('Số dư khả dụng trong ví không đủ để rút số tiền này.');
      return;
    }

    const isConfirmed = await confirm({
      title: 'Xác Nhận Lệnh Rút Tiền',
      message: `Bạn có chắc muốn rút ${withdrawAmount.toLocaleString('vi-VN')} đ về tài khoản ${bankName} (${accountNumber})? Tiền sẽ về tài khoản sau 15-30 phút.`,
      confirmText: 'Rút Tiền Ngay',
      cancelText: 'Hủy Lệnh',
    });

    if (!isConfirmed) return;

    setBalance((prev) => prev - withdrawAmount);
    const newTx: Transaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      type: 'WITHDRAWAL',
      amount: -withdrawAmount,
      status: 'SUCCESS',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      note: `Rút tiền về ${bankName.split('-')[0].trim()} (STK: ${accountNumber})`,
    };
    setTransactions([newTx, ...transactions]);
    setShowWithdrawModal(false);
    showToast(`Đã tạo lệnh rút ${withdrawAmount.toLocaleString('vi-VN')} đ thành công!`);
  };

  return (
    <div className="orders-app-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wallet className="w-7 h-7 text-indigo-600" />
            <span>Ví Người Bán & Quản Lý Dòng Tiền</span>
          </h1>
          <p className="text-xs text-slate-500">
            Minh bạch doanh thu bán hàng, tự động đối soát hoa hồng và rút tiền nhanh về tài khoản ngân hàng
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowWithdrawModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Yêu Cầu Rút Tiền</span>
          </button>
        </div>
      </div>

      {/* Grid Thẻ Số Dư & Tài Khoản Ngân Hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Card 1: Số dư khả dụng */}
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-900 to-slate-900 p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-indigo-200 text-xs font-semibold mb-2">
              <span>SỐ DƯ VÍ KHẢ DỤNG</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold tracking-tight mb-1">
              {balance.toLocaleString('vi-VN')} đ
            </div>
            <p className="text-[11px] text-indigo-300">
              Có thể rút tiền về tài khoản ngân hàng bất kỳ lúc nào 24/7
            </p>
          </div>

          <div className="pt-4 border-t border-indigo-800/80 flex items-center justify-between text-xs text-indigo-200">
            <span>Chờ đối soát (Đơn đang giao):</span>
            <span className="font-bold text-amber-300">+{pendingBalance.toLocaleString('vi-VN')} đ</span>
          </div>
        </div>

        {/* Card 2: Tài khoản thụ hưởng */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tài Khoản Ngân Hàng Thụ Hưởng
              </span>
              <button
                type="button"
                onClick={() => setIsEditingBank(!isEditingBank)}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                {isEditingBank ? 'Đóng' : 'Thay đổi'}
              </button>
            </div>

            {isEditingBank ? (
              <form onSubmit={handleSaveBank} className="space-y-2.5">
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full h-9 px-3 text-xs rounded-lg border border-slate-200"
                  placeholder="Tên ngân hàng"
                />
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full h-9 px-3 text-xs rounded-lg border border-slate-200 font-mono"
                  placeholder="Số tài khoản"
                />
                <input
                  type="text"
                  required
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value.toUpperCase())}
                  className="w-full h-9 px-3 text-xs rounded-lg border border-slate-200 uppercase"
                  placeholder="Chủ tài khoản"
                />
                <button
                  type="submit"
                  className="w-full h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                >
                  Lưu Thông Tin
                </button>
              </form>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>{bankName}</span>
                </div>
                <div className="text-lg font-mono font-extrabold text-slate-800 tracking-wider">
                  {accountNumber}
                </div>
                <div className="text-xs text-slate-500 font-medium">{accountHolder}</div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Đã xác minh danh tính chủ tài khoản (KYC)</span>
          </div>
        </div>

        {/* Card 3: Thống kê dòng tiền */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
              Chính Sách Chiết Khấu Sàn
            </span>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span>Phí dịch vụ nền tảng:</span>
                <span className="font-bold text-slate-900">3.5% / đơn</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span>Thuế GTGT VAT khấu trừ:</span>
                <span className="font-bold text-slate-900">8.0%</span>
              </div>
              <div className="flex justify-between">
                <span>Thời gian quyết toán:</span>
                <span className="font-bold text-emerald-600">Tức thì khi đơn Đã Giao</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Hỗ trợ rút tiền miễn phí tối đa 10 lần/tháng.
          </div>
        </div>
      </div>

      {/* Bảng Lịch Sử Giao Dịch */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Sao Kê Dòng Tiền Người Bán</h3>
          </div>
          <button
            type="button"
            onClick={() => showToast('Đã tải xuống file sao kê định dạng PDF!')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Sao Kê PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Mã Giao Dịch</th>
                <th className="py-3 px-4">Thời Gian</th>
                <th className="py-3 px-4">Loại Giao Dịch</th>
                <th className="py-3 px-4">Nội Dung Chi Tiết</th>
                <th className="py-3 px-4 text-right">Biến Động Số Dư</th>
                <th className="py-3 px-4 text-center">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">{tx.id}</td>
                  <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                  <td className="py-3 px-4">
                    {tx.type === 'PAYMENT_RECEIVED' && (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <ArrowDownLeft className="w-3.5 h-3.5" /> Tiền vào từ khách
                      </span>
                    )}
                    {tx.type === 'COMMISSION_FEE' && (
                      <span className="inline-flex items-center gap-1 font-bold text-slate-500">
                        <ArrowUpRight className="w-3.5 h-3.5" /> Phí sàn 3.5%
                      </span>
                    )}
                    {tx.type === 'WITHDRAWAL' && (
                      <span className="inline-flex items-center gap-1 font-bold text-indigo-600">
                        <ArrowUpRight className="w-3.5 h-3.5" /> Rút tiền ngân hàng
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{tx.note}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-sm">
                    <span className={tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}>
                      {tx.amount > 0 ? '+' : ''}
                      {tx.amount.toLocaleString('vi-VN')} đ
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      THÀNH CÔNG
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Yêu Cầu Rút Tiền */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Tạo Lệnh Rút Tiền</h3>
            <p className="text-xs text-slate-500 mb-5">
              Rút tiền từ ví người bán về tài khoản ngân hàng cá nhân
            </p>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="text-slate-500">Ngân hàng thụ hưởng:</div>
                <div className="font-bold text-slate-900">{bankName}</div>
                <div className="font-mono text-indigo-600 font-semibold">{accountNumber} • {accountHolder}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số Tiền Cần Rút (VND) *
                </label>
                <input
                  type="number"
                  min="100000"
                  step="50000"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-base font-bold text-indigo-700 focus:outline-none focus:border-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Tối thiểu: 100.000 đ</span>
                  <span>Khả dụng: {balance.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              {/* Nút chọn nhanh */}
              <div className="grid grid-cols-3 gap-2">
                {[5000000, 10000000, 20000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setWithdrawAmount(amt)}
                    className="py-1.5 px-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {(amt / 1000000).toFixed(0)} Triệu
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-1/3 h-11 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer"
                >
                  Xác Nhận Rút Tiền
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
