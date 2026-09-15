// DM Fashion Mall - Seller Center Client (.NET 10 Web API Integration)
const API_BASE = '/api/seller';
const AUTH_BASE = '/api/auth';

let currentToken = localStorage.getItem('seller_token') || '';
let currentShopId = parseInt(localStorage.getItem('seller_shop_id') || '1');
let currentOrderList = [];
let categoriesList = [];
let brandsList = [];

// HTTP Request Helper
async function apiRequest(url, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Shop-Id': currentShopId.toString()
  };
  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
  }

  const options = { method, headers };
  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);
    if (res.status === 401) {
      showToast('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'error');
      switchView('login');
      return null;
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Lỗi yêu cầu máy chủ');
    }
    return await res.json().catch(() => true);
  } catch (err) {
    showToast(err.message, 'error');
    return null;
  }
}

// Toast Alert System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  const icon = type === 'success' ? '✅' : (type === 'error' ? '❌' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Modal Control
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}

// Format Currency VND
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
}

// Format Date
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
}

// 1. Navigation View Switcher (Supports all 15 views)
function switchView(viewName) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  const targetNav = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  if (targetNav) targetNav.classList.add('active');

  // Trigger Data Fetch for the view
  switch (viewName) {
    case 'dashboard': loadDashboard(); break;
    case 'profile': loadProfile(); break;
    case 'products': loadProducts(); break;
    case 'add-product': initAddProduct(); break;
    case 'inventory': loadInventory(); break;
    case 'orders': loadOrders(); break;
    case 'shipping': loadShipping(); break;
    case 'promotions': loadPromotions(); break;
    case 'finance': loadFinance(); break;
    case 'analytics': loadAnalytics(); break;
    case 'reviews': loadReviews(); break;
    case 'settings': loadSettings(); break;
  }
}

// Init Navigation Event Handlers
document.querySelectorAll('.sidebar-nav .nav-item').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const view = link.getAttribute('data-view');
    if (view) switchView(view);
  });
});
// 1. Auth Module
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await apiRequest(`${AUTH_BASE}/seller/login`, 'POST', { email, password });
  if (res && res.token) {
    currentToken = res.token;
    currentShopId = res.shopId || 1;
    localStorage.setItem('seller_token', res.token);
    localStorage.setItem('seller_shop_id', currentShopId.toString());
    localStorage.setItem('seller_name', res.fullName);
    localStorage.setItem('seller_shop_name', res.shopName || '');

    document.getElementById('header-shop-name').textContent = res.shopName || res.fullName;
    showToast(`Đăng nhập thành công! Chào mừng ${res.fullName}`, 'success');
    switchView('dashboard');
  }
}

// 2. Dashboard Module
async function loadDashboard() {
  const metrics = await apiRequest(`${API_BASE}/dashboard/metrics`);
  if (metrics) {
    document.getElementById('kpi-today-revenue').textContent = formatVND(metrics.todayRevenue);
    document.getElementById('kpi-pending-orders').textContent = metrics.pendingOrders;
    document.getElementById('kpi-low-stock').textContent = metrics.lowStockProducts;
    document.getElementById('kpi-new-reviews').textContent = metrics.newReviews;
    document.getElementById('kpi-avg-rating').textContent = metrics.averageRating;

    // Badges in sidebar
    const badgePending = document.getElementById('badge-pending-orders');
    if (metrics.pendingOrders > 0) {
      badgePending.textContent = metrics.pendingOrders;
      badgePending.style.display = 'inline-block';
    } else {
      badgePending.style.display = 'none';
    }

    const badgeStock = document.getElementById('badge-low-stock');
    if (metrics.lowStockProducts > 0) {
      badgeStock.textContent = metrics.lowStockProducts;
      badgeStock.style.display = 'inline-block';
    } else {
      badgeStock.style.display = 'none';
    }

    // Build Todo List
    const todoContainer = document.getElementById('dashboard-todo-list');
    todoContainer.innerHTML = '';

    const items = [
      { text: `Có ${metrics.pendingOrders} đơn hàng mới cần xác nhận & đóng gói`, count: metrics.pendingOrders, action: () => { switchView('orders'); filterOrders('PENDING'); } },
      { text: `Có ${metrics.lowStockProducts} sản phẩm sắp hết hàng (dưới 5 sản phẩm)`, count: metrics.lowStockProducts, action: () => { switchView('inventory'); loadInventory(true); } },
      { text: `Có ${metrics.newReviews} đánh giá khách hàng đang chờ bạn phản hồi`, count: metrics.newReviews, action: () => switchView('reviews') }
    ];

    items.forEach(item => {
      const div = document.createElement('div');
      div.style = 'display:flex; justify-content:space-between; align-items:center; padding:12px 14px; background:#f8fafc; border-radius:8px; border:1px solid var(--border-color);';
      div.innerHTML = `
        <span style="font-size:13.5px; font-weight:500;">${item.text}</span>
        <button class="btn btn-sm btn-secondary">Xử lý ngay →</button>
      `;
      div.querySelector('button').onclick = item.action;
      todoContainer.appendChild(div);
    });
  }

  // Draw 7 Days Revenue Chart on Canvas
  const chartData = await apiRequest(`${API_BASE}/dashboard/chart?days=7`);
  if (chartData) {
    drawRevenueChart(chartData);
  }
}

function drawRevenueChart(data) {
  const canvas = document.getElementById('salesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = 45;
  const maxVal = Math.max(...data.map(d => d.revenue), 5000000);

  // Background Grid Lines
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (i * (h - padding * 2)) / 4;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(w - padding, y);
    ctx.stroke();
  }

  // Draw Bars & Labels
  const barWidth = 36;
  const step = (w - padding * 2) / data.length;

  data.forEach((item, index) => {
    const x = padding + index * step + (step - barWidth) / 2;
    const barHeight = ((item.revenue / maxVal) * (h - padding * 2));
    const y = h - padding - barHeight;

    // Gradient bar
    const gradient = ctx.createLinearGradient(0, y, 0, h - padding);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#a5b4fc');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
    ctx.fill();

    // Date Label
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(item.date, x + barWidth / 2, h - padding + 18);

    // Revenue value on top of bar
    if (item.revenue > 0) {
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 10px Segoe UI';
      const shortVal = (item.revenue / 1000000).toFixed(1) + 'M';
      ctx.fillText(shortVal, x + barWidth / 2, y - 6);
    }
  }
);
}

// 3. Shop Profile Module
async function loadProfile() {
  const profile = await apiRequest(`${API_BASE}/profile`);
  if (profile) {
    document.getElementById('profile-shop-name').value = profile.shopName || '';
    document.getElementById('profile-shop-slug').value = profile.slug || '';
    document.getElementById('profile-phone').value = profile.phone || '';
    document.getElementById('profile-email').value = profile.email || '';
    document.getElementById('profile-warehouse').value = profile.warehouseAddress || '';
    document.getElementById('profile-bio').value = profile.bio || '';
    document.getElementById('profile-logo-url').value = profile.logoUrl || '';
    document.getElementById('profile-banner-url').value = profile.bannerUrl || '';

    if (profile.bannerUrl) document.getElementById('profile-banner-preview').src = profile.bannerUrl;
    if (profile.logoUrl) document.getElementById('profile-logo-preview').src = profile.logoUrl;

    // Header sync
    document.getElementById('header-shop-name').textContent = profile.shopName;
    if (profile.logoUrl) document.getElementById('header-shop-logo').src = profile.logoUrl;

    const statusPill = document.getElementById('shop-status-display');
    const statusText = document.getElementById('shop-status-text');
    if (profile.isVacationMode) {
      statusPill.className = 'shop-status-pill vacation';
      statusText.textContent = 'Đang Tạm Nghỉ';
    } else {
      statusPill.className = 'shop-status-pill';
      statusText.textContent = 'Đang Mở Cửa';
    }
  }
}

async function saveShopProfile() {
  const data = {
    shopName: document.getElementById('profile-shop-name').value,
    phone: document.getElementById('profile-phone').value,
    email: document.getElementById('profile-email').value,
    warehouseAddress: document.getElementById('profile-warehouse').value,
    bio: document.getElementById('profile-bio').value,
    logoUrl: document.getElementById('profile-logo-url').value,
    bannerUrl: document.getElementById('profile-banner-url').value,
    isVacationMode: false
  };

  const res = await apiRequest(`${API_BASE}/profile`, 'PUT', data);
  if (res) {
    showToast('Đã lưu thông tin gian hàng thành công!', 'success');
    loadProfile();
  }
}

// 4. Products List Module
async function loadProducts() {
  const search = document.getElementById('prod-filter-search')?.value || '';
  const categoryId = document.getElementById('prod-filter-cat')?.value || '0';
  const status = document.getElementById('prod-filter-status')?.value || 'ALL';

  const list = await apiRequest(`${API_BASE}/products?search=${encodeURIComponent(search)}&categoryId=${categoryId}&status=${status}`);
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">Không tìm thấy sản phẩm nào.</td></tr>`;
    return;
  }

  list.forEach(p => {
    const tr = document.createElement('tr');
    const imgUrl = p.primaryImageUrl || 'img/fashion_mood_board.jpg';
    const statusBadge = p.status === 'ACTIVE' ? '<span class="badge badge-success">Đang Bán</span>' : '<span class="badge badge-secondary">Tạm Ẩn</span>';

    tr.innerHTML = `
      <td><img src="${imgUrl}" class="product-thumb" alt="${p.name}"></td>
      <td>
        <div style="font-weight:600; color:var(--text-main);">${p.name}</div>
        <div style="font-size:11.5px; color:var(--text-muted);">SKU count: ${p.variantCount} biến thể</div>
      </td>
      <td>${p.categoryName || '-'}</td>
      <td>${p.brandName || '-'}</td>
      <td style="font-weight:700; color:#4f46e5;">${formatVND(p.basePrice)}</td>
      <td>
        <span style="font-weight:600; ${p.totalStock <= 5 ? 'color:#ef4444;' : ''}">${p.totalStock}</span> chiếc
      </td>
      <td>${statusBadge}</td>
      <td style="text-align:right;">
        <button class="btn btn-sm btn-secondary" onclick="editProduct(${p.id})">Sửa</button>
        <button class="btn btn-sm btn-secondary" onclick="toggleProductStatus(${p.id})">${p.status === 'ACTIVE' ? 'Ẩn' : 'Bật'}</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function toggleProductStatus(id) {
  const res = await apiRequest(`${API_BASE}/products/${id}/status`, 'PATCH');
  if (res) {
    showToast('Đã đổi trạng thái sản phẩm', 'success');
    loadProducts();
  }
}

async function deleteProduct(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi gian hàng?')) return;
  const res = await apiRequest(`${API_BASE}/products/${id}`, 'DELETE');
  if (res) {
    showToast('Đã xóa sản phẩm thành công', 'success');
    loadProducts();
  }
}
// 5, 6. Add & Edit Product
async function initAddProduct() {
  document.getElementById('edit-product-id').value = '0';
  document.getElementById('add-product-title').textContent = 'Đăng Sản Phẩm Mới Vào Gian Hàng';
  document.getElementById('prod-form-name').value = '';
  document.getElementById('prod-form-price').value = '';
  document.getElementById('prod-form-desc').value = '';
  document.getElementById('prod-form-images').value = 'img/Balenciaga_Track_4_0_570391_W2GN7_2009.jpg';
  document.getElementById('variants-table-body').innerHTML = '';

  // Populate Categories & Brands
  await ensureMasterData();

  // Add default variant row
  addVariantRow('BLC-01', '40', 'Đen Than', 1500000, 10);
  addVariantRow('BLC-02', '41', 'Đen Than', 1500000, 10);
}

function addVariantRow(sku = '', size = 'FREE', color = 'Default', price = '', stock = 10) {
  const tbody = document.getElementById('variants-table-body');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" class="form-control var-sku" value="${sku}" placeholder="SKU-XXX" style="padding:6px 8px; font-size:12px;"></td>
    <td><input type="text" class="form-control var-size" value="${size}" placeholder="Size" style="padding:6px 8px; width:70px; font-size:12px;"></td>
    <td><input type="text" class="form-control var-color" value="${color}" placeholder="Màu" style="padding:6px 8px; width:90px; font-size:12px;"></td>
    <td><input type="number" class="form-control var-price" value="${price}" placeholder="Giá" style="padding:6px 8px; width:110px; font-size:12px;"></td>
    <td><input type="number" class="form-control var-stock" value="${stock}" placeholder="SL" style="padding:6px 8px; width:70px; font-size:12px;"></td>
    <td><button type="button" class="btn btn-sm btn-danger" onclick="this.closest('tr').remove()">&times;</button></td>
  `;
  tbody.appendChild(tr);
}

async function editProduct(id) {
  const p = await apiRequest(`${API_BASE}/products/${id}`);
  if (!p) return;

  await ensureMasterData();

  document.getElementById('edit-product-id').value = p.id;
  document.getElementById('add-product-title').textContent = `Chỉnh Sửa Sản Phẩm: ${p.name}`;
  document.getElementById('prod-form-name').value = p.name;
  document.getElementById('prod-form-category').value = p.categoryId;
  if (p.brandId) document.getElementById('prod-form-brand').value = p.brandId;
  document.getElementById('prod-form-price').value = p.basePrice;
  document.getElementById('prod-form-desc').value = p.description || '';
  document.getElementById('prod-form-images').value = p.imageUrls.join(', ');

  const tbody = document.getElementById('variants-table-body');
  tbody.innerHTML = '';
  if (p.variants && p.variants.length > 0) {
    p.variants.forEach(v => addVariantRow(v.sku, v.size, v.color, v.price, v.stockQuantity));
  } else {
    addVariantRow('', 'FREE', 'Default', p.basePrice, 10);
  }

  switchView('add-product');
}

async function saveProductForm() {
  const id = parseInt(document.getElementById('edit-product-id').value);
  const name = document.getElementById('prod-form-name').value.trim();
  const categoryId = parseInt(document.getElementById('prod-form-category').value);
  const brandId = parseInt(document.getElementById('prod-form-brand').value) || null;
  const basePrice = parseFloat(document.getElementById('prod-form-price').value) || 0;
  const description = document.getElementById('prod-form-desc').value;

  if (!name || !categoryId || basePrice <= 0) {
    showToast('Vui lòng điền đầy đủ Tên, Danh mục và Giá bán hợp lệ.', 'error');
    return;
  }

  // Parse images
  const imagesRaw = document.getElementById('prod-form-images').value;
  const images = imagesRaw.split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);

  // Parse variants
  const variants = [];
  document.querySelectorAll('#variants-table-body tr').forEach(tr => {
    variants.push({
      sku: tr.querySelector('.var-sku').value.trim(),
      size: tr.querySelector('.var-size').value.trim() || 'FREE',
      color: tr.querySelector('.var-color').value.trim() || 'Default',
      price: parseFloat(tr.querySelector('.var-price').value) || basePrice,
      stockQuantity: parseInt(tr.querySelector('.var-stock').value) || 0
    });
  });

  const payload = {
    name,
    categoryId,
    brandId,
    basePrice,
    description,
    images,
    variants,
    status: 'ACTIVE'
  };

  let res;
  if (id > 0) {
    res = await apiRequest(`${API_BASE}/products/${id}`, 'PUT', payload);
  } else {
    res = await apiRequest(`${API_BASE}/products`, 'POST', payload);
  }

  if (res) {
    showToast(id > 0 ? 'Đã cập nhật sản phẩm thành công!' : 'Đã đăng bán sản phẩm mới thành công!', 'success');
    switchView('products');
  }
}

// AI Copywriter Modal & Integration
function openAiGeneratorModal() {
  const name = document.getElementById('prod-form-name').value.trim();
  if (!name) {
    showToast('Vui lòng nhập Tên sản phẩm trước để AI có cơ sở viết bài!', 'error');
    return;
  }
  document.getElementById('ai-product-name').value = name;
  document.getElementById('ai-result-area').style.display = 'none';
  openModal('modal-ai-generator');
}

async function generateAiCopy() {
  const productName = document.getElementById('ai-product-name').value;
  const tone = document.getElementById('ai-tone').value;
  const material = document.getElementById('ai-material').value;

  const btn = event.target;
  btn.disabled = true;
  btn.textContent = '⏳ AI Đang Suy Nghĩ & Viết Mô Tả...';

  const res = await apiRequest(`${API_BASE}/ai/generate-description`, 'POST', {
    productName,
    tone,
    material,
    category: 'Thời trang nam nữ cao cấp'
  });

  btn.disabled = false;
  btn.textContent = '✨ Bắt Đầu Sinh Mô Tả Bằng AI';

  if (res && res.generatedDescription) {
    document.getElementById('ai-result-text').value = res.generatedDescription;
    document.getElementById('ai-result-area').style.display = 'block';
    showToast('AI đã hoàn thành bản thảo mô tả sản phẩm!', 'success');
  }
}

function applyAiCopy() {
  const copy = document.getElementById('ai-result-text').value;
  document.getElementById('prod-form-desc').value = copy;
  closeModal('modal-ai-generator');
  showToast('Đã chèn nội dung AI vào bài đăng!', 'success');
}

// 7. Inventory Module
async function loadInventory(lowStockOnly = false) {
  const list = await apiRequest(`${API_BASE}/inventory?lowStockOnly=${lowStockOnly}`);
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">Kho hàng đang an toàn, không có mặt hàng nào sắp hết.</td></tr>`;
    return;
  }

  list.forEach(item => {
    const tr = document.createElement('tr');
    const statusBadge = item.status === 'IN_STOCK' ? '<span class="badge badge-success">Đủ Hàng</span>' : (item.status === 'LOW_STOCK' ? '<span class="badge badge-danger">Sắp Hết Hàng</span>' : '<span class="badge badge-secondary">Hết Hàng</span>');

    tr.innerHTML = `
      <td><img src="${item.primaryImageUrl || 'img/fashion_mood_board.jpg'}" class="product-thumb"></td>
      <td style="font-weight:600;">${item.productName}</td>
      <td style="font-weight:700; font-size:15px;">${item.totalQuantity}</td>
      <td style="color:var(--text-muted);">${item.reservedQuantity}</td>
      <td style="color:#10b981; font-weight:700;">${item.availableQuantity}</td>
      <td style="color:var(--text-muted);">&le; ${item.lowStockThreshold}</td>
      <td>${statusBadge}</td>
      <td>
        <div style="display:flex; gap:6px; align-items:center;">
          <input type="number" class="form-control" style="width:80px; padding:4px 8px; font-size:12.5px;" value="${item.totalQuantity}" id="stock-input-${item.productId}">
          <button class="btn btn-sm btn-primary" onclick="quickUpdateStock(${item.productId})">Lưu</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function quickUpdateStock(productId) {
  const input = document.getElementById(`stock-input-${productId}`);
  const newQty = parseInt(input.value) || 0;
  const res = await apiRequest(`${API_BASE}/inventory/quick-update`, 'PATCH', {
    productId,
    newQuantity: newQty
  });
  if (res) {
    showToast('Đã cập nhật số lượng tồn kho thành công!', 'success');
    loadInventory();
  }
}

// 8, 9. Orders Module & Detail Modal
async function loadOrders(status = 'ALL') {
  const list = await apiRequest(`${API_BASE}/orders?status=${status}`);
  currentOrderList = list || [];
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">Không có đơn hàng nào trong mục này.</td></tr>`;
    return;
  }

  list.forEach(o => {
    const tr = document.createElement('tr');
    let badgeClass = 'badge-info';
    let statusText = o.status;
    if (o.status === 'PENDING') { badgeClass = 'badge-warning'; statusText = 'Chờ Xác Nhận'; }
    else if (o.status === 'CONFIRMED') { badgeClass = 'badge-info'; statusText = 'Đã Xác Nhận'; }
    else if (o.status === 'SHIPPING') { badgeClass = 'badge-info'; statusText = 'Đang Giao'; }
    else if (o.status === 'COMPLETED') { badgeClass = 'badge-success'; statusText = 'Hoàn Thành'; }
    else if (o.status === 'CANCELLED') { badgeClass = 'badge-danger'; statusText = 'Đã Hủy'; }

    tr.innerHTML = `
      <td style="font-weight:700; color:#4f46e5;">#${o.orderCode}</td>
      <td style="font-weight:600;">${o.customerName}</td>
      <td>${o.customerPhone}</td>
      <td>${o.itemCount} món</td>
      <td style="font-weight:700;">${formatVND(o.totalAmount)}</td>
      <td><span class="badge ${o.paymentStatus === 'PAID' ? 'badge-success' : 'badge-warning'}">${o.paymentStatus}</span></td>
      <td><span class="badge ${badgeClass}">${statusText}</span></td>
      <td><span style="font-family:monospace; font-size:12px;">${o.shippingTrackingCode || '-'}</span></td>
      <td style="text-align:right;">
        <button class="btn btn-sm btn-primary" onclick="viewOrderDetail(${o.id})">Chi Tiết &amp; Xử Lý</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterOrders(status, btnElement = null) {
  if (btnElement) {
    document.querySelectorAll('.tabs-nav .tab-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }
  loadOrders(status);
}

async function viewOrderDetail(id) {
  const o = await apiRequest(`${API_BASE}/orders/${id}`);
  if (!o) return;

  document.getElementById('modal-order-title').textContent = `Chi Tiết Đơn Hàng #${o.orderCode}`;

  let itemsHtml = o.items.map(item => `
    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-color); font-size:13px;">
      <div>
        <div style="font-weight:600;">${item.productName}</div>
        <div style="font-size:11.5px; color:var(--text-muted);">Phân loại: Size ${item.size} - Màu ${item.color} x ${item.quantity} chiếc</div>
      </div>
      <div style="font-weight:700;">${formatVND(item.subtotal)}</div>
    </div>
  `).join('');

  document.getElementById('modal-order-content').innerHTML = `
    <div style="margin-bottom:16px; padding:12px; background:#f8fafc; border-radius:8px; border:1px solid var(--border-color);">
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span style="font-weight:600;">Người nhận: ${o.customerName} (${o.customerPhone})</span>
        <span class="badge badge-info">${o.status}</span>
      </div>
      <div style="font-size:13px; color:var(--text-muted);">Địa chỉ giao hàng: ${o.shippingAddress}</div>
      ${o.note ? `<div style="font-size:12.5px; color:#d97706; margin-top:4px;">Ghi chú: "${o.note}"</div>` : ''}
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-weight:700; margin-bottom:8px; font-size:14px;">Mặt Hàng Đã Đặt:</div>
      ${itemsHtml}
    </div>

    <div style="display:flex; justify-content:space-between; font-size:13.5px; margin-bottom:4px;">
      <span>Tạm tính hàng hóa:</span>
      <span>${formatVND(o.subtotal)}</span>
    </div>
    <div style="display:flex; justify-content:space-between; font-size:13.5px; margin-bottom:4px; color:#10b981;">
      <span>Mã giảm giá (Shop Voucher):</span>
      <span>-${formatVND(o.discount)}</span>
    </div>
    <div style="display:flex; justify-content:space-between; font-size:13.5px; margin-bottom:8px;">
      <span>Phí vận chuyển:</span>
      <span>+${formatVND(o.shippingFee)}</span>
    </div>
    <div style="display:flex; justify-content:space-between; font-size:16px; font-weight:800; padding-top:8px; border-top:2px dashed var(--border-color); color:#4f46e5;">
      <span>TỔNG TIỀN THANH TOÁN:</span>
      <span>${formatVND(o.totalAmount)}</span>
    </div>
  `;

  // Action buttons depending on state
  const actionsDiv = document.getElementById('modal-order-actions');
  actionsDiv.innerHTML = '';

  if (o.status === 'PENDING') {
    actionsDiv.innerHTML = `
      <button class="btn btn-danger" onclick="advanceOrderStatus(${o.id}, 'CANCELLED')">Hủy Đơn</button>
      <button class="btn btn-primary" onclick="advanceOrderStatus(${o.id}, 'CONFIRMED')">✅ Xác Nhận Đơn Hàng</button>
    `;
  } else if (o.status === 'CONFIRMED') {
    actionsDiv.innerHTML = `
      <button class="btn btn-primary" onclick="advanceOrderStatus(${o.id}, 'SHIPPING')">🚚 Giao Cho Đơn Vị Vận Chuyển</button>
    `;
  } else if (o.status === 'SHIPPING') {
    actionsDiv.innerHTML = `
      <button class="btn btn-primary" onclick="advanceOrderStatus(${o.id}, 'COMPLETED')">🎉 Khách Đã Nhận (Hoàn Thành)</button>
    `;
  } else {
    actionsDiv.innerHTML = `<button class="btn btn-secondary" onclick="closeModal('modal-order-detail')">Đóng</button>`;
  }

  openModal('modal-order-detail');
}

async function advanceOrderStatus(orderId, nextStatus) {
  const trackingCode = `VN-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
  const res = await apiRequest(`${API_BASE}/orders/${orderId}/status`, 'PUT', {
    status: nextStatus,
    shippingTrackingCode: trackingCode,
    shippingCarrier: 'Giao Hàng Nhanh (GHN)'
  });

  if (res) {
    showToast(`Đã chuyển trạng thái đơn hàng sang: ${nextStatus}`, 'success');
    closeModal('modal-order-detail');
    loadOrders();
    loadDashboard();
  }
}

// 10. Shipping Module
async function loadShipping() {
  const channels = await apiRequest(`${API_BASE}/shipping/channels`);
  const container = document.getElementById('shipping-channels-grid');
  if (!container) return;
  container.innerHTML = '';

  channels.forEach(ch => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:15px; font-weight:700;">${ch.name}</div>
          <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">Thời gian dự kiến: <b>${ch.estimatedDays}</b></div>
          <div style="font-size:13px; color:#4f46e5; font-weight:600; margin-top:4px;">Cước cơ bản: ${formatVND(ch.cost)}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" id="ch-${ch.id}" ${ch.isEnabled ? 'checked' : ''} onchange="toggleShipping(${ch.id})" style="width:20px; height:20px; cursor:pointer;">
          <label for="ch-${ch.id}" style="font-size:13px; font-weight:600; cursor:pointer;">${ch.isEnabled ? 'Đang Bật' : 'Đã Tắt'}</label>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

async function toggleShipping(id) {
  const res = await apiRequest(`${API_BASE}/shipping/channels/${id}/toggle`, 'POST');
  if (res) {
    showToast('Đã cập nhật trạng thái kênh vận chuyển', 'success');
    loadShipping();
  }
}

// 11. Promotion Module
async function loadPromotions() {
  const list = await apiRequest(`${API_BASE}/promotions`);
  const tbody = document.getElementById('promotions-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!list || list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">Chưa có mã khuyến mãi nào được tạo.</td></tr>`;
    return;
  }

  list.forEach(p => {
    const tr = document.createElement('tr');
    const discountStr = p.discountType === 'PERCENT' ? `Giảm ${p.discountValue}%` : `Giảm ${formatVND(p.discountValue)}`;

    tr.innerHTML = `
      <td style="font-weight:700; color:#ec4899; font-family:monospace; font-size:14px;">${p.voucherCode}</td>
      <td style="font-weight:600;">${p.title}</td>
      <td style="font-weight:700; color:#4f46e5;">${discountStr}</td>
      <td>${formatVND(p.minOrderValue)}</td>
      <td>${p.usedCount} / ${p.usageLimit}</td>
      <td style="font-size:12.5px;">${formatDate(p.endDate)}</td>
      <td><span class="badge ${p.isActive ? 'badge-success' : 'badge-secondary'}">${p.isActive ? 'Hoạt Động' : 'Hết Hạn'}</span></td>
      <td style="text-align:right;">
        <button class="btn btn-sm btn-danger" onclick="deletePromo(${p.id})">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openCreatePromoModal() {
  openModal('modal-create-promo');
}

async function handleCreatePromo(e) {
  e.preventDefault();
  const data = {
    voucherCode: document.getElementById('promo-code').value,
    title: document.getElementById('promo-title').value,
    discountType: document.getElementById('promo-type').value,
    discountValue: parseFloat(document.getElementById('promo-value').value),
    minOrderValue: parseFloat(document.getElementById('promo-min-order').value) || 0,
    usageLimit: parseInt(document.getElementById('promo-limit').value) || 100
  };

  const res = await apiRequest(`${API_BASE}/promotions`, 'POST', data);
  if (res) {
    showToast('Tạo voucher khuyến mãi thành công!', 'success');
    closeModal('modal-create-promo');
    loadPromotions();
  }
}

async function deletePromo(id) {
  if (!confirm('Xác nhận xóa mã khuyến mãi này?')) return;
  const res = await apiRequest(`${API_BASE}/promotions/${id}`, 'DELETE');
  if (res) {
    showToast('Đã xóa mã khuyến mãi', 'success');
    loadPromotions();
  }
}

// 12. Finance & Wallet Module
async function loadFinance() {
  const wallet = await apiRequest(`${API_BASE}/finance/wallet`);
  if (!wallet) return;

  document.getElementById('wallet-available-balance').textContent = formatVND(wallet.availableBalance);
  document.getElementById('wallet-pending-balance').textContent = formatVND(wallet.pendingBalance);

  if (wallet.bankName) {
    document.getElementById('wallet-bank-info').textContent = wallet.bankName;
    document.getElementById('bank-card-name').textContent = wallet.bankAccountName || 'CHỦ TÀI KHOẢN';
    document.getElementById('bank-card-details').textContent = `${wallet.bankName} - ${wallet.bankAccountNumber}`;
  }

  const tbody = document.getElementById('transactions-table-body');
  tbody.innerHTML = '';

  if (!wallet.transactions || wallet.transactions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">Chưa có lịch sử giao dịch.</td></tr>`;
    return;
  }

  wallet.transactions.forEach(t => {
    const tr = document.createElement('tr');
    const isIncome = t.type === 'SETTLEMENT';
    const amountStr = isIncome ? `+${formatVND(t.amount)}` : `-${formatVND(t.amount)}`;
    const color = isIncome ? '#10b981' : '#ef4444';

    tr.innerHTML = `
      <td style="font-family:monospace; font-size:12px;">#GD-${t.id}</td>
      <td><span class="badge ${isIncome ? 'badge-success' : 'badge-danger'}">${isIncome ? 'Quyết Toán Đơn' : 'Rút Tiền Về TK'}</span></td>
      <td style="font-weight:700; color:${color};">${amountStr}</td>
      <td style="font-size:13px;">${t.note || '-'}</td>
      <td><span class="badge badge-success">${t.status}</span></td>
      <td style="font-size:12px; color:var(--text-muted);">${formatDate(t.createdAt)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openWithdrawModal() {
  openModal('modal-withdraw');
}

async function handleWithdraw(e) {
  e.preventDefault();
  const data = {
    amount: parseFloat(document.getElementById('withdraw-amount').value),
    bankName: document.getElementById('withdraw-bank').value,
    bankAccountNumber: document.getElementById('withdraw-acc-num').value,
    bankAccountName: document.getElementById('withdraw-acc-name').value
  };

  const res = await apiRequest(`${API_BASE}/finance/withdraw`, 'POST', data);
  if (res) {
    showToast('Lệnh rút tiền đã được thực hiện thành công!', 'success');
    closeModal('modal-withdraw');
    loadFinance();
  }
}

// 13. Analytics Module
async function loadAnalytics() {
  const data = await apiRequest(`${API_BASE}/analytics/overview`);
  if (!data) return;

  document.getElementById('analytics-revenue').textContent = formatVND(data.totalRevenue);
  document.getElementById('analytics-orders').textContent = data.totalOrders;
  document.getElementById('analytics-views').textContent = data.totalViews;
  document.getElementById('analytics-conversion').textContent = `${data.conversionRate}%`;

  const tbody = document.getElementById('top-products-table-body');
  tbody.innerHTML = '';

  data.topProducts.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.imageUrl || 'img/fashion_mood_board.jpg'}" class="product-thumb"></td>
      <td>
        <div style="font-weight:600;">${idx + 1}. ${p.productName}</div>
      </td>
      <td style="font-weight:700; color:#4f46e5;">${p.unitsSold} đã bán</td>
      <td style="font-weight:700;">${formatVND(p.totalRevenue)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 14. Reviews Module
async function loadReviews() {
  const reviews = await apiRequest(`${API_BASE}/reviews`);
  const container = document.getElementById('reviews-list-container');
  if (!container) return;
  container.innerHTML = '';

  if (!reviews || reviews.length === 0) {
    container.innerHTML = `<div class="card" style="text-align:center; padding:30px; color:var(--text-muted);">Chưa có đánh giá nào từ người mua.</div>`;
    return;
  }

  reviews.forEach(r => {
    const stars = '⭐'.repeat(r.rating);
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
        <div>
          <div style="font-weight:700; font-size:14.5px;">${r.customerName} <span style="font-size:12px; color:var(--text-muted); font-weight:normal;">- Đã mua: <b>${r.productName}</b></span></div>
          <div style="font-size:13px; color:#f59e0b; margin-top:2px;">${stars} (${r.rating}/5 sao)</div>
        </div>
        <div style="font-size:12px; color:var(--text-muted);">${formatDate(r.createdAt)}</div>
      </div>
      <p style="font-size:13.5px; line-height:1.5; margin-bottom:14px; color:var(--text-main);">"${r.comment}"</p>

      ${r.sellerReply ? `
        <div style="padding:10px 14px; background:#f1f5f9; border-left:3px solid var(--primary-accent); border-radius:4px; font-size:13px;">
          <b style="color:var(--primary-accent);">Phản hồi từ người bán:</b> ${r.sellerReply}
        </div>
      ` : `
        <div style="display:flex; gap:10px;">
          <input type="text" id="reply-input-${r.id}" class="form-control" placeholder="Viết câu trả lời cảm ơn hoặc giải đáp cho khách hàng..." style="font-size:13px;">
          <button class="btn btn-sm btn-primary" onclick="submitReply(${r.id})">Gửi Phản Hồi</button>
        </div>
      `}
    `;
    container.appendChild(div);
  });
}

async function submitReply(reviewId) {
  const input = document.getElementById(`reply-input-${reviewId}`);
  const reply = input?.value.trim();
  if (!reply) return;

  const res = await apiRequest(`${API_BASE}/reviews/${reviewId}/reply`, 'POST', { reply });
  if (res) {
    showToast('Đã gửi phản hồi đánh giá thành công!', 'success');
    loadReviews();
  }
}

// 15. Settings Module
async function loadSettings() {
  const s = await apiRequest(`${API_BASE}/settings`);
  if (s) {
    document.getElementById('setting-vacation-mode').checked = s.isVacationMode;
  }
}

async function saveSettings() {
  const isVacationMode = document.getElementById('setting-vacation-mode').checked;
  const res = await apiRequest(`${API_BASE}/settings`, 'PUT', { isVacationMode });
  if (res) {
    showToast('Cập nhật cài đặt thành công!', 'success');
    loadProfile();
  }
}

async function handleChangePassword(e) {
  e.preventDefault();
  const currentPassword = document.getElementById('pw-current').value;
  const newPassword = document.getElementById('pw-new').value;

  const res = await apiRequest(`${API_BASE}/settings/change-password`, 'POST', { currentPassword, newPassword });
  if (res) {
    showToast('Đổi mật khẩu tài khoản thành công!', 'success');
    document.getElementById('pw-current').value = '';
    document.getElementById('pw-new').value = '';
  }
}

// Master Data (Categories & Brands)
async function ensureMasterData() {
  if (categoriesList.length === 0) {
    categoriesList = await apiRequest(`${API_BASE}/categories`) || [];
    const sel = document.getElementById('prod-form-category');
    const filterSel = document.getElementById('prod-filter-cat');
    if (sel) sel.innerHTML = categoriesList.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    if (filterSel) filterSel.innerHTML = '<option value="0">Tất cả danh mục</option>' + categoriesList.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  }

  if (brandsList.length === 0) {
    brandsList = await apiRequest(`${API_BASE}/brands`) || [];
    const sel = document.getElementById('prod-form-brand');
    if (sel) sel.innerHTML = brandsList.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
  }
}

// Startup Init
window.addEventListener('DOMContentLoaded', async () => {
  await ensureMasterData();
  loadProfile();
  loadDashboard();
});
