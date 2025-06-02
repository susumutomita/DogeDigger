'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const basePlans = [
  {
    id: 'basic',
    name: '体験プラン',
    basePrice: 3000,
    perSession: 3000,
    description: '初めての方におすすめ',
    features: ['1回の宝探し体験', 'AI生成アート1点', 'NFTミント', '基本サポート'],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'プレミアムプラン',
    basePrice: 9800,
    perSession: 1960,
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
  const [selectedTeamSize, setSelectedTeamSize] = useState(1);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // 年間割引率
  const yearlyDiscount = 0.2; // 20% off

  const calculatePrice = (basePrice: number | null, teamSize: number, isYearly: boolean) => {
    if (basePrice === null) return null;
    let price = basePrice * teamSize;
    if (isYearly) {
      price = price * 12 * (1 - yearlyDiscount);
    }
    return price;
  };

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            シンプルな<span className="gradient-text">料金プラン</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            あなたのニーズに合わせて選べる3つのプラン
          </p>
        </motion.div>

        {/* Pricing Calculator */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Size Slider */}
            <div>
              <label className="block text-sm font-medium mb-4">
                利用人数: <span className="text-[#FF6B35] font-bold">{selectedTeamSize}人</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={selectedTeamSize}
                onChange={(e) => setSelectedTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${(selectedTeamSize - 1) * 5}%, #e5e7eb ${(selectedTeamSize - 1) * 5}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1人</span>
                <span>10人</span>
                <span>20人</span>
              </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex flex-col items-center md:items-end">
              <label className="block text-sm font-medium mb-4">支払いサイクル</label>
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    billingCycle === 'monthly' ? 'bg-white dark:bg-gray-900 shadow-md' : ''
                  }`}
                >
                  月額
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 relative ${
                    billingCycle === 'yearly' ? 'bg-white dark:bg-gray-900 shadow-md' : ''
                  }`}
                >
                  年額
                  <span className="absolute -top-8 right-0 bg-[#4ECDC4] text-white text-xs px-2 py-1 rounded-full">
                    20% OFF
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {basePlans.map((plan, index) => {
            const price = calculatePrice(
              plan.basePrice,
              selectedTeamSize,
              billingCycle === 'yearly'
            );
            const displayPrice = price
              ? Math.floor(price / (billingCycle === 'yearly' ? 12 : 1))
              : null;

            return (
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
                      おすすめ
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>

                <div className="mb-6">
                  {displayPrice !== null ? (
                    <>
                      <span className="text-4xl font-bold">¥{displayPrice.toLocaleString()}</span>
                      <span className="text-gray-600 dark:text-gray-400">/月</span>
                      {selectedTeamSize > 1 && plan.perSession && (
                        <p className="text-sm text-gray-500 mt-1">
                          1人あたり ¥{Math.floor(plan.perSession).toLocaleString()}/回
                        </p>
                      )}
                      {billingCycle === 'yearly' && price !== null && (
                        <p className="text-sm text-[#4ECDC4] mt-1">
                          年額 ¥{Math.floor(price).toLocaleString()} (20%割引適用)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-3xl font-bold">お問い合わせ</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#4ECDC4] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
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
                  {plan.basePrice === null ? 'お問い合わせ' : '今すぐ始める'}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            全てのプランに30日間の返金保証が付いています
          </p>
        </motion.div>
      </div>
    </section>
  );
}
