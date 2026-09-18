'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingBag, SlidersHorizontal, ArrowUpDown, Check, X, Star, Heart, ArrowRight } from 'lucide-react';
import { Product, Category } from '@/types';
import { api } from '@/lib/api';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'bestseller' | 'discount'>('newest');

  // Cart & Quick View Modal
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        setProducts(prodRes.items);
        setCategories(catRes);
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.sku.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.categoryId === selectedCategory);
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      result = result.filter(p => p.basePrice >= Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      result = result.filter(p => p.basePrice <= Number(maxPrice));
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'bestseller') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice, sortBy]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0
  );

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-950 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ════════ HERO LANDING SECTION WITH GIANT WATERMARK ════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-slate-50 pt-16 pb-20 border-b border-slate-200/60">
        
        {/* Giant Watermark from sketch */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 select-none pointer-events-none overflow-hidden">
          <h1 className="hero-watermark font-serif">AETHELGARD</h1>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-xs font-extrabold text-sketch-purple uppercase tracking-widest">
            <span>✨</span>
            <span>Give All You Need • Luxury E-Commerce</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Khám phá thời trang, sneaker & phụ kiện xa xỉ
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Đồng bộ 30 thương hiệu hàng đầu thế giới với hệ thống định vị Boutique chính hãng tại Tràng Tiền Plaza, Sheraton & Union Square.
          </p>

          {/* Floating Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 bg-white p-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 transition-all focus-within:ring-4 focus-within:ring-purple-100">
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm Gucci, Adidas Samba, Balenciaga Track, áo khoác, kính mát..."
              className="flex-1 py-2 px-2 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('catalog-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-sketch-purple hover:bg-purple-700 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-200 transition-all"
            >
              Tìm Kiếm
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Từ khóa hot:</span>
            {['Adidas Samba', 'Gucci Ace', 'Balenciaga Track', 'Áo Nỉ Sakura', 'Kính Mát Double G'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="text-xs px-3 py-1 rounded-full bg-white hover:bg-purple-50 text-slate-600 hover:text-sketch-purple border border-slate-200 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Scroll down indicator */}
          <div
            onClick={() => {
              const el = document.getElementById('catalog-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="scroll-down-indicator cursor-pointer pt-4"
          >
            <span className="text-xs font-medium text-slate-400">Cuộn xuống khám phá sản phẩm</span>
            <div className="text-sm font-bold text-sketch-purple">&darr;</div>
          </div>
        </div>
      </section>

      {/* ════════ MAIN CATALOG LAYOUT: SIDEBAR + PRODUCT GRID ════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="catalog-grid">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* ──── SIDEBAR FILTERS ──── */}
          <aside className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <SlidersHorizontal className="w-4 h-4 text-sketch-purple" />
                <span>Bộ Lọc Sản Phẩm</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-sketch-purple hover:underline"
              >
                Đặt lại
              </button>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Danh Mục
              </label>
              <ul className="space-y-1">
                <li
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                    selectedCategory === null
                      ? 'bg-purple-50 text-sketch-purple font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>Tất cả sản phẩm</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {products.length}
                  </span>
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-purple-50 text-sketch-purple font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Filter Section */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Bộ Sưu Tập Nổi Bật
              </label>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                    sortBy === 'newest' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  ✨ Hàng Mới Về (New Arrival)
                </button>
                <button
                  onClick={() => setSortBy('bestseller')}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                    sortBy === 'bestseller' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🔥 Bán Chạy Nhất (Best Seller)
                </button>
                <button
                  onClick={() => setSortBy('discount')}
                  className={`text-left text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                    sortBy === 'discount' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🏷️ Giảm Giá Đặc Quyền (Discount)
                </button>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Khoảng Giá (VNĐ)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none focus:border-sketch-purple"
                />
                <span className="text-slate-400">-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none focus:border-sketch-purple"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Sắp Xếp Theo
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 outline-none focus:border-sketch-purple bg-white text-slate-700"
              >
                <option value="newest">Mới nhất cập nhật</option>
                <option value="price_asc">Giá: Thấp đến Cao</option>
                <option value="price_desc">Giá: Cao đến Thấp</option>
                <option value="bestseller">Đánh giá nhiều nhất</option>
              </select>
            </div>
          </aside>

          {/* ──── PRODUCT CATALOG DISPLAY ──── */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header info */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Danh Sách Sản Phẩm Aethelgard Mall
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hiển thị <span className="font-bold text-slate-800">{filteredProducts.length}</span> sản phẩm chính hãng
                </p>
              </div>

              {/* View cart floating button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Giỏ Hàng ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
              </button>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="bg-white rounded-2xl p-4 h-80 animate-pulse border border-slate-200"></div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <div className="text-4xl">🔍</div>
                <h4 className="text-lg font-bold text-slate-800">Không tìm thấy sản phẩm phù hợp</h4>
                <p className="text-xs text-slate-500">Vui lòng thử điều chỉnh khoảng giá hoặc từ khóa tìm kiếm</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-sketch-purple text-white text-xs font-bold rounded-lg mt-2"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col group relative"
                  >
                    {/* Discount badge */}
                    {product.discountPercent && product.discountPercent > 0 ? (
                      <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
                        -{product.discountPercent}%
                      </span>
                    ) : null}

                    {/* Stock status badge */}
                    <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 shadow-xs">
                      {product.stockQuantity > 10 ? 'Còn hàng' : product.stockQuantity > 0 ? 'Sắp hết' : 'Hết hàng'}
                    </span>

                    {/* Product Image */}
                    <a
                      href={`/product-detail/${product.id}`}
                      className="relative h-60 w-full overflow-hidden bg-slate-100 block"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </a>

                    {/* Product Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-1">
                          {product.collectionName || product.categoryName || 'Luxury'}
                        </div>
                        <a
                          href={`/product-detail/${product.id}`}
                          className="font-bold text-slate-900 text-sm hover:text-sketch-purple transition-colors line-clamp-2"
                        >
                          {product.name}
                        </a>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-slate-700">{product.rating || 5.0}</span>
                          <span className="text-[10px] text-slate-400">({product.reviewCount || 40})</span>
                        </div>
                      </div>

                      {/* Pricing & Cart Action */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-base font-extrabold text-slate-900">
                            {product.basePrice.toLocaleString('vi-VN')} đ
                          </div>
                          {product.originalPrice && product.originalPrice > product.basePrice && (
                            <div className="text-[11px] text-slate-400 line-through">
                              {product.originalPrice.toLocaleString('vi-VN')} đ
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            title="Xem nhanh"
                            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                          >
                            <Search className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            title="Thêm vào giỏ"
                            className="px-3 py-2 bg-sketch-purple hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Mua</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ════════ SECTION 3: RECOMMENDATIONS CAROUSEL ════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore our recommendations
            </h2>
            <p className="text-xs text-slate-500 mt-1">Gợi ý xu hướng thời trang & sneaker dành riêng cho bạn</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Đang hiển thị trang gợi ý trước')}
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-slate-900 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all"
            >
              &larr;
            </button>
            <button
              onClick={() => showToast('Đang tải thêm sản phẩm gợi ý mới')}
              className="w-10 h-10 rounded-full border border-slate-300 hover:border-slate-900 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => setQuickViewProduct(p)}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="h-48 w-full rounded-xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  {p.categoryName || 'Luxury'}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-sketch-purple transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-extrabold text-slate-900">{p.basePrice.toLocaleString('vi-VN')} đ</span>
                  <span className="text-[11px] text-slate-400">SKU: {p.sku}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ SECTION 4: NEWSLETTER BANNER ════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="newsletter-card bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Get Our New Stuff?
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đăng ký nhận bản tin thời trang độc quyền, ưu đãi VIP và các đợt phát hành sneaker giới hạn sớm nhất từ Aethelgard Shopping Mall.
            </p>
            <div className="pt-2">
              <p className="text-xs font-bold text-purple-400">SE.Bus for Homes and Needs</p>
              <p className="text-[11px] text-slate-500">We&apos;ll listen to your needs, identify the best approach, and create the optimal experience for you.</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Cảm ơn bạn đã đăng ký nhận bản tin mới!');
            }}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]"
          >
            <input
              type="email"
              required
              placeholder="Your Email"
              className="newsletter-input px-5 py-3 rounded-full bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-purple-400 flex-1"
            />
            <button
              type="submit"
              className="btn-newsletter-send px-8 py-3 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-md"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* ════════ QUICK VIEW MODAL ════════ */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up">
            <div className="relative grid grid-cols-1 md:grid-cols-2">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="h-72 md:h-full bg-slate-100 overflow-hidden">
                <img
                  src={quickViewProduct.imageUrl}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-sketch-purple uppercase">
                    SKU: {quickViewProduct.sku}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                  <div className="text-2xl font-black text-slate-900 mt-4">
                    {quickViewProduct.basePrice.toLocaleString('vi-VN')} đ
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 bg-sketch-purple text-white text-sm font-bold rounded-xl hover:bg-purple-700 shadow-md"
                  >
                    Thêm Vào Giỏ Hàng
                  </button>
                  <a
                    href={`/product-detail/${quickViewProduct.id}`}
                    className="block w-full py-2.5 text-center text-xs font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
                  >
                    Xem Chi Tiết Đầy Đủ & Trợ Lý AI →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ CART DRAWER ════════ */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
                  <ShoppingBag className="w-5 h-5 text-sketch-purple" />
                  <span>Giỏ Hàng Của Bạn</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-2 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-sm">Giỏ hàng của bạn đang trống.</p>
                  </div>
                ) : (
                  cartItems.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">
                          {product.name}
                        </h5>
                        <p className="text-xs text-sketch-purple font-bold mt-1">
                          {product.basePrice.toLocaleString('vi-VN')} đ
                        </p>
                        <span className="text-[11px] text-slate-400">Số lượng: {quantity}</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-rose-500 hover:underline px-2"
                      >
                        Xóa
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Summary */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>Tổng tiền thanh toán:</span>
                    <span className="text-lg text-sketch-purple">
                      {totalCartAmount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      alert('Cảm ơn bạn! Đơn hàng thử nghiệm đã được ghi nhận.');
                      setCartItems([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 bg-sketch-purple text-white text-sm font-bold rounded-xl shadow-md hover:bg-purple-700"
                  >
                    Tiến Hành Đặt Hàng (Checkout)
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
