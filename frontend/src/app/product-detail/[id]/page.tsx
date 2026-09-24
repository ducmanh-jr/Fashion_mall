'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ProductData {
  id: string;
  title: string;
  category: string;
  priceCurrent: string;
  priceOriginal: string;
  discount: string;
  shortDesc: string;
  images: { src: string; alt: string }[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: string;
  ratingScore: string;
  reviewCount: number;
  material?: string;
  countryOfOrigin?: string;
  careInstructions?: string;
  packagingDetails?: string;
  storeAvailability?: { storeName: string; city: string; stock: number; address: string }[];
}

const productDatabase: Record<string, ProductData> = {
  '1': {
    id: '1',
    title: 'Gucci Luxury Signature Casual Sneaker Authentic Italian Edition',
    category: 'Footwear & Luxury Sneakers • Gucci Signature',
    priceCurrent: '5.200.000₫',
    priceOriginal: '5.800.000₫',
    discount: '10% OFF',
    shortDesc: 'Giày sneaker da cao cấp nhập khẩu từ Ý, thiết kế dải ruy băng Web xanh-đỏ kinh điển, đế cao su chống trơn trượt cùng lót đệm êm ái tuyệt đối.',
    images: [
      { src: '/img/products/gucci-sneaker.jpg', alt: 'Angle 1 - Gucci Sneaker' },
      { src: '/img/products/adidas-samba.jpg', alt: 'Angle 2 - Samba Alternative' },
      { src: "/img/products/nike-summer-sneaker.jpg", alt: 'Angle 3 - Sneaker Collection' },
      { src: '/img/products/fashion-mood-board.jpg', alt: 'Angle 4 - Moodboard' }
    ],
    colors: [
      { name: 'Pure White & Web', hex: '#F8FAFC' },
      { name: 'Onyx Black', hex: '#111827' }
    ],
    sizes: ['39 EU', '40 EU', '41 EU', '42 EU', '43 EU'],
    rating: '★★★★★',
    ratingScore: '5.0',
    reviewCount: 620
  },
  '2': {
    id: '2',
    title: 'Gucci Runway Vintage Monogram Heritage Jacket Limited Edition',
    category: 'Outerwear & Heritage Jackets • Gucci Runway',
    priceCurrent: '8.650.000₫',
    priceOriginal: '10.200.000₫',
    discount: '15% OFF',
    shortDesc: 'Áo khoác Vintage Monogram thuộc bộ sưu tập Runway phiên bản giới hạn, chất liệu cao cấp dệt họa tiết GG tinh xảo.',
    images: [
      { src: '/img/products/gucci-runway.jpg', alt: 'Angle 1 - Runway Jacket' },
      { src: '/img/products/balenciaga-ripped-jacket.jpg', alt: 'Angle 2 - Denim Jacket' },
      { src: '/img/products/sample-velora.jpg', alt: 'Angle 3 - Hoodie' },
      { src: '/img/products/fashion-mood-board.jpg', alt: 'Angle 4 - Fabric Detail' }
    ],
    colors: [
      { name: 'Classic Monogram Brown', hex: '#78350F' },
      { name: 'Heritage Charcoal', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: '★★★★★',
    ratingScore: '5.0',
    reviewCount: 340
  },
  '3': {
    id: '3',
    title: 'Essential Heavyweight Oversized Hoodie',
    category: 'Streetwear & Hoodies • Essentials',
    priceCurrent: '1.450.000₫',
    priceOriginal: '2.150.000₫',
    discount: '33% OFF',
    shortDesc: 'Áo hoodie phom rộng phong cách Oversized Streetwear cao cấp, dệt từ sợi Cotton French Terry 450 GSM dày dặn, đứng form chuẩn Châu Âu, giữ ấm vượt trội và mang lại cảm giác mềm mại tối đa khi vận động.',
    images: [
      { src: '/img/products/sample-velora.jpg', alt: 'Angle 1 - Model Front' },
      { src: '/img/products/adidas-sakura-hoodie.jpg', alt: 'Angle 2 - Product Flat' },
      { src: '/img/products/balenciaga-ripped-jacket.jpg', alt: 'Angle 3 - Styling' },
      { src: '/img/products/fashion-mood-board.jpg', alt: 'Angle 4 - Fabric Detail' }
    ],
    colors: [
      { name: 'Charcoal Gray', hex: '#374151' },
      { name: 'Vintage Ash Gray', hex: '#9CA3AF' },
      { name: 'Raw Cream', hex: '#E5E0D8' },
      { name: 'Deep Onyx Black', hex: '#111827' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: '★★★★★',
    ratingScore: '4.8',
    reviewCount: 128
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const idStr = String(params?.id || '1');
  const initialProd = productDatabase[idStr] || {
    ...productDatabase['1'],
    id: idStr
  };
  const [prod, setProd] = useState<ProductData>(initialProd);

  const [activeImage, setActiveImage] = useState(prod.images[0].src);
  const [activeColor, setActiveColor] = useState(prod.colors[0].name);
  const [activeSize, setActiveSize] = useState(prod.sizes[1] || prod.sizes[0]);
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'sizefit' | 'shipping'>('details');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 25 });

  useEffect(() => {
    if (idStr) {
      fetch(`http://localhost:5000/api/products/${idStr}`)
        .then((res) => {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        })
        .then((p) => {
          if (p && p.name) {
            const rawGallery = p.galleryUrls && p.galleryUrls.length > 0 ? p.galleryUrls : [p.imageUrl || '/img/products/sample-velora.jpg'];
            const imgs = rawGallery.map((src: string, i: number) => ({
              src,
              alt: `${p.name} - Chi tiết ${i + 1}`
            }));
            const realProd: ProductData = {
              id: String(p.id),
              title: p.name,
              category: `${p.categoryName || 'Thời Trang'} • ${p.collectionName || 'Chính Hãng'}`,
              priceCurrent: (p.basePrice || 0).toLocaleString('vi-VN') + '₫',
              priceOriginal: (p.originalPrice || Math.round((p.basePrice || 0) * 1.15)).toLocaleString('vi-VN') + '₫',
              discount: p.discountPercent ? `${p.discountPercent}% OFF` : '10% OFF',
              shortDesc: p.description || 'Sản phẩm cao cấp phân phối chính hãng tại Aethelgard Shopping Mall.',
              images: imgs,
              colors: [
                { name: 'Bản Tiêu Chuẩn', hex: '#111827' },
                { name: 'Bản Giới Hạn Limited', hex: '#6366F1' }
              ],
              sizes: p.variants && p.variants.length > 0
                ? p.variants.map((v: any) => v.size || 'Freesize')
                : ['39 EU', '40 EU', '41 EU', '42 EU'],
              rating: '★★★★★',
              ratingScore: String(p.rating || '4.9'),
              reviewCount: p.reviewCount || 128,
              material: p.material || '100% Da bê non Ý Calfskin nguyên tấm, lót lụa Mulberry Silk',
              countryOfOrigin: p.countryOfOrigin || 'Made in Italy',
              careInstructions: p.careInstructions || 'Vệ sinh chuyên dụng bằng khăn mềm khô. Tránh nhiệt độ cao và độ ẩm.',
              packagingDetails: p.packagingDetails || 'Hộp cứng nắp nam châm Aethelgard Signature Box, túi vải dustbag, thẻ bảo hành NFC',
              storeAvailability: [
                { storeName: 'Boutique Tràng Tiền Plaza', city: 'Hà Nội', stock: Math.floor((p.stockQuantity || 25) * 0.45) || 5, address: 'Tầng 1 & 2, Tràng Tiền Plaza, 24 Hai Bà Trưng, Hà Nội' },
                { storeName: 'Boutique Sheraton Saigon', city: 'TP. Hồ Chí Minh', stock: Math.floor((p.stockQuantity || 25) * 0.35) || 4, address: 'Khách sạn Sheraton Saigon, 88 Đồng Khởi, Quận 1' },
                { storeName: 'Boutique Union Square', city: 'TP. Hồ Chí Minh', stock: Math.floor((p.stockQuantity || 25) * 0.20) || 2, address: 'Union Square, 171 Đồng Khởi, Bến Nghé, Quận 1' }
              ]
            };
            setProd(realProd);
            setActiveImage(realProd.images[0].src);
            setActiveColor(realProd.colors[0].name);
            setActiveSize(realProd.sizes[0]);
          }
        })
        .catch(() => {});
    }
  }, [idStr]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        return {
          hours: Math.floor(total / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleWishlistToggle = () => {
    const next = !isWishlist;
    setIsWishlist(next);
    showToast(next ? 'Đã thêm vào danh sách yêu thích!' : 'Đã xóa khỏi danh sách yêu thích!');
  };

  const handleAddToCart = () => {
    showToast(`Đã thêm ${qty}x ${prod.title} (${activeColor}, Size ${activeSize}) vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    showToast(`Đang chuyển đến cổng thanh toán cho size ${activeSize}...`);
  };

  const formatTimer = () => {
    const h = String(timeLeft.hours).padStart(2, '0');
    const m = String(timeLeft.minutes).padStart(2, '0');
    const s = String(timeLeft.seconds).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="profile-page-wrapper">
      {/* BREADCRUMBS */}
      <nav className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <Link href="/shop-profile">GUCCI Official Flagship</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{prod.title}</span>
      </nav>

      {/* SECTION 1: PRODUCT HERO SHOWCASE (GALLERY + CONFIGURATION) */}
      <section className="product-hero-grid">
        {/* LEFT: INTERACTIVE GALLERY */}
        <div className="product-gallery-container">
          <div className="thumbnail-strip">
            {prod.images.map((img, i) => (
              <div
                key={i}
                className={`thumb-item ${activeImage === img.src ? 'active' : ''}`}
                onClick={() => setActiveImage(img.src)}
                style={{ cursor: 'pointer' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>

          <div className="main-image-viewport">
            <span className="gallery-badge">New Arrival • 2026 Collection</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="main-product-img" src={activeImage} alt={prod.title} />
            <button
              className="btn-zoom-preview"
              title="Xem chi tiết ảnh"
              onClick={() => showToast('Phóng to chế độ siêu nét 4K')}
              type="button"
            >
              🔍
            </button>
          </div>
        </div>

        {/* RIGHT: PRODUCT BUY BOX & CONFIGURATION */}
        <div className="product-config-panel">
          {/* SELLER SHOP MINI CARD */}
          <div
            className="seller-mini-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F8FAFC',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#0F172A',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1rem'
                }}
              >
                GG
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>GUCCI Official Store</span>
                  <span
                    style={{
                      background: '#DC2626',
                      color: 'white',
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    FLAGSHIP
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                  5.0 ★ (68.4k đánh giá) • 📍 2 Boutique Hà Nội & TP.HCM
                </div>
              </div>
            </div>
            <Link
              href="/shop-profile"
              style={{
                padding: '8px 16px',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 700,
                fontSize: '0.82rem',
                color: 'var(--text-main)',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              Xem Gian Hàng →
            </Link>
          </div>

          <span className="category-tag-pill">{prod.category}</span>
          <h1 className="product-detail-title">{prod.title}</h1>

          {/* Ratings & Reviews Count */}
          <div className="product-rating-badge-row">
            <span className="stars-gold">{prod.rating}</span>
            <span className="rating-score-text">{prod.ratingScore}</span>
            <a href="#reviews-anchor" className="reviews-counter-link">
              ({prod.reviewCount} đánh giá từ khách hàng)
            </a>
          </div>

          {/* Pricing */}
          <div className="product-price-block">
            <span className="price-current">{prod.priceCurrent}</span>
            <span className="price-original">{prod.priceOriginal}</span>
            <span className="discount-badge-pill">{prod.discount}</span>
          </div>

          {/* Fast Delivery Countdown */}
          <div className="delivery-countdown-box">
            <span>
              ⚡ Đặt hàng trong <span id="flash-timer" className="timer-val">{formatTimer()}</span> để nhận giao hàng hỏa tốc trong ngày!
            </span>
          </div>

          {/* Short Description */}
          <p className="product-short-summary">{prod.shortDesc}</p>

          {/* Color Picker */}
          <div className="selector-group">
            <div className="selector-header">
              <span>Màu sắc: <strong id="current-color-name">{activeColor}</strong></span>
            </div>
            <div className="color-swatches-list">
              {prod.colors.map((c) => (
                <button
                  key={c.name}
                  className={`color-swatch-btn ${activeColor === c.name ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setActiveColor(c.name)}
                  title={c.name}
                  type="button"
                ></button>
              ))}
            </div>
          </div>

          {/* Size Picker */}
          <div className="selector-group">
            <div className="selector-header">
              <span>Chọn kích cỡ</span>
              <span className="size-guide-link" onClick={() => setActiveTab('sizefit')} style={{ cursor: 'pointer' }}>
                📏 Bảng kích cỡ (Size Guide)
              </span>
            </div>
            <div className="size-options-grid">
              {prod.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${activeSize === s ? 'active' : ''}`}
                  onClick={() => setActiveSize(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons (Add to Cart, Stepper, Wishlist) */}
          <div className="action-buttons-stack">
            <div className="qty-stepper">
              <button
                id="btn-qty-minus"
                className="qty-step-btn"
                onClick={() => setQty(prev => Math.max(1, prev - 1))}
                aria-label="Giảm số lượng"
                type="button"
              >
                -
              </button>
              <span id="qty-display" className="qty-display-val">{qty}</span>
              <button
                id="btn-qty-plus"
                className="qty-step-btn"
                onClick={() => setQty(prev => prev + 1)}
                aria-label="Tăng số lượng"
                type="button"
              >
                +
              </button>
            </div>

            <button
              id="btn-add-cart"
              className="btn-add-to-cart-primary"
              onClick={handleAddToCart}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Thêm Vào Giỏ Hàng</span>
            </button>

            <button
              id="btn-wishlist"
              className={`btn-wishlist-toggle ${isWishlist ? 'active' : ''}`}
              title="Thêm vào danh sách yêu thích"
              onClick={handleWishlistToggle}
              type="button"
            >
              {isWishlist ? '♥' : '♡'}
            </button>
          </div>

          <button
            id="btn-buy-now"
            className="btn-buy-now-accent"
            onClick={handleBuyNow}
            type="button"
          >
            Mua Ngay Với 1 Bước
          </button>

          {/* Trust Badges */}
          <div className="trust-badges-grid">
            <div className="trust-item">
              <div className="trust-icon-title">
                <span>🚚</span>
                <span>Giao Hàng Miễn Phí</span>
              </div>
              <span className="trust-subtext">Đơn hàng từ 500.000₫ toàn quốc</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon-title">
                <span>🔄</span>
                <span>Đổi Trả Dễ Dàng</span>
              </div>
              <span className="trust-subtext">30 ngày đổi size miễn phí tận nơi</span>
            </div>
            <div className="trust-item">
              <div className="trust-icon-title">
                <span>🛡</span>
                <span>Chính Hãng 100%</span>
              </div>
              <span className="trust-subtext">Cam kết chuẩn hàng authentic</span>
            </div>
          </div>

          {/* STORE & BOUTIQUE AVAILABILITY */}
          {prod.storeAvailability && prod.storeAvailability.length > 0 && (
            <div
              style={{
                marginTop: '24px',
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🏬</span>
                  <span>Tình Trạng Có Sẵn Tại Boutique</span>
                </span>
                <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700, background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                  ● Đang mở cửa
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {prod.storeAvailability.map((st, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>
                        {st.storeName} ({st.city})
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        📍 {st.address}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: st.stock > 0 ? '#15803D' : '#DC2626',
                          background: st.stock > 0 ? '#F0FDF4' : '#FEF2F2',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: `1px solid ${st.stock > 0 ? '#BBF7D0' : '#FECACA'}`
                        }}
                      >
                        {st.stock > 0 ? `Còn ${st.stock} chiếc` : 'Tạm hết'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: PRODUCT SPECIFICATIONS & VISUAL TABS */}
      <section className="product-tabs-section">
        <div className="tabs-nav-bar">
          <button
            className={`tab-nav-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
            type="button"
          >
            Chi Tiết Sản Phẩm
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
            type="button"
          >
            Chất Liệu & Bảo Quản
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'sizefit' ? 'active' : ''}`}
            onClick={() => setActiveTab('sizefit')}
            type="button"
          >
            Thông Số Form Dáng
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
            type="button"
          >
            Vận Chuyển & Bảo Hành
          </button>
        </div>

        {/* TAB 1: DETAILS */}
        {activeTab === 'details' && (
          <div id="tab-details" className="tab-pane-content active">
            <div className="tab-split-grid">
              <div>
                <p className="tab-text-lead">
                  Được chế tác từ sợi bông tự nhiên định lượng cao cấp, chiếc áo Essential Oversized Hoodie mang lại trải nghiệm êm ái vượt bậc cùng độ bền vượt thời gian. Thiết kế phom rũ tự nhiên giúp bạn dễ dàng kết hợp layer với áo thun basic hoặc quần jogger cá tính.
                </p>
                <ul className="tab-feature-bullets">
                  <li>
                    <span className="bullet-icon">✓</span>
                    <span><strong>Oversized Drop Shoulder:</strong> Phom vai trễ tạo sự phóng khoáng, che khuyết điểm cơ thể tối đa.</span>
                  </li>
                  <li>
                    <span className="bullet-icon">✓</span>
                    <span><strong>Vải Heavy French Terry 450 GSM:</strong> Mặt ngoài mịn màng, mặt trong dệt vảy cá thoáng khí, giữ nhiệt tốt.</span>
                  </li>
                  <li>
                    <span className="bullet-icon">✓</span>
                    <span><strong>Mũ trùm 2 lớp đứng form:</strong> Thiết kế mũ dày dặn không bị xẹp, kèm dây rút dệt cao cấp bo kim loại khắc chìm.</span>
                  </li>
                  <li>
                    <span className="bullet-icon">✓</span>
                    <span><strong>Túi Kangaroo trước bụng:</strong> Rộng rãi, đường may đôi gia cố chắc chắn chống rách mép.</span>
                  </li>
                  <li>
                    <span className="bullet-icon">✓</span>
                    <span><strong>Phong cách Unisex:</strong> Phù hợp hoàn hảo cho cả nam giới và nữ giới yêu thích thời trang đường phố.</span>
                  </li>
                </ul>
              </div>
              <div className="tab-visual-banner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/products/fashion-mood-board.jpg" alt="Craftsmanship Detail" />
                <div className="tab-visual-overlay">
                  <h4>ESSENTIALS CRAFTSMANSHIP</h4>
                  <p>Dệt nguyên bản 450 GSM Heavy French Terry • Độ bền giặt 500+ chu kỳ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MATERIALS */}
        {activeTab === 'materials' && (
          <div id="tab-materials" className="tab-pane-content active">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>🧵 Thành Phần Chất Liệu</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{prod.material || '100% Chất liệu cao cấp chuẩn kiểm định quốc tế'}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>🌍 Nguồn Gốc Xuất Xứ</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{prod.countryOfOrigin || 'Chế tác thủ công tại Châu Âu'}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>🎁 Quy Cách Đóng Gói</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{prod.packagingDetails || 'Hộp nắp nam châm Signature Box kèm túi bụi lụa'}</div>
              </div>
            </div>

            <p className="tab-text-lead">
              <strong>Hướng dẫn bảo quản & chăm sóc xa xỉ:</strong>
            </p>
            <ul className="tab-feature-bullets">
              <li><span className="bullet-icon">✓</span> {prod.careInstructions || 'Vệ sinh chuyên dụng bằng khăn mềm khô, tránh chất tẩy rửa mạnh.'}</li>
              <li><span className="bullet-icon">✓</span> Tránh tiếp xúc trực tiếp với nước hoa, cồn, dầu và nguồn nhiệt cao quá 40°C.</li>
              <li><span className="bullet-icon">✓</span> Khi không sử dụng, hãy giữ phom sản phẩm bằng giấy định hình và bảo quản trong túi vải chống bụi (dustbag).</li>
              <li><span className="bullet-icon">✓</span> Hỗ trợ dịch vụ làm sạch & phục hồi miễn phí trọn đời tại hệ thống Boutique chính hãng.</li>
            </ul>
          </div>
        )}

        {/* TAB 3: SIZE & FIT */}
        {activeTab === 'sizefit' && (
          <div id="tab-sizefit" className="tab-pane-content active">
            <p className="tab-text-lead">Gợi ý chọn size dựa theo chiều cao và cân nặng chuẩn:</p>
            <ul className="tab-feature-bullets">
              <li><span className="bullet-icon">✓</span> <strong>Size S:</strong> Chiều cao 1m55 - 1m65 | Cân nặng 48kg - 58kg (Vừa vặn thoải mái)</li>
              <li><span className="bullet-icon">✓</span> <strong>Size M:</strong> Chiều cao 1m65 - 1m75 | Cân nặng 58kg - 70kg (Oversized chuẩn)</li>
              <li><span className="bullet-icon">✓</span> <strong>Size L:</strong> Chiều cao 1m72 - 1m80 | Cân nặng 70kg - 82kg (Phom rộng rũ)</li>
              <li><span className="bullet-icon">✓</span> <strong>Size XL/XXL:</strong> Chiều cao trên 1m80 | Cân nặng 82kg - 100kg</li>
            </ul>
          </div>
        )}

        {/* TAB 4: SHIPPING */}
        {activeTab === 'shipping' && (
          <div id="tab-shipping" className="tab-pane-content active">
            <p className="tab-text-lead">Chính sách vận chuyển & đổi trả minh bạch tại Aethelgard Mall:</p>
            <ul className="tab-feature-bullets">
              <li><span className="bullet-icon">✓</span> <strong>Hỏa tốc nội thành:</strong> Giao ngay trong 2-4 tiếng kể từ lúc chốt đơn.</li>
              <li><span className="bullet-icon">✓</span> <strong>Giao hàng tiêu chuẩn toàn quốc:</strong> 1-3 ngày làm việc (VNPost / Viettel Post / GHN).</li>
              <li><span className="bullet-icon">✓</span> <strong>Đồng kiểm khi nhận hàng:</strong> Bạn được kiểm tra hàng trước khi thanh toán.</li>
              <li><span className="bullet-icon">✓</span> <strong>Đổi hàng miễn phí:</strong> Hỗ trợ đổi size tận nhà trong vòng 30 ngày.</li>
            </ul>
          </div>
        )}
      </section>

      {/* SECTION 3: REVIEWS & RATINGS BREAKDOWN */}
      <section className="reviews-section-wrapper" id="reviews-anchor">
        <h2 className="reviews-section-header">Đánh Giá & Nhận Xét Từ Khách Hàng</h2>
        <div className="reviews-breakdown-grid">
          {/* Overall Score Card */}
          <div className="overall-score-card">
            <div className="big-rating-number">4.8<span> / 5</span></div>
            <div className="stars-gold">★★★★★</div>
            <div className="review-verified-tag">Dựa trên 128 lượt đánh giá mua hàng thực tế</div>

            <div className="rating-histogram">
              <div className="histo-row">
                <span>5★</span>
                <div className="histo-bar"><div className="histo-fill" style={{ width: '86%' }}></div></div>
                <span className="histo-count">110</span>
              </div>
              <div className="histo-row">
                <span>4★</span>
                <div className="histo-bar"><div className="histo-fill" style={{ width: '10%' }}></div></div>
                <span className="histo-count">13</span>
              </div>
              <div className="histo-row">
                <span>3★</span>
                <div className="histo-bar"><div className="histo-fill" style={{ width: '3%' }}></div></div>
                <span className="histo-count">4</span>
              </div>
              <div className="histo-row">
                <span>2★</span>
                <div className="histo-bar"><div className="histo-fill" style={{ width: '1%' }}></div></div>
                <span className="histo-count">1</span>
              </div>
              <div className="histo-row">
                <span>1★</span>
                <div className="histo-bar"><div className="histo-fill" style={{ width: '0%' }}></div></div>
                <span className="histo-count">0</span>
              </div>
            </div>
          </div>

          {/* Customer Feed */}
          <div className="customer-reviews-feed">
            <div className="review-testimonial-card">
              <div className="reviewer-meta-row">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">AM</div>
                  <div>
                    <div className="reviewer-name">Alex Mathio</div>
                    <span className="verified-badge">✓ Đã mua hàng xác thực</span>
                  </div>
                </div>
                <span className="review-date">14 Tháng 10, 2026</span>
              </div>
              <div className="stars-gold" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>★★★★★</div>
              <p className="review-comment-text">
                &quot;Chất vải 450 GSM cực kỳ dày dặn và đầm tay, đúng chuẩn form áo hoodie streetwear xịn. Mũ 2 lớp đứng form không bị gãy như hàng chợ. Mình cao 1m75 nặng 68kg mang size M chuẩn vừa đẹp!&quot;
              </p>
            </div>

            <div className="review-testimonial-card">
              <div className="reviewer-meta-row">
                <div className="reviewer-info">
                  <div className="reviewer-avatar" style={{ backgroundColor: '#0284C7' }}>MT</div>
                  <div>
                    <div className="reviewer-name">Minh Trang</div>
                    <span className="verified-badge">✓ Đã mua hàng xác thực</span>
                  </div>
                </div>
                <span className="review-date">10 Tháng 10, 2026</span>
              </div>
              <div className="stars-gold" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>★★★★★</div>
              <p className="review-comment-text">
                &quot;Màu Charcoal Gray bên ngoài nhìn sang chảnh hơn trong ảnh nhiều, đóng hộp chắc chắn có tem mác thẻ bảo hành xịn sò. Giao hàng hỏa tốc trong ngày rất nhanh.&quot;
              </p>
            </div>

            <div className="review-testimonial-card">
              <div className="reviewer-meta-row">
                <div className="reviewer-info">
                  <div className="reviewer-avatar" style={{ backgroundColor: '#10B981' }}>DP</div>
                  <div>
                    <div className="reviewer-name">David Pham</div>
                    <span className="verified-badge">✓ Đã mua hàng xác thực</span>
                  </div>
                </div>
                <span className="review-date">02 Tháng 10, 2026</span>
              </div>
              <div className="stars-gold" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>★★★★★</div>
              <p className="review-comment-text">
                &quot;Đã mua chiếc thứ hai màu Raw Cream. Đường may kép rất tinh xảo, giặt máy 3 lần rồi mà không hề bị xù lông hay co rút. Rất hài lòng với chất lượng Aethelgard!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: YOU MAY ALSO LIKE (RELATED PRODUCTS) */}
      <section className="related-products-section">
        <div className="related-section-header">
          <h2>Sản Phẩm Tương Tự (You May Also Like)</h2>
          <Link href="/#catalog" className="view-all-link">
            <span>Xem tất cả bộ sưu tập</span>
            <span>→</span>
          </Link>
        </div>

        <div className="related-grid">
          {/* Card 1 */}
          <Link href="/product-detail/6" className="related-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="related-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/products/adidas-sakura-hoodie.jpg" alt="Adidas Sakura Hoodie" loading="lazy" />
              <button className="btn-card-wishlist" title="Yêu thích" type="button">♡</button>
            </div>
            <div className="related-info">
              <div className="related-title">Adidas Sakura Zip Up Hoodie Limited</div>
              <div className="related-price-row">
                <span className="related-price">1.890.000₫</span>
                <span className="stars-gold" style={{ fontSize: '0.82rem' }}>★ 4.9</span>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/product-detail/4" className="related-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="related-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/products/balenciaga-track-beige.jpg" alt="Balenciaga Track 4.0" loading="lazy" />
              <button className="btn-card-wishlist" title="Yêu thích" type="button">♡</button>
            </div>
            <div className="related-info">
              <div className="related-title">Balenciaga Track 4.0 Triple Black Edition</div>
              <div className="related-price-row">
                <span className="related-price">4.850.000₫</span>
                <span className="stars-gold" style={{ fontSize: '0.82rem' }}>★ 5.0</span>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/product-detail/5" className="related-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="related-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/products/balenciaga-ripped-jacket.jpg" alt="Oversized Balenciaga Jacket" loading="lazy" />
              <button className="btn-card-wishlist" title="Yêu thích" type="button">♡</button>
            </div>
            <div className="related-info">
              <div className="related-title">Oversized Ripped Balenciaga Denim Jacket</div>
              <div className="related-price-row">
                <span className="related-price">3.650.000₫</span>
                <span className="stars-gold" style={{ fontSize: '0.82rem' }}>★ 4.8</span>
              </div>
            </div>
          </Link>

          {/* Card 4 */}
          <Link href="/product-detail/7" className="related-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="related-img-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/products/adidas-samba.jpg" alt="Adidas Samba" loading="lazy" />
              <button className="btn-card-wishlist" title="Yêu thích" type="button">♡</button>
            </div>
            <div className="related-info">
              <div className="related-title">Adidas Samba OG Classic Leather White</div>
              <div className="related-price-row">
                <span className="related-price">2.490.000₫</span>
                <span className="stars-gold" style={{ fontSize: '0.82rem' }}>★ 4.9</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Toast Container */}
      {toastMsg && (
        <div id="toast-container" className="toast-container">
          <div className="toast">{toastMsg}</div>
        </div>
      )}
    </div>
  );
}