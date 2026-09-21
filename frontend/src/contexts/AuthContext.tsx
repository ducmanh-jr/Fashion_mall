'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { STORAGE_KEYS } from '@/lib/constants';
import type { AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load auth state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
      }
    }
    setIsLoading(false);
  }, []);

  // Guard: redirect to login if not authenticated (except login page)
  useEffect(() => {
    if (isLoading) return;
    const isLoginPage = pathname === '/login';

    if (!token && !isLoginPage) {
      sessionStorage.setItem(STORAGE_KEYS.REDIRECT_PATH, pathname);
      router.replace('/login');
    } else if (token && isLoginPage) {
      const redirect = sessionStorage.getItem(STORAGE_KEYS.REDIRECT_PATH) || '/';
      sessionStorage.removeItem(STORAGE_KEYS.REDIRECT_PATH);
      router.replace(redirect);
    }
  }, [token, isLoading, pathname, router]);

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);

    const redirect = sessionStorage.getItem(STORAGE_KEYS.REDIRECT_PATH) || '/';
    sessionStorage.removeItem(STORAGE_KEYS.REDIRECT_PATH);
    router.replace(redirect);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    sessionStorage.removeItem(STORAGE_KEYS.REDIRECT_PATH);
    setToken(null);
    setUser(null);
    router.replace('/login');
  }, [router]);

  // Chỉ render nội dung trang nếu đang ở /login HOẶC đã xác thực thành công (có token)
  const isLoginPage = pathname === '/login';
  const canRender = isLoginPage || (!isLoading && !!token);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
    }}>
      {canRender ? children : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            border: '3px solid #f1f5f9',
            borderTop: '3px solid #7c3aed',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>
              Aethelgard Shopping Mall
            </p>
            <p style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '4px' }}>
              Đang xác thực phiên đăng nhập...
            </p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
