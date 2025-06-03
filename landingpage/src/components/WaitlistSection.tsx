'use client';

import { useState, useEffect } from 'react';
import { useTranslationContext } from '@/context/TranslationContext';

interface FormData {
  email: string;
  name?: string;
  interests: string[];
  source?: string;
}

export default function WaitlistSection() {
  const { t, locale } = useTranslationContext();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    interests: [],
    source: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [totalRegistrations, setTotalRegistrations] = useState(0); // デフォルト値

  // 登録者数を取得
  useEffect(() => {
    fetch('/api/waitlist')
      .then((res) => res.json())
      .then((data) => {
        if (data.totalRegistrations) {
          setTotalRegistrations(data.totalRegistrations);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch registration count:', error);
      });
  }, []);

  const interests = [
    {
      id: 'robot-walk',
      label: locale === 'ja' ? 'ロボット犬との散歩体験' : 'Robot dog walking experience',
    },
    { id: 'ar-treasure', label: locale === 'ja' ? 'AR宝探しゲーム' : 'AR treasure hunt game' },
    { id: 'ai-nft', label: locale === 'ja' ? 'AI生成アートNFT' : 'AI-generated art NFT' },
    {
      id: 'enterprise',
      label: locale === 'ja' ? 'イベント・企業向けソリューション' : 'Event & enterprise solutions',
    },
  ];

  const sources = [
    { value: '', label: locale === 'ja' ? '選択してください' : 'Please select' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'discord', label: 'Discord' },
    { value: 'friend', label: locale === 'ja' ? '友人・知人' : 'Friend/Acquaintance' },
    { value: 'search', label: locale === 'ja' ? '検索' : 'Search' },
    { value: 'other', label: locale === 'ja' ? 'その他' : 'Other' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email =
        locale === 'ja'
          ? '有効なメールアドレスを入力してください'
          : 'Please enter a valid email address';
    }

    // Interests validation
    if (formData.interests.length === 0) {
      newErrors.interests = [
        locale === 'ja' ? '少なくとも1つ選択してください' : 'Please select at least one option',
      ];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'エラーが発生しました');
      }

      setSubmitted(true);

      // 成功時の処理
      console.log('Registration successful:', data);

      // フォームをリセット
      setFormData({
        email: '',
        name: '',
        interests: [],
        source: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        email:
          error instanceof Error
            ? error.message
            : locale === 'ja'
              ? '登録中にエラーが発生しました。もう一度お試しください。'
              : 'An error occurred during registration. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
    // Clear error when user selects an interest
    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: undefined }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold mb-2">{t('waitlist.success.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">{t('waitlist.success.message')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-20 px-4 bg-gradient-to-b from-transparent to-[#FFE66D]/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('waitlist.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t('waitlist.subtitle')}</p>

          {/* Incentives */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: '🎯', text: t('waitlist.incentives.early_access') },
              { icon: '🎁', text: t('waitlist.incentives.nft_airdrop') },
              { icon: '📧', text: t('waitlist.incentives.discount') },
              { icon: '🤝', text: t('waitlist.incentives.vip_community') },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('waitlist.form.email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700"
              placeholder={t('waitlist.form.email_placeholder')}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t('waitlist.form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700"
              placeholder={t('waitlist.form.name_placeholder')}
            />
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">{t('waitlist.form.interests')}</label>
            <div className="space-y-2">
              {interests.map((interest) => (
                <label key={interest.id} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest.id)}
                    onChange={() => handleInterestChange(interest.id)}
                    className="mr-3 w-4 h-4 text-[#FF6B35] focus:ring-[#FF6B35] rounded"
                  />
                  <span>{interest.label}</span>
                </label>
              ))}
            </div>
            {errors.interests && <p className="mt-1 text-sm text-red-500">{errors.interests[0]}</p>}
          </div>

          {/* Source */}
          <div className="mb-8">
            <label htmlFor="source" className="block text-sm font-medium mb-2">
              {t('waitlist.form.source')}
            </label>
            <select
              id="source"
              name="source"
              value={formData.source || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-700"
            >
              {sources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('waitlist.form.submitting') : t('waitlist.form.submit')}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            {t('waitlist.form.privacy')}
          </p>
        </form>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t('waitlist.social_proof', { count: totalRegistrations.toLocaleString() })}
          </p>
        </div>
      </div>
    </section>
  );
}
