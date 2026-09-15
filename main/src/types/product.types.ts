export interface ICategory {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  description?: string | null;
}

export interface IBrand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string | null;
  description?: string | null;
}

export interface IProductVariant {
  id: number;
  product_id: number;
  sku: string;
  size: string;
  color: string;
  price: number;
  stock_quantity: number;
  image_url?: string | null;
}

export interface IProduct {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  slug: string;
  description?: string | null;
  base_price: number;
  thumbnail?: string | null;
  rating?: number;
  is_featured?: number;
  created_at?: string;
  category_name?: string;
  brand_name?: string;
  variants?: IProductVariant[];
}

export interface ProductQueryFilter {
  category_id?: number;
  brand_id?: number;
  min_price?: number;
  max_price?: number;
  rating?: number;
  search?: string;
  sort_by?: "price_asc" | "price_desc" | "rating" | "latest";
  page?: number;
  limit?: number;
}
