'use client';

import { useState, useEffect } from 'react';
import { type Locale, defaultLocale } from '@/i18n/config';

type Messages = {
  [key: string]: string | Messages;
};

export function useTranslation(initialLocale?: Locale): {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
} {
  const [locale, setLocale] = useState<Locale>(initialLocale || defaultLocale);
  const [messages, setMessages] = useState<Messages>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const messageModule = await import(`@/i18n/messages/${locale}.json`);
        setMessages(messageModule.default);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        // Fallback to default locale
        if (locale !== defaultLocale) {
          const fallbackModule = await import(`@/i18n/messages/${defaultLocale}.json`);
          setMessages(fallbackModule.default);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [locale]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: string | Messages = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Replace parameters
    if (params) {
      return Object.entries(params).reduce((text, [param, val]) => {
        return text.replace(new RegExp(`\\{${param}\\}`, 'g'), String(val));
      }, value as string);
    }

    return value;
  };

  return {
    locale,
    setLocale,
    t,
    isLoading,
  };
}
