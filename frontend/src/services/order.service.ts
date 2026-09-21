import apiClient from './api-client';
import type { Order, UpdateOrderStatus } from '@/types';
import { fallbackOrders } from '@/lib/mock-data';

export const orderService = {
  async getOrders(status?: string): Promise<Order[]> {
    try {
      const res = await apiClient.get('/orders', { params: { status } });
      return res.data;
    } catch {
      return fallbackOrders;
    }
  },

  async getOrderById(id: number): Promise<Order> {
    const res = await apiClient.get(`/orders/${id}`);
    return res.data;
  },

  async getOrderByCode(orderCode: string): Promise<Order> {
    const res = await apiClient.get(`/orders/code/${orderCode}`);
    return res.data;
  },

  async updateOrderStatus(id: number, data: UpdateOrderStatus): Promise<Order> {
    try {
      const res = await apiClient.patch(`/orders/${id}/status`, data);
      return res.data;
    } catch {
      const order = fallbackOrders.find(o => o.id === id);
      if (order) order.status = data.status.toString();
      return order || fallbackOrders[0];
    }
  },
};
