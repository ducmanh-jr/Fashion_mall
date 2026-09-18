/**
 * Income Statistics Application Logic
 * Recreated to match media_1789715810035.png
 * Aethelgard Mall Seller Portal
 */

// Monthly Data for the Block Matrix Chart (JAN - DEC)
const matrixChartData = [
  { month: 'JAN', existing: 4, newUsers: 3, valTotal: '14k' },
  { month: 'FEB', existing: 5, newUsers: 4, valTotal: '18k' },
  { month: 'MAR', existing: 6, newUsers: 6, valTotal: '24k' },
  { month: 'APR', existing: 5, newUsers: 7, valTotal: '26k' },
  { month: 'MAY', existing: 7, newUsers: 10, valTotal: '34k' },
  { month: 'JUN', existing: 8, newUsers: 14, valTotal: '56k', active: true, newText: '38k', existText: '18k' }, // Highlighted in screenshot
  { month: 'JUL', existing: 6, newUsers: 8, valTotal: '30k' },
  { month: 'AUG', existing: 5, newUsers: 6, valTotal: '22k' },
  { month: 'SEP', existing: 4, newUsers: 5, valTotal: '19k' },
  { month: 'OCT', existing: 6, newUsers: 7, valTotal: '27k' },
  { month: 'NOV', existing: 5, newUsers: 8, valTotal: '28k' },
  { month: 'DEC', existing: 7, newUsers: 9, valTotal: '32k' }
];

// Recent Transactions Data (From user screenshot)
const recentTransactions = [
  { id: '#04910', customer: 'Ryan Korsgaard', product: 'Ergo Office Chair', status: 'Success', qty: 12, unitPrice: '$3,450', total: '$41,400' },
  { id: '#04911', customer: 'Madelyn Lubin', product: 'Sunset Desk 02', status: 'Success', qty: 20, unitPrice: '$2,980', total: '$59,200' },
  { id: '#04912', customer: 'Abram Bergson', product: 'Eco Bookshelf', status: 'Pending', qty: 22, unitPrice: '$1,750', total: '$75,900' },
  { id: '#04913', customer: 'Phillip Mango', product: 'Green Leaf Desk', status: 'Refunded', qty: 24, unitPrice: '$1,950', total: '$19,500' },
  { id: '#04914', customer: 'Esther Howard', product: 'Giày Sneaker Gucci Ace Leather', status: 'Success', qty: 2, unitPrice: '$1,250', total: '$2,500' },
  { id: '#04915', customer: 'Darrell Steward', product: 'Túi Gucci Dionysus Supreme', status: 'Success', qty: 1, unitPrice: '$2,850', total: '$2,850' },
  { id: '#04916', customer: 'Cameron Williamson', product: 'Adidas Samba OG Classic', status: 'Success', qty: 4, unitPrice: '$180', total: '$720' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderMatrixChart('JUN');
  renderNeedleChart();
  renderTransactionsTable();

  // Search input filter
  const searchInput = document.getElementById('tx-search-input');
  searchInput?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    renderTransactionsTable(q);
  });

  // Select all checkbox
  const checkAll = document.getElementById('tx-check-all');
  checkAll?.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll('.tx-row-check').forEach(cb => {
      cb.checked = isChecked;
    });
  });

  // Time Pill Selector (Weekly, Monthly, Yearly)
  const timeBtns = document.querySelectorAll('.time-pill-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const period = btn.dataset.period;
      if (period === 'weekly') {
        document.getElementById('trend-total-amount').textContent = '$5,240';
      } else if (period === 'yearly') {
        document.getElementById('trend-total-amount').textContent = '$248,500';
      } else {
        document.getElementById('trend-total-amount').textContent = '$20,320';
      }
    });
  });
});

// Render the Block Matrix Bar Chart
function renderMatrixChart(activeMonth = 'JUN') {
  const container = document.getElementById('matrix-cols-container');
  const xAxis = document.getElementById('matrix-x-axis');
  if (!container || !xAxis) return;

  container.innerHTML = matrixChartData.map(item => {
    const isActive = item.month === activeMonth;

    // Generate block elements: black blocks for existing users, light blocks for new users
    let blocksHtml = '';
    // Existing blocks (black)
    for (let i = 0; i < item.existing; i++) {
      blocksHtml += `<div class="matrix-block existing ${isActive ? 'highlight' : ''}"></div>`;
    }
    // New user blocks (light gray)
    for (let j = 0; j < item.newUsers; j++) {
      blocksHtml += `<div class="matrix-block new"></div>`;
    }

    // Tooltip for active month (e.g. JUN)
    let tooltipHtml = '';
    if (isActive) {
      tooltipHtml = `
        <div class="matrix-tooltip-pin">
          <div class="tt-title">${item.month} 2025</div>
          <div class="tt-row">
            <span class="legend-square-new"></span>
            <span>New User <strong>${item.newText || item.valTotal}</strong></span>
          </div>
          <div class="tt-row">
            <span class="legend-square-existing"></span>
            <span>Existing User <strong>${item.existText || '18k'}</strong></span>
          </div>
        </div>
        <div class="matrix-vertical-dash"></div>
      `;
    }

    return `
      <div class="matrix-month-col" onclick="selectMonth('${item.month}')">
        ${tooltipHtml}
        <div class="blocks-stack">
          ${blocksHtml}
        </div>
      </div>
    `;
  }).join('');

  xAxis.innerHTML = matrixChartData.map(item => `
    <span class="matrix-x-label ${item.month === activeMonth ? 'active' : ''}" onclick="selectMonth('${item.month}')">
      ${item.month}
    </span>
  `).join('');
}

window.selectMonth = function(month) {
  renderMatrixChart(month);
};

// Render the Needle Vertical Bar Chart on Right Card
function renderNeedleChart() {
  const container = document.getElementById('needle-chart-bars');
  if (!container) return;

  // 18 needles with varied heights (exact match to screenshot)
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

  container.innerHTML = needleHeights.map(h => `
    <div class="needle-col">
      <div class="needle-dark-seg" style="height: ${h.dark}px;"></div>
      <div class="needle-light-seg" style="height: ${h.light}px;"></div>
    </div>
  `).join('');
}

// Render Recent Transactions Table
function renderTransactionsTable(filterQuery = '') {
  const tbody = document.getElementById('tx-table-body');
  if (!tbody) return;

  const filtered = recentTransactions.filter(tx => {
    if (!filterQuery) return true;
    return (
      tx.id.toLowerCase().includes(filterQuery) ||
      tx.customer.toLowerCase().includes(filterQuery) ||
      tx.product.toLowerCase().includes(filterQuery) ||
      tx.status.toLowerCase().includes(filterQuery)
    );
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 30px; color: #9CA3AF;">
          No transactions found matching "${filterQuery}"
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(tx => `
    <tr>
      <td style="width: 28px;">
        <input type="checkbox" class="tx-checkbox tx-row-check">
      </td>
      <td>
        <span class="tx-id-badge">${tx.id}</span>
      </td>
      <td>
        <span class="tx-customer-name">${tx.customer}</span>
      </td>
      <td>
        <span class="tx-product-name">${tx.product}</span>
      </td>
      <td>
        <span class="tx-status-badge ${tx.status}">${tx.status}</span>
      </td>
      <td>
        <span style="font-weight: 650; color: #111827;">${tx.qty}</span>
      </td>
      <td>
        <span class="tx-unit-price">${tx.unitPrice}</span>
      </td>
      <td>
        <span class="tx-total-rev">${tx.total}</span>
      </td>
      <td style="text-align: right;">
        <button class="btn-tx-actions" onclick="alert('Transaction ${tx.id}: ${tx.customer} - ${tx.total}')">•••</button>
      </td>
    </tr>
  `).join('');
}

window.showAiInsight = function() {
  alert('✨ AI Business Insights:\n• Doanh số tháng 6 đạt đỉnh $56,000 nhờ chiến dịch thời trang hè (+38k khách mới).\n• Tỷ lệ chuyển đổi khách quen duy trì ổn định 18k.\n• Dự báo tháng 7: Doanh thu kỳ vọng tăng thêm +12% nếu bổ sung thêm 5 SKU phụ kiện luxury.');
};

window.addNewTransactionPrompt = function() {
  const customer = prompt('Nhập tên khách hàng mới:', 'Eleanor Vance');
  if (customer) {
    recentTransactions.unshift({
      id: `#049${Math.floor(100 + Math.random() * 900)}`,
      customer: customer,
      product: 'Gucci Monogram Canvas Shirt',
      status: 'Success',
      qty: 1,
      unitPrice: '$1,050',
      total: '$1,050'
    });
    renderTransactionsTable();
  }
};
