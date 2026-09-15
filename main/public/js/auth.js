// User Authentication & Navbar Synchronization
function updateNavbarUser() {
  const user = API.getUser();
  const userArea = document.getElementById("navbar-user-area");
  if (!userArea) return;

  if (user && user.full_name) {
    userArea.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 14px; font-weight: 600; color: #1E293B;">👋 Chào, ${user.full_name}</span>
        <button id="btn-logout" class="btn-outline" style="padding: 6px 14px; font-size: 12px; border-radius: 8px;">Đăng xuất</button>
      </div>
    `;
    document.getElementById("btn-logout")?.addEventListener("click", () => {
      API.clearAuth();
      showToast("Đã đăng xuất khỏi hệ thống.", "info");
      updateNavbarUser();
      if (window.loadCart) window.loadCart();
    });
  } else {
    userArea.innerHTML = `
      <a href="auth.html" class="btn-primary" style="text-decoration: none; padding: 8px 18px; font-size: 14px; border-radius: 9999px; display: inline-block;">Đăng nhập / Đăng ký</a>
    `;
  }
}

window.updateNavbarUser = updateNavbarUser;
document.addEventListener("DOMContentLoaded", updateNavbarUser);
