'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  Flame, 
  Lightbulb, 
  BarChart3,
  Package
} from 'lucide-react';
import { orderService } from '@/services/order.service';
import { inventoryService } from '@/services/inventory.service';
import type { Product } from '@/types';
import { formatVND } from '@/lib/utils';

interface SellerCommandHubProps {
  shopName: string;
  products: Product[];
  totalOrders?: number;
}

export const SellerCommandHub: React.FC<SellerCommandHubProps> = ({ 
  shopName, 
  products,
  totalOrders = 284 
}) => {
  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const [lowStockCount, setLowStockCount] = useState<number>(0);

  useEffect(() => {
    orderService.getOrders('PENDING').then((orders) => {
      setPendingOrders(orders.length);
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

  // AI Insights calculation
  const aiInsights = useMemo(() => {
    const list = [];

    // 1. Best seller
    const sorted = [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    if (sorted.length > 0) {
      const top = sorted[0];
      list.push({
        id: 'bestseller',
        icon: Flame,
        badge: 'Xu Hướng Sàn',
        badgeColor: '#EF4444',
        title: top.name,
        desc: `Đang dẫn đầu gian hàng với ${top.reviewCount} lượt đánh giá (${top.rating || 5.0}★). AI dự báo nhu cầu sẽ tăng 25% vào cuối tuần, hãy duy trì tồn kho an toàn.`,
        actionText: 'Kiểm kho',
        actionHref: '/inventory',
      });
    }

    // 2. Dynamic Pricing / Promotion
    const nonDiscounted = products.filter((p) => !p.discountPercent || p.discountPercent === 0);
    if (nonDiscounted.length > 0) {
      const candidate = nonDiscounted[0];
      list.push({
        id: 'pricing',
        icon: Lightbulb,
        badge: 'Gợi Ý Định Giá',
        badgeColor: '#F59E0B',
        title: candidate.name,
        desc: `Sản phẩm có mức giá niêm yết ${formatVND(candidate.basePrice)}. Áp dụng ưu đãi kích cầu 5% sẽ giúp tăng tỷ lệ chốt đơn (CVR) thêm khoảng 18%.`,
        actionText: 'Tối ưu giá',
        actionHref: '/inventory',
      });
    }

    // 3. Basket size
    if (products.length > 0) {
      const avgPrice = products.reduce((sum, p) => sum + p.basePrice, 0) / products.length;
      list.push({
        id: 'basket',
        icon: BarChart3,
        badge: 'Chiến Lược AOV',
        badgeColor: '#8B5CF6',
        title: 'Tăng giá trị đơn hàng trung bình',
        desc: `Giá sản phẩm trung bình của shop là ${formatVND(avgPrice)}. Thiết lập combo mua kèm phụ kiện sẽ giúp tối đa hóa biên lợi nhuận ròng.`,
        actionText: 'Xem báo cáo',
        actionHref: '/income-statistics',
      });
    }

    return list;
  }, [products]);

  return (
    <section className="command-hub-section">
      <div className="command-hub-container">
        
        {/* CỘT 1 (TRÁI): SỨC KHỎE GIAN HÀNG & TÁC VỤ CẦN XỬ LÝ (SHOP HEALTH & ACTIONS) */}
        <div className="hub-card hub-health-card">
          {/* Header */}
          <div className="health-card-header">
            <div className="shop-identity-group">
              <div className="shop-avatar-badge">
                <ShieldCheck size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="shop-title-text">{getGreeting()}, <span className="shop-highlight">{shopName}</span></h2>
                  <span className="mall-partner-tag">Mall Official</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="live-status-dot" />
                  <span className="text-xs text-slate-500 font-medium">Cửa hàng đang mở cửa tiếp khách</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sức khỏe vận hành Score Bar */}
          <div className="health-score-box">
            <div className="score-header-row">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Chỉ Số Vận Hành Shop</span>
              <span className="score-number-highlight">98.5 <span className="text-xs font-normal text-slate-400">/ 100</span></span>
            </div>
            <div className="health-progress-bg">
              <div className="health-progress-fill" style={{ width: '98.5%' }} />
            </div>
            <div className="health-mini-metrics">
              <div className="mini-metric">
                <span className="m-num text-emerald-600">99.4%</span>
                <span className="m-txt">Giao đúng hạn</span>
              </div>
              <div className="mini-metric">
                <span className="m-num text-amber-500">4.9 ★</span>
                <span className="m-txt">Đánh giá shop</span>
              </div>
              <div className="mini-metric">
                <span className="m-num text-purple-600">98.8%</span>
                <span className="m-txt">Phản hồi chat</span>
              </div>
            </div>
          </div>

          {/* Việc cần xử lý khẩn cấp (Urgent Action Items) */}
          <div className="urgent-tasks-box">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Tác Vụ Cần Xử Lý Ngay</span>
              <span className="text-slate-400 font-normal lowercase">tự động đồng bộ</span>
            </div>

            <div className="urgent-task-list">
              {/* Task 1: Đơn hàng chờ duyệt */}
              <div className={`urgent-task-item ${pendingOrders > 0 ? 'border-amber-200 bg-amber-50/60' : 'border-slate-100 bg-slate-50/70'}`}>
                <div className="flex items-center gap-3">
                  {pendingOrders > 0 ? (
                    <AlertCircle size={18} className="text-amber-600 shrink-0" />
                  ) : (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  )}
                  <div>
                    <p className="task-title-text">
                      {pendingOrders > 0 ? `${pendingOrders} đơn hàng đang chờ xác nhận` : 'Tất cả đơn hàng đã được duyệt'}
                    </p>
                    <p className="task-sub-text">
                      {pendingOrders > 0 ? 'Xác nhận sớm để đạt chuẩn giao hàng hỏa tốc' : 'Không có đơn hàng tồn đọng'}
                    </p>
                  </div>
                </div>
                {pendingOrders > 0 && (
                  <Link href="/orders" className="btn-task-action">
                    Xử lý ngay <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>

              {/* Task 2: Cảnh báo tồn kho */}
              <div className={`urgent-task-item ${lowStockCount > 0 ? 'border-red-200 bg-red-50/50' : 'border-slate-100 bg-slate-50/70'}`}>
                <div className="flex items-center gap-3">
                  {lowStockCount > 0 ? (
                    <Package size={18} className="text-red-500 shrink-0" />
                  ) : (
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  )}
                  <div>
                    <p className="task-title-text">
                      {lowStockCount > 0 ? `${lowStockCount} sản phẩm chạm mức báo động kho` : 'Tồn kho các mặt hàng an toàn'}
                    </p>
                    <p className="task-sub-text">
                      {lowStockCount > 0 ? 'Số lượng còn dưới 10 cái, cần nhập thêm hàng' : `${products.length} mã SKU đang hoạt động tốt`}
                    </p>
                  </div>
                </div>
                {lowStockCount > 0 && (
                  <Link href="/inventory" className="btn-task-action btn-task-warn">
                    Nhập kho <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CỘT 2 (PHẢI): TRỢ LÝ QUẢN GIA AI AETHELGARD (AI MERCHANT CONCIERGE) */}
        <div className="hub-card hub-ai-card">
          <div className="ai-card-glow-layer" />

          {/* AI Header */}
          <div className="ai-card-header">
            <div className="flex items-center gap-3">
              <div className="ai-avatar-pulse-wrap">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="ai-title-text">
                  Trợ Lý Quản Gia AI <span className="text-purple-300 font-light">Aethelgard</span>
                </h3>
                <p className="text-xs text-slate-300 font-normal">
                  Đồng hành tối ưu hóa lợi nhuận & cảnh báo cơ hội bán hàng
                </p>
              </div>
            </div>
            <div className="ai-live-indicator">
              <span className="ai-live-dot-ping" />
              <span>AI Engine Active</span>
            </div>
          </div>

          {/* AI Insights Content */}
          <div className="ai-insights-stack">
            {aiInsights.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="ai-insight-strip">
                  <div className="ai-strip-icon-box" style={{ background: `${item.badgeColor}22`, color: item.badgeColor }}>
                    <IconComp size={18} strokeWidth={2.2} />
                  </div>
                  <div className="ai-strip-content">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="ai-strip-badge" style={{ color: item.badgeColor, borderColor: `${item.badgeColor}44` }}>
                        {item.badge}
                      </span>
                      <h4 className="ai-strip-title">{item.title}</h4>
                    </div>
                    <p className="ai-strip-desc">{item.desc}</p>
                  </div>
                  <Link href={item.actionHref} className="ai-strip-action" title={item.actionText}>
                    <span>{item.actionText}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
