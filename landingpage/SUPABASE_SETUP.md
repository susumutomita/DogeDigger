# Supabase セットアップガイド

## 🚀 Supabaseプロジェクトの設定

### 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセス
2. 「Start your project」をクリック
3. 新しいプロジェクトを作成
4. プロジェクト名を「DogeDigger」に設定
5. データベースパスワードを設定（安全なパスワードを使用）
6. リージョンを選択（日本の場合は「Asia Pacific (Tokyo)」がおすすめ）

### 2. 環境変数の設定

プロジェクト作成後、以下の情報を取得：

1. **Settings** → **API** に移動
2. 以下の値をコピー：
   - `Project URL`
   - `anon public` key

`.env.local`ファイルに追加：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. データベーステーブルの作成

#### 方法1: SQL Editorを使用（推奨）

1. Supabaseダッシュボードで **SQL Editor** に移動
2. 「New query」をクリック
3. `supabase/setup_database.sql` の内容をコピー&ペースト
4. 「Run」をクリックして実行

#### 方法2: マイグレーションファイルを使用

```bash
# Supabase CLIをインストール（未インストールの場合）
npm install -g supabase

# Supabaseプロジェクトと連携
supabase link --project-ref your-project-id

# マイグレーションを実行
supabase db push
```

### 4. データベース構造の確認

セットアップ後、以下のテーブルが作成されます：

#### `waitlist` テーブル

| カラム名     | 型           | 説明                             |
| ------------ | ------------ | -------------------------------- |
| `id`         | BIGSERIAL    | 主キー（自動生成）               |
| `email`      | VARCHAR(255) | メールアドレス（ユニーク）       |
| `name`       | VARCHAR(255) | 名前（任意）                     |
| `interests`  | TEXT[]       | 興味のある機能の配列             |
| `source`     | VARCHAR(100) | 流入元                           |
| `metadata`   | JSONB        | メタデータ（IP、User Agentなど） |
| `created_at` | TIMESTAMP    | 作成日時                         |
| `updated_at` | TIMESTAMP    | 更新日時                         |

### 5. セキュリティ設定（RLS）

Row Level Security (RLS) が有効化され、以下のポリシーが設定されます：

- **匿名ユーザー**: 新規登録と統計情報取得のみ可能
- **認証ユーザー**: 全データへのアクセス可能（管理者用）

### 6. 動作確認

セットアップ完了後、以下で動作確認：

1. **ウェイトリスト登録**: メインページのフォームから登録テスト
2. **統計表示**: ページ下部の「○人が既に登録済み」が表示されることを確認
3. **管理画面**: `/admin/login` → `/admin/waitlist` でデータが表示されることを確認

### 7. トラブルシューティング

#### よくあるエラー

**404 Not Found エラー**

```
Request URL: https://xxx.supabase.co/rest/v1/waitlist
Status Code: 404 Not Found
```

**原因**: `waitlist`テーブルが作成されていない

**解決策**:

1. SQL Editorで`setup_database.sql`を実行
2. Table Editorで`waitlist`テーブルが存在することを確認

**RLS Policy エラー**

```
new row violates row-level security policy
```

**原因**: RLSポリシーの設定に問題がある

**解決策**:

1. SQL Editorで以下を実行:

```sql
-- ポリシーをリセット
DROP POLICY IF EXISTS "waitlist_anon_insert" ON public.waitlist;
-- setup_database.sql を再実行
```

### 8. 本番環境での注意事項

- **バックアップ**: 定期的なデータベースバックアップを設定
- **モニタリング**: Supabaseダッシュボードでアクセス状況を監視
- **スケーリング**: 必要に応じてプランをアップグレード
- **セキュリティ**: 定期的にアクセスログをチェック

### 9. サンプルデータ

セットアップスクリプトには以下のサンプルデータが含まれています：

```sql
INSERT INTO public.waitlist (email, name, interests, source) VALUES
    ('test@example.com', '田中太郎', ARRAY['robot-walk', 'ar-treasure'], 'twitter'),
    ('demo@dogedigger.com', '山田花子', ARRAY['ai-nft', 'enterprise'], 'search');
```

必要に応じて削除してください：

```sql
DELETE FROM public.waitlist WHERE email IN ('test@example.com', 'demo@dogedigger.com', 'early@access.com');
```
