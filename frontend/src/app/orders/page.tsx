'use client';
import '@/styles/orders.css';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { orderService } from '@/services/order.service';
import type { Order } from '@/types';
import { useToast } from '@/hooks/useToast';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import {
  OrderKpiCards,
  OrderFilterBar,
  OrderTable,
  OrderTrackingDrawer,
} from '@/components/seller/orders';
import { RefreshCw, Printer } from 'lucide-react';

const defaultOrders: Order[] = [
  {
    id: 1,
    orderCode: 'AG-2024-7890',
    customerName: 'Esther Howard',
    customerEmail: 'esther.howard@example.com',
    customerPhone: '+84 902 345 678',
    shippingAddress: 'Villa 18, Vinhomes Riverside, Long Biên, Hà Nội',
    paymentMethod: 'Thẻ Tín Dụng Quốc Tế (Visa Signature)',
    status: 'DELIVERED',
    statusLabel: 'Giao Thành Công',
    createdAt: '2026-09-21 10:20',
    carrier: 'FedEx Priority Luxury Express',
    trackingCode: 'FX-VN-882910384',
    estimatedDelivery: 'Đã giao thành công',
    lastUpdateLocation: 'Kho trung chuyển Nội Bài - Đã ký nhận',
    progressStep: 4,
    items: [
      {
        id: 1,
        productName: 'Giày Adidas Samba OG Classic White Black',
        specs: 'EU 41 / Da thật / Fullbox',
        imageUrl: '/img/products/adidas-samba.jpg',
        price: 2790000,
        quantity: 1,
        subtotal: 2790000,
      },
    ],
    subtotal: 2790000,
    shippingCharge: 0,
    taxes: 0,
    discount: 0,
    totalAmount: 2790000,
  },
  {
    id: 2,
    orderCode: 'AG-2024-7891',
    customerName: 'Trần Thị Mai Phương',
    customerEmail: 'maiphuong.tran@gmail.com',
    customerPhone: '+84 912 888 999',
    shippingAddress: 'Penthouse 3201, Diamond Island, Quận 2, TP. Hồ Chí Minh',
    paymentMethod: 'Chuyển Khoản Ngân Hàng Tức Thời (VietQR Pro)',
    status: 'SHIPPED',
    statusLabel: 'Đang Vận Chuyển',
    createdAt: '2026-09-21 14:15',
    carrier: 'Aethelgard White-Glove Courier',
    trackingCode: 'AG-VIP-994812',
    estimatedDelivery: 'Dự kiến giao trong 24 giờ',
    lastUpdateLocation: 'Trung tâm phân loại Tân Sơn Nhất - Đang luân chuyển',
    progressStep: 3,
    items: [
      {
        id: 2,
        productName: 'Áo Khoác Nữ Adidas Sakura Special Edition',
        specs: 'Size L / Bản giới hạn',
        imageUrl: '/img/products/adidas-sakura-hoodie.jpg',
        price: 1890000,
        quantity: 1,
        subtotal: 1890000,
      },
    ],
    subtotal: 1890000,
    shippingCharge: 50000,
    taxes: 0,
    discount: 0,
    totalAmount: 1940000,
  },
  {
    id: 3,
    orderCode: 'AG-2024-7892',
    customerName: 'Lê Hoàng Nam',
    customerEmail: 'hoangnam.le@vng.com.vn',
    customerPhone: '+84 983 222 111',
    shippingAddress: 'Tòa nhà Keangnam Landmark 72, Phạm Hùng, Cầu Giấy, Hà Nội',
    paymentMethod: 'Thẻ Tín Dụng Quốc Tế (Mastercard World Elite)',
    status: 'CONFIRMED',
    statusLabel: 'Đã Xác Nhận',
    createdAt: '2026-09-22 09:30',
    carrier: 'FedEx Priority Luxury Express',
    trackingCode: 'FX-VN-900213441',
    estimatedDelivery: 'Dự kiến giao ngày mai',
    lastUpdateLocation: 'Đã niêm phong gói hàng tại Boutique chính hãng',
    progressStep: 2,
    items: [
      {
        id: 3,
        productName: 'Giày Balenciaga Track 4.0 Tan/Beige Limited',
        specs: 'EU 42 / Tiêu chuẩn',
        imageUrl: '/img/products/balenciaga-track-beige.jpg',
        price: 24500000,
        quantity: 1,
        subtotal: 24500000,
      },
    ],
    subtotal: 24500000,
    shippingCharge: 0,
    taxes: 0,
    discount: 0,
    totalAmount: 24500000,
  },
];

export default function OrdersPage() {
  const { showToast } = useToast();
  const { confirm, confirmDialog } = useConfirmDialog();

  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load danh sách đơn hàng thực tế ngầm từ backend
  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      if (data && data.length > 0) {
        setOrders(data);
      }
    } catch {
      // Giữ dữ liệu hiện tại nếu ngắt kết nối
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Lọc đơn hàng theo tab và từ khóa
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab =
        activeTab === 'ALL' ||
        order.status?.toUpperCase() === activeTab ||
        order.statusLabel?.toUpperCase() === activeTab;

      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        (order.orderCode && order.orderCode.toLowerCase().includes(q)) ||
        (order.customerName && order.customerName.toLowerCase().includes(q)) ||
        (order.customerPhone && order.customerPhone.includes(q)) ||
        (order.trackingCode && order.trackingCode.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchTerm]);

  // Cập nhật trạng thái đơn hàng qua Backend API
  const handleUpdateStatus = async (orderId: number, nextStatusInt: number, statusName: string) => {
    try {
      const updated = await orderService.updateOrderStatus(orderId, {
        status: nextStatusInt,
        location: 'Kho Trung Chuyển Aethelgard Logistics, Hà Nội',
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...updated, status: updated.status } : o))
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, ...updated } : prev));
      }

      showToast(`Đơn hàng #${orderId} đã được cập nhật: ${statusName}!`);
    } catch (err: any) {
      showToast(err.response?.data?.message || err.message || 'Cập nhật trạng thái thất bại.');
    }
  };

  // Xác nhận hủy đơn với ConfirmDialog
  const handleCancelOrder = async (order: Order) => {
    const isConfirmed = await confirm({
      title: 'Xác Nhận Hủy Đơn Hàng',
      message: `Bạn có chắc chắn muốn hủy đơn hàng #${order.orderCode || order.id} của khách hàng ${order.customerName}?`,
      confirmText: 'Xác Nhận Hủy',
      cancelText: 'Đóng',
      tone: 'danger',
    });

    if (!isConfirmed) return;

    await handleUpdateStatus(order.id, 6, 'Đã Hủy Đơn');
  };

  const handleOpenDrawer = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'PENDING').length,
      confirmed: orders.filter((o) => o.status === 'CONFIRMED' || o.status === 'PROCESSING').length,
      shipped: orders.filter((o) => o.status === 'SHIPPED').length,
      delivered: orders.filter((o) => o.status === 'DELIVERED').length,
    };
  }, [orders]);

  return (
    <main className="orders-container">
      {/* 1. Header Toolbar chuẩn bản sắc dự án */}
      <div className="orders-page-header">
        <div className="orders-header-titles">
          <h1>Quản Lý Đơn Hàng & Vận Chuyển</h1>
          <p>Theo dõi luồng xử lý đơn đặt hàng, hành trình giao nhận bưu kiện và xuất phiếu kho</p>
        </div>

        <div className="orders-header-actions">
          <button
            type="button"
            className="btn-order-action"
            onClick={loadOrders}
            title="Đồng bộ đơn hàng từ máy chủ"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm Mới</span>
          </button>
          <button
            type="button"
            className="btn-order-action"
            style={{
              background: '#111827',
              color: '#FFFFFF',
              borderColor: '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={() => window.print()}
          >
            <Printer size={14} />
            <span>Xuất Báo Cáo</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <OrderKpiCards
        totalCount={counts.all}
        pendingCount={counts.pending}
        confirmedCount={counts.confirmed}
        shippedCount={counts.shipped}
        deliveredCount={counts.delivered}
        currentFilter={activeTab}
        onFilterChange={setActiveTab}
      />

      {/* 3. Filter Bar */}
      <OrderFilterBar
        currentFilter={activeTab}
        onFilterChange={setActiveTab}
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        counts={counts}
      />

      {/* 4. Orders Table */}
      <OrderTable
        orders={filteredOrders}
        onSelectOrder={handleOpenDrawer}
        onConfirmOrder={(o) => handleUpdateStatus(o.id, 2, 'Đã Xác Nhận')}
        onShipOrder={(o) => handleUpdateStatus(o.id, 4, 'Đang Vận Chuyển FedEx')}
        onDeliverOrder={(o) => handleUpdateStatus(o.id, 5, 'Giao Hàng Thành Công')}
        onCancelOrder={handleCancelOrder}
      />

      {/* 5. Live Tracking Drawer */}
      <OrderTrackingDrawer
        isOpen={isDrawerOpen}
        order={selectedOrder}
        onClose={handleCloseDrawer}
        onShowToast={showToast}
        onConfirmOrder={(o) => handleUpdateStatus(o.id, 2, 'Đã Xác Nhận')}
        onShipOrder={(o) => handleUpdateStatus(o.id, 4, 'Đang Vận Chuyển FedEx')}
        onDeliverOrder={(o) => handleUpdateStatus(o.id, 5, 'Giao Hàng Thành Công')}
        onCancelOrder={handleCancelOrder}
      />

      {/* 6. Confirm Dialog */}
      {confirmDialog}
    </main>
  );
}