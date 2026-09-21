import apiClient from './api-client';
import type { StoreProfile } from '@/types';
import { fallbackStores } from '@/lib/mock-data';

export const storeService = {
  async getStores(): Promise<StoreProfile[]> {
    try {
      const res = await apiClient.get('/stores');
      return res.data;
    } catch {
      return fallbackStores;
    }
  },

  async getStoreByCode(storeCode: string): Promise<StoreProfile | null> {
    try {
      const res = await apiClient.get(`/stores/${storeCode}`);
      return res.data;
    } catch {
      return fallbackStores.find(s => s.storeCode === storeCode) || null;
    }
  },
};
