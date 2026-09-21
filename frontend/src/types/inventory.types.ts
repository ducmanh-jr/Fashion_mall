/** Inventory Type Definitions */

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

export interface InventorySummary {
  totalSku: number;
  totalStockItems: number;
  totalStockValue: number;
  lowStockAlertCount: number;
  items: InventoryItem[];
}

export interface RestockRequest {
  productId: number;
  additionalQuantity: number;
}
