-- ウェイトリストテーブルの作成
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

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_interests ON public.waitlist USING GIN(interests);

-- RLS (Row Level Security) の設定
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーには挿入と統計取得のみ許可
CREATE POLICY "Allow anonymous insert" ON public.waitlist
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

CREATE POLICY "Allow anonymous count" ON public.waitlist
    FOR SELECT 
    TO anon 
    USING (false); -- カウントのみ、実際のデータは見れない

-- 認証されたユーザー（管理者）には全操作を許可
CREATE POLICY "Allow authenticated users full access" ON public.waitlist
    FOR ALL 
    TO authenticated 
    USING (true);

-- updated_at を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- トリガーの作成
CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON public.waitlist 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_column();