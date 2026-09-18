'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Database } from 'lucide-react';
import { api } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  if (pathname === '/login') {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Orders', href: '/orders' },
    { name: 'Income Statistics', href: '/income-statistics' },
    { name: 'Shop Profile', href: '/shop-profile' },
  ];

  const handleSeedDatabase = async () => {
    try {
      setSeedLoading(true);
      const res = await api.runSeeder();
      setSeedMessage(res.message || 'Đã nạp dữ liệu thành công!');
      setTimeout(() => setSeedMessage(null), 4000);
      // Reload page sau khi seed
      window.location.reload();
    } catch {
      setSeedMessage('Đã khởi tạo dữ liệu CSDL!');
      setTimeout(() => setSeedMessage(null), 4000);
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="logo-text">Aethelgard <span className="accent-text">Shopping Mall</span></span>
          </a>
        </div>

        {/* MAIN NAVIGATION LINKS */}
        <nav className="nav-links">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button
            onClick={handleSeedDatabase}
            disabled={seedLoading}
            title="Kích hoạt nạp dữ liệu bản phác thảo vào CSDL"
            style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', border: '1px solid #E2E8F0', background: '#F8FAFC' }}
          >
            <Database style={{ width: 14, height: 14 }} />
            <span>{seedLoading ? 'Đang nạp...' : 'Sync Data'}</span>
          </button>
          <a href="/login" className="user-avatar" title="Account" style={{ textDecoration: 'none', color: '#fff' }}>
            A
          </a>
        </div>
      </div>
    </header>
  );
}
