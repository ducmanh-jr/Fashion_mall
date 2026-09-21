import React from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: string; isPositive: boolean };
  className?: string;
}

export function KPICard({ label, value, icon, trend, className }: KPICardProps) {
  return (
    <div className={cn(
      'bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-2',
      className
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      {trend && (
        <div className={cn(
          'text-xs font-semibold',
          trend.isPositive ? 'text-emerald-600' : 'text-red-500'
        )}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  );
}
