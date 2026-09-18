/**
 * Inventory Management Application Logic
 * Aethelgard Mall Seller Portal
 */

const mockInventory = [
  {
    id: 101,
    name: "Giày Adidas Samba OG Classic White Black",
    category: "Giày Sneaker & Thể Thao",
    sku: "AD-00101",
    barcode: "8938501239102",
    variants: "Size 39, 40, 41, 42",
    available_stock: 45,
    reserved_stock: 6,
    threshold: 15,
    status: "IN_STOCK",
    status_text: "Còn Hàng",
    cost_price: 1618000,
    retail_price: 2790000,
    image_url: "img/addidas samba.jpg"
  },
  {
    id: 102,
    name: "Áo Khoác Nỉ Adidas Sakura Special Edition",
    category: "Thời Trang Streetwear & Áo Khoác",
    sku: "AD-00102",
    barcode: "8938501239103",
    variants: "Size S, M, L",
    available_stock: 30,
    reserved_stock: 4,
    threshold: 10,
    status: "IN_STOCK",
    status_text: "Còn Hàng",
    cost_price: 1270000,
    retail_price: 2190000,
    image_url: "img/Adidas sakura zip up hoodie.jpg"
  },
  {
    id: 103,
    name: "Giày Balenciaga Track 4.0 Tan/Beige",
    category: "Giày Sneaker & Thể Thao",
    sku: "BL-00103",
    barcode: "8938501239104",
    variants: "Size 40, 41, 42, 43",
    available_stock: 12,
    reserved_stock: 3,
    threshold: 10,
    status: "LOW_STOCK",
    status_text: "Sắp Hết",
    cost_price: 14210000,
    retail_price: 24500000,
    image_url: "img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg"
  },
  {
    id: 104,
    name: "Giày Balenciaga Track Thug Edition Black",
    category: "Giày Sneaker & Thể Thao",
    sku: "BL-00104",
    barcode: "8938501239105",
    variants: "Size 41, 42",
    available_stock: 5,
    reserved_stock: 2,
    threshold: 10,
    status: "LOW_STOCK",
    status_text: "Sắp Hết",
    cost_price: 13862000,
    retail_price: 23900000,
    image_url: "img/#balanciagatrack#thug 🥷🏿.jpg"
  },
  {
    id: 105,
    name: "Quần Nỉ Balenciaga Paris Sweatpants White",
    category: "Quần & Phụ Kiện Thời Trang",
    sku: "BL-00105",
    barcode: "8938501239106",
    variants: "Size S, M, L",
    available_stock: 15,
    reserved_stock: 1,
    threshold: 8,
    status: "IN_STOCK",
    status_text: "Còn Hàng",
    cost_price: 9570000,
    retail_price: 16500000,
    image_url: "img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg"
  },
  {
    id: 106,
    name: "Giày Sneaker Gucci Ace Web Leather",
    category: "Giày Sneaker & Thể Thao",
    sku: "GC-00106",
    barcode: "8938501239107",
    variants: "Size 39, 40, 41, 42",
    available_stock: 20,
    reserved_stock: 5,
    threshold: 10,
    status: "IN_STOCK",
    status_text: "Còn Hàng",
    cost_price: 10962000,
    retail_price: 18900000,
    image_url: "img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg"
  },
  {
    id: 107,
    name: "Kính Mát Gucci Double G Rectangular Cream Gold",
    category: "Quần & Phụ Kiện Thời Trang",
    sku: "GC-00107",
    barcode: "8938501239108",
    variants: "One Size",
    available_stock: 18,
    reserved_stock: 2,
    threshold: 5,
    status: "IN_STOCK",
    status_text: "Còn Hàng",
    cost_price: 6670000,
    retail_price: 11500000,
    image_url: "img/Kính Mát Gucci Double G Rectangular Sunglasses Cream Gold.jpg"
  },
  {
    id: 115,
    name: "Bộ Túi Xách Nữ Gucci Dionysus Supreme Shoulder Bag",
    category: "Quần & Phụ Kiện Thời Trang",
    sku: "GC-00115",
    barcode: "8938501239109",
    variants: "Medium Size",
    available_stock: 0,
    reserved_stock: 0,
    threshold: 5,
    status: "OUT_OF_STOCK",
    status_text: "Hết Hàng",
    cost_price: 26100000,
    retail_price: 45000000,
    image_url: "img/298926494039684010.jpg"
  }
];

const formatVND = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

document.addEventListener('DOMContentLoaded', () => {
  let currentTab = 'ALL';
  const tbody = document.getElementById('inv-table-body');
  const searchInput = document.getElementById('inv-search-input');
  const tabs = document.querySelectorAll('.inv-tab-btn');

  function renderTable() {
    if (!tbody) return;
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = mockInventory.filter(item => {
      if (currentTab !== 'ALL' && item.status !== currentTab) return false;
      if (query) {
        return (
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.barcode.includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: #64748B;">
            Không tìm thấy sản phẩm kho nào phù hợp.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      let qtyClass = '';
      if (item.status === 'LOW_STOCK') qtyClass = 'low';
      else if (item.status === 'OUT_OF_STOCK') qtyClass = 'out';

      return `
        <tr>
          <td>
            <div class="inv-prod-cell">
              <img class="inv-prod-thumb" src="${item.image_url}" alt="${item.name}">
              <div class="inv-prod-info">
                <strong>${item.name}</strong>
                <span>${item.category}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="inv-sku-badge">${item.sku}</span>
          </td>
          <td>
            <span style="font-family: monospace; font-size: 0.8rem; color: #64748B;">${item.barcode}</span>
          </td>
          <td>
            <span style="font-size: 0.82rem; color: #475569;">${item.variants}</span>
          </td>
          <td>
            <span class="inv-stock-qty ${qtyClass}">${item.available_stock}</span>
          </td>
          <td>
            <span style="font-weight: 700; color: #64748B;">${item.reserved_stock}</span>
          </td>
          <td>
            <span style="color: #94A3B8; font-weight: 600;">${item.threshold}</span>
          </td>
          <td>
            <span class="status-pill ${item.status}">${item.status_text}</span>
          </td>
          <td>
            <div class="inv-actions-cell">
              <button class="btn-inv-inline" onclick="openRestockModal(${item.id})">
                + Nhập kho
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderTable();
    });
  });

  searchInput?.addEventListener('input', renderTable);
  renderTable();
});

let selectedRestockProduct = null;

window.openRestockModal = function(productId) {
  selectedRestockProduct = mockInventory.find(p => p.id === productId);
  if (!selectedRestockProduct) return;

  document.getElementById('restock-modal-prod-title').textContent = selectedRestockProduct.name;
  document.getElementById('restock-modal-curr-stock').textContent = `Tồn hiện tại: ${selectedRestockProduct.available_stock} chiếc | SKU: ${selectedRestockProduct.sku}`;
  document.getElementById('restock-qty-input').value = '25';

  const modal = document.getElementById('restock-modal');
  if (modal) {
    modal.classList.add('active');
  }
};

window.closeRestockModal = function() {
  const modal = document.getElementById('restock-modal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.submitRestock = function() {
  if (!selectedRestockProduct) return;
  const input = document.getElementById('restock-qty-input');
  const qty = Number(input.value);
  if (qty > 0) {
    selectedRestockProduct.available_stock += qty;
    if (selectedRestockProduct.available_stock > selectedRestockProduct.threshold) {
      selectedRestockProduct.status = 'IN_STOCK';
      selectedRestockProduct.status_text = 'Còn Hàng';
    }
    closeRestockModal();
    alert(`Đã nhập thêm thành công +${qty} sản phẩm vào kho "${selectedRestockProduct.name}"!`);
    location.reload();
  }
};
