'use client';

import { useState, useEffect } from 'react';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent) {
      try {
        setConsent(JSON.parse(storedConsent));
      } catch (error) {
        console.error('Failed to parse cookie consent:', error);
      }
    }
  }, []);

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = {
      necessary: true, // 必須クッキーは常にtrue
      analytics: newConsent.analytics ?? consent?.analytics ?? false,
      marketing: newConsent.marketing ?? consent?.marketing ?? false,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookie-consent', JSON.stringify(updatedConsent));
    setConsent(updatedConsent);

    // Google Analytics の設定
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: updatedConsent.analytics ? 'granted' : 'denied',
        ad_storage: updatedConsent.marketing ? 'granted' : 'denied',
      });
    }
  };

  const hasConsent = (type: keyof Omit<CookieConsent, 'timestamp'>) => {
    return consent?.[type] ?? false;
  };

  return {
    consent,
    updateConsent,
    hasConsent,
  };
}

// グローバル型定義
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      ...args: Array<string | Record<string, unknown>>
    ) => void;
  }
}
