# Google Sheets Waitlist Setup Guide

このガイドでは、DogeDiggerのウェイトリスト機能をGoogle Sheetsと連携させる方法を説明します。

## なぜGoogle Sheetsを使うのか？

- **無料**: Google Sheetsは無料で使用できます
- **簡単**: データベースの設定が不要です
- **アクセシブル**: どこからでもデータを確認できます
- **共有可能**: チームメンバーとデータを簡単に共有できます

## セットアップ手順

### 1. Google Sheetの作成

1. [Google Sheets](https://sheets.google.com)にアクセス
2. 新しいスプレッドシートを作成
3. シートの名前を「DogeDigger Waitlist」などに変更
4. 1行目に以下のヘッダーを追加：
   - A1: `Email`
   - B1: `Name`
   - C1: `Interests`
   - D1: `Source`
   - E1: `Timestamp`
   - F1: `IP`
   - G1: `User Agent`
   - H1: `Referrer`

### 2. Google Apps Scriptの設定

1. スプレッドシートのメニューから「拡張機能」→「Apps Script」を選択
2. 表示されたエディタの既存のコードをすべて削除
3. `/scripts/google-apps-script.js`の内容をコピーして貼り付け
4. ファイルを保存（Ctrl+S または Cmd+S）

### 3. Web Appとしてデプロイ

1. Apps Scriptエディタで「デプロイ」→「新しいデプロイ」をクリック
2. 歯車アイコンをクリックし、「ウェブアプリ」を選択
3. 以下の設定を行う：
   - **説明**: 任意（例：「DogeDigger Waitlist API v1」）
   - **次のユーザーとして実行**: 自分
   - **アクセスできるユーザー**: 全員
4. 「デプロイ」をクリック
5. 初回は権限の承認が必要です：
   - 「アクセスを承認」をクリック
   - Googleアカウントを選択
   - 「詳細」をクリック→「DogeDigger Waitlist API（安全ではないページ）に移動」をクリック
   - 「許可」をクリック
6. 表示されたWeb App URLをコピー

### 4. 環境変数の設定

1. プロジェクトの`landingpage/.env.local`ファイルを作成または編集
2. 以下の行を追加：
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec
   ```
   ※ `[YOUR_SCRIPT_ID]`を実際のURLに置き換えてください

### 5. 動作確認

1. 開発サーバーを起動：
   ```bash
   npm run dev
   ```
2. ブラウザで http://localhost:3000 にアクセス
3. ウェイトリストフォームに入力して送信
4. Google Sheetに新しい行が追加されることを確認

## トラブルシューティング

### エラー: "サーバーエラーが発生しました"

1. Google Apps ScriptのURLが正しく設定されているか確認
2. Apps Scriptが正しくデプロイされているか確認
3. Google Sheetのヘッダーが正しく設定されているか確認

### データが保存されない

1. Google Sheetの権限設定を確認（編集権限が必要）
2. Apps Scriptの実行権限が「自分」になっているか確認
3. アクセス権限が「全員」になっているか確認

### CORS エラー

Google Apps ScriptのWeb Appは自動的にCORSを処理するため、通常このエラーは発生しません。
発生した場合は、URLが正しいか確認してください。

## 高度な設定

### メール通知の追加

Google Apps Scriptに以下のコードを追加することで、新規登録時にメール通知を受け取れます：

```javascript
function sendNotificationEmail(entry) {
  const recipient = 'your-email@example.com'; // 通知を受け取るメールアドレス
  const subject = '新しいウェイトリスト登録';
  const body = `
    新しい登録がありました：
    
    メール: ${entry.email}
    名前: ${entry.name || '未入力'}
    興味: ${entry.interests.join(', ')}
    ソース: ${entry.source || '未入力'}
    登録日時: ${entry.timestamp}
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
```

### データの自動バックアップ

定期的にデータをバックアップする場合は、Google Apps Scriptのトリガー機能を使用できます。

## セキュリティに関する注意事項

- Google Apps ScriptのURLは公開されるため、機密情報は含めないでください
- 必要に応じて、リクエストに認証トークンを追加することもできます
- 定期的にデータをバックアップすることをお勧めします

## サポート

問題が発生した場合は、以下をお試しください：

1. [Google Apps Script ドキュメント](https://developers.google.com/apps-script)を参照
2. プロジェクトのIssueを作成
3. コミュニティフォーラムで質問