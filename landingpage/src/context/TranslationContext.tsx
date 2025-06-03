'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { type Locale } from '@/i18n/config';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const translation = useTranslation();

  return <TranslationContext.Provider value={translation}>{children}</TranslationContext.Provider>;
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
}
