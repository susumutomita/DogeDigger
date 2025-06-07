'use client';

import { useState, useEffect } from 'react';
import { useTranslationContext } from '@/context/TranslationContext';
import Link from 'next/link';

export default function CookieBanner() {
  const { t, locale } = useTranslationContext();
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // クッキー同意状態をチェック
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consentData = {
      necessary: true, // 必須クッキーは拒否できない
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              {locale === 'ja' ? 'クッキーの使用について' : 'Cookie Notice'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {locale === 'ja'
                ? '当サイトでは、最適なユーザー体験を提供するためにクッキーを使用しています。'
                : 'We use cookies to provide you with the best user experience.'}
            </p>
            
            {showDetails && (
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">
                    {locale === 'ja' ? '必須クッキー' : 'Essential Cookies'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {locale === 'ja'
                      ? 'サイトの基本機能に必要です。これらは無効にできません。'
                      : 'Required for basic site functionality. These cannot be disabled.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {locale === 'ja' ? '分析クッキー' : 'Analytics Cookies'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {locale === 'ja'
                      ? 'サイトの利用状況を分析し、改善に役立てます。'
                      : 'Help us understand how visitors use our site to improve it.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    {locale === 'ja' ? 'マーケティングクッキー' : 'Marketing Cookies'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {locale === 'ja'
                      ? '関連性の高い広告を表示するために使用されます。'
                      : 'Used to show relevant advertisements to you.'}
                  </p>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-[#FF6B35] hover:underline mt-2"
            >
              {showDetails
                ? (locale === 'ja' ? '詳細を隠す' : 'Hide details')
                : (locale === 'ja' ? '詳細を表示' : 'Show details')}
            </button>
            
            <Link
              href="/privacy"
              className="text-sm text-[#FF6B35] hover:underline ml-4"
            >
              {locale === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {locale === 'ja' ? '必須のみ' : 'Essential Only'}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              {locale === 'ja' ? 'すべて許可' : 'Accept All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}