/** Order Type Definitions — camelCase thống nhất */

export interface OrderItem {
  id: number;
  productName: string;
  specs: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface TimelineItem {
  title: string;
  desc: string;
  time: string;
  status: 'done' | 'current' | 'pending';
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
  placedDateText?: string;
  carrier: string;
  trackingCode: string;
  estimatedDelivery: string;
  lastUpdateLocation?: string;
  lastUpdate?: string;
  lastLocation?: string;
  progressStep: number;
  progressDates?: {
    ordered: string;
    confirmed: string;
    shipped: string;
    delivered: string;
  };
  timeline?: TimelineItem[];
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  taxes: number;
  discount: number;
  totalAmount: number;
}

export interface UpdateOrderStatus {
  status: number;
  location?: string;
}
