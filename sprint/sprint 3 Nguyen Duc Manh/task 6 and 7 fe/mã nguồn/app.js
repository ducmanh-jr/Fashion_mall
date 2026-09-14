/**
 * Task 6 & 7 FE: E-Commerce Web Portal Application Logic
 * Layout design matching grid sketch template with visually verified products
 * Developer: Nguyen Duc Manh
 */

// Initial Product Catalog - Visually Verified 20 Real Product Image Assets
const mockProducts = [
  {
    id: 101,
    seller_id: 10,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Adidas Samba OG Classic White Black',
    slug: 'giay-adidas-samba-og-classic',
    description: 'Giày thể thao Adidas Samba OG phiên bản Classic phối màu trắng đen cổ điển.',
    base_price: 2790000,
    image_url: 'img/addidas samba.jpg',
    stock_quantity: 45,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 102,
    seller_id: 10,
    category_id: 2,
    category_name: 'Thời Trang Streetwear & Áo Khoác',
    name: 'Áo Khoác Nỉ Adidas Sakura Special Edition',
    slug: 'ao-khoac-ni-adidas-sakura',
    description: 'Áo khoác nỉ Adidas phối họa tiết thêu hoa anh đào độc đáo.',
    base_price: 2190000,
    image_url: 'img/Adidas sakura zip up hoodie.jpg',
    stock_quantity: 30,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-01T11:00:00Z'
  },
  {
    id: 103,
    seller_id: 10,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Balenciaga Track 4.0 Tan/Beige',
    slug: 'giay-balenciaga-track-40-tan-beige',
    description: 'Sneaker Balenciaga Track 4.0 phối màu tan beige phong cách chunky.',
    base_price: 24500000,
    image_url: 'img/Balenciaga Track 4_0 570391 W2GN7 2009.jpg',
    stock_quantity: 12,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-02T10:00:00Z'
  },
  {
    id: 104,
    seller_id: 10,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Balenciaga Track Thug Edition Black',
    slug: 'giay-balenciaga-track-thug-edition-black',
    description: 'Phiên bản Balenciaga Track Thug đen cực ngầu phong cách streetwear.',
    base_price: 23900000,
    image_url: 'img/#balanciagatrack#thug 🥷🏿.jpg',
    stock_quantity: 8,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-02T11:00:00Z'
  },
  {
    id: 105,
    seller_id: 10,
    category_id: 3,
    category_name: 'Quần & Phụ Kiện Thời Trang',
    name: 'Quần Nỉ Balenciaga Paris Sweatpants White',
    slug: 'quan-ni-balenciaga-paris-sweatpants-white',
    description: 'Quần nỉ ống rộng Balenciaga Paris chữ thêu dọc ống quần màu trắng.',
    base_price: 16500000,
    image_url: 'img/#balenciaga WhatsApp_WeChat：+86 15669556357….jpg',
    stock_quantity: 15,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-02T12:00:00Z'
  },
  {
    id: 106,
    seller_id: 11,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Sneaker Gucci Ace Web Leather',
    slug: 'giay-sneaker-gucci-ace-web-leather',
    description: 'Sneaker Gucci Ace da bò thật phối sọc sọc xanh đỏ truyền thống.',
    base_price: 18900000,
    image_url: 'img/Giày Sneaker Thể Thao Gucci Hàng Siêu Cấp , Replica Like Authentic 1_1.jpg',
    stock_quantity: 20,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-03T09:00:00Z'
  },
  {
    id: 107,
    seller_id: 11,
    category_id: 3,
    category_name: 'Quần & Phụ Kiện Thời Trang',
    name: 'Kính Mát Gucci Double G Rectangular Sunglasses Cream Gold',
    slug: 'kinh-mat-gucci-double-g-rectangular-cream-gold',
    description: 'Kính mát Gucci gọng chữ nhật màu kem đính logo Double G mạ vàng.',
    base_price: 11800000,
    image_url: 'img/Some of favorite Gucci from recent collection 🔥….jpg',
    stock_quantity: 14,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-03T10:00:00Z'
  },
  {
    id: 108,
    seller_id: 11,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Đá Bóng Nike Mercurial Superfly Zoom',
    slug: 'giay-da-bong-nike-mercurial-superfly-zoom',
    description: 'Giày đá bóng cổ cao Nike Mercurial Superfly đế Zoom thi đấu chuyên nghiệp.',
    base_price: 4890000,
    image_url: "img/Nike men's summer sneaker (men shoe collection for 2024).jpg",
    stock_quantity: 60,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-03T11:00:00Z'
  },
  {
    id: 109,
    seller_id: 11,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Puma Speedcat Suede Women Black Pink',
    slug: 'giay-puma-speedcat-suede-women-black-pink',
    description: 'Giày Puma Speedcat da lộn màu đen phối logo hồng nữ tính.',
    base_price: 2290000,
    image_url: 'img/PUMA SHOES _ FALL FOOTWEAR _ AMAZON FASHION FINDS.jpg',
    stock_quantity: 85,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-04T09:00:00Z'
  },
  {
    id: 110,
    seller_id: 12,
    category_id: 2,
    category_name: 'Thời Trang Streetwear & Áo Khoác',
    name: 'Áo Hoodie Balenciaga Ripped Vintage White',
    slug: 'ao-hoodie-balenciaga-ripped-vintage-white',
    description: 'Áo hoodie Balenciaga mài rách hiệu ứng vintage phom oversized.',
    base_price: 28000000,
    image_url: 'img/Oversized ripped balenciaga jacket.jpg',
    stock_quantity: 5,
    stock_status: 'LOW_STOCK',
    created_at: '2026-09-04T10:00:00Z'
  },
  {
    id: 111,
    seller_id: 13,
    category_id: 3,
    category_name: 'Quần & Phụ Kiện Thời Trang',
    name: 'Mũ Lưỡi Trai Gucci Canvas Monogram Cap',
    slug: 'mu-luoi-trai-gucci-canvas-monogram-cap',
    description: 'Mũ cap Gucci dệt họa tiết Monogram Canvas màu nâu be lịch lãm.',
    base_price: 9500000,
    image_url: 'img/108930884729091904.jpg',
    stock_quantity: 120,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-04T11:00:00Z'
  },
  {
    id: 112,
    seller_id: 12,
    category_id: 2,
    category_name: 'Thời Trang Streetwear & Áo Khoác',
    name: 'Áo Khoác Thể Thao Adidas Originals Tracktop Navy Blue',
    slug: 'ao-khoac-the-thao-adidas-originals-tracktop-navy',
    description: 'Áo khoác thể thao Adidas Originals phối 3 sọc dọc màu xanh navy classic.',
    base_price: 2490000,
    image_url: 'img/12173861489974136.jpg',
    stock_quantity: 95,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-05T08:00:00Z'
  },
  {
    id: 113,
    seller_id: 10,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Thể Thao Nike Air White Black (Full Box)',
    slug: 'giay-the-thao-nike-air-white-black-fullbox',
    description: 'Giày thể thao Nike Air trắng phối logo Swoosh đen kèm hộp chính hãng.',
    base_price: 3990000,
    image_url: 'img/20758848278669764.jpg',
    stock_quantity: 75,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-05T09:00:00Z'
  },
  {
    id: 114,
    seller_id: 12,
    category_id: 2,
    category_name: 'Thời Trang Streetwear & Áo Khoác',
    name: 'Áo Khoác Nỉ Adidas 3-Stripes Track Jacket Grey',
    slug: 'ao-khoac-ni-adidas-3stripes-track-jacket-grey',
    description: 'Áo khoác nỉ kéo khóa Adidas màu xám nhạt phom dáng thể thao năng động.',
    base_price: 1890000,
    image_url: 'img/267823509086088024.jpg',
    stock_quantity: 150,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-05T10:00:00Z'
  },
  {
    id: 115,
    seller_id: 13,
    category_id: 3,
    category_name: 'Quần & Phụ Kiện Thời Trang',
    name: 'Bộ Túi Xách Nữ Gucci Dionysus Supreme Shoulder Bag',
    slug: 'bo-tui-xach-nu-gucci-dionysus-supreme-shoulder-bag',
    description: 'Túi xách nữ Gucci Dionysus da GG Supreme đính khóa đầu rồng cao cấp.',
    base_price: 45000000,
    image_url: 'img/298926494039684010.jpg',
    stock_quantity: 40,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-05T11:00:00Z'
  },
  {
    id: 116,
    seller_id: 10,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Đá Bóng Adidas F50 Rose Red White (Full Box)',
    slug: 'giay-da-bong-adidas-f50-rose-red-white',
    description: 'Giày đá bóng chuyên nghiệp Adidas F50 màu trắng phối hoa văn hoa hồng đỏ.',
    base_price: 4590000,
    image_url: 'img/34551122141164310.jpg',
    stock_quantity: 25,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-06T07:00:00Z'
  },
  {
    id: 117,
    seller_id: 13,
    category_id: 3,
    category_name: 'Quần & Phụ Kiện Thời Trang',
    name: 'Túi Đeo Chéo Gucci Dionysus Mini Chain Bag',
    slug: 'tui-deo-cheo-gucci-dionysus-mini-chain-bag',
    description: 'Túi đeo chéo mini Gucci Dionysus dây xích kim loại phong cách sang trọng.',
    base_price: 32900000,
    image_url: 'img/420734790192673506.jpg',
    stock_quantity: 110,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-06T07:30:00Z'
  },
  {
    id: 118,
    seller_id: 12,
    category_id: 2,
    category_name: 'Thời Trang Streetwear & Áo Khoác',
    name: 'Áo Sơ Mi Nỉ Dệt Họa Tiết Gucci Monogram Canvas',
    slug: 'ao-so-mi-ni-det-hoa-tiet-gucci-monogram-canvas',
    description: 'Áo sơ mi nỉ cao cấp dệt toàn bộ họa tiết Gucci Monogram màu nâu cổ điển.',
    base_price: 24500000,
    image_url: 'img/735423814186937745.jpg',
    stock_quantity: 65,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-06T08:00:00Z'
  },
  {
    id: 119,
    seller_id: 12,
    category_id: 2,
    category_name: 'Thời Trang Streetwear & Áo Khoác',
    name: 'Áo Phông Balenciaga Oversized T-Shirt Trắng',
    slug: 'ao-phong-balenciaga-oversized-tshirt-trang',
    description: 'Áo phông Balenciaga màu trắng in chữ nổi phom rộng chuẩn phong cách đường phố.',
    base_price: 14500000,
    image_url: 'img/896427500813736912.jpg',
    stock_quantity: 50,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-06T08:15:00Z'
  },
  {
    id: 120,
    seller_id: 10,
    category_id: 1,
    category_name: 'Giày Sneaker & Thể Thao',
    name: 'Giày Đinh Thể Thao Adidas Adizero White',
    slug: 'giay-dinh-the-thao-adidas-adizero-white',
    description: 'Giày đinh bóng đá Adidas Adizero phiên bản màu trắng bạc thi đấu cực nhẹ.',
    base_price: 4290000,
    image_url: 'img/96545985755445816.jpg',
    stock_quantity: 35,
    stock_status: 'IN_STOCK',
    created_at: '2026-09-06T08:30:00Z'
  }
];

// App State
let cart = [];
let orders = [
  {
    id: 1,
    order_code: 'ORD-20260906-001',
    total_amount: 4980000,
    shipping_address: '123 Đường Lê Lợi, Q.1, TP. Hồ Chí Minh',
    note: 'Giao giờ hành chính',
    status: 'PENDING',
    payment_status: 'UNPAID',
    payment_method: 'COD',
    created_at: '2026-09-06 10:30'
  }
];

// Format Currency
const formatVND = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

// DOM Execution
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const categorySelect = document.getElementById('category-select');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const sortSelect = document.getElementById('sort-select');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const productGrid = document.getElementById('product-grid');
  const resultsCount = document.getElementById('results-count');

  // Modals
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');

  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const checkoutForm = document.getElementById('checkout-form');

  const ordersBtn = document.getElementById('orders-btn');
  const ordersModal = document.getElementById('orders-modal');
  const closeOrdersBtn = document.getElementById('close-orders-btn');

  // Global Filter Handlers for UI Buttons
  window.setCategoryFilter = function(catId) {
    categorySelect.value = catId;
    document.querySelectorAll('.subnav-item').forEach(el => el.classList.remove('active'));
    if (!catId) {
      document.querySelector('.subnav-item:first-child')?.classList.add('active');
    }
    renderCatalog();
  };

  window.quickFilter = function(type) {
    if (type === 'newest') sortSelect.value = 'newest';
    else if (type === 'bestseller') sortSelect.value = 'price_desc';
    else if (type === 'discount') sortSelect.value = 'price_asc';
    renderCatalog();
  };

  // Render Main Catalog (US-12, US-13, US-14)
  function renderCatalog() {
    const keyword = searchInput.value.trim().toLowerCase();
    const categoryId = categorySelect.value;
    const minPrice = minPriceInput.value ? Number(minPriceInput.value) : null;
    const maxPrice = maxPriceInput.value ? Number(maxPriceInput.value) : null;
    const sortBy = sortSelect.value;

    let filtered = mockProducts.filter(p => {
      if (keyword && !p.name.toLowerCase().includes(keyword) && !p.description.toLowerCase().includes(keyword)) {
        return false;
      }
      if (categoryId && p.category_id !== Number(categoryId)) {
        return false;
      }
      if (minPrice !== null && p.base_price < minPrice) return false;
      if (maxPrice !== null && p.base_price > maxPrice) return false;
      return true;
    });

    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.base_price - b.base_price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.base_price - a.base_price);
    } else {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    resultsCount.textContent = `Hiển thị ${filtered.length} sản phẩm`;

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #64748B;">
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p style="margin-top: 6px;">Vui lòng thử từ khóa khác hoặc xóa bộ lọc giá</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(p => {
      let stockTagClass = 'tag-instock';
      let stockTagText = 'Còn hàng';
      if (p.stock_status === 'LOW_STOCK') {
        stockTagClass = 'tag-lowstock';
        stockTagText = `Sắp hết (${p.stock_quantity})`;
      } else if (p.stock_status === 'OUT_OF_STOCK') {
        stockTagClass = 'tag-outstock';
        stockTagText = 'Hết hàng';
      }

      return `
        <div class="product-card">
          <div class="product-card-top">
            <span class="category-tag-top">${p.category_name}</span>
          </div>

          <div class="product-img-box">
            <span class="stock-tag ${stockTagClass}">${stockTagText}</span>
            <img src="${p.image_url}" alt="${p.name}" loading="lazy" onerror="this.src='img/addidas samba.jpg'">
          </div>

          <div class="product-info">
            <h3 class="product-title">${p.name}</h3>
            
            <div class="product-rating-row">
              <span>★ 5.0</span>
              <span class="review-count">(1.2k Reviews)</span>
            </div>

            <p class="product-desc-text">${p.description}</p>

            <div class="product-price-row">
              <span class="price-amount">${formatVND(p.base_price)}</span>
            </div>

            <div class="product-actions">
              <button class="btn-add-cart-pill" onclick="addToCart(${p.id})">Add to Chart</button>
              <button class="btn-buy-now-pill" onclick="buyNow(${p.id})">Buy Now</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Recommendations Section
  function renderRecommendations() {
    const recGrid = document.getElementById('recommendations-grid');
    if (!recGrid) return;

    const recommended = mockProducts.slice(0, 4);
    recGrid.innerHTML = recommended.map(p => `
      <div class="product-card">
        <div class="product-card-top">
          <span class="category-tag-top">${p.category_name}</span>
        </div>
        <div class="product-img-box">
          <img src="${p.image_url}" alt="${p.name}" loading="lazy" onerror="this.src='img/addidas samba.jpg'">
        </div>
        <div class="product-info">
          <h3 class="product-title">${p.name}</h3>
          <div class="product-rating-row">
            <span>★ 5.0</span>
            <span class="review-count">(1.2k Reviews)</span>
          </div>
          <div class="product-price-row">
            <span class="price-amount">${formatVND(p.base_price)}</span>
          </div>
          <div class="product-actions">
            <button class="btn-add-cart-pill" onclick="addToCart(${p.id})">Add to Chart</button>
            <button class="btn-buy-now-pill" onclick="buyNow(${p.id})">Buy Now</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Cart Functions (US-15, US-16)
  window.addToCart = function(productId) {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.product_id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        product_id: productId,
        name: product.name,
        base_price: product.base_price,
        image_url: product.image_url,
        quantity: 1
      });
    }

    updateCartUI();
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  window.buyNow = function(productId) {
    window.addToCart(productId);
    checkoutModal.classList.remove('hidden');
  };

  function updateCartUI() {
    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    const grandTotal = cart.reduce((sum, i) => sum + (i.quantity * i.base_price), 0);

    document.getElementById('cart-badge').textContent = totalQty;
    document.getElementById('modal-cart-qty').textContent = `${totalQty} món`;
    document.getElementById('modal-cart-total').textContent = formatVND(grandTotal);
    document.getElementById('checkout-total').textContent = formatVND(grandTotal);

    const container = document.getElementById('cart-items-container');
    if (cart.length === 0) {
      container.innerHTML = `<p style="text-align: center; color: #64748B; padding: 20px;">Giỏ hàng của bạn đang trống.</p>`;
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <div>
          <strong>${item.name}</strong>
          <div style="color: #10B981; font-weight: 700; font-size: 0.9rem; margin-top: 2px;">${formatVND(item.base_price)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="btn-qty" onclick="changeQty(${item.product_id}, -1)">-</button>
          <span style="font-weight: 700;">${item.quantity}</span>
          <button class="btn-qty" onclick="changeQty(${item.product_id}, 1)">+</button>
          <button class="close-btn" style="font-size: 1.1rem; margin-left: 10px;" onclick="changeQty(${item.product_id}, -999)">&times;</button>
        </div>
      </div>
    `).join('');
  }

  window.changeQty = function(productId, delta) {
    const item = cart.find(i => i.product_id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.product_id !== productId);
    }
    updateCartUI();
  };

  // Checkout (US-17, US-18, US-19)
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }

    const address = document.getElementById('shipping-address').value;
    const note = document.getElementById('order-note').value;
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
    const grandTotal = cart.reduce((sum, i) => sum + (i.quantity * i.base_price), 0);

    const newOrder = {
      id: orders.length + 1,
      order_code: `ORD-20260906-00${orders.length + 1}`,
      total_amount: grandTotal,
      shipping_address: address,
      note,
      status: 'PENDING',
      payment_status: paymentMethod === 'ONLINE' ? 'PAID' : 'UNPAID',
      payment_method: paymentMethod,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    orders.unshift(newOrder);
    cart = [];
    updateCartUI();

    checkoutModal.classList.add('hidden');
    checkoutForm.reset();

    showToast(`Đã đặt hàng thành công! Mã đơn: ${newOrder.order_code}`);
    renderOrders();
    ordersModal.classList.remove('hidden');
  });

  // Order Tracking (US-20, US-21, US-22)
  function renderOrders() {
    const container = document.getElementById('orders-list-container');
    if (orders.length === 0) {
      container.innerHTML = `<p style="text-align: center; color: #64748B; padding: 20px;">Chưa có đơn hàng nào.</p>`;
      return;
    }

    container.innerHTML = orders.map(o => `
      <div class="order-card">
        <div class="order-header">
          <strong>${o.order_code}</strong>
          <span class="status-badge status-${o.status}">${o.status}</span>
        </div>
        <div style="font-size: 0.9rem; color: #64748B; margin-bottom: 10px;">
          Địa chỉ: ${o.shipping_address} | ${o.payment_method} (${o.payment_status})
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <span class="accent-price font-bold" style="font-size: 1.15rem; font-weight: 800;">${formatVND(o.total_amount)}</span>
          ${o.status === 'PENDING' ? `<button class="btn-secondary" style="padding: 6px 14px; width: auto;" onclick="transitionOrder(${o.id}, 'CONFIRMED')">Seller Duyệt Đơn</button>` : ''}
          ${o.status === 'CONFIRMED' ? `<button class="btn-secondary" style="padding: 6px 14px; width: auto;" onclick="transitionOrder(${o.id}, 'SHIPPING')">Giao Shipper</button>` : ''}
          ${o.status === 'SHIPPING' ? `<button class="btn-primary" style="padding: 6px 14px; width: auto;" onclick="transitionOrder(${o.id}, 'COMPLETED')">Hoàn Thành Đơn</button>` : ''}
        </div>
      </div>
    `).join('');
  }

  window.transitionOrder = function(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === 'COMPLETED') {
        order.payment_status = 'PAID';
      }
      renderOrders();
      showToast(`Chuyển trạng thái đơn ${order.order_code} -> ${newStatus}`);
    }
  };

  // Toast Notification
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Event Listeners
  searchBtn.addEventListener('click', renderCatalog);
  searchInput.addEventListener('input', renderCatalog);
  categorySelect.addEventListener('change', renderCatalog);
  minPriceInput.addEventListener('input', renderCatalog);
  maxPriceInput.addEventListener('input', renderCatalog);
  sortSelect.addEventListener('change', renderCatalog);

  resetFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    sortSelect.value = 'newest';
    document.querySelectorAll('.subnav-item').forEach(el => el.classList.remove('active'));
    document.querySelector('.subnav-item:first-child')?.classList.add('active');
    renderCatalog();
  });

  cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
  closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));
  clearCartBtn.addEventListener('click', () => { cart = []; updateCartUI(); });

  proceedCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) { alert('Giỏ hàng của bạn đang trống!'); return; }
    cartModal.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
  });
  closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.add('hidden'));

  ordersBtn.addEventListener('click', () => { renderOrders(); ordersModal.classList.remove('hidden'); });
  closeOrdersBtn.addEventListener('click', () => ordersModal.classList.add('hidden'));

  // Placeholder Coming Soon Handlers for non-functional links and buttons
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href !== '#hero' && href !== '#shop') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Tính năng sắp ra mắt!');
      });
    }
  });

  const userAvatar = document.querySelector('.user-avatar');
  if (userAvatar) {
    userAvatar.addEventListener('click', () => {
      showToast('Tính năng quản lý tài khoản sắp ra mắt!');
    });
  }

  document.querySelectorAll('.site-footer a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Tính năng sắp ra mắt!');
    });
  });

  // Initial Renders
  renderCatalog();
  renderRecommendations();
});
