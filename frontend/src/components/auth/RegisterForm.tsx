'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
  onShowToast: (msg: string) => void;
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onShowToast,
  onSuccess,
}) => {
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [strength, setStrength] = useState({
    score: 0,
    label: '—',
    color: '#cbd5e1',
    width: '0%',
    hint: 'Mật khẩu cần ít nhất 8 ký tự, chữ hoa, số và ký tự đặc biệt',
  });

  const evaluateStrength = (val: string) => {
    if (!val) {
      return { score: 0, label: '—', color: '#cbd5e1', width: '0%', hint: 'Mật khẩu cần ít nhất 8 ký tự' };
    }
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (score <= 2) {
      return { score, label: 'Yếu', color: '#ef4444', width: '20%', hint: 'Mật khẩu quá yếu — dễ bị bẻ khóa' };
    } else if (score === 3) {
      return { score, label: 'Trung bình', color: '#f59e0b', width: '45%', hint: 'Thêm chữ hoa, số hoặc ký tự đặc biệt' };
    } else if (score === 4) {
      return { score, label: 'Mạnh', color: '#3b82f6', width: '70%', hint: 'Khá tốt — thêm ký tự đặc biệt để đạt mức tối ưu' };
    } else {
      return { score, label: 'Rất mạnh', color: '#10b981', width: '100%', hint: 'Mật khẩu đạt tiêu chuẩn bảo mật cao nhất' };
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setStrength(evaluateStrength(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await authService.register({
        fullName: fullName.trim(),
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
        onShowToast('Đăng ký tài khoản thành công! Tự động đăng nhập...');
        login(res.token, user);
      } else {
        onShowToast('Đăng ký thành công! Vui lòng đăng nhập.');
        onSuccess();
      }
    } catch {
      onShowToast('Đăng ký không thành công. Email có thể đã tồn tại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="input-label">Full Name</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input-field !pl-4"
          placeholder="Nguyễn Đức Mạnh"
        />
      </div>

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
        <label className="input-label">Password</label>
        <div className="input-wrapper relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="input-field !pl-4 pr-12"
            placeholder="Tối thiểu 8 ký tự"
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

        {/* Minimalist Password Strength Bar */}
        {password && (
          <div className="mt-2.5 transition-all duration-300">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-slate-400">Độ mạnh mật khẩu:</span>
              <span className="font-semibold" style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: strength.width, backgroundColor: strength.color }}
              />
            </div>
            <p className="text-[11px] text-slate-400">{strength.hint}</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 bg-[#8065c9] hover:opacity-90 text-white rounded-lg font-bold text-sm transition-all shadow-md mt-4 cursor-pointer border-0"
      >
        {isLoading ? 'Đang tạo tài khoản...' : 'Create Account'}
      </button>
    </form>
  );
};
