'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('aethelgard_token');
    const isLoginPage = pathname === '/login';

    if (!token) {
      if (!isLoginPage) {
        // Chưa đăng nhập -> Lưu trang đang muốn vào và điều hướng sang trang login
        sessionStorage.setItem('redirect_after_login', pathname);
        setIsAuthenticated(false);
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    } else {
      if (isLoginPage) {
        // Đã đăng nhập -> Đưa về trang chủ hoặc trang dự định vào trước đó
        const redirectPath = sessionStorage.getItem('redirect_after_login') || '/';
        sessionStorage.removeItem('redirect_after_login');
        setIsAuthenticated(false);
        router.replace(redirectPath);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [pathname, router]);

  // Nếu đang ở trang đăng nhập và chưa đăng nhập, hiển thị ngay trang đăng nhập
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Khi đang kiểm tra phiên đăng nhập hoặc chưa đăng nhập, hiển thị màn hình chờ xác thực bảo mật
  if (isAuthenticated !== true) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F17',
          color: '#F8FAFC',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: '3px solid #6366F1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '20px'
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#94A3B8',
              fontWeight: 700,
              margin: '0 0 6px 0'
            }}
          >
            Aethelgard Seller Portal
          </p>
          <p style={{ fontSize: '14px', color: '#E2E8F0', margin: 0, fontWeight: 500 }}>
            Đang xác thực bảo mật phiên làm việc người bán...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
