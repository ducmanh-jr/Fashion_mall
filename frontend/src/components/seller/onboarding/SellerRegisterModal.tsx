'use client';

import React, { useState } from 'react';
import { Store, Phone, MapPin, FileText, CheckCircle2, X } from 'lucide-react';
import { authService } from '@/services/auth.service';
import type { AuthUser } from '@/types';

interface SellerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
  onSuccess: () => void;
}

export function SellerRegisterModal({ isOpen, onClose, user, onSuccess }: SellerRegisterModalProps) {
  const [storeName, setStoreName] = useState(user ? `${user.fullName} Boutique` : '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Tràng Tiền Plaza, Hoàn Kiếm, Hà Nội');
  const [description, setDescription] = useState('Chuyên thời trang cao cấp & phụ kiện chính hãng.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Vui lòng đăng nhập tài khoản trước khi đăng ký mở gian hàng.');
      return;
    }
    if (!storeName.trim()) {
      setError('Vui lòng nhập tên gian hàng.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authService.applySeller(user.userId, {
        storeName: storeName.trim(),
        phoneNumber: phone.trim() || undefined,
        address: address.trim() || undefined,
        description: description.trim() || undefined,
      });

      if (res && res.token) {
        localStorage.setItem('aethelgard_token', res.token);
        localStorage.setItem('aethelgard_user', JSON.stringify(res));
      }

      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        window.location.href = '/';
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Không thể đăng ký mở gian hàng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Đăng Ký Thành Công!</h3>
            <p className="text-slate-600 text-sm">
              Gian hàng <span className="font-semibold text-indigo-600">{storeName}</span> của bạn đã sẵn sàng.
              Đang chuyển hướng đến Trang Quản Trị Seller...
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Mở Gian Hàng Bán Hàng</h3>
                <p className="text-xs text-slate-500">Trở thành đối tác bán hàng chính thức trên Aethelgard</p>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tên Gian Hàng / Thương Hiệu *
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Ví dụ: Gucci Official Store"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Số Điện Thoại Liên Hệ *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0988 888 888"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Địa Chỉ Kho / Trụ Sở
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Địa chỉ gửi hàng & trả hàng"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mô Tả Ngắn Gian Hàng
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mặt hàng chủ lực, phân khúc..."
                    className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="w-1/3 h-11 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Đang kích hoạt...' : 'Kích Hoạt Gian Hàng Ngay'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerRegisterModal;
