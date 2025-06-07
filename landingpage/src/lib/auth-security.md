# 認証トークンのセキュリティベストプラクティス

## 現在の問題

- admin_tokenがlocalStorageに保存されている
- XSS攻撃に対して脆弱

## 推奨される実装

### 1. httpOnly Cookieを使用

```typescript
// API Route (例: /api/admin/login)
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  // ... 認証処理 ...

  // httpOnly cookieにトークンを保存
  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7日間
    path: '/',
  });
}
```

### 2. セッション管理の改善

```typescript
// サーバーサイドでのセッション検証
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function verifyAuth() {
  const token = cookies().get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch {
    return null;
  }
}
```

### 3. CSRFトークンの実装

```typescript
// CSRF保護
import crypto from 'crypto';

export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}
```

## セキュリティチェックリスト

- [ ] localStorageからsensitiveデータを削除
- [ ] httpOnly cookieを使用
- [ ] secure フラグを本番環境で有効化
- [ ] sameSite属性を設定
- [ ] トークンの有効期限を設定
- [ ] CSRF保護を実装
- [ ] 定期的なトークンローテーション
