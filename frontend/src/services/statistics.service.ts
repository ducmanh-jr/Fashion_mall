import apiClient from './api-client';
import type { IncomeSummary } from '@/types';
import { fallbackMatrixData, fallbackTransactions } from '@/lib/mock-data';

export const statisticsService = {
  async getIncomeStats(): Promise<IncomeSummary> {
    try {
      const res = await apiClient.get('/statistics/income');
      return res.data;
    } catch {
      return {
        totalRevenue: 145000000,
        monthlyRevenue: 56000000,
        totalOrders: 284,
        growthPercent: 18.5,
        monthlyMatrix: fallbackMatrixData,
        recentTransactions: fallbackTransactions,
      };
    }
  },
};
