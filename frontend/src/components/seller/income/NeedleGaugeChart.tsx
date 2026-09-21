'use client';

import React from 'react';

const needleHeights = [
  { dark: 30, light: 20 },
  { dark: 45, light: 25 },
  { dark: 20, light: 15 },
  { dark: 35, light: 30 },
  { dark: 60, light: 20 },
  { dark: 25, light: 30 },
  { dark: 40, light: 20 },
  { dark: 30, light: 35 },
  { dark: 50, light: 25 },
  { dark: 70, light: 30 },
  { dark: 35, light: 20 },
  { dark: 45, light: 25 },
  { dark: 55, light: 20 },
  { dark: 28, light: 30 },
  { dark: 65, light: 25 },
  { dark: 40, light: 30 },
  { dark: 50, light: 20 },
  { dark: 30, light: 25 },
];

export const NeedleGaugeChart: React.FC = () => {
  return (
    <div className="needle-gauge-card">
      <div className="gauge-header">
        <h4>Chỉ Số Chuyển Đổi & Lợi Nhuận</h4>
        <span className="gauge-badge">Tốt (88.4%)</span>
      </div>

      <div className="needle-strip-container">
        {needleHeights.map((h, i) => (
          <div key={i} className="needle-bar-wrapper">
            <div className="needle-bar-dark" style={{ height: `${h.dark}px` }} />
            <div className="needle-bar-light" style={{ height: `${h.light}px` }} />
          </div>
        ))}
      </div>

      <div className="gauge-meta-row">
        <div>
          <div className="text-xs text-slate-500">Hiệu suất trung bình</div>
          <div className="font-bold text-slate-900 text-sm mt-0.5">88.4 / 100</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Mục tiêu quý</div>
          <div className="font-bold text-emerald-600 text-sm mt-0.5">Đạt 112%</div>
        </div>
      </div>
    </div>
  );
};
