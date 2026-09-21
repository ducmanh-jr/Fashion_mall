/** Statistics Type Definitions */

export interface MonthlyData {
  month: string;
  existingUsers: number;
  newUsers: number;
  valTotal: string;
  isActive?: boolean;
  newText?: string;
  existText?: string;
}

export interface Transaction {
  id: string;
  customer: string;
  product: string;
  status: 'Success' | 'Pending' | 'Refunded';
  qty: number;
  unitPrice: string;
  total: string;
}

export interface IncomeSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  growthPercent: number;
  monthlyMatrix: MonthlyData[];
  recentTransactions: Transaction[];
}
