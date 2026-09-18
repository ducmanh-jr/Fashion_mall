'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, ShieldCheck, MapPin, Truck, Sparkles, Send, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { Product, StoreProfile } from '@/types';
import { api } from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params?.id || 101);

  const [product, setProduct] = useState<Product | null>(null);
  const [stores, setStores] = useState<StoreProfile[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('41 EU');
  const [selectedStoreCode, setSelectedStoreCode] = useState<string>('VN_HN_01');
  const [loading, setLoading] = useState(true);

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState('Gợi ý cho tôi phong cách phối đồ chuẩn xa xỉ với sản phẩm này để đi sự kiện?');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const [prod, storeList] = await Promise.all([
          api.getProductById(productId),
          api.getStores()
        ]);
        setProduct(prod);
        setStores(storeList);
        if (prod.categoryId === 2) {
          setSelectedSize('M');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [productId]);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    try {
      setAiLoading(true);
      const res = await api.getAIRecommendation(aiPrompt, productId);
      setAiResponse(res);
    } catch {
      setAiResponse('[AI Fashion Stylist]: Sản phẩm này kết hợp rất đẹp cùng áo sơ mi lụa trắng, quần tây ống rộng cạp cao và túi xách Dionysus để tôn vinh sự quý phái.');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-sketch-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm font-bold text-slate-500">Đang tải thông tin sản phẩm cao cấp...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Không tìm thấy sản phẩm</h2>
        <a href="/" className="inline-block px-4 py-2 bg-sketch-purple text-white text-xs font-bold rounded-lg">
          Quay lại danh mục
        </a>
      </div>
    );
  }

  const sizes = product.categoryId === 1
    ? ['40 EU', '41 EU', '42 EU', '43 EU', '44 EU']
    : ['S', 'M', 'L', 'XL'];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Toast alert */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-slate-700 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Trang Chủ Catalog</span>
        </a>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* ──── PRODUCT HERO: GALLERY + BUYING OPTIONS ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Gallery Image (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-[460px] sm:h-[540px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm relative group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-slate-950 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Chính Hãng 100%
              </span>
            </div>
          </div>

          {/* Buying & Detail Info (6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                {product.collectionName || product.categoryName} • Mã SKU: {product.sku}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating} / 5.0</span>
                <span className="text-xs text-slate-400">({product.reviewCount} đánh giá từ khách hàng VIP)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                {product.basePrice.toLocaleString('vi-VN')} đ
              </span>
              {product.originalPrice && product.originalPrice > product.basePrice && (
                <span className="text-sm text-slate-400 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')} đ
                </span>
              )}
              {product.discountPercent ? (
                <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Tiết kiệm {product.discountPercent}%
                </span>
              ) : null}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <span>Chọn Kích Cỡ (Size):</span>
                <span className="text-purple-600">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === sz
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Store Pickup Boutique Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Chọn Điểm Bán Boutique Nhận Hàng Trực Tiếp (In-Store Pickup)
              </label>
              <select
                value={selectedStoreCode}
                onChange={(e) => setSelectedStoreCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-sketch-purple outline-none bg-white text-slate-800"
              >
                {stores.map(st => (
                  <option key={st.storeCode} value={st.storeCode}>
                    {st.storeName} ({st.city}) — Còn hàng khả dụng
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => showToast(`Đã thêm ${product.name} (Size: ${selectedSize}) vào giỏ!`)}
                className="py-3.5 bg-purple-50 hover:bg-purple-100 text-sketch-purple rounded-xl text-xs font-extrabold border border-purple-200 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Vào Giỏ</span>
              </button>
              <button
                onClick={() => alert(`Đặt hàng thành công ${product.name} tại ${stores.find(s => s.storeCode === selectedStoreCode)?.storeName || 'Boutique'}!`)}
                className="py-3.5 bg-sketch-purple hover:bg-purple-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-purple-200 transition-all"
              >
                Mua Ngay (Checkout)
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cam kết chính hãng 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Giao hàng bảo mật FedEx</span>
              </div>
            </div>

          </div>

        </div>

        {/* ──── AI FASHION STYLIST SECTION ──── */}
        <section className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-6 relative overflow-hidden border border-purple-800/40">
          
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aethelgard AI Fashion Stylist Studio</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tư Vấn Phối Đồ Thông Minh Cùng Trợ Lý AI
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Trợ lý trí tuệ nhân tạo được huấn luyện từ các catalogue thời trang xa xỉ quốc tế, sẵn sàng gợi ý trang phục, giày dép và phụ kiện tương thích hoàn hảo.
            </p>
          </div>

          {/* AI Interactive Chat Input Form */}
          <form onSubmit={handleAskAI} className="relative z-10 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Hỏi AI cách phối đồ, dịp phù hợp hoặc chọn phụ kiện đi kèm..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              disabled={aiLoading}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-purple-700" />
              <span>{aiLoading ? 'AI Đang Tư Vấn...' : 'Hỏi Trợ Lý AI'}</span>
            </button>
          </form>

          {/* AI Response Display Box */}
          {aiResponse && (
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs sm:text-sm leading-relaxed text-purple-100 animate-fade-in space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Gợi Ý Phong Cách Dành Riêng Cho Bạn:</span>
              </div>
              <p className="text-slate-200 whitespace-pre-line">{aiResponse}</p>
            </div>
          )}

        </section>

      </main>

    </div>
  );
}
