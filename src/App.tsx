import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  Layout, 
  ExternalLink,
  Github
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { WardrobeItem, SpecTab, MobileTab, WeatherType, SelectedDayType, ResaleConditionType } from './types';
import { INITIAL_WARDROBE } from './data';
import SpecsSection from './components/SpecsSection';
import PhoneSimulator from './components/PhoneSimulator';

export default function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  // Theme Configuration (System Default, Forced Light, Forced Dark)
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as 'system' | 'light' | 'dark') || 'system';
  });
  
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      if (themeMode === 'system') {
        setIsDark(mediaQuery.matches);
      } else {
        setIsDark(themeMode === 'dark');
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [themeMode]);

  const handleThemeModeChange = (mode: 'system' | 'light' | 'dark') => {
    setThemeMode(mode);
    localStorage.setItem('theme-mode', mode);
    showToast(`已切換主題外觀：${mode === 'system' ? '依隨系統外觀' : mode === 'light' ? '亮色底模式' : '深色黑底模式'}`);
  };

  // Active Specs Tab (Left Side)
  const [activeSpecTab, setActiveSpecTab] = useState<SpecTab>('recommendation');
  
  // Interactive Simulator parameters Reacted from Left to Right and vice versa
  const [selectedDay, setSelectedDay] = useState<SelectedDayType>('wednesday'); 
  // monday: normal class, wednesday: Gym Class/PE, friday: Presentation Day
  const [currentWeather, setCurrentWeather] = useState<WeatherType>('cold');
  const [isRiderMode, setIsRiderMode] = useState<boolean>(true); // Motorcyclist Friendly commute
  
  // Dresser State
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(INITIAL_WARDROBE);
  const [selectedMobileTab, setSelectedMobileTab] = useState<MobileTab>('home');
  
  // AI Import simulation states
  const [importUrl, setImportUrl] = useState<string>('https://www.pazzo.com.tw/products/detail/1020492');
  const [importStatus, setImportStatus] = useState<'idle' | 'fetching' | 'background_removing' | 'completed'>('idle');
  const [importedItem, setImportedItem] = useState<WardrobeItem | null>(null);
  
  // Manual File upload simulation
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Second-hand resale system state
  const [resellingItem, setResellingItem] = useState<WardrobeItem | null>(null);
  const [resaleCondition, setResaleCondition] = useState<ResaleConditionType>('like_new');
  const [customPrice, setCustomPrice] = useState<number>(0);

  // Time mechanism for resale re-awakening
  const [lastListTime, setLastListTime] = useState<number | null>(null);
  const [isOver24HoursSimulated, setIsOver24HoursSimulated] = useState<boolean>(false);

  // Dynamic Marketplace list and status states
  const [marketplaceItems, setMarketplaceItems] = useState<any[]>([
    {
      id: 'm1',
      name: '落肩連帽毛衣灰',
      price: 250,
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&auto=format&fit=crop&q=80',
      colorName: '霧灰色',
      colorHex: '#9E9E9E',
      department: '世新口傳系',
      timeText: '5 分鐘前上架'
    },
    {
      id: 'm2',
      name: '南韓空運條紋針織',
      price: 390,
      imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100&auto=format&fit=crop&q=80',
      colorName: '海軍藍/白',
      colorHex: '#1D2F44',
      department: '世新公廣系',
      timeText: '32 分鐘前上架'
    }
  ]);

  const [marketStatusText, setMarketStatusText] = useState<string>('世新大學二手循環中介 ‧ 目前累計已成功減碳 12.8 kg');

  const handleLiquidateItem = (item: WardrobeItem, finalPrice: number) => {
    // 步驟一：將該件衣服狀態標記為「轉賣中」，不直接硬性移出，提供玩家流暢的視覺反饋
    setWardrobe(prev => prev.map(w => w.id === item.id ? { ...w, isReselling: true } : w));

    // 步驟二：自動將這件衣服的資訊與自訂二手估價推播上架至 front of marketplaceItems 陣列
    const departments = ['世新資傳系', '世新口傳系', '世新公廣系', '世新廣電系', '世新觀光系'];
    const randomDept = departments[Math.floor(Math.random() * departments.length)];

    const newMarketItem = {
      id: `m_new_${Date.now()}`,
      name: item.name,
      price: finalPrice,
      imageUrl: item.imageUrl,
      colorName: item.colorName,
      colorHex: item.colorHex,
      department: randomDept,
      timeText: '剛剛上架'
    };

    setMarketplaceItems(prev => [newMarketItem, ...prev]);

    // 步驟三：更新上方提示文字、記錄上架時間、重設過24小時模擬旗標、與自動引導至市集面板
    setLastListTime(Date.now());
    setIsOver24HoursSimulated(false);
    setMarketStatusText(`成功將 1 件閒置物（${item.name}）投入世新市集`);
    setSelectedMobileTab('bazaar');

    showToast(`成功轉現上架，已將 ${item.name} 投入世新二手市集，定價為 ${finalPrice} 元`);
  };

  // Subscription State
  const [isProSubscribed, setIsProSubscribed] = useState<boolean>(false);
  const [eduEmail, setEduEmail] = useState<string>('');
  const [eduCodeSent, setEduCodeSent] = useState<boolean>(false);
  const [eduVerified, setEduVerified] = useState<boolean>(false);

  // Toast notifier
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Setup Resale pricing dynamically based on condition & item original cost
  useEffect(() => {
    if (resellingItem) {
      let multiplier = 0.5;
      if (resaleCondition === 'brand_new') multiplier = 0.8;
      if (resaleCondition === 'gently_used') multiplier = 0.35;
      
      const depreciation = 1 - (resellingItem.lastWornDaysAgo / 365) * 0.4; // up to 40% time decay
      const calculated = Math.round(resellingItem.originalPrice * multiplier * Math.max(0.4, depreciation));
      setCustomPrice(calculated);
    }
  }, [resellingItem, resaleCondition]);

  // ==========================================
  // REAL TIME ALGORITHM & RECOMMENDATION FILTER
  // ==========================================
  const generateTodayOOTD = () => {
    // Determine context
    const isGymClass = selectedDay === 'wednesday';
    const isPresentation = selectedDay === 'friday';
    
    // Filter Tops
    let filteredTops = wardrobe.filter(item => item.category === 'Tops');
    
    if (isGymClass) {
      // 8 AM Gym Class: must be athletic stretchy clothing, block formal/un-stretchy
      filteredTops = filteredTops.filter(item => item.isAthletic && !item.isFormal);
    } else if (isPresentation) {
      // Presentation day: formally paired collars
      filteredTops = filteredTops.filter(item => item.isFormal);
    }

    // Filter Bottoms (Simulate database content filters)
    let filteredBottoms = wardrobe.filter(item => item.category === 'Bottoms');
    if (isGymClass) {
      // Gym class: NO skirt (窄裙 or long dress), no suit pants. Maintain athletic wear
      filteredBottoms = filteredBottoms.filter(item => item.isAthletic && !item.isFormal);
    } else if (isRiderMode) {
      // Riders: NO unstable loose items or skirts (e.g. A-line skirt is bad)
      filteredBottoms = filteredBottoms.filter(item => item.isRiderFriendly);
    }

    // Outerwear suggestions based on Weather
    let recommendedOuterwear: WardrobeItem[] = [];
    if (currentWeather === 'cold' || (isRiderMode && currentWeather === 'rainy')) {
      // Prioritize heavy/protective or windproof cardigans
      recommendedOuterwear = wardrobe.filter(item => item.category === 'Outerwear' || item.name.includes('連帽上衣') || item.name.includes('大衛衣'));
    }

    // Shoes matching
    let recommendedSneakers = wardrobe.filter(item => item.category === 'Footwear');
    if (isGymClass) {
      recommendedSneakers = recommendedSneakers.filter(item => item.isAthletic);
    }

    // Assemble 3 different coordinate sets dynamically from filtered slots
    // Set 1: Recommended Primary
    const top1 = filteredTops[0] || wardrobe.find(i => i.category === 'Tops');
    // For bottoms, if none filtered, find a generic clean bottom
    const bottom1 = filteredBottoms[0] || {
      id: 'mock_bottom_1',
      name: isGymClass ? '高彈性舒適排汗棉短褲' : '質感直筒墨黑單寧褲',
      category: 'Bottoms',
      subCategory: '休閒長褲',
      colorName: '碳灰黑',
      colorHex: '#374151',
      lastWornDaysAgo: 1,
      originalPrice: 790,
      source: 'Manual',
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&auto=format&fit=crop&q=80',
      isRiderFriendly: true,
      isAthletic: isGymClass,
      isFormal: isPresentation
    } as WardrobeItem;

    const outer1 = recommendedOuterwear[0] || (currentWeather === 'cold' ? {
      id: 'mock_outer_1',
      name: '極簡防風立領機能夾克',
      category: 'Outerwear',
      subCategory: '開襟防風外套',
      colorName: '軍綠色',
      colorHex: '#3F4E26',
      lastWornDaysAgo: 4,
      originalPrice: 1980,
      source: 'Shopee',
      imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&auto=format&fit=crop&q=80',
      isRiderFriendly: true,
      isAthletic: true,
      isFormal: false
    } as WardrobeItem : null);

    const shoe1 = recommendedSneakers[0] || wardrobe.find(i => i.category === 'Footwear');

    // Create 3 realistic output sets
    return [
      {
        id: 'set_1',
        title: '👑 首選推薦組',
        score: isRiderMode ? 98 : 95,
        desc: isGymClass ? '早八體育課最佳配備，高彈柔軟。' : isPresentation ? '專業感簡報簡約，優雅幹練。' : '日常通識舒適休閒，抗溫差。',
        top: top1,
        bottom: bottom1,
        outer: outer1,
        shoes: shoe1,
        safetyAlert: isGymClass && top1 && top1.isFormal ? '注意：此款服裝排汗性較弱' : null
      },
      {
        id: 'set_2',
        title: '⚡️ 乾淨簡約系',
        score: 88,
        desc: '低調純色配對，視覺輕爽。',
        top: filteredTops[1] || top1,
        bottom: bottom1,
        outer: null,
        shoes: shoe1,
        safetyAlert: null
      },
      {
        id: 'set_3',
        title: '☘️ 個性街頭風',
        score: 82,
        desc: 'Z 世代率性混搭，活力出門。',
        top: filteredTops[2] || top1,
        bottom: bottom1,
        outer: outer1,
        shoes: shoe1,
        safetyAlert: null
      }
    ];
  };

  const todayOOTDSets = generateTodayOOTD();

  // ==========================================
  // SIMULATORS & INTERACTION HANDLERS
  // ==========================================
  // Shopee/PAZZO crawler simulation
  const handleUrlImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;
    
    setImportStatus('fetching');
    
    // Stage 1: API Scraping Product Metadata
    setTimeout(() => {
      setImportStatus('background_removing');
      
      // Stage 2: AI WASM Background Removal
      setTimeout(() => {
        const isPazzo = importUrl.toLowerCase().includes('pazzo');
        const newProduct: WardrobeItem = {
          id: String(Date.now()),
          name: isPazzo ? 'PAZZO 厚磅針織束口運動棉褲' : '蝦皮熱銷 微寬雙口袋工作直筒褲',
          category: 'Bottoms',
          subCategory: '休閒長褲',
          colorName: '落葉褐',
          colorHex: '#8C6239',
          lastWornDaysAgo: 0,
          originalPrice: isPazzo ? 690 : 450,
          source: isPazzo ? 'PAZZO' : 'Shopee',
          imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&auto=format&fit=crop&q=80',
          isRiderFriendly: true,
          isAthletic: true,
          isFormal: false
        };
        
        setWardrobe(prev => [newProduct, ...prev]);
        setImportedItem(newProduct);
        setImportStatus('completed');
        showToast(`成功導入 1 件全新 ${newProduct.source} 單品！已自動去背並歸類至 ${newProduct.category}`);
      }, 1500);
    }, 1500);
  };

  // Drag over files simulators
  const simulatePhotoUpload = () => {
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            
            // Add custom uploaded item
            const manualItem: WardrobeItem = {
              id: String(Date.now()),
              name: 'iPhone 拍入：手感親膚微寬排汗上衣',
              category: 'Tops',
              subCategory: 'T-Shirt',
              colorName: '焦糖橘',
              colorHex: '#C05C2B',
              lastWornDaysAgo: 0,
              originalPrice: 590,
              source: 'Manual',
              imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&auto=format&fit=crop&q=80',
              isRiderFriendly: true,
              isAthletic: true,
              isFormal: false
            };
            
            setWardrobe(prev => [manualItem, ...prev]);
            showToast('相機圖片已完成本地 WASM 高精去背！自動歸類為【上衣】');
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  const handlePublishSecondHand = () => {
    if (!resellingItem) return;
    
    // Remove from self wardrobe
    setWardrobe(prev => prev.filter(i => i.id !== resellingItem.id));
    
    const calculatedResalePrice = customPrice || Math.max(150, Math.round(resellingItem.originalPrice * 0.45));
    const departments = ['世新資傳系', '世新口傳系', '世新公廣系', '世新廣電系', '世新英語系'];
    const randomDept = departments[Math.floor(Math.random() * departments.length)];

    const newMarketItem = {
      id: `m_new_${Date.now()}`,
      name: resellingItem.name,
      price: calculatedResalePrice,
      imageUrl: resellingItem.imageUrl,
      colorName: resellingItem.colorName,
      colorHex: resellingItem.colorHex,
      department: randomDept,
      timeText: '剛剛上架'
    };

    setMarketplaceItems(prev => [newMarketItem, ...prev]);
    setMarketStatusText(`成功將 1 件閒置物（${resellingItem.name}）投入救援！`);
    
    setResellingItem(null);
    showToast(`【閒置轉賣完成】已自動估值並一鍵推播至「世新大學校園二手市集」大廳看板！`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-amber-400 selection:text-neutral-950 relative overflow-hidden ${isDark ? 'dark bg-neutral-950 text-neutral-100' : 'light bg-slate-50 text-slate-800'}`}>
      
      {/* AMBIENT FLOATING GRADIENTS FOR FROSTED GLASS BACKGROUND */}
      <div className={`absolute top-[8%] left-[2%] w-[450px] h-[450px] bg-gradient-to-br rounded-full blur-[140px] pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'from-amber-400/8' : 'from-amber-400/15'}`}></div>
      <div className={`absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tr rounded-full blur-[160px] pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'from-purple-500/8' : 'from-purple-500/15'}`}></div>
      <div className={`absolute bottom-[8%] left-[10%] w-[400px] h-[400px] bg-gradient-to-tr rounded-full blur-[120px] pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'from-blue-500/8' : 'from-blue-500/15'}`}></div>

      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            id="global_toast"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-neutral-950 border border-amber-300 font-black px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs tracking-wide"
          >
            <Sparkles className="w-4 h-4 shrink-0 text-neutral-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR WITH FROSTED GLASS */}
      <header id="site_header" className={`border-b transition-colors duration-300 backdrop-blur-xl sticky top-0 z-40 ${isDark ? 'border-white/5 bg-neutral-900/40 text-neutral-100' : 'border-slate-200 bg-white/70 text-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="bg-amber-400 p-2 rounded-2xl text-neutral-950 shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className={`text-lg font-bold font-display tracking-tight flex items-center gap-2 flex-wrap ${isDark ? 'text-neutral-100' : 'text-slate-900'}`}>
                校園智慧穿搭顧問
                <span className="text-[10px] tracking-widest bg-amber-400/10 text-amber-600 dark:text-amber-300 font-extrabold px-3 py-0.5 rounded-full border border-amber-400/20">
                  PM & ARCHITECT SHOWCASE
                </span>
              </h1>
              <p className={`text-xs hidden sm:block font-sans mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                智慧型世新大學穿衣決策方案 ‧ Z 世代服飾數位管理系統
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
            
            {/* Theme Selector Controls */}
            <div className={`p-1 rounded-xl border flex items-center gap-0.5 text-[10px] font-bold transition-all duration-300 ${
              isDark 
                ? 'bg-black/40 border-white/5' 
                : 'bg-slate-200/60 border-slate-350'
            }`}>
              <button
                onClick={() => handleThemeModeChange('system')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'system'
                    ? 'bg-amber-400 text-neutral-950 font-black shadow-sm'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="自動偵測系統深色/亮色"
              >
                自動
              </button>
              <button
                onClick={() => handleThemeModeChange('light')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'light'
                    ? 'bg-amber-400 text-neutral-950 font-black shadow-sm'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="亮色底"
              >
                亮色
              </button>
              <button
                onClick={() => handleThemeModeChange('dark')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-amber-400 text-neutral-950 font-black shadow-sm'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="暗色底"
              >
                深色
              </button>
            </div>

            <span className={`text-[11px] font-mono hidden lg:inline ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              ⚖️ 成果審定：第 8 小組 PRD / MRD 規格
            </span>
            <a 
              href="#interactive_prototype" 
              className={`px-4 py-2 rounded-xl text-xs transition-all font-bold flex items-center gap-2 shadow ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-200' 
                  : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Layout className="w-4 h-4 text-amber-500 shrink-0" />
              直達模擬器
            </a>
          </div>
        </div>
      </header>

      {/* MASTER LAYOUT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        
        {/* TOP DESCRIPTION HERO WITH FROSTED GLASS */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-3xl">
            <span className="text-xs text-amber-300 tracking-widest uppercase font-black flex items-center gap-2 mb-2.5">
              <Award className="w-4 h-4" /> 2026 年度世新大學資訊傳播學系規劃成果呈現
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight leading-tight mb-3">
              結合大數據演算法與 Z 世代消費科學的「早安智慧穿搭引擎」
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              大學生在早課出門前（尤其是陰雨綿綿的文山區早八寒流）常面臨著平均 15 分鐘的資訊與穿戴決策損耗。
              本方案藉由<strong>實時在地氣象 API 介接</strong>、<strong>行事曆課表一鍵導入</strong>、<strong>WASM 純隱私快扣照片錄入</strong>，以及獨特的<strong>180天閒置自動估估折舊轉賣</strong>，引導並解決大學生穿衣內耗，完美落實了高可重用性、極低門檻與閒置資產循環。
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-[11px] px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-300 font-mono"># 臺灣 CWA 氣候資料庫</span>
              <span className="text-[11px] px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-300 font-mono"># 行事曆 iCal 一鍵同步</span>
              <span className="text-[11px] px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-300 font-mono"># WebAssembly 純私下去背</span>
              <span className="text-[11px] px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-neutral-300 font-mono"># 5% 電商導購分潤返利</span>
            </div>
          </div>
        </div>

        {/* WORKSPACE MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 PANELS: TECHNICAL SPECIFICATIONS & WORKINGS (PM SIDE) */}
          <section className="lg:col-span-7">
            <SpecsSection 
              isDark={isDark}
              activeSpecTab={activeSpecTab}
              setActiveSpecTab={setActiveSpecTab}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              currentWeather={currentWeather}
              setCurrentWeather={setCurrentWeather}
              isRiderMode={isRiderMode}
              setIsRiderMode={setIsRiderMode}
              wardrobe={wardrobe}
              showToast={showToast}
              importUrl={importUrl}
              setImportUrl={setImportUrl}
              importStatus={importStatus}
              handleUrlImport={handleUrlImport}
              importedItem={importedItem}
              simulatePhotoUpload={simulatePhotoUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              resaleCondition={resaleCondition}
              setResaleCondition={setResaleCondition}
              customPrice={customPrice}
              setResellingItem={setResellingItem}
              setSelectedMobileTab={setSelectedMobileTab}
            />
          </section>

          {/* RIGHT 5 COLUMNS: THE INTERACTIVE SMARTPHONE VIEWPORT SIMULATOR */}
          <section id="interactive_prototype" className="lg:col-span-5">
            <PhoneSimulator 
              isDark={isDark}
              selectedMobileTab={selectedMobileTab}
              setSelectedMobileTab={setSelectedMobileTab}
              currentWeather={currentWeather}
              selectedDay={selectedDay}
              isRiderMode={isRiderMode}
              wardrobe={wardrobe}
              setWardrobe={setWardrobe}
              showToast={showToast}
              importUrl={importUrl}
              setImportUrl={setImportUrl}
              importStatus={importStatus}
              handleUrlImport={handleUrlImport}
              simulatePhotoUpload={simulatePhotoUpload}
              isUploading={isUploading}
              resellingItem={resellingItem}
              setResellingItem={setResellingItem}
              resaleCondition={resaleCondition}
              setResaleCondition={setResaleCondition}
              customPrice={customPrice}
              handlePublishSecondHand={handlePublishSecondHand}
              isProSubscribed={isProSubscribed}
              setIsProSubscribed={setIsProSubscribed}
              eduEmail={eduEmail}
              setEduEmail={setEduEmail}
              eduCodeSent={eduCodeSent}
              setEduCodeSent={setEduCodeSent}
              eduVerified={eduVerified}
              setEduVerified={setEduVerified}
              todayOOTDSets={todayOOTDSets}
              marketplaceItems={marketplaceItems}
              marketStatusText={marketStatusText}
              handleLiquidateItem={handleLiquidateItem}
              lastListTime={lastListTime}
              setLastListTime={setLastListTime}
              isOver24HoursSimulated={isOver24HoursSimulated}
              setIsOver24HoursSimulated={setIsOver24HoursSimulated}
            />
          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-neutral-950/60 backdrop-blur-xl mt-16 py-8 text-center text-neutral-500 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-2.5">
          <p className="font-sans">
            校園智慧穿搭顧問 ‧ 2026 第八組學學規劃成果呈現網頁
          </p>
          <p className="text-[10px] text-neutral-600 leading-relaxed font-sans max-w-2xl mx-auto">
            本專案結合世新大學、台大、政大等台灣大專學府，並與電商 PAZZO/蝦皮 合作研究，落實 WebAssembly 純客戶端算力去背保護個人臥房私隱，保障資訊合規。
          </p>
        </div>
      </footer>

    </div>
  );
}
