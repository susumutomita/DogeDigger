'use client';

import { useState } from 'react';

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            実際の<span className="gradient-text">体験</span>を見る
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ロボット犬と一緒にAR宝探しをする様子をご覧ください
          </p>
        </div>

        <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
          {/* Video placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying ? (
              <button
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200"
                onClick={() => setIsPlaying(true)}
              >
                <svg
                  className="w-8 h-8 text-[#FF6B35] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              <div className="text-white text-xl">デモビデオ再生中...</div>
            )}
          </div>

          {/* Demo stats */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-80">創発遊戯2025 ハッカソン</p>
                <p className="font-bold">プロトタイプデモ</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">再生時間</p>
                <p className="font-bold">3:42</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { emoji: '🐕', title: 'リアルタイム追跡', desc: 'ロボット犬の動きをARで可視化' },
            { emoji: '💎', title: '宝物発見', desc: 'ARマーカーで宝箱を表示' },
            { emoji: '🎨', title: 'NFT生成', desc: 'その場でアートを生成・ミント' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:-translate-y-1 transition-transform duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
