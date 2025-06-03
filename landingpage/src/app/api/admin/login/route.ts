import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 環境変数から管理者認証情報を取得（本番環境では必ず設定すること）
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // 入力値検証
    if (!username || !password) {
      return NextResponse.json(
        { error: 'ユーザー名とパスワードを入力してください' },
        { status: 400 }
      );
    }

    // 認証チェック
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'ユーザー名またはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // JWTトークンを生成
    const token = jwt.sign(
      {
        username,
        isAdmin: true,
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      {
        expiresIn: '24h', // 24時間有効
      }
    );

    return NextResponse.json({
      success: true,
      token,
      message: 'ログインに成功しました',
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
