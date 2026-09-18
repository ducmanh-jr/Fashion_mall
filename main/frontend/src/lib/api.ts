import axios from 'axios';
import { Product, Order, InventorySummary, IncomeSummary, StoreProfile, Category } from '../types';
import { fallbackProducts, fallbackCategories, fallbackOrders, fallbackMatrixData, fallbackTransactions, fallbackStores } from './mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Products
  async getProducts(params?: { search?: string; categoryId?: number; minPrice?: number; maxPrice?: number; sortBy?: string }): Promise<{ items: Product[]; totalCount: number }> {
    try {
      const res = await client.get('/products', { params });
      return res.data;
    } catch {
      let filtered = [...fallbackProducts];
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
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
      return { items: filtered, totalCount: filtered.length };
    }
  },

  async getProductById(id: number): Promise<Product> {
    try {
      const res = await client.get(`/products/${id}`);
      return res.data;
    } catch {
      const found = fallbackProducts.find(p => p.id === id);
      if (!found) throw new Error('Product not found');
      return found;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const res = await client.get('/products/categories');
      return res.data;
    } catch {
      return fallbackCategories;
    }
  },

  // Orders
  async getOrders(status?: string): Promise<Order[]> {
    try {
      const res = await client.get('/orders', { params: { status } });
      return res.data;
    } catch {
      return fallbackOrders;
    }
  },

  async updateOrderStatus(id: number, status: number, location?: string): Promise<Order> {
    try {
      const res = await client.patch(`/orders/${id}/status`, { status, location });
      return res.data;
    } catch {
      const order = fallbackOrders.find(o => o.id === id);
      if (order) order.status = status.toString();
      return order || fallbackOrders[0];
    }
  },

  // Inventory
  async getInventory(): Promise<InventorySummary> {
    try {
      const res = await client.get('/inventory');
      return res.data;
    } catch {
      return {
        totalSku: fallbackProducts.length,
        totalStockItems: fallbackProducts.reduce((acc, p) => acc + p.stockQuantity, 0),
        totalStockValue: fallbackProducts.reduce((acc, p) => acc + p.basePrice * p.stockQuantity, 0),
        lowStockAlertCount: fallbackProducts.filter(p => p.stockQuantity <= 10).length,
        items: fallbackProducts.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku,
          categoryName: p.categoryName || 'Fashion',
          imageUrl: p.imageUrl,
          price: p.basePrice,
          stockQuantity: p.stockQuantity,
          stockStatus: p.stockQuantity === 0 ? 'OUT_OF_STOCK' : (p.stockQuantity <= 10 ? 'LOW_STOCK' : 'IN_STOCK'),
          safetyThreshold: 10
        }))
      };
    }
  },

  async restock(productId: number, additionalQuantity: number): Promise<boolean> {
    try {
      await client.post('/inventory/restock', { productId, additionalQuantity });
      return true;
    } catch {
      const p = fallbackProducts.find(x => x.id === productId);
      if (p) p.stockQuantity += additionalQuantity;
      return true;
    }
  },

  // Income Statistics
  async getIncomeStats(): Promise<IncomeSummary> {
    try {
      const res = await client.get('/statistics/income');
      return res.data;
    } catch {
      return {
        totalRevenue: 145000000,
        monthlyRevenue: 56000000,
        totalOrders: 284,
        growthPercent: 18.5,
        monthlyMatrix: fallbackMatrixData,
        recentTransactions: fallbackTransactions
      };
    }
  },

  // Stores
  async getStores(): Promise<StoreProfile[]> {
    try {
      const res = await client.get('/stores');
      return res.data;
    } catch {
      return fallbackStores;
    }
  },

  // AI Stylist
  async getAIRecommendation(query: string, productId?: number): Promise<string> {
    try {
      const res = await client.get('/ai/recommend', { params: { query, productId } });
      return res.data.recommendation;
    } catch {
      return `[AI Fashion Stylist]: Đề xuất phối đồ với sản phẩm này: Kết hợp cùng quần suông tối màu, áo hoodie hoặc bomber jacket thời thượng và kính mát gọng vuông phong cách Milan hiện đại.`;
    }
  },

  // Seed database
  async runSeeder(): Promise<{ success: boolean; message: string }> {
    const res = await client.post('/seed/run');
    return res.data;
  }
};
