'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Clock, Phone, Mail, Award, Sparkles, Tag, ExternalLink, Check } from 'lucide-react';
import { StoreProfile } from '@/types';
import { api } from '@/lib/api';

export default function ShopProfilePage() {
  const [stores, setStores] = useState<StoreProfile[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreProfile | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  useEffect(() => {
    async function loadStores() {
      try {
        const data = await api.getStores();
        setStores(data);
        if (data.length > 0) setSelectedStore(data[0]);
      } catch (e) {
        console.error(e);
      }
    }
    loadStores();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* ──── LUXURY COVER BANNER ──── */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        
        {/* Giant GUCCI Watermark */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-20">
          <span className="text-[14vw] font-serif font-black tracking-[0.2em] text-slate-100 uppercase">
            GUCCI
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Kering Group Certified Luxury Boutique</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-wide uppercase">
            GUCCI OFFICIAL FLAGSHIP STORE
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Haute Couture, phụ kiện & đồ da thủ công tinh hoa từ Florence, Ý (1921) • Gian hàng Flagship chính hãng phân phối trực tiếp tại sàn Aethelgard Luxury Mall
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800/80 max-w-xl mx-auto">
            <div>Đánh giá: <strong className="text-white">4.9 / 5.0 ⭐ (2.4k lượt)</strong></div>
            <div>Tỷ lệ phản hồi: <strong className="text-white">99.8% (Dưới 5 phút)</strong></div>
            <div>Thời gian tham gia: <strong className="text-white">Từ 2024</strong></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* ──── VOUCHERS & PRIVILEGES ──── */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-800/50">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VOUCHER ĐẶC QUYỀN VIP MALL</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Giảm Ngay 1.000.000 đ Cho Đơn Hàng Từ 25 Triệu
            </h3>
            <p className="text-xs text-purple-200">
              Áp dụng cho toàn bộ túi xách Dionysus, sneaker Gucci Ace và kính mát Kering chính hãng.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur p-2 rounded-2xl border border-white/20">
            <span className="font-mono text-lg font-black tracking-widest px-3">GUCCI-VIP-2026</span>
            <button
              onClick={() => copyCode('GUCCI-VIP-2026')}
              className="px-5 py-2.5 bg-white text-slate-950 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
            >
              {copiedVoucher ? <Check className="w-4 h-4 text-emerald-600" /> : <Tag className="w-4 h-4" />}
              <span>{copiedVoucher ? 'Đã Sao Chép' : 'Sao Chép Mã'}</span>
            </button>
          </div>
        </div>

        {/* ──── ASIAN BOUTIQUE LOCATOR & STORE DETAILS ──── */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Mạng Lưới Flagship Boutique Tại Việt Nam
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Khách hàng có thể đặt hàng trực tuyến trên sàn Aethelgard Mall và đến nhận hàng trực tiếp tại các Boutique Flagship cao cấp
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Store Selection Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {stores.map(store => {
                const isSelected = selectedStore?.storeCode === store.storeCode;
                return (
                  <div
                    key={store.storeCode}
                    onClick={() => setSelectedStore(store)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-sketch-purple shadow-md ring-2 ring-purple-100'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {store.storeName}
                      </h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                        {store.storeType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{store.operatingHours}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Selected Store View (7 cols) */}
            {selectedStore && (
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 relative">
                  <img
                    src={selectedStore.imageUrl || '/img/gucci-runway.jpg'}
                    alt={selectedStore.storeName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                        {selectedStore.city}, {selectedStore.country}
                      </span>
                      <h3 className="text-2xl font-serif font-black">{selectedStore.storeName}</h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                    <span className="font-bold text-slate-400 uppercase">Liên Hệ Boutique</span>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 pt-1">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      <span>{selectedStore.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedStore.email}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                    <span className="font-bold text-slate-400 uppercase">Giờ Mở Cửa Hoạt Động</span>
                    <div className="font-bold text-slate-800 leading-relaxed pt-1">
                      {selectedStore.operatingHours}
                    </div>
                  </div>
                </div>

                {/* Exclusive Services */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Dịch Vụ Đặc Quyền Tại Điểm Bán (In-Store Privileges)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(selectedStore.services || []).map((service, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100 text-slate-800 font-semibold">
                        <Award className="w-4 h-4 text-sketch-purple shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External link to official Gucci locator */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Tọa độ: {selectedStore.latitude}° N, {selectedStore.longitude}° E</span>
                  <a
                    href={selectedStore.storeUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sketch-purple hover:underline"
                  >
                    <span>Xem định vị bản đồ chính thức</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
