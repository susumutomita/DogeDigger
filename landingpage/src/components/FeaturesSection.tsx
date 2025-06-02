'use client';

import { useState } from 'react';

const features = [
  {
    id: 'robot',
    icon: '🤖',
    title: 'ロボット犬と冒険',
    description: '最先端のロボット犬が現実世界をマッピングしながら、あなたと一緒に宝探しの冒険へ',
    details: '内蔵センサーとカメラで周囲をスキャンし、UnityのARマッピング技術で現実とデジタルをシンクロ',
  },
  {
    id: 'ar',
    icon: '🔮',
    title: 'AR宝探し体験',
    description: 'スマホやMeta Quest 3を通じて、現実空間に隠された宝箱を発見する新感覚体験',
    details: '公園やイベント会場が冒険の舞台に。家族や友人と一緒に楽しめる新しいお出かけコンテンツ',
  },
  {
    id: 'ai',
    icon: '🎨',
    title: 'AI生成アート',
    description: 'その場の特徴を元に、Stable Diffusionが世界に一つだけのアートをリアルタイム生成',
    details: '地形やランドマークを元にテキストプロンプトを生成し、高品質な画像をクラウドで生成',
  },
  {
    id: 'nft',
    icon: '💎',
    title: 'NFTとして永久保存',
    description: '生成されたアートは即座にNFT化され、あなたのウォレットに永久保存',
    details: 'Baseチェーン上のスマートコントラクトで、その場でミント。後から転売や交換も可能',
  },
];

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300 cursor-pointer
                ${hoveredFeature === feature.id ? 'scale-105 shadow-2xl' : ''}
                ${index === 0 ? 'md:col-span-2' : ''}
              `}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>

                {/* Expanded Details */}
                <div className={`overflow-hidden transition-all duration-300 ${hoveredFeature === feature.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.details}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#FFE66D] to-transparent rounded-full opacity-20 blur-2xl" />
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
