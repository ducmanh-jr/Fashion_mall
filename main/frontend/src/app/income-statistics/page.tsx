'use client';

import React, { useState } from 'react';

// Monthly Data for the Block Matrix Chart (JAN - DEC)
interface MatrixMonthItem {
  month: string;
  existing: number;
  newUsers: number;
  valTotal: string;
  newText?: string;
  existText?: string;
}

const matrixChartData: MatrixMonthItem[] = [
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
  { month: 'DEC', existing: 7, newUsers: 9, valTotal: '32k' }
];

// Needle chart segments
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
  { dark: 30, light: 25 }
];

interface Transaction {
  id: string;
  customer: string;
  product: string;
  status: 'Success' | 'Pending' | 'Refunded';
  qty: number;
  unitPrice: string;
  total: string;
}

const initialTransactions: Transaction[] = [
  { id: '#04910', customer: 'Ryan Korsgaard', product: 'Ergo Office Chair', status: 'Success', qty: 12, unitPrice: '$3,450', total: '$41,400' },
  { id: '#04911', customer: 'Madelyn Lubin', product: 'Sunset Desk 02', status: 'Success', qty: 20, unitPrice: '$2,980', total: '$59,200' },
  { id: '#04912', customer: 'Abram Bergson', product: 'Eco Bookshelf', status: 'Pending', qty: 22, unitPrice: '$1,750', total: '$75,900' },
  { id: '#04913', customer: 'Phillip Mango', product: 'Green Leaf Desk', status: 'Refunded', qty: 24, unitPrice: '$1,950', total: '$19,500' },
  { id: '#04914', customer: 'Esther Howard', product: 'Giày Sneaker Gucci Ace Leather', status: 'Success', qty: 2, unitPrice: '$1,250', total: '$2,500' },
  { id: '#04915', customer: 'Darrell Steward', product: 'Túi Gucci Dionysus Supreme', status: 'Success', qty: 1, unitPrice: '$2,850', total: '$2,850' },
  { id: '#04916', customer: 'Cameron Williamson', product: 'Adidas Samba OG Classic', status: 'Success', qty: 4, unitPrice: '$180', total: '$720' }
];

export default function IncomeStatisticsPage() {
  const [activeMonth, setActiveMonth] = useState<string>('JUN');
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAiModal, setShowAiModal] = useState(false);

  // Period total calculation
  const trendTotal = period === 'weekly' ? '$5,240' : period === 'yearly' ? '$248,500' : '$20,320';

  // Filtered transactions
  const filteredTransactions = transactions.filter(tx => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      tx.id.toLowerCase().includes(q) ||
      tx.customer.toLowerCase().includes(q) ||
      tx.product.toLowerCase().includes(q) ||
      tx.status.toLowerCase().includes(q)
    );
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredTransactions.map(tx => tx.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddNewTx = () => {
    const customer = window.prompt('Nhập tên khách hàng mới:', 'Eleanor Vance');
    if (customer) {
      const newTx: Transaction = {
        id: `#049${Math.floor(100 + Math.random() * 900)}`,
        customer: customer,
        product: 'Gucci Monogram Canvas Shirt',
        status: 'Success',
        qty: 1,
        unitPrice: '$1,050',
        total: '$1,050'
      };
      setTransactions([newTx, ...transactions]);
    }
  };

  return (
    <main className="income-dashboard-wrap">
      {/* ============================================================
           ROW 1: 4 TOP METRIC CARDS
           ============================================================ */}
      <div className="metric-cards-grid">
        {/* 1. Total Revenue */}
        <div className="kpi-stat-box">
          <div className="kpi-top-row">
            <span className="kpi-title-mono">TOTAL REVENUE</span>
            <div className="sparkline-bars">
              <div className="spark-bar" style={{ height: '12px' }}></div>
              <div className="spark-bar" style={{ height: '18px' }}></div>
              <div className="spark-bar" style={{ height: '14px' }}></div>
              <div className="spark-bar" style={{ height: '22px' }}></div>
              <div className="spark-bar active" style={{ height: '28px' }}></div>
              <div className="spark-bar" style={{ height: '16px' }}></div>
              <div className="spark-bar" style={{ height: '20px' }}></div>
            </div>
          </div>
          <div className="kpi-big-num">$20,320</div>
          <div className="kpi-bottom-row">
            <span className="kpi-info-icon">ⓘ</span>
            <span className="kpi-growth-tag">
              +0,94 <span style={{ fontWeight: 500, color: '#6B7280', marginLeft: '2px' }}>last year</span>
            </span>
          </div>
        </div>

        {/* 2. Total Orders */}
        <div className="kpi-stat-box">
          <div className="kpi-top-row">
            <span className="kpi-title-mono">TOTAL ORDERS</span>
            <div className="sparkline-bars">
              <div className="spark-bar" style={{ height: '14px' }}></div>
              <div className="spark-bar" style={{ height: '10px' }}></div>
              <div className="spark-bar" style={{ height: '16px' }}></div>
              <div className="spark-bar active" style={{ height: '24px' }}></div>
              <div className="spark-bar" style={{ height: '18px' }}></div>
              <div className="spark-bar" style={{ height: '22px' }}></div>
              <div className="spark-bar" style={{ height: '14px' }}></div>
            </div>
          </div>
          <div className="kpi-big-num">
            10,320 <span className="kpi-subtext">Orders</span>
          </div>
          <div className="kpi-bottom-row">
            <span className="kpi-info-icon">ⓘ</span>
            <span className="kpi-growth-tag">
              +0,94 <span style={{ fontWeight: 500, color: '#6B7280', marginLeft: '2px' }}>last year</span>
            </span>
          </div>
        </div>

        {/* 3. New Customers */}
        <div className="kpi-stat-box">
          <div className="kpi-top-row">
            <span className="kpi-title-mono">NEW CUSTOMERS</span>
            <div className="sparkline-bars">
              <div className="spark-bar" style={{ height: '16px' }}></div>
              <div className="spark-bar" style={{ height: '20px' }}></div>
              <div className="spark-bar" style={{ height: '12px' }}></div>
              <div className="spark-bar" style={{ height: '18px' }}></div>
              <div className="spark-bar active" style={{ height: '26px' }}></div>
              <div className="spark-bar" style={{ height: '14px' }}></div>
              <div className="spark-bar" style={{ height: '19px' }}></div>
            </div>
          </div>
          <div className="kpi-big-num">
            4,305 <span className="kpi-subtext">New Users</span>
          </div>
          <div className="kpi-bottom-row">
            <span className="kpi-info-icon">ⓘ</span>
            <span className="kpi-growth-tag">
              +0,94 <span style={{ fontWeight: 500, color: '#6B7280', marginLeft: '2px' }}>last year</span>
            </span>
          </div>
        </div>

        {/* 4. Conversion Rate */}
        <div className="kpi-stat-box">
          <div className="kpi-top-row">
            <span className="kpi-title-mono">CONVERSION RATE</span>
            <div className="sparkline-bars">
              <div className="spark-bar" style={{ height: '10px' }}></div>
              <div className="spark-bar" style={{ height: '14px' }}></div>
              <div className="spark-bar" style={{ height: '20px' }}></div>
              <div className="spark-bar" style={{ height: '15px' }}></div>
              <div className="spark-bar active" style={{ height: '25px' }}></div>
              <div className="spark-bar" style={{ height: '18px' }}></div>
              <div className="spark-bar" style={{ height: '12px' }}></div>
            </div>
          </div>
          <div className="kpi-big-num">3.9%</div>
          <div className="kpi-bottom-row">
            <span className="kpi-info-icon">ⓘ</span>
            <span className="kpi-growth-tag">
              +0,94 <span style={{ fontWeight: 500, color: '#6B7280', marginLeft: '2px' }}>last year</span>
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================
           ROW 2: SALES TREND & REVENUE BREAKDOWN
           ============================================================ */}
      <div className="analytics-two-col-grid">
        {/* Left Card: SALES TREND */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <span>SALES TREND</span>
              <span>ⓘ</span>
            </div>
            <span className="dash-card-action-icon">⋯</span>
          </div>

          <div className="sales-trend-toolbar">
            <div className="trend-stat-left">
              <div className="trend-total-label">
                Total Revenue : <strong id="trend-total-amount">{trendTotal}</strong>
              </div>
              <div className="trend-legend">
                <div className="trend-legend-item">
                  <span className="legend-square-new"></span>
                  <span>NEW USER</span>
                </div>
                <div className="trend-legend-item">
                  <span className="legend-square-existing"></span>
                  <span>EXISTING USER</span>
                </div>
              </div>
            </div>

            <div className="time-pill-selector">
              <button
                className={`time-pill-btn ${period === 'weekly' ? 'active' : ''}`}
                onClick={() => setPeriod('weekly')}
              >
                Weekly
              </button>
              <button
                className={`time-pill-btn ${period === 'monthly' ? 'active' : ''}`}
                onClick={() => setPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`time-pill-btn ${period === 'yearly' ? 'active' : ''}`}
                onClick={() => setPeriod('yearly')}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Block Matrix Bar Chart */}
          <div className="matrix-chart-wrapper">
            {/* Y-Axis */}
            <div className="matrix-y-axis">
              <span>60k</span>
              <span>50k</span>
              <span>40k</span>
              <span>30k</span>
              <span>20k</span>
              <span>10k</span>
              <span>0k</span>
            </div>

            {/* Grid Area with Dotted Guidelines and Columns */}
            <div className="matrix-grid-area">
              <div className="matrix-guidelines">
                <div className="matrix-guide-line"></div>
                <div className="matrix-guide-line"></div>
                <div className="matrix-guide-line"></div>
                <div className="matrix-guide-line"></div>
                <div className="matrix-guide-line"></div>
                <div className="matrix-guide-line"></div>
                <div className="matrix-guide-line" style={{ borderTop: '1px solid #E5E7EB' }}></div>
              </div>

              {/* Month Columns */}
              <div className="matrix-columns-container" id="matrix-cols-container">
                {matrixChartData.map(item => {
                  const isActive = item.month === activeMonth;
                  return (
                    <div
                      key={item.month}
                      className="matrix-month-col"
                      onClick={() => setActiveMonth(item.month)}
                      style={{ cursor: 'pointer' }}
                    >
                      {isActive && (
                        <>
                          <div className="matrix-tooltip-pin">
                            <div className="tt-title">{item.month} 2025</div>
                            <div className="tt-row">
                              <span className="legend-square-new"></span>
                              <span>New User <strong>{item.newText || item.valTotal}</strong></span>
                            </div>
                            <div className="tt-row">
                              <span className="legend-square-existing"></span>
                              <span>Existing User <strong>{item.existText || '18k'}</strong></span>
                            </div>
                          </div>
                          <div className="matrix-vertical-dash"></div>
                        </>
                      )}

                      <div className="blocks-stack">
                        {/* Existing user blocks (bottom) */}
                        {Array.from({ length: item.existing }).map((_, idx) => (
                          <div
                            key={`exist-${idx}`}
                            className={`matrix-block existing ${isActive ? 'highlight' : ''}`}
                          ></div>
                        ))}
                        {/* New user blocks (top) */}
                        {Array.from({ length: item.newUsers }).map((_, idx) => (
                          <div key={`new-${idx}`} className="matrix-block new"></div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Labels */}
              <div className="matrix-x-axis" id="matrix-x-axis">
                {matrixChartData.map(item => (
                  <span
                    key={item.month}
                    className={`matrix-x-label ${item.month === activeMonth ? 'active' : ''}`}
                    onClick={() => setActiveMonth(item.month)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: REVENUE BREAKDOWN */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <span>REVENUE BREAKDOWN</span>
              <span>ⓘ</span>
            </div>
            <span className="dash-card-action-icon">⋯</span>
          </div>

          <div className="breakdown-top-meta">
            <span className="breakdown-cat-title">Revenue by Category</span>
            <div className="breakdown-date-pill">
              <span>📅 Jan 1 - Aug 30</span>
              <span style={{ fontSize: '0.65rem' }}>▼</span>
            </div>
          </div>

          <div className="breakdown-big-val">$20,320</div>

          {/* AI Insight Button Banner */}
          <button
            className="btn-ai-insight"
            onClick={() => setShowAiModal(true)}
            type="button"
          >
            <span className="ai-icon-spark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              Get AI insight for better analysis
            </span>
            <span>›</span>
          </button>

          {/* Vertical Needle Chart */}
          <div className="needle-chart-container" id="needle-chart-bars">
            {needleHeights.map((h, i) => (
              <div key={i} className="needle-col">
                <div className="needle-dark-seg" style={{ height: `${h.dark}px` }}></div>
                <div className="needle-light-seg" style={{ height: `${h.light}px` }}></div>
              </div>
            ))}
          </div>

          <div className="needle-axis-labels">
            <span>1 JAN</span>
            <span>30 JAN 2025</span>
          </div>
        </div>
      </div>

      {/* ============================================================
           ROW 3: RECENT TRANSACTIONS TABLE
           ============================================================ */}
      <div className="dash-card" style={{ padding: '18px 20px' }}>
        <div className="recent-tx-header">
          <div className="dash-card-title-group">
            <span>RECENT TRANSACTIONS</span>
            <span>ⓘ</span>
          </div>

          <div className="tx-header-actions">
            <div className="tx-search-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                id="tx-search-input"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-add-tx" onClick={handleAddNewTx} type="button">
              + Add Transaction
            </button>
            <button
              className="btn-more-options"
              onClick={() => alert('Transaction filter options...')}
              type="button"
            >
              ⋯
            </button>
          </div>
        </div>

        <div className="tx-table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th style={{ width: '28px' }}>
                  <input
                    type="checkbox"
                    className="tx-checkbox"
                    id="tx-check-all"
                    checked={selectedIds.length === filteredTransactions.length && filteredTransactions.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ID ↕</th>
                <th>CUSTOMER ↕</th>
                <th>PRODUCT ↕</th>
                <th>STATUS ↕</th>
                <th>QTY ↕</th>
                <th>UNIT PRICE ↕</th>
                <th>TOTAL REVENUE ↕</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody id="tx-table-body">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '30px', color: '#9CA3AF' }}>
                    No transactions found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx.id}>
                    <td style={{ width: '28px' }}>
                      <input
                        type="checkbox"
                        className="tx-checkbox tx-row-check"
                        checked={selectedIds.includes(tx.id)}
                        onChange={() => handleToggleRow(tx.id)}
                      />
                    </td>
                    <td>
                      <span className="tx-id-badge">{tx.id}</span>
                    </td>
                    <td>
                      <span className="tx-customer-name">{tx.customer}</span>
                    </td>
                    <td>
                      <span className="tx-product-name">{tx.product}</span>
                    </td>
                    <td>
                      <span className={`tx-status-badge ${tx.status}`}>{tx.status}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 650, color: '#111827' }}>{tx.qty}</span>
                    </td>
                    <td>
                      <span className="tx-unit-price">{tx.unitPrice}</span>
                    </td>
                    <td>
                      <span className="tx-total-rev">{tx.total}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-tx-actions"
                        onClick={() => alert(`Transaction ${tx.id}: ${tx.customer} - ${tx.total}`)}
                        type="button"
                      >
                        •••
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insight Modal Dialog */}
      {showAiModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowAiModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '520px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>✨</span>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>
                AI Business Insights & Analysis
              </h3>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.7', color: '#4B5563' }}>
              <p style={{ margin: '0 0 10px' }}>
                • <strong>Doanh số tháng 6 đạt đỉnh $56,000</strong> nhờ chiến dịch thời trang hè (+38k khách mới).
              </p>
              <p style={{ margin: '0 0 10px' }}>
                • <strong>Tỷ lệ chuyển đổi khách quen duy trì ổn định</strong> ở mức 18k người dùng.
              </p>
              <p style={{ margin: '0 0 10px' }}>
                • <strong>Dự báo tháng 7:</strong> Doanh thu kỳ vọng tăng thêm <strong>+12%</strong> nếu bổ sung thêm 5 SKU phụ kiện luxury.
              </p>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                style={{
                  background: '#111827',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowAiModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
