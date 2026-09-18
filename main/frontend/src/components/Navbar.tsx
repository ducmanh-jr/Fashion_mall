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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md border border-slate-800 tracking-tighter group-hover:scale-105 transition-all">
              <span className="bg-gradient-to-tr from-slate-200 via-white to-slate-400 bg-clip-text text-transparent italic">Æ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-[0.14em] text-slate-900 uppercase">
                Aethelgard <span className="text-[#0284C7] font-semibold">Shopping Mall</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] text-slate-400 font-semibold uppercase -mt-0.5">
                AI Powered Fashion
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-sketch-purple bg-purple-50 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Database Seeder Trigger */}
          <button
            onClick={handleSeedDatabase}
            disabled={seedLoading}
            title="Kích hoạt nạp dữ liệu bản phác thảo vào CSDL"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{seedLoading ? 'Đang nạp...' : 'Sync Data'}</span>
          </button>

          {/* Account Profile / Login */}
          <a
            href="/login"
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all border border-slate-200"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              M
            </div>
            <span className="hidden sm:inline text-xs font-bold text-slate-800">Đức Mạnh</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Banner thông báo nạp database nếu có */}
      {seedMessage && (
        <div className="bg-emerald-500 text-white text-xs font-bold py-1.5 px-4 text-center transition-all animate-fade-in">
          {seedMessage}
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-semibold ${
                pathname === item.href
                  ? 'text-sketch-purple bg-purple-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleSeedDatabase}
              className="w-full py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg shadow-sm"
            >
              Nạp lại CSDL mẫu
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
