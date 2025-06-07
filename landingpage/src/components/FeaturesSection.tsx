'use client';

import { useState } from 'react';
import { useTranslationContext } from '@/context/TranslationContext';
import TitleWithGradient from './TitleWithGradient';
import FeatureModal from './FeatureModal';

const features = [
  {
    id: 'robot',
    icon: '🤖',
    gridClass: 'md:col-span-2 md:row-span-1',
    bgColor: 'from-[#FF6B35]/20 to-[#FFE66D]/20',
  },
  {
    id: 'ar',
    icon: '🔮',
    gridClass: 'md:col-span-1 md:row-span-2',
    bgColor: 'from-[#4ECDC4]/20 to-[#FF6B35]/20',
  },
  {
    id: 'ai',
    icon: '🎨',
    gridClass: 'md:col-span-1 md:row-span-1',
    bgColor: 'from-[#FFE66D]/20 to-[#4ECDC4]/20',
  },
  {
    id: 'nft',
    icon: '💎',
    gridClass: 'md:col-span-1 md:row-span-1',
    bgColor: 'from-[#FF6B35]/20 to-[#4ECDC4]/20',
  },
  {
    id: 'innovation',
    icon: '🚀',
    gridClass: 'md:col-span-1 md:row-span-1',
    bgColor: 'from-[#4ECDC4]/20 to-[#FFE66D]/20',
    isStats: true,
  },
];

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslationContext();

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.id !== 'innovation') {
      setSelectedFeature(feature);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <TitleWithGradient
            text={t('features.title')}
            gradientText={t('features.title_gradient')}
            className="text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 h-auto md:h-[600px]">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group relative bg-gradient-to-br ${feature.bgColor} bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 cursor-pointer overflow-hidden
                ${feature.gridClass}
                ${hoveredFeature === feature.id ? 'scale-[1.02] shadow-2xl' : ''}
              `}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => handleFeatureClick(feature)}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {feature.id === 'innovation' ? (
                  // Innovation Card
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <div className="space-y-4">
                      <div className="text-5xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('features.innovation.title')}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {t('features.innovation.description')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">
                      {t(`features.${feature.id}.title`)}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4 flex-grow line-clamp-3">
                      {t(`features.${feature.id}.description`)}
                    </p>

                    {/* Expanded Details */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${hoveredFeature === feature.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
                        {t(`features.${feature.id}.details`)}
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="mt-auto pt-4">
                      <div
                        className={`inline-flex items-center text-sm font-medium text-[#FF6B35] transition-transform duration-300 ${hoveredFeature === feature.id ? 'translate-x-2' : ''}`}
                      >
                        {t('features.learn_more')}
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#FFE66D] to-transparent rounded-full opacity-20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-[#4ECDC4] to-transparent rounded-full opacity-20 blur-3xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">
            {t('features.flow_title') || '体験の流れ'}
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            {[
              { step: '1', text: t('features.flow_step1') || 'ロボット犬を起動', icon: '🐕' },
              { step: '2', text: t('features.flow_step2') || 'AR空間で宝探し', icon: '📱' },
              { step: '3', text: t('features.flow_step3') || 'AIアート生成', icon: '🎨' },
              { step: '4', text: t('features.flow_step4') || 'NFTゲット！', icon: '🎉' },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm font-medium">{item.text}</p>
                </div>
                {index < 3 && (
                  <svg
                    className="hidden md:block w-8 h-8 text-gray-300 dark:text-gray-600 mx-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFeature(null);
        }}
        feature={selectedFeature}
      />
    </section>
  );
}
