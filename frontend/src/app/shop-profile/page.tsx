'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: string;
  priceFormatted: string;
  sales: number;
  rating: string;
  badge: string;
  discount: string;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Gucci Luxury Signature Casual Sneaker Authentic Italian Edition',
    category: 'Giày Thể Thao Cao Cấp',
    price: 5200000,
    originalPrice: '5.800.000₫',
    priceFormatted: '5.200.000₫',
    sales: 620,
    rating: '★ 5.0',
    badge: 'Gucci Iconic',
    discount: '-10%',
    image: '/img/products/gucci-sneaker.jpg'
  },
  {
    id: '2',
    name: 'Gucci Runway Vintage Monogram Heritage Jacket Limited Edition',
    category: 'Áo Khoác & Outerwear',
    price: 8650000,
    originalPrice: '10.200.000₫',
    priceFormatted: '8.650.000₫',
    sales: 340,
    rating: '★ 5.0',
    badge: 'Runway Collection',
    discount: '-15%',
    image: '/img/products/gucci-runway.jpg'
  },
  {
    id: '3',
    name: 'Essential Heavyweight Oversized Hoodie 450 GSM Cotton French Terry',
    category: 'Áo Hoodie Streetwear',
    price: 1450000,
    originalPrice: '2.150.000₫',
    priceFormatted: '1.450.000₫',
    sales: 1240,
    rating: '★ 4.8',
    badge: 'New Drop',
    discount: '-33%',
    image: '/img/products/sample-velora.jpg'
  },
  {
    id: '4',
    name: 'Balenciaga Track 4.0 Triple Black Futuristic Sneaker',
    category: 'Chunky Sneaker',
    price: 4850000,
    originalPrice: '5.700.000₫',
    priceFormatted: '4.850.000₫',
    sales: 640,
    rating: '★ 5.0',
    badge: 'Kering High-end',
    discount: '-15%',
    image: '/img/products/balenciaga-track-beige.jpg'
  },
  {
    id: '5',
    name: 'Oversized Ripped Balenciaga Vintage Distressed Denim Jacket',
    category: 'Áo Khoác Denim',
    price: 3650000,
    originalPrice: '4.850.000₫',
    priceFormatted: '3.650.000₫',
    sales: 420,
    rating: '★ 4.8',
    badge: 'High Fashion',
    discount: '-25%',
    image: '/img/products/balenciaga-ripped-jacket.jpg'
  },
  {
    id: '6',
    name: 'Adidas Sakura Zip Up Hoodie Limited Japan Special Edition',
    category: 'Áo Khoác Zipper',
    price: 1890000,
    originalPrice: '2.350.000₫',
    priceFormatted: '1.890.000₫',
    sales: 890,
    rating: '★ 4.9',
    badge: 'Special Drop',
    discount: '-20%',
    image: '/img/products/adidas-sakura-hoodie.jpg'
  },
  {
    id: '7',
    name: 'Adidas Samba OG Classic Leather White Black Gum Sole',
    category: 'Sneaker & Footwear',
    price: 2490000,
    originalPrice: '3.050.000₫',
    priceFormatted: '2.490.000₫',
    sales: 1520,
    rating: '★ 4.9',
    badge: 'Top Trending',
    discount: '-18%',
    image: '/img/products/adidas-samba.jpg'
  },
  {
    id: '8',
    name: "Nike Men's Summer Court Retro Sneaker 2024 Collection",
    category: 'Sneaker Thể Thao',
    price: 2890000,
    originalPrice: '3.700.000₫',
    priceFormatted: '2.890.000₫',
    sales: 760,
    rating: '★ 4.8',
    badge: 'New Arrival',
    discount: '-22%',
    image: "/img/products/nike-summer-sneaker.jpg"
  }
];

const BRAND_META: Record<string, { name: string; code: string; slogan: string; origin: string }> = {
  dior: { name: 'DIOR Official Flagship Store', code: 'CD', slogan: '@dior_vietnam • Authentic French Haute Couture, Luxury Leather Goods & Beauty', origin: 'Pháp (Từ năm 1946)' },
  gucci: { name: 'GUCCI Official Store', code: 'GG', slogan: '@gucci_vietnam • Authentic Italian High-End Fashion, Leather Goods & Footwear', origin: 'Ý (Từ năm 1921)' },
  adidas: { name: 'ADIDAS Official Flagship Store', code: 'ADI', slogan: '@adidas_vietnam • Through Sport, We Have The Power To Change Lives', origin: 'Đức (Từ năm 1949)' },
  nike: { name: 'NIKE Official Flagship Store', code: 'NK', slogan: '@nike_vietnam • Just Do It — Innovations for Athletes Worldwide', origin: 'Mỹ (Từ năm 1964)' },
  louisvuitton: { name: 'LOUIS VUITTON Flagship Store', code: 'LV', slogan: '@louisvuitton • Master of Luxury Travel & Iconic Leather Craftsmanship', origin: 'Pháp (Từ năm 1854)' },
  chanel: { name: 'CHANEL Haute Couture Boutique', code: 'CC', slogan: '@chanel_official • Timeless Elegance, Fragrance & High Fashion', origin: 'Pháp (Từ năm 1910)' },
  prada: { name: 'PRADA Milano Official Boutique', code: 'PR', slogan: '@prada • Contemporary Luxury & Avant-Garde Italian Craft', origin: 'Ý (Từ năm 1913)' },
  balenciaga: { name: 'BALENCIAGA Paris Flagship', code: 'BL', slogan: '@balenciaga • Boundary-Pushing Luxury Streetwear & Footwear', origin: 'Tây Ban Nha (Từ năm 1919)' },
  hermes: { name: 'HERMÈS Paris Flagship Boutique', code: 'H', slogan: '@hermes • Handcrafted Leather Goods, Silk Carré & High Luxury', origin: 'Pháp (Từ năm 1837)' },
  versace: { name: 'VERSACE Official Boutique', code: 'VER', slogan: '@versace • Bold Italian Glamour, Medusa Head & High Fashion', origin: 'Ý (Từ năm 1978)' },
  burberry: { name: 'BURBERRY London Flagship', code: 'BB', slogan: '@burberry • British Luxury Heritage, Trench Coats & Vintage Check', origin: 'Anh Quốc (Từ năm 1856)' }
};

export default function ShopProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(485200);
  const [claimedVouchers, setClaimedVouchers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('storefront');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [shopProducts, setShopProducts] = useState<Product[]>(initialProducts);
  const [shopInfo, setShopInfo] = useState({
    name: 'DIOR Official Flagship Store',
    code: 'CD',
    slogan: '@dior_vietnam • Authentic French Haute Couture, Luxury Leather Goods & Beauty',
    origin: 'Pháp (Từ năm 1946)'
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sellerId: number | null = null;
      let brandKey = '';
      const stored = localStorage.getItem('aethelgard_user');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user && user.userId) {
            sellerId = user.userId;
            brandKey = (user.email || '').split('@')[0].toLowerCase();
            const meta = BRAND_META[brandKey] || {
              name: user.fullName || `${brandKey.toUpperCase()} Official Store`,
              code: brandKey.slice(0, 3).toUpperCase(),
              slogan: `@${brandKey}_official • Authentic High Fashion & Iconic Luxury Collections`,
              origin: 'Quốc Tế'
            };
            setShopInfo(meta);
          }
        } catch {}
      }

      const url = sellerId
        ? `http://localhost:5000/api/products?sellerId=${sellerId}&pageSize=100`
        : `http://localhost:5000/api/products?pageSize=100`;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        })
        .then((data) => {
          if (data && data.items && data.items.length > 0) {
            const mapped: Product[] = data.items.map((p: any) => ({
              id: String(p.id),
              name: p.name,
              category: p.categoryName || 'Thời Trang Cao Cấp',
              price: p.basePrice || 1000000,
              originalPrice: (p.originalPrice ? p.originalPrice.toLocaleString('vi-VN') : Math.round((p.basePrice || 1000000) * 1.15).toLocaleString('vi-VN')) + '₫',
              priceFormatted: (p.basePrice || 1000000).toLocaleString('vi-VN') + '₫',
              sales: 300 + (p.id * 17) % 500,
              rating: `★ ${(4.8 + ((p.id % 3) * 0.1)).toFixed(1)}`,
              badge: p.collectionName || (p.discountPercent > 0 ? `Giảm ${p.discountPercent}%` : 'Chính Hãng'),
              discount: p.discountPercent > 0 ? `-${p.discountPercent}%` : '-10%',
              image: p.imageUrl || '/img/products/sample-velora.jpg'
            }));
            setShopProducts(mapped);
          }
        })
        .catch(() => {});
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  };

  // Follow toggle
  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(prev => prev - 1);
      showToast('Đã hủy theo dõi gian hàng.');
    } else {
      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);
      showToast(`Đã theo dõi ${shopInfo.name}! Nhận voucher giảm 10% ngay.`);
    }
  };

  // Chat shop
  const handleChatShop = () => {
    showToast(`Đang kết nối phiên tư vấn bảo mật riêng với Quản lý Boutique ${shopInfo.name}...`);
  };

  // Claim voucher
  const handleClaimVoucher = (code: string) => {
    if (!claimedVouchers.includes(code)) {
      setClaimedVouchers([...claimedVouchers, code]);
      showToast(`Đã lưu mã đặc quyền ${shopInfo.name} [${code}] vào ví tài khoản của bạn!`);
    }
  };

  // Book appointment
  const handleBookAppointment = (boutiqueName: string) => {
    showToast(`Đã mở yêu cầu đặt lịch hẹn VIP tại ${boutiqueName}. Chuyên viên sẽ gọi xác nhận trong 10 phút.`);
  };

  // Tab switch
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'locations') {
      const el = document.getElementById('boutiques-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort products
  let displayProducts = [...shopProducts];

  // Tab filter
  if (activeTab === 'new') {
    displayProducts = displayProducts.filter(
      p => p.badge.includes('New') || p.badge.includes('Runway')
    );
  } else if (activeTab === 'bestseller') {
    displayProducts = displayProducts.filter(p => p.sales >= 600);
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    displayProducts = displayProducts.filter(
      p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sortBy === 'price_asc') {
    displayProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    displayProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'bestseller') {
    displayProducts.sort((a, b) => b.sales - a.sales);
  }

  return (
    <main className="shop-profile-container">
      {/* BREADCRUMBS */}
      <nav className="breadcrumb-nav" style={{ marginTop: '20px', marginBottom: 0 }}>
        <Link href="/">Aethelgard Mall</Link>
        <span className="breadcrumb-separator">/</span>
        <span style={{ color: 'var(--text-muted)' }}>Gian Hàng Thương Hiệu Xa Xỉ (Luxury Flagship)</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">GUCCI Official Flagship Store</span>
      </nav>

      {/* 1. LUXURY COVER BANNER */}
      <section className="shop-cover-banner">
        <div className="shop-cover-watermark">{shopInfo.code}</div>
        <div className="shop-cover-headline">
          <div className="brand-badge-pill">⚖ CERTIFIED LUXURY BOUTIQUE</div>
          <h2>{shopInfo.name.toUpperCase()}</h2>
          <p>
            {shopInfo.slogan} • Gian hàng Flagship chính hãng phân phối trực tiếp tại sàn Aethelgard Luxury Mall
          </p>
        </div>
      </section>

      {/* 2. SHOP IDENTITY CARD (FLOATING HEADER OVERLAY) */}
      <section className="shop-identity-card">
        {/* Main Shop Details & Actions */}
        <div className="shop-main-identity">
          <div className="shop-avatar-box">
            <span>{shopInfo.code}</span>
            <span className="shop-mall-badge">FLAGSHIP</span>
          </div>

          <div className="shop-details-col">
            <div className="shop-name-row">
              <h1 className="shop-title-text">{shopInfo.name}</h1>
              <span className="verified-icon" title="Gian hàng chính hãng ủy quyền chính thức">✓</span>
            </div>
            <p className="shop-slogan-text">
              {shopInfo.slogan}
            </p>
            <div className="shop-status-text">
              <span className="shop-status-dot"></span>
              <span>Đang hoạt động (Trực tuyến 2 phút trước)</span>
            </div>

            <div className="shop-actions-group">
              <button
                id="btn-follow-shop"
                className={`btn-follow-shop ${isFollowing ? 'following' : ''}`}
                onClick={handleFollowToggle}
                type="button"
              >
                <span>{isFollowing ? '✓ Đang Theo Dõi' : '+ Theo Dõi Shop'}</span>
              </button>
              <button
                id="btn-chat-shop"
                className="btn-chat-shop"
                onClick={handleChatShop}
                type="button"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
                <span>Chat Chuyên Viên VIP</span>
              </button>
              <a href="#boutiques-section" className="btn-view-boutique-jump">
                <span>📍 2 Cửa Hàng Boutique</span>
              </a>
            </div>
          </div>
        </div>

        {/* Shop Performance Stats Grid */}
        <div className="shop-stats-grid">
          <div className="stat-metric-item">
            <span className="stat-label-row">Đánh Giá Gian Hàng</span>
            <span className="stat-value-highlight accent">
              5.0 ★ <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 500 }}>(68.4k)</span>
            </span>
          </div>
          <div className="stat-metric-item">
            <span className="stat-label-row">Sản Phẩm Trưng Bày</span>
            <span className="stat-value-highlight">{shopProducts.length}+</span>
          </div>
          <div className="stat-metric-item">
            <span className="stat-label-row">Khách Hàng Theo Dõi</span>
            <span id="followers-count-val" className="stat-value-highlight">
              {(followersCount / 1000).toFixed(1)}k
            </span>
          </div>
          <div className="stat-metric-item">
            <span className="stat-label-row">Tỉ Lệ Phản Hồi Chat</span>
            <span className="stat-value-highlight">
              100% <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>(Ngay lập tức)</span>
            </span>
          </div>
          <div className="stat-metric-item">
            <span className="stat-label-row">Giao Hàng Đúng Hạn</span>
            <span className="stat-value-highlight">99.9%</span>
          </div>
          <div className="stat-metric-item">
            <span className="stat-label-row">Nguồn Gốc Thương Hiệu</span>
            <span className="stat-value-highlight">{shopInfo.origin}</span>
          </div>
        </div>
      </section>

      {/* 3. STORE LOCATIONS & BOUTIQUES (VỊ TRÍ CỬA HÀNG) */}
      <section className="store-locations-section" id="boutiques-section">
        <div className="locations-section-header">
          <div>
            <h3>📍 Hệ Thống Vị Trí Cửa Hàng & Boutique Chính Thức Tại Việt Nam</h3>
            <p>
              Trải nghiệm mua sắm trực tiếp tại không gian Flagship xa xỉ chuẩn quốc tế hoặc đặt lịch hẹn thử đồ VIP riêng tư.
            </p>
          </div>
        </div>

        <div className="boutiques-grid">
          {/* BOUTIQUE 1: HÀ NỘI */}
          <div className="boutique-card">
            <div>
              <div className="boutique-top-row">
                <span className="boutique-city-tag">Hà Nội Flagship</span>
                <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>● Đang mở cửa</span>
              </div>
              <h4 className="boutique-name">Gucci Tràng Tiền Plaza Boutique</h4>
              <ul className="boutique-info-list">
                <li>
                  <span className="info-icon">📍</span>
                  <span><strong>Địa chỉ:</strong> Tầng 1 & 2, TTTM Tràng Tiền Plaza, 24 Hai Bà Trưng, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội</span>
                </li>
                <li>
                  <span className="info-icon">🕒</span>
                  <span><strong>Giờ mở cửa:</strong> 09:30 - 21:30 (Thứ Hai đến Chủ Nhật)</span>
                </li>
                <li>
                  <span className="info-icon">📞</span>
                  <span><strong>Hotline hỗ trợ:</strong> (024) 3936 8899</span>
                </li>
              </ul>

              <div className="boutique-services-tags">
                <span className="service-pill">✓ Phòng Thử Đồ VIP Riêng Tư</span>
                <span className="service-pill">✓ Khắc Tên Monogram Miễn Phí</span>
                <span className="service-pill">✓ Cố Vấn Phong Cách 1:1</span>
              </div>
            </div>

            <div className="boutique-actions-row">
              <a href="https://maps.google.com/?q=Trang+Tien+Plaza+Hanoi" target="_blank" rel="noreferrer" className="btn-map-directions">
                <span>🗺 Chỉ Đường Bản Đồ</span>
              </a>
              <button
                className="btn-book-appointment"
                onClick={() => handleBookAppointment('Gucci Tràng Tiền Plaza (Hà Nội)')}
                type="button"
              >
                <span>📅 Đặt Lịch Hẹn VIP</span>
              </button>
            </div>
          </div>

          {/* BOUTIQUE 2: TP. HỒ CHÍ MINH */}
          <div className="boutique-card">
            <div>
              <div className="boutique-top-row">
                <span className="boutique-city-tag">TP. Hồ Chí Minh Flagship</span>
                <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>● Đang mở cửa</span>
              </div>
              <h4 className="boutique-name">Gucci Đồng Khởi Boutique (Sheraton Saigon)</h4>
              <ul className="boutique-info-list">
                <li>
                  <span className="info-icon">📍</span>
                  <span><strong>Địa chỉ:</strong> Khách sạn Sheraton Saigon, 88 Đồng Khởi, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
                </li>
                <li>
                  <span className="info-icon">🕒</span>
                  <span><strong>Giờ mở cửa:</strong> 09:30 - 22:00 (Thứ Hai đến Chủ Nhật)</span>
                </li>
                <li>
                  <span className="info-icon">📞</span>
                  <span><strong>Hotline hỗ trợ:</strong> (028) 3827 6688</span>
                </li>
              </ul>

              <div className="boutique-services-tags">
                <span className="service-pill">✓ Bộ Sưu Tập Runway Giới Hạn</span>
                <span className="service-pill">✓ Spa & Bảo Dưỡng Đồ Da</span>
                <span className="service-pill">✓ Giao Xe Riêng Hỏa Tốc 2H</span>
              </div>
            </div>

            <div className="boutique-actions-row">
              <a href="https://maps.google.com/?q=Sheraton+Saigon+Hotel+Dong+Khoi" target="_blank" rel="noreferrer" className="btn-map-directions">
                <span>🗺 Chỉ Đường Bản Đồ</span>
              </a>
              <button
                className="btn-book-appointment"
                onClick={() => handleBookAppointment('Gucci Đồng Khởi (TP.HCM)')}
                type="button"
              >
                <span>📅 Đặt Lịch Hẹn VIP</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXCLUSIVE SHOP VOUCHERS BAR */}
      <section className="shop-vouchers-section">
        <div className="section-label-bar">
          <h3>🎁 Đặc Quyền Voucher Giảm Giá Từ Gucci Mall</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Lưu mã ngay để nhận ưu đãi thanh toán trực tuyến
          </span>
        </div>

        <div className="vouchers-carousel-list">
          {/* Voucher 1 */}
          <div className="voucher-ticket-card">
            <div className="voucher-info-col">
              <h4>GIẢM 500.000₫</h4>
              <p className="voucher-condition-text">Cho đơn hàng từ 5.000.000₫</p>
              <span className="voucher-expiry-tag">HSD: 30/11/2026</span>
            </div>
            <button
              className={`btn-claim-voucher ${claimedVouchers.includes('GUCCI500K') ? 'claimed' : ''}`}
              onClick={() => handleClaimVoucher('GUCCI500K')}
              type="button"
            >
              {claimedVouchers.includes('GUCCI500K') ? '✓ Đã Lưu' : 'Lưu Mã'}
            </button>
          </div>

          {/* Voucher 2 */}
          <div className="voucher-ticket-card">
            <div className="voucher-info-col">
              <h4>GIẢM 10% TỐI ĐA 2 TRIỆU</h4>
              <p className="voucher-condition-text">Đặc quyền Follower & Khách hàng VIP</p>
              <span className="voucher-expiry-tag">HSD: 30/11/2026</span>
            </div>
            <button
              className={`btn-claim-voucher ${claimedVouchers.includes('VIPGUCCI') ? 'claimed' : ''}`}
              onClick={() => handleClaimVoucher('VIPGUCCI')}
              type="button"
            >
              {claimedVouchers.includes('VIPGUCCI') ? '✓ Đã Lưu' : 'Lưu Mã'}
            </button>
          </div>

          {/* Voucher 3 */}
          <div className="voucher-ticket-card">
            <div className="voucher-info-col">
              <h4>WHITE GLOVE FREESHIP</h4>
              <p className="voucher-condition-text">Miễn phí giao hàng xe riêng bọc găng tay trắng</p>
              <span className="voucher-expiry-tag">HSD: 30/11/2026</span>
            </div>
            <button
              className={`btn-claim-voucher ${claimedVouchers.includes('LUXESHIP') ? 'claimed' : ''}`}
              onClick={() => handleClaimVoucher('LUXESHIP')}
              type="button"
            >
              {claimedVouchers.includes('LUXESHIP') ? '✓ Đã Lưu' : 'Lưu Mã'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. SHOP NAVIGATION TABS */}
      <nav className="shop-tabs-nav-bar">
        <button
          className={`shop-tab-item ${activeTab === 'storefront' ? 'active' : ''}`}
          onClick={() => handleTabClick('storefront')}
          type="button"
        >
          Dạo Gian Hàng (Storefront)
        </button>
        <button
          className={`shop-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
          type="button"
        >
          Tất Cả Sản Phẩm (240+)
        </button>
        <button
          className={`shop-tab-item ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => handleTabClick('new')}
          type="button"
        >
          Bộ Sưu Tập Runway Mới
        </button>
        <button
          className={`shop-tab-item ${activeTab === 'bestseller' ? 'active' : ''}`}
          onClick={() => handleTabClick('bestseller')}
          type="button"
        >
          Kiệt Tác Bán Chạy
        </button>
        <button
          className={`shop-tab-item ${activeTab === 'locations' ? 'active' : ''}`}
          onClick={() => handleTabClick('locations')}
          type="button"
        >
          📍 Vị Trí Cửa Hàng & Boutique
        </button>
        <button
          className={`shop-tab-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => handleTabClick('about')}
          type="button"
        >
          Chứng Nhận Kering Group
        </button>
      </nav>

      {/* 6. SHOP SEARCH & FILTER TOOLBAR */}
      <div className="shop-toolbar-row">
        <div className="shop-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            id="shop-search-input"
            placeholder="Tìm kiếm trong danh mục Gucci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="shop-filter-pills-row">
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '6px' }}>
            Sắp xếp:
          </span>
          <button
            className={`filter-pill-btn ${sortBy === 'popular' ? 'active' : ''}`}
            onClick={() => setSortBy('popular')}
            type="button"
          >
            Phổ biến
          </button>
          <button
            className={`filter-pill-btn ${sortBy === 'newest' ? 'active' : ''}`}
            onClick={() => setSortBy('newest')}
            type="button"
          >
            Mới nhất
          </button>
          <button
            className={`filter-pill-btn ${sortBy === 'bestseller' ? 'active' : ''}`}
            onClick={() => setSortBy('bestseller')}
            type="button"
          >
            Bán chạy
          </button>
          <button
            className={`filter-pill-btn ${sortBy === 'price_asc' ? 'active' : ''}`}
            onClick={() => setSortBy('price_asc')}
            type="button"
          >
            Giá: Thấp → Cao
          </button>
          <button
            className={`filter-pill-btn ${sortBy === 'price_desc' ? 'active' : ''}`}
            onClick={() => setSortBy('price_desc')}
            type="button"
          >
            Giá: Cao → Thấp
          </button>
        </div>
      </div>

      {/* 7. SHOP PRODUCT CATALOG GRID */}
      <section className="shop-product-grid" id="shop-product-grid">
        {displayProducts.map((p) => (
          <Link
            key={p.id}
            href={`/product-detail/${p.id}`}
            className="shop-product-card"
            data-price={p.price}
            data-sales={p.sales}
          >
            <div className="product-card-thumb">
              <span className="card-tag-badge">{p.badge}</span>
              <span className="card-discount-tag">{p.discount}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.name} loading="lazy" />
            </div>
            <div className="product-card-body">
              <span className="product-category-subtext">{p.category}</span>
              <h3 className="product-card-name">{p.name}</h3>
              <div className="product-card-meta">
                <span className="stars-gold" style={{ fontSize: '0.85rem' }}>{p.rating}</span>
                <span style={{ color: '#94A3B8' }}>•</span>
                <span className="sales-count-text">Đã bán {p.sales >= 1000 ? `${(p.sales / 1000).toFixed(1)}k` : p.sales}</span>
              </div>
              <div className="product-card-price-row">
                <span className="price-main-val">{p.priceFormatted}</span>
                <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '0.88rem' }}>
                  {p.originalPrice}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* 8. GUCCI LUXURY GUARANTEES BANNER */}
      <section className="shop-guarantee-banner">
        <div className="guarantee-box">
          <div className="guarantee-icon-wrapper">🛡</div>
          <div>
            <h4>100% Chính Hãng Kering Group</h4>
            <p>Cam kết bồi thường 300% nếu phát hiện không chuẩn nguyên bản.</p>
          </div>
        </div>

        <div className="guarantee-box">
          <div className="guarantee-icon-wrapper">🔄</div>
          <div>
            <h4>Bảo Dưỡng Toàn Cầu</h4>
            <p>Hưởng chính sách chăm sóc đồ da và bảo dưỡng tại mọi Boutique Gucci.</p>
          </div>
        </div>

        <div className="guarantee-box">
          <div className="guarantee-icon-wrapper">🚗</div>
          <div>
            <h4>White Glove VIP Delivery</h4>
            <p>Giao hàng bằng xe riêng chuyên dụng, nhân viên đeo găng tay trắng bàn giao.</p>
          </div>
        </div>

        <div className="guarantee-box">
          <div className="guarantee-icon-wrapper">🎁</div>
          <div>
            <h4>Đóng Hộp Quà Tặng Luxury</h4>
            <p>Hộp quà cao cấp nguyên seal kèm túi giấy, ruy băng và thư cảm ơn.</p>
          </div>
        </div>
      </section>

      {/* Toast Notification Container */}
      {toastMessage && (
        <div id="toast-container" className="toast-container">
          <div className="toast">{toastMessage}</div>
        </div>
      )}
    </main>
  );
}
