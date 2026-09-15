-- ============================================================================
-- DATABASE SCHEMA: DM FASHION MALL (INTEGRATED SYSTEM)
-- Engine: SQLite (Native node:sqlite DatabaseSync)
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Users & Authentication
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'ADMIN', 'MERCHANT')),
    otp_code VARCHAR(10),
    otp_expires_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER REFERENCES Categories(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Brands
CREATE TABLE IF NOT EXISTS Brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products
CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL DEFAULT 1 REFERENCES Users(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES Categories(id) ON DELETE RESTRICT,
    brand_id INTEGER REFERENCES Brands(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    base_price DECIMAL(12, 2) NOT NULL CHECK (base_price >= 0),
    rating DECIMAL(2, 1) NOT NULL DEFAULT 5.0,
    is_featured BOOLEAN NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'DRAFT', 'DELETED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Product Variants (Size, Color, Price, Stock)
CREATE TABLE IF NOT EXISTS Product_Variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL UNIQUE,
    size VARCHAR(20) NOT NULL DEFAULT 'FREE',
    color VARCHAR(50) NOT NULL DEFAULT 'Default',
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Product Images
CREATE TABLE IF NOT EXISTS Product_Images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT 0,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Inventories
CREATE TABLE IF NOT EXISTS Inventories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL UNIQUE REFERENCES Products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
    low_stock_threshold INTEGER NOT NULL DEFAULT 5,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_STOCK' CHECK (status IN ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK')),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Carts
CREATE TABLE IF NOT EXISTS Carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CHECKED_OUT', 'ABANDONED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Cart Items
CREATE TABLE IF NOT EXISTS Cart_Items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL REFERENCES Carts(id) ON DELETE CASCADE,
    variant_id INTEGER NOT NULL REFERENCES Product_Variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price_at_addition DECIMAL(12, 2) NOT NULL CHECK (price_at_addition >= 0),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT idx_cart_variant_unique UNIQUE (cart_id, variant_id)
);

-- 10. Orders
CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code VARCHAR(50) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE RESTRICT,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    note TEXT,
    subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    shipping_fee DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_fee >= 0),
    total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID', 'REFUNDED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 11. Order Items
CREATE TABLE IF NOT EXISTS Order_Items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    variant_id INTEGER NOT NULL REFERENCES Product_Variants(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(12, 2) NOT NULL CHECK (subtotal >= 0),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 12. Payments
CREATE TABLE IF NOT EXISTS Payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('COD', 'ONLINE', 'BANK_TRANSFER', 'CREDIT_CARD')),
    transaction_id VARCHAR(100) UNIQUE,
    amount DECIMAL(12, 2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    paid_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high performance
CREATE INDEX IF NOT EXISTS idx_users_email ON Users(email);
CREATE INDEX IF NOT EXISTS idx_products_category ON Products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON Products(brand_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON Product_Variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON Product_Images(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON Cart_Items(cart_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON Orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON Orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON Order_Items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON Payments(order_id);
-- 13. Shops
CREATE TABLE IF NOT EXISTS Shops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    shop_name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    banner_url TEXT,
    bio TEXT,
    warehouse_address TEXT,
    phone VARCHAR(20),
    email VARCHAR(150),
    rating DECIMAL(2, 1) NOT NULL DEFAULT 5.0,
    is_vacation_mode BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. Shipping Channels
CREATE TABLE IF NOT EXISTS Shipping_Channels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    is_enabled BOOLEAN NOT NULL DEFAULT 1,
    cost DECIMAL(12, 2) NOT NULL DEFAULT 30000,
    estimated_days VARCHAR(50) NOT NULL DEFAULT '2-3 ngày'
);

-- 15. Promotions
CREATE TABLE IF NOT EXISTS Promotions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL REFERENCES Shops(id) ON DELETE CASCADE,
    voucher_code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    discount_type VARCHAR(20) NOT NULL DEFAULT 'PERCENT' CHECK (discount_type IN ('PERCENT', 'FIXED')),
    discount_value DECIMAL(12, 2) NOT NULL CHECK (discount_value > 0),
    min_order_value DECIMAL(12, 2) NOT NULL DEFAULT 0,
    usage_limit INTEGER NOT NULL DEFAULT 100,
    used_count INTEGER NOT NULL DEFAULT 0,
    start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 16. Seller Wallets
CREATE TABLE IF NOT EXISTS Seller_Wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    available_balance DECIMAL(14, 2) NOT NULL DEFAULT 0,
    pending_balance DECIMAL(14, 2) NOT NULL DEFAULT 0,
    bank_name VARCHAR(100),
    bank_account_number VARCHAR(50),
    bank_account_name VARCHAR(100),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 17. Wallet Transactions
CREATE TABLE IF NOT EXISTS Wallet_Transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_id INTEGER NOT NULL REFERENCES Seller_Wallets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('SETTLEMENT', 'WITHDRAW', 'REFUND')),
    amount DECIMAL(14, 2) NOT NULL,
    note TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 18. Product Reviews
CREATE TABLE IF NOT EXISTS Product_Reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES Orders(id) ON DELETE SET NULL,
    user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    seller_reply TEXT,
    reply_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_shops_seller ON Shops(seller_id);
CREATE INDEX IF NOT EXISTS idx_promotions_shop ON Promotions(shop_id);
CREATE INDEX IF NOT EXISTS idx_wallet_trans_wallet ON Wallet_Transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON Product_Reviews(product_id);
