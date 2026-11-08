# zhun's portfolio | Web基本原理與技術 Lab 2

這是我為了「Web基本原理與技術 Lab 2」作業所建置的個人作品集網頁（Personal Page）。
本專案落實了**前端關注點分離（Separation of Concerns）**，將結構、樣式、資料與邏輯完全拆分，並透過非同步技術動態渲染網頁內容。

👉 **[點此觀看 Live Demo (GitHub Pages)](https://Zzhunnn.github.io/Personal_Page/)**

## 🛠 運用的核心技術 (Technologies Used)

本專案完全符合 Lab 2 的技術要求，涵蓋以下前端與版本控制技術：

*   **Git & GitHub**：使用 Git Bash 進行本地端版本控制，並部署至 GitHub Pages。
*   **HTML5**：使用語意化標籤（Semantic Elements，如 `<header>`, `<main>`, `<section>`, `<aside>`）建構網頁清晰骨架。
*   **CSS3**：
    *   獨立的 `style.css` 樣式表。
    *   使用 CSS 變數（`:root`）統一色彩管理。
    *   運用 Flexbox 與 Grid 進行版面配置。
    *   透過 Media Queries 實踐 RWD 響應式設計，完美適配手機與電腦螢幕。
*   **JSON**：將經歷、技能與專案作品的資料獨立抽離為 `data.json`，方便後續擴充與維護，不再將資料寫死於 HTML 中。
*   **jQuery**：利用 jQuery (v3.7.1) 大幅簡化 DOM 操作、事件綁定與動畫效果（如 `.fadeIn()`）。
*   **Ajax**：透過 `$.ajax()` 方法，以非同步（Asynchronous）的方式向伺服器/本地請求 `data.json` 資料，並動態將內容渲染至畫面上。

## 📁 專案檔案結構 (Project Structure)

```text
Personal_Page/
├── index.html       # 網頁主要進入點與結構骨架
├── style.css        # 全域與各區塊視覺樣式、RWD 設定
├── app.js           # jQuery 邏輯、Ajax 請求與動態渲染腳本
├── data.json        # 存放個人資訊、經歷與作品集的結構化資料檔
├── assets/          # 存放圖片與相關靜態資源
│   ├── handsome.png
└── README.md        # 專案說明文件
```

## 🚀 本地端執行方式 (Local Development)

由於本專案使用了 Ajax 去讀取本地的 `data.json`，受到瀏覽器安全性政策（CORS）的限制，直接雙擊 `index.html` 開啟將無法成功讀取資料。

若要在本地端測試運行，請依照以下步驟：
1. 使用 **Visual Studio Code (VS Code)** 開啟本專案資料夾。
2. 安裝 VS Code 擴充功能 **Live Server**。
3. 在 `index.html` 檔案上點擊右鍵，選擇 `Open with Live Server`。
4. 網頁將自動於瀏覽器開啟（網址為 `http://127.0.0.1:5500/...`），即可正常點擊按鈕並載入資料。

## 💡 功能亮點 (Features)

*   **Ajax 動態載入資料**：按下按鈕後，平滑載入並渲染 JSON 格式的履歷與專案資料。
*   **動態標籤雲**：根據資料權重動態計算並賦予 CSS 樣式（字體大小、顏色深淺）。
*   **Lightbox 圖片燈箱**：點擊專案圖片或大頭貼，即可在當前頁面放大檢視原始圖片。
*   **無障礙與體驗優化**：包含 Focus 狀態提示、鍵盤操作支援（Enter / Space 觸發按鈕與連結），以及支援 `prefers-reduced-motion`（減少動畫）。