'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import AdminLayout from '@/components/AdminLayout';

interface WaitlistEntry {
  id: number;
  email: string;
  name: string | null;
  interests: string[];
  source: string | null;
  created_at: string;
  updated_at: string;
  metadata: {
    ip?: string;
    user_agent?: string;
    referrer?: string;
  };
}

interface Stats {
  totalRegistrations: number;
  recentRegistrations: number;
  topInterests: { [key: string]: number };
  topSources: { [key: string]: number };
}

export default function WaitlistAdminPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchEmail, setSearchEmail] = useState('');
  const entriesPerPage = 20;

  useEffect(() => {
    fetchWaitlistData();
  }, [currentPage, searchEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchWaitlistData = async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setError('Supabaseが設定されていません。データを表示するには設定が必要です。');
      setLoading(false);
      return;
    }

    try {
      // エントリーの取得（ページネーション付き）
      let query = supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage - 1);

      if (searchEmail) {
        query = query.ilike('email', `%${searchEmail}%`);
      }

      const { data: entriesData, error: entriesError } = await query;

      if (entriesError) throw entriesError;

      setEntries(entriesData || []);

      // 統計情報の取得
      const { count: totalCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      const { count: recentCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // 興味の集計
      const { data: allEntries } = await supabase.from('waitlist').select('interests, source');
      
      const topInterests: { [key: string]: number } = {};
      const topSources: { [key: string]: number } = {};

      allEntries?.forEach((entry) => {
        entry.interests?.forEach((interest: string) => {
          topInterests[interest] = (topInterests[interest] || 0) + 1;
        });
        if (entry.source) {
          topSources[entry.source] = (topSources[entry.source] || 0) + 1;
        }
      });

      setStats({
        totalRegistrations: totalCount || 0,
        recentRegistrations: recentCount || 0,
        topInterests,
        topSources,
      });
    } catch (err) {
      console.error('Error fetching waitlist data:', err);
      setError('データの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const exportToCsv = () => {
    if (entries.length === 0) return;

    const headers = ['Email', 'Name', 'Interests', 'Source', 'Created At', 'IP', 'User Agent'];
    const csvContent = [
      headers.join(','),
      ...entries.map((entry) =>
        [
          entry.email,
          entry.name || '',
          entry.interests.join(';'),
          entry.source || '',
          entry.created_at,
          entry.metadata?.ip || '',
          entry.metadata?.user_agent || '',
        ]
          .map((field) => `"${field}"`)
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `waitlist-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP');
  };

  const getInterestLabel = (interest: string) => {
    const labels: { [key: string]: string } = {
      'robot-walk': 'ロボット犬との散歩',
      'ar-treasure': 'AR宝探し',
      'ai-nft': 'AI生成NFT',
      'enterprise': 'エンタープライズ',
    };
    return labels[interest] || interest;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">エラー</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ウェイトリスト管理</h1>
          <p className="text-gray-600 mt-2">DogeDiggerの早期アクセス登録者の管理画面</p>
        </div>

        {/* 統計カード */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">総登録者数</div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">直近7日の登録</div>
              <div className="text-2xl font-bold text-green-600">{stats.recentRegistrations}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">人気の機能</div>
              <div className="text-sm text-gray-900">
                {Object.entries(stats.topInterests)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 2)
                  .map(([interest, count]) => (
                    <div key={interest}>
                      {getInterestLabel(interest)}: {count}
                    </div>
                  ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm font-medium text-gray-500">流入元</div>
              <div className="text-sm text-gray-900">
                {Object.entries(stats.topSources)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 2)
                  .map(([source, count]) => (
                    <div key={source}>
                      {source}: {count}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 検索とエクスポート */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-lg">
                <input
                  type="email"
                  placeholder="メールアドレスで検索..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={exportToCsv}
                disabled={entries.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CSV出力
              </button>
            </div>
          </div>

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    メールアドレス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名前
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    興味のある機能
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    流入元
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    登録日時
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {entry.interests.map((interest) => (
                          <span
                            key={interest}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {getInterestLabel(interest)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.source || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(entry.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {entries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <p className="text-gray-500">
                {searchEmail ? '検索条件に一致する登録者が見つかりませんでした。' : 'まだ登録者がいません。'}
              </p>
            </div>
          )}
        </div>

        {/* ページネーション */}
        {entries.length === entriesPerPage && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前へ
              </button>
              <span className="px-4 py-2 text-gray-700">ページ {currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                次へ
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}