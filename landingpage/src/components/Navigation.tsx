'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#features', label: '特徴' },
    { href: '#demo', label: 'デモ' },
    { href: '#pricing', label: '料金' },
    { href: '#team', label: 'チーム' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-bold text-xl">DogeDigger</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#FF6B35] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              <button className="px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                早期アクセス
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
          } overflow-hidden bg-white dark:bg-gray-900 shadow-lg`}
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-[#FF6B35] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-medium rounded-full hover:shadow-lg transition-all duration-300">
              早期アクセス
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Waitlist Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-auto z-40">
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white p-4 rounded-lg shadow-2xl">
          <div className="flex items-center justify-between space-x-4">
            <div>
              <p className="font-bold">🎉 限定オファー</p>
              <p className="text-sm">今なら早期登録で50%OFF！</p>
            </div>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#FF6B35] px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              登録する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}