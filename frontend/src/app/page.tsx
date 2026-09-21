'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { fallbackProducts } from '@/lib/mock-data';
import type { Product } from '@/types';
import { productService } from '@/services/product.service';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import {
  SellerProductCard,
  SellerDrawer,
  ProductFilters,
  HeroSection,
  RecommendationsSection,
  CartModal,
  CheckoutModal,
  type CartItem,
} from '@/components/seller';

export default function HomePage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [quickFilterType, setQuickFilterType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Cart & Modals
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(fallbackProducts[0] || null);

  const sellerTitle = user?.fullName || user?.email?.split('@')[0]?.toUpperCase() || '';

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
      .catch(() => {
        // Fallback tự động trong productService
      });

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

  const openSellerDrawer = (p: Product) => {
    setDrawerProduct(p);
    setIsDrawerOpen(true);
  };

  const closeSellerDrawer = () => {
    setIsDrawerOpen(false);
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

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

      {/* 2. CATALOG & SIDEBAR FILTERS */}
      <section className="page-section shop-section" id="catalog">
        <main className="main-layout">
          <ProductFilters
            categories={[]}
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
            <div className="catalog-header">
              <div>
                <h2 id="catalog-title">
                  {sellerTitle
                    ? `Bộ Sưu Tập Chính Hãng — ${sellerTitle}`
                    : 'Danh Sách Sản Phẩm Aethelgard Mall'}
                </h2>
                <span id="results-count" className="results-tag">
                  Hiển thị {filteredProducts.length} sản phẩm
                </span>
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

            {/* Pagination Controls */}
            <div className="pagination-bar">
              <button className="pagination-btn pagination-prev" type="button">
                &larr; Previous
              </button>
              <div className="pagination-numbers">
                <span className="page-num active">1</span>
                <span className="page-num">2</span>
                <span className="page-num">3</span>
                <span className="page-dots">...</span>
                <span className="page-num">10</span>
              </div>
              <button className="pagination-btn pagination-next" type="button">
                Next &rarr;
              </button>
            </div>
          </section>
        </main>
      </section>

      {/* 3. RECOMMENDATIONS CAROUSEL */}
      <RecommendationsSection
        products={products}
        onOpenDrawer={openSellerDrawer}
        onShowToast={showToast}
      />

      {/* 4. NEWSLETTER BANNER */}
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
              We&apos;ll listen to your needs, identify the best approach, and then create a bespoke
              smart EV charging solution that&apos;s right for you.
            </p>
          </div>
        </div>
      </section>

      {/* 5. MODALS & SLIDING DRAWER */}
      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        totalQty={totalCartQty}
        totalAmount={totalCartAmount}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={removeFromCart}
        onClearCart={() => setCart([])}
        onProceedCheckout={() => {
          if (cart.length === 0) {
            showToast('Giỏ hàng trống!');
            return;
          }
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        totalAmount={totalCartAmount}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => {
          showToast('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Aethelgard Mall.');
          setCart([]);
          setIsCheckoutOpen(false);
        }}
      />

      <SellerDrawer
        isOpen={isDrawerOpen}
        product={drawerProduct}
        onClose={closeSellerDrawer}
        onShowToast={showToast}
      />
    </>
  );
}
