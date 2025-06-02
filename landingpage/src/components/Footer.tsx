'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerLinks = {
    product: [
      { label: '特徴', href: '#features' },
      { label: 'デモ', href: '#demo' },
      { label: '料金', href: '#pricing' },
      { label: 'ロードマップ', href: '#roadmap' },
    ],
    company: [
      { label: 'チーム', href: '#team' },
      { label: 'ブログ', href: '#blog' },
      { label: 'お問い合わせ', href: '#contact' },
      { label: 'プレスキット', href: '#press' },
    ],
    legal: [
      { label: '利用規約', href: '#terms' },
      { label: 'プライバシーポリシー', href: '#privacy' },
      { label: '特定商取引法', href: '#legal' },
    ],
    social: [
      { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
      { label: 'Discord', href: 'https://discord.com', icon: '💬' },
      { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
    ],
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Subscribe:', email);
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#4ECDC4]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">🐕</span>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                DogeDigger
              </span>
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              犬も歩けばトークン掘れる
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              ロボット犬×AR×NFTで実現する、新感覚の宝探し体験
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              {footerLinks.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#FF6B35] hover:to-[#4ECDC4] hover:text-white transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">プロダクト</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">会社情報</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">法的情報</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2 gradient-text">最新情報をお届け</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              プロダクトアップデートや限定オファーをメールでお知らせします
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-800/50 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                {subscribed ? '✓ 登録完了' : '購読する'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 DogeDigger. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Made with 🐕 by the DogeDigger team
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
