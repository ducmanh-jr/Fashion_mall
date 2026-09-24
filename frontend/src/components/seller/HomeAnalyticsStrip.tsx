'use client';

import React, { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';

interface MatrixMonthItem {
  month: string;
  existing: number;
  newUsers: number;
  valTotal: string;
  newText?: string;
  existText?: string;
}

const MATRIX_DATA: MatrixMonthItem[] = [
  { month: 'JAN', existing: 4, newUsers: 3, valTotal: '18k' },
  { month: 'FEB', existing: 6, newUsers: 6, valTotal: '24k' },
  { month: 'MAR', existing: 8, newUsers: 8, valTotal: '32k' },
  { month: 'APR', existing: 6, newUsers: 10, valTotal: '32k' },
  { month: 'MAY', existing: 9, newUsers: 13, valTotal: '44k' },
  { month: 'JUN', existing: 11, newUsers: 19, valTotal: '60k', newText: '38k', existText: '18k' },
  { month: 'JUL', existing: 8, newUsers: 11, valTotal: '38k' },
  { month: 'AUG', existing: 6, newUsers: 9, valTotal: '30k' },
  { month: 'SEP', existing: 5, newUsers: 7, valTotal: '24k' },
  { month: 'OCT', existing: 8, newUsers: 10, valTotal: '36k' },
  { month: 'NOV', existing: 6, newUsers: 12, valTotal: '36k' },
  { month: 'DEC', existing: 9, newUsers: 13, valTotal: '44k' },
];

const NEEDLE_HEIGHTS = [
  { dark: 28, light: 22 },
  { dark: 48, light: 26 },
  { dark: 22, light: 16 },
  { dark: 38, light: 32 },
  { dark: 64, light: 22 },
  { dark: 26, light: 32 },
  { dark: 42, light: 22 },
  { dark: 32, light: 38 },
  { dark: 54, light: 28 },
  { dark: 72, light: 32 },
  { dark: 38, light: 22 },
  { dark: 48, light: 28 },
  { dark: 58, light: 22 },
  { dark: 30, light: 32 },
  { dark: 68, light: 28 },
  { dark: 42, light: 32 },
  { dark: 52, light: 22 },
  { dark: 32, light: 28 },
];

export const HomeAnalyticsStrip: React.FC = () => {
  const [activeMonth, setActiveMonth] = useState<string>('JUN');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <section className="w-full bg-[#F6F7F9] py-8 px-[3.5vw] border-t border-b border-[#E5E7EB] min-h-[50vh]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-5">
        {/* ─── CỘT TRÁI: SALES TREND ─── */}
        <div className="flex-1 min-w-0 bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 flex flex-col justify-between shadow-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827] tracking-wider uppercase">
              <span>SALES TREND</span>
              <span className="text-[#9CA3AF] text-sm cursor-pointer" title="Xu hướng doanh thu theo thời gian">ⓘ</span>
            </div>
            <span className="text-[#9CA3AF] cursor-pointer text-base leading-none hover:text-[#111827]">⋯</span>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <div className="flex flex-wrap items-baseline gap-4 sm:gap-6">
              <div className="text-sm text-[#4B5563] font-medium">
                Total Revenue : <strong className="text-xl sm:text-2xl font-black text-[#111827] ml-1.5">$29.230.000</strong>
              </div>
              <div className="flex items-center gap-3.5 text-[0.72rem] font-bold text-[#374151] tracking-wider uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#E5E7EB] inline-block rounded-[1px]" />
                  <span>NEW USER</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#111827] inline-block rounded-[1px]" />
                  <span>EXISTING USER</span>
                </div>
              </div>
            </div>

            {/* Time Pill Selector */}
            <div className="flex bg-[#F3F4F6] rounded-md p-[3px]">
              <button
                type="button"
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  period === 'weekly' ? 'bg-white text-[#111827] shadow-sm font-bold' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                onClick={() => setPeriod('weekly')}
              >
                Weekly
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  period === 'monthly' ? 'bg-white text-[#111827] shadow-sm font-bold' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                onClick={() => setPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  period === 'yearly' ? 'bg-white text-[#111827] shadow-sm font-bold' : 'text-[#6B7280] hover:text-[#111827]'
                }`}
                onClick={() => setPeriod('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Block Matrix Bar Chart */}
          <div className="flex relative h-[250px] mt-2 select-none">
            {/* Y-Axis */}
            <div className="flex flex-col justify-between pr-3 text-[0.7rem] font-semibold text-[#9CA3AF] text-right h-[calc(100%-24px)] w-7 shrink-0">
              <span>60k</span>
              <span>50k</span>
              <span>40k</span>
              <span>30k</span>
              <span>20k</span>
              <span>10k</span>
              <span>0k</span>
            </div>

            {/* Grid Area with Dotted Guidelines and Columns */}
            <div className="flex-1 relative flex flex-col justify-between h-full">
              {/* Guidelines */}
              <div className="absolute inset-0 h-[calc(100%-24px)] flex flex-col justify-between pointer-events-none">
                <div className="w-full border-t border-dashed border-[#E5E7EB]" />
                <div className="w-full border-t border-dashed border-[#E5E7EB]" />
                <div className="w-full border-t border-dashed border-[#E5E7EB]" />
                <div className="w-full border-t border-dashed border-[#E5E7EB]" />
                <div className="w-full border-t border-dashed border-[#E5E7EB]" />
                <div className="w-full border-t border-dashed border-[#E5E7EB]" />
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>

              {/* Month Columns */}
              <div className="flex justify-between items-end h-[calc(100%-24px)] relative z-10 px-1">
                {MATRIX_DATA.map((item) => {
                  const isActive = item.month === activeMonth;
                  return (
                    <div
                      key={item.month}
                      className="flex flex-col items-center justify-end w-[7.2%] h-full cursor-pointer relative"
                      onClick={() => setActiveMonth(item.month)}
                    >
                      {isActive && (
                        <>
                          {/* Tooltip Pin */}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-white border border-[#E5E7EB] rounded-md px-3 py-2 shadow-md whitespace-nowrap z-20 pointer-events-none">
                            <div className="text-[0.72rem] font-bold text-[#111827] mb-1">{item.month} 2025</div>
                            <div className="flex items-center gap-1.5 text-[0.68rem] text-[#4B5563]">
                              <span className="w-2 h-2 bg-[#E5E7EB] rounded-[1px] inline-block" />
                              <span>
                                New User <strong className="text-[#111827]">{item.newText || item.valTotal}</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[0.68rem] text-[#4B5563] mt-0.5">
                              <span className="w-2 h-2 bg-[#111827] rounded-[1px] inline-block" />
                              <span>
                                Existing User <strong className="text-[#111827]">{item.existText || '18k'}</strong>
                              </span>
                            </div>
                          </div>
                          {/* Vertical Dotted Line */}
                          <div className="absolute top-12 bottom-0 left-1/2 w-px border-l border-dotted border-[#111827] pointer-events-none z-0" />
                        </>
                      )}

                      {/* Blocks Stack */}
                      <div className="flex flex-col-reverse gap-[2px] items-center mb-1">
                        {/* Existing Users (Đen) */}
                        {Array.from({ length: item.existing }).map((_, idx) => (
                          <div
                            key={`exist-${idx}`}
                            className={`w-2 h-2 rounded-[1px] ${isActive ? 'bg-[#111827] ring-1 ring-[#111827]' : 'bg-[#111827]'}`}
                          />
                        ))}
                        {/* New Users (Xám nhạt) */}
                        {Array.from({ length: item.newUsers }).map((_, idx) => (
                          <div key={`new-${idx}`} className="w-2 h-2 bg-[#E5E7EB] rounded-[1px]" />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between h-6 items-center px-1 border-t border-[#F3F4F6] mt-1.5">
                {MATRIX_DATA.map((item) => (
                  <span
                    key={item.month}
                    className={`text-[0.68rem] uppercase w-[7.2%] text-center cursor-pointer transition-colors ${
                      item.month === activeMonth ? 'text-[#111827] font-black' : 'text-[#9CA3AF] font-semibold hover:text-[#4B5563]'
                    }`}
                    onClick={() => setActiveMonth(item.month)}
                  >
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── CỘT PHẢI: REVENUE BREAKDOWN ─── */}
        <div className="w-full lg:w-[240px] lg:shrink-0 bg-white border border-[#E5E7EB] rounded-[10px] p-5 sm:p-6 flex flex-col justify-between shadow-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#111827] tracking-wider uppercase">
              <span>REVENUE BREAKDOWN</span>
              <span className="text-[#9CA3AF] text-sm cursor-pointer" title="Phân rã theo danh mục doanh thu">ⓘ</span>
            </div>
            <span className="text-[#9CA3AF] cursor-pointer text-base leading-none hover:text-[#111827]">⋯</span>
          </div>

          {/* Sub Header & Date Pill */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#6B7280] font-medium">Revenue by Category</span>
            <div className="inline-flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md px-2.5 py-1 text-[0.72rem] font-semibold text-[#374151] cursor-pointer hover:bg-[#F3F4F6]">
              <span>📅 Jan 1 - Dec 31</span>
              <span className="text-[0.6rem] text-[#6B7280]">▼</span>
            </div>
          </div>

          {/* Big Amount */}
          <div className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight mb-3">
            $29.230.000
          </div>

          {/* AI Insight Button */}
          <button
            type="button"
            className="w-full bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-md px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-[#374151] transition-all cursor-pointer mb-4"
            onClick={() => setShowAiModal(true)}
          >
            <span className="flex items-center gap-2">
              <Star size={14} className="text-[#374151]" />
              <span>Get AI insight for better analysis</span>
            </span>
            <ChevronRight size={14} className="text-[#9CA3AF]" />
          </button>

          {/* Vertical Needle Chart */}
          <div className="flex items-end justify-between h-[135px] px-1 py-1.5 border-b border-[#E5E7EB]">
            {NEEDLE_HEIGHTS.map((h, i) => (
              <div key={i} className="flex flex-col-reverse items-center w-[4%] h-full justify-start">
                <div className="w-[2px] bg-[#111827] rounded-[1px]" style={{ height: `${h.dark}px` }} />
                <div className="w-[2px] bg-[#E5E7EB] rounded-[1px]" style={{ height: `${h.light}px` }} />
              </div>
            ))}
          </div>

          {/* Axis Labels */}
          <div className="flex justify-between items-center text-[0.68rem] text-[#9CA3AF] font-bold mt-2">
            <span>1 JAN</span>
            <span>31 DEC 2025</span>
          </div>
        </div>
      </div>

      {/* AI Insight Modal Dialog */}
      {showAiModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowAiModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-[#E5E7EB]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">✨</span>
              <h3 className="text-lg font-bold text-[#111827]">AI Business Insights & Analysis</h3>
            </div>
            <div className="text-sm leading-relaxed text-[#4B5563] space-y-2.5">
              <p>
                • <strong>Doanh số chạm mốc $29.230.000:</strong> Tháng 6 đạt đỉnh nhờ chiến dịch thời trang cao cấp (+38k khách mới).
              </p>
              <p>
                • <strong>Tỷ lệ chuyển đổi khách quen duy trì ổn định:</strong> Duy trì ở mức 18k người dùng thường xuyên đặt hàng.
              </p>
              <p>
                • <strong>Dự báo quý tới:</strong> Doanh thu kỳ vọng tăng trưởng <strong>+14%</strong> nếu bổ sung thêm các bộ sưu tập giới hạn cho khách VIP.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="bg-[#111827] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#1E293B] cursor-pointer"
                onClick={() => setShowAiModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeAnalyticsStrip;
