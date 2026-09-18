// Shop Profile Storefront Behaviors (GUCCI Official Boutique)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Follow Shop Toggle
  const followBtn = document.getElementById('btn-follow-shop');
  const followersCountEl = document.getElementById('followers-count-val');
  let isFollowing = false;
  let baseFollowers = 485200;

  followBtn?.addEventListener('click', () => {
    isFollowing = !isFollowing;
    if (isFollowing) {
      followBtn.classList.add('following');
      followBtn.innerHTML = '✓ Đang Theo Dõi';
      baseFollowers++;
      showToast('Đã theo dõi GUCCI Official Flagship Store! Nhận voucher giảm 10% ngay.');
    } else {
      followBtn.classList.remove('following');
      followBtn.innerHTML = '+ Theo Dõi';
      baseFollowers--;
      showToast('Đã hủy theo dõi gian hàng.');
    }
    if (followersCountEl) {
      followersCountEl.textContent = (baseFollowers / 1000).toFixed(1) + 'k';
    }
  });

  // 2. Chat With Shop
  const chatBtn = document.getElementById('btn-chat-shop');
  chatBtn?.addEventListener('click', () => {
    showToast('Đang kết nối phiên tư vấn bảo mật riêng với Quản lý Boutique Gucci...');
  });

  // 3. Claim Vouchers
  const claimBtns = document.querySelectorAll('.btn-claim-voucher');
  claimBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('claimed')) {
        btn.classList.add('claimed');
        btn.textContent = '✓ Đã Lưu';
        const code = btn.getAttribute('data-code') || 'VOUCHER';
        showToast(`Đã lưu mã đặc quyền GUCCI [${code}] vào ví tài khoản của bạn!`);
      }
    });
  });

  // 4. Shop Tabs Switcher
  const shopTabs = document.querySelectorAll('.shop-tab-item');
  shopTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      shopTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');

      if (tabName === 'locations') {
        const boutiqueSec = document.getElementById('boutiques-section');
        if (boutiqueSec) {
          boutiqueSec.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        filterProductsByTab(tabName);
      }
    });
  });

  // 5. In-Shop Search
  const searchInput = document.getElementById('shop-search-input');
  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.shop-product-card');

    cards.forEach(card => {
      const title = card.querySelector('.product-card-name')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.product-category-subtext')?.textContent.toLowerCase() || '';
      if (title.includes(query) || category.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // 6. Filter Pills
  const filterPills = document.querySelectorAll('.filter-pill-btn');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const sortType = pill.getAttribute('data-sort');
      sortProductGrid(sortType);
    });
  });

  function sortProductGrid(type) {
    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.shop-product-card'));

    if (type === 'price_asc') {
      cards.sort((a, b) => Number(a.getAttribute('data-price')) - Number(b.getAttribute('data-price')));
    } else if (type === 'price_desc') {
      cards.sort((a, b) => Number(b.getAttribute('data-price')) - Number(a.getAttribute('data-price')));
    } else if (type === 'bestseller') {
      cards.sort((a, b) => Number(b.getAttribute('data-sales')) - Number(a.getAttribute('data-sales')));
    }
    cards.forEach(card => grid.appendChild(card));
  }

  function filterProductsByTab(tab) {
    const cards = document.querySelectorAll('.shop-product-card');
    cards.forEach(card => {
      if (tab === 'all' || tab === 'storefront') {
        card.style.display = 'flex';
      } else if (tab === 'new') {
        const isNew = card.querySelector('.card-tag-badge')?.textContent.includes('New') || card.querySelector('.card-tag-badge')?.textContent.includes('Runway');
        card.style.display = isNew ? 'flex' : 'none';
      } else if (tab === 'bestseller') {
        const sales = Number(card.getAttribute('data-sales')) || 0;
        card.style.display = sales >= 300 ? 'flex' : 'none';
      } else {
        card.style.display = 'flex';
      }
    });
  }

  // 7. Boutique Appointment Booking
  const bookBtns = document.querySelectorAll('.btn-book-appointment');
  bookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const boutiqueName = btn.getAttribute('data-boutique') || 'Boutique';
      showToast(`Đã mở yêu cầu đặt lịch hẹn VIP tại ${boutiqueName}. Chuyên viên sẽ gọi xác nhận trong 10 phút.`);
    });
  });

  // Toast Notification
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
    setTimeout(() => toast.remove(), 3400);
  }
});
