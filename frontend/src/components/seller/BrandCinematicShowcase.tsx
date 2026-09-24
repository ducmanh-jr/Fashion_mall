'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowDown } from 'lucide-react';

interface BrandCinematicShowcaseProps {
  shopName?: string;
  products?: any[];
  onExploreProduct?: (productName: string) => void;
  onScrollToCatalog?: () => void;
}

const HOME_SLIDES = [
  '/img/home/1.jpg',
  '/img/home/2.jpg',
  '/img/home/3.jpg',
  '/img/home/4.jpg',
  '/img/home/5.jpg',
  '/img/home/6.jpg',
  '/img/home/7.jpg',
  '/img/home/8.jpg',
  '/img/home/9.jpg',
  '/img/home/10.jpg',
  '/img/home/11.jpg',
  '/img/home/12.jpg',
  '/img/home/13.jpg',
  '/img/home/14.jpg',
];

export const BrandCinematicShowcase: React.FC<BrandCinematicShowcaseProps> = ({
  shopName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const total = HOME_SLIDES.length;

  const triggerNext = useCallback(() => {
    if (isSliding) return;
    const incoming = (currentIndex + 1) % total;
    setNextIndex(incoming);
    setIsSliding(true);
  }, [currentIndex, isSliding, total]);

  const triggerPrev = useCallback(() => {
    if (isSliding) return;
    const incoming = (currentIndex - 1 + total) % total;
    setNextIndex(incoming);
    setIsSliding(true);
  }, [currentIndex, isSliding, total]);

  // Hoàn tất animation trượt mượt sau 1.1 giây
  useEffect(() => {
    if (!isSliding || nextIndex === null) return;

    const timer = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
      setIsSliding(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [isSliding, nextIndex]);

  // Cứ 10 giây (10000ms) là tự động đổi ảnh 1 lần với hiệu ứng trượt từ phải sang trái
  useEffect(() => {
    const autoInterval = setInterval(() => {
      triggerNext();
    }, 10000);

    return () => clearInterval(autoInterval);
  }, [triggerNext]);

  return (
    <section className="brand-cinematic-wrapper" id="brand-showcase">
      {/* ─── SÂN KHẤU CHIẾU ẢNH CHÍNH (ĐỔI ẢNH MỖI 10S, TRƯỢT PHẢI SANG TRÁI) ─── */}
      <div
        ref={stageRef}
        id="cinematic-stage"
        className="relative w-full h-[85vh] min-h-[580px] max-h-[920px] overflow-hidden bg-black select-none"
      >
        {/* Layer 1: Ảnh hiện tại (trượt ra bên trái) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${HOME_SLIDES[currentIndex]})`,
            transform: isSliding ? 'translateX(-100%)' : 'translateX(0%)',
            transition: isSliding ? 'transform 1100ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            zIndex: 1,
          }}
        />

        {/* Layer 2: Ảnh kế tiếp (trượt từ bên phải vào) */}
        {nextIndex !== null && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${HOME_SLIDES[nextIndex]})`,
              transform: isSliding ? 'translateX(0%)' : 'translateX(100%)',
              transition: isSliding ? 'transform 1100ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              zIndex: 2,
            }}
          />
        )}

        {/* Lớp phủ điện ảnh nhẹ làm nổi bật ảnh */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        {/* Nút điều hướng hai bên trái / phải */}
        <button
          type="button"
          onClick={triggerPrev}
          disabled={isSliding}
          aria-label="Previous image"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer disabled:opacity-0"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          type="button"
          onClick={triggerNext}
          disabled={isSliding}
          aria-label="Next image"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 hover:opacity-100 focus:opacity-100 cursor-pointer disabled:opacity-0"
        >
          <ChevronRight size={26} />
        </button>

        {/* Thanh hiển thị tiến độ 10s tinh tế ở dưới đáy */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-white/70"
            style={{
              animation: 'showcaseProgress 10s linear infinite',
            }}
          />
        </div>

        <style jsx>{`
          @keyframes showcaseProgress {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default BrandCinematicShowcase;
