import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      totalRegistrations: count || 0,
    });
  } catch (error) {
    console.error('Waitlist stats error:', error);
    return NextResponse.json(
      { totalRegistrations: 0 },
      { status: 200 } // エラーでも0を返す
    );
  }
}
