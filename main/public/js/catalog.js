// Product Catalog & Filter Logic
let currentFilter = {
  category_id: undefined,
  brand_id: undefined,
  min_price: undefined,
  max_price: undefined,
  search: "",
  sort_by: "latest"
};

async function loadCategories() {
  const container = document.getElementById("category-list");
  if (!container) return;

  try {
    const res = await API.get("/products/categories");
    if (res.data) {
      container.innerHTML = `
        <button class="filter-chip active" data-category="">Tất cả</button>
        ${res.data.map(c => `
          <button class="filter-chip" data-category="${c.id}">${c.name}</button>
        `).join("")}
      `;

      container.querySelectorAll(".filter-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          container.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          currentFilter.category_id = btn.dataset.category || undefined;
          loadProducts();
        });
      });
    }
  } catch (err) {
    console.error("Lỗi tải danh mục:", err);
  }
}

async function loadBrands() {
  const container = document.getElementById("brand-list");
  if (!container) return;

  try {
    const res = await API.get("/products/brands");
    if (res.data) {
      container.innerHTML = res.data.map(b => `
        <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; margin-bottom: 8px;">
          <input type="radio" name="brand-filter" value="${b.id}">
          <span>${b.name}</span>
        </label>
      `).join("");

      container.querySelectorAll("input[name='brand-filter']").forEach(input => {
        input.addEventListener("change", (e) => {
          currentFilter.brand_id = e.target.value ? Number(e.target.value) : undefined;
          loadProducts();
        });
      });
    }
  } catch (err) {
    console.error("Lỗi tải thương hiệu:", err);
  }
}

async function loadProducts() {
  const grid = document.getElementById("product-grid");
  const countLabel = document.getElementById("product-count-label");
  if (!grid) return;

  grid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
      <p style="font-size: 16px; color: var(--text-muted);">Đang tải sản phẩm từ máy chủ...</p>
    </div>
  `;

  try {
    const res = await API.get("/products", currentFilter);
    const products = res.data.products || [];

    if (countLabel) {
      countLabel.textContent = `Hiển thị ${products.length} trên tổng số ${res.data.total} sản phẩm`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 0;">
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p style="color: var(--text-muted); margin-top: 8px;">Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm của bạn.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(p => {
      const defaultVariant = p.variants && p.variants.length > 0 ? p.variants[0] : null;
      const variantId = defaultVariant ? defaultVariant.id : "";
      const variantSize = defaultVariant ? defaultVariant.size : "Free";
      const imageSrc = p.thumbnail || "img/fashion mood board.jpg";

      return `
        <div class="product-card" data-product-id="${p.id}">
          <div class="product-card-img-wrapper" style="position: relative; overflow: hidden; border-radius: 16px; background: #f1f5f9;">
            <img src="${imageSrc}" alt="${p.name}" style="width: 100%; height: 280px; object-fit: cover; transition: transform 0.4s ease;" 
                 onerror="this.src='img/fashion mood board.jpg'">
            ${p.brand_name ? `<span class="badge-brand" style="position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.75); color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase;">${p.brand_name}</span>` : ""}
            ${p.rating ? `<span style="position: absolute; top: 12px; right: 12px; background: #fff; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">★ ${p.rating}</span>` : ""}
          </div>
          <div style="padding: 16px 4px 8px;">
            <div style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">${p.category_name || "Thời trang"}</div>
            <h4 style="font-size: 15px; font-weight: 600; margin: 6px 0; line-height: 1.4; height: 42px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${p.name}</h4>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
              <span style="font-size: 17px; font-weight: 700; color: #0F172A;">${formatCurrency(p.base_price)}</span>
              ${defaultVariant ? `
                <button class="btn-add-to-cart" data-variant-id="${variantId}" style="background: #18181B; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                  + Thêm giỏ (Size ${variantSize})
                </button>
              ` : `
                <button disabled style="background: #e2e8f0; color: #94a3b8; border: none; padding: 8px 14px; border-radius: 8px; font-size: 13px;">Hết hàng</button>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Bind Add to Cart buttons
    grid.querySelectorAll(".btn-add-to-cart").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const variantId = Number(btn.dataset.variantId);
        if (!variantId) return;

        const user = API.getUser();
        if (!user) {
          showToast("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", "error");
          setTimeout(() => window.location.href = "auth.html", 1000);
          return;
        }

        try {
          btn.textContent = "Đang thêm...";
          btn.disabled = true;
          await API.post("/cart/items", { variant_id: variantId, quantity: 1 });
          showToast("Đã thêm sản phẩm vào giỏ hàng!", "success");
          if (window.loadCart) window.loadCart();
          if (window.openCartDrawer) window.openCartDrawer();
        } catch (err) {
          showToast(err.message || "Không thể thêm vào giỏ hàng", "error");
        } finally {
          btn.textContent = "+ Thêm giỏ";
          btn.disabled = false;
        }
      });
    });

  } catch (err) {
    console.error("Lỗi tải sản phẩm:", err);
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: #ef4444;">
        <p>Lỗi kết nối máy chủ khi tải danh sách sản phẩm.</p>
      </div>
    `;
  }
}

// Search debounce
let searchTimer = null;
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      currentFilter.search = e.target.value.trim();
      loadProducts();
    }, 400);
  });
}

function setupSorting() {
  const sortSelect = document.getElementById("sort-select");
  if (!sortSelect) return;

  sortSelect.addEventListener("change", (e) => {
    currentFilter.sort_by = e.target.value;
    loadProducts();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadBrands();
  loadProducts();
  setupSearch();
  setupSorting();
});
