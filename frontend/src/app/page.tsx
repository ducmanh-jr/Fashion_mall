'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { fallbackProducts, fallbackCategories } from '@/lib/mock-data';
import type { Product, Category } from '@/types';
import { productService } from '@/services/product.service';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { Plus, Store, Sparkles } from 'lucide-react';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import {
  SellerProductCard,
  SellerDrawer,
  ProductFilters,
  HeroSection,
  HomeAnalyticsStrip,
  BrandCinematicShowcase,
  ProductEditorModal,
  SellerRegisterModal,
} from '@/components/seller';

export default function HomePage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [quickFilterType, setQuickFilterType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(fallbackProducts[0] || null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const sellerTitle = user?.fullName || user?.email?.split('@')[0]?.toUpperCase() || '';
  const isSellerRole = user?.role === 'Seller' || user?.role === 'Admin';

  // Tải danh mục thực tế từ backend API
  useEffect(() => {
    productService
      .getCategories()
      .then((cats) => {
        if (cats && cats.length > 0) setCategories(cats);
      })
      .catch(() => {});
  }, []);

  // Tải danh sách sản phẩm từ backend API qua productService
  useEffect(() => {
    let isMounted = true;
    const sellerId = user?.userId;

    productService
      .getProducts({
        sellerId: sellerId && sellerId > 0 ? sellerId : undefined,
        pageSize: 100,
      })
      .then((res) => {
        if (isMounted && res && res.items && res.items.length > 0) {
          setProducts(res.items);
          if (!drawerProduct) {
            setDrawerProduct(res.items[0]);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Bộ lọc sản phẩm
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
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      list = list.filter((p) => p.basePrice >= Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      list = list.filter((p) => p.basePrice <= Number(maxPrice));
    }

    if (quickFilterType === 'bestseller') {
      list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
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

  const openSellerDrawer = (p: Product) => {
    setDrawerProduct(p);
    setIsDrawerOpen(true);
  };

  const closeSellerDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setIsEditorOpen(true);
  };

  const handleDeleteProduct = async (p: Product) => {
    const isConfirmed = await confirm({
      title: 'Xóa Niêm Yết Sản Phẩm',
      message: `Bạn có chắc chắn muốn xóa sản phẩm "${p.name}" (SKU: ${p.sku}) khỏi gian hàng? Hành động này sẽ gỡ bỏ sản phẩm khỏi sàn mua sắm.`,
      confirmText: 'Xóa Vĩnh Viễn',
      cancelText: 'Giữ Lại',
      tone: 'danger',
    });

    if (!isConfirmed) return;

    try {
      await productService.deleteProduct(p.id);
      setProducts((prev) => prev.filter((item) => item.id !== p.id));
      showToast(`Đã xóa sản phẩm "${p.name}" thành công.`);
      if (drawerProduct?.id === p.id) {
        setIsDrawerOpen(false);
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Không thể xóa sản phẩm.');
    }
  };

  const handleProductSaved = (savedProduct: Product, isEdit: boolean) => {
    if (isEdit) {
      setProducts((prev) => prev.map((p) => (p.id === savedProduct.id ? savedProduct : p)));
      showToast(`Đã cập nhật sản phẩm "${savedProduct.name}" thành công!`);
    } else {
      setProducts((prev) => [savedProduct, ...prev]);
      showToast(`Đã thêm mới và niêm yết sản phẩm "${savedProduct.name}" lên sàn!`);
    }
    setDrawerProduct(savedProduct);
  };

  const resetFilters = () => {
    setCategoryFilter('');
    setQuickFilterType('');
    setMinPrice('');
    setMaxPrice('');
    setSortOrder('newest');
    setSearchTerm('');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreProduct = (keyword: string) => {
    const matched = products.find((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
    if (matched) {
      openSellerDrawer(matched);
    } else {
      scrollToCatalog();
    }
  };

  return (
    <>
      {/* 1. HERO BANNER */}
      <HeroSection
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* 2. SƠ ĐỒ DOANH SỐ & PHÂN RÃ DOANH THU (1/4 CUỐI MẶT ĐẦU) */}
      <HomeAnalyticsStrip />

      {/* 3. BRAND CINEMATIC SHOWCASE (SÂN KHẤU ẢNH CHÍNH ĐỔI 10S/LẦN) */}
      <BrandCinematicShowcase
        shopName={sellerTitle || 'Aethelgard Store'}
        products={products}
        onExploreProduct={handleExploreProduct}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* 3. SHOWROOM SẢN PHẨM CỬA HÀNG */}
      <section className="page-section shop-section" id="catalog">
        <main className="main-layout">
          <ProductFilters
            categories={categories}
            totalProductsCount={products.length}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            quickFilterType={quickFilterType}
            onQuickFilterChange={setQuickFilterType}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            onReset={resetFilters}
          />

          {/* Product Grid */}
          <section className="catalog-section">
            <div className="catalog-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
              <div>
                <h2 id="catalog-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                  {sellerTitle
                    ? `Gian Trưng Bày — ${sellerTitle}`
                    : 'Sản Phẩm Đang Niêm Yết Trên Sàn'}
                </h2>
                <span id="results-count" className="results-tag text-xs text-slate-500 font-medium">
                  Hiển thị {filteredProducts.length} sản phẩm thực tế
                </span>
              </div>

              {/* ACTION BUTTONS: THÊM SẢN PHẨM MỚI / MỞ GIAN HÀNG */}
              <div className="flex items-center gap-2">
                {!isSellerRole && (
                  <button
                    type="button"
                    onClick={() => setIsRegisterOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors shadow-sm cursor-pointer"
                  >
                    <Store className="w-4 h-4" />
                    <span>Mở Gian Hàng Seller</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Sản Phẩm Mới</span>
                </button>
              </div>
            </div>

            <div id="product-grid" className="product-grid">
              {filteredProducts.map((p) => (
                <SellerProductCard
                  key={p.id}
                  product={p}
                  onClick={openSellerDrawer}
                />
              ))}
            </div>
          </section>
        </main>
      </section>

      {/* 5. SELLER DRAWER — Chỉnh sửa & Xóa sản phẩm */}
      <SellerDrawer
        isOpen={isDrawerOpen}
        product={drawerProduct}
        onClose={closeSellerDrawer}
        onShowToast={showToast}
        onEditProduct={handleOpenEditModal}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* 6. MODAL THÊM / SỬA SẢN PHẨM ĐA BƯỚC */}
      <ProductEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSuccess={handleProductSaved}
        initialProduct={editingProduct}
        categories={categories}
      />

      {/* 7. MODAL ĐĂNG KÝ GIAN HÀNG SELLER */}
      <SellerRegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        user={user}
        onSuccess={() => {
          showToast('Chúc mừng bạn đã trở thành Người Bán chính thức!');
        }}
      />

      {/* 8. DIALOG XÁC NHẬN AN TOÀN */}
      {confirmDialog}
    </>
  );
}
