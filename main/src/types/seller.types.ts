export interface ShopProfile {
  id: number;
  seller_id: number;
  shop_name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  bio: string | null;
  warehouse_address: string | null;
  phone: string | null;
  email: string | null;
  rating: number;
  is_vacation_mode: boolean;
  created_at: string;
}

export interface UpdateShopDTO {
  shop_name?: string;
  bio?: string;
  warehouse_address?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  banner_url?: string;
  is_vacation_mode?: boolean;
}

export interface SellerProductItem {
  id: number;
  seller_id: number;
  category_id: number;
  category_name?: string;
  brand_id: number;
  brand_name?: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  rating: number;
  is_featured: boolean;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  created_at: string;
  total_stock: number;
  image_url?: string;
  variant_count?: number;
}

export interface CreateProductDTO {
  name: string;
  category_id: number;
  brand_id: number;
  description: string;
  base_price: number;
  is_featured?: boolean;
  image_url?: string;
  variants: {
    sku: string;
    size: string;
    color: string;
    price: number;
    stock_quantity: number;
    image_url?: string;
  }[];
}

export interface UpdateProductDTO {
  name?: string;
  category_id?: number;
  brand_id?: number;
  description?: string;
  base_price?: number;
  status?: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  is_featured?: boolean;
}

export interface InventoryItem {
  product_id: number;
  product_name: string;
  slug: string;
  base_price: number;
  image_url?: string;
  quantity: number;
  reserved_quantity: number;
  low_stock_threshold: number;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
}

export interface SellerOrderItem {
  id: number;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  note?: string;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total_amount: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPING" | "COMPLETED" | "CANCELLED";
  payment_status: "UNPAID" | "PAID" | "REFUNDED";
  created_at: string;
  item_count: number;
  items?: {
    id: number;
    product_name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
}

export interface ShippingChannel {
  id: number;
  name: string;
  code: string;
  is_enabled: boolean;
  cost: number;
  estimated_days: string;
}

export interface PromotionItem {
  id: number;
  shop_id: number;
  voucher_code: string;
  title: string;
  discount_type: "PERCENT" | "FIXED";
  discount_value: number;
  min_order_value: number;
  usage_limit: number;
  used_count: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface CreatePromotionDTO {
  voucher_code: string;
  title: string;
  discount_type: "PERCENT" | "FIXED";
  discount_value: number;
  min_order_value: number;
  usage_limit: number;
  start_date?: string;
  end_date: string;
}

export interface SellerWalletInfo {
  id: number;
  seller_id: number;
  available_balance: number;
  pending_balance: number;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_account_name: string | null;
  transactions: {
    id: number;
    type: "SETTLEMENT" | "WITHDRAW" | "REFUND";
    amount: number;
    note: string | null;
    status: "PENDING" | "COMPLETED" | "FAILED";
    created_at: string;
  }[];
}

export interface ReviewItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image?: string;
  customer_name: string;
  rating: number;
  comment: string;
  seller_reply: string | null;
  reply_at: string | null;
  created_at: string;
}

export interface DashboardStats {
  todayRevenue: number;
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockCount: number;
  shopRating: number;
  recentOrders: SellerOrderItem[];
  monthlyRevenueChart: { month: string; revenue: number }[];
}

export interface AIDescriptionRequest {
  productName: string;
  category: string;
  brand: string;
  keyFeatures?: string[];
  tone?: "luxury" | "streetwear" | "minimalist" | "sporty";
}

export interface AIDescriptionResponse {
  title: string;
  highlight: string;
  editorialDescription: string;
  materialAndFit: string;
  stylingTips: string;
  hashtags: string[];
}
