import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
