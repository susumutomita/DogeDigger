import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'トークンが提供されていません', valid: false },
        { status: 401 }
      );
    }

    // JWTトークンを検証
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if (!decoded.isAdmin) {
      return NextResponse.json(
        { error: '管理者権限がありません', valid: false },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        username: decoded.username,
        isAdmin: decoded.isAdmin,
      },
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { error: 'トークンの有効期限が切れています', valid: false },
        { status: 401 }
      );
    } else if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: '無効なトークンです', valid: false },
        { status: 401 }
      );
    }

    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました', valid: false },
      { status: 500 }
    );
  }
}