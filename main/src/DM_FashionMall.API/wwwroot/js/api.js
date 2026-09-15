// Centralized API Client & UI Helper
const API = {
  baseUrl: "/api",

  getToken() {
    return localStorage.getItem("fashion_mall_token");
  },

  setAuth(token, user) {
    localStorage.setItem("fashion_mall_token", token);
    localStorage.setItem("fashion_mall_user", JSON.stringify(user));
  },

  getUser() {
    const userStr = localStorage.getItem("fashion_mall_user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  clearAuth() {
    localStorage.removeItem("fashion_mall_token");
    localStorage.removeItem("fashion_mall_user");
  },

  async request(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers
      });

      const json = await response.json();

      if (!response.ok || json.success === false) {
        if (response.status === 401 && !endpoint.includes("/auth/login")) {
          // Token expired, clear auth
          this.clearAuth();
          if (window.updateNavbarUser) window.updateNavbarUser();
        }
        throw new Error(json.error || json.message || `Lỗi HTTP ${response.status}`);
      }

      return json;
    } catch (err) {
      console.error(`[API Error] ${endpoint}:`, err);
      throw err;
    }
  },

  get(endpoint, params = {}) {
    const query = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null && v !== "") {
        query.append(k, v);
      }
    }
    const queryString = query.toString() ? `?${query.toString()}` : "";
    return this.request(`${endpoint}${queryString}`, { method: "GET" });
  },

  post(endpoint, body = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
  },

  put(endpoint, body = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
};

// UI Notification Helper (Toast)
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.bottom = "24px";
    container.style.right = "24px";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.style.padding = "14px 20px";
  toast.style.borderRadius = "12px";
  toast.style.fontWeight = "500";
  toast.style.fontSize = "14px";
  toast.style.color = "#FFFFFF";
  toast.style.backgroundColor = type === "success" ? "#10B981" : (type === "error" ? "#EF4444" : "#3B82F6");
  toast.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.2)";
  toast.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "10px";
  toast.style.opacity = "0";
  toast.style.transform = "translateY(20px)";

  const icon = type === "success" ? "✓" : (type === "error" ? "✕" : "ℹ");
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Format VND currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount || 0);
}
