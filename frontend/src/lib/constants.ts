/**
 * App-wide constants — single source of truth
 * Thay thế tất cả hardcoded values rải rác trong các page files
 */

export const APP_NAME = 'Aethelgard Shopping Mall';
export const APP_SHORT_NAME = 'Aethelgard Mall';

/** API Configuration */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 4000;

/** Local Storage Keys */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'aethelgard_token',
  AUTH_USER: 'aethelgard_user',
  REDIRECT_PATH: 'redirect_after_login',
} as const;

/** Routes — dùng cho navigation, redirect, guards */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SELLER: {
    DASHBOARD: '/',
    PRODUCTS: '/',
    INVENTORY: '/inventory',
    ORDERS: '/orders',
    INCOME: '/income-statistics',
    VOUCHERS: '/vouchers',
    TRANSACTIONS: '/transactions',
    SHOP_PROFILE: '/shop-profile',
  },
} as const;

/** Seller Navbar Links */
export const SELLER_NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Orders', href: '/orders' },
  { name: 'Inventory', href: '/inventory' },
  { name: 'Income Statistics', href: '/income-statistics' },
  { name: 'Vouchers', href: '/vouchers' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Shop Profile', href: '/shop-profile' },
] as const;

/** Order Status Constants */
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Chờ Xác Nhận',
  CONFIRMED: 'Đã Xác Nhận',
  PROCESSING: 'Đang Xử Lý',
  SHIPPED: 'Đang Vận Chuyển',
  DELIVERED: 'Đã Giao',
  CANCELLED: 'Đã Hủy',
};

/** Stock Status */
export const STOCK_STATUS = {
  IN_STOCK: 'IN_STOCK',
  LOW_STOCK: 'LOW_STOCK',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
} as const;

/** Pagination */
export const DEFAULT_PAGE_SIZE = 12;

/** Image fallback */
export const FALLBACK_IMAGE = '/img/products/adidas-samba.jpg';
