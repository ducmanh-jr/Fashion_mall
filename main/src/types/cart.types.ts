export interface ICartItem {
  id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  product_id?: number;
  product_name?: string;
  size?: string;
  color?: string;
  price?: number;
  price_at_addition?: number;
  thumbnail?: string;
  stock_quantity?: number;
}

export interface ICart {
  id: number;
  user_id: number;
  items: ICartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping_fee: number;
  total: number;
}

export interface AddToCartDTO {
  variant_id: number;
  quantity: number;
}

export interface UpdateCartItemDTO {
  quantity: number;
}
