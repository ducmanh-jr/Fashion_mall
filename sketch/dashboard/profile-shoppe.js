// Profile Shoppe Interactive Behaviors
document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Thumbnail Switcher
  const mainImg = document.getElementById('main-product-img');
  const thumbs = document.querySelectorAll('.thumb-item');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const newSrc = thumb.getAttribute('data-img-src');
      if (newSrc && mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 2. Color Swatch Selector
  const colorSwatches = document.querySelectorAll('.color-swatch-btn');
  const colorNameLabel = document.getElementById('current-color-name');

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const name = swatch.getAttribute('data-color-name');
      if (colorNameLabel && name) {
        colorNameLabel.textContent = name;
      }
    });
  });

  // 3. Size Selector
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 4. Quantity Stepper
  let currentQty = 1;
  const qtyDisplay = document.getElementById('qty-display');
  const btnMinus = document.getElementById('btn-qty-minus');
  const btnPlus = document.getElementById('btn-qty-plus');

  btnMinus?.addEventListener('click', () => {
    if (currentQty > 1) {
      currentQty--;
      if (qtyDisplay) qtyDisplay.textContent = currentQty;
    }
  });

  btnPlus?.addEventListener('click', () => {
    currentQty++;
    if (qtyDisplay) qtyDisplay.textContent = currentQty;
  });

  // 5. Wishlist Toggle
  const wishlistBtn = document.getElementById('btn-wishlist');
  wishlistBtn?.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    const isLoved = wishlistBtn.classList.contains('active');
    wishlistBtn.innerHTML = isLoved ? '♥' : '♡';
    showToast(isLoved ? 'Đã thêm vào danh sách yêu thích!' : 'Đã xóa khỏi danh sách yêu thích!');
  });

  // 6. Add to Cart & Buy Now
  const addToCartBtn = document.getElementById('btn-add-cart');
  const buyNowBtn = document.getElementById('btn-buy-now');

  addToCartBtn?.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.active')?.textContent.trim() || 'M';
    const selectedColor = colorNameLabel?.textContent.trim() || 'Charcoal Gray';
    showToast(`Đã thêm ${currentQty}x Áo Hoodie (${selectedColor}, Size ${selectedSize}) vào giỏ hàng!`);
  });

  buyNowBtn?.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-btn.active')?.textContent.trim() || 'M';
    showToast(`Đang chuyển đến thanh toán cho size ${selectedSize}...`);
  });

  // 7. Tabs Switching
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(`tab-${targetId}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 8. Countdown Timer (02:30:25)
  let totalSeconds = 2 * 3600 + 30 * 60 + 25;
  const timerDisplay = document.getElementById('flash-timer');

  if (timerDisplay) {
    setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
      }
    }, 1000);
  }

  // 9. Toast Notifications
  function showToast(msg) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }
});
