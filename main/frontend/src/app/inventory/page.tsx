'use client';

import React, { useState, useMemo } from 'react';

interface InvItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  barcode: string;
  variants: string;
  available_stock: number;
  reserved_stock: number;
  threshold: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  status_text: string;
  cost_price: number;
  retail_price: number;
  image_url: string;
}

const mockInventory: InvItem[] = [
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
    image_url: "/img/addidas samba.jpg"
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
    image_url: "/img/Adidas sakura zip up hoodie.jpg"
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
    image_url: "/img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg"
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
    image_url: "/img/#balanciagatrack#thug 🥷🏿.jpg"
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
    image_url: "/img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg"
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
    image_url: "/img/gucci-sneaker.jpg"
  },
  {
    id: 107,
    name: "Áo Khoác Oversized Ripped Balenciaga",
    category: "Thời Trang Streetwear & Áo Khoác",
    sku: "BL-00107",
    barcode: "8938501239108",
    variants: "Size M, L, XL",
    available_stock: 0,
    reserved_stock: 0,
    threshold: 5,
    status: "OUT_OF_STOCK",
    status_text: "Hết Hàng",
    cost_price: 18500000,
    retail_price: 32000000,
    image_url: "/img/Oversized ripped balenciaga jacket.jpg"
  }
];

export default function InventoryPage() {
  const [inventoryList, setInventoryList] = useState<InvItem[]>(mockInventory);
  const [activeTab, setActiveTab] = useState<'ALL' | 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [restockTarget, setRestockTarget] = useState<InvItem | null>(null);
  const [restockQty, setRestockQty] = useState(25);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredItems = useMemo(() => {
    let list = [...inventoryList];
    if (activeTab !== 'ALL') {
      list = list.filter((item) => item.status === activeTab);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.sku.toLowerCase().includes(q) ||
          i.barcode.toLowerCase().includes(q)
      );
    }
    return list;
  }, [inventoryList, activeTab, searchTerm]);

  const totalStock = inventoryList.reduce((sum, item) => sum + item.available_stock, 0);
  const lowStockCount = inventoryList.filter((item) => item.status === 'LOW_STOCK').length;
  const totalValue = inventoryList.reduce((sum, item) => sum + item.available_stock * item.cost_price, 0);

  const handleRestockSubmit = () => {
    if (!restockTarget) return;
    setInventoryList((prev) =>
      prev.map((item) => {
        if (item.id === restockTarget.id) {
          const newQty = item.available_stock + restockQty;
          return {
            ...item,
            available_stock: newQty,
            status: newQty > item.threshold ? 'IN_STOCK' : 'LOW_STOCK',
            status_text: newQty > item.threshold ? 'Còn Hàng' : 'Sắp Hết'
          };
        }
        return item;
      })
    );
    showToast(`Đã nhập thêm +${restockQty} sản phẩm cho ${restockTarget.name}!`);
    setRestockTarget(null);
  };

  return (
    <main className="inventory-container">
      {/* PAGE HEADER */}
      <div className="inv-page-header">
        <div className="inv-header-titles">
          <h1>Quản Lý Tồn Kho & Hàng Hóa</h1>
          <p>Kiểm soát lượng tồn khả dụng, phân bổ theo size/biến thể và cảnh báo an toàn kho bãi</p>
        </div>

        <div className="inv-header-actions">
          <button className="btn-clean-secondary" onClick={() => setRestockTarget(inventoryList[0])}>
            + Nhập Hàng Mới
          </button>
          <button
            className="btn-clean-primary"
            onClick={() => showToast('Đã tải xuống file Excel báo cáo kiểm kê kho!')}
          >
            Xuất Báo Cáo Kho
          </button>
        </div>
      </div>

      {/* KPI STATS CARDS */}
      <div className="inv-kpi-grid">
        <div className="inv-kpi-card">
          <span className="label">Tổng Mã SKU</span>
          <span className="num">{inventoryList.length}</span>
          <span className="sub" style={{ color: '#64748B' }}>
            Đang hoạt động trên sàn
          </span>
        </div>
        <div className="inv-kpi-card">
          <span className="label">Tổng Hàng Lưu Kho</span>
          <span className="num">{totalStock.toLocaleString('vi-VN')}</span>
          <span className="sub" style={{ color: '#64748B' }}>
            Chiếc sản phẩm thực tế
          </span>
        </div>
        <div className="inv-kpi-card warning-card">
          <span className="label">Cảnh Báo Tồn Thấp</span>
          <span className="num" style={{ color: '#D97706' }}>
            {lowStockCount}
          </span>
          <span className="sub" style={{ color: '#D97706' }}>
            Cần lên đơn nhập thêm
          </span>
        </div>
        <div className="inv-kpi-card asset-card">
          <span className="label">Tổng Trị Giá Tồn Kho</span>
          <span className="num" style={{ color: '#10B981', fontSize: '1.45rem' }}>
            {totalValue.toLocaleString('vi-VN')} đ
          </span>
          <span className="sub">Định giá theo giá vốn COGS</span>
        </div>
      </div>

      {/* FILTER & TABS */}
      <div className="inv-filter-bar">
        <div className="inv-tabs">
          <button
            className={`inv-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
          >
            Tất Cả ({inventoryList.length})
          </button>
          <button
            className={`inv-tab-btn ${activeTab === 'IN_STOCK' ? 'active' : ''}`}
            onClick={() => setActiveTab('IN_STOCK')}
          >
            Còn Hàng ({inventoryList.filter((i) => i.status === 'IN_STOCK').length})
          </button>
          <button
            className={`inv-tab-btn ${activeTab === 'LOW_STOCK' ? 'active' : ''}`}
            onClick={() => setActiveTab('LOW_STOCK')}
          >
            Sắp Hết ({lowStockCount})
          </button>
          <button
            className={`inv-tab-btn ${activeTab === 'OUT_OF_STOCK' ? 'active' : ''}`}
            onClick={() => setActiveTab('OUT_OF_STOCK')}
          >
            Hết Hàng ({inventoryList.filter((i) => i.status === 'OUT_OF_STOCK').length})
          </button>
        </div>

        <div className="inv-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            id="inv-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm tên, SKU, Barcode..."
          />
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="inv-table-wrap">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Mã SKU</th>
              <th>Mã Vạch</th>
              <th>Biến Thể</th>
              <th>Khả Dụng</th>
              <th>Đang Giữ</th>
              <th>Ngưỡng</th>
              <th>Tình Trạng</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody id="inv-table-body">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="inv-prod-cell">
                    <img
                      className="inv-prod-thumb"
                      src={item.image_url}
                      alt={item.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/addidas samba.jpg';
                      }}
                    />
                    <div className="inv-prod-info">
                      <strong>{item.name}</strong>
                      <span>{item.category}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="inv-sku-badge">{item.sku}</span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{item.barcode}</td>
                <td>{item.variants}</td>
                <td style={{ fontWeight: 800 }}>{item.available_stock}</td>
                <td style={{ color: '#64748B' }}>{item.reserved_stock}</td>
                <td style={{ color: '#64748B' }}>{item.threshold}</td>
                <td>
                  <span
                    className={`status-pill ${
                      item.status === 'IN_STOCK' ? 'in-stock' : item.status === 'LOW_STOCK' ? 'low-stock' : 'out-of-stock'
                    }`}
                  >
                    {item.status_text}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-action-restock"
                    onClick={() => setRestockTarget(item)}
                  >
                    + Nhập Thêm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QUICK RESTOCK MODAL */}
      {restockTarget && (
        <div
          id="restock-modal"
          className="restock-modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setRestockTarget(null);
          }}
        >
          <div className="restock-modal-card">
            <h3 id="restock-modal-prod-title">Nhập Thêm Kho: {restockTarget.name}</h3>
            <p id="restock-modal-curr-stock">Tồn kho hiện tại: {restockTarget.available_stock} chiếc</p>

            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 750,
                marginBottom: '8px',
                color: 'var(--text-muted)'
              }}
            >
              Số lượng sản phẩm nhập thêm:
            </label>
            <input
              type="number"
              id="restock-qty-input"
              className="restock-input-field"
              value={restockQty}
              min="1"
              onChange={(e) => setRestockQty(Number(e.target.value))}
            />

            <div className="restock-modal-actions">
              <button className="btn-clean-secondary" onClick={() => setRestockTarget(null)}>
                Hủy Bỏ
              </button>
              <button className="btn-clean-primary" onClick={handleRestockSubmit}>
                Xác Nhận Nhập Kho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#0F172A',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '9999px',
            zIndex: 99999,
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          {toastMsg}
        </div>
      )}
    </main>
  );
}
