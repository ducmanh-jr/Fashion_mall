/**
 * Orders Management & Track Your Order Application Logic
 * Standardized to match user reference media_1789714727980.jpg & media_1789714736814.jpg
 * Aethelgard Mall Seller Portal
 */

const mockOrders = [
  {
    id: "AG-2024-7890",
    customer_name: "Esther Howard",
    customer_email: "john.doe@example.com",
    customer_phone: "+1 (555) 123-4567",
    shipping_address: "123 Main Street, New York, NY 10001, United States",
    payment_method: "Thẻ Tín Dụng (Visa ending in 4242)",
    status: "SHIPPED", // PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    status_label: "Đang Vận Chuyển",
    created_at: "2024-01-15 10:20 AM",
    placed_date_text: "January 15, 2024",
    carrier: "FedEx Logistics",
    tracking_code: "789012345678",
    estimated_delivery: "January 20, 2024",
    last_update: "Package departed from facility in NEW YORK, NY (1/17/2024, 2:30:00 PM)",
    last_location: "NEW YORK, NY Hub",
    progress_step: 3, // 1: Ordered, 2: Confirmed, 3: Shipped, 4: Delivered
    progress_dates: {
      ordered: "Jan 15",
      confirmed: "Jan 15",
      shipped: "Jan 17",
      delivered: "Jan 20"
    },
    timeline: [
      { title: "Order Placed", desc: "Your order has been received", time: "2024-01-15 10:20 AM", status: "done" },
      { title: "Order Confirmed", desc: "We've confirmed your order", time: "2024-01-15 11:45 AM", status: "done" },
      { title: "Order Processed", desc: "Your items are being prepared for shipment", time: "2024-01-16 09:15 AM", status: "done" },
      { title: "Shipped", desc: "Your order is on the way", time: "2024-01-17 02:30 PM", status: "current" },
      { title: "Delivered", desc: "Expected delivery", time: "2024-01-20", status: "pending" }
    ],
    items: [
      {
        name: "Giày Sneaker Gucci Ace Web Leather",
        specs: "Color: White/Green-Red Stripe | Size: 41 EU",
        image_url: "img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg",
        price: 18900000,
        quantity: 1
      },
      {
        name: "Kính Mát Gucci Double G Rectangular Cream Gold",
        specs: "Color: Cream Gold | Category: Accessories",
        image_url: "img/Kính Mát Gucci Double G Rectangular Sunglasses Cream Gold.jpg",
        price: 11500000,
        quantity: 1
      }
    ],
    subtotal: 30400000,
    shipping_charge: 60000,
    taxes: 2432000,
    discount: 1000000,
    total_amount: 31892000
  },
  {
    id: "AG-2024-7891",
    customer_name: "Darrell Steward",
    customer_email: "darrell.steward@example.com",
    customer_phone: "+84 908 123 456",
    shipping_address: "Tòa nhà Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội",
    payment_method: "Thanh toán khi nhận hàng (COD)",
    status: "CONFIRMED",
    status_label: "Đã Xác Nhận",
    created_at: "2024-01-16 08:30 AM",
    placed_date_text: "January 16, 2024",
    carrier: "Aethelgard Express Hub",
    tracking_code: "VN8912347101",
    estimated_delivery: "January 18, 2024",
    last_update: "Đơn hàng đã được Shop đóng gói, đang đợi bưu tá tiếp nhận",
    last_location: "Kho Tổng Aethelgard - Long Biên",
    progress_step: 2,
    progress_dates: {
      ordered: "Jan 16",
      confirmed: "Jan 16",
      shipped: "Jan 17",
      delivered: "Jan 18"
    },
    timeline: [
      { title: "Order Placed", desc: "Đơn hàng đã tiếp nhận vào hệ thống", time: "2024-01-16 08:30 AM", status: "done" },
      { title: "Order Confirmed", desc: "Shop đã duyệt xác nhận đơn", time: "2024-01-16 09:15 AM", status: "current" },
      { title: "Order Processed", desc: "Đang đóng gói và dán mã vận đơn", time: "2024-01-16 10:00 AM", status: "pending" },
      { title: "Shipped", desc: "Bàn giao cho đơn vị vận chuyển", time: "Dự kiến 2024-01-17", status: "pending" },
      { title: "Delivered", desc: "Giao tới tay khách hàng", time: "Dự kiến 2024-01-18", status: "pending" }
    ],
    items: [
      {
        name: "Giày Adidas Samba OG Classic White Black",
        specs: "Color: White Black | Size: 42 EU",
        image_url: "img/addidas samba.jpg",
        price: 2790000,
        quantity: 1
      }
    ],
    subtotal: 2790000,
    shipping_charge: 35000,
    taxes: 223200,
    discount: 0,
    total_amount: 3048200
  },
  {
    id: "AG-2024-7892",
    customer_name: "Cameron Williamson",
    customer_email: "cameron.w@luxury.com",
    customer_phone: "+84 912 345 678",
    shipping_address: "Vinhomes Golden River, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    payment_method: "Thẻ Tín Dụng Quốc Tế (Mastercard)",
    status: "DELIVERED",
    status_label: "Giao Thành Công",
    created_at: "2024-01-12 02:15 PM",
    placed_date_text: "January 12, 2024",
    carrier: "Aethelgard Hỏa Tốc 2H",
    tracking_code: "VN9923810293",
    estimated_delivery: "January 14, 2024",
    last_update: "Người nhận đã ký nhận bưu kiện thành công",
    last_location: "Quận 1, TP. Hồ Chí Minh",
    progress_step: 4,
    progress_dates: {
      ordered: "Jan 12",
      confirmed: "Jan 12",
      shipped: "Jan 13",
      delivered: "Jan 14"
    },
    timeline: [
      { title: "Order Placed", desc: "Đơn hàng đã tạo thành công", time: "2024-01-12 02:15 PM", status: "done" },
      { title: "Order Confirmed", desc: "Đã xác nhận thanh toán thẻ", time: "2024-01-12 02:20 PM", status: "done" },
      { title: "Order Processed", desc: "Đóng gói bọc seal cao cấp", time: "2024-01-12 04:00 PM", status: "done" },
      { title: "Shipped", desc: "Shipper Hỏa Tốc đang giao", time: "2024-01-13 09:30 AM", status: "done" },
      { title: "Delivered", desc: "Khách hàng đã nhận hàng", time: "2024-01-14 11:45 AM", status: "done" }
    ],
    items: [
      {
        name: "Bộ Túi Xách Nữ Gucci Dionysus Supreme Shoulder Bag",
        specs: "Color: GG Supreme Brown | Size: Medium",
        image_url: "img/298926494039684010.jpg",
        price: 45000000,
        quantity: 1
      }
    ],
    subtotal: 45000000,
    shipping_charge: 0,
    taxes: 3600000,
    discount: 2000000,
    total_amount: 46600000
  },
  {
    id: "AG-2024-7893",
    customer_name: "Jane Cooper",
    customer_email: "jane.cooper@fashion.org",
    customer_phone: "+84 934 567 890",
    shipping_address: "Phố Tràng Tiền, Hoàn Kiếm, Hà Nội",
    payment_method: "Ví Điện Tử Aethelgard Pay",
    status: "PENDING",
    status_label: "Chờ Duyệt",
    created_at: "2024-01-17 11:00 AM",
    placed_date_text: "January 17, 2024",
    carrier: "Aethelgard Express",
    tracking_code: "Chờ cấp mã vận đơn",
    estimated_delivery: "January 19, 2024",
    last_update: "Đơn hàng mới tạo, đang chờ chủ gian hàng xác nhận tồn kho",
    last_location: "Đang chờ điều phối kho",
    progress_step: 1,
    progress_dates: {
      ordered: "Jan 17",
      confirmed: "--",
      shipped: "--",
      delivered: "--"
    },
    timeline: [
      { title: "Order Placed", desc: "Đơn hàng đã được tiếp nhận", time: "2024-01-17 11:00 AM", status: "current" },
      { title: "Order Confirmed", desc: "Chờ shop kiểm kho và duyệt", time: "--", status: "pending" },
      { title: "Order Processed", desc: "Chuẩn bị lấy hàng đóng gói", time: "--", status: "pending" },
      { title: "Shipped", desc: "Giao cho đơn vị vận chuyển", time: "--", status: "pending" },
      { title: "Delivered", desc: "Dự kiến giao hàng", time: "--", status: "pending" }
    ],
    items: [
      {
        name: "Áo Khoác Nỉ Adidas Sakura Special Edition",
        specs: "Color: Pink/Black | Size: L",
        image_url: "img/Adidas sakura zip up hoodie.jpg",
        price: 2190000,
        quantity: 1
      }
    ],
    subtotal: 2190000,
    shipping_charge: 30000,
    taxes: 175200,
    discount: 100000,
    total_amount: 2295200
  }
];

// Currency Formatter
const formatVND = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

document.addEventListener('DOMContentLoaded', () => {
  let currentFilter = 'ALL';
  const tableBody = document.getElementById('orders-table-body');
  const searchInput = document.getElementById('orders-search-input');
  const tabButtons = document.querySelectorAll('.order-tab-btn');

  // Render Orders Table
  function renderOrdersList() {
    if (!tableBody) return;
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = mockOrders.filter(o => {
      if (currentFilter !== 'ALL' && o.status !== currentFilter) return false;
      if (query) {
        return (
          o.id.toLowerCase().includes(query) ||
          o.customer_name.toLowerCase().includes(query) ||
          o.customer_email.toLowerCase().includes(query) ||
          o.tracking_code.toLowerCase().includes(query)
        );
      }
      return true;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 40px; color: #64748B;">
            Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(o => {
      const firstItem = o.items[0];
      const moreItemsText = o.items.length > 1 ? ` +${o.items.length - 1} món khác` : '';

      return `
        <tr class="order-clickable-row" onclick="openOrderTrackingModal('${o.id}')">
          <td>
            <span class="order-code-badge">#${o.id}</span>
          </td>
          <td>
            <div style="font-size: 0.82rem; font-weight: 600; color: #374151;">${o.created_at}</div>
          </td>
          <td>
            <div style="font-weight: 700; color: #111827;">${o.customer_name}</div>
            <div style="font-size: 0.74rem; color: #6B7280;">${o.customer_phone}</div>
          </td>
          <td>
            <div class="order-item-cell">
              <img class="order-thumb-img" src="${firstItem.image_url}" alt="${firstItem.name}">
              <div class="order-item-meta">
                <strong>${firstItem.name}</strong>
                <span>${firstItem.specs} (x${firstItem.quantity})${moreItemsText}</span>
              </div>
            </div>
          </td>
          <td>
            <div style="font-weight: 650; font-size: 0.8rem; color: #111827;">${o.carrier}</div>
            <div style="font-family: monospace; font-size: 0.74rem; color: #2563EB;">${o.tracking_code}</div>
          </td>
          <td>
            <strong style="color: #111827; font-size: 0.9rem;">${formatVND(o.total_amount)}</strong>
          </td>
          <td>
            <span class="badge-order-status ${o.status}">
              ${o.status_label}
            </span>
          </td>
          <td class="row-arrow-cue">&rarr;</td>
        </tr>
      `;
    }).join('');
  }

  // Filter Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.status;
      renderOrdersList();
    });
  });

  searchInput?.addEventListener('input', renderOrdersList);

  // Initial render
  renderOrdersList();
});

// ============================================================
// OPEN TRACK YOUR ORDER MODAL (Standardized per media_1789714727980.jpg)
// ============================================================
window.openOrderTrackingModal = function(orderId) {
  const order = mockOrders.find(o => o.id === orderId) || mockOrders[0];
  if (!order) return;

  // Header Card
  document.getElementById('track-order-code-title').textContent = `Order ${order.id}`;
  document.getElementById('track-order-badge').className = `badge-order-status ${order.status}`;
  document.getElementById('track-order-badge').textContent = order.status_label;
  document.getElementById('track-order-placed-date').textContent = `Placed on ${order.placed_date_text}`;

  // Stepper Calculation
  // 4 steps: Ordered (1), Confirmed (2), Shipped (3), Delivered (4)
  const stepNodes = document.querySelectorAll('.step-node');
  stepNodes.forEach((node, idx) => {
    const stepNum = idx + 1;
    node.classList.remove('completed', 'current');
    if (stepNum < order.progress_step) {
      node.classList.add('completed');
    } else if (stepNum === order.progress_step) {
      node.classList.add('current');
    }
  });

  const fillLine = document.getElementById('delivery-line-fill');
  if (fillLine) {
    let widthPct = 0;
    if (order.progress_step === 1) widthPct = 0;
    else if (order.progress_step === 2) widthPct = 33;
    else if (order.progress_step === 3) widthPct = 66;
    else if (order.progress_step === 4) widthPct = 100;
    fillLine.style.width = `calc((100% - 80px) * ${widthPct / 100})`;
  }

  document.getElementById('step-date-ordered').textContent = order.progress_dates.ordered;
  document.getElementById('step-date-confirmed').textContent = order.progress_dates.confirmed;
  document.getElementById('step-date-shipped').textContent = order.progress_dates.shipped;
  document.getElementById('step-date-delivered').textContent = order.progress_dates.delivered;

  // Order Timeline
  const timelineContainer = document.getElementById('track-timeline-list');
  if (timelineContainer) {
    timelineContainer.innerHTML = order.timeline.map(t => {
      const isCurrentTag = t.status === 'current' ? `<span class="tag-current-status">Current</span>` : '';
      return `
        <div class="timeline-item ${t.status}">
          <div class="timeline-icon">✓</div>
          <div class="timeline-content">
            <strong>${t.title} ${isCurrentTag}</strong>
            <p>${t.desc}</p>
            <div class="timeline-time">${t.time}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Carrier & Tracking Info
  document.getElementById('track-carrier-name').textContent = order.carrier;
  document.getElementById('track-carrier-code').textContent = `Tracking #: ${order.tracking_code}`;
  document.getElementById('track-carrier-last-update').textContent = order.last_update;
  document.getElementById('track-carrier-location').textContent = order.last_location;
  document.getElementById('track-carrier-est-delivery').textContent = order.estimated_delivery;

  // Order Items
  const itemsContainer = document.getElementById('track-items-container');
  if (itemsContainer) {
    itemsContainer.innerHTML = order.items.map(i => `
      <div class="track-item-row">
        <div class="track-item-left">
          <img class="track-item-thumb" src="${i.image_url}" alt="${i.name}">
          <div class="track-item-details">
            <h4>${i.name}</h4>
            <div class="track-item-specs">${i.specs} • Qty: ${i.quantity}</div>
          </div>
        </div>
        <div class="track-item-price-right">
          <div class="item-main-price">${formatVND(i.price * i.quantity)}</div>
          <div class="item-qty-subtext">${formatVND(i.price)} / sp</div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('track-items-total-qty').textContent = `${order.items.length} món hàng`;
  document.getElementById('track-items-subtotal').textContent = formatVND(order.subtotal);

  // Order Summary Breakdown (media_1789714736814.jpg)
  document.getElementById('track-sum-subtotal').textContent = formatVND(order.subtotal);
  document.getElementById('track-sum-shipping').textContent = formatVND(order.shipping_charge);
  document.getElementById('track-sum-tax').textContent = formatVND(order.taxes);
  document.getElementById('track-sum-discount').textContent = `-${formatVND(order.discount)}`;
  document.getElementById('track-sum-total').textContent = formatVND(order.total_amount);

  // Address & Payment Cards
  document.getElementById('track-addr-name').textContent = order.customer_name;
  document.getElementById('track-addr-detail').textContent = order.shipping_address;
  document.getElementById('track-addr-phone').textContent = order.customer_phone;
  document.getElementById('track-pay-method').textContent = order.payment_method;
  document.getElementById('track-pay-total').textContent = `Tổng: ${formatVND(order.total_amount)}`;

  // Open Modal
  const modal = document.getElementById('track-order-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeOrderTrackingModal = function() {
  const modal = document.getElementById('track-order-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.trackSearchLookup = function(e) {
  e.preventDefault();
  const searchId = document.getElementById('find-order-id-input')?.value.trim();
  if (searchId) {
    const found = mockOrders.find(o => o.id.toLowerCase() === searchId.toLowerCase());
    if (found) {
      openOrderTrackingModal(found.id);
    } else {
      alert(`Không tìm thấy đơn hàng "${searchId}". Vui lòng thử mã mẫu: AG-2024-7890`);
    }
  }
};

window.printInvoiceMock = function() {
  window.print();
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOrderTrackingModal();
  }
});
