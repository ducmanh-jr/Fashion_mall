'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, PackageCheck, AlertTriangle, Star } from 'lucide-react';
import { orderService } from '@/services/order.service';
import { inventoryService } from '@/services/inventory.service';
import type { Product } from '@/types';
import { formatVND } from '@/lib/utils';

interface SellerLaunchpadProps {
  shopName: string;
  products: Product[];
}

export const SellerLaunchpad: React.FC<SellerLaunchpadProps> = ({ shopName, products }) => {
  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [lowStockCount, setLowStockCount] = useState<number>(0);

  useEffect(() => {
    orderService.getOrders().then((orders) => {
      setTotalOrders(orders.length);
      setPendingOrders(orders.filter((o) => o.status === 'PENDING').length);
    }).catch(() => {});

    inventoryService.getInventory().then((inv) => {
      setLowStockCount(inv.lowStockAlertCount);
    }).catch(() => {});
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const totalRevenue = products.reduce((sum, p) => sum + p.basePrice * (p.reviewCount || 1), 0);
  const avgRating = products.length > 0
    ? (products.reduce((sum, p) => sum + (p.rating || 5), 0) / products.length).toFixed(1)
    : '5.0';

  const pulseCards = [
    {
      label: 'Sản phẩm đang bán',
      value: products.length.toString(),
      sub: `${lowStockCount > 0 ? `${lowStockCount} sắp hết hàng` : 'Tồn kho ổn định'}`,
      icon: ShoppingBag,
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.08)',
      trend: lowStockCount > 0 ? 'warn' : 'ok',
    },
    {
      label: 'Đơn hàng tháng này',
      value: totalOrders.toString(),
      sub: `${pendingOrders > 0 ? `${pendingOrders} đơn chờ duyệt` : 'Không có đơn chờ'}`,
      icon: PackageCheck,
      color: '#0284C7',
      bgColor: 'rgba(2, 132, 199, 0.08)',
      trend: pendingOrders > 0 ? 'warn' : 'ok',
    },
    {
      label: 'Doanh thu ước tính',
      value: formatVND(totalRevenue),
      sub: 'Tổng doanh số toàn gian hàng',
      icon: AlertTriangle,
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.08)',
      trend: 'ok',
    },
    {
      label: 'Đánh giá trung bình',
      value: `${avgRating} ★`,
      sub: `${products.reduce((s, p) => s + p.reviewCount, 0)} lượt đánh giá`,
      icon: Star,
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.08)',
      trend: 'ok',
    },
  ];

  return (
    <section className="seller-launchpad-section">
      <div className="launchpad-container">
        {/* Greeting Header */}
        <div className="launchpad-greeting">
          <div className="greeting-text-group">
            <h2 className="greeting-title">
              {getGreeting()}, <span className="greeting-shop-name">{shopName}</span>
            </h2>
            <p className="greeting-subtitle">
              Tổng quan cửa hàng của bạn trên Aethelgard Mall
            </p>
          </div>
          <div className="greeting-status">
            <span className="status-dot" />
            <span className="status-text">Cửa hàng đang hoạt động</span>
          </div>
        </div>

        {/* Pulse Metric Cards */}
        <div className="pulse-grid">
          {pulseCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div key={idx} className="pulse-card">
                <div className="pulse-card-top">
                  <div className="pulse-icon-wrap" style={{ background: card.bgColor, color: card.color }}>
                    <IconComponent size={20} strokeWidth={2.2} />
                  </div>
                  <span className="pulse-label">{card.label}</span>
                </div>
                <div className="pulse-value" style={{ color: card.color }}>{card.value}</div>
                <div className={`pulse-sub ${card.trend === 'warn' ? 'pulse-sub-warn' : ''}`}>
                  {card.trend === 'warn' && <span className="pulse-warn-dot" />}
                  {card.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
