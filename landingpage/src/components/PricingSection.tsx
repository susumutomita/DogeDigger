'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslationContext } from '@/context/TranslationContext';
import TitleWithGradient from './TitleWithGradient';

const basePlans = [
  {
    id: 'basic',
    name: '体験プラン',
    basePrice: null,
    perSession: null,
    description: '初めての方におすすめ',
    features: ['1回の宝探し体験', 'AI生成アート1点', 'NFTミント', '基本サポート'],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'プレミアムプラン',
    basePrice: null,
    perSession: null,
    description: '最も人気のプラン',
    features: [
      '月5回の宝探し体験',
      'AI生成アート5点',
      'NFTミント無制限',
      '優先サポート',
      '限定イベント招待',
      'ロボット犬カスタマイズ',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'エンタープライズ',
    basePrice: null,
    perSession: null,
    description: 'イベント・企業向け',
    features: [
      '無制限の体験回数',
      'カスタムAIモデル',
      '専用ロボット犬',
      '24/7サポート',
      'APIアクセス',
      'ホワイトラベル対応',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const { t } = useTranslationContext();
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <TitleWithGradient
            text={t('pricing.title')}
            gradientText={t('pricing.title_gradient')}
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {basePlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 ${
                plan.highlighted ? 'shadow-2xl ring-2 ring-[#FF6B35] scale-105' : 'shadow-lg'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t('pricing.recommended')}
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 line-clamp-1">
                {t(`pricing.plans.${plan.id}.name`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {t(`pricing.plans.${plan.id}.description`)}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                  {t('pricing.tbd')}
                </span>
                <p className="text-sm text-gray-500 mt-1">{t('pricing.tbd_description')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-[#4ECDC4] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm line-clamp-2">
                      {t(`pricing.plans.${plan.id}.features.${featureIndex}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white hover:shadow-lg hover:scale-105'
                    : 'border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white'
                }`}
              >
                {t('pricing.cta')}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ or additional info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400">{t('pricing.guarantee')}</p>
        </motion.div>
      </div>
    </section>
  );
}
