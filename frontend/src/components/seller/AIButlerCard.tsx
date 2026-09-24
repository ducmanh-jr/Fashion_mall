'use client';

import React, { useMemo } from 'react';
import type { Product } from '@/types';
import { formatVND } from '@/lib/utils';

interface AIButlerCardProps {
  products: Product[];
  totalOrders: number;
}

export const AIButlerCard: React.FC<AIButlerCardProps> = ({ products, totalOrders }) => {
  const insights = useMemo(() => {
    const tips: { icon: string; title: string; message: string; type: 'trend' | 'warning' | 'tip' }[] = [];

    // Insight 1: Find best selling product (highest review count)
    const sorted = [...products].sort((a, b) => b.reviewCount - a.reviewCount);
    if (sorted.length > 0) {
      const top = sorted[0];
      tips.push({
        icon: '🔥',
        title: 'Sản phẩm bán chạy nhất',
        message: `"${top.name}" đang dẫn đầu với ${top.reviewCount} đánh giá. AI đề xuất tăng tồn kho để đáp ứng nhu cầu cao điểm cuối tuần.`,
        type: 'trend',
      });
    }

    // Insight 2: Low stock warning
    const lowStock = products.filter((p) => p.stockQuantity <= 10);
    if (lowStock.length > 0) {
      tips.push({
        icon: '⚠️',
        title: 'Cảnh báo tồn kho thấp',
        message: `Có ${lowStock.length} sản phẩm sắp hết hàng (≤10 cái). Hãy kiểm tra và nhập thêm kho để tránh mất doanh số.`,
        type: 'warning',
      });
    }

    // Insight 3: Discount optimization
    const nonDiscounted = products.filter((p) => !p.discountPercent || p.discountPercent === 0);
    if (nonDiscounted.length > 2) {
      const candidate = nonDiscounted.sort((a, b) => a.reviewCount - b.reviewCount)[0];
      if (candidate) {
        tips.push({
          icon: '💡',
          title: 'Gợi ý kích cầu thông minh',
          message: `"${candidate.name}" có lượt tương tác thấp. AI đề xuất áp dụng voucher giảm 5-10% để tăng tỷ lệ chốt đơn.`,
          type: 'tip',
        });
      }
    }

    // Insight 4: Revenue opportunity
    if (products.length > 0) {
      const avgPrice = products.reduce((sum, p) => sum + p.basePrice, 0) / products.length;
      tips.push({
        icon: '📊',
        title: 'Phân tích giá trị giỏ hàng',
        message: `Giá trị trung bình sản phẩm của bạn là ${formatVND(avgPrice)}. Với ${totalOrders} đơn hàng, hãy tập trung upsell các combo sản phẩm để tăng AOV.`,
        type: 'tip',
      });
    }

    return tips.slice(0, 3);
  }, [products, totalOrders]);

  return (
    <section className="ai-butler-section">
      <div className="ai-butler-container">
        {/* Header */}
        <div className="ai-butler-header">
          <div className="ai-butler-avatar">
            <span className="ai-avatar-icon">🤖</span>
            <div className="ai-avatar-pulse" />
          </div>
          <div className="ai-butler-header-text">
            <h3 className="ai-butler-title">
              Trợ Lý AI <span className="ai-accent">Aethelgard</span>
            </h3>
            <p className="ai-butler-subtitle">Phân tích thông minh dựa trên dữ liệu cửa hàng của bạn</p>
          </div>
          <div className="ai-badge-live">
            <span className="ai-live-dot" />
            AI Active
          </div>
        </div>

        {/* Insights Grid */}
        <div className="ai-insights-grid">
          {insights.map((insight, idx) => (
            <div key={idx} className={`ai-insight-card ai-insight-${insight.type}`}>
              <div className="ai-insight-icon">{insight.icon}</div>
              <div className="ai-insight-content">
                <h4 className="ai-insight-title">{insight.title}</h4>
                <p className="ai-insight-message">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
