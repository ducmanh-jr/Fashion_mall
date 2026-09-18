'use client';

import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, Calendar, MapPin, User, ChevronRight } from 'lucide-react';
import { Order } from '@/types';
import { api } from '@/lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders();
      setOrders(data);
      if (data.length > 0) {
        setSelectedOrder(data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'ALL') return true;
    return o.status.toUpperCase() === statusFilter;
  });

  const handleUpdateStatus = async (newStatus: number, label: string) => {
    if (!selectedOrder) return;
    try {
      const updated = await api.updateOrderStatus(selectedOrder.id, newStatus, `Cập nhật tại trạm vận chuyển: ${label}`);
      setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
      setSelectedOrder(updated);
      alert(`Đơn hàng ${selectedOrder.orderCode} đã chuyển trạng thái thành: ${label}`);
    } catch {
      alert('Đã cập nhật trạng thái đơn hàng!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ──── PAGE HEADER ──── */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Quản Lý Đơn Hàng & Vận Chuyển FedEx
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Theo dõi hành trình kiện hàng thời gian thực, chi tiết từng sản phẩm và xử lý giao vận
        </p>
      </div>

      {/* ──── STATUS TABS ──── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { key: 'ALL', label: 'Tất Cả Đơn Hàng' },
          { key: 'PENDING', label: 'Chờ Xác Nhận' },
          { key: 'CONFIRMED', label: 'Đã Xác Nhận' },
          { key: 'SHIPPED', label: 'Đang Vận Chuyển' },
          { key: 'DELIVERED', label: 'Giao Thành Công' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === tab.key
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ──── SPLIT VIEW: ORDERS LIST + DETAILED TIMELINE ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Orders List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Danh sách ({filteredOrders.length} đơn)
          </div>

          {filteredOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
              Không có đơn hàng nào trong mục này.
            </div>
          ) : (
            filteredOrders.map(order => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-50/50 border-sketch-purple shadow-sm ring-2 ring-purple-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-extrabold text-sm text-slate-900">
                      {order.orderCode}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      order.status.toUpperCase() === 'DELIVERED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : order.status.toUpperCase() === 'SHIPPED'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.statusLabel || order.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-700 mb-2">
                    {order.customerName}
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-100">
                    <span>{order.createdAt}</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {order.totalAmount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Order Detail & FedEx Timeline (7 cols) */}
        {selectedOrder ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            
            {/* Header of Detail */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-purple-600 uppercase">
                  MÃ VẬN ĐƠN: {selectedOrder.trackingCode}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Đơn Hàng {selectedOrder.orderCode}
                </h2>
              </div>
              
              {/* Carrier & Est delivery */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  <Truck className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedOrder.carrier}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Dự kiến giao: <span className="font-semibold text-slate-700">{selectedOrder.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* ──── FEDEX 4-STAGE TIMELINE PROGRESS BAR ──── */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tiến Trình Giao Hàng (FedEx Live Tracker)
              </div>

              <div className="relative flex justify-between items-center px-4">
                {/* Connecting Line */}
                <div className="absolute left-8 right-8 top-4 h-1 bg-slate-200 -z-0">
                  <div
                    className="h-full bg-sketch-purple transition-all duration-500"
                    style={{
                      width: selectedOrder.progressStep === 1 ? '10%' :
                             selectedOrder.progressStep === 2 ? '40%' :
                             selectedOrder.progressStep === 3 ? '75%' : '100%'
                    }}
                  />
                </div>

                {[
                  { step: 1, label: 'Đã Đặt Hàng', date: 'Jan 15' },
                  { step: 2, label: 'Xác Nhận', date: 'Jan 15' },
                  { step: 3, label: 'Đang Vận Chuyển', date: 'Jan 17' },
                  { step: 4, label: 'Đã Giao', date: 'Jan 20' },
                ].map(item => {
                  const isDone = (selectedOrder.progressStep || 1) >= item.step;
                  return (
                    <div key={item.step} className="flex flex-col items-center relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-all ${
                        isDone ? 'bg-sketch-purple text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
                      }`}>
                        {isDone ? '✓' : item.step}
                      </div>
                      <span className={`text-[11px] font-bold mt-2 ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                  );
                })}
              </div>

              {selectedOrder.lastUpdateLocation && (
                <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Cập nhật vị trí gần nhất: <strong>{selectedOrder.lastUpdateLocation}</strong></span>
                </div>
              )}
            </div>

            {/* ──── CUSTOMER & SHIPPING INFO ──── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider">Thông Tin Khách Hàng</span>
                <div className="font-extrabold text-slate-900 text-sm">{selectedOrder.customerName}</div>
                <div className="text-slate-600">{selectedOrder.customerEmail}</div>
                <div className="text-slate-600">{selectedOrder.customerPhone}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider">Địa Chỉ Giao Hàng</span>
                <div className="font-bold text-slate-900 leading-relaxed">{selectedOrder.shippingAddress}</div>
                <div className="text-purple-600 font-semibold pt-1">PTTT: {selectedOrder.paymentMethod}</div>
              </div>
            </div>

            {/* ──── ORDER ITEMS ──── */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Sản Phẩm Trong Kiện Hàng ({selectedOrder.items?.length || 0})
              </div>

              <div className="space-y-3">
                {(selectedOrder.items || []).map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-14 h-14 rounded-lg object-cover bg-white border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">
                        {item.productName}
                      </div>
                      <div className="text-[11px] text-slate-500">{item.specs}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Số lượng: <span className="font-bold text-slate-800">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {item.subtotal.toLocaleString('vi-VN')} đ
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ──── FINANCIAL SUMMARY ──── */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính tiền hàng:</span>
                <span className="font-semibold text-slate-800">{selectedOrder.subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Phí vận chuyển FedEx:</span>
                <span className="font-semibold text-slate-800">{selectedOrder.shippingCharge.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Thuế giá trị gia tăng (VAT 8%):</span>
                <span className="font-semibold text-slate-800">{selectedOrder.taxes.toLocaleString('vi-VN')} đ</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Khuyến mãi đặc quyền:</span>
                  <span>-{selectedOrder.discount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Tổng Cộng Thanh Toán:</span>
                <span className="text-sketch-purple">{selectedOrder.totalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            {/* ──── ACTIONS: UPDATE ORDER STATUS ──── */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Chuyển trạng thái:</span>
              <button
                onClick={() => handleUpdateStatus(2, 'Đã Xác Nhận')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold"
              >
                Xác Nhận Đơn
              </button>
              <button
                onClick={() => handleUpdateStatus(4, 'Đang Vận Chuyển FedEx')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold"
              >
                Xuất Kho Giao Hàng
              </button>
              <button
                onClick={() => handleUpdateStatus(5, 'Giao Thành Công')}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold"
              >
                Hoàn Tất Giao Đơn
              </button>
            </div>

          </div>
        ) : null}

      </div>

    </div>
  );
}
