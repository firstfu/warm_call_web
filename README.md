# 暖心來電 WarmCall

<div align="center">
  <h3>溫暖陪伴，一通電話的距離</h3>
  <p>A warm companion service providing emotional support through caring phone calls</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
</div>

## 📖 專案簡介 Project Overview

**暖心來電 (WarmCall)** 是一個提供情緒支持服務的網站平台。透過專業的陪伴者，為需要傾聽與關懷的人們提供溫暖的電話陪伴服務。無論是深夜失眠、情緒低落，或只是需要有人聊聊天，暖心來電都能提供即時的陪伴與支持。

WarmCall is a companion service platform that provides emotional support through professional phone conversations. Whether you're experiencing sleepless nights, feeling down, or simply need someone to talk to, WarmCall offers immediate companionship and support.

## ✨ 主要功能 Key Features

- 🌟 **24/7 全天候服務** - Round-the-clock availability for whenever you need support
- 💬 **專業陪伴者** - Trained companions who listen with empathy and care
- 🔒 **隱私保護** - Complete confidentiality and privacy protection
- 📱 **響應式設計** - Seamless experience across all devices
- 🎨 **溫暖視覺體驗** - Warm color palette and smooth animations for a comforting user experience
- ⚡ **快速載入** - Built with Next.js Turbopack for optimal performance

## 🚀 技術棧 Tech Stack

### 核心框架 Core Framework
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### 樣式與設計 Styling & Design
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Geist Font** - Modern typography from Vercel

### 開發工具 Development Tools
- **Turbopack** - Next.js's Rust-based bundler for faster builds
- **ESLint 9** - Code linting and quality checks
- **Hot Module Replacement** - Instant development feedback

## 🛠️ 快速開始 Getting Started

### 系統需求 Prerequisites

- Node.js 18.0 或更高版本
- npm, yarn, pnpm, 或 bun 套件管理器

### 安裝步驟 Installation

1. **複製專案 Clone the repository**
```bash
git clone https://github.com/your-username/warm_call_web.git
cd warm_call_web
```

2. **安裝依賴 Install dependencies**
```bash
npm install
# 或 or
yarn install
# 或 or
pnpm install
# 或 or
bun install
```

3. **啟動開發伺服器 Start development server**
```bash
npm run dev
```

開啟瀏覽器訪問 Open [http://localhost:3000](http://localhost:3000) to view the application.

### 可用指令 Available Scripts

| 指令 Command | 描述 Description |
|--------------|------------------|
| `npm run dev` | 啟動開發伺服器 (使用 Turbopack) Start development server with Turbopack |
| `npm run build` | 建立生產版本 Build for production |
| `npm run start` | 啟動生產伺服器 Start production server |
| `npm run lint` | 執行程式碼檢查 Run ESLint for code quality |

## 📁 專案結構 Project Structure

```
warm_call_web/
├── app/                      # Next.js App Router 目錄
│   ├── layout.tsx           # 根層級版面配置
│   ├── page.tsx             # 首頁元件 (client-side)
│   └── globals.css          # 全域樣式與 Tailwind 設定
├── public/                  # 靜態資源
├── components/              # React 元件 (若有)
├── lib/                     # 工具函式與共用邏輯 (若有)
├── CLAUDE.md               # AI 助手專案指南
├── next.config.ts          # Next.js 配置
├── tailwind.config.ts      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 專案依賴與腳本
```

## 🎨 設計系統 Design System

### 色彩配置 Color Palette

專案使用自訂的暖色系與紫色系配色：

- **暖色系 Warm Colors**: `warm-100` 到 `warm-600` (橘色調)
- **紫色系 Purple Colors**: `purple-100` 到 `purple-600`
- **深色模式支援 Dark Mode**: 自動適應系統偏好設定

### 動畫效果 Animations

- Intersection Observer 實現的滾動動畫
- 流暢的頁面過渡效果
- 脈動動畫提示活躍狀態

## 📱 頁面區塊 Page Sections

1. **Hero 區塊** - 引人注目的標題與行動呼籲
2. **問題陳述** - 說明服務解決的痛點
3. **功能介紹** - 詳細的服務特色
4. **使用流程** - 簡單的步驟說明
5. **使用場景** - 真實的應用案例
6. **用戶見證** - 客戶回饋與評價
7. **行動呼籲** - 引導用戶採取行動
8. **頁尾資訊** - 聯絡與其他資訊

## 🚀 部署 Deployment

### 建立生產版本 Build for Production

```bash
npm run build
```

### 本地測試生產版本 Test Production Build Locally

```bash
npm run start
```

### 部署選項 Deployment Options

#### Vercel (推薦 Recommended)
最簡單的部署方式是使用 [Vercel Platform](https://vercel.com/new)：

1. 將程式碼推送至 GitHub
2. 在 Vercel 導入您的儲存庫
3. Vercel 會自動偵測 Next.js 並進行最佳化部署

#### 其他平台 Other Platforms
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker 容器化部署

## 🤝 貢獻指南 Contributing

我們歡迎所有形式的貢獻！請遵循以下步驟：

1. Fork 此儲存庫
2. 建立您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 開發規範 Development Guidelines

- 遵循現有的程式碼風格
- 使用 TypeScript 進行類型安全開發
- 確保通過 ESLint 檢查
- 為新功能撰寫適當的註解
- 保持響應式設計原則

## 📞 聯絡資訊 Contact

如有任何問題或建議，歡迎聯繫我們：

- Email: support@warmcall.com
- Website: [https://warmcall.com](https://warmcall.com)
- GitHub Issues: [Report Issues](https://github.com/your-username/warm_call_web/issues)

## 📄 授權 License

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

---

<div align="center">
  <p>用心陪伴，讓世界更溫暖 💖</p>
  <p>Making the world warmer, one call at a time</p>
</div>