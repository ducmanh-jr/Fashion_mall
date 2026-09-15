// Cart Drawer & Checkout Experience
let cartData = null;

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.style.transform = "translateX(0)";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (drawer && overlay) {
    drawer.style.transform = "translateX(100%)";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
  }
}

window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;

async function loadCart() {
  const badge = document.getElementById("cart-badge");
  const list = document.getElementById("cart-items-list");
  const subtotalLabel = document.getElementById("cart-subtotal");
  const totalLabel = document.getElementById("cart-total");
  const btnCheckout = document.getElementById("btn-checkout-drawer");

  const user = API.getUser();
  if (!user) {
    if (badge) badge.textContent = "0";
    if (list) {
      list.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <p style="color: var(--text-muted); font-size: 14px;">Vui lòng đăng nhập để xem giỏ hàng.</p>
          <a href="auth.html" class="btn-primary" style="display: inline-block; margin-top: 14px; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 13px;">Đăng nhập ngay</a>
        </div>
      `;
    }
    return;
  }

  try {
    const res = await API.get("/cart");
    cartData = res.data;

    const itemCount = cartData.items.reduce((sum, i) => sum + i.quantity, 0);
    if (badge) badge.textContent = itemCount.toString();

    if (subtotalLabel) subtotalLabel.textContent = formatCurrency(cartData.subtotal);
    if (totalLabel) totalLabel.textContent = formatCurrency(cartData.total);

    if (btnCheckout) {
      btnCheckout.disabled = cartData.items.length === 0;
    }

    if (!list) return;

    if (cartData.items.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <p style="font-size: 32px; margin-bottom: 8px;">🛍️</p>
          <p style="color: var(--text-muted); font-size: 14px;">Giỏ hàng của bạn đang trống.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = cartData.items.map(item => `
      <div class="cart-item" style="display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); align-items: center;">
        <img src="${item.thumbnail || 'img/fashion mood board.jpg'}" alt="${item.product_name}" 
             style="width: 65px; height: 65px; object-fit: cover; border-radius: 8px; background: #f1f5f9;"
             onerror="this.src='img/fashion mood board.jpg'">
        <div style="flex: 1; min-width: 0;">
          <h5 style="font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.product_name}</h5>
          <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0;">Size: ${item.size} | Màu: ${item.color}</p>
          <span style="font-size: 14px; font-weight: 700; color: #0F172A;">${formatCurrency(item.price || item.price_at_addition)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn-qty" data-id="${item.id}" data-qty="${item.quantity - 1}" style="width: 26px; height: 26px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer;">-</button>
          <span style="font-size: 13px; font-weight: 600; min-width: 16px; text-align: center;">${item.quantity}</span>
          <button class="btn-qty" data-id="${item.id}" data-qty="${item.quantity + 1}" style="width: 26px; height: 26px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer;">+</button>
          <button class="btn-remove-item" data-id="${item.id}" style="border: none; background: transparent; color: #ef4444; font-size: 16px; cursor: pointer; margin-left: 6px;">×</button>
        </div>
      </div>
    `).join("");

    // Bind quantity update
    list.querySelectorAll(".btn-qty").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.id);
        const qty = Number(btn.dataset.qty);
        try {
          await API.put(`/cart/items/${id}`, { quantity: qty });
          loadCart();
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    });

    // Bind remove
    list.querySelectorAll(".btn-remove-item").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = Number(btn.dataset.id);
        try {
          await API.delete(`/cart/items/${id}`);
          showToast("Đã xóa sản phẩm khỏi giỏ hàng.");
          loadCart();
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    });

  } catch (err) {
    console.error("Lỗi tải giỏ hàng:", err);
  }
}

window.loadCart = loadCart;

// Checkout Modal
function openCheckoutModal() {
  const user = API.getUser();
  if (!user) {
    showToast("Vui lòng đăng nhập để thanh toán!", "error");
    window.location.href = "auth.html";
    return;
  }

  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  // Prefill user data
  document.getElementById("checkout-name").value = user.full_name || "";
  document.getElementById("checkout-phone").value = user.phone || "";
  document.getElementById("checkout-address").value = user.address || "";
  document.getElementById("checkout-total-preview").textContent = formatCurrency(cartData?.total || 0);

  modal.style.display = "flex";
  closeCartDrawer();
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.style.display = "none";
}

async function submitCheckout(e) {
  e.preventDefault();

  const customer_name = document.getElementById("checkout-name").value.trim();
  const customer_phone = document.getElementById("checkout-phone").value.trim();
  const shipping_address = document.getElementById("checkout-address").value.trim();
  const payment_method = document.getElementById("checkout-payment").value;
  const note = document.getElementById("checkout-note")?.value?.trim() || "";

  if (!customer_name || !customer_phone || !shipping_address) {
    showToast("Vui lòng điền đầy đủ Tên, Số điện thoại và Địa chỉ nhận hàng.", "error");
    return;
  }

  const btnSubmit = document.getElementById("btn-submit-order");
  try {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Đang xử lý đơn hàng...";

    const res = await API.post("/orders", {
      customer_name,
      customer_phone,
      shipping_address,
      payment_method,
      note
    });

    closeCheckoutModal();
    loadCart();

    const order = res.data;
    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\n\nMã đơn hàng: ${order.order_code}\nTổng thanh toán: ${formatCurrency(order.total_amount)}\nPhương thức: ${order.payment?.payment_method}\n\nCảm ơn bạn đã lựa chọn mua sắm tại DM Fashion Mall!`);
  } catch (err) {
    showToast(err.message || "Đặt hàng thất bại", "error");
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Xác nhận đặt hàng";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();

  document.getElementById("btn-open-cart")?.addEventListener("click", openCartDrawer);
  document.getElementById("btn-close-cart")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cart-overlay")?.addEventListener("click", closeCartDrawer);

  document.getElementById("btn-checkout-drawer")?.addEventListener("click", openCheckoutModal);
  document.getElementById("btn-close-checkout")?.addEventListener("click", closeCheckoutModal);
  document.getElementById("checkout-form")?.addEventListener("submit", submitCheckout);
});
