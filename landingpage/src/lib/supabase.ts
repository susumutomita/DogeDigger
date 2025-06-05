import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 実際の環境変数が設定されているかチェック
const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://') &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('.supabase.co');

// Supabaseクライアントを条件付きで作成
let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    supabase = null;
  }
}

export { supabase, isSupabaseConfigured };

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
