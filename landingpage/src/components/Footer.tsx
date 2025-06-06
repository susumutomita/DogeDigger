'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslationContext } from '@/context/TranslationContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useTranslationContext();
  const footerLinks = {
    product: [
      { label: t('footer.product_links.features'), href: '#features' },
      { label: t('footer.product_links.demo'), href: '#demo' },
      { label: t('footer.product_links.pricing'), href: '#pricing' },
    ],
    legal: [
      { label: t('footer.legal_links.terms'), href: '/terms' },
      { label: t('footer.legal_links.privacy'), href: '/privacy' },
      { label: t('footer.legal_links.legal'), href: '/legal' },
    ],
    social: [
      { label: t('footer.social_links.twitter'), href: 'https://twitter.com', icon: '𝕏' },
      { label: t('footer.social_links.discord'), href: 'https://discord.com', icon: '💬' },
      { label: t('footer.social_links.github'), href: 'https://github.com', icon: '🐙' },
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
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
              {t('footer.tagline')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {t('footer.description')}
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.links.product')}
            </h3>
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.links.legal')}
            </h3>
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
            <h3 className="text-2xl font-bold mb-2 gradient-text">
              {t('footer.newsletter.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('footer.newsletter.description')}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('waitlist.form.email_placeholder')}
                required
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-800/50 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                {subscribed ? t('footer.newsletter.success') : t('footer.newsletter.submit')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('footer.copyright')}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {t('footer.made_with')}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                {t('footer.status')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
