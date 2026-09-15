/**
 * AETHELGARD / DM FASHION MALL — SELLER CENTER CONTROLLER (JS)
 * Modules 1-15 Implementation
 */

const API_BASE = "/api/seller";
let currentShop = null;
let currentProducts = [];
let currentOrders = [];
let currentReviews = [];
let generatedAICopy = null;

// ==================== 1. TAB NAVIGATION ====================
function switchTab(tabId) {
  // Update sidebar nav items
  document.querySelectorAll(".seller-nav .nav-item").forEach(item => {
    if (item.dataset.tab === tabId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update tab panes
  document.querySelectorAll(".tab-pane").forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });

  // Update page header title
  const titles = {
    "tab-dashboard": "Tổng Quan Doanh Nghiệp (Dashboard)",
    "tab-profile": "Hồ Sơ Thương Hiệu (Shop Profile)",
    "tab-products": "Danh Sách Sản Phẩm (Product Catalog)",
    "tab-add-product": "Thêm Sản Phẩm Mới (AI Fashion Studio)",
    "tab-inventory": "Quản Lý Kho Hàng & Tồn Kho (Inventory)",
    "tab-orders": "Quản Lý Đơn Hàng (Order Center)",
    "tab-shipping": "Kênh Vận Chuyển Tích Hợp (Logistics)",
    "tab-promotions": "Chương Trình Khuyến Mãi & Voucher",
    "tab-finance": "Ví & Doanh Thu Người Bán (Finance)",
    "tab-analytics": "Báo Cáo & Phân Tích Kinh Doanh (Analytics)",
    "tab-reviews": "Đánh Giá & Phản Hồi Của Khách (Reviews)",
    "tab-settings": "Cài Đặt Cửa Hàng & Bảo Mật (Settings)"
  };
  const titleElem = document.getElementById("pageTitle");
  if (titleElem && titles[tabId]) {
    titleElem.textContent = titles[tabId];
  }

  // Auto-refresh data when switching to a tab
  if (tabId === "tab-dashboard") loadDashboardData();
  if (tabId === "tab-profile") loadShopProfile();
  if (tabId === "tab-products") loadProducts();
  if (tabId === "tab-inventory") loadInventory();
  if (tabId === "tab-orders") loadOrders();
  if (tabId === "tab-shipping") loadShipping();
  if (tabId === "tab-promotions") loadPromotions();
  if (tabId === "tab-finance") loadWallet();
  if (tabId === "tab-analytics") loadAnalytics();
  if (tabId === "tab-reviews") loadReviews();
}

window.switchTab = switchTab;

// Modal Helpers
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add("active");
}
function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("active");
}
window.openModal = openModal;
window.closeModal = closeModal;

// Format Currency
function formatVND(amount) {
  return Number(amount || 0).toLocaleString("vi-VN") + " đ";
}

// ==================== 2. MODULE: DASHBOARD ====================
async function loadDashboardData() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    const json = await res.json();
    if (!json.success) return;

    const data = json.data;
    document.getElementById("statTotalRevenue").textContent = formatVND(data.totalRevenue);
    document.getElementById("statTotalOrders").textContent = data.totalOrders;
    document.getElementById("statPendingOrders").textContent = data.pendingOrders;
    document.getElementById("statLowStock").textContent = data.lowStockCount;
    document.getElementById("badgeOrdersPending").textContent = data.pendingOrders;

    renderRecentOrders(data.recentOrders);
  } catch (err) {
    console.error("Lỗi tải dashboard:", err);
  }
}

function renderRecentOrders(orders) {
  const tbody = document.getElementById("dashRecentOrdersTable");
  if (!tbody) return;

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#64748B;">Chưa có đơn hàng nào phát sinh.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td style="font-weight:700; color:#0F172A;">#${o.order_code}</td>
      <td><strong>${o.customer_name}</strong><br><small style="color:#64748B;">${o.customer_phone}</small></td>
      <td>${o.item_count} sản phẩm</td>
      <td style="font-weight:700; color:#0F172A;">${formatVND(o.total_amount)}</td>
      <td><span class="badge-status ${o.status.toLowerCase()}">${getStatusBadgeLabel(o.status)}</span></td>
      <td style="color:#64748B; font-size:12.5px;">${o.created_at.slice(0, 16)}</td>
      <td>
        <button class="btn-storefront" style="padding:4px 10px; font-size:12px;" onclick="viewOrderDetail(${o.id})">Chi tiết</button>
      </td>
    </tr>
  `).join("");
}

function getStatusBadgeLabel(status) {
  const map = {
    "PENDING": "Chờ xác nhận",
    "CONFIRMED": "Đã xác nhận",
    "SHIPPING": "Đang giao",
    "COMPLETED": "Hoàn tất",
    "CANCELLED": "Đã hủy"
  };
  return map[status] || status;
}

// ==================== 3. MODULE: SHOP PROFILE ====================
async function loadShopProfile() {
  try {
    const res = await fetch(`${API_BASE}/shop`);
    const json = await res.json();
    if (!json.success) return;

    currentShop = json.data;
    // Update floating hero preview
    document.getElementById("dashShopName").textContent = currentShop.shop_name;
    document.getElementById("dashShopBio").textContent = currentShop.bio || "";
    document.getElementById("dashRating").textContent = `${currentShop.rating} ★`;
    if (currentShop.logo_url) {
      document.getElementById("dashLogo").src = currentShop.logo_url;
      document.getElementById("sidebarAvatar").src = currentShop.logo_url;
    }
    if (currentShop.banner_url) {
      document.getElementById("dashBanner").src = currentShop.banner_url;
    }

    // Fill form
    document.getElementById("profileShopName").value = currentShop.shop_name || "";
    document.getElementById("profileSlug").value = currentShop.slug || "";
    document.getElementById("profilePhone").value = currentShop.phone || "";
    document.getElementById("profileEmail").value = currentShop.email || "";
    document.getElementById("profileWarehouse").value = currentShop.warehouse_address || "";
    document.getElementById("profileBio").value = currentShop.bio || "";
    document.getElementById("profileLogoUrl").value = currentShop.logo_url || "";
    document.getElementById("profileBannerUrl").value = currentShop.banner_url || "";
    document.getElementById("profileVacationMode").checked = Boolean(currentShop.is_vacation_mode);
  } catch (err) {
    console.error("Lỗi tải thông tin shop:", err);
  }
}

// ==================== 4. MODULE: PRODUCT LIST ====================
async function loadProducts() {
  try {
    const search = document.getElementById("filterProductSearch")?.value || "";
    const cat = document.getElementById("filterProductCategory")?.value || "";
    const url = new URL(`${window.location.origin}${API_BASE}/products`);
    if (search) url.searchParams.set("search", search);
    if (cat) url.searchParams.set("categoryId", cat);

    const res = await fetch(url.toString());
    const json = await res.json();
    if (!json.success) return;

    currentProducts = json.data;
    document.getElementById("badgeProductsCount").textContent = currentProducts.length;
    document.getElementById("dashTotalProducts").textContent = currentProducts.length;

    renderProductTable(currentProducts);
  } catch (err) {
    console.error("Lỗi tải danh sách sản phẩm:", err);
  }
}

function renderProductTable(products) {
  const tbody = document.getElementById("sellerProductTableBody");
  if (!tbody) return;

  if (!products || products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#64748B;">Không tìm thấy sản phẩm nào.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => `
    <tr>
      <td>
        <div class="table-product-cell">
          <img src="${p.image_url || 'img/fashion mood board.jpg'}" class="table-product-thumb" alt="${p.name}">
          <div class="table-product-meta">
            <h4>${p.name}</h4>
            <span>Mã SP: #${p.id} ${p.is_featured ? '• <strong style="color:#D4AF37;">★ Featured</strong>' : ''}</span>
          </div>
        </div>
      </td>
      <td>${p.category_name || "Thời Trang"}</td>
      <td><strong>${p.brand_name || "Aethelgard"}</strong></td>
      <td style="font-weight:700; color:#0F172A;">${formatVND(p.base_price)}</td>
      <td>
        <strong>${p.total_stock}</strong> cái
        ${p.total_stock <= 5 ? '<br><small style="color:#EF4444; font-weight:600;">(Tồn thấp)</small>' : ''}
      </td>
      <td><span class="badge-status ${p.status.toLowerCase()}">${p.status}</span></td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="btn-storefront" style="padding:4px 10px; font-size:12px;" onclick="quickEditStock(${p.id}, '${p.name.replace(/'/g, "\\'")}', ${p.total_stock})">📦 Kho</button>
          <button class="btn-storefront" style="padding:4px 10px; font-size:12px; color:#EF4444;" onclick="deleteProduct(${p.id})">Xóa</button>
        </div>
      </td>
    </tr>
  `).join("");
}

async function deleteProduct(id) {
  if (!confirm("Bạn có chắc chắn muốn chuyển sản phẩm này vào mục lưu trữ (Archived)?")) return;
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      alert("Đã lưu trữ sản phẩm!");
      loadProducts();
    }
  } catch (err) {
    alert("Lỗi khi xóa sản phẩm.");
  }
}
window.deleteProduct = deleteProduct;

// ==================== 5. MODULE: ADD PRODUCT WITH AI ====================
async function triggerAICopywriter() {
  const name = document.getElementById("newProdName").value.trim();
  const brandElem = document.getElementById("newProdBrand");
  const brandName = brandElem.options[brandElem.selectedIndex].text;
  const categoryElem = document.getElementById("newProdCategory");
  const categoryName = categoryElem.options[categoryElem.selectedIndex].text;

  if (!name) {
    alert("Vui lòng nhập Tên Sản Phẩm Thời Trang trước để AI viết bài chính xác!");
    document.getElementById("newProdName").focus();
    return;
  }

  const btn = document.getElementById("btnTriggerAICopywriter");
  const origText = btn.innerHTML;
  btn.innerHTML = `<span>⏳</span><span>AI Đang Soạn Thảo...</span>`;
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/ai/copywrite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: name,
        category: categoryName,
        brand: brandName,
        tone: "luxury"
      })
    });
    const json = await res.json();
    if (json.success) {
      generatedAICopy = json.data;
      document.getElementById("aiPreviewTitle").textContent = generatedAICopy.title;
      document.getElementById("aiPreviewHighlight").textContent = generatedAICopy.highlight;
      document.getElementById("aiPreviewContent").textContent = 
        `${generatedAICopy.editorialDescription}\n\n${generatedAICopy.materialAndFit}\n\n${generatedAICopy.stylingTips}`;
      
      const tagsBox = document.getElementById("aiPreviewHashtags");
      tagsBox.innerHTML = generatedAICopy.hashtags.map(t => `<span class="topbar-tag">${t}</span>`).join("");
      
      openModal("modalAIResult");
    }
  } catch (err) {
    alert("Không thể kết nối dịch vụ AI.");
  } finally {
    btn.innerHTML = origText;
    btn.disabled = false;
  }
}

// ==================== 7. MODULE: INVENTORY ====================
async function loadInventory() {
  try {
    const res = await fetch(`${API_BASE}/inventory`);
    const json = await res.json();
    if (!json.success) return;

    const tbody = document.getElementById("sellerInventoryTableBody");
    if (!tbody) return;

    tbody.innerHTML = json.data.map(i => `
      <tr>
        <td>
          <div class="table-product-cell">
            <img src="${i.image_url}" class="table-product-thumb" alt="${i.product_name}">
            <div class="table-product-meta">
              <h4>${i.product_name}</h4>
              <span>Mã SP: #${i.product_id}</span>
            </div>
          </div>
        </td>
        <td style="font-weight:700;">${formatVND(i.base_price)}</td>
        <td style="font-size:16px; font-weight:800; color:#0F172A;">${i.quantity}</td>
        <td>${i.reserved_quantity}</td>
        <td>≤ ${i.low_stock_threshold}</td>
        <td><span class="badge-status ${i.status.toLowerCase()}">${i.status}</span></td>
        <td>
          <button class="btn-storefront" style="padding:4px 12px; font-size:12px;" onclick="quickEditStock(${i.product_id}, '${i.product_name.replace(/'/g, "\\'")}', ${i.quantity}, ${i.low_stock_threshold})">Chỉnh Tồn</button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Lỗi tải kho hàng:", err);
  }
}

function quickEditStock(id, name, qty, threshold = 5) {
  document.getElementById("stockProdId").value = id;
  document.getElementById("stockProdName").value = name;
  document.getElementById("stockQty").value = qty;
  document.getElementById("stockThreshold").value = threshold;
  openModal("modalEditStock");
}
window.quickEditStock = quickEditStock;

// ==================== 8 & 9. MODULE: ORDER MANAGEMENT ====================
async function loadOrders(status = "") {
  try {
    const url = new URL(`${window.location.origin}${API_BASE}/orders`);
    if (status) url.searchParams.set("status", status);

    const res = await fetch(url.toString());
    const json = await res.json();
    if (!json.success) return;

    currentOrders = json.data;
    renderOrdersTable(currentOrders);
  } catch (err) {
    console.error("Lỗi tải đơn hàng:", err);
  }
}

function filterOrdersByStatus(status) {
  loadOrders(status);
}
window.filterOrdersByStatus = filterOrdersByStatus;

function renderOrdersTable(orders) {
  const tbody = document.getElementById("sellerOrdersTableBody");
  if (!tbody) return;

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:#64748B;">Không có đơn hàng nào trong trạng thái này.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td style="font-weight:700; color:#0F172A;">#${o.order_code}</td>
      <td><strong>${o.customer_name}</strong></td>
      <td>${o.customer_phone}</td>
      <td style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${o.shipping_address}">${o.shipping_address}</td>
      <td style="font-weight:700; color:#0F172A;">${formatVND(o.total_amount)}</td>
      <td><span class="badge-status ${o.payment_status === 'PAID' ? 'completed' : 'pending'}">${o.payment_status}</span></td>
      <td><span class="badge-status ${o.status.toLowerCase()}">${getStatusBadgeLabel(o.status)}</span></td>
      <td>
        <button class="btn-storefront" style="padding:4px 10px; font-size:12px;" onclick="viewOrderDetail(${o.id})">Xem Chi Tiết</button>
      </td>
    </tr>
  `).join("");
}

async function viewOrderDetail(id) {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    const json = await res.json();
    if (!json.success) return;

    const o = json.data;
    document.getElementById("modalOrderTitle").textContent = `Đơn Hàng #${o.order_code}`;
    
    let itemsHtml = (o.items || []).map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px dashed #E2E8F0;">
        <div>
          <strong style="color:#0F172A;">${item.product_name}</strong>
          <div style="font-size:12.5px; color:#64748B;">Phân loại: ${item.color} | Size: ${item.size} × ${item.quantity} cái</div>
        </div>
        <div style="font-weight:700; color:#0F172A;">${formatVND(item.subtotal)}</div>
      </div>
    `).join("");

    document.getElementById("modalOrderBody").innerHTML = `
      <div style="margin-bottom:18px;">
        <p style="margin:0 0 4px;"><strong>Khách hàng:</strong> ${o.customer_name} — 📞 ${o.customer_phone}</p>
        <p style="margin:0 0 4px;"><strong>Địa chỉ giao:</strong> ${o.shipping_address}</p>
        <p style="margin:0 0 4px;"><strong>Ghi chú:</strong> ${o.note || "Không có"}</p>
        <p style="margin:0;"><strong>Ngày đặt:</strong> ${o.created_at}</p>
      </div>

      <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:14px; margin-bottom:18px;">
        <h4 style="margin:0 0 8px; font-size:14px; text-transform:uppercase; color:#64748B;">Sản Phẩm Trong Đơn</h4>
        ${itemsHtml}
        <div style="display:flex; justify-content:space-between; margin-top:12px; font-weight:800; font-size:16px; color:#0F172A;">
          <span>Tổng Cộng Thanh Toán:</span>
          <span>${formatVND(o.total_amount)}</span>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:10px;">
        <label class="form-label" style="margin:0;">Cập nhật tiến trình đơn:</label>
        <select class="form-select" id="orderStatusSelect" style="width:180px;">
          <option value="PENDING" ${o.status === 'PENDING' ? 'selected' : ''}>Chờ duyệt</option>
          <option value="CONFIRMED" ${o.status === 'CONFIRMED' ? 'selected' : ''}>Đã duyệt</option>
          <option value="SHIPPING" ${o.status === 'SHIPPING' ? 'selected' : ''}>Đang giao hàng</option>
          <option value="COMPLETED" ${o.status === 'COMPLETED' ? 'selected' : ''}>Đã hoàn tất</option>
          <option value="CANCELLED" ${o.status === 'CANCELLED' ? 'selected' : ''}>Hủy đơn</option>
        </select>
        <button class="btn-gold" style="padding:8px 16px;" onclick="updateOrderStatusAction(${o.id})">Lưu Trạng Thái</button>
      </div>
    `;

    openModal("modalOrderDetail");
  } catch (err) {
    alert("Không thể tải chi tiết đơn hàng.");
  }
}
window.viewOrderDetail = viewOrderDetail;

async function updateOrderStatusAction(id) {
  const newStatus = document.getElementById("orderStatusSelect").value;
  try {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    const json = await res.json();
    if (json.success) {
      alert("Cập nhật trạng thái đơn hàng thành công!");
      closeModal("modalOrderDetail");
      loadOrders();
      loadDashboardData();
    }
  } catch (err) {
    alert("Lỗi khi cập nhật trạng thái đơn.");
  }
}
window.updateOrderStatusAction = updateOrderStatusAction;

// ==================== 10. MODULE: SHIPPING ====================
async function loadShipping() {
  try {
    const res = await fetch(`${API_BASE}/shipping`);
    const json = await res.json();
    if (!json.success) return;

    const tbody = document.getElementById("shippingTableBody");
    if (!tbody) return;

    tbody.innerHTML = json.data.map(s => `
      <tr>
        <td style="font-weight:700; color:#0F172A;">${s.name}</td>
        <td><code>${s.code}</code></td>
        <td>${s.estimated_days}</td>
        <td style="font-weight:700;">${formatVND(s.cost)}</td>
        <td>
          <span class="badge-status ${s.is_enabled ? 'active' : 'cancelled'}">
            ${s.is_enabled ? 'Đang Hoạt Động' : 'Đã Tắt'}
          </span>
        </td>
        <td>
          <button class="btn-storefront" style="padding:4px 12px; font-size:12px;" onclick="toggleShippingChannel(${s.id}, ${!s.is_enabled})">
            ${s.is_enabled ? 'Tắt Kênh' : 'Bật Kênh'}
          </button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Lỗi tải kênh vận chuyển:", err);
  }
}

async function toggleShippingChannel(id, enable) {
  try {
    const res = await fetch(`${API_BASE}/shipping/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isEnabled: enable })
    });
    const json = await res.json();
    if (json.success) loadShipping();
  } catch (err) {
    alert("Lỗi khi đổi trạng thái kênh vận chuyển.");
  }
}
window.toggleShippingChannel = toggleShippingChannel;

// ==================== 11. MODULE: PROMOTIONS ====================
async function loadPromotions() {
  try {
    const res = await fetch(`${API_BASE}/promotions`);
    const json = await res.json();
    if (!json.success) return;

    const tbody = document.getElementById("promotionsTableBody");
    if (!tbody) return;

    tbody.innerHTML = json.data.map(p => `
      <tr>
        <td style="font-weight:800; color:#0F172A; letter-spacing:1px;"><code>${p.voucher_code}</code></td>
        <td>${p.title}</td>
        <td>${p.discount_type === 'PERCENT' ? 'Phần trăm (%)' : 'Số tiền cố định'}</td>
        <td style="font-weight:700; color:#059669;">${p.discount_type === 'PERCENT' ? `${p.discount_value}%` : formatVND(p.discount_value)}</td>
        <td>${formatVND(p.min_order_value)}</td>
        <td><strong>${p.used_count}</strong> / ${p.usage_limit}</td>
        <td><span class="badge-status ${p.is_active ? 'active' : 'cancelled'}">${p.is_active ? 'Đang Chạy' : 'Tạm Dừng'}</span></td>
        <td>
          <button class="btn-storefront" style="padding:4px 10px; font-size:12px;" onclick="togglePromotionStatus(${p.id}, ${!p.is_active})">
            ${p.is_active ? 'Tạm Dừng' : 'Kích Hoạt'}
          </button>
        </td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Lỗi tải khuyến mãi:", err);
  }
}

async function togglePromotionStatus(id, active) {
  try {
    const res = await fetch(`${API_BASE}/promotions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: active })
    });
    const json = await res.json();
    if (json.success) loadPromotions();
  } catch (err) {
    alert("Lỗi khi cập nhật trạng thái voucher.");
  }
}
window.togglePromotionStatus = togglePromotionStatus;

// ==================== 12. MODULE: FINANCE & WALLET ====================
async function loadWallet() {
  try {
    const res = await fetch(`${API_BASE}/wallet`);
    const json = await res.json();
    if (!json.success) return;

    const w = json.data;
    document.getElementById("walletAvailableBalance").textContent = formatVND(w.available_balance);
    document.getElementById("walletPendingBalance").textContent = formatVND(w.pending_balance);
    document.getElementById("walletBankName").textContent = w.bank_name || "Chưa cấu hình";
    document.getElementById("walletBankAccount").textContent = `${w.bank_account_number || ''} (${w.bank_account_name || ''})`;

    const tbody = document.getElementById("walletTransactionsBody");
    if (!tbody) return;

    tbody.innerHTML = (w.transactions || []).map(t => `
      <tr>
        <td style="font-weight:700;">#TX-${t.id}</td>
        <td><strong>${t.type === 'SETTLEMENT' ? 'Đối Soát Doanh Thu' : t.type === 'WITHDRAW' ? 'Rút Tiền Về STK' : 'Hoàn Tiền'}</strong></td>
        <td style="font-weight:700; color:${t.type === 'WITHDRAW' ? '#DC2626' : '#059669'};">
          ${t.type === 'WITHDRAW' ? '-' : '+'}${formatVND(t.amount)}
        </td>
        <td>${t.note || '-'}</td>
        <td><span class="badge-status ${t.status.toLowerCase()}">${t.status}</span></td>
        <td style="color:#64748B; font-size:12.5px;">${t.created_at}</td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Lỗi tải ví tiền:", err);
  }
}

// ==================== 13. MODULE: ANALYTICS ====================
async function loadAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    const json = await res.json();
    if (!json.success) return;

    const data = json.data;
    document.getElementById("analyticsAOV").textContent = formatVND(data.averageOrderValue);

    const tbody = document.getElementById("analyticsTopProductsBody");
    if (!tbody) return;

    tbody.innerHTML = data.bestSellers.map(b => `
      <tr>
        <td>
          <div class="table-product-cell">
            <img src="${b.image_url}" class="table-product-thumb" alt="${b.name}">
            <div class="table-product-meta">
              <h4>${b.name}</h4>
              <span>Mã SP: #${b.id}</span>
            </div>
          </div>
        </td>
        <td style="font-weight:700;">${formatVND(b.base_price)}</td>
        <td style="font-weight:800; font-size:16px;">${b.units_sold} cái</td>
        <td style="font-weight:800; color:#059669; font-size:16px;">${formatVND(b.total_revenue)}</td>
      </tr>
    `).join("");
  } catch (err) {
    console.error("Lỗi tải báo cáo phân tích:", err);
  }
}

// ==================== 14. MODULE: REVIEWS ====================
async function loadReviews() {
  try {
    const res = await fetch(`${API_BASE}/reviews`);
    const json = await res.json();
    if (!json.success) return;

    const container = document.getElementById("reviewsContainer");
    if (!container) return;

    if (!json.data || json.data.length === 0) {
      container.innerHTML = `<p style="text-align:center; padding:30px; color:#64748B;">Chưa có đánh giá nào từ khách hàng.</p>`;
      return;
    }

    container.innerHTML = json.data.map(r => `
      <div style="border:1px solid var(--seller-card-border); border-radius:14px; padding:20px; margin-bottom:16px; background:#FFFFFF;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div>
            <strong style="font-size:15px; color:#0F172A;">${r.customer_name}</strong>
            <span style="color:#D4AF37; margin-left:8px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          </div>
          <span style="font-size:12px; color:#64748B;">${r.created_at}</span>
        </div>
        <p style="font-size:14px; line-height:1.5; color:#334155; margin-bottom:12px;">"${r.comment}"</p>
        <div style="display:flex; align-items:center; gap:10px; font-size:13px; color:#64748B;">
          <span>Sản phẩm: <strong>${r.product_name}</strong></span>
        </div>

        ${r.seller_reply ? `
          <div style="background:#F8FAFC; border-left:3px solid #D4AF37; padding:12px 16px; border-radius:4px; margin-top:12px;">
            <strong style="color:#0F172A; font-size:13px;">Phản hồi từ shop:</strong>
            <p style="margin:4px 0 0; font-size:13.5px; color:#475569;">${r.seller_reply}</p>
          </div>
        ` : `
          <div style="margin-top:12px;">
            <button class="btn-storefront" style="padding:4px 14px; font-size:12px;" onclick="openReplyModal(${r.id}, '${r.comment.replace(/'/g, "\\'")}')">
              ✍️ Gửi phản hồi
            </button>
          </div>
        `}
      </div>
    `).join("");
  } catch (err) {
    console.error("Lỗi tải đánh giá:", err);
  }
}

function openReplyModal(id, comment) {
  document.getElementById("replyReviewId").value = id;
  document.getElementById("replyCustomerComment").textContent = `Khách: "${comment}"`;
  document.getElementById("replyText").value = "";
  openModal("modalReplyReview");
}
window.openReplyModal = openReplyModal;

// ==================== EVENT LISTENERS SETUP ====================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sidebar tab switching
  document.querySelectorAll(".seller-nav .nav-item[data-tab]").forEach(item => {
    item.addEventListener("click", () => switchTab(item.dataset.tab));
  });

  // 2. Quick add button in topbar
  document.getElementById("btnQuickAddProduct")?.addEventListener("click", () => {
    switchTab("tab-add-product");
  });

  // 3. Search & filter in product list
  document.getElementById("filterProductSearch")?.addEventListener("input", () => loadProducts());
  document.getElementById("filterProductCategory")?.addEventListener("change", () => loadProducts());

  // 4. Shop Profile Form Submit
  document.getElementById("formShopProfile")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      shop_name: document.getElementById("profileShopName").value,
      phone: document.getElementById("profilePhone").value,
      email: document.getElementById("profileEmail").value,
      warehouse_address: document.getElementById("profileWarehouse").value,
      bio: document.getElementById("profileBio").value,
      logo_url: document.getElementById("profileLogoUrl").value,
      banner_url: document.getElementById("profileBannerUrl").value,
      is_vacation_mode: document.getElementById("profileVacationMode").checked
    };

    try {
      const res = await fetch(`${API_BASE}/shop`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        alert("Cập nhật hồ sơ shop thành công!");
        loadShopProfile();
      }
    } catch (err) {
      alert("Lỗi khi lưu hồ sơ.");
    }
  });

  // 5. Add Product Form Submit
  document.getElementById("formCreateProduct")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("newProdName").value.trim();
    const category_id = Number(document.getElementById("newProdCategory").value);
    const brand_id = Number(document.getElementById("newProdBrand").value);
    const base_price = Number(document.getElementById("newProdPrice").value);
    const stock_quantity = Number(document.getElementById("newProdStock").value);
    const image_url = document.getElementById("newProdImage").value.trim();
    const description = document.getElementById("newProdDesc").value.trim();
    const is_featured = document.getElementById("newProdFeatured").checked;

    const payload = {
      name,
      category_id,
      brand_id,
      base_price,
      description,
      image_url,
      is_featured,
      variants: [
        {
          sku: `SKU-${Date.now().toString().slice(-6)}`,
          size: "Freesize",
          color: "Standard",
          price: base_price,
          stock_quantity,
          image_url
        }
      ]
    };

    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        alert("Đăng sản phẩm mới thành công!");
        document.getElementById("formCreateProduct").reset();
        switchTab("tab-products");
      }
    } catch (err) {
      alert("Lỗi khi đăng sản phẩm.");
    }
  });

  // 6. AI Assistant Trigger
  document.getElementById("btnTriggerAICopywriter")?.addEventListener("click", triggerAICopywriter);

  // 7. Apply AI Copy into textarea
  document.getElementById("btnApplyAICopy")?.addEventListener("click", () => {
    if (generatedAICopy) {
      document.getElementById("newProdDesc").value = 
        `${generatedAICopy.highlight}\n\n${generatedAICopy.editorialDescription}\n\n${generatedAICopy.materialAndFit}\n\n${generatedAICopy.stylingTips}\n\n${generatedAICopy.hashtags.join(" ")}`;
      closeModal("modalAIResult");
    }
  });

  // 8. Update Stock Submit
  document.getElementById("formUpdateStock")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("stockProdId").value;
    const quantity = document.getElementById("stockQty").value;
    const lowStockThreshold = document.getElementById("stockThreshold").value;

    try {
      const res = await fetch(`${API_BASE}/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, lowStockThreshold })
      });
      const json = await res.json();
      if (json.success) {
        alert("Cập nhật kho hàng thành công!");
        closeModal("modalEditStock");
        loadInventory();
        loadProducts();
      }
    } catch (err) {
      alert("Lỗi khi cập nhật kho hàng.");
    }
  });

  // 9. Open Create Promo Modal
  document.getElementById("btnOpenCreatePromoModal")?.addEventListener("click", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    document.getElementById("promoEndDate").value = tomorrow.toISOString().slice(0, 10);
    openModal("modalCreatePromo");
  });

  // 10. Create Promo Submit
  document.getElementById("formCreatePromo")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      voucher_code: document.getElementById("promoCode").value.trim(),
      title: document.getElementById("promoTitle").value.trim(),
      discount_type: document.getElementById("promoType").value,
      discount_value: Number(document.getElementById("promoValue").value),
      min_order_value: Number(document.getElementById("promoMinOrder").value),
      usage_limit: Number(document.getElementById("promoLimit").value),
      end_date: `${document.getElementById("promoEndDate").value} 23:59:59`
    };

    try {
      const res = await fetch(`${API_BASE}/promotions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        alert("Tạo mã khuyến mãi thành công!");
        closeModal("modalCreatePromo");
        document.getElementById("formCreatePromo").reset();
        loadPromotions();
      } else {
        alert(json.error || "Không thể tạo mã.");
      }
    } catch (err) {
      alert("Lỗi khi tạo mã giảm giá.");
    }
  });

  // 11. Open Withdraw Modal
  document.getElementById("btnOpenWithdrawModal")?.addEventListener("click", () => {
    openModal("modalWithdraw");
  });

  // 12. Withdraw Submit
  document.getElementById("formWithdraw")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const amount = Number(document.getElementById("withdrawAmount").value);
    const note = document.getElementById("withdrawNote").value;

    try {
      const res = await fetch(`${API_BASE}/wallet/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, note })
      });
      const json = await res.json();
      if (json.success) {
        alert("Đã tạo lệnh rút tiền thành công!");
        closeModal("modalWithdraw");
        document.getElementById("formWithdraw").reset();
        loadWallet();
      } else {
        alert(json.error || "Không thể thực hiện lệnh rút.");
      }
    } catch (err) {
      alert("Lỗi khi gửi yêu cầu rút tiền.");
    }
  });

  // 13. Reply Review Submit
  document.getElementById("formReplyReview")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("replyReviewId").value;
    const reply = document.getElementById("replyText").value;

    try {
      const res = await fetch(`${API_BASE}/reviews/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply })
      });
      const json = await res.json();
      if (json.success) {
        alert("Gửi phản hồi cho khách thành công!");
        closeModal("modalReplyReview");
        loadReviews();
      }
    } catch (err) {
      alert("Lỗi khi phản hồi đánh giá.");
    }
  });

  // 14. Logout Action
  document.getElementById("btnNavLogout")?.addEventListener("click", () => {
    if (confirm("Bạn có muốn đăng xuất khỏi Cổng Người Bán?")) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = "auth.html";
    }
  });

  // Initialize initial view
  loadDashboardData();
  loadShopProfile();
});
