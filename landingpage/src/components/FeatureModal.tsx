'use client';

import { useEffect } from 'react';
import { useTranslationContext } from '@/context/TranslationContext';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    id: string;
    icon: string;
    gridClass: string;
    bgColor: string;
    isStats?: boolean;
  } | null;
}

export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const { t } = useTranslationContext();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !feature) return null;

  const getExpandedContent = (featureId: string) => {
    switch (featureId) {
      case 'robot':
        return {
          sections: [
            {
              title: t(`features.robot_tech_spec`) || 'Technical Specifications',
              content: (t(`features.robot_tech_content`) || `• High-precision LiDAR sensor for 3D mapping
• Quadruped locomotion for stairs and rough terrain
• Waterproof design for all-weather adventures
• Battery life: Approximately 2 hours`).replace(/\\n/g, '\n')
            },
            {
              title: t(`features.robot_safety`) || 'Safety Features',
              content: (t(`features.robot_safety_content`) || `• Automatic obstacle avoidance
• Emergency stop button
• GPS tracking for location monitoring
• Child-friendly design`).replace(/\\n/g, '\n')
            }
          ]
        };
      case 'ar':
        return {
          sections: [
            {
              title: t(`features.ar_devices`) || 'Supported Devices',
              content: (t(`features.ar_devices_content`) || `• iPhone (ARKit compatible)
• Android (ARCore compatible)
• Meta Quest 3 / Quest Pro
• Magic Leap 2`).replace(/\\n/g, '\n')
            },
            {
              title: t(`features.ar_game`) || 'Game Elements',
              content: (t(`features.ar_game_content`) || `• Various treasure chest rarities
• Time attack mode
• Cooperative play
• Seasonal events`).replace(/\\n/g, '\n')
            }
          ]
        };
      case 'ai':
        return {
          sections: [
            {
              title: t(`features.ai_process`) || 'AI Generation Process',
              content: (t(`features.ai_process_content`) || `• Capture location features with image recognition
• Auto-generate prompts with GPT-4
• Create high-quality images with Stable Diffusion XL
• Choose from multiple candidates`).replace(/\\n/g, '\n')
            },
            {
              title: t(`features.ai_customize`) || 'Customization',
              content: (t(`features.ai_customize_content`) || `• Art style selection
• Color tone adjustment
• Theme additions
• Learning personal preferences`).replace(/\\n/g, '\n')
            }
          ]
        };
      case 'nft':
        return {
          sections: [
            {
              title: t(`features.nft_blockchain`) || 'Blockchain Details',
              content: (t(`features.nft_blockchain_content`) || `• Base Chain (Ethereum L2)
• Gas fees covered by us
• ERC-721 compliant
• Tradeable on OpenSea`).replace(/\\n/g, '\n')
            },
            {
              title: t(`features.nft_benefits`) || 'Benefits & Value',
              content: (t(`features.nft_benefits_content`) || `• Access to exclusive collections
• Community voting rights
• Real event invitations
• Potential future revenue sharing`).replace(/\\n/g, '\n')
            }
          ]
        };
      default:
        return { sections: [] };
    }
  };

  const expandedContent = getExpandedContent(feature.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{feature.icon}</span>
              <h2 className="text-2xl font-bold">{t(`features.${feature.id}.title`)}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t(`features.${feature.id}.description`)}
          </p>
          
          <div className="bg-gradient-to-r from-[#FF6B35]/10 to-[#4ECDC4]/10 rounded-xl p-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              {t(`features.${feature.id}.details`)}
            </p>
          </div>

          {/* Expanded Sections */}
          <div className="space-y-6">
            {expandedContent.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {section.content.trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('features.modal_cta') || 'この機能を体験してみませんか？'}
            </p>
            <button
              onClick={() => {
                onClose();
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white rounded-full font-medium hover:scale-105 transition-transform"
            >
              {t('features.modal_button') || '早期アクセスに登録'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}