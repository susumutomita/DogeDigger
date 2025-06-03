'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DemoSection() {
  const [showVideo, setShowVideo] = useState(false);

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
          {!showVideo ? (
            <>
              {/* Video thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <Image
                src="https://img.youtube.com/vi/w-pk6swpKLc/maxresdefault.jpg"
                alt="DogeDigger デモビデオ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 group"
                >
                  <svg
                    className="w-8 h-8 text-primary ml-1 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
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
            </>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/w-pk6swpKLc?si=7m_S3K5dGeJZ3ySh&autoplay=1"
              title="DogeDigger デモビデオ"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-2xl"
            />
          )}
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
