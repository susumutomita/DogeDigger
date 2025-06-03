export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
};

export const pathnames = {
  '/': '/',
} as const;

export type Pathnames = typeof pathnames;
