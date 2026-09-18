export interface Product {
  id: number;
  sellerId?: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  slug: string;
  sku: string;
  collectionName?: string;
  description: string;
  basePrice: number;
  originalPrice?: number;
  discountPercent?: number;
  imageUrl: string;
  galleryUrls?: string[];
  stockQuantity: number;
  stockStatus: string;
  material?: string;
  careInstructions?: string;
  countryOfOrigin?: string;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  sku: string;
  price: number;
  stockQuantity: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

export interface OrderItem {
  id: number;
  productName: string;
  specs: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  status: string;
  statusLabel: string;
  createdAt: string;
  carrier: string;
  trackingCode: string;
  estimatedDelivery: string;
  lastUpdateLocation?: string;
  progressStep: number;
  subtotal: number;
  shippingCharge: number;
  taxes: number;
  discount: number;
  totalAmount: number;
  items: OrderItem[];
}

export interface InventorySummary {
  totalSku: number;
  totalStockItems: number;
  totalStockValue: number;
  lowStockAlertCount: number;
  items: InventoryItem[];
}

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  categoryName: string;
  imageUrl: string;
  price: number;
  stockQuantity: number;
  stockStatus: string;
  safetyThreshold: number;
}

export interface MonthlyData {
  month: string;
  existingUsers: number;
  newUsers: number;
  valTotal: string;
  isActive?: boolean;
  newText?: string;
  existText?: string;
}

export interface Transaction {
  id: string;
  customer: string;
  product: string;
  status: string;
  qty: number;
  unitPrice: string;
  total: string;
}

export interface IncomeSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  growthPercent: number;
  monthlyMatrix: MonthlyData[];
  recentTransactions: Transaction[];
}

export interface StoreProfile {
  id: number;
  storeCode: string;
  brandId: string;
  storeName: string;
  storeType: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  latitude: number;
  longitude: number;
  services: string[];
  categories: string[];
  imageUrl?: string;
  storeUrl?: string;
}
