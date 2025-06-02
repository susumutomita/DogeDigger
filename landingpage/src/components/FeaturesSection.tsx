'use client';

import { useState } from 'react';

const features = [
  {
    id: 'robot',
    icon: '🤖',
    title: 'ロボット犬と冒険',
    description: '最先端のロボット犬が現実世界をマッピングしながら、あなたと一緒に宝探しの冒険へ',
    details:
      '内蔵センサーとカメラで周囲をスキャンし、UnityのARマッピング技術で現実とデジタルをシンクロ',
    gridClass: 'md:col-span-2 md:row-span-1',
    bgColor: 'from-[#FF6B35]/10 to-[#FFE66D]/10',
  },
  {
    id: 'ar',
    icon: '🔮',
    title: 'AR宝探し体験',
    description: 'スマホやMeta Quest 3を通じて、現実空間に隠された宝箱を発見',
    details: '公園やイベント会場が冒険の舞台に。家族や友人と一緒に楽しめる新しいお出かけコンテンツ',
    gridClass: 'md:col-span-1 md:row-span-2',
    bgColor: 'from-[#4ECDC4]/10 to-[#FF6B35]/10',
  },
  {
    id: 'ai',
    icon: '🎨',
    title: 'AI生成アート',
    description: 'その場の特徴を元に、世界に一つだけのアートを生成',
    details: '地形やランドマークを元にテキストプロンプトを生成し、高品質な画像をクラウドで生成',
    gridClass: 'md:col-span-1 md:row-span-1',
    bgColor: 'from-[#FFE66D]/10 to-[#4ECDC4]/10',
  },
  {
    id: 'nft',
    icon: '💎',
    title: 'NFTとして永久保存',
    description: '生成されたアートは即座にNFT化',
    details: 'Baseチェーン上のスマートコントラクトで、その場でミント。後から転売や交換も可能',
    gridClass: 'md:col-span-1 md:row-span-1',
    bgColor: 'from-[#FF6B35]/10 to-[#4ECDC4]/10',
  },
  {
    id: 'stats',
    icon: '📊',
    title: '実績データ',
    description: '',
    details: '',
    gridClass: 'md:col-span-1 md:row-span-1',
    bgColor: 'from-[#4ECDC4]/10 to-[#FFE66D]/10',
    isStats: true,
  },
];

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            3つの<span className="gradient-text">革新的技術</span>が融合
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ロボティクス × AR × ブロックチェーンで実現する、未来の宝探し体験
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 h-auto md:h-[600px]">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group relative bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 cursor-pointer overflow-hidden
                ${feature.gridClass}
                ${hoveredFeature === feature.id ? 'scale-[1.02] shadow-2xl' : ''}
              `}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {feature.isStats ? (
                  // Stats Card
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <div className="space-y-4">
                      <div>
                        <p className="text-3xl font-bold gradient-text">1,000+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">NFT生成済み</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold gradient-text">50+</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">イベント開催</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold gradient-text">98%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">満足度</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {feature.description}
                    </p>

                    {/* Expanded Details */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${hoveredFeature === feature.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400">{feature.details}</p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="mt-auto pt-4">
                      <div
                        className={`inline-flex items-center text-sm font-medium text-[#FF6B35] transition-transform duration-300 ${hoveredFeature === feature.id ? 'translate-x-2' : ''}`}
                      >
                        詳しく見る
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
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#FFE66D] to-transparent rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-[#4ECDC4] to-transparent rounded-full opacity-20 blur-3xl" />
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">体験の流れ</h3>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            {[
              { step: '1', text: 'ロボット犬を起動', icon: '🐕' },
              { step: '2', text: 'AR空間で宝探し', icon: '📱' },
              { step: '3', text: 'AIアート生成', icon: '🎨' },
              { step: '4', text: 'NFTゲット！', icon: '🎉' },
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
    </section>
  );
}
