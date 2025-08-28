# Google Sheets 下載追蹤設定指南

## 概述

本指南將協助您設定 Google Sheets 整合，以追蹤來自您著陸頁的應用程式下載。

## 前置需求

- 一個 Google 帳號
- Google Cloud Console 的存取權限
- 一個用於儲存追蹤資料的 Google Sheets 文件

## 設定步驟

### 1. 建立 Google Cloud 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com)
2. 建立新專案或選擇現有專案
3. 記下您的專案 ID

### 2. 啟用 Google Sheets API

1. 在 Google Cloud Console 中，前往「APIs & Services」>「Library」
2. 搜尋「Google Sheets API」
3. 點擊並按下「啟用」

### 3. 建立服務帳號

1. 前往「APIs & Services」>「Credentials」
2. 點擊「Create Credentials」>「Service Account」
3. 填寫服務帳號詳細資料：
   - 服務帳號名稱：`warmcall-sheets-writer`
   - 服務帳號 ID：（自動生成）
   - 描述：「用於將下載追蹤資料寫入 Google Sheets 的服務帳號」
4. 點擊「Create and Continue」
5. 跳過選擇性步驟並點擊「Done」

### 4. 生成服務帳號金鑰

1. 在憑證頁面，點擊您新建立的服務帳號
2. 前往「Keys」標籤
3. 點擊「Add Key」>「Create new key」
4. 選擇「JSON」格式
5. 點擊「Create」- 將下載一個 JSON 檔案

### 5. 建立並配置 Google Sheet

1. 建立新的 Google Sheet 或開啟現有的
2. 將第一個工作表重新命名為「Downloads」（或您偏好的名稱）
3. 在第一行新增標題：
   - A1：`時間戳記`
   - B1：`平台`
   - C1：`IP 位址`
   - D1：`用戶代理`
   - E1：`來源`
   - F1：`裝置類型`
   - G1：`本地時間`

### 6. 與服務帳號分享工作表

1. 從下載的 JSON 檔案中複製服務帳號電子郵件（尋找「client_email」）
2. 在您的 Google Sheet 中，點擊「共用」按鈕
3. 貼上服務帳號電子郵件
4. 設定權限為「編輯者」
5. 取消勾選「通知使用者」
6. 點擊「共用」

### 7. 配置環境變數

1. 開啟專案中的 `.env.local` 檔案
2. 更新為您的實際值：

```env
# 從下載的 JSON 檔案
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# 從您的 Google Sheet URL
# 範例 URL：https://docs.google.com/spreadsheets/d/1abc123def456/edit
GOOGLE_SHEET_ID=1abc123def456

# 工作表標籤名稱（預設：Downloads）
GOOGLE_SHEET_NAME=Downloads
```

### 8. 測試整合

1. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
2. 開啟瀏覽器的開發者控制台（F12）
3. 點擊任一下載按鈕
4. 檢查控制台的成功訊息
5. 檢查您的 Google Sheet 是否有新條目

## 疑難排解

### 常見問題

1. **「Google API 憑證未配置」**

   - 確保 `.env.local` 檔案存在並包含正確的憑證
   - 新增環境變數後重啟開發伺服器

2. **「呼叫者沒有權限」**

   - 確認您已與服務帳號電子郵件分享 Google Sheet
   - 確認服務帳號具有「編輯者」權限

3. **「Invalid grant」**

   - 檢查 `.env.local` 中的私鑰是否有正確的換行符
   - 私鑰應該有實際的換行，而不是 `\n` 字串

4. **工作表中沒有資料出現**
   - 檢查瀏覽器控制台是否有錯誤
   - 確認 Sheet ID 和 Sheet Name 完全符合
   - 確保在您的專案中已啟用 Google Sheets API

## 安全性考量

1. **絕對不要將 `.env.local` 提交到版本控制**

   - 如果還沒有，將 `.env.local` 新增到 `.gitignore`

2. **生產環境部署**

   - 在您的託管平台（Vercel、Netlify 等）設定環境變數
   - 使用環境變數秘密管理

3. **速率限制**
   - 考慮實施速率限制以防止濫用
   - 在 Google Cloud Console 中監控 API 使用情況

## 額外功能

您可以擴展此追蹤系統以包含：

- 基於 IP 的地理位置
- 使用 UTM 參數的活動追蹤
- 會話持續時間追蹤
- 轉換漏斗分析
- A/B 測試指標

## API 端點

追蹤 API 可在以下位置使用：

```
POST /api/track-download
```

請求主體：

```json
{
  "platform": "ios" | "android"
}
```

回應：

```json
{
  "success": true,
  "message": "下載追蹤成功",
  "data": {
    "platform": "ios",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "deviceType": "iPhone"
  }
}
```
