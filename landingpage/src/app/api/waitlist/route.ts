import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { addToGoogleSheets, isGoogleSheetsConfigured } from '@/lib/googlesheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, interests, source } = body;

    // バリデーション
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    if (!interests || interests.length === 0) {
      return NextResponse.json({ error: '少なくとも1つの興味を選択してください' }, { status: 400 });
    }

    // メタデータの収集
    const metadata = {
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
      referrer: request.headers.get('referer') || 'direct',
    };

    // Google Sheetsが設定されている場合はそちらを使用
    if (isGoogleSheetsConfigured) {
      try {
        const result = await addToGoogleSheets({
          email,
          name,
          interests,
          source,
          metadata,
        });
        
        return NextResponse.json(result);
      } catch (error) {
        console.error('Google Sheets error:', error);
        // Google Sheetsでエラーが発生した場合、Supabaseにフォールバック
      }
    }

    // Supabaseが設定されている場合はそちらを使用
    if (isSupabaseConfigured && supabase) {
      // 既存のメールアドレスをチェック
      const { data: existingEntry } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', email)
        .single();

      if (existingEntry) {
        // 既存のエントリーを更新
        const { error } = await supabase
          .from('waitlist')
          .update({
            name,
            interests,
            source,
            metadata,
            updated_at: new Date().toISOString(),
          })
          .eq('email', email);

        if (error) throw error;

        return NextResponse.json({
          success: true,
          message: '情報を更新しました',
          isUpdate: true,
        });
      } else {
        // 新規エントリーを作成
        const { error } = await supabase.from('waitlist').insert({
          email,
          name,
          interests,
          source,
          metadata,
        });

        if (error) throw error;

        // TODO: ウェルカムメールの送信
        // await sendWelcomeEmail(email, name);

        return NextResponse.json({
          success: true,
          message: 'ウェイトリストに登録されました！',
          isUpdate: false,
        });
      }
    }

    // どちらも設定されていない場合はモックレスポンスを返す
    console.warn('Neither Google Sheets nor Supabase configured, returning mock response');
    return NextResponse.json({
      success: true,
      message: 'ウェイトリストに登録されました！（デモモード）',
      isUpdate: false,
    });
  } catch (error) {
    console.error('Waitlist registration error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
}

// 統計情報を取得
export async function GET() {
  try {
    // Google Sheetsが設定されている場合はそちらを使用
    if (isGoogleSheetsConfigured) {
      const { getRegistrationCount } = await import('@/lib/googlesheets');
      const count = await getRegistrationCount();
      return NextResponse.json({
        totalRegistrations: count,
      });
    }

    // Supabaseが設定されている場合はそちらを使用
    if (isSupabaseConfigured && supabase) {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      return NextResponse.json({
        totalRegistrations: count || 0,
      });
    }

    // どちらも設定されていない場合はモック値を返す
    return NextResponse.json({
      totalRegistrations: 42, // 控えめなデモ用の値
    });
  } catch (error) {
    console.error('Waitlist stats error:', error);
    return NextResponse.json(
      { totalRegistrations: 42 }, // エラー時もデモ値を返す
      { status: 200 }
    );
  }
}
