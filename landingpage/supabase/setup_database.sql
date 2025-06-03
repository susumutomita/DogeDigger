-- DogeDigger ウェイトリストデータベースセットアップ
-- このスクリプトをSupabase SQL Editorで実行してください

-- 1. ウェイトリストテーブルの作成
CREATE TABLE IF NOT EXISTS public.waitlist (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    interests TEXT[] NOT NULL DEFAULT '{}',
    source VARCHAR(100),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. インデックスの作成（パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_interests ON public.waitlist USING GIN(interests);

-- 3. RLS (Row Level Security) の有効化
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 4. ポリシーの作成

-- 匿名ユーザー（ウェブサイト訪問者）の権限
-- 新規登録（INSERT）のみ許可
CREATE POLICY "waitlist_anon_insert" ON public.waitlist
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- 統計情報取得用（集計関数のみ）
-- 注意: この設定では直接的なSELECTは不可、rpc関数経由でのみアクセス可能

-- 認証されたユーザー（管理者）の権限
-- 全操作を許可
CREATE POLICY "waitlist_authenticated_all" ON public.waitlist
    FOR ALL 
    TO authenticated 
    USING (true);

-- 5. updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON public.waitlist 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_column();

-- 6. サンプルデータの挿入（オプション）
INSERT INTO public.waitlist (email, name, interests, source, metadata) VALUES 
    ('test@example.com', '田中太郎', ARRAY['robot-walk', 'ar-treasure'], 'twitter', '{"ip": "127.0.0.1", "user_agent": "Mozilla/5.0"}'),
    ('demo@dogedigger.com', '山田花子', ARRAY['ai-nft', 'enterprise'], 'search', '{"ip": "127.0.0.1", "user_agent": "Mozilla/5.0"}'),
    ('early@access.com', '佐藤次郎', ARRAY['robot-walk', 'ai-nft'], 'friend', '{"ip": "127.0.0.1", "user_agent": "Mozilla/5.0"}')
ON CONFLICT (email) DO NOTHING;

-- 7. 統計情報取得用の関数（匿名ユーザーでもカウントを取得可能）
CREATE OR REPLACE FUNCTION get_waitlist_stats()
RETURNS JSON AS $$
DECLARE
    total_count INTEGER;
    recent_count INTEGER;
BEGIN
    -- 総登録者数
    SELECT COUNT(*) INTO total_count FROM public.waitlist;
    
    -- 直近7日の登録者数
    SELECT COUNT(*) INTO recent_count 
    FROM public.waitlist 
    WHERE created_at >= NOW() - INTERVAL '7 days';
    
    RETURN json_build_object(
        'totalRegistrations', total_count,
        'recentRegistrations', recent_count
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 匿名ユーザーに関数の実行権限を付与
GRANT EXECUTE ON FUNCTION get_waitlist_stats() TO anon;
GRANT EXECUTE ON FUNCTION get_waitlist_stats() TO authenticated;

-- セットアップ完了の確認
SELECT 
    'ウェイトリストテーブルが正常に作成されました' as message,
    COUNT(*) as sample_entries
FROM public.waitlist;