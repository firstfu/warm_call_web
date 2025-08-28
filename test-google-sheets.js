/**
 * Google Sheets 連接測試腳本
 * 使用方法：node test-google-sheets.js
 */

const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
require("dotenv").config({ path: ".env.local" });

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function testConnection() {
  console.log("🔍 開始測試 Google Sheets 連接...\n");

  // 步驟 1: 檢查環境變數
  console.log("📋 步驟 1: 檢查環境變數");
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Downloads";

  console.log("  ✓ 服務帳號 Email:", email ? `${email.substring(0, 20)}...` : "❌ 未設定");
  console.log("  ✓ 私鑰:", privateKey ? `已設定 (長度: ${privateKey.length})` : "❌ 未設定");
  console.log("  ✓ Sheet ID:", sheetId || "❌ 未設定");
  console.log("  ✓ Sheet 名稱:", sheetName);

  if (!email || !privateKey || !sheetId) {
    console.error("\n❌ 錯誤：缺少必要的環境變數！");
    console.log("請檢查 .env.local 檔案並確保所有變數都已正確設定。");
    process.exit(1);
  }

  // 步驟 2: 處理私鑰格式
  console.log("\n📋 步驟 2: 處理私鑰格式");
  let processedKey = privateKey;

  try {
    // 處理不同的私鑰格式
    if (processedKey.includes("\\n")) {
      processedKey = processedKey.replace(/\\n/g, "\n");
      console.log("  ✓ 轉換 \\n 為實際換行符");
    }

    if (!processedKey.includes("-----BEGIN")) {
      processedKey = `-----BEGIN PRIVATE KEY-----\n${processedKey}\n-----END PRIVATE KEY-----`;
      console.log("  ✓ 添加私鑰標頭和結尾");
    }

    processedKey = processedKey.replace(/^["']|["']$/g, "");
    console.log("  ✓ 移除多餘的引號");

    // 檢查私鑰格式
    if (!processedKey.includes("-----BEGIN PRIVATE KEY-----")) {
      throw new Error("私鑰格式不正確：缺少 BEGIN PRIVATE KEY 標記");
    }
    if (!processedKey.includes("-----END PRIVATE KEY-----")) {
      throw new Error("私鑰格式不正確：缺少 END PRIVATE KEY 標記");
    }

    console.log("  ✓ 私鑰格式檢查通過");
  } catch (error) {
    console.error(`\n❌ 私鑰處理錯誤：${error.message}`);
    console.log("\n提示：請確保私鑰格式正確。可以參考 .env.local.example 檔案中的範例。");
    process.exit(1);
  }

  // 步驟 3: 建立 JWT 認證
  console.log("\n📋 步驟 3: 建立 JWT 認證");
  let auth;

  try {
    auth = new JWT({
      email: email,
      key: processedKey,
      scopes: SCOPES,
    });
    console.log("  ✓ JWT 認證建立成功");
  } catch (error) {
    console.error(`\n❌ JWT 建立失敗：${error.message}`);
    console.log("\n提示：這通常是私鑰格式問題。請檢查：");
    console.log("  1. 私鑰是否完整（包含所有字符）");
    console.log("  2. 換行符是否正確");
    console.log("  3. 是否有多餘的空格或特殊字符");
    process.exit(1);
  }

  // 步驟 4: 連接 Google Sheets API
  console.log("\n📋 步驟 4: 連接 Google Sheets API");
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // 嘗試讀取試算表資訊
    const response = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    console.log("  ✓ 成功連接到 Google Sheets API");
    console.log(`  ✓ 試算表名稱：${response.data.properties.title}`);
    console.log(`  ✓ 工作表數量：${response.data.sheets.length}`);

    // 列出所有工作表
    console.log("  ✓ 工作表列表：");
    response.data.sheets.forEach(sheet => {
      console.log(`    - ${sheet.properties.title}`);
    });
  } catch (error) {
    console.error(`\n❌ 無法連接到 Google Sheets：${error.message}`);

    if (error.message.includes("403")) {
      console.log("\n提示：權限錯誤。請確保：");
      console.log("  1. 已經與服務帳號共享試算表");
      console.log("  2. 服務帳號有編輯權限");
      console.log(`  3. 共享的 Email：${email}`);
    } else if (error.message.includes("404")) {
      console.log("\n提示：找不到試算表。請確保：");
      console.log(`  1. Sheet ID 正確：${sheetId}`);
      console.log("  2. 從試算表 URL 複製正確的 ID");
    }
    process.exit(1);
  }

  // 步驟 5: 測試寫入資料
  console.log("\n📋 步驟 5: 測試寫入資料");

  try {
    const testData = [
      [
        new Date().toISOString(),
        "Test",
        "127.0.0.1",
        "Test User Agent",
        "Test Referrer",
        "Test Device",
        new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }),
      ],
    ];

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:G`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: testData,
      },
    });

    console.log("  ✓ 成功寫入測試資料");
    console.log(`  ✓ 更新範圍：${result.data.updates.updatedRange}`);
    console.log(`  ✓ 更新行數：${result.data.updates.updatedRows}`);
  } catch (error) {
    console.error(`\n❌ 無法寫入資料：${error.message}`);

    if (error.message.includes("Unable to parse range")) {
      console.log(`\n提示：找不到工作表 "${sheetName}"。請確保：`);
      console.log("  1. 工作表名稱正確（區分大小寫）");
      console.log("  2. 在環境變數中設定正確的 GOOGLE_SHEET_NAME");
    }
    process.exit(1);
  }

  console.log("\n✅ 所有測試通過！Google Sheets 整合設定正確。");
  console.log("你現在可以使用應用程式的下載追蹤功能了。");
}

// 執行測試
testConnection().catch(console.error);
