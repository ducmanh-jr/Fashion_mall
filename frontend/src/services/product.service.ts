import apiClient from './api-client';
import type { Product, Category, ProductFilter, PagedResult } from '@/types';
import { fallbackProducts, fallbackCategories } from '@/lib/mock-data';

export const productService = {
  async getProducts(params?: ProductFilter): Promise<PagedResult<Product>> {
    try {
      const res = await apiClient.get('/products', { params });
      return res.data;
    } catch {
      let filtered = [...fallbackProducts];
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
        );
      }
      if (params?.categoryId) {
        filtered = filtered.filter(p => p.categoryId === Number(params.categoryId));
      }
      if (params?.minPrice) {
        filtered = filtered.filter(p => p.basePrice >= Number(params.minPrice));
      }
      if (params?.maxPrice) {
        filtered = filtered.filter(p => p.basePrice <= Number(params.maxPrice));
      }
      if (params?.sortBy === 'price_asc') filtered.sort((a, b) => a.basePrice - b.basePrice);
      else if (params?.sortBy === 'price_desc') filtered.sort((a, b) => b.basePrice - a.basePrice);
      return { items: filtered, totalCount: filtered.length, page: 1, pageSize: filtered.length };
    }
  },

  async getProductById(id: number): Promise<Product> {
    try {
      const res = await apiClient.get(`/products/${id}`);
      return res.data;
    } catch {
      const found = fallbackProducts.find(p => p.id === id);
      if (!found) throw new Error('Product not found');
      return found;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const res = await apiClient.get('/products/categories');
      return res.data;
    } catch {
      return fallbackCategories;
    }
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const res = await apiClient.post('/products', data);
    return res.data;
  },

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const res = await apiClient.put(`/products/${id}`, data);
    return res.data;
  },

  async deleteProduct(id: number): Promise<boolean> {
    const res = await apiClient.delete(`/products/${id}`);
    return res.status === 204;
  },
};
