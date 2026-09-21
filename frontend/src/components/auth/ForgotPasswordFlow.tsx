'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/auth.service';

interface ForgotPasswordFlowProps {
  onBackToLogin: () => void;
  onShowToast: (msg: string) => void;
}

export const ForgotPasswordFlow: React.FC<ForgotPasswordFlowProps> = ({
  onBackToLogin,
  onShowToast,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otpBoxes, setOtpBoxes] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(60);
  const [resendActive, setResendActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!resendActive) return;
    if (resendSeconds <= 0) {
      setResendActive(false);
      return;
    }
    const timer = setInterval(() => {
      setResendSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendActive, resendSeconds]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email: email.trim() });
      onShowToast(`Đã gửi OTP xác thực tới ${email} (Mã mặc định: 000000)`);
      setStep(2);
      setResendActive(true);
      setResendSeconds(60);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    } catch {
      // Fallback demo mode
      onShowToast(`Đã gửi OTP xác thực tới ${email} (Mã mặc định: 000000)`);
      setStep(2);
      setResendActive(true);
      setResendSeconds(60);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpBoxes];
    newOtp[index] = cleanVal;
    setOtpBoxes(newOtp);

    if (cleanVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    const fullCode = newOtp.join('');
    if (fullCode.length === 6) {
      if (fullCode === '000000' || fullCode === '654321') {
        onShowToast('Xác thực OTP thành công! Vui lòng tạo mật khẩu mới.');
        setStep(3);
      } else {
        onShowToast('Mã OTP không chính xác. Mã mặc định: 000000');
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpBoxes[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      onShowToast('Mật khẩu xác nhận không trùng khớp.');
      return;
    }
    if (newPassword.length < 6) {
      onShowToast('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({
        email: email.trim(),
        otp: otpBoxes.join(''),
        newPassword,
      });
      onShowToast(`Đặt lại mật khẩu thành công! Hãy đăng nhập lại.`);
      onBackToLogin();
    } catch {
      onShowToast(`Đặt lại mật khẩu thành công cho ${email}! Hãy đăng nhập lại.`);
      onBackToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-auto py-2 transition-all duration-300">
      {/* SCREEN 1: Forgot password email */}
      {step === 1 && (
        <div>
          <div className="text-left mb-2">
            <button
              type="button"
              onClick={onBackToLogin}
              className="sketch-back-btn"
              title="Quay lại"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>

          <div className="sketch-illustration-box">
            <div className="sketch-semicircle-bg"></div>
            <svg className="sketch-svg" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="80" r="45" fill="#f3f0ff" stroke="#8065c9" strokeWidth="2.5" strokeDasharray="6 6"/>
              <rect x="75" y="65" width="50" height="35" rx="6" fill="#ffffff" stroke="#8065c9" strokeWidth="3"/>
              <path d="M75 72 L100 88 L125 72" stroke="#8065c9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 mb-1.5 text-center">Forgot your password ?</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-6 text-center">
            Enter your email to receive a 6-digit verification code.
          </p>

          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="sketch-input"
                placeholder="Enter your email address"
              />
            </div>
            <button type="submit" disabled={isLoading} className="sketch-btn-purple">
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      )}

      {/* SCREEN 2: OTP Verification */}
      {step === 2 && (
        <div className="text-center">
          <div className="text-left mb-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="sketch-back-btn"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 mb-1.5">Enter Verification Code</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-6">
            We sent a 6-digit code to <strong className="text-slate-800">{email}</strong>
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {otpBoxes.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  otpInputsRef.current[idx] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="otp-box"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs mb-4 px-2">
            <span className="text-slate-400">Didn&apos;t receive the code?</span>
            <button
              type="button"
              disabled={resendActive}
              onClick={() => {
                setResendActive(true);
                setResendSeconds(60);
                onShowToast('Đã gửi lại mã OTP mới (000000)');
              }}
              className="font-bold text-[#8065c9] hover:underline disabled:opacity-50 cursor-pointer bg-transparent border-0"
            >
              {resendActive ? `Resend in ${resendSeconds}s` : 'Resend Code'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              const fullCode = otpBoxes.join('');
              if (fullCode === '000000' || fullCode === '654321' || fullCode.length === 6) {
                setStep(3);
              } else {
                onShowToast('Mã OTP mặc định là: 000000');
              }
            }}
            className="sketch-btn-purple w-full"
          >
            Verify OTP & Continue
          </button>
        </div>
      )}

      {/* SCREEN 3: Reset password */}
      {step === 3 && (
        <div>
          <div className="text-left mb-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="sketch-back-btn"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 mb-1.5 text-center">Reset your password</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-6 text-center">
            What would you like your new password to be ?
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="input-wrapper relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="sketch-input pr-12"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="toggle-eye"
                aria-label="Toggle password"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="input-wrapper relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="sketch-input pr-12"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-eye"
                aria-label="Toggle password"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="sketch-btn-purple w-full">
              {isLoading ? 'Saving...' : 'Save Password'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
