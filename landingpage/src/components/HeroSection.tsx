'use client';

import { useState, useEffect } from 'react';
import { useTranslationContext } from '@/context/TranslationContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const { t } = useTranslationContext();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // パーティクル生成
  useEffect(() => {
    const colors = ['#FF6B35', '#4ECDC4', '#FFE66D'];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: 0.3,
              animation: `float ${10 + (particle.id % 10)}s infinite ease-in-out`,
              animationDelay: `${particle.id * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(at ${mousePosition.x}px ${mousePosition.y}px, #FF6B35 0px, transparent 50%),
            radial-gradient(at 80% 0%, #4ECDC4 0px, transparent 50%),
            radial-gradient(at 0% 50%, #FFE66D 0px, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-6xl mx-auto animate-fadeIn">
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slideUp">
            <span className="block mb-2">{t('hero.title_1')}</span>
            <span className="gradient-text">{t('hero.title_2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-600 dark:text-gray-300 animate-fade-up-delay-1">
            {t('hero.subtitle')}
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up-delay-2">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up-delay-3">
            <button
              className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={() => {
                console.log('Hero CTA button clicked');
                const waitlistElement = document.getElementById('waitlist');
                console.log('Waitlist element found:', waitlistElement);
                if (waitlistElement) {
                  waitlistElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  console.error('Waitlist element not found');
                }
              }}
            >
              {t('hero.cta_primary')}
            </button>
            <button
              className="px-8 py-4 border-2 border-[#FF6B35] text-[#FF6B35] font-bold rounded-full hover:bg-[#FF6B35] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() =>
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('hero.cta_secondary')}
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow opacity-60">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3D Robot Dog Placeholder */}
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-20">
        <div className="relative w-full h-full">
          {/* Placeholder for 3D model */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
