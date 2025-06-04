'use client';

import { useState } from 'react';
import { locales, localeNames, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
  variant?: 'default' | 'mobile';
}

export default function LanguageSwitcher({ currentLocale, onLocaleChange, variant = 'default' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  // モバイル版のシンプルなトグルスイッチ
  if (variant === 'mobile') {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">Language / 言語</span>
        <div className="flex items-center space-x-2">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => onLocaleChange(locale)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentLocale === locale
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // デスクトップ版のドロップダウン
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
      >
        <span className="hidden sm:inline text-lg">{currentLocale === 'en' ? '🇺🇸' : '🇯🇵'}</span>
        <span className="font-medium">{currentLocale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => {
                onLocaleChange(locale);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                currentLocale === locale
                  ? 'text-[#FF6B35] font-medium bg-gray-50 dark:bg-gray-700/50'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-lg">{locale === 'en' ? '🇺🇸' : '🇯🇵'}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{localeNames[locale]}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {locale === 'en' ? 'English' : '日本語'}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
