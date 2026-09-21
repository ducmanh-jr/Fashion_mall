'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Footer() {
  const pathname = usePathname();
  const { token, isLoading } = useAuth();

  if (pathname === '/login' || (!isLoading && !token)) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-950 font-serif font-bold text-lg">
              Æ
            </div>
            <span className="text-lg font-bold tracking-widest text-white uppercase">
              Aethelgard <span className="text-[#0284C7]">Mall</span>
            </span>
          </div>
          <p className="footer-tagline text-slate-400 text-sm max-w-sm leading-relaxed">
            Sàn Thương Mại Điện Tử Tích Hợp AI Hàng Đầu.
          </p>
        </div>

        {/* Col 2: About */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">About</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Meet The Team</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Return</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Col 4: Social Media */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">Social Media</h4>
          <div className="flex items-center gap-2.5">
            {['X', 'F', 'IN', 'IG'].map((item) => (
              <a
                key={item}
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white transition-all border border-slate-700"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <span>Copyright © 2026 Aethelgard Mall. All Rights Reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
