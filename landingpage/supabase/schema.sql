-- ウェイトリストテーブルの作成
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  interests TEXT[] NOT NULL,
  source TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- emailにインデックスを作成
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- created_atにインデックスを作成（統計用）
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- RLS (Row Level Security) を有効化
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 誰でも挿入できるポリシー
CREATE POLICY "Anyone can insert to waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- 誰でも自分のメールアドレスのレコードを更新できるポリシー
CREATE POLICY "Users can update own waitlist entry" ON waitlist
  FOR UPDATE USING (email = current_setting('request.jwt.claims')::json->>'email');

-- updated_atを自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_waitlist_updated_at 
  BEFORE UPDATE ON waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();