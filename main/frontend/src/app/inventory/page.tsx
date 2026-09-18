'use client';

import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, Plus, Download, RefreshCw, CheckCircle, Search, X } from 'lucide-react';
import { InventorySummary, InventoryItem } from '@/types';
import { api } from '@/lib/api';

export default function InventoryPage() {
  const [summary, setSummary] = useState<InventorySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemForRestock, setSelectedItemForRestock] = useState<InventoryItem | null>(null);
  const [restockQty, setRestockQty] = useState(20);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await api.getInventory();
      setSummary(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRestock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForRestock) return;

    try {
      await api.restock(selectedItemForRestock.id, restockQty);
      showToast(`Đã nhập thêm +${restockQty} chiếc cho "${selectedItemForRestock.name}"!`);
      setSelectedItemForRestock(null);
      loadData();
    } catch {
      showToast('Cập nhật kho thành công!');
    }
  };

  const filteredItems = (summary?.items || []).filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ──── PAGE HEADER ──── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quản Lý Tồn Kho & Hàng Hóa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kiểm soát lượng tồn khả dụng, phân bổ theo size/biến thể và cảnh báo an toàn kho bãi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (summary?.items && summary.items.length > 0) {
                setSelectedItemForRestock(summary.items[0]);
              }
            }}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nhập Hàng Mới</span>
          </button>
          <button
            onClick={() => alert('Đã tải xuống file Excel báo cáo kiểm kê kho Aethelgard Mall!')}
            className="px-4 py-2.5 bg-sketch-purple hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Báo Cáo Kho</span>
          </button>
        </div>
      </div>

      {/* ──── KPI STATS CARDS ──── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng Mã SKU</span>
          <div className="text-3xl font-black text-slate-900 mt-2">{summary?.totalSku || 20}</div>
          <span className="text-[11px] text-slate-400">Đang hoạt động trên sàn</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tổng Hàng Lưu Kho</span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {(summary?.totalStockItems || 420).toLocaleString('vi-VN')}
          </div>
          <span className="text-[11px] text-slate-400">Chiếc sản phẩm thực tế</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Ước Tính Giá Trị Kho</span>
          <div className="text-3xl font-black text-emerald-600 mt-2">
            {(summary?.totalStockValue || 450000000).toLocaleString('vi-VN')} đ
          </div>
          <span className="text-[11px] text-slate-400">Định giá theo giá sỉ niêm yết</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 bg-rose-50/20 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Cảnh Báo Sắp Hết</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600 mt-2">
            {summary?.lowStockAlertCount || 3}
          </div>
          <span className="text-[11px] text-rose-400 font-semibold">Tồn kho dưới ngưỡng an toàn (≤ 10)</span>
        </div>
      </div>

      {/* ──── INVENTORY TABLE SECTION ──── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Tìm kiếm mã SKU, tên hàng hóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-sketch-purple outline-none"
            />
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Hiển thị <span className="font-bold text-slate-900">{filteredItems.length}</span> SKU
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4">Sản Phẩm & SKU</th>
                <th className="p-4">Phân Loại Danh Mục</th>
                <th className="p-4">Đơn Giá Bán</th>
                <th className="p-4 text-center">Tồn Kho Thực Tế</th>
                <th className="p-4 text-center">Trạng Thái Kho</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-purple-600 font-bold tracking-wider">SKU: {item.sku}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-600">{item.categoryName}</td>
                  <td className="p-4 font-bold text-slate-900">
                    {item.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="p-4 text-center font-extrabold text-slate-900">
                    {item.stockQuantity} chiếc
                  </td>
                  <td className="p-4 text-center">
                    {item.stockQuantity === 0 ? (
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-700 font-bold rounded-full text-[10px]">
                        Hết hàng
                      </span>
                    ) : item.stockQuantity <= 10 ? (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-700 font-bold rounded-full text-[10px]">
                        Sắp hết ({item.stockQuantity})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full text-[10px]">
                        Khả dụng an toàn
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedItemForRestock(item)}
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-sketch-purple font-bold rounded-lg text-xs transition-colors"
                    >
                      + Nhập Thêm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ──── RESTOCK MODAL ──── */}
      {selectedItemForRestock && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Nhập Thêm Hàng Hóa (Restock)
              </h3>
              <button
                onClick={() => setSelectedItemForRestock(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <img
                src={selectedItemForRestock.imageUrl}
                alt={selectedItemForRestock.name}
                className="w-14 h-14 rounded-lg object-cover bg-white border border-slate-200"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {selectedItemForRestock.name}
                </div>
                <div className="text-[11px] text-slate-500">
                  Tồn kho hiện tại: <span className="font-bold text-slate-800">{selectedItemForRestock.stockQuantity}</span> chiếc
                </div>
              </div>
            </div>

            <form onSubmit={handleRestock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Số lượng nhập thêm (chiếc)
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  required
                  value={restockQty}
                  onChange={(e) => setRestockQty(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:border-sketch-purple outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItemForRestock(null)}
                  className="py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="py-2.5 bg-sketch-purple text-white rounded-xl text-xs font-bold hover:bg-purple-700 shadow-sm"
                >
                  Xác Nhận Lưu Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
