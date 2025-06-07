'use client';

import Link from 'next/link';
import { useTranslationContext } from '@/context/TranslationContext';
import GradientText from '@/components/GradientText';

export default function PrivacyPage() {
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
            <GradientText>{t('privacy.title')}</GradientText>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-4">
            {t('privacy.last_updated')}: 2025年6月6日
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.introduction')}
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.information_collection.title')}
            </h2>

            <h3 className="text-xl font-semibold mb-3">
              {t('privacy.sections.information_collection.personal_info.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('privacy.sections.information_collection.personal_info.email')}</li>
              <li>{t('privacy.sections.information_collection.personal_info.name')}</li>
              <li>{t('privacy.sections.information_collection.personal_info.wallet')}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              {t('privacy.sections.information_collection.usage_info.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('privacy.sections.information_collection.usage_info.location')}</li>
              <li>{t('privacy.sections.information_collection.usage_info.device')}</li>
              <li>{t('privacy.sections.information_collection.usage_info.interaction')}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              {t('privacy.sections.information_collection.generated_content.title')}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('privacy.sections.information_collection.generated_content.ai_art')}</li>
              <li>{t('privacy.sections.information_collection.generated_content.nft_data')}</li>
            </ul>
          </section>

          {/* 2. How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.information_use.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('privacy.sections.information_use.service_provision')}</li>
              <li>{t('privacy.sections.information_use.nft_management')}</li>
              <li>{t('privacy.sections.information_use.improvement')}</li>
              <li>{t('privacy.sections.information_use.communication')}</li>
              <li>{t('privacy.sections.information_use.legal')}</li>
            </ul>
          </section>

          {/* 3. Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.data_sharing.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('privacy.sections.data_sharing.introduction')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('privacy.sections.data_sharing.blockchain')}</li>
              <li>{t('privacy.sections.data_sharing.service_providers')}</li>
              <li>{t('privacy.sections.data_sharing.legal_requirements')}</li>
            </ul>
          </section>

          {/* 4. Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.data_security.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('privacy.sections.data_security.description')}
            </p>
          </section>

          {/* 5. Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.your_rights.title')}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('privacy.sections.your_rights.access')}</li>
              <li>{t('privacy.sections.your_rights.correction')}</li>
              <li>{t('privacy.sections.your_rights.deletion')}</li>
              <li>{t('privacy.sections.your_rights.portability')}</li>
              <li>{t('privacy.sections.your_rights.objection')}</li>
            </ul>
          </section>

          {/* 6. Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.cookies.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('privacy.sections.cookies.description')}
            </p>
          </section>

          {/* 7. Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.children.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('privacy.sections.children.description')}
            </p>
          </section>

          {/* 8. Updates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.updates.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t('privacy.sections.updates.description')}
            </p>
          </section>

          {/* 9. Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {t('privacy.sections.contact.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {t('privacy.sections.contact.description')}
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
              <p className="font-semibold mb-2">DogeDigger Team</p>
              <p className="text-gray-600 dark:text-gray-400">
                Email: privacy@dogedigger.app
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
              {t('privacy.back_to_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
