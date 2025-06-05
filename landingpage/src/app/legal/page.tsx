'use client';

import Link from 'next/link';
import { useTranslationContext } from '@/context/TranslationContext';
import GradientText from '@/components/GradientText';

export default function LegalPage() {
  const { t } = useTranslationContext();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#4ECDC4]/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <GradientText>{t('legal.title')}</GradientText>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-4">
            {t('legal.last_updated')}: 2025年6月6日
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* 販売業者 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.seller.title')}</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl space-y-3">
              <div>
                <span className="font-semibold">{t('legal.sections.seller.name_label')}:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">DogeDigger運営事務局</span>
              </div>
              <div>
                <span className="font-semibold">{t('legal.sections.seller.representative_label')}:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">代表者名</span>
              </div>
              <div>
                <span className="font-semibold">{t('legal.sections.seller.address_label')}:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">〒150-0000 東京都渋谷区</span>
              </div>
            </div>
          </section>

          {/* 連絡先 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.contact.title')}</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl space-y-3">
              <div>
                <span className="font-semibold">{t('legal.sections.contact.email_label')}:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">support@dogedigger.app</span>
              </div>
              <div>
                <span className="font-semibold">{t('legal.sections.contact.hours_label')}:</span>
                <span className="ml-2 text-gray-700 dark:text-gray-300">平日 10:00-18:00（土日祝日を除く）</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('legal.sections.contact.note')}
              </p>
            </div>
          </section>

          {/* 販売価格 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.pricing.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('legal.sections.pricing.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('legal.sections.pricing.display_price')}</li>
              <li>{t('legal.sections.pricing.tax_included')}</li>
              <li>{t('legal.sections.pricing.gas_fees')}</li>
            </ul>
          </section>

          {/* 支払方法 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.payment.title')}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('legal.sections.payment.credit_card')}</li>
              <li>{t('legal.sections.payment.crypto')}</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              {t('legal.sections.payment.note')}
            </p>
          </section>

          {/* 支払期限 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.payment_timing.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('legal.sections.payment_timing.description')}
            </p>
          </section>

          {/* 商品の引渡し時期 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.delivery.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('legal.sections.delivery.digital_content')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t('legal.sections.delivery.nft')}
            </p>
          </section>

          {/* 返品・交換について */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.returns.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('legal.sections.returns.digital_nature')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t('legal.sections.returns.defect_policy')}
            </p>
          </section>

          {/* キャンセルについて */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.cancellation.title')}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('legal.sections.cancellation.policy')}
            </p>
          </section>

          {/* 動作環境 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.requirements.title')}</h2>
            <h3 className="text-xl font-semibold mb-3">{t('legal.sections.requirements.mobile.title')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>iOS 14.0以降</li>
              <li>Android 8.0以降</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">{t('legal.sections.requirements.ar.title')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Meta Quest 3</li>
              <li>ARKit対応デバイス（iPhone 6s以降）</li>
              <li>ARCore対応Androidデバイス</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">{t('legal.sections.requirements.browser.title')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Chrome 90以降</li>
              <li>Safari 14以降</li>
              <li>Firefox 88以降</li>
            </ul>
          </section>

          {/* その他の特記事項 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">{t('legal.sections.notes.title')}</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('legal.sections.notes.blockchain_nature')}</li>
              <li>{t('legal.sections.notes.crypto_wallet')}</li>
              <li>{t('legal.sections.notes.gas_responsibility')}</li>
              <li>{t('legal.sections.notes.age_restriction')}</li>
            </ul>
          </section>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center text-[#FF6B35] hover:text-[#FF8555] transition-colors font-medium"
            >
              <span className="mr-2">←</span>
              {t('legal.back_to_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}