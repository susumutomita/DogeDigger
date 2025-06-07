'use client';

import Link from 'next/link';
import { useTranslationContext } from '@/context/TranslationContext';
import GradientText from '@/components/GradientText';

export default function TermsPage() {
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
            <GradientText>{t('terms.title')}</GradientText>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-4">
            {t('terms.last_updated')}: 2025年6月6日
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('terms.introduction')}
            </p>
          </section>

          {/* 1. Service Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.service_overview.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.service_overview.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('terms.sections.service_overview.robot_dog')}</li>
              <li>{t('terms.sections.service_overview.ar_treasure')}</li>
              <li>{t('terms.sections.service_overview.ai_art')}</li>
              <li>{t('terms.sections.service_overview.nft_minting')}</li>
            </ul>
          </section>

          {/* 2. User Eligibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.eligibility.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.eligibility.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('terms.sections.eligibility.age')}</li>
              <li>{t('terms.sections.eligibility.legal_capacity')}</li>
              <li>{t('terms.sections.eligibility.compliance')}</li>
            </ul>
          </section>

          {/* 3. Account Registration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.account.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.account.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('terms.sections.account.accurate_info')}</li>
              <li>{t('terms.sections.account.security')}</li>
              <li>{t('terms.sections.account.responsibility')}</li>
            </ul>
          </section>

          {/* 4. NFT and Digital Assets */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.nft.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.nft.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('terms.sections.nft.ownership')}</li>
              <li>{t('terms.sections.nft.blockchain')}</li>
              <li>{t('terms.sections.nft.gas_fees')}</li>
              <li>{t('terms.sections.nft.no_guarantee')}</li>
            </ul>
          </section>

          {/* 5. Acceptable Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.acceptable_use.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.acceptable_use.description')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('terms.sections.acceptable_use.lawful')}</li>
              <li>{t('terms.sections.acceptable_use.no_harm')}</li>
              <li>{t('terms.sections.acceptable_use.no_interference')}</li>
              <li>{t('terms.sections.acceptable_use.no_reverse_engineering')}</li>
            </ul>
          </section>

          {/* 6. Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.intellectual_property.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.intellectual_property.description')}
            </p>
            <h3 className="text-xl font-semibold mb-3">
              {t('terms.sections.intellectual_property.user_content.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.intellectual_property.user_content.description')}
            </p>
            <h3 className="text-xl font-semibold mb-3">
              {t('terms.sections.intellectual_property.ai_generated.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.intellectual_property.ai_generated.description')}
            </p>
          </section>

          {/* 7. Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.privacy.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.privacy.description')}
            </p>
          </section>

          {/* 8. Disclaimers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.disclaimers.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.disclaimers.as_is')}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.disclaimers.no_warranty')}
            </p>
          </section>

          {/* 9. Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.liability.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.liability.description')}
            </p>
          </section>

          {/* 10. Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.indemnification.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.indemnification.description')}
            </p>
          </section>

          {/* 11. Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.termination.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.termination.description')}
            </p>
          </section>

          {/* 12. Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.governing_law.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.governing_law.description')}
            </p>
          </section>

          {/* 13. Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.changes.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('terms.sections.changes.description')}
            </p>
          </section>

          {/* 14. Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('terms.sections.contact.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('terms.sections.contact.description')}
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <p className="font-semibold mb-2">DogeDigger Team</p>
              <p className="text-gray-600 dark:text-gray-400">
                Email: legal@dogedigger.app
                <br />
                Address: 東京都渋谷区
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center text-[#FF6B35] hover:text-[#FF8555] transition-colors font-medium"
            >
              <span className="mr-2">←</span>
              {t('terms.back_to_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
