export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPING" | "COMPLETED" | "CANCELLED";
export type PaymentMethod = "COD" | "ONLINE" | "BANK_TRANSFER" | "CREDIT_CARD";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface IOrderItem {
  id?: number;
  order_id?: number;
  variant_id: number;
  product_name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IPayment {
  id?: number;
  order_id: number;
  payment_method: PaymentMethod;
  transaction_id?: string | null;
  amount: number;
  status: PaymentStatus;
  paid_at?: string | null;
}

export interface IOrder {
  id: number;
  order_code: string;
  user_id: number;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  note?: string | null;
  subtotal: number;
  discount: number;
  shipping_fee: number;
  total_amount: number;
  status: OrderStatus;
  payment_status?: string;
  created_at?: string;
  updated_at?: string;
  items?: IOrderItem[];
  payment?: IPayment;
}

export interface CreateOrderDTO {
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  payment_method: PaymentMethod;
  note?: string;
}
