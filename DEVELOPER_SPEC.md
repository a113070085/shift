# 【校園智慧穿搭顧問】開發者執行與產品規格書（Developer Technical Specification & Product Requirements Document）

本規格書由資深產品經理與技術架構師聯合編制，旨在將「第八組 穿搭 PRD 與 MRD」的核心業務價值與產品願景，轉化為開發小組可迅速落實、部署與單元測試之標準技術規格。

---

## 零、 系統架構總覽 (System Architecture Overview)

本系統採模組化與微服務模式設計，以**極簡一鍵入庫**與**情境化動態推薦**為核心要素。

```
              ┌──────────────────────────────────────────────┐
              │                校園智慧穿搭顧問               │
              │                 (前端 React SPA)             │
              └──────┬──────────────────────┬────────────────┘
                     │                      │
                     ▼                      ▼
        ┌────────────────────────┐  ┌────────────────────────┐
        │   AI 去背與電商導入服務   │  │   智慧情境推薦引擎服務   │
        └────────────┬───────────┘  └────────────┬───────────┘
                     │                           │
  ┌──────────────────┴──────────────────┐ ┌──────┴──────────────────┐
  │ 1. 圖片上傳 / Canvas 本地去背 (WASM)│ │ 1. 氣象局 API (CWA) 同步│
  │ 2. 電商網購紀錄 / 電子發票 Crawler │ │ 2. 課表行事曆 (iCal) 提取│
  │ 3. 類別自動標籤化與 RGB 顏色分析     │ │ 3. 膠囊衣櫥缺口演算法    │
  └─────────────────────────────────────┘ └─────────────────────────┘
```

---

## 一、 AI 推薦引擎邏輯 (System Logic)

### 1.1 「在地氣象 API」與「個人課表」連動之穿搭篩選演算法 (Weather & Timetable Engine)

#### **技術開發端 (API/演算法)**
1. **輸入資料模型 (Inputs)**：
   * **Location Data**：用戶授權之 GPS 經緯度座標，調用逆地理編碼（Reverse Geocoding）轉換為台灣二級行政區代碼（如：`台北市文山區`）。
   * **Weather Data**：介接**中央氣象署（CWA）Open Data API（F-C0032-001）**。提取當前時段及未來 12 小時的「溫差 (MinT/MaxT)」、「體感溫度 (Apparent Temp)」、「降雨機率 (PoP12h)」與「平均風速 (WS)」。
   * **Schedule Data**：串接大學學術系統或 Google Calendar（iCal 格式解析），提取當期課表資料結構：
     ```json
     {
       "course_id": "CS101",
       "course_name": "大一體育-羽球",
       "start_time": "2026-06-04T08:10:00Z",
       "end_time": "2026-06-04T10:00:00Z",
       "attributes": {
         "is_presentation": false,
         "is_physical_education": true
       }
     }
     ```

2. **核心過濾算法與規則矩陣 (Filter Rules Matrix)**：
   * **體育課過濾閥 (PE Course Sieve)**：
     * *觸發條件*：當 `course_name` 包含 `["體育", "運動", "游泳", "羽球", "網球", "健身"]` 或 `attributes.is_physical_education == true`。
     * *排除庫存標籤*：`["裙裝", "窄裙", "丹寧牛仔緊身褲", "高跟鞋", "西裝褲", "皮鞋", "襯衫", "羊毛大衣"]`。
     * *強制保留標籤*：`["排汗", "高彈性", "運動鞋", "短褲", "棉褲", "T-shirt"]`。
   * **商管/報告日精準閥 (Presentation Sieve)**：
     * *觸發條件*：當 `course_name` 包含 `["報告", "專題", "簡報", "口試", "面試"]` 或 `attributes.is_presentation == true`。
     * *排除庫存標籤*：`["拖鞋", "吊帶短褲", "破洞牛仔褲", "衛衣", "運動棉褲"]`。
     * *優先推薦標籤*：`["襯衫", "西裝外套", "西裝褲", "深色長褲", "皮鞋", "樂福鞋", "針織衫"]`。
   * **機車騎乘通勤友善算法 (Motorcycle Rider-Friendly Algorithm)**：
     * *開啟條件*：用戶開啟「機車通勤」Profile 偏好，且當前或目的地「降雨機率 ≥ 30%」或「氣溫 < 18°C」或「風速 > 5 m/s」。
     * *安全性安全過濾*：
       * 排除 `["長裙", "長版大衣", "寬褲管裙"]`（預防衣物捲入車輪或被排氣管燙損得致公安事件）。
       * 當氣溫低於 20°C 時，強制在推薦穿搭中插入「外套 / 防風 / 防潑水」權重 +50% 的單品。
   * **綜合氣溫指數搭配邏輯**：
     * 採黃金三合一體感溫度分級：
       * **極冷 (<15°C)**：保暖大衣/羽絨外套 + 發熱內搭 + 長褲/毛料褲 (權重：重度防寒)。
       * **適中 (15°C - 23°C)**：薄外套/風衣/衛衣 + 牛仔褲/長褲 (權重：洋蔥式穿搭)。
       * **炎熱 (>23°C)**：短袖/無袖 + 短褲/薄長短裙 (權重：高通透、吸汗)。

#### **產品功能端 (Features)**
* **30秒出門自動導航 UI**：首頁最上端根據目前地理位置天气与第一堂課特徵，直接顯示 **"AI 推薦今日 3 套最速方案"**。
* **機車通勤開關**：智慧首頁提供一鍵切換「騎士模式」，推薦卡片會切換顯示「防風係數」與「防滾捲/安心行進」的安全穿搭分數。

---

### 1.2 AI 自動去背與電商數據一鍵導入技術流程 (Automated Asset Onboarding)

#### **技術開發端 (API/演算法)**
1. **AI 本地端高速去背流程 (Edge-based Background Removal API)**：
   * 為最大化保障用戶私密空間隱私（PRD 節 5.1 指示），本系統採用 **Transformer WebONNX (Web Assembly)**。
   * **模型**：使用 Slim-RVM (Robust Video Matting) 或 MobileNetV3-Segmenter。
   * **流程圖**：
     ```
     用戶選取照片 ➔ Canvas 繪製 ➔ WASM 模型推理 (零記憶體殘留、不回傳雲端) ➔ 產出透明背景 PNG ➔ 寫入 indexDB。
     ```

2. **電商數據抓取暨自動入庫 API 規格 (E-commerce Data Parser)**：
   * **支援渠道**：台灣大學生常消電商：1. 蝦皮購物 (Shopee)、2. PAZZO。
   * **一鍵解析 API**：提供 POST 端點 `/api/import/ecommerce-url`：
     ```json
     // 範例語法
     {
       "product_url": "https://pazzo.com.tw/products/detail/1020492"
     }
     ```
     * **解析規則**：
       * 利用後端 Puppeteer / Cheerio 對極簡網購 HTML 進行商品主圖（Product Hero Image）與規格規格屬性抓取。
       * 串接 **Google Gemini AI 推薦 API**（利用 `@google/genai` 中的 `gemini-2.5-flash`），將商品的標題、顏色、材質、版型等 Meta-text 做結構化整理。
       * **Gemini Prompt 設定**：
         > "你是一位精通台灣服裝分類與屬性標記的 AI 助理。請解析以下商品標題與描述，並輸出嚴格的 JSON 屬性格式：包括類別、適用季節、顏色（精準Hex碼及中文名）、風格描述。商品文字：'PAZZO 簡約百搭寬鬆直筒西裝長褲'。輸出規範: {category: string, season: string[], primary_color: {name: string, hex: string}}"

#### **產品功能端 (Features)**
* **極低門檻免拍入庫**：
  * **上傳預覽去背儀**：用戶拍照後，UI 高速展示毛玻璃風格與去背切換線，點擊確認直接存入庫。
  * **電商一鍵轉錄**：在數位衣櫥點擊「貼連結入庫」，貼上網購連結後系統自動拉取 PAZZO / 蝦皮商品資訊，2 秒完成貼標归類，完全解決建檔疲勞。

---

## 二、 商業變現與資產活化 (Business Model)

### 2.1 風格缺口分析儀與膠囊衣櫥導購邏輯 (Style Gap & Capsule Wardrobe Sales Funnel)

#### **技術開發端 (API/演算法)**
1. **膠囊衣櫥（Capsule Wardrobe）黃金比例公式**：
   * 膠囊衣櫥標準係數應符合：**上身 (Tops: 40%)、下身 (Bottoms: 30%)、外套/罩衫 (Outerwear: 20%)、鞋類及配件 (Footwear/Accessories: 10%)**。
2. **缺口值計算演算法 (Gap Index Calculation)**：
   ```typescript
   // 缺口權重評估公式 (範例)
   function evaluateStyleGap(inventory: WardrobeItem[]) {
     const total = inventory.length;
     const counts = groupBy(inventory, 'category'); // Tops, Bottoms, Outerwear...
     
     const topRatio = counts.Tops / total;
     const gapList = [];
     
     if (topRatio > 0.6) {
       gapList.push({
         missing_category: "Bottoms",
         severity: "High",
         reason: "你的上身單品比例過高 (已達 60%+)。根據膠囊衣櫥法則，您目前急缺百搭下身（如：深色長褲或A字裙）以重組出 15+ 套以上的變化組合。"
       });
     }
     // ...以此類推
     return gapList;
   }
   ```
3. **導購連結生成 (Affiliate Commission Engine)**：
   * 當演算法定位到用戶急缺單品（如 `深色直筒西裝褲` 且色調庫存 0）時，調用「廠商合作商品庫 API」（合作商：蝦皮分潤生態、PAZZO）。
   * 後端自動對推薦單品之跳轉 URL 添加聯盟行銷分潤參數 `?aff_id=campus_ootd_group8`，創造 **5% 導購佣金收益**（MRD 獲利模式規劃）。

#### **產品功能端 (Features)**
* **數位衣櫥風格雷達圖 (Style Radar Charter)**：以多維度 Recharts 雷達圖展現用戶衣櫥的色彩飽和度、風格飽和度、穿戴分佈。
* **「風格缺口」診斷書卡片**：直接秀出 **"衣櫃警報：深色長褲缺口！"**，下方直接卡片式展示專屬導購單品與專屬全台大學生 9 折折扣碼。

---

### 2.2 校園二手轉賣自動化觸發機制 (Unworn Asset Resale Loop)

#### **技術開發端 (API/演算法)**
1. **閒置閾值監控 (Idle Detector)**：
   * 系統對每件衣物數據行中皆存入：`last_worn_date` (上次穿搭時間) 與 `total_worn_count` (累計穿著次數)。
   * *系統常駐任務 (Cron Job / Local Filter)*：偵測 `last_worn_date` 超過 180 天 (約 6 個月，涵蓋一整個換季週期) 之服飾單品。
2. **殘餘折舊價值動態估算公式 (Depreciation & Value Estimation API)**：
   * **公式 (Formula)**:
     $$\text{Estimated Value} = \text{Original Price} \times \text{Condition Factor} \times (1 - \text{Age Factor})$$
     * `Condition Factor` (衣物完好度) 預設為：全新帶吊牌 (0.8)、極新 (0.65)、微著痕跡 (0.45)。
     * 系統自動比對二手專區同款/同類品牌（如 UNIQLO, PAZZO, GAP）之常規二手成交中位數。
3. **一鍵發布 API (One-click Marketplace Post API)**：
   * 調用世新大學等特定校區 **「校園二手廣場專區 REST API」**。將去背商品、估算原價/轉賣價、尺寸、材質直接發布至校內市集。

#### **產品功能端 (Features)**
* **衣物深海救援通知（救活或變現）**：
  * 首頁定時推送：**「這件 GAP 經典連帽衛衣在衣櫥最底層睡了 195 天囉！再不穿可能變古董了。要不要一鍵上架世新二手廣場變現 $350？」**
  * **一鍵轉售彈窗**：在二手視窗中，直接秀出產品大圖、推薦定價（可拖曳滑桿自由調整）、以及 **「一鍵上架，校內面交免運費」** 按鈕。

---

## 三、 App 頁面結構 (UI/UX Hierarchy)

### UI/UX 路由結構與頁面組件規格 (Route & Navigation Blueprint)

```json
{
  "app_root": {
    "theme": "極簡時尚冷灰 (High-Contrast Modern Slate Line)",
    "tabs": [
      {
        "tab_id": "home_tab",
        "label": "智慧首頁 (OOTD Home)",
        "components": {
          "weather_timetable_banner": "上方即時台灣氣象局連動 + 大學課表同步動態狀態欄",
          "rider_commute_switch": "騎車/走路通勤一鍵安全模式切換開關",
          "ai_today_recommendations": "中央顯示 3 套極速 AI 穿搭推薦卡片（支援一鍵採納採集計入北極星指標）",
          "shortcut_action_group": "快速拍照去背建檔/貼網址導入按鈕"
        }
      },
      {
        "tab_id": "wardrobe_tab",
        "label": "數位衣櫥 (Digital Wardrobe)",
        "components": {
          "category_pills": "【類別切換：上衣、下身、外套、鞋履、配件】",
          "seasonal_filters": "【季節過濾：春夏、秋冬、四季】",
          "import_wizard": {
            "upload_section": "拖拉上傳/拍照 ➔ 即時 2D 畫布去背動畫處理",
            "link_importer": "PAZZO / 蝦皮商品 URL 一鍵結構化貼標導入"
          },
          "clothing_bento_grid": "穿戴頻率彩色小標（例：‘182天未穿’、‘最常穿著Top 1’）"
        }
      },
      {
        "tab_id": "analysis_tab",
        "label": "風格診斷報告 (Style Gap Radar)",
        "components": {
          "radar_chart": "Recharts 多維衣櫥飽和度雷達 (Capsule Ratio Indicator)",
          "style_composition": "膠囊衣櫥黃金百分比柱狀圖 (上衣40% : 下褲30%)",
          "gap_alert_card": "風格缺口警報看板 (定位欠缺的百搭基本款)",
          "affiliate_showcase": "客製化高匹配度台灣網購通路導購分潤卡片"
        }
      },
      {
        "tab_id": "marketplace_tab",
        "label": "校園二手廣場 (Campus Bazaar)",
        "components": {
          "idle_awaken_carousel": "『半年未穿閒置專案』一鍵解脫折舊估值轉賣功能區",
          "marketplace_feed": "校內市集動態牆 (限定相同大學，如世新大學，支援無摩擦校區面交)",
          "chat_bidding_system": "買賣兩端一鍵快捷議價與交換聯絡資訊"
        }
      },
      {
        "tab_id": "pro_subscription_tab",
        "label": "個人 Pro 版設定 (Pro & Settings)",
        "components": {
          "pricing_comparison_tier": "Free (基礎免費) 與 Pro (NT$49-69/月) 精緻卡片比對",
          "pro_privilege_unlocker": "解鎖無限衣櫥空間、去背極致細化、月度穿搭大數據分析",
          "campus_verify_button": "大學生信箱 (.edu.tw) 免付費體驗 14 日驗證鍵",
          "metric_analytics": "個人北極星指標（本週採納 OOTD 次數、出門節省時間計量計）"
        }
      }
    ]
  }
}
```

---

## 四、 市場競爭與上市策略 (Marketing Strategy)

### 4.1 Z 世代大學生行銷文案推薦 (Gen-Z Copywritings)

> **設計核心**：拒絕說教，直接痛擊「早八起不來」跟「月底口袋空空」的精準焦慮。

#### **組別一：首擊出門痛點（決策疲勞/早八救星）**
* **廣告語（Slogan）**：👉「**早八不是極限，決定穿什麼才是。**」
* **內文/副標**：睡到最後一秒！結合今日天氣與體育課課表，衣服不再瞎穿。30秒直接出門，智慧穿搭顧問讓你兼顧體面與睡眠。

#### **組別二：資產活存與賺錢痛點（省錢/賺錢/永續）**
* **廣告語（Slogan）**：👉「**你衣櫃底層，正躺著一疊鈔票在睡覺。**」
* **內文/副標**：半年沒穿的衣服，一鍵估價、直售同校社群。校園面交免運費，把閒置衣服變成這週的火鍋錢！

#### **組別三：理性膠囊穿搭（拒絕無效消費/消費科學化）**
* **廣告語（Slogan）**：👉「**別再盲買了！你不是缺一件衣服，是缺一位風格架構師。**」
* **內文/副標**：數位衣櫥雷達圖，一眼看破你的風格缺口。缺什麼、買什麼！精準推荐，省下 40% 的亂買冤枉錢。

---

### 4.2 首年獲取 5.5 萬用戶之關鍵行動計畫 (Year-1 Go-to-Market Timeline)

配合 MRD 可獲得服務市場 (SOM) 的 5% 滲透率目標（台灣 110 萬大學生的 5% ＝ 5.5 萬活躍用戶），設計以下四個階段之裂變行動計畫：

```
 【Q1：預熱裂變】 ➔ ➔ ➔ 【Q2：校園引爆】 ➔ ➔ ➔ 【Q3：留存養成】 ➔ ➔ ➔ 【Q4：雙向變現】
 「衣櫥黑洞檢測」H5     北中南「AI穿搭鏡」路演     OOTD連續簽到挑戰7天     主流電商 API 深度合作
 首批預約 10,000 名     世新/台大KOC開箱突破3.5萬  入庫率提升3倍，破5萬    引導佣金爆發性增長
```

1. **第一階段 (Q1)：社交 H5 裂變與極速預熱 (目標帳戶: 10,000 預約人次)**
   * **關鍵行動**：開發「我的衣櫃黑洞檢測」心理測驗 H5 網頁。用戶在 H5 勾選自己的穿衣習慣及幾件大致單品，系統算出一組「你正讓 NT$8,500 在衣櫃裡發霉」的驚悚趣味報告，並生成高對比 IG Story 卡片分享。
   * **獲客通路**： Threads 社群關鍵字回覆行銷。自動偵測「早八不知道穿什麼」、「衣服好多怎麼辦」高熱度脆文，由校園大使或特設帳號提供 H5 連結引導。

2. **第二階段 (Q2)：校園祭路演與 KOC 穿搭大賽 (目標用戶: 達成 35,000 名用戶)**
   * **關鍵行動**：
     * **校園 AI 智慧穿搭體驗鏡**：於北中南 5 所龍頭大學（台大、政大、逢甲、世新、中山）校慶、社團聯展設置半實體路演攤位。展示魔鏡面板，讓參與學生直接體驗「30秒課表氣象大配對」與「自動去背過程」。
     * **全校最會搭 OOTD 線上大比拼**：上線校園限定廣場功能，學生拍照上傳去背 OOTD，由全校學生下載 app 進行投票。前三名可得 PAZZO / 電商品牌 5000 元購衣儲值金。

3. **第三階段 (Q3)：留存優化與二手市場雙向啟動 (目標用戶: 達到 50,000 名用戶)**
   * **關鍵行動**：
     * 推出雙重留存誘因：「連續登錄 7 天，免費取得個人化風格深度大數據報告（原本 Pro 版收費項目）」。
     * 啟動「閒置半年未穿」通知推播活動。在開學換季當月（9月），校園二手廣場全校一鍵免運面交，學生藉由二手變現，提升 App 每日活躍率（DAU/MAU 突破 0.35）。

4. **第四階段 (Q4)：電商串接與企業分潤全面收成 (目標用戶: 穩定突破 55,000 名用戶)**
   * **關鍵行動**：
     * 完成與 PAZZO 及 D+AF 之 API 分潤接口串接，自動將用戶在網美服裝大牌之訂單一鍵入庫數位衣櫥。
     * 風格缺口演算法的精準推薦導購，使點擊導購轉化率提升至 20%，實現單季佣金及廣告 150 萬元以上的商業變現。

---

編制人：第八組 穿搭 PRD 與 MRD 開發工作組
專案架構核定於：2026 年 6 月 4 日 03:46 UTC ⚖️
