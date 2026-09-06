-- ============================================================================
-- DATABASE SCHEMA FOR CATALOG, CART, ORDER & PAYMENT (SPRINT 3 - HTTMDTTHA-36)
-- Target RDBMS: SQLite / PostgreSQL / MySQL Standard Compliant
-- Developer: Nguyen Duc Manh
-- ============================================================================

-- Enable Foreign Key constraints enforcement
PRAGMA foreign_keys = ON;

-- ----------------------------------------------------------------------------
-- 1. Table: Categories (Danh mục sản phẩm)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER REFERENCES Categories(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. Table: Products (Sản phẩm gian hàng)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL REFERENCES Categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    base_price DECIMAL(12, 2) NOT NULL CHECK (base_price >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DRAFT', 'DELETED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 3. Table: Product_Images (Hình ảnh sản phẩm - tối đa 5 hình)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Product_Images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 4. Table: Inventories (Quản lý hàng tồn kho)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Inventories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL UNIQUE REFERENCES Products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
    low_stock_threshold INTEGER NOT NULL DEFAULT 5,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_STOCK' CHECK (status IN ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK')),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. Table: Carts (Giỏ hàng người dùng)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CHECKED_OUT', 'ABANDONED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 6. Table: Cart_Items (Chi tiết món ăn/hàng trong giỏ)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Cart_Items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL REFERENCES Carts(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price_at_addition DECIMAL(12, 2) NOT NULL CHECK (price_at_addition >= 0),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT idx_cart_product_unique UNIQUE (cart_id, product_id)
);

-- ----------------------------------------------------------------------------
-- 7. Table: Orders (Quản lý đơn hàng)
-- Các trạng thái bắt buộc: PENDING, CONFIRMED, SHIPPING, COMPLETED, CANCELLED
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
    shipping_address TEXT NOT NULL,
    note TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID', 'REFUNDED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 8. Table: Order_Items (Chi tiết các mặt hàng trong đơn)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Order_Items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES Products(id) ON DELETE RESTRICT,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(12, 2) NOT NULL CHECK (subtotal >= 0),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 9. Table: Payments (Thanh toán đơn hàng)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('COD', 'ONLINE', 'BANK_TRANSFER', 'E_WALLET')),
    transaction_id VARCHAR(100) UNIQUE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')),
    paid_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 10. Table: Order_Status_Histories (Lịch sử biến động trạng thái đơn hàng)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Order_Status_Histories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    previous_status VARCHAR(50) CHECK (previous_status IS NULL OR previous_status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED')),
    new_status VARCHAR(50) NOT NULL CHECK (new_status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED')),
    changed_by INTEGER NOT NULL,
    note TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON Products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_seller ON Products(seller_id);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON Product_Images(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON Cart_Items(cart_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON Orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON Orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON Order_Items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON Payments(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_histories_order ON Order_Status_Histories(order_id);
