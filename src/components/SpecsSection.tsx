import React from 'react';
import { 
  Calendar, 
  Upload, 
  TrendingUp, 
  FileText, 
  Sun, 
  CloudRain, 
  Cloud, 
  Bike, 
  Info, 
  Copy, 
  DollarSign,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { WardrobeItem } from '../types';
import { getFallbackImage } from '../data';

interface SpecsSectionProps {
  isDark: boolean;
  activeSpecTab: 'recommendation' | 'imports' | 'monetization' | 'marketing';
  setActiveSpecTab: (tab: 'recommendation' | 'imports' | 'monetization' | 'marketing') => void;
  selectedDay: 'monday' | 'wednesday' | 'friday';
  setSelectedDay: (day: 'monday' | 'wednesday' | 'friday') => void;
  currentWeather: 'sunny' | 'rainy' | 'cold';
  setCurrentWeather: (weather: 'sunny' | 'rainy' | 'cold') => void;
  isRiderMode: boolean;
  setIsRiderMode: (val: boolean) => void;
  wardrobe: WardrobeItem[];
  showToast: (msg: string) => void;
  
  // URL imports
  importUrl: string;
  setImportUrl: (url: string) => void;
  importStatus: 'idle' | 'fetching' | 'background_removing' | 'completed';
  handleUrlImport: (e: React.FormEvent) => void;
  importedItem: WardrobeItem | null;
  
  // Photo upload
  simulatePhotoUpload: () => void;
  isUploading: boolean;
  uploadProgress: number;
  
  // Resale
  resaleCondition: 'brand_new' | 'like_new' | 'gently_used';
  setResaleCondition: (cond: 'brand_new' | 'like_new' | 'gently_used') => void;
  customPrice: number;
  setResellingItem: (item: WardrobeItem | null) => void;
  setSelectedMobileTab: (tab: 'home' | 'wardrobe' | 'reports' | 'bazaar' | 'pro') => void;
}

export default function SpecsSection({
  isDark,
  activeSpecTab,
  setActiveSpecTab,
  selectedDay,
  setSelectedDay,
  currentWeather,
  setCurrentWeather,
  isRiderMode,
  setIsRiderMode,
  wardrobe,
  showToast,
  importUrl,
  setImportUrl,
  importStatus,
  handleUrlImport,
  importedItem,
  simulatePhotoUpload,
  isUploading,
  uploadProgress,
  resaleCondition,
  setResaleCondition,
  customPrice,
  setResellingItem,
  setSelectedMobileTab
}: SpecsSectionProps) {

  // Copy clip board action helper
  const handleCopyText = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    showToast(`已成功複製 ${title} 到剪貼簿！`);
  };

  const countByCategory = (cat: WardrobeItem['category']) => 
    wardrobe.filter(i => i.category === cat).length;

  const totalInGroup = wardrobe.length || 1;
  const topRatio = countByCategory('Tops') / totalInGroup;
  const bottomRatio = countByCategory('Bottoms') / totalInGroup;
  const outerRatio = countByCategory('Outerwear') / totalInGroup;

  const hasBottomGap = bottomRatio < 0.25;
  const hasOuterwearGap = outerRatio < 0.15;

  return (
    <div className="flex flex-col gap-6">
      {/* IN-DOC TABS SWITCHER */}
      <div id="spec_pills_container" className={`flex overflow-x-auto gap-1 backdrop-blur-md p-1.5 rounded-2xl border scrollbar-none transition-all duration-300 ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-slate-200/50 border-slate-300/40'
      }`}>
        <button 
          id="tab_btn_recommendation"
          onClick={() => setActiveSpecTab('recommendation')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSpecTab === 'recommendation' 
              ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-md shadow-amber-400/10' 
              : isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          氣象課表推薦邏輯
        </button>
        <button 
          id="tab_btn_imports"
          onClick={() => setActiveSpecTab('imports')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSpecTab === 'imports' 
              ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-md shadow-amber-400/10' 
              : isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          去背與電商一鍵導入
        </button>
        <button 
          id="tab_btn_monetization"
          onClick={() => setActiveSpecTab('monetization')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSpecTab === 'monetization' 
              ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-md shadow-amber-400/10' 
              : isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          缺口分潤與二手觸發
        </button>
        <button 
          id="tab_btn_marketing"
          onClick={() => setActiveSpecTab('marketing')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
            activeSpecTab === 'marketing' 
              ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-md shadow-amber-400/10' 
              : isDark ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Z 世代行銷增長
        </button>
      </div>

      {/* SPECS CONTENT DISPLAYER */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xl min-h-[500px]">
        {/* TAB 1: WEATHER & SCHEDULE ENGINE */}
        {activeSpecTab === 'recommendation' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"></span>
                1.1 智慧推薦引擎算法邏輯
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                定義如何實時介接中央氣象署降雨、體感溫差 API，並讀取學生 schedule 以避開體育課裙裝、西裝褲。
              </p>
            </div>

            {/* ALGORITHM CONTROLS */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 space-y-4">
              <p className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                💡 開發者控制沙盒 - 模擬變數調整：
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* WEATHER SIM */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-neutral-400 font-mono">1. 在地天氣 (API CWA-F)</label>
                  <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl">
                    <button 
                      id="btn_sim_weather_sunny"
                      className={`py-1.5 text-center text-[11px] rounded-lg transition-all duration-205 flex flex-col items-center select-none ${
                        currentWeather === 'sunny' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                      onClick={() => { setCurrentWeather('sunny'); showToast('氣候API參數更新：28°C 晴朗舒適 / 降雨 0%'); }}
                    >
                      <Sun className="w-3.5 h-3.5 mb-1" />
                      <span>高溫</span>
                    </button>
                    <button 
                      id="btn_sim_weather_rainy"
                      className={`py-1.5 text-center text-[11px] rounded-lg transition-all duration-205 flex flex-col items-center select-none ${
                        currentWeather === 'rainy' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                      onClick={() => { setCurrentWeather('rainy'); showToast('氣候API參數更新：20°C 大雨特報 / 降雨 80%'); }}
                    >
                      <CloudRain className="w-3.5 h-3.5 mb-1" />
                      <span>大雨</span>
                    </button>
                    <button 
                      id="btn_sim_weather_cold"
                      className={`py-1.5 text-center text-[11px] rounded-lg transition-all duration-205 flex flex-col items-center select-none ${
                        currentWeather === 'cold' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                      onClick={() => { setCurrentWeather('cold'); showToast('氣候API參數更新：14°C 寒流強烈警戒'); }}
                    >
                      <Cloud className="w-3.5 h-3.5 mb-1" />
                      <span>低溫</span>
                    </button>
                  </div>
                </div>

                {/* SCHEDULE SIM */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-neutral-400 font-mono">2. 行事曆第一堂課 (iCal XML)</label>
                  <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl">
                    <button 
                      id="btn_sim_day_monday"
                      className={`py-1.5 text-center text-[10px] rounded-lg transition-all duration-205 whitespace-nowrap ${
                        selectedDay === 'monday' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                      onClick={() => { setSelectedDay('monday'); showToast('課表切換：大一普通英文課 (通用日常)'); }}
                    >
                      <span className="block text-[9px] text-neutral-500">週一</span>
                      <span>普通課</span>
                    </button>
                    <button 
                      id="btn_sim_day_wednesday"
                      className={`py-1.5 text-center text-[10px] rounded-lg transition-all duration-205 whitespace-nowrap ${
                        selectedDay === 'wednesday' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                      onClick={() => { setSelectedDay('wednesday'); showToast('課表切換：早八羽球體育課 (自動過濾裙裝)'); }}
                    >
                      <span className="block text-[9px] text-neutral-500">週三</span>
                      <span>體育課</span>
                    </button>
                    <button 
                      id="btn_sim_day_friday"
                      className={`py-1.5 text-center text-[10px] rounded-lg transition-all duration-205 whitespace-nowrap ${
                        selectedDay === 'friday' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                      onClick={() => { setSelectedDay('friday'); showToast('課表切換：專題報告口試日 (強制 Smart Casual)'); }}
                    >
                      <span className="block text-[9px] text-neutral-500">週五</span>
                      <span>簡報日</span>
                    </button>
                  </div>
                </div>

                {/* RIDER MODE */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-neutral-400 font-mono">3. 機車騎乘保護安全開關</label>
                  <button 
                    id="btn_sim_rider_toggle"
                    onClick={() => { setIsRiderMode(!isRiderMode); showToast(`機車通勤防風模式：${!isRiderMode ? '開啟 (規避飄逸裙裝、寬褲款)' : '關閉'}`); }}
                    className={`w-full py-3 px-3 rounded-xl text-xs font-bold transition-all duration-250 flex items-center justify-center gap-2 ${
                      isRiderMode ? 'bg-amber-400 text-neutral-900 shadow-md shadow-amber-400/20' : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    通勤騎士防禦：{isRiderMode ? '已啟用' : '已關閉'}
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIVE CODE SCREENS FOR DEVELOPER */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase text-amber-300 tracking-wider font-bold">🛠 智慧過濾演算法判定代碼 (CWA API AST Filters)</h4>
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 font-mono text-xs text-emerald-300 overflow-x-auto max-h-[220px] scrollbar-thin">
<pre>{`// 穿搭過濾決策樹演算法
const decisionRules = {
  is_PE_class: ${selectedDay === 'wednesday'},
  is_presentation: ${selectedDay === 'friday'},
  is_motorcycle_rider: ${isRiderMode},
  weather_condition: "${currentWeather}"
};

function filterWardrobe(database) {
  return database.filter(item => {
    // 1. 體育課：杜絕窄裙、長連身裙與皮鞋，優先彈性、有口袋、吸汗衣服
    if (decisionRules.is_PE_class) {
      if (['半身裙', '窄裙', '套裝'].includes(item.subCategory)) return false;
      if (!item.isAthletic) return false;
    }
    
    // 2. 簡報日：Smart Casual，必配襯衫襯領，禁止極隨意短褲或拖鞋
    if (decisionRules.is_presentation) {
      if (['短褲', '拖鞋'].includes(item.subCategory)) return false;
      if (!item.isFormal) return false;
    }

    // 3. 機車騎士模式：排除裙擺過長、易捲入機車輪胎之款項
    if (decisionRules.is_motorcycle_rider) {
      if (item.category === 'Bottoms' && !item.isRiderFriendly) {
        return false; // 過濾掉 A字窄裙
      }
    }
    
    return true;
  });
}`}</pre>
              </div>
              <p className="text-[11px] text-neutral-400 flex items-start gap-1 p-2.5 bg-white/5 rounded-xl border border-white/5">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>右側 iPhone 原型中已完全绑定此實時過濾代碼。當您在左側點選體育課、大雨或開啟機車 commuting 時，右側 OOTD 首選方案會動態隱蔽不合規服裝（例如，裙子將不在體育課和機車模式下顯現）。</span>
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: BACKGROUND REMOVAL & ECOMMERCE IMPORT */}
        {activeSpecTab === 'imports' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"></span>
                1.2 去背技術與電商數據一鍵導入流程
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                利用本地 WASM 高精密度 Canvas 遮罩（不留存服務端）以及網頁電子商務（如 Shopee/PAZZO）數據自動導入方案，排除人工繁瑣錄入。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* UNIT A: WASM PHOTO MASK REMOVER */}
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-3">
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">A. 本地端 AI 自動去背去邊 (WebAssembly)</p>
                
                <div className="h-28 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-3 relative overflow-hidden group hover:border-amber-400/30 transition-all duration-300">
                  {isUploading ? (
                    <div className="w-full text-center space-y-3 px-4">
                      <span className="text-xs text-amber-300 font-bold block animate-pulse">本地 Wasm 模型 AI 分析中... {uploadProgress}%</span>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-450 to-amber-300 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      id="btn_upload_simulator"
                      onClick={simulatePhotoUpload}
                      className="text-center cursor-pointer select-none"
                    >
                      <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-1.5 group-hover:text-amber-400 transition-colors" />
                      <span className="text-xs font-bold text-neutral-200 block">模擬拍照 / 拖拽服飾上傳</span>
                      <span className="text-[10px] text-neutral-500 block mt-1 font-mono">整合前端 Slim-RVM 算力核心</span>
                    </button>
                  )}
                </div>
                
                <div className="bg-black/35 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">去背隱私保護安全指引：</span>
                  <p className="text-[10px] text-neutral-500 leading-normal mt-1">
                    使用純客戶端 TensorFlow.js/ONNX 本端去背，零帶寬開銷，零伺服器圖片儲存，完全相容歐盟 GDPR 與個資法，確保學員私人房間背景絕不洩漏。
                  </p>
                </div>
              </div>

              {/* UNIT B: SHOPEE / PAZZO ONE-CLICK URL */}
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-3">
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">B. 電商大數據一鍵免手動入庫</p>
                
                <form onSubmit={handleUrlImport} className="space-y-2">
                  <label className="block text-[10px] text-neutral-450 font-mono">請輸入網路服飾電商品牌連結：</label>
                  <div className="flex gap-2">
                    <input 
                      id="input_sim_url"
                      type="text" 
                      className="bg-black/40 border border-white/5 rounded-xl py-2 px-3 text-xs text-neutral-200 outline-none flex-grow focus:border-amber-400/50"
                      placeholder="貼上 PAZZO 或 蝦皮 服飾連結..."
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                    />
                    <button 
                      id="btn_sim_url_submit"
                      type="submit"
                      disabled={importStatus === 'fetching' || importStatus === 'background_removing'}
                      className="bg-amber-400 hover:bg-amber-300 transition-colors text-neutral-900 font-bold px-4 py-2 rounded-xl text-xs shrink-0 shadow"
                    >
                      導入
                    </button>
                  </div>
                </form>

                {/* Import Status Loader */}
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 min-h-[64px] flex items-center justify-center">
                  {importStatus === 'idle' && (
                    <span className="text-[11px] text-neutral-500 text-center">※ 輸入電商網址，點擊導入模擬 API 全屬性智能解析</span>
                  )}
                  {importStatus === 'fetching' && (
                    <div className="text-center space-y-1 py-1">
                      <span className="text-[11px] text-amber-400 block font-bold animate-bounce">1. 後端 Node 爬蟲正在抓取 DOM 並解析 HTML...</span>
                      <span className="text-[9px] text-neutral-500 block font-mono">GET /api/crawler?url={encodeURIComponent(importUrl.substring(0, 30))}...</span>
                    </div>
                  )}
                  {importStatus === 'background_removing' && (
                    <div className="text-center space-y-1 py-1">
                      <span className="text-[11px] text-amber-300 block animate-pulse">2. 後端調用 Google Gemini 解析品類、屬性特徵 JSON...</span>
                      <span className="text-[9px] text-neutral-500 block font-mono">Gemini-2.5-Flash text classification</span>
                    </div>
                  )}
                  {importStatus === 'completed' && importedItem && (
                    <div className="w-full flex items-center gap-3">
                      <img 
                        src={importedItem.imageUrl} 
                        className="w-11 h-11 object-cover object-center rounded-xl border border-white/10 bg-neutral-50 dark:bg-neutral-900" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImage(importedItem.category);
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-neutral-200 block truncate">{importedItem.name}</span>
                        <div className="flex gap-1.5 mt-1">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-md">NT$ {importedItem.originalPrice}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-purple-400/10 text-purple-300 border border-purple-400/20 rounded-md">來源：{importedItem.source}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PROMPT SCHEMAS FOR DEV */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase text-amber-300 tracking-wider font-bold">📂 Google Gemini 語意解析結構化 JSON Schema</h4>
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 font-mono text-xs text-neutral-300 overflow-x-auto">
                <span className="text-purple-300">// Gemini Structured Metadata Response</span>
<pre className="mt-1.5">{`{
  "product_title": "PAZZO 厚磅針織運動連帽服",
  "category": "Tops",
  "sub_category": "衛衣/帽衫",
  "recommended_season": ["Autumn", "Winter"],
  "underlying_color": { "name": "霧灰色", "hex": "#9E9E9E" },
  "features": {
    "is_rider_friendly": true,
    "is_athletic": true,
    "is_formal": false
  }
}`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS MODEL */}
        {activeSpecTab === 'monetization' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"></span>
                2.0 商業變現與閒置資產活化
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                設定「風格缺口分析儀」的膠囊衣櫥判定邏輯，以及針對半年（180天）未穿衣物推出自動折舊與一鍵校內轉賣機置。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* WARDROBE CAPSULE DIAGNOSIS SPEC */}
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">A. 膠囊衣櫥黃金比例比例模型</span>
                  <span className="text-[10px] font-mono bg-black/40 border border-white/5 px-2 py-0.5 text-neutral-400 rounded-lg">比例指標: 4 : 3 : 2 : 1</span>
                </div>

                {/* DB Indicators */}
                <div className="space-y-3.5 py-1">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-300 font-semibold">上身 Tops (主攻 40%)</span>
                      <span className="font-mono text-amber-300">{(topRatio * 100).toFixed(0)}% (共 {countByCategory('Tops')} 件)</span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${topRatio * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-300 font-semibold">下身 Bottoms (主攻 30%)</span>
                      <span className={`font-mono ${hasBottomGap ? 'text-red-400 font-extrabold' : 'text-neutral-300'}`}>
                        {(bottomRatio * 100).toFixed(0)}% (共 {countByCategory('Bottoms')} 件)
                      </span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${hasBottomGap ? 'bg-red-400' : 'bg-amber-500'}`} style={{ width: `${bottomRatio * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-neutral-300 font-semibold">外套 Outerwear (主攻 20%)</span>
                      <span className={`font-mono ${hasOuterwearGap ? 'text-red-400 font-extrabold' : 'text-neutral-300'}`}>
                        {(outerRatio * 100).toFixed(0)}% (共 {countByCategory('Outerwear')} 件)
                      </span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-600 h-full rounded-full" style={{ width: `${outerRatio * 100}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Diagnosis Log */}
                <div className="bg-black/35 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">🩺 膠囊狀態診斷報告：</span>
                  <p className="text-xs text-neutral-300 leading-normal mt-1">
                    {hasBottomGap ? '⚠️【下身重度缺口】您的上衣與下裝比失衡。這意味您的上衣很多，但因缺乏合群下身，能組出的風格極少。推薦入手法式長褲或牛仔褲以活化組合搭配鏈。' : '✔️ 您的衣櫃目前上下裝比例調和良好，適合理性搭配。'}
                  </p>
                </div>
              </div>

              {/* RESALE DEPRECIATION SPEC */}
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-3">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">B. 閒置服飾折舊與估值控制台</span>
                
                <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 bg-red-400/20 text-red-300 rounded font-bold font-mono border border-red-500/10">超時：180天閒置</span>
                    <span className="text-xs text-neutral-300 font-bold">GAP 復古草寫刺繡大衛衣</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-[11px] font-mono pt-1 text-neutral-450 border-b border-white/5 pb-2">
                    <span>已滯留日數: <strong className="text-red-400 font-bold">195 天</strong></span>
                    <span>原購入價: <strong>$1,890</strong></span>
                  </div>

                  {/* SLIDER SPEC SIM */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[10px] text-neutral-400 font-mono">磨損與使用完好度調整乘數：</label>
                    <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-lg">
                      <button 
                        id="btn_cond_brand_new"
                        onClick={() => setResaleCondition('brand_new')} 
                        className={`py-1.5 text-[10px] rounded-lg transition-all ${resaleCondition === 'brand_new' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-400 hover:text-white'}`}
                      >全新帶標 (0.8)</button>
                      <button 
                        id="btn_cond_like_new"
                        onClick={() => setResaleCondition('like_new')} 
                        className={`py-1.5 text-[10px] rounded-lg transition-all ${resaleCondition === 'like_new' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-400 hover:text-white'}`}
                      >九成極新 (0.65)</button>
                      <button 
                        id="btn_cond_gently_used"
                        onClick={() => setResaleCondition('gently_used')} 
                        className={`py-1.5 text-[10px] rounded-lg transition-all ${resaleCondition === 'gently_used' ? 'bg-amber-400 text-neutral-950 font-bold shadow' : 'text-neutral-400 hover:text-white'}`}
                      >有些許使用痕跡 (0.45)</button>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-neutral-300">系統演算二手判定價值:</span>
                    <span className="text-base font-mono font-bold text-amber-300">NT$ {customPrice}</span>
                  </div>
                </div>

                <button 
                  id="btn_trigger_resale_sim"
                  onClick={() => {
                    const item = wardrobe.find(i => i.id === '5');
                    if (item) {
                      setResellingItem(item);
                      setSelectedMobileTab('bazaar');
                      showToast('已將 195 天未穿 GAP 衛衣帶入二手轉賣與折舊核價，切換至轉賣視圖！');
                    }
                  }}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow transition-colors"
                >
                  <DollarSign className="w-4 h-4 text-neutral-950" />
                  帶入 iPhone 模擬器折舊轉賣
                </button>
              </div>
            </div>

            {/* COOPERATING MATH IN RECHARTS */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase text-amber-300 tracking-wider font-bold">🛒 品牌佣金與在地行銷導購分潤鏈</h4>
              <p className="text-xs text-neutral-400 leading-relaxed p-3 bg-white/5 rounded-xl border border-white/5">
                在缺口診斷中，系統自動對接 **蝦皮購物 與 PAZZO 返利接口**。跳轉至下裝商品時，自動帶入專屬行銷 id `?aff_id=campus_ootd_group8`。
                當同校同學點擊並以 $1,000 元購置缺口西裝褲後，本系統將提成 5% 傭金（$50 NTD 導客利潤），即 PRD/MRD 提及的大專生 5% 首年 165 萬元導流關鍵技術點。
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: MARKETING STRATEGIES */}
        {activeSpecTab === 'marketing' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/50"></span>
                4.0 Z 世代行銷文案與首年增長計畫
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                提供 3 組強調「解決出門穿搭內耗」與「二手一鍵賺零用錢」的痛點穿透文案，以及精準的 5.5 萬用戶首年 Q1-Q4 上市行動。
              </p>
            </div>

            {/* COPYWRITING SHOWCASE WITH CLIPBOARD COPY ACTIONS */}
            <div className="space-y-4">
              <span className="text-xs text-amber-350 font-bold uppercase tracking-wider block">✍️ 品牌推廣一鍵複製文案包：</span>
              
              {/* Copy set 1 */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-amber-400/20 transition-all duration-300 relative group">
                <div className="absolute right-3 top-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button 
                    id="btn_copy_copywriting_1"
                    onClick={() => handleCopyText(`👉「早八不是極限，決定穿什麼才是。」\n睡到最後一秒！結合今日天氣與體育課課表，衣服不再瞎穿。30秒直接出門，智慧穿搭顧問讓你兼顧體面與睡眠。`, '早八痛點文案')}
                    className="bg-black/50 border border-white/10 hover:bg-white/5 p-1.5 rounded-lg transition-colors text-neutral-400 hover:text-white"
                    title="複製此文案"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block mb-1">【文案一：極度決策疲勞／早八救星】</span>
                <p className="text-xs font-bold text-neutral-200">👉「早八不是極限，決定穿什麼才是。」</p>
                <p className="text-xs text-neutral-400 mt-1 leading-normal pr-10">
                  睡到最後一秒！結合今日天氣與體育課課表，衣服不再瞎穿。30秒直接出門，智慧穿搭顧問讓你兼顧體面與睡眠。
                </p>
              </div>

              {/* Copy set 2 */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-amber-400/20 transition-all duration-300 relative group">
                <div className="absolute right-3 top-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button 
                    id="btn_copy_copywriting_2"
                    onClick={() => handleCopyText(`👉「你衣櫃底層，正躺著一疊鈔票在睡覺。」\n半年沒穿的衣服，一鍵估價、直售同校社群。校園面交免運費，把閒置衣服變成這週的火鍋錢！`, '二手轉賣文案')}
                    className="bg-black/50 border border-white/10 hover:bg-white/5 p-1.5 rounded-lg transition-colors text-neutral-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block mb-1">【文案二：閒置資產變現】</span>
                <p className="text-xs font-bold text-neutral-200">👉「你衣櫃底層，正躺著一疊鈔票在睡覺。」</p>
                <p className="text-xs text-neutral-400 mt-1 leading-normal pr-10">
                  半年沒穿的衣服，一鍵估價、直售同校社群。校園面交免運費，把閒置衣服變成這週的火鍋錢！
                </p>
              </div>

              {/* Copy set 3 */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 hover:border-amber-400/20 transition-all duration-300 relative group">
                <div className="absolute right-3 top-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button 
                    id="btn_copy_copywriting_3"
                    onClick={() => handleCopyText(`👉「別再盲買了！你不是缺一件衣服，是缺一位風格架構師。」\n數位衣櫥雷達圖，一眼看破你的風格缺口。缺什麼、買什麼！精準推荐，省下 40% 的亂買冤枉錢。`, '理性膠囊文案')}
                    className="bg-black/50 border border-white/10 hover:bg-white/5 p-1.5 rounded-lg transition-colors text-neutral-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block mb-1">【文案三：理性膠囊／消費科學】</span>
                <p className="text-xs font-bold text-neutral-200">👉「別再盲買了！你不是缺一件衣服，是缺一位風格架構師。」</p>
                <p className="text-xs text-neutral-400 mt-1 leading-normal pr-10">
                  數位衣櫥雷達圖，一眼看破你的風格缺口。缺什麼、買什麼！精準推荐，省下 40% 的亂買冤枉錢。
                </p>
              </div>
            </div>

            {/* HIGH VALUE STATS PLAN */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">📈 5.5 萬獲取首年關鍵里程碑計畫表：</span>
              
              <div className="relative border-l border-white/10 pl-4 space-y-4 text-xs">
                <div>
                  <div className="absolute w-2 h-2 bg-amber-400 rounded-full -left-[5px] top-1.5 shadow shadow-amber-400"></div>
                  <span className="font-bold text-neutral-200">Q1 預熱爆發期 (1.5 萬名預約用戶)</span>
                  <p className="text-neutral-400 mt-0.5">推出「衣櫥黑洞檢測儀」情感診斷，配合 IG Story 快顯與 Dcard/Threads 高密度大學脆文引爆熱點。</p>
                </div>
                <div>
                  <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -left-[5px] top-1.5 shadow"></div>
                  <span className="font-bold text-neutral-200">Q2 校園路演祭 (累積用戶突破 3.5 萬)</span>
                  <p className="text-neutral-400 mt-0.5">在世新、台大設置「AI智慧穿搭魔鏡」半實體快閃攤位，主打電商導入去背技術展示與 OOTD 比賽推播。</p>
                </div>
                <div>
                  <div className="absolute w-2 h-2 bg-amber-500 rounded-full -left-[5px] top-1.5 shadow"></div>
                  <span className="font-bold text-neutral-200">Q3 二手自循環活水 (達標 5.5 萬用戶)</span>
                  <p className="text-neutral-400 mt-0.5">九月換季當期主打「180 天衣服閒置估值面交」活動，解決同校學生宿舍搬家痛點，極度提升 DAU。</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
