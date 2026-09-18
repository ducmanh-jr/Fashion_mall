'use client';

import React, { useState, useMemo } from 'react';
import { fallbackProducts } from '@/lib/mock-data';
import { Product } from '@/types';

export default function HomePage() {
  const [products] = useState<Product[]>(fallbackProducts);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [quickFilterType, setQuickFilterType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Cart & Modals
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [activeDrawerProduct, setActiveDrawerProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' đ';
  };

  // Filter & sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (categoryFilter) {
      list = list.filter((p) => p.categoryId.toString() === categoryFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      list = list.filter((p) => p.basePrice >= Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      list = list.filter((p) => p.basePrice <= Number(maxPrice));
    }

    if (quickFilterType === 'bestseller') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (quickFilterType === 'discount') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortOrder === 'price_asc') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortOrder === 'price_desc') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else {
      list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [products, categoryFilter, searchTerm, minPrice, maxPrice, quickFilterType, sortOrder]);

  const addToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);

  const resetFilters = () => {
    setCategoryFilter('');
    setQuickFilterType('');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('newest');
    setSearchTerm('');
  };

  return (
    <>
      {/* PAGE STACK SECTION 1: FULL SCREEN HERO LANDING PAGE */}
      <section className="page-section hero-section" id="hero">
        <div className="hero-backdrop">
          <h1 className="hero-watermark">AETHELGARD</h1>
        </div>

        <div className="hero-content-wrapper">
          <h2 className="hero-tagline">Give All You Need</h2>
          <p className="hero-subtitle">Khám phá bộ sưu tập thời trang, sneaker & phụ kiện cao cấp tích hợp AI</p>

          {/* SEARCH BAR FLOATING CARD */}
          <div className="search-floating-card">
            <div className="search-box">
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search on Aethelgard Mall..."
                aria-label="Tìm kiếm sản phẩm"
              />
              <button
                id="search-btn"
                className="btn-search"
                onClick={() => {
                  const el = document.getElementById('catalog');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Search
              </button>
            </div>
          </div>

          <div
            className="scroll-down-indicator"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const el = document.getElementById('catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Cuộn xuống khám phá sản phẩm</span>
            <div className="scroll-arrow">&darr;</div>
          </div>
        </div>
      </section>

      {/* HOME SECTION: CATALOG & FILTERS */}
      <section className="page-section shop-section" id="catalog">
        <main className="main-layout">
          {/* SIDEBAR FILTERS */}
          <aside className="sidebar-filters">
            <div className="sidebar-header">
              <h3>Category</h3>
            </div>

            {/* Category Select Filter Dropdown */}
            <div className="filter-group">
              <label htmlFor="category-select" className="filter-label">
                Danh Mục Sản Phẩm
              </label>
              <select
                id="category-select"
                className="form-control"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Product (20)</option>
                <option value="1">Giày Sneaker & Thể Thao</option>
                <option value="2">Thời Trang Streetwear & Áo Khoác</option>
                <option value="3">Quần & Phụ Kiện Thời Trang</option>
                <option value="4">Gia Dụng & Đời Sống</option>
              </select>
            </div>

            {/* Category Clean Text Subnav */}
            <ul className="category-subnav">
              <li
                className={`subnav-item ${categoryFilter === '' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('')}
                style={{ cursor: 'pointer' }}
              >
                <span>All Product</span>
                <span className="count-tag">20</span>
              </li>
              <li
                className={`subnav-item ${categoryFilter === '1' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('1')}
                style={{ cursor: 'pointer' }}
              >
                <span>Sneakers & Shoes</span>
              </li>
              <li
                className={`subnav-item ${categoryFilter === '2' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('2')}
                style={{ cursor: 'pointer' }}
              >
                <span>Streetwear & Jackets</span>
              </li>
              <li
                className={`subnav-item ${categoryFilter === '3' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('3')}
                style={{ cursor: 'pointer' }}
              >
                <span>Pants & Accessories</span>
              </li>
              <li
                className={`subnav-item ${categoryFilter === '4' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('4')}
                style={{ cursor: 'pointer' }}
              >
                <span>Home & Living</span>
              </li>
            </ul>

            <div className="filter-divider"></div>

            {/* Quick Filter Nav */}
            <div className="quick-nav-links">
              <a
                href="javascript:void(0)"
                className={`quick-link ${quickFilterType === 'newest' ? 'font-bold' : ''}`}
                onClick={() => {
                  setQuickFilterType('newest');
                  setSortOrder('newest');
                }}
              >
                New Arrival
              </a>
              <a
                href="javascript:void(0)"
                className={`quick-link ${quickFilterType === 'bestseller' ? 'font-bold' : ''}`}
                onClick={() => setQuickFilterType('bestseller')}
              >
                Best Seller
              </a>
              <a
                href="javascript:void(0)"
                className={`quick-link ${quickFilterType === 'discount' ? 'font-bold' : ''}`}
                onClick={() => setQuickFilterType('discount')}
              >
                On Discount
              </a>
            </div>

            <div className="filter-divider"></div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label className="filter-label">Khoảng Giá (VNĐ)</label>
              <div className="price-inputs">
                <input
                  type="number"
                  id="min-price"
                  placeholder="Từ giá"
                  min="0"
                  className="form-control"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  id="max-price"
                  placeholder="Đến giá"
                  min="0"
                  className="form-control"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label htmlFor="sort-select" className="filter-label">
                Sắp Xếp Theo
              </label>
              <select
                id="sort-select"
                className="form-control"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Hàng mới nhất</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
              </select>
            </div>

            <button id="reset-filters-btn" className="btn-secondary btn-full" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          {/* PRODUCT CATALOG DISPLAY */}
          <section className="catalog-section">
            <div className="catalog-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 id="catalog-title">Danh Sách Sản Phẩm Aethelgard Mall</h2>
                <span id="results-count" className="results-tag">
                  Hiển thị {filteredProducts.length} sản phẩm
                </span>
              </div>
              <button
                className="btn-cart"
                onClick={() => setIsCartOpen(true)}
                style={{ padding: '8px 16px', borderRadius: '9999px', background: '#F1F5F9', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                🛒 Giỏ hàng <span className="badge" style={{ background: '#EF4444', color: '#fff', padding: '2px 8px', borderRadius: '9999px', fontSize: '0.75rem' }}>{totalCartQty}</span>
              </button>
            </div>

            <div id="product-grid" className="product-grid">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  onClick={() => setActiveDrawerProduct(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-card-top">
                    <span className="category-tag-top">{p.categoryName}</span>
                    {p.discountPercent && p.discountPercent > 0 && (
                      <span style={{ background: '#EF4444', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                        -{p.discountPercent}%
                      </span>
                    )}
                  </div>
                  <div className="product-img-box">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/addidas samba.jpg';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{p.name}</h3>
                    <div className="product-rating-row">
                      <span>★ {p.rating || 5.0}</span>
                      <span className="review-count">({p.reviewCount || 40} Reviews)</span>
                    </div>
                    <div className="product-price-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="price-amount">{formatVND(p.basePrice)}</span>
                      <button
                        onClick={(e) => addToCart(p, e)}
                        style={{ padding: '4px 10px', background: '#8065c9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        + Giỏ
                      </button>
                    </div>
                    <div className="product-seller-footer">
                      <span className="card-sku-code">SKU: {p.sku}</span>
                      <span className="card-seller-cta">Dữ liệu người bán &rarr;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION CONTROL BAR */}
            <div className="pagination-bar">
              <button className="pagination-btn pagination-prev">&larr; Previous</button>
              <div className="pagination-numbers">
                <span className="page-num active">1</span>
                <span className="page-num">2</span>
                <span className="page-num">3</span>
                <span className="page-dots">...</span>
                <span className="page-num">8</span>
                <span className="page-num">9</span>
                <span className="page-num">10</span>
              </div>
              <button className="pagination-btn pagination-next">Next &rarr;</button>
            </div>
          </section>
        </main>
      </section>

      {/* HOME SECTION: RECOMMENDATIONS CAROUSEL */}
      <section className="page-section recommendations-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Explore our recommendations</h2>
            <div className="carousel-controls">
              <button className="carousel-btn" onClick={() => showToast('Hiển thị sản phẩm trước')}>
                &larr;
              </button>
              <button className="carousel-btn" onClick={() => showToast('Hiển thị sản phẩm tiếp theo')}>
                &rarr;
              </button>
            </div>
          </div>

          <div id="recommendations-grid" className="recommendations-grid">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="product-card"
                onClick={() => setActiveDrawerProduct(p)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-card-top">
                  <span className="category-tag-top">{p.categoryName}</span>
                </div>
                <div className="product-img-box">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/img/addidas samba.jpg';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{p.name}</h3>
                  <div className="product-rating-row">
                    <span>★ 5.0</span>
                    <span className="review-count">(1.2k Reviews)</span>
                  </div>
                  <div className="product-price-row">
                    <span className="price-amount">{formatVND(p.basePrice)}</span>
                  </div>
                  <div className="product-seller-footer">
                    <span className="card-sku-code">SKU: {p.sku}</span>
                    <span className="card-seller-cta">Dữ liệu người bán &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE STACK SECTION 4: NEWSLETTER BANNER */}
      <section className="page-section newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <h2 className="newsletter-heading">Ready to Get Our New Stuff?</h2>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Cảm ơn bạn đã đăng ký nhận bản tin!');
              }}
            >
              <input
                type="email"
                required
                placeholder="Your Email"
                aria-label="Email subscription"
                className="newsletter-input"
              />
              <button type="submit" className="btn-newsletter-send">
                Send
              </button>
            </form>
          </div>
          <div className="newsletter-subtext">
            <p className="brand-subtext-bold">SE.Bus for Homes and Needs</p>
            <p>
              We&apos;ll listen to your needs, identify the best approach, and then create a bespoke smart EV charging
              solution that&apos;s right for you.
            </p>
          </div>
        </div>
      </section>

      {/* CART MODAL */}
      <div id="cart-modal" className={`modal-backdrop ${isCartOpen ? '' : 'hidden'}`}>
        <div className="modal-card">
          <div className="modal-header">
            <h2>Giỏ Hàng Của Bạn</h2>
            <button id="close-cart-btn" className="close-btn" onClick={() => setIsCartOpen(false)}>
              &times;
            </button>
          </div>

          <div id="cart-items-container" className="cart-items-list" style={{ maxHeight: '350px', overflowY: 'auto' }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>Giỏ hàng của bạn đang trống.</p>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #E2E8F0' }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{product.name}</div>
                    <div style={{ color: '#8065c9', fontWeight: 700, fontSize: '0.85rem' }}>{formatVND(product.basePrice)}</div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>SL: {quantity}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Xóa
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Tổng số lượng:</span>
              <strong id="modal-cart-qty">{totalCartQty} món</strong>
            </div>
            <div className="summary-row grand-total">
              <span>Tổng tiền:</span>
              <strong id="modal-cart-total" className="accent-price">
                {formatVND(totalCartAmount)}
              </strong>
            </div>
          </div>

          <div className="modal-actions">
            <button id="clear-cart-btn" className="btn-secondary" onClick={() => setCart([])}>
              Xóa tất cả
            </button>
            <button
              id="proceed-checkout-btn"
              className="btn-primary"
              onClick={() => {
                if (cart.length === 0) {
                  showToast('Giỏ hàng trống!');
                  return;
                }
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      <div id="checkout-modal" className={`modal-backdrop ${isCheckoutOpen ? '' : 'hidden'}`}>
        <div className="modal-card">
          <div className="modal-header">
            <h2>Thanh Toán Đơn Hàng</h2>
            <button id="close-checkout-btn" className="close-btn" onClick={() => setIsCheckoutOpen(false)}>
              &times;
            </button>
          </div>

          <form
            id="checkout-form"
            className="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Aethelgard Mall.');
              setCart([]);
              setIsCheckoutOpen(false);
            }}
          >
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="shipping-address">Địa chỉ giao hàng (*)</label>
              <textarea
                id="shipping-address"
                required
                placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành..."
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label htmlFor="order-note">Ghi chú đơn hàng (Tùy chọn)</label>
              <input
                type="text"
                id="order-note"
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi tới..."
                className="form-control"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Phương thức thanh toán</label>
              <div className="radio-group" style={{ marginTop: 8 }}>
                <label className="radio-card" style={{ display: 'flex', gap: 10, padding: 12, border: '1px solid #E2E8F0', borderRadius: 8, marginBottom: 8, cursor: 'pointer' }}>
                  <input type="radio" name="payment_method" value="COD" defaultChecked />
                  <div className="radio-content">
                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Trả tiền mặt trực tiếp cho shipper khi nhận hàng</p>
                  </div>
                </label>

                <label className="radio-card" style={{ display: 'flex', gap: 10, padding: 12, border: '1px solid #E2E8F0', borderRadius: 8, cursor: 'pointer' }}>
                  <input type="radio" name="payment_method" value="ONLINE" />
                  <div className="radio-content">
                    <strong>Thanh toán trực tuyến (Online Gateway)</strong>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Thanh toán qua cổng hệ thống (Xác nhận tự động)</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="checkout-footer" style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
              <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span>Tổng thanh toán:</span>
                <strong id="checkout-total" className="accent-price" style={{ fontSize: '1.2rem', color: '#8065c9' }}>
                  {formatVND(totalCartAmount)}
                </strong>
              </div>
              <button type="submit" className="btn-primary btn-large" style={{ width: '100%', padding: '12px', background: '#8065c9', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                Xác Nhận Đặt Hàng
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SELLER DUAL-PANEL SLIDING DRAWER */}
      {activeDrawerProduct && (
        <div id="seller-product-drawer" className="seller-dual-drawer-backdrop active" aria-hidden="false">
          <div className="seller-drawer-wrapper">
            {/* SECONDARY PANEL (LEFT): QUẢN LÝ KHO, BIẾN THỂ & VẬN HÀNH */}
            <div className="seller-panel seller-panel-secondary" id="seller-panel-secondary">
              <div className="seller-panel-header">
                <div className="seller-header-badge-group">
                  <span className="badge-portal">KHO VẬN & VẬN HÀNH</span>
                  <span className="badge-active-status" id="sec-panel-status">
                    Đang phân phối
                  </span>
                </div>
              </div>

              <div className="seller-panel-body">
                {/* Tồn kho & Cảnh báo */}
                <div className="seller-section-box">
                  <div className="seller-section-title">
                    Kiểm Soát Tồn Kho
                    <span className="extra-info" id="sec-inv-location">
                      Kho Tổng: Hà Nội Hub
                    </span>
                  </div>
                  <div className="inventory-stats-grid">
                    <div className="inv-stat-card avail">
                      <div className="inv-val" id="sec-stock-available">
                        {activeDrawerProduct.stockQuantity}
                      </div>
                      <div className="inv-sub">Khả dụng</div>
                    </div>
                    <div className="inv-stat-card">
                      <div className="inv-val" id="sec-stock-reserved">
                        3
                      </div>
                      <div className="inv-sub">Đang giữ giỏ</div>
                    </div>
                    <div className="inv-stat-card">
                      <div className="inv-val" id="sec-stock-threshold">
                        10
                      </div>
                      <div className="inv-sub">Ngưỡng báo động</div>
                    </div>
                  </div>
                </div>

                {/* Bảng ma trận biến thể */}
                <div className="seller-section-box">
                  <div className="seller-section-title">
                    Ma Trận Phân Loại & Biến Thể
                    <span className="extra-info">3 kích cỡ</span>
                  </div>
                  <div className="variants-table-wrap">
                    <table className="variants-table">
                      <thead>
                        <tr>
                          <th>Phân Loại</th>
                          <th>Mã SKU</th>
                          <th>Tồn Kho</th>
                          <th>Giá Bán</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Size 39 / S</td>
                          <td>{activeDrawerProduct.sku}-39</td>
                          <td>15</td>
                          <td>{formatVND(activeDrawerProduct.basePrice)}</td>
                        </tr>
                        <tr>
                          <td>Size 40 / M</td>
                          <td>{activeDrawerProduct.sku}-40</td>
                          <td>20</td>
                          <td>{formatVND(activeDrawerProduct.basePrice)}</td>
                        </tr>
                        <tr>
                          <td>Size 41 / L</td>
                          <td>{activeDrawerProduct.sku}-41</td>
                          <td>10</td>
                          <td>{formatVND(activeDrawerProduct.basePrice)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="seller-drawer-actions">
                <button
                  className="btn-seller-secondary"
                  onClick={() => showToast(`Đã ghi nhận yêu cầu nhập thêm kho cho ${activeDrawerProduct.name}`)}
                >
                  + Nhập Thêm Kho Hàng
                </button>
              </div>
            </div>

            {/* PRIMARY PANEL (RIGHT): THÔNG TIN SẢN PHẨM & TÀI CHÍNH LỢI NHUẬN */}
            <div className="seller-panel seller-panel-primary" id="seller-panel-primary">
              <div className="seller-panel-header">
                <div className="seller-header-badge-group">
                  <span className="badge-portal">DỮ LIỆU NGƯỜI BÁN</span>
                  <span className="badge-active-status" id="pri-panel-status">
                    Đang Bán (Active)
                  </span>
                </div>
                <button
                  className="btn-drawer-close"
                  id="btn-close-seller-drawer"
                  title="Đóng bảng chi tiết"
                  onClick={() => setActiveDrawerProduct(null)}
                >
                  &times;
                </button>
              </div>

              <div className="seller-panel-body">
                {/* Hero overview */}
                <div className="seller-product-hero">
                  <div className="seller-hero-img-box">
                    <img id="pri-product-img" src={activeDrawerProduct.imageUrl} alt={activeDrawerProduct.name} />
                  </div>
                  <div className="seller-hero-meta">
                    <div className="seller-hero-identifiers">
                      <span className="brand-badge-pill" id="pri-brand-name">
                        AETHELGARD
                      </span>
                      <span className="sku-tag" id="pri-sku-code">
                        SKU: {activeDrawerProduct.sku}
                      </span>
                    </div>
                    <h3 id="pri-product-title">{activeDrawerProduct.name}</h3>
                    <p className="seller-category-crumb" id="pri-category-crumb">
                      {activeDrawerProduct.categoryName}
                    </p>
                  </div>
                </div>

                {/* Giá cả & Lợi nhuận */}
                <div className="seller-section-box">
                  <div className="seller-section-title">
                    Giá Cả & Phân Tích Lợi Nhuận
                    <span className="extra-info">Tỷ suất biên ròng</span>
                  </div>

                  <div className="seller-pricing-grid">
                    <div className="seller-price-stat">
                      <span className="stat-label">Giá bán lẻ (Retail)</span>
                      <span className="stat-val" id="pri-retail-price">
                        {formatVND(activeDrawerProduct.basePrice)}
                      </span>
                    </div>
                    <div className="seller-price-stat">
                      <span className="stat-label">Giá niêm yết gốc</span>
                      <span className="stat-val subtext-strike" id="pri-original-price">
                        {formatVND(activeDrawerProduct.originalPrice || activeDrawerProduct.basePrice * 1.15)}
                      </span>
                    </div>
                    <div className="seller-price-stat">
                      <span className="stat-label">Giá vốn nhập (COGS)</span>
                      <span className="stat-val" id="pri-cost-price" style={{ color: '#475569' }}>
                        {formatVND(Math.round(activeDrawerProduct.basePrice * 0.6))}
                      </span>
                    </div>
                    <div className="seller-price-stat highlight-profit">
                      <span className="stat-label">Biên Lợi Nhuận Ròng</span>
                      <span className="stat-val profit-rate" id="pri-profit-margin">
                        +38.5%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mô tả */}
                <div className="seller-section-box">
                  <div className="seller-section-title">Mô Tả Sản Phẩm</div>
                  <p id="pri-product-desc" style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#475569' }}>
                    {activeDrawerProduct.description}
                  </p>
                </div>
              </div>

              <div className="seller-drawer-actions">
                <a
                  id="pri-btn-view-customer"
                  href={`/product-detail/${activeDrawerProduct.id}`}
                  className="btn-seller-primary"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  Xem Trang Sản Phẩm Khách Hàng &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
            zIndex: 99999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
