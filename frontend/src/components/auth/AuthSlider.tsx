'use client';

import React, { useState, useEffect } from 'react';

const DUAL_IMAGE_PAIRS = [
  { left: '/img/login/1.jpg', right: '/img/login/2.jpg' },
  { left: '/img/login/3.jpg', right: '/img/login/4.jpg' },
  { left: '/img/login/5.jpg', right: '/img/login/6.jpg' },
  { left: '/img/login/7.jpg', right: '/img/login/8.jpg' },
  { left: '/img/login/9.jpg', right: '/img/login/10.jpg' },
  { left: '/img/login/11.jpg', right: '/img/login/12.jpg' },
  { left: '/img/login/13.jpg', right: '/img/login/14.jpg' },
  { left: '/img/login/15.jpg', right: '/img/login/16.jpg' },
  { left: '/img/login/17.jpg', right: '/img/login/1.jpg' },
];

export const AuthSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DUAL_IMAGE_PAIRS.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="login-right-panel">
      <div className="dual-slider-wrapper relative w-full h-full min-h-screen">
        {DUAL_IMAGE_PAIRS.map((pair, idx) => (
          <div
            key={idx}
            className={`dual-slide-item ${idx === currentSlide ? 'active' : ''}`}
          >
            <div className="dual-col">
              <img
                src={pair.left}
                alt={`Slide ${idx * 2 + 1}`}
                className="dual-col-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/login/1.jpg';
                }}
              />
            </div>
            <div className="dual-col">
              <img
                src={pair.right}
                alt={`Slide ${idx * 2 + 2}`}
                className="dual-col-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/login/2.jpg';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
