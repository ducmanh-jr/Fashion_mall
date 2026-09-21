'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
  onForgotPasswordClick: () => void;
  onShowToast: (msg: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onForgotPasswordClick,
  onShowToast,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await authService.login({
        email: email.trim(),
        password,
      });

      if (res && res.token) {
        const user = {
          userId: res.userId,
          fullName: res.fullName,
          email: res.email,
          role: res.role,
          avatarUrl: res.avatarUrl,
        };
        onShowToast(`Đăng nhập thành công! Chào mừng ${res.fullName || 'bạn'} đến với Aethelgard.`);
        login(res.token, user);
      } else {
        onShowToast('Đăng nhập không thành công, vui lòng kiểm tra lại tài khoản.');
      }
    } catch {
      onShowToast('Email hoặc mật khẩu không chính xác. Mật khẩu chuẩn là Password123@');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSelect = (demoEmail: string, demoName: string) => {
    setEmail(demoEmail);
    setPassword('Password123@');
    onShowToast(`Đã chọn: ${demoName}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="input-label">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field !pl-4"
          placeholder="seller@aethelgard.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="input-label mb-0">Password</label>
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-xs font-semibold text-[#8065c9] hover:underline transition-colors flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
          >
            <span>Forgot your password ?</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </button>
        </div>
        <div className="input-wrapper relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field !pl-4 pr-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="toggle-eye"
            aria-label="Hiện/Ẩn mật khẩu"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 bg-[#8065c9] hover:opacity-90 text-white rounded-lg font-bold text-sm transition-all shadow-md mt-4 cursor-pointer border-0"
      >
        {isLoading ? 'Đang xác thực...' : 'Log In'}
      </button>

      {/* Quick Demo Accounts for Seller Portal */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Tài khoản Cổng Người Bán (Demo 1 chạm):
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDemoSelect('ducmanh@gmail.com', 'Nguyễn Đức Mạnh (Chủ Sàn / Seller)')}
            className="p-2 text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700">Nguyễn Đức Mạnh</div>
            <div className="text-[10px] text-slate-400">ducmanh@gmail.com</div>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSelect('dior@gmail.com', 'Christian Dior Boutique')}
            className="p-2 text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700">Dior Boutique</div>
            <div className="text-[10px] text-slate-400">dior@gmail.com</div>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSelect('adidas@gmail.com', 'Adidas Flagship Store')}
            className="p-2 text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700">Adidas Official</div>
            <div className="text-[10px] text-slate-400">adidas@gmail.com</div>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSelect('gucci@gmail.com', 'Gucci Luxury Store')}
            className="p-2 text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700">Gucci Luxury</div>
            <div className="text-[10px] text-slate-400">gucci@gmail.com</div>
          </button>
        </div>
      </div>
    </form>
  );
};
