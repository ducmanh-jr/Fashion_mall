'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, Upload, Tag, DollarSign, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';
import { productService } from '@/services/product.service';
import type { Product, Category } from '@/types';

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (product: Product, isEdit: boolean) => void;
  initialProduct?: Product | null;
  categories: Category[];
}

const STEPS = [
  { id: 1, label: 'Thông tin', icon: Tag },
  { id: 2, label: 'Giá & Kho', icon: DollarSign },
  { id: 3, label: 'Hình ảnh & Chi tiết', icon: ImageIcon },
  { id: 4, label: 'Xác nhận', icon: Check },
];

export function ProductEditorModal({
  isOpen,
  onClose,
  onSuccess,
  initialProduct,
  categories,
}: ProductEditorModalProps) {
  const isEdit = !!initialProduct;
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);
  const [sku, setSku] = useState('');
  const [collectionName, setCollectionName] = useState('Fall/Winter 2026');
  const [countryOfOrigin, setCountryOfOrigin] = useState('Italy');
  const [material, setMaterial] = useState('100% Genuine Leather');
  const [careInstructions, setCareInstructions] = useState('Lau bằng khăn ẩm mềm, tránh ánh nắng trực tiếp.');
  const [basePrice, setBasePrice] = useState<number>(2500000);
  const [originalPrice, setOriginalPrice] = useState<number>(3000000);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [stockQuantity, setStockQuantity] = useState<number>(50);
  const [imageUrl, setImageUrl] = useState('/img/products/gucci-sneaker.jpg');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name || '');
      setCategoryId(initialProduct.categoryId || categories[0]?.id || 1);
      setSku(initialProduct.sku || '');
      setCollectionName(initialProduct.collectionName || '');
      setCountryOfOrigin(initialProduct.countryOfOrigin || 'Italy');
      setMaterial(initialProduct.material || '');
      setCareInstructions(initialProduct.careInstructions || '');
      setBasePrice(initialProduct.basePrice || 0);
      setOriginalPrice(initialProduct.originalPrice || initialProduct.basePrice || 0);
      setDiscountPercent(initialProduct.discountPercent || 0);
      setStockQuantity(initialProduct.stockQuantity || 10);
      setImageUrl(initialProduct.imageUrl || '/img/products/gucci-sneaker.jpg');
      setDescription(initialProduct.description || '');
    } else {
      setName('');
      setCategoryId(categories[0]?.id || 1);
      setSku(`AG-${Date.now().toString().slice(-5)}`);
      setCollectionName('Fall/Winter 2026');
      setCountryOfOrigin('Italy');
      setMaterial('Cotton cao cấp / Da thuộc Ý');
      setCareInstructions('Bảo quản nơi khô ráo, tránh nhiệt độ cao.');
      setBasePrice(1850000);
      setOriginalPrice(2200000);
      setDiscountPercent(15);
      setStockQuantity(35);
      setImageUrl('/img/products/sample-velora.jpg');
      setDescription('Thiết kế thời trang sang trọng, từng đường may tỉ mỉ, tôn vinh phong cách đương đại.');
    }
    setCurrentStep(1);
    setError('');
  }, [initialProduct, categories, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep === 1) {
      if (!name.trim()) {
        setError('Vui lòng nhập tên sản phẩm.');
        return;
      }
      if (!sku.trim()) {
        setError('Vui lòng nhập mã SKU.');
        return;
      }
    } else if (currentStep === 2) {
      if (basePrice <= 0) {
        setError('Giá bán phải lớn hơn 0.');
        return;
      }
      if (stockQuantity < 0) {
        setError('Số lượng tồn kho không được âm.');
        return;
      }
    } else if (currentStep === 3) {
      if (!imageUrl.trim()) {
        setError('Vui lòng nhập đường dẫn hoặc chọn ảnh sản phẩm.');
        return;
      }
    }
    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: name.trim(),
      categoryId: Number(categoryId),
      sku: sku.trim(),
      collectionName: collectionName.trim(),
      countryOfOrigin: countryOfOrigin.trim(),
      material: material.trim(),
      careInstructions: careInstructions.trim(),
      basePrice: Number(basePrice),
      originalPrice: Number(originalPrice) || Number(basePrice),
      discountPercent: Number(discountPercent) || 0,
      stockQuantity: Number(stockQuantity),
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4),
    };

    try {
      let savedProduct: Product;
      if (isEdit && initialProduct) {
        savedProduct = await productService.updateProduct(initialProduct.id, payload);
      } else {
        savedProduct = await productService.createProduct(payload);
      }
      onSuccess(savedProduct, isEdit);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Không thể lưu sản phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const sampleImages = [
    '/img/products/gucci-sneaker.jpg',
    '/img/products/gucci-runway.jpg',
    '/img/products/adidas-samba.jpg',
    '/img/products/adidas-sakura-hoodie.jpg',
    '/img/products/sample-velora.jpg',
    '/img/products/gucci-collection.jpg',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {isEdit ? `Chỉnh Sửa Sản Phẩm #${initialProduct?.id}` : 'Thêm Sản Phẩm Mới'}
            </h3>
            <p className="text-xs text-slate-500">
              Hệ thống quản lý sản phẩm chuyên nghiệp dành cho người bán
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Navigation */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => !loading && setCurrentStep(step.id)}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  isCurrent
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 text-emerald-600'
                    : 'bg-white border-transparent text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* BƯỚC 1: THÔNG TIN CƠ BẢN */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên Sản Phẩm *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Giày Sneaker Gucci Ace Web Leather"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Danh Mục Hàng Hóa *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mã SKU Quản Lý *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="VD: GC-00101"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bộ Sưu Tập
                  </label>
                  <input
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    placeholder="VD: Spring/Summer 2026"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Xuất Xứ
                  </label>
                  <input
                    type="text"
                    value={countryOfOrigin}
                    onChange={(e) => setCountryOfOrigin(e.target.value)}
                    placeholder="VD: Italy, France, Vietnam"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* BƯỚC 2: GIÁ & KHO HÀNG */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giá Bán Niêm Yết (VND) *
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    required
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-semibold text-indigo-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giá Gốc Chưa Giảm (VND)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    % Giảm Giá
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số Lượng Tồn Kho Sẵn Có *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Trạng thái kho:</span>
                  <span className={`font-bold ${stockQuantity > 10 ? 'text-emerald-600' : stockQuantity > 0 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {stockQuantity > 10 ? 'Còn hàng dồi dào' : stockQuantity > 0 ? 'Sắp hết hàng' : 'Hết hàng'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Giá sau giảm:</span>
                  <span className="font-bold text-slate-900">
                    {basePrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* BƯỚC 3: HÌNH ẢNH & CHI TIẾT */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ảnh Đại Diện Sản Phẩm (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/img/products/... hoặc link https://"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 mb-2"
                />

                {/* Chọn nhanh ảnh mẫu */}
                <div className="text-xs text-slate-500 mb-2 font-medium">Hoặc chọn nhanh thư viện ảnh thực tế:</div>
                <div className="grid grid-cols-6 gap-2">
                  {sampleImages.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setImageUrl(img)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        imageUrl === img ? 'border-indigo-600 scale-105 shadow-md' : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={img} alt="sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview ảnh hiện tại */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <img
                  src={imageUrl}
                  alt="preview"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/products/sample-velora.jpg';
                  }}
                />
                <div className="text-xs text-slate-600">
                  <div className="font-bold text-slate-900">Xem trước hình ảnh sản phẩm</div>
                  <div>Hình ảnh này sẽ hiển thị ở Gian Trưng Bày và trang Chi tiết sản phẩm.</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô Tả Sản Phẩm
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả phong cách, công nghệ may, tính năng vượt trội..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chất Liệu Chi Tiết
                  </label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="VD: 100% Wool, Cotton Spandex..."
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hướng Dẫn Giặt & Bảo Quản
                  </label>
                  <input
                    type="text"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    placeholder="VD: Giặt hấp, không dùng thuốc tẩy..."
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* BƯỚC 4: XÁC NHẬN & ĐĂNG BÁN */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex gap-4">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-24 h-24 rounded-xl object-cover border border-indigo-200 shadow-sm shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/products/sample-velora.jpg';
                  }}
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    {sku}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 truncate">{name}</h4>
                  <div className="text-sm font-extrabold text-indigo-700">
                    {basePrice.toLocaleString('vi-VN')} đ
                    {originalPrice > basePrice && (
                      <span className="text-xs text-slate-400 font-normal line-through ml-2">
                        {originalPrice.toLocaleString('vi-VN')} đ
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    Kho: <span className="font-semibold text-slate-700">{stockQuantity} sản phẩm</span> • Danh mục: #{categoryId}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 divide-y divide-slate-100 text-xs">
                <div className="p-3 flex justify-between">
                  <span className="text-slate-500">Bộ sưu tập</span>
                  <span className="font-semibold text-slate-900">{collectionName || 'Tiêu chuẩn'}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-slate-500">Xuất xứ</span>
                  <span className="font-semibold text-slate-900">{countryOfOrigin || 'Chính hãng'}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-slate-500">Chất liệu</span>
                  <span className="font-semibold text-slate-900">{material}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-slate-500">Trạng thái phát hành</span>
                  <span className="font-bold text-emerald-600">Sẵn Sàng Niêm Yết Lên Sàn</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Quay Lại
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Đóng
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all ml-auto cursor-pointer"
              >
                Tiếp Theo
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-100 transition-all ml-auto flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Đang lưu...' : isEdit ? 'Lưu Thay Đổi Sản Phẩm' : 'Xác Nhận Đăng Bán Ngay'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEditorModal;
