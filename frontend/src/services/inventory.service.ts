import apiClient from './api-client';
import type { InventorySummary, RestockRequest } from '@/types';
import { fallbackProducts } from '@/lib/mock-data';

export const inventoryService = {
  async getInventory(): Promise<InventorySummary> {
    try {
      const res = await apiClient.get('/inventory');
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
          safetyThreshold: 10,
        })),
      };
    }
  },

  async restock(data: RestockRequest): Promise<boolean> {
    try {
      await apiClient.post('/inventory/restock', data);
      return true;
    } catch {
      const p = fallbackProducts.find(x => x.id === data.productId);
      if (p) p.stockQuantity += data.additionalQuantity;
      return true;
    }
  },
};
