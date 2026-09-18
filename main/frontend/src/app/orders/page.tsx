'use client';

import React, { useState } from 'react';

interface OrderItem {
  name: string;
  specs: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface TimelineItem {
  title: string;
  desc: string;
  time: string;
  status: 'done' | 'current' | 'pending';
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  payment_method: string;
  status: 'ALL' | 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';
  status_label: string;
  created_at: string;
  placed_date_text: string;
  carrier: string;
  tracking_code: string;
  estimated_delivery: string;
  last_update: string;
  last_location: string;
  progress_step: number;
  progress_dates: {
    ordered: string;
    confirmed: string;
    shipped: string;
    delivered: string;
  };
  timeline: TimelineItem[];
  items: OrderItem[];
  subtotal: number;
  shipping_charge: number;
  taxes: number;
  discount: number;
  total_amount: number;
}

const mockOrders: Order[] = [
  {
    id: 'AG-2024-7890',
    customer_name: 'Esther Howard',
    customer_email: 'john.doe@example.com',
    customer_phone: '+1 (555) 123-4567',
    shipping_address: '123 Main Street, New York, NY 10001, United States',
    payment_method: 'Thẻ Tín Dụng (Visa ending in 4242)',
    status: 'SHIPPED',
    status_label: 'Đang Vận Chuyển',
    created_at: '2024-01-15 10:20 AM',
    placed_date_text: 'January 15, 2024',
    carrier: 'FedEx Logistics',
    tracking_code: '789012345678',
    estimated_delivery: 'January 20, 2024',
    last_update: 'Package departed from facility in NEW YORK, NY (1/17/2024, 2:30:00 PM)',
    last_location: 'NEW YORK, NY Hub',
    progress_step: 3,
    progress_dates: {
      ordered: 'Jan 15',
      confirmed: 'Jan 15',
      shipped: 'Jan 17',
      delivered: 'Jan 20'
    },
    timeline: [
      { title: 'Order Placed', desc: 'Your order has been received', time: '2024-01-15 10:20 AM', status: 'done' },
      { title: 'Order Confirmed', desc: "We've confirmed your order", time: '2024-01-15 11:45 AM', status: 'done' },
      { title: 'Order Processed', desc: 'Your items are being prepared for shipment', time: '2024-01-16 09:15 AM', status: 'done' },
      { title: 'Shipped', desc: 'Your order is on the way', time: '2024-01-17 02:30 PM', status: 'current' },
      { title: 'Delivered', desc: 'Expected delivery', time: '2024-01-20', status: 'pending' }
    ],
    items: [
      {
        name: 'Giày Sneaker Gucci Ace Web Leather',
        specs: 'Color: White/Green-Red Stripe | Size: 41 EU',
        image_url: '/img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg',
        price: 18900000,
        quantity: 1
      },
      {
        name: 'Kính Mát Gucci Double G Rectangular Cream Gold',
        specs: 'Color: Cream Gold | Category: Accessories',
        image_url: '/img/Kính Mát Gucci Double G Rectangular Sunglasses Cream Gold.jpg',
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
    id: 'AG-2024-7891',
    customer_name: 'Darrell Steward',
    customer_email: 'darrell.steward@example.com',
    customer_phone: '+84 908 123 456',
    shipping_address: 'Tòa nhà Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội',
    payment_method: 'Thanh toán khi nhận hàng (COD)',
    status: 'CONFIRMED',
    status_label: 'Đã Xác Nhận',
    created_at: '2024-01-16 08:30 AM',
    placed_date_text: 'January 16, 2024',
    carrier: 'Aethelgard Express Hub',
    tracking_code: 'VN8912347101',
    estimated_delivery: 'January 18, 2024',
    last_update: 'Đơn hàng đã được Shop đóng gói, đang đợi bưu tá tiếp nhận',
    last_location: 'Kho Tổng Aethelgard - Long Biên',
    progress_step: 2,
    progress_dates: {
      ordered: 'Jan 16',
      confirmed: 'Jan 16',
      shipped: 'Jan 17',
      delivered: 'Jan 18'
    },
    timeline: [
      { title: 'Order Placed', desc: 'Đơn hàng đã tiếp nhận vào hệ thống', time: '2024-01-16 08:30 AM', status: 'done' },
      { title: 'Order Confirmed', desc: 'Shop đã duyệt xác nhận đơn', time: '2024-01-16 09:15 AM', status: 'current' },
      { title: 'Order Processed', desc: 'Đang đóng gói và dán mã vận đơn', time: '2024-01-16 10:00 AM', status: 'pending' },
      { title: 'Shipped', desc: 'Bàn giao cho đơn vị vận chuyển', time: 'Dự kiến 2024-01-17', status: 'pending' },
      { title: 'Delivered', desc: 'Giao tới tay khách hàng', time: 'Dự kiến 2024-01-18', status: 'pending' }
    ],
    items: [
      {
        name: 'Giày Adidas Samba OG Classic White Black',
        specs: 'Color: White Black | Size: 42 EU',
        image_url: '/img/addidas samba.jpg',
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
    id: 'AG-2024-7892',
    customer_name: 'Cameron Williamson',
    customer_email: 'cameron.w@luxury.com',
    customer_phone: '+84 912 345 678',
    shipping_address: 'Vinhomes Golden River, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    payment_method: 'Thẻ Tín Dụng Quốc Tế (Mastercard)',
    status: 'DELIVERED',
    status_label: 'Giao Thành Công',
    created_at: '2024-01-12 02:15 PM',
    placed_date_text: 'January 12, 2024',
    carrier: 'Aethelgard Hỏa Tốc 2H',
    tracking_code: 'VN9923810293',
    estimated_delivery: 'January 14, 2024',
    last_update: 'Người nhận đã ký nhận bưu kiện thành công',
    last_location: 'Quận 1, TP. Hồ Chí Minh',
    progress_step: 4,
    progress_dates: {
      ordered: 'Jan 12',
      confirmed: 'Jan 12',
      shipped: 'Jan 13',
      delivered: 'Jan 14'
    },
    timeline: [
      { title: 'Order Placed', desc: 'Đơn hàng đã tạo thành công', time: '2024-01-12 02:15 PM', status: 'done' },
      { title: 'Order Confirmed', desc: 'Đã xác nhận thanh toán thẻ', time: '2024-01-12 02:20 PM', status: 'done' },
      { title: 'Order Processed', desc: 'Đóng gói bọc seal cao cấp', time: '2024-01-12 04:00 PM', status: 'done' },
      { title: 'Shipped', desc: 'Shipper Hỏa Tốc đang giao', time: '2024-01-13 09:30 AM', status: 'done' },
      { title: 'Delivered', desc: 'Khách hàng đã nhận hàng', time: '2024-01-14 11:45 AM', status: 'done' }
    ],
    items: [
      {
        name: 'Bộ Túi Xách Nữ Gucci Dionysus Supreme Shoulder Bag',
        specs: 'Color: GG Supreme Brown | Size: Medium',
        image_url: '/img/298926494039684010.jpg',
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
    id: 'AG-2024-7893',
    customer_name: 'Jane Cooper',
    customer_email: 'jane.cooper@fashion.org',
    customer_phone: '+84 934 567 890',
    shipping_address: 'Phố Tràng Tiền, Hoàn Kiếm, Hà Nội',
    payment_method: 'Ví Điện Tử Aethelgard Pay',
    status: 'PENDING',
    status_label: 'Chờ Duyệt',
    created_at: '2024-01-17 11:00 AM',
    placed_date_text: 'January 17, 2024',
    carrier: 'Aethelgard Express',
    tracking_code: 'Chờ cấp mã vận đơn',
    estimated_delivery: 'January 19, 2024',
    last_update: 'Đơn hàng mới tạo, đang chờ chủ gian hàng xác nhận tồn kho',
    last_location: 'Đang chờ điều phối kho',
    progress_step: 1,
    progress_dates: {
      ordered: 'Jan 17',
      confirmed: '--',
      shipped: '--',
      delivered: '--'
    },
    timeline: [
      { title: 'Order Placed', desc: 'Đơn hàng đã được tiếp nhận', time: '2024-01-17 11:00 AM', status: 'current' },
      { title: 'Order Confirmed', desc: 'Chờ shop kiểm kho và duyệt', time: '--', status: 'pending' },
      { title: 'Order Processed', desc: 'Chuẩn bị lấy hàng đóng gói', time: '--', status: 'pending' },
      { title: 'Shipped', desc: 'Giao cho đơn vị vận chuyển', time: '--', status: 'pending' },
      { title: 'Delivered', desc: 'Dự kiến giao hàng', time: '--', status: 'pending' }
    ],
    items: [
      {
        name: 'Áo Khoác Nỉ Adidas Sakura Special Edition',
        specs: 'Color: Pink/Black | Size: L',
        image_url: '/img/Adidas sakura zip up hoodie.jpg',
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

const formatVND = (num: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
export default function OrdersPage() {
  const [currentFilter, setCurrentFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lookupId, setLookupId] = useState('AG-2024-7890');

  const openModal = (orderId: string) => {
    const found = mockOrders.find(o => o.id === orderId) || mockOrders[0];
    setActiveOrder(found);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockOrders.find(o => o.id.toLowerCase() === lookupId.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
    } else {
      alert(`Không tìm thấy đơn hàng "${lookupId}". Vui lòng thử lại với AG-2024-7890!`);
    }
  };

  const filteredOrders = mockOrders.filter(o => {
    if (currentFilter !== 'ALL' && o.status !== currentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q) ||
        o.tracking_code.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <main className="orders-container">
      {/* PAGE HEADER */}
      <div className="orders-page-header">
        <div className="orders-header-titles">
          <h1>Quản Lý Đơn Hàng & Vận Chuyển</h1>
          <p>Theo dõi luồng xử lý đơn đặt hàng, hành trình giao nhận bưu kiện và xuất phiếu kho</p>
        </div>

        <div className="orders-header-actions">
          <button
            className="btn-order-action"
            onClick={() => openModal('AG-2024-7890')}
            type="button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Tra Cứu Nhanh
          </button>
          <button
            className="btn-order-action"
            style={{ background: '#111827', color: '#FFFFFF', borderColor: '#111827' }}
            onClick={() => window.print()}
            type="button"
          >
            Xuất Báo Cáo Đơn
          </button>
        </div>
      </div>

      {/* KPI STATS CARDS */}
      <div className="orders-kpi-grid">
        <div
          className={`order-kpi-card ${currentFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('ALL')}
          style={{ cursor: 'pointer' }}
        >
          <span className="kpi-num">128</span>
          <span className="kpi-label">Tổng Đơn Hàng</span>
        </div>
        <div
          className={`order-kpi-card ${currentFilter === 'PENDING' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('PENDING')}
          style={{ cursor: 'pointer' }}
        >
          <span className="kpi-num" style={{ color: '#D97706' }}>14</span>
          <span className="kpi-label">Chờ Xác Nhận</span>
        </div>
        <div
          className={`order-kpi-card ${currentFilter === 'CONFIRMED' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('CONFIRMED')}
          style={{ cursor: 'pointer' }}
        >
          <span className="kpi-num" style={{ color: '#0284C7' }}>26</span>
          <span className="kpi-label">Đã Xác Nhận</span>
        </div>
        <div
          className={`order-kpi-card ${currentFilter === 'SHIPPED' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('SHIPPED')}
          style={{ cursor: 'pointer' }}
        >
          <span className="kpi-num" style={{ color: '#EA580C' }}>38</span>
          <span className="kpi-label">Đang Vận Chuyển</span>
        </div>
        <div
          className={`order-kpi-card ${currentFilter === 'DELIVERED' ? 'active' : ''}`}
          onClick={() => setCurrentFilter('DELIVERED')}
          style={{ cursor: 'pointer' }}
        >
          <span className="kpi-num" style={{ color: '#16A34A' }}>50</span>
          <span className="kpi-label">Giao Thành Công</span>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="orders-filter-bar">
        <div className="orders-tab-group">
          <button
            className={`order-tab-btn ${currentFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('ALL')}
            type="button"
          >
            Tất Cả (128)
          </button>
          <button
            className={`order-tab-btn ${currentFilter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('PENDING')}
            type="button"
          >
            Chờ Duyệt (14)
          </button>
          <button
            className={`order-tab-btn ${currentFilter === 'CONFIRMED' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('CONFIRMED')}
            type="button"
          >
            Đã Xác Nhận (26)
          </button>
          <button
            className={`order-tab-btn ${currentFilter === 'SHIPPED' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('SHIPPED')}
            type="button"
          >
            Đang Giao (38)
          </button>
          <button
            className={`order-tab-btn ${currentFilter === 'DELIVERED' ? 'active' : ''}`}
            onClick={() => setCurrentFilter('DELIVERED')}
            type="button"
          >
            Đã Giao (50)
          </button>
        </div>

        <div className="orders-search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            id="orders-search-input"
            placeholder="Tìm mã đơn, tên khách, tracking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã Đơn</th>
              <th>Thời Gian</th>
              <th>Khách Hàng</th>
              <th>Sản Phẩm</th>
              <th>Đơn Vị / Tracking</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th style={{ width: '32px', textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody id="orders-table-body">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                  Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              filteredOrders.map(o => {
                const firstItem = o.items[0];
                const moreItemsText = o.items.length > 1 ? ` +${o.items.length - 1} món khác` : '';

                return (
                  <tr
                    key={o.id}
                    className="order-clickable-row"
                    onClick={() => openModal(o.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <span className="order-code-badge">#{o.id}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>{o.created_at}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{o.customer_name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>{o.customer_phone}</div>
                    </td>
                    <td>
                      <div className="order-product-cell">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={firstItem.image_url} alt={firstItem.name} />
                        <div>
                          <div className="order-product-title">{firstItem.name}</div>
                          <div className="order-product-meta">
                            {firstItem.specs} {moreItemsText && <strong style={{ color: 'var(--accent-purple)' }}>{moreItemsText}</strong>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 650, fontSize: '0.82rem', color: '#111827' }}>{o.carrier}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#6B7280' }}>{o.tracking_code}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 750, color: '#111827', fontSize: '0.88rem' }}>
                        {formatVND(o.total_amount)}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                        {o.payment_method.includes('COD') ? 'COD' : 'Đã thanh toán'}
                      </div>
                    </td>
                    <td>
                      <span className={`badge-order-status ${o.status}`}>{o.status_label}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span style={{ color: '#9CA3AF', fontSize: '1.2rem', fontWeight: 'bold' }}>›</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* DUAL-PANEL SLIDING DRAWER SYSTEM FOR ORDERS TRACKING */}
      <div
        id="track-order-modal"
        className={`track-drawer-backdrop ${isModalOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {activeOrder && (
          <div className="track-drawer-wrapper">
            {/* SECONDARY PANEL (LEFT) */}
            <div className="track-panel track-panel-secondary">
              <div className="track-panel-header">
                <h3>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  Vận Đơn & Giao Nhận
                </h3>
                <span className="badge-transit" id="track-carrier-badge-sub">In transit</span>
              </div>

              <div className="track-panel-body">
                {/* Tracking Carrier Details */}
                <div className="track-card">
                  <div className="track-card-title">Tracking Information</div>
                  <div className="carrier-info-grid" style={{ marginTop: '8px' }}>
                    <div className="carrier-col">
                      <div className="carrier-name-row">
                        <span id="track-carrier-name">{activeOrder.carrier}</span>
                      </div>
                      <div className="tracking-code-val" id="track-carrier-code">Tracking #: {activeOrder.tracking_code}</div>
                      <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#6B7280' }}>
                        Dự kiến giao: <strong id="track-carrier-est-delivery" style={{ color: '#111827' }}>{activeOrder.estimated_delivery}</strong>
                      </div>
                    </div>

                    <div className="carrier-col" style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '8px', marginTop: '4px' }}>
                      <div style={{ fontWeight: 650, color: '#6B7280', fontSize: '0.74rem' }}>Cập Nhật Gần Nhất</div>
                      <p id="track-carrier-last-update" style={{ fontSize: '0.78rem', color: '#111827', marginTop: '2px' }}>
                        {activeOrder.last_update}
                      </p>
                      <div style={{ marginTop: '4px', fontSize: '0.74rem', fontWeight: 650, color: '#6B7280' }}>
                        Vị Trí Hiện Tại: <span id="track-carrier-location" style={{ color: '#111827', fontWeight: 700 }}>{activeOrder.last_location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="half-card">
                  <div className="half-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Địa Chỉ Giao Hàng
                  </div>
                  <div className="half-card-content">
                    <strong id="track-addr-name">{activeOrder.customer_name}</strong><br />
                    <span id="track-addr-detail">{activeOrder.shipping_address}</span><br />
                    <span id="track-addr-phone" style={{ display: 'block', marginTop: '4px', fontWeight: 600 }}>{activeOrder.customer_phone}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="half-card">
                  <div className="half-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Phương Thức Thanh Toán
                  </div>
                  <div className="half-card-content">
                    <strong id="track-pay-method">{activeOrder.payment_method}</strong><br />
                    <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Cổng Aethelgard Gateway bảo mật</span><br />
                    <span id="track-pay-total" style={{ display: 'block', marginTop: '6px', fontWeight: 750, color: '#16A34A' }}>
                      Tổng: {formatVND(activeOrder.total_amount)}
                    </span>
                  </div>
                </div>

                {/* Quick Lookup */}
                <div className="track-card">
                  <div className="track-card-title">Find Another Order</div>
                  <div className="track-card-subtitle">Tra cứu mã đơn khác trong hệ thống</div>
                  <form onSubmit={handleLookupSubmit}>
                    <div className="track-inputs-row" style={{ gridTemplateColumns: '1fr' }}>
                      <div className="track-input-group">
                        <input
                          type="text"
                          id="find-order-id-input"
                          value={lookupId}
                          onChange={(e) => setLookupId(e.target.value)}
                          placeholder="e.g. AG-2024-7890"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-track-submit">
                      Tra Cứu Bưu Kiện
                    </button>
                  </form>
                </div>

                {/* Support Card */}
                <div className="track-card" style={{ textAlign: 'center', padding: '14px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 750, marginBottom: '2px' }}>Cần Hỗ Trợ Kho Vận?</div>
                  <p style={{ fontSize: '0.74rem', color: '#6B7280', marginBottom: '10px' }}>Hotline trung tâm điều phối Aethelgard: 1900-8899</p>
                  <button
                    className="btn-order-action"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => alert('Đang kết nối điều phối viên kho bãi...')}
                    type="button"
                  >
                    Liên Hệ Hotline
                  </button>
                </div>
              </div>
            </div>

            {/* PRIMARY PANEL (RIGHT) */}
            <div className="track-panel track-panel-primary">
              <div className="track-panel-header">
                <div className="track-order-summary-header" style={{ flex: 1, marginRight: '12px' }}>
                  <div className="order-headline-left">
                    <div className="order-title-code">
                      <span id="track-order-code-title">Order {activeOrder.id}</span>
                      <span id="track-order-badge" className={`badge-order-status ${activeOrder.status}`}>
                        {activeOrder.status_label}
                      </span>
                    </div>
                    <div className="order-date-text" id="track-order-placed-date">Placed on {activeOrder.placed_date_text}</div>
                  </div>

                  <div className="order-header-buttons">
                    <button className="btn-order-action" onClick={() => window.print()} type="button">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Invoice
                    </button>
                    <button className="btn-order-action" onClick={() => window.print()} type="button">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                      </svg>
                      Print
                    </button>
                  </div>
                </div>

                <button className="track-panel-close" onClick={closeModal} type="button">
                  &times;
                </button>
              </div>

              <div className="track-panel-body">
                {/* Delivery Progress Stepper (4 steps) */}
                <div className="track-card">
                  <div className="stepper-header">
                    <h3>Delivery Progress</h3>
                    <span id="track-progress-est-sub">Estimated delivery: {activeOrder.estimated_delivery}</span>
                  </div>

                  <div className="delivery-progress-bar-wrap">
                    <div
                      className="delivery-progress-line-fill"
                      id="delivery-line-fill"
                      style={{
                        width:
                          activeOrder.progress_step === 1
                            ? '0%'
                            : activeOrder.progress_step === 2
                            ? '33%'
                            : activeOrder.progress_step === 3
                            ? '66%'
                            : '100%'
                      }}
                    ></div>

                    {/* Step 1 */}
                    <div className={`step-node ${activeOrder.progress_step >= 1 ? 'completed' : ''}`}>
                      <div className="step-icon-circle">✓</div>
                      <span className="step-name">Ordered</span>
                      <span className="step-date" id="step-date-ordered">{activeOrder.progress_dates.ordered}</span>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`step-node ${
                        activeOrder.progress_step > 2
                          ? 'completed'
                          : activeOrder.progress_step === 2
                          ? 'current'
                          : ''
                      }`}
                    >
                      <div className="step-icon-circle">{activeOrder.progress_step >= 2 ? '✓' : '2'}</div>
                      <span className="step-name">Confirmed</span>
                      <span className="step-date" id="step-date-confirmed">{activeOrder.progress_dates.confirmed}</span>
                    </div>

                    {/* Step 3 */}
                    <div
                      className={`step-node ${
                        activeOrder.progress_step > 3
                          ? 'completed'
                          : activeOrder.progress_step === 3
                          ? 'current'
                          : ''
                      }`}
                    >
                      <div className="step-icon-circle">{activeOrder.progress_step >= 3 ? '✓' : '3'}</div>
                      <span className="step-name">Shipped</span>
                      <span className="step-date" id="step-date-shipped">{activeOrder.progress_dates.shipped}</span>
                    </div>

                    {/* Step 4 */}
                    <div className={`step-node ${activeOrder.progress_step >= 4 ? 'completed' : ''}`}>
                      <div className="step-icon-circle">{activeOrder.progress_step >= 4 ? '✓' : '4'}</div>
                      <span className="step-name">Delivered</span>
                      <span className="step-date" id="step-date-delivered">{activeOrder.progress_dates.delivered}</span>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="track-card">
                  <div className="track-card-title">Order Timeline</div>
                  <div className="timeline-list" id="track-timeline-list">
                    {activeOrder.timeline.map((item, idx) => (
                      <div key={idx} className={`timeline-item ${item.status}`}>
                        <div className="tl-dot"></div>
                        <div className="tl-content">
                          <div className="tl-title">{item.title}</div>
                          <div className="tl-desc">{item.desc}</div>
                          <div className="tl-time">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="track-card">
                  <div className="track-card-title">Order Items</div>
                  <div className="track-items-list" id="track-items-container">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="track-item-row">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image_url} alt={item.name} />
                        <div className="track-item-details">
                          <div className="track-item-name">{item.name}</div>
                          <div className="track-item-specs">{item.specs}</div>
                          <div className="track-item-price-qty">
                            <span className="item-qty-badge">x{item.quantity}</span>
                            <span className="item-price-val">{formatVND(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="track-items-footer">
                    <span id="track-items-total-qty">{activeOrder.items.length} items</span>
                    <span>Tạm tính: <strong id="track-items-subtotal">{formatVND(activeOrder.subtotal)}</strong></span>
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="track-card">
                  <div className="track-card-title" style={{ marginBottom: '8px' }}>Order Summary</div>
                  <div className="order-summary-breakdown">
                    <div className="summary-calc-row">
                      <span>Subtotal</span>
                      <strong id="track-sum-subtotal">{formatVND(activeOrder.subtotal)}</strong>
                    </div>
                    <div className="summary-calc-row">
                      <span>Shipping Charge</span>
                      <strong id="track-sum-shipping">{formatVND(activeOrder.shipping_charge)}</strong>
                    </div>
                    <div className="summary-calc-row">
                      <span>Taxes (VAT 8%)</span>
                      <strong id="track-sum-tax">{formatVND(activeOrder.taxes)}</strong>
                    </div>
                    {activeOrder.discount > 0 && (
                      <div className="summary-calc-row" style={{ color: '#16A34A' }}>
                        <span>Discount (Voucher Mall)</span>
                        <strong id="track-sum-discount">-{formatVND(activeOrder.discount)}</strong>
                      </div>
                    )}
                    <div className="summary-calc-row total-row">
                      <span>Total Payment</span>
                      <strong id="track-sum-total" style={{ color: '#111827' }}>
                        {formatVND(activeOrder.total_amount)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}