'use client';

import React from 'react';

interface MonthlyMatrixChartProps {
  activeMonth: string;
  onSelectMonth: (month: string) => void;
}

const matrixChartData = [
  { month: 'JAN', existing: 4, newUsers: 3, valTotal: '14k' },
  { month: 'FEB', existing: 5, newUsers: 4, valTotal: '18k' },
  { month: 'MAR', existing: 6, newUsers: 6, valTotal: '24k' },
  { month: 'APR', existing: 5, newUsers: 7, valTotal: '26k' },
  { month: 'MAY', existing: 7, newUsers: 10, valTotal: '34k' },
  { month: 'JUN', existing: 8, newUsers: 14, valTotal: '56k', newText: '38k', existText: '18k' },
  { month: 'JUL', existing: 6, newUsers: 8, valTotal: '30k' },
  { month: 'AUG', existing: 5, newUsers: 6, valTotal: '22k' },
  { month: 'SEP', existing: 4, newUsers: 5, valTotal: '19k' },
  { month: 'OCT', existing: 6, newUsers: 7, valTotal: '27k' },
  { month: 'NOV', existing: 5, newUsers: 8, valTotal: '28k' },
  { month: 'DEC', existing: 7, newUsers: 9, valTotal: '32k' },
];

export const MonthlyMatrixChart: React.FC<MonthlyMatrixChartProps> = ({
  activeMonth,
  onSelectMonth,
}) => {
  return (
    <div className="matrix-chart-card">
      <div className="matrix-chart-header">
        <div>
          <h3>Doanh Thu Theo Tháng (12 Tháng)</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân tích tỷ trọng khách hàng mới vs khách hàng thân thiết
          </p>
        </div>
        <div className="chart-legend-row">
          <span className="legend-dot new-user" /> Khách mới
          <span className="legend-dot exist-user ml-3" /> Khách cũ
        </div>
      </div>

      <div className="matrix-bars-container">
        {matrixChartData.map((item) => {
          const isActive = activeMonth === item.month;

          return (
            <div
              key={item.month}
              className={`matrix-col ${isActive ? 'active' : ''}`}
              onClick={() => onSelectMonth(item.month)}
              role="button"
              tabIndex={0}
            >
              <div className="matrix-bar-stack">
                <div
                  className="bar-new"
                  style={{ height: `${item.newUsers * 8}px` }}
                  title={`Khách mới: ${item.newUsers * 10}%`}
                />
                <div
                  className="bar-exist"
                  style={{ height: `${item.existing * 8}px` }}
                  title={`Khách cũ: ${item.existing * 10}%`}
                />
              </div>
              <span className="month-label">{item.month}</span>
              <span className="val-label">{item.valTotal}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
