import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    product: [
      { label: '特徴', href: '#features' },
      { label: 'デモ', href: '#demo' },
      { label: '料金', href: '#pricing' },
      { label: 'ロードマップ', href: '#roadmap' },
    ],
    company: [
      { label: 'チーム', href: '#team' },
      { label: 'ブログ', href: '#blog' },
      { label: 'お問い合わせ', href: '#contact' },
      { label: 'プレスキット', href: '#press' },
    ],
    legal: [
      { label: '利用規約', href: '#terms' },
      { label: 'プライバシーポリシー', href: '#privacy' },
      { label: '特定商取引法', href: '#legal' },
    ],
    social: [
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'Discord', href: 'https://discord.com' },
      { label: 'GitHub', href: 'https://github.com' },
    ],
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-bold text-xl">DogeDigger</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              犬も歩けばトークン掘れる
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              ロボット犬×AR×NFTで実現する、新感覚の宝探し体験
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              プロダクト
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              会社情報
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              法的情報
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                最新情報をお届け
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                プロダクトアップデートや限定オファーをメールでお知らせします
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent dark:bg-gray-800"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                購読する
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
              © 2025 DogeDigger. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
