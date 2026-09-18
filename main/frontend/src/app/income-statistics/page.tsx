'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, ShoppingCart, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { IncomeSummary, MonthlyData, Transaction } from '@/types';
import { api } from '@/lib/api';

export default function IncomeStatisticsPage() {
  const [stats, setStats] = useState<IncomeSummary | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('JUN');
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [txSearch, setTxSearch] = useState('');
  const [selectedTxIds, setSelectedTxIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await api.getIncomeStats();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const matrix = stats?.monthlyMatrix || [];
  const currentActive = matrix.find(m => m.month === selectedMonth) || matrix[5];

  const filteredTransactions = (stats?.recentTransactions || []).filter(tx =>
    tx.id.toLowerCase().includes(txSearch.toLowerCase()) ||
    tx.customer.toLowerCase().includes(txSearch.toLowerCase()) ||
    tx.product.toLowerCase().includes(txSearch.toLowerCase())
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTxIds(filteredTransactions.map(t => t.id));
    } else {
      setSelectedTxIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedTxIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ──── PAGE HEADER ──── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Thống Kê Thu Nhập & Báo Cáo Tài Chính
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Biểu đồ phân tích doanh thu 12 tháng, chỉ số người dùng và lịch sử dòng tiền giao dịch
          </p>
        </div>

        {/* Time Pills */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
          {(['weekly', 'monthly', 'yearly'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTimeRange(mode)}
              className={`px-3.5 py-1.5 rounded-lg capitalize transition-all ${
                timeRange === mode
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* ──── TOP STATS CARDS ──── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng Doanh Thu Năm</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {(stats?.totalRevenue || 145000000).toLocaleString('vi-VN')} đ
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.5% so với cùng kỳ</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Doanh Số Tháng Đỉnh ({selectedMonth})</span>
          <div className="text-3xl font-black text-sketch-purple mt-2">
            56.000.000 đ
          </div>
          <span className="text-[11px] text-slate-400">Tháng cao điểm mua sắm hè</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng Đơn Thành Công</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {stats?.totalOrders || 284}
          </div>
          <span className="text-[11px] text-slate-400">Tỷ lệ hủy đơn dưới 1.2%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Người Mua Mới</span>
          <div className="text-3xl font-black text-indigo-600 mt-2">
            38.400
          </div>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24% người dùng kích hoạt</span>
          </div>
        </div>
      </div>

      {/* ──── CHARTS ROW: 12-MONTH BLOCK MATRIX CHART & NEEDLE GAUGE ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Block Matrix Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Ma Trận Tăng Trưởng Doanh Thu (Block Matrix)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nhấn vào từng cột tháng để xem phân bổ Người Dùng Mới vs Khách Hàng Thân Thiết
              </p>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-sketch-purple inline-block"></span>
                <span className="text-slate-700">Người Dùng Mới</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-purple-200 inline-block"></span>
                <span className="text-slate-700">Khách Hàng Cũ</span>
              </div>
            </div>
          </div>

          {/* 12-Month Matrix Block Grid */}
          <div className="grid grid-cols-12 gap-2 sm:gap-3 pt-6 pb-2 items-end min-h-[260px] border-b border-slate-100">
            {matrix.map((item) => {
              const isSelected = item.month === selectedMonth;
              return (
                <div
                  key={item.month}
                  onClick={() => setSelectedMonth(item.month)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  {/* Total Value Tag */}
                  <span className={`text-[10px] font-extrabold transition-all ${
                    isSelected ? 'text-sketch-purple scale-110' : 'text-slate-400 group-hover:text-slate-700'
                  }`}>
                    {item.valTotal}
                  </span>

                  {/* Block Stack */}
                  <div className={`w-full max-w-[28px] rounded-lg p-1 transition-all flex flex-col justify-end gap-1 ${
                    isSelected ? 'bg-purple-50 ring-2 ring-sketch-purple' : 'hover:bg-slate-50'
                  }`}>
                    {/* New users block */}
                    <div
                      className={`w-full rounded-sm transition-all ${
                        isSelected ? 'bg-sketch-purple' : 'bg-purple-500/80 group-hover:bg-purple-600'
                      }`}
                      style={{ height: `${Math.max(item.newUsers * 8, 12)}px` }}
                    />
                    {/* Existing users block */}
                    <div
                      className={`w-full rounded-sm transition-all ${
                        isSelected ? 'bg-purple-300' : 'bg-purple-200 group-hover:bg-purple-300'
                      }`}
                      style={{ height: `${Math.max(item.existingUsers * 6, 8)}px` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className={`text-xs font-bold uppercase transition-all ${
                    isSelected ? 'text-sketch-purple font-extrabold' : 'text-slate-500'
                  }`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Month Drilldown Breakdown */}
          {currentActive && (
            <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Chi tiết phân bổ tháng: </span>
                <strong className="text-slate-900 uppercase font-black text-sm">{selectedMonth}</strong>
              </div>
              <div className="flex items-center gap-6 font-bold">
                <div>
                  <span className="text-slate-500">Khách hàng mới: </span>
                  <span className="text-sketch-purple font-black">{currentActive.newText || `${currentActive.newUsers * 3}k`}</span>
                </div>
                <div>
                  <span className="text-slate-500">Khách mua lại: </span>
                  <span className="text-slate-800 font-black">{currentActive.existText || `${currentActive.existingUsers * 3}k`}</span>
                </div>
                <div>
                  <span className="text-slate-500">Tổng doanh thu: </span>
                  <span className="text-slate-900 font-black">{currentActive.valTotal} USD</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Needle Gauge / Efficiency Indicator (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-center">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Hiệu Suất Vận Hành
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Chỉ số KPI đạt được so với mục tiêu quý
            </p>
          </div>

          {/* SVG Semi-Circle Needle Gauge */}
          <div className="relative w-56 h-36 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 120">
              {/* Semi-circle track */}
              <path
                d="M 20 110 A 80 80 0 0 1 180 110"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Active colored arc */}
              <path
                d="M 20 110 A 80 80 0 0 1 155 50"
                fill="none"
                stroke="url(#gauge-gradient)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8065c9" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              {/* Needle pointer */}
              <line
                x1="100"
                y1="110"
                x2="145"
                y2="55"
                stroke="#1e1b4b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="110" r="7" fill="#1e1b4b" />
            </svg>
            <div className="absolute bottom-0 text-center">
              <span className="text-2xl font-black text-slate-900">82.4%</span>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Mục tiêu quý</div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-left">
            <div className="flex justify-between font-semibold text-slate-600">
              <span>Tỷ lệ hoàn tất đơn:</span>
              <strong className="text-slate-900">98.8%</strong>
            </div>
            <div className="flex justify-between font-semibold text-slate-600">
              <span>Tốc độ xử lý kho:</span>
              <strong className="text-slate-900">1.8 giờ / kiện</strong>
            </div>
            <div className="flex justify-between font-semibold text-slate-600">
              <span>Độ chính xác tồn kho:</span>
              <strong className="text-emerald-600">99.4%</strong>
            </div>
          </div>
        </div>

      </div>

      {/* ──── RECENT TRANSACTIONS TABLE ──── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Lịch Sử Giao Dịch Gần Đây (Recent Transactions)
            </h3>
            <p className="text-xs text-slate-500">
              Dữ liệu đơn hàng đối soát từ các đối tác thương hiệu
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm mã #TX, khách hàng, sản phẩm..."
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-sketch-purple outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedTxIds.length === filteredTransactions.length && filteredTransactions.length > 0}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="p-4">Mã Giao Dịch</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Sản Phẩm</th>
                <th className="p-4 text-center">Trạng Thái</th>
                <th className="p-4 text-center">Số Lượng</th>
                <th className="p-4 text-right">Đơn Giá</th>
                <th className="p-4 text-right">Tổng Tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx) => {
                const isChecked = selectedTxIds.includes(tx.id);
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleRow(tx.id)}
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="p-4 font-bold text-sketch-purple">{tx.id}</td>
                    <td className="p-4 font-semibold text-slate-800">{tx.customer}</td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">{tx.product}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        tx.status === 'Success'
                          ? 'bg-emerald-100 text-emerald-700'
                          : tx.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-800">{tx.qty}</td>
                    <td className="p-4 text-right text-slate-500 font-semibold">{tx.unitPrice}</td>
                    <td className="p-4 text-right font-black text-slate-900">{tx.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
