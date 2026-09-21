'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface CurrentUser {
  fullName?: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aethelgard_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {}
      }
    }
  }, [pathname]);

  if (pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aethelgard_token');
      localStorage.removeItem('aethelgard_user');
      sessionStorage.removeItem('redirect_after_login');
      window.location.href = '/login';
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Orders', href: '/orders' },
    { name: 'Income Statistics', href: '/income-statistics' },
    { name: 'Shop Profile', href: '/shop-profile' },
  ];

  const displayName = currentUser?.fullName || currentUser?.email?.split('@')[0]?.toUpperCase() || 'Seller';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="logo-text">Aethelgard <span className="accent-text">Shopping Mall</span></span>
          </Link>
        </div>

        {/* MAIN NAVIGATION LINKS */}
        <nav className="nav-links">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '180px', justifyContent: 'flex-end' }}>
          {currentUser ? (
            <>
              <div
                title={`Tài khoản: ${displayName}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px 4px 6px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#0F172A'
                }}
              >
                <div className="user-avatar" style={{ width: '28px', height: '28px', fontSize: '0.8rem', lineHeight: '28px' }}>
                  {initial}
                </div>
                <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {displayName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title="Đăng xuất và quay lại màn hình Đăng nhập"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#EF4444',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <LogOut style={{ width: 14, height: 14 }} />
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            <Link href="/login" className="user-avatar" title="Đăng nhập" style={{ textDecoration: 'none', color: '#fff' }}>
              A
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
