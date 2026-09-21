/** Product Type Definitions */

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

export interface ProductFilter {
  search?: string;
  categoryId?: number;
  sellerId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}
