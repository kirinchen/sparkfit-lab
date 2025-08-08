# Tabata 運動計時器

一個功能完整的 Tabata 運動計時器應用程式，使用 React + Vite + TypeScript + React Bootstrap 建立。

## 🎯 完成的功能

### ✅ 主要功能
- **運動選擇頁面**: 使用 React Bootstrap Grid Layout 顯示運動總列表
- **運動清單管理**: 左側顯示「我的運動清單」，右側顯示「運動總列表」
- **運動詳情彈出視窗**: 點擊運動項目顯示詳細描述和火柴人動畫
- **訓練清單儲存**: 使用 localStorage 永久儲存訓練清單
- **運動計時器**: 完整的 Tabata 計時功能，支援運動/休息時間設定

### 🎨 UI/UX 特色
- **暗色系科技感設計**: 使用深色主題和青色強調色
- **響應式佈局**: 使用 React Bootstrap 實現響應式設計
- **CSS 動畫**: 純 CSS 實現的火柴人動畫，無需外部依賴
- **模組化元件**: 將功能拆分成獨立的 TypeScript 元件

### 📱 頁面結構
1. **主頁面 (建立您的專屬訓練計畫)**:
   - 左側: 我的運動清單 (WorkoutListView)
   - 右側: 運動總列表 (ActivityItemListView)
   - 運動詳情彈出視窗 (ExerciseModal)

2. **運動計時器頁面**:
   - 左側: 計時器顯示、當前運動動畫、控制按鈕
   - 右側: 設定面板、運動清單 (WorkoutTimerView)

## 🛠️ 技術棧

- **前端框架**: React 19.1.1
- **建置工具**: Vite 7.1.0
- **語言**: TypeScript 5.8.3
- **UI 框架**: React Bootstrap + Bootstrap 5
- **樣式**: Tailwind CSS + 自訂 CSS
- **動畫**: 純 CSS Keyframes
- **圖示**: Lucide React
- **狀態管理**: React Hooks

## 📁 專案結構

```
src/
├── components/
│   ├── ActivityItemListView.tsx    # 運動總列表元件
│   ├── WorkoutListView.tsx         # 運動清單管理元件
│   ├── ExerciseModal.tsx           # 運動詳情彈出視窗
│   └── WorkoutTimerView.tsx        # 運動計時器頁面
├── App.tsx                         # 主應用程式元件
├── App.css                         # 應用程式樣式 (包含動畫)
├── main.tsx                        # 應用程式入口
└── index.css                       # 全域樣式
```

## 🚀 安裝與運行

### 前置需求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## 🎮 使用說明

### 1. 選擇運動
- 在右側「運動總列表」瀏覽可用的運動
- 點擊運動卡片查看詳情和動畫
- 點擊「新增至訓練清單」將運動加入清單

### 2. 管理訓練清單
- 在左側「我的運動清單」查看已儲存的清單
- 點擊「新增清單」建立新的訓練清單
- 點擊「編輯」按鈕修改清單內容
- 點擊「刪除」按鈕移除清單

### 3. 開始訓練
- 點擊「開始運動」按鈕進入計時器頁面
- 設定運動時間和休息時間（預設：30秒運動，10秒休息）
- 點擊「開始」按鈕開始訓練
- 訓練會自動在運動和休息階段間切換

## 🎨 動畫類型

- `squat`: 深蹲動畫（身體上下移動）
- `jumpingJacks`: 開合跳動畫（手臂和腿部旋轉）
- `plank`: 棒式（靜止不動）
- `pushups`: 伏地挺身動畫（身體上下移動）
- `highKnees`: 高抬腿動畫（腿部交替抬起）
- `burpees`: 波比跳動畫（身體上下移動 + 縮放）

## 💾 資料儲存

應用程式使用 `localStorage` 儲存訓練清單，資料結構：

```typescript
interface SavedWorkout {
  id: number;
  name: string;
  exercises: Exercise[];
}
```

## 🔧 開發指南

### 新增運動
在 `App.tsx` 的 `exercisesData` 陣列中新增運動物件：

```typescript
{
  id: 7,
  name: '新運動名稱',
  description: '運動描述',
  animationType: 'newAnimation'
}
```

### 新增動畫
在 `App.css` 中新增 CSS keyframes 動畫：

```css
@keyframes newAnimation {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}

.animate-new-animation {
  animation: newAnimation 1s ease-in-out infinite;
}
```

## ✅ 完成的功能對照

- ✅ 使用 React Bootstrap 改善佈局
- ✅ 左側「我的運動清單」，右側「運動總列表」
- ✅ 運動總列表使用 Grid Layout
- ✅ 點擊運動項目彈出詳情視窗
- ✅ 火柴人動畫演示（純 CSS 實現）
- ✅ 勾選運動加入訓練清單
- ✅ 訓練清單儲存功能
- ✅ 訓練清單編輯/刪除功能
- ✅ 運動計時器頁面
- ✅ 運動時間和休息時間設定
- ✅ 右側運動清單列表
- ✅ 左側動畫和敘述
- ✅ localStorage 永久儲存
- ✅ 暗色系科技感 UI
- ✅ 模組化 TypeScript 元件

## 🎉 總結

這個 Tabata 運動計時器應用程式已經完全按照您的需求實現，包含了所有要求的功能和技術棧。應用程式使用 React Bootstrap 提供現代化的 UI 組件，採用模組化的 TypeScript 元件架構，並實現了完整的運動管理和計時功能。

現在您可以在瀏覽器中訪問 `http://localhost:5173` 來體驗這個完整的 Tabata 運動計時器應用程式！
