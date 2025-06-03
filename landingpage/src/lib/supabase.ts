import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// 実際の環境変数が設定されているかチェック
const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('placeholder');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { isSupabaseConfigured };

// ウェイトリストのデータ型
export interface WaitlistEntry {
  id?: string;
  email: string;
  name?: string;
  interests: string[];
  source?: string;
  created_at?: string;
  metadata?: {
    ip?: string;
    user_agent?: string;
    referrer?: string;
  };
}
