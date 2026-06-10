import React from 'react';
import { 
  Sun, 
  CloudRain, 
  Cloud, 
  Calendar, 
  Bike, 
  Sparkles, 
  Check, 
  Upload, 
  Link as LinkIcon, 
  AlertTriangle, 
  TrendingUp, 
  ShoppingBag, 
  Award, 
  ShieldCheck, 
  ExternalLink,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  Moon,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { WardrobeItem } from '../types';
import { getFallbackImage } from '../data';

interface PhoneSimulatorProps {
  isDark: boolean;
  selectedMobileTab: 'home' | 'wardrobe' | 'reports' | 'bazaar' | 'pro';
  setSelectedMobileTab: (tab: 'home' | 'wardrobe' | 'reports' | 'bazaar' | 'pro') => void;
  currentWeather: 'sunny' | 'rainy' | 'cold';
  selectedDay: 'monday' | 'wednesday' | 'friday';
  isRiderMode: boolean;
  wardrobe: WardrobeItem[];
  setWardrobe: React.Dispatch<React.SetStateAction<WardrobeItem[]>>;
  showToast: (msg: string) => void;
  importUrl: string;
  setImportUrl: (url: string) => void;
  importStatus: 'idle' | 'fetching' | 'background_removing' | 'completed';
  handleUrlImport: (e: React.FormEvent) => void;
  simulatePhotoUpload: () => void;
  isUploading: boolean;
  resellingItem: WardrobeItem | null;
  setResellingItem: (item: WardrobeItem | null) => void;
  resaleCondition: 'brand_new' | 'like_new' | 'gently_used';
  setResaleCondition: (cond: 'brand_new' | 'like_new' | 'gently_used') => void;
  customPrice: number;
  handlePublishSecondHand: () => void;
  isProSubscribed: boolean;
  setIsProSubscribed: (val: boolean) => void;
  eduEmail: string;
  setEduEmail: (email: string) => void;
  eduCodeSent: boolean;
  setEduCodeSent: (val: boolean) => void;
  eduVerified: boolean;
  setEduVerified: (val: boolean) => void;
  todayOOTDSets: any[];
  marketplaceItems: any[];
  marketStatusText: string;
  handleLiquidateItem: (item: WardrobeItem, finalPrice: number) => void;
  lastListTime: number | null;
  setLastListTime: (val: number | null) => void;
  isOver24HoursSimulated: boolean;
  setIsOver24HoursSimulated: (val: boolean) => void;
}

const recommendedProducts = {
  recommend: [
    {
      id: 'pazzo',
      name: 'PAZZO 直筒率性大口袋長褲 (米杏色)',
      sub: '補齊低飽和亮色缺口 ｜ 騎士適用',
      img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&auto=format&fit=crop&q=80',
      price: '$690',
      aff: 'group8_pazzo_pants_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_pazzo_pants_aff. 正在模擬跳轉 PAZZO 並計入小組導購金！'
    },
    {
      id: 'uniqlo',
      name: 'UNIQLO 寬鬆九分休閒打褶褲 (燕麥色)',
      sub: '提亮暗色衣櫃 ｜ 極簡百搭',
      img: 'https://images.unsplash.com/photo-1481325545291-b46b42411b24?w=200&auto=format&fit=crop&q=80',
      price: '$990',
      aff: 'group8_uniqlo_pants_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_uniqlo_pants_aff. 正在模擬跳轉 UNIQLO 成功！'
    },
    {
      id: 'nb',
      name: 'New Balance 經典復古運動板鞋 (元祖灰/燕麥拼接)',
      sub: '豐富鞋履色彩層次 ｜ 通勤首選',
      img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200&auto=format&fit=crop&q=80',
      price: '$2,480',
      aff: 'group8_nb_shoes_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_nb_shoes_aff. 正在模擬跳轉 Nb 官方商城！'
    },
    {
      id: 'robinmay',
      name: 'ROBINMAY 經典皮革斜背小包 (奶茶色)',
      sub: '注入溫柔大地色調 ｜ 附雙背帶',
      img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a490?w=200&auto=format&fit=crop&q=80',
      price: '$1,880',
      aff: 'group8_robinmay_bag_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_robinmay_bag_aff. 正在模擬跳轉門市！'
    },
    {
      id: 'klassic',
      name: 'KlassiC. 俐落極簡圓框墨鏡 (茶色鏡片)',
      sub: '最後一哩溫柔色點綴 ｜ 抗UV400',
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&auto=format&fit=crop&q=80',
      price: '$1,280',
      aff: 'group8_klassic_glasses_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_klassic_glasses_aff. 正在跳轉 KlassiC.！'
    }
  ],
  budget: [
    {
      id: 'pazzo_pants_apricot',
      name: 'PAZZO 直筒率性大口袋長褲 (米杏色)',
      sub: '補齊低飽和亮色缺口 ｜ 騎士適用',
      img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&auto=format&fit=crop&q=80',
      price: '$690',
      aff: 'group8_pazzo_pants_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_pazzo_pants_aff. 正在跳轉 PAZZO 官網模擬渠道！'
    },
    {
      id: 'uniqlo_pants_oat',
      name: 'UNIQLO 寬鬆九分休閒打褶褲 (燕麥色)',
      sub: '提亮暗色衣櫃 ｜ 極簡百搭',
      img: 'https://images.unsplash.com/photo-1481325545291-b46b42411b24?w=200&auto=format&fit=crop&q=80',
      price: '$990',
      aff: 'group8_uniqlo_pants_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_uniqlo_pants_aff. 已累計小組導購傭金！'
    },
    {
      id: 'shopee_bag',
      name: '蝦皮精選 韓系大容量尼龍托特包 (亚麻绿)',
      sub: '豐富包袋色彩層次 ｜ 防潑水機能',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80',
      price: '$390',
      aff: 'group8_shopee_bag_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_shopee_bag_aff. 正在跳轉蝦皮購物模擬渠道！'
    },
    {
      id: 'canvas_shoes',
      name: 'Air Space 輕日系休閒帆布鞋 (純白拼接)',
      sub: '小資校園百搭首選 ｜ 柔軟舒適',
      img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&auto=format&fit=crop&q=80',
      price: '$550',
      aff: 'group8_canvas_shoes_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_canvas_shoes_aff. 正在模擬領取 Air Space 折價券！'
    },
    {
      id: 'muji_slippers',
      name: 'MUJI 無印良品 舒適休閒人字拖 (燕麥色)',
      sub: '極簡提亮居家戶外兩用 ｜ 輕便好走',
      img: 'https://images.unsplash.com/photo-1603487214641-fc6def4274c7?w=200&auto=format&fit=crop&q=80',
      price: '$290',
      aff: 'group8_muji_slippers_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_muji_slippers_aff. 正在前往無印良品！'
    }
  ],
  premium: [
    {
      id: 'stussy_sweatshirt',
      name: 'Stussy 經典重磅衛衣 (奶茶色)',
      sub: '注入溫柔大地色調 ｜ 街頭百搭',
      img: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=200&auto=format&fit=crop&q=80',
      price: '$3,280',
      aff: 'group8_stussy_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_stussy_aff. 正在模擬跳轉精品潮流電商！'
    },
    {
      id: 'nb_shoes_oat',
      name: 'New Balance 經典復古運動板鞋 (元祖灰/燕麥拼接)',
      sub: '豐富鞋履色彩層次 ｜ 通勤首選',
      img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200&auto=format&fit=crop&q=80',
      price: '$2,480',
      aff: 'group8_nb_shoes_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_nb_shoes_aff. 正在模擬跳轉 Nb 官方商城！'
    },
    {
      id: 'coach_bag',
      name: 'Coach 經典老花皮革皮革腋下包 (暖焦糖色)',
      sub: '點綴大地色系衣櫃 ｜ 精緻耐看',
      img: 'https://images.unsplash.com/photo-1614170324245-7dd78186c627?w=200&auto=format&fit=crop&q=80',
      price: '$12,500',
      aff: 'group8_coach_bag_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_coach_bag_aff. 正在安全引導至 COACH 中！'
    },
    {
      id: 'gm_sunglasses',
      name: 'Gentle Monster 俐落無框太陽眼鏡 (香檳棕)',
      sub: '最後一哩溫柔色點綴 ｜ 抗UV400',
      img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop&q=80',
      price: '$7,800',
      aff: 'group8_gm_glasses_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_gm_glasses_aff. 正在跳轉 Gentle Monster 模擬門店！'
    },
    {
      id: 'arcteryx_jacket',
      name: 'Arc\'teryx Beta LT 機能防水外套 (岩石沙色)',
      sub: '打破極致純黑單調 ｜ 頂級 GORE-TEX',
      img: 'https://images.unsplash.com/photo-1508441112485-3a0b544c3846?w=200&auto=format&fit=crop&q=80',
      price: '$14,500',
      aff: 'group8_arcteryx_aff',
      toast: '【分潤帶入成功】已加載分潤參數: group8_arcteryx_aff. 正在模擬跳轉始祖鳥官網渠道！'
    }
  ]
};

export default function PhoneSimulator({
  isDark,
  selectedMobileTab,
  setSelectedMobileTab,
  currentWeather,
  selectedDay,
  isRiderMode,
  wardrobe,
  showToast,
  importUrl,
  setImportUrl,
  importStatus,
  handleUrlImport,
  simulatePhotoUpload,
  isUploading,
  resellingItem,
  setResellingItem,
  resaleCondition,
  setResaleCondition,
  customPrice,
  handlePublishSecondHand,
  isProSubscribed,
  setIsProSubscribed,
  eduEmail,
  setEduEmail,
  eduCodeSent,
  setEduCodeSent,
  eduVerified,
  setEduVerified,
  todayOOTDSets,
  marketplaceItems,
  marketStatusText,
  handleLiquidateItem,
  lastListTime,
  setLastListTime,
  isOver24HoursSimulated,
  setIsOver24HoursSimulated
}: PhoneSimulatorProps) {

  const [isCalendarExpanded, setIsCalendarExpanded] = React.useState<boolean>(false);
  const [isGreetingExpanded, setIsGreetingExpanded] = React.useState<boolean>(false);
  const [isOutfitExpanded, setIsOutfitExpanded] = React.useState<boolean>(false);
  const [liveTime, setLiveTime] = React.useState<Date>(new Date());
  
  // Newly added states for premium mannequin interface redesign
  const [gender, setGender] = React.useState<'male' | 'female'>('female');
  const [seed, setSeed] = React.useState<number>(0);
  const [activeOutfitIndex, setActiveOutfitIndex] = React.useState<number>(0);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [isCalendarPageOpen, setIsCalendarPageOpen] = React.useState<boolean>(false);
  const [generatingPhase, setGeneratingPhase] = React.useState<string>('idle');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [isLinkModalOpen, setIsLinkModalOpen] = React.useState<boolean>(false);
  const [budgetFilter, setBudgetFilter] = React.useState<'recommend' | 'budget' | 'premium'>('recommend');

  // Campus second-hand marketplace states
  const [bazaarSelectedItem, setBazaarSelectedItem] = React.useState<any | null>(null);
  const [likedProductIds, setLikedProductIds] = React.useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState<boolean>(false);
  const [shippingTab, setShippingTab] = React.useState<'meetup' | 'delivery'>('meetup');
  const [isChatting, setIsChatting] = React.useState<boolean>(false);
  const [chatMessages, setChatMessages] = React.useState<Array<{ sender: 'user' | 'seller'; text: string; time: string }>>([]);
  const [chatInputText, setChatInputText] = React.useState<string>('');

  // iOS-style appraisal modal local states (no emojis, premium design)
  const [valuingItem, setValuingItem] = React.useState<WardrobeItem | null>(null);
  const [valuingCondition, setValuingCondition] = React.useState<'brand_new' | 'like_new' | 'gently_used'>('like_new');
  const [valuingPriceInput, setValuingPriceInput] = React.useState<string>('0');

  const triggerValuation = (item: WardrobeItem) => {
    setValuingItem(item);
    setValuingCondition('like_new');
    const estimated = Math.max(150, Math.round(item.originalPrice * 0.5));
    setValuingPriceInput(estimated.toString());
  };

  const changeValuingCondition = (cond: 'brand_new' | 'like_new' | 'gently_used') => {
    setValuingCondition(cond);
    if (!valuingItem) return;
    let factor = 0.5;
    if (cond === 'brand_new') factor = 0.7;
    if (cond === 'gently_used') factor = 0.3;
    const estimated = Math.max(150, Math.round(valuingItem.originalPrice * factor));
    setValuingPriceInput(estimated.toString());
  };

  const toggleLike = (id: string) => {
    const isLiked = likedProductIds.has(id);
    setLikedProductIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    if (isLiked) {
      showToast("已從收藏清單移除");
    } else {
      showToast("已成功加入收藏清單");
    }
  };

  const getConditionDescription = (item: any) => {
    if (!item) return "";
    const name = item.name || "";
    if (name.includes("大衣") || name.includes("風衣") || name.includes("外套")) {
      return "良好防風保暖硬挺感，九成新，僅穿過兩次，無污漬、無起毛球、微落肩版型。無論文山雨天抗冷或舍我樓室內強冷空調都極度推薦合穿。";
    }
    if (name.includes("毛衣") || name.includes("針織") || name.includes("連帽")) {
      return "九五新，無任何勾紗或脫線，手感軟糯完全不扎膚。版型舒適微寬鬆，衣物平時皆平鋪常規保養。面料保養極好，非常適合大學校園生活課堂百搭。";
    }
    if (name.includes("短袖") || name.includes("T-Shirt") || name.includes("上衣")) {
      return "九成新，僅下水洗過一次。純棉舒適、無褪色、領口依舊緊塞無鬆散。親膚透氣，在大學校園日常搭配中極具好感，乾淨無任何污損。";
    }
    return "九成新、僅穿過兩次、無污漬、無起毛球、微落肩版型。穿著乾淨整潔，平時均妥善摺疊收納於通風衣櫃中，面交前皆會進行乾淨熨整。";
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recalculates 5 outfits carousel options dynamically from modern pre-designed and custom-added wardrobe parts
  const carouselSets = React.useMemo(() => {
    // Filter currently registered items
    const tops = wardrobe.filter(i => i.category === 'Tops');
    const bottoms = wardrobe.filter(i => i.category === 'Bottoms');
    const outers = wardrobe.filter(i => i.category === 'Outerwear');
    const shoes = wardrobe.filter(i => i.category === 'Footwear');

    // Premium styling fallbacks
    const fallbackTops = [
      { id: 'fb_t1', name: 'PAZZO 簡約寬鬆純棉短版上衣', category: 'Tops', subCategory: '短袖 T-Shirt', imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&auto=format&fit=crop&q=80', colorName: '純淨白', colorHex: '#FFFFFF' },
      { id: 'fb_t2', name: 'UNIQLO 寬鬆落肩連帽上衣', category: 'Tops', subCategory: '衛衣/帽衫', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80', colorName: '霧灰色', colorHex: '#9E9E9E' },
      { id: 'fb_t3', name: '韓國設計落肩條紋針織衫', category: 'Tops', subCategory: '針織衫', imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&auto=format&fit=crop&q=80', colorName: '海軍藍/白', colorHex: '#1D2F44' },
      { id: 'fb_t4', name: 'PAZZO 直條紋翻領硬挺襯衫', category: 'Tops', subCategory: '襯衫', imageUrl: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=400&auto=format&fit=crop&q=80', colorName: '天藍色', colorHex: '#AED8F2' }
    ];

    const fallbackBottoms = [
      { id: 'fb_b1', name: '經典高腰合身直筒牛仔褲', category: 'Bottoms', subCategory: '牛仔褲', imageUrl: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&auto=format&fit=crop&q=80', colorName: '單寧藍', colorHex: '#4A6984' },
      { id: 'fb_b2', name: '極簡修身百搭卡其長褲', category: 'Bottoms', subCategory: '卡其長褲', imageUrl: 'https://images.unsplash.com/photo-1475180098004-ca77a66827ae?w=400&auto=format&fit=crop&q=80', colorName: '大地卡其', colorHex: '#C3B091' },
      { id: 'fb_b3', name: '高彈性速乾運動九分褲', category: 'Bottoms', subCategory: '運動長褲', imageUrl: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=400&auto=format&fit=crop&q=80', colorName: '深碳灰', colorHex: '#2E2E2E' }
    ];

    const fallbackOuters = [
      { id: 'fb_o1', name: '極簡防風立領機能夾克', category: 'Outerwear', subCategory: '防風夾克', imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&auto=format&fit=crop&q=80', colorName: '軍綠色', colorHex: '#3F4E26' },
      { id: 'fb_o2', name: '復古落肩牛仔工裝外套', category: 'Outerwear', subCategory: '牛仔夾克', imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&auto=format&fit=crop&q=80', colorName: '深牛仔藍', colorHex: '#2B3E52' }
    ];

    const fallbackShoes = [
      { id: 'fb_s1', name: '經典復古全白皮面小白鞋', category: 'Footwear', subCategory: '板鞋', imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&auto=format&fit=crop&q=80', colorName: '經典白', colorHex: '#FFFFFF' },
      { id: 'fb_s2', name: '專業緩震科技網面慢跑鞋', category: 'Footwear', subCategory: '跑鞋', imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=80', colorName: '酷跑黑', colorHex: '#121212' }
    ];

    const activeTops = tops.length > 0 ? tops : fallbackTops;
    const activeBottoms = bottoms.length > 0 ? bottoms : fallbackBottoms;
    const activeOuters = outers.length > 0 ? outers : fallbackOuters;
    const activeShoes = shoes.length > 0 ? shoes : fallbackShoes;

    const getRandomItem = (arr: any[], indexModifier: number) => {
      const idx = Math.abs((seed * 7 + indexModifier * 13) % arr.length);
      return arr[idx];
    };

    const planTitles = [
      gender === 'female' ? "晴空甜美少女系搭" : "美式常春藤雅痞搭",
      "輕量高流動體育速乾型",
      "文山深夜強禦寒防風搭",
      "Z世代校園文青棉感休閒",
      "課堂發表得體 Smart Casual"
    ];

    const planDescriptions = [
      `專為週${selectedDay === 'monday' ? '一常規英文教室強空調' : selectedDay === 'wednesday' ? '三體育課高強度運動量' : '五管理學院專題報告'}特製。`,
      "兼顧透氣性與速乾布料，在世新綜合運動場奔跑毫無拘束感。",
      "防夜風與突降文山雨雙重疊穿，極佳防風力能完美應對景美夜市出行。",
      "純棉親膚自然落肩感，適合在麥當勞聚會、通宵小組討論與日常通識課。",
      "信心加倍的正式商務便裝，優雅得體，在成果發表及教授會面時完美展現！"
    ];

    const plans = [];
    for (let i = 0; i < 5; i++) {
      const top = getRandomItem(activeTops, i + 1);
      const bottom = getRandomItem(activeBottoms, i + 3);
      const outer = (i % 2 === 0 || currentWeather === 'cold') ? getRandomItem(activeOuters, i + 5) : null;
      const shoes = getRandomItem(activeShoes, i + 7);
      
      const score = 88 + Math.abs((seed * 3 + i * 11) % 12);

      plans.push({
        id: `carousel_set_${i}`,
        title: planTitles[i],
        desc: planDescriptions[i],
        score,
        top,
        bottom,
        outer,
        shoes
      });
    }

    return plans;
  }, [wardrobe, gender, selectedDay, currentWeather, isRiderMode, seed]);

  const getAIGreeting = () => {
    const hours = liveTime.getHours();
    if (hours >= 5 && hours < 12) {
      return {
        text: '早安，今天也要加油！',
        sub: '今日早八：建議著裝快捷乾淨，10 秒完成。',
        timeLabel: '晨光時刻',
        bgColor: 'from-amber-100 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10',
        longText: '早晨好！今天的早八是體力與精神的雙重考驗。Remix AI 已特別為您篩選高流動排汗、利於快速起身的輕便搭配。'
      };
    } else if (hours >= 12 && hours < 18) {
      return {
        text: '午安，悠閒的午後！',
        sub: '舒適風格提案：輕量配飾、溫和風雅。',
        timeLabel: '暖陽午後',
        bgColor: 'from-sky-100 to-sky-50 dark:from-sky-950/20 dark:to-sky-950/10',
        longText: '午安！課堂外微風煦煦。午後紫外線稍強或體感略溫，可選用清爽的直筒長褲，並於出門時外搭防曬外套，即可維持全天候舒適。'
      };
    } else {
      return {
        text: '晚安，記得早點休息唷～',
        sub: '睡前小記：明日行事曆已備，祝您好夢.。,',
        timeLabel: '星夜寧靜',
        bgColor: 'from-indigo-100 to-slate-50 dark:from-indigo-950/20 dark:to-slate-950/10',
        longText: '晚安！期待明天的精彩簡報或運動課堂。今晚可在 Remix 衣櫥內提早預覽搭好「30s 免挑穿搭」方案，明日睡飽飽再自信出門。'
      };
    }
  };

  // Newly added AI 30s match simulator loop
  const handle30sMatch = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGeneratingPhase('正在檢驗文山區即時大氣氣溫...');
    
    setTimeout(() => {
      setGeneratingPhase('篩選安全係數並排斥騎士危險長外套...');
    }, 400);

    setTimeout(() => {
      setGeneratingPhase('根據世新今日課表與日誌最佳化疊加及評分...');
    }, 800);

    setTimeout(() => {
      setIsGenerating(false);
      const nextIdx = (activeOutfitIndex + 1) % 5;
      setActiveOutfitIndex(nextIdx);
      const nextSet = carouselSets[nextIdx] || carouselSets[0];
      showToast(`30s 免挑穿搭秒選完畢！已為虛擬人體模特兒推薦「${nextSet.title || '校園推薦'}」組合！`);
    }, 1250);
  };

  const countByCategory = (cat: WardrobeItem['category']) => 
    wardrobe.filter(i => i.category === cat).length;

  const topsCount = countByCategory('Tops');
  const bottomsCount = countByCategory('Bottoms');
  const outerwearCount = countByCategory('Outerwear');
  const footwearCount = countByCategory('Footwear');
  const bagsCount = countByCategory('Bags');
  const jewelryCount = countByCategory('Jewelry') + countByCategory('Scarves') + countByCategory('Headwear');

  const overallTotal = (topsCount + bottomsCount + outerwearCount + footwearCount + bagsCount + jewelryCount) || 1;

  const topPct = Math.round((topsCount / overallTotal) * 100);
  const bottomPct = Math.round((bottomsCount / overallTotal) * 100);
  const outerPct = Math.round((outerwearCount / overallTotal) * 100);
  const footwearPct = Math.round((footwearCount / overallTotal) * 100);
  const bagsPct = Math.round((bagsCount / overallTotal) * 100);
  const jewelryPct = 100 - (topPct + bottomPct + outerPct + footwearPct + bagsPct);

  const hasStyleGap = bottomPct < 20 || (footwearPct + bagsPct) < 15;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full text-center mb-5">
        <span className={`text-xs uppercase tracking-widest font-black block border rounded-full py-2 px-5 max-w-fit mx-auto shadow-md transition-all duration-300 ${
          isDark 
            ? 'text-amber-300 bg-white/5 border-white/10' 
            : 'text-amber-700 bg-amber-50 border-amber-200'
        }`}>
          📱 「校園智慧穿搭顧問」App 手機動態模擬
        </span>
        <p className={`text-[11px] mt-1.5 font-sans transition-colors duration-300 ${
          isDark ? 'text-neutral-400' : 'text-slate-500'
        }`}>
          此處為真實互動 React 原型，隨您的沙盒變數即時過濾演練
        </p>
      </div>

      {/* HIGH-FIDELITY IPHONE SIMULATOR CONTAINER WITH FROSTED GLASS EFFECTS */}
      <div className={`relative w-full max-w-[365px] h-[720px] rounded-[55px] border-[10px] border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col backdrop-blur-2xl transition-all duration-300 ${
        isDark ? 'bg-neutral-950/80' : 'bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]'
      }`}>
        
        {/* Dynamic Island Header Decor */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-full z-45 flex items-center justify-between px-3.5 border border-white/5 shadow-inner">
          <span className="text-[9px] font-bold font-mono text-white/90">08:00</span>
          <div className="w-3.5 h-3.5 rounded-full bg-black/60 border border-blue-500/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow shadow-blue-500"></div>
          </div>
        </div>

        {/* IOS BATTERY AND NETWORK BAR */}
        <div className={`px-6 pt-[38px] pb-2 flex items-center justify-between text-[10px] font-mono z-30 shrink-0 border-b transition-colors duration-300 ${
          isDark 
            ? 'bg-black/40 text-neutral-400 border-white/5' 
            : 'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
          <span>世新大學 SHU-Wifi</span>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className={`w-4.5 h-2.5 rounded-sm relative p-0.5 border ${
              isDark ? 'bg-neutral-700/50 border-neutral-600' : 'bg-slate-205 border-slate-300'
            }`}>
              <div className="h-full bg-amber-400 rounded-2xs" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* VIEWPORT CONTROLLER VIEW SWAPPER */}
        <div className={`flex-grow ${selectedMobileTab === 'wardrobe' ? 'overflow-hidden' : 'overflow-y-auto'} scrollbar-none flex flex-col p-4 shadow-inner transition-colors duration-300 relative ${
          isDark ? 'bg-neutral-950/40' : 'bg-slate-50'
        }`}>
          
          {/* 1. SCREEN: HOME PAGE */}
          {selectedMobileTab === 'home' && (
            <div className="flex-grow flex flex-col justify-between relative select-none animate-fadeIn h-full overflow-hidden">
              
              {/* TOP HEADER: DYNAMIC IOS MINIMAL TIME GREETING */}
              <div className="text-center py-2 shrink-0 border-b border-slate-100 dark:border-neutral-900 -mx-4 px-4 bg-transparent transition-colors duration-300">
                <span className={`text-[10px] font-bold tracking-wide block transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {(() => {
                    const month = liveTime.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
                    const day = liveTime.getDate();
                    const hours = liveTime.getHours();
                    const minutes = String(liveTime.getMinutes()).padStart(2, '0');
                    
                    let period = '早上';
                    if (hours >= 12 && hours < 18) {
                      period = '下午';
                    } else if (hours >= 18) {
                      period = '晚上';
                    }
                    
                    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
                    const formattedHours = String(displayHours).padStart(2, '0');
                    const timeStr = `${period} ${formattedHours}:${minutes}`;
                    
                    let greetingMsg = '早安，今天想穿什麼？';
                    if (hours >= 12 && hours < 18) {
                      greetingMsg = '午安，下午輕鬆穿搭！';
                    } else if (hours >= 18) {
                      greetingMsg = '晚安，今晚配好穿搭囉！';
                    }
                    
                    return `${month} ${day} · ${timeStr} / ${greetingMsg}`;
                  })()}
                </span>
              </div>

              {/* HORIZONTAL UTILITY BUTTONS (FORMERLY FLOATING RIGHT BUTTONS) */}
              <div className="flex justify-center items-center gap-5 py-2 shrink-0 z-20">
                {/* 1. TIME (CLOCK) */}
                <button 
                  id="float_btn_time"
                  onClick={() => {
                    showToast("⏰ 正在模擬嘗試開啟手機內建「時鐘/鬧鐘」App... (實機中可透過 clock:// URL Schema 喚起)");
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 hover:scale-105 border cursor-pointer ${
                    isDark 
                      ? 'bg-neutral-900 border-white/10 text-amber-400' 
                      : 'bg-white border-slate-200 text-amber-600 m-0'
                  }`}
                  title="手機鬧鐘同步"
                >
                  <Clock className="w-4 h-4" />
                </button>

                {/* 2. WEATHER */}
                <button 
                  id="float_btn_weather"
                  onClick={() => {
                    showToast("⛈️ 正在模擬嘗試開啟手機內建「天氣」App... (實機中可透過 weather:// URL Schema 喚起)");
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 hover:scale-105 border cursor-pointer ${
                    isDark 
                      ? 'bg-neutral-900 border-white/10 text-amber-400' 
                      : 'bg-white border-slate-200 text-amber-600 m-0'
                  }`}
                  title="即時天氣"
                >
                  {currentWeather === 'sunny' && <Sun className="w-4 h-4 text-amber-500" />}
                  {currentWeather === 'rainy' && <CloudRain className="w-4 h-4 text-blue-500 animate-pulse" />}
                  {currentWeather === 'cold' && <Cloud className="w-4 h-4 text-indigo-450" />}
                </button>

                {/* 3. CALENDAR (OPENS OVERLAY SHOWN BELOW) */}
                <button 
                  id="float_btn_calendar"
                  onClick={() => setIsCalendarPageOpen(true)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 hover:scale-105 border cursor-pointer ${
                    isDark 
                      ? 'bg-neutral-900 border-white/10 text-amber-400' 
                      : 'bg-white border-slate-200 text-slate-800 m-0'
                  }`}
                  title="世新課表與行事曆"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>

              {/* GENDER SWITCH TOGGLE */}
              <div className="flex justify-center py-1 shrink-0 z-20">
                <div className={`p-0.5 rounded-full flex border text-[10px] font-black tracking-wider transition-all duration-300 ${
                  isDark ? 'bg-neutral-950 border-white/5' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button 
                    id="btn_gender_male"
                    onClick={() => {
                      setGender('male');
                      setActiveOutfitIndex(0); // Reset index to first
                      showToast("換裝成功：已更換為【男生 3D 智能模特兒其貼身純白貼身內著款式】！");
                    }}
                    className={`px-5 py-1 rounded-full transition-all duration-300 font-bold cursor-pointer ${
                      gender === 'male' 
                        ? '!bg-neutral-900 !text-white font-black shadow-sm'
                        : '!bg-transparent !text-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    男生
                  </button>
                  <button 
                    id="btn_gender_female"
                    onClick={() => {
                      setGender('female');
                      setActiveOutfitIndex(0); // Reset index to first
                      showToast("換裝成功：已更換為【女生 3D 智能模特兒其純白運動內著款式】！");
                    }}
                    className={`px-5 py-1 rounded-full transition-all duration-300 font-bold cursor-pointer ${
                      gender === 'female' 
                        ? '!bg-neutral-900 !text-white font-black shadow-sm'
                        : '!bg-transparent !text-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    女生
                  </button>
                </div>
              </div>

              {/* MAIN VISUAL CENTER: EXQUISITE VIRTUAL MANNEQUIN MODEL WITH LUXURY GRADIENT GLASS BOX-SHADOW */}
              <div className="flex-grow flex flex-col justify-center items-center py-1 relative">
                
                {/* MANNEQUIN CANVAS CARD (NO HARSH BLACK BORDER, SOFT BOX SHADOW ELEVATED LAYER) */}
                <div className={`w-full max-w-[311px] h-[348px] relative rounded-[28px] overflow-visible flex flex-col justify-between p-3 transition-all duration-300 ${
                  isDark 
                    ? 'bg-neutral-900/60 text-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.35)]' 
                    : 'bg-white text-slate-800 shadow-[0_15px_45px_rgba(0,0,0,0.04)]'
                }`}>
                  
                  {/* Subtle Background Artistry Grid */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none rounded-[28px]"></div>

                  {/* SLIDER ARROW CORNERS (iOS CHIC NO-BACKGROUND MINIMAL LINES) */}
                  <button 
                    id="btn_prev_outfit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveOutfitIndex(prev => (prev - 1 + 5) % 5);
                    }}
                    className={`absolute left-[2px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center active:scale-95 transition-all cursor-pointer z-35 ${
                      isDark 
                        ? 'text-neutral-400 hover:text-amber-400' 
                        : 'text-slate-400 hover:text-slate-800'
                    }`}
                    title="上一套"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2]" />
                  </button>
                  <button 
                    id="btn_next_outfit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveOutfitIndex(next => (next + 1) % 5);
                    }}
                    className={`absolute right-[2px] top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center active:scale-95 transition-all cursor-pointer z-35 ${
                      isDark 
                        ? 'text-neutral-400 hover:text-amber-400' 
                        : 'text-slate-400 hover:text-slate-800'
                    }`}
                    title="下一套"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2]" />
                  </button>

                  {/* Mannequin Rating and Label */}
                  <div className="flex justify-between items-center z-10 shrink-0">
                    <span className="text-[9.5px] font-black tracking-tight text-amber-600 dark:text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                      推薦 {activeOutfitIndex + 1}/5：{carouselSets[activeOutfitIndex]?.title || '首選搭配組'}
                    </span>
                    <span className="text-[9px] font-mono font-extrabold bg-amber-400 text-neutral-950 px-1.5 py-0.5 rounded-md shadow-sm">
                      匹配度 {carouselSets[activeOutfitIndex]?.score || 95}%
                    </span>
                  </div>

                  {/* Elegant Mannequin Silhouette Draw & Clothes Layering */}
                  <div className="flex-grow flex items-center justify-center relative w-full my-1 z-10 h-[240px]">
                    
                    {/* SVG Streamlined Humanoid Mannequin Body Area */}
                    <div className="w-[82px] h-[210px] select-none pointer-events-none z-10">
                      <svg className="w-full h-full text-neutral-300 dark:text-neutral-700 fill-current" viewBox="0 0 100 240" fill="none">
                        <defs>
                          <radialGradient id="grad-3d-body" cx="50%" cy="40%" r="50%" fx="30%" fy="30%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="60%" stopColor="#E2E8F0" />
                            <stop offset="100%" stopColor="#94A3B8" />
                          </radialGradient>
                          <radialGradient id="grad-3d-body-dark" cx="50%" cy="40%" r="50%" fx="30%" fy="30%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="65%" stopColor="#1E293B" />
                            <stop offset="100%" stopColor="#0F172A" />
                          </radialGradient>
                        </defs>

                        {/* Streamlined Humanoid Silhouette based on user's gender selection */}
                        {gender === 'female' ? (
                          <>
                            {/* Head & Neck */}
                            <ellipse cx="50" cy="22" rx="7.5" ry="9" fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="0.5" />
                            <path d="M46.5 30 Q50 33 53.5 30 L52.5 37 L47.5 37 Z" fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="0.5" />

                            {/* Torso & Legs (Curvy, elegant Female aspect ratio - Continuous silhouette without jagged bits) */}
                            <path d="M 50,37 
                                     C 45,37 38,40 35,46 
                                     C 32,53 35,68 38,74 
                                     C 40,78 41,88 39.5,96 
                                     C 38,103 33.5,108 33.5,122 
                                     C 33.5,135 38.5,152 38.5,167 
                                     C 38.5,182 35.5,199 35.5,235 
                                     L 43.5,235 
                                     C 44.5,197 46,177 48.5,152 
                                     L 51.5,152 
                                     C 54,177 55.5,197 56.5,235 
                                     L 64.5,235 
                                     C 64.5,199 61.5,182 61.5,167 
                                     C 61.5,152 66.5,135 66.5,122 
                                     C 66.5,108 62,103 60.5,96 
                                     C 59,88 60,78 62,74 
                                     C 65,68 68,53 65,46 
                                     C 62,40 55,37 50,37 Z" 
                                  fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} 
                                  stroke={isDark ? "#475569" : "#cbd5e1"} 
                                  strokeWidth="0.5" 
                            />

                            {/* Elegant Female Arms styled in 3D harmony */}
                            <path d="M 34,47 C 30,53 27,67 27,91 C 27,105 25,115 26,124 C 27,125 29,125 29.5,122 L 29.5,96 C 29.5,77 31,61 35,50 Z" 
                                  fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} 
                                  stroke={isDark ? "#475569" : "#cbd5e1"} 
                                  strokeWidth="0.5" 
                            />
                            <path d="M 66,47 C 70,53 73,67 73,91 C 73,105 75,115 74,124 C 73,125 71,125 70.5,122 L 70.5,96 C 70.5,77 69,61 65,50 Z" 
                                  fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} 
                                  stroke={isDark ? "#475569" : "#cbd5e1"} 
                                  strokeWidth="0.5" 
                            />

                            {/* Underwear Overlay (Sports Vest / shorts) */}
                            <path d="M 34.5,56 
                                     C 39,59 44,61 50,61 
                                     C 56,61 61,59 65.5,56 
                                     C 66,64 65,74 63.5,77 
                                     C 58.5,79 41.5,79 36.5,77 
                                     C 35,74 34,64 34.5,56 Z" 
                                  fill="#FFFFFF" 
                                  stroke="#E2E8F0" 
                                  strokeWidth="0.75" 
                            />
                            <path d="M 38,47 L 38,56 M 62,47 L 62,56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                            
                            {/* Female Boy-shorts */}
                            <path d="M 33.8,111 
                                     C 39,109 50,109 50,109 
                                     C 50,109 61,109 66.2,111 
                                     C 66.7,121 64.5,132 61.8,135 
                                     C 56.8,137 43.2,137 38.2,135 
                                     C 35.5,132 33.3,121 33.8,111 Z" 
                                  fill="#FFFFFF" 
                                  stroke="#E2E8F0" 
                                  strokeWidth="0.75" 
                            />
                          </>
                        ) : (
                          <>
                            {/* Head & Neck */}
                            <ellipse cx="50" cy="22" rx="8" ry="10" fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="0.5" />
                            <path d="M46 31 Q50 34 54 31 L53 37 L47 37 Z" fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} stroke={isDark ? "#475569" : "#cbd5e1"} strokeWidth="0.5" />

                            {/* Torso & Legs (Broad Shoulder athletics Male - smooth contour without block shapes) */}
                            <path d="M 50,37 
                                     C 43,37 33,39 30,45 
                                     C 27,51 31,68 35,74 
                                     C 38,78 39,89 38,97 
                                     C 37,105 34.5,110 34.5,122 
                                     C 34.5,135 39,152 40,167 
                                     C 40,182 37,199 37,235 
                                     L 45,235 
                                     C 46,197 47.5,177 49,152 
                                     L 51,152 
                                     C 52.5,177 54,197 55,235 
                                     L 63,235 
                                     C 63,199 60,182 60,167 
                                     C 61,152 65.5,135 65.5,122 
                                     C 65.5,110 63,105 62,97 
                                     C 61,89 62,78 65,74 
                                     C 69,68 73,51 70,45 
                                     C 67,39 57,37 50,37 Z" 
                                  fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} 
                                  stroke={isDark ? "#475569" : "#cbd5e1"} 
                                  strokeWidth="0.5" 
                            />

                            {/* Athletic Male Arms */}
                            <path d="M 29,45 C 24,52 20.5,67 20.5,95 C 20.5,109 18.5,118 19.5,127 C 20.5,128 23,128 24,125 L 24,99 C 24,75 26,58 30,48 Z" 
                                  fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} 
                                  stroke={isDark ? "#475569" : "#cbd5e1"} 
                                  strokeWidth="0.5" 
                            />
                            <path d="M 71,45 C 76,52 79.5,67 79.5,95 C 79.5,109 81.5,118 80.5,127 C 79.5,128 77,128 76,125 L 76,99 C 76,75 74,58 70,48 Z" 
                                  fill={isDark ? "url(#grad-3d-body-dark)" : "url(#grad-3d-body)"} 
                                  stroke={isDark ? "#475569" : "#cbd5e1"} 
                                  strokeWidth="0.5" 
                            />

                            {/* Male Sleeveless Tank Top */}
                            <path d="M 31,45 
                                     C 37,48 43,49 50,49 
                                     C 57,49 63,48 69,45 
                                     C 69.5,54 68,74 65,82 
                                     C 59.5,84 40.5,84 35,82 
                                     C 32,74 30.5,54 31,45 Z" 
                                  fill="#FFFFFF" 
                                  stroke="#E2E8F0" 
                                  strokeWidth="0.75" 
                            />
                            <path d="M 34.5,39 L 34.5,46 M 65.5,39 L 65.5,46" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                            {/* Male Boxer Briefs */}
                            <path d="M 34.2,108 
                                     C 42,106 58,106 65.8,108 
                                     C 66,118 64.5,130 62,136 
                                     L 52,136 L 50,126 L 48,136 
                                     L 38,136 
                                     C 35.5,130 34,118 34.2,108 Z" 
                                  fill="#FFFFFF" 
                                  stroke="#E2E8F0" 
                                  strokeWidth="0.75" 
                            />
                          </>
                        )}
                      </svg>
                    </div>

                    {/* Elegant Thin Neon Guides Connecting overlay cards to the central Body targets */}
                    <svg className="absolute inset-0 w-full h-full stroke-current pointer-events-none z-15 text-amber-500/50" viewBox="0 0 100 100" fill="none">
                      {/* 1. Outerwear Anchor: top-left card bottom right (X=28, Y=22) to Left shoulder (X=42, Y=27) */}
                      {carouselSets[activeOutfitIndex]?.outer && (
                        <path d="M 28 22 Q 35 24 42 27" stroke="#D97706" strokeWidth="0.5" strokeDasharray="2,2" />
                      )}
                      {/* 2. Tops Anchor: top-right card bottom left (X=72, Y=22) to chest center (X=50, Y=33) */}
                      <path d="M 72 22 Q 61 24 50 33" stroke="#D97706" strokeWidth="0.5" strokeDasharray="2,2" />
                      {/* 3. Bottoms Anchor: bottom-left card center right (X=30, Y=58) to thighs/hips (X=44, Y=58) */}
                      <path d="M 30 58 Q 37 58 44 58" stroke="#D97706" strokeWidth="0.5" strokeDasharray="2,2" />
                      {/* 4. Footwear Anchor: bottom-right card center left (X=70, Y=58) to feet (X=53, Y=80) */}
                      <path d="M 70 58 Q 60 68 53 80" stroke="#D97706" strokeWidth="0.5" strokeDasharray="2,2" />
                    </svg>

                    {/* FOUR ROUNDED CORNER CARD SLOTS SURROUNDING THE MANNEQUIN SILHOUETTE (DENSE CARD 10% LARGER, SHIFTED INWARD BY 15%) */}
                    
                    {/* A. Outerwear Card (Top-Left Gutter) */}
                    <div id="card_outerwear" className="absolute left-[18px] top-[12px] z-20">
                      {carouselSets[activeOutfitIndex]?.outer ? (
                        <div className={`p-1 rounded-lg border shadow-md flex flex-col justify-between transition-all duration-300 ${
                          isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white border-slate-150'
                        }`} style={{ width: '84px', height: '102px' }}>
                          <div className="relative h-16 w-full bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden shrink-0">
                            <img 
                              src={carouselSets[activeOutfitIndex].outer.imageUrl} 
                              className="w-full h-full object-cover object-center" 
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getFallbackImage('Outerwear');
                              }}
                            />
                            <span className="absolute bottom-0.5 left-0.5 bg-amber-400 text-neutral-950 text-[6.5px] font-black px-0.5 rounded">外搭</span>
                          </div>
                          <span className={`text-[8.5px] font-bold block truncate leading-tight pr-0.5 transition-colors duration-300 ${
                            isDark ? '!text-neutral-200' : '!text-slate-800'
                          }`}>
                            {carouselSets[activeOutfitIndex].outer.name}
                          </span>
                        </div>
                      ) : (
                        <div className={`p-1 rounded-lg border shadow flex flex-col items-center justify-center opacity-65 ${
                          isDark ? 'bg-neutral-900/40 border-dashed border-white/5' : 'bg-slate-50/50 border-dashed border-slate-200'
                        }`} style={{ width: '84px', height: '102px' }}>
                          <span className="text-[12px]">☀️</span>
                          <span className={`text-[7.5px] mt-0.5 font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>免穿外搭</span>
                        </div>
                      )}
                    </div>

                    {/* B. Top Card (Top-Right Gutter) */}
                    <div id="card_tops" className="absolute right-[18px] top-[12px] z-20">
                      <div className={`p-1 rounded-lg border shadow-md flex flex-col justify-between transition-all duration-300 ${
                        isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white border-slate-150'
                      }`} style={{ width: '84px', height: '102px' }}>
                        <div className="relative h-16 w-full bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden shrink-0">
                          <img 
                            src={carouselSets[activeOutfitIndex]?.top?.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100'} 
                            className="w-full h-full object-cover object-center" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getFallbackImage('Tops');
                            }}
                          />
                          <span className="absolute bottom-0.5 left-0.5 bg-amber-400 text-neutral-950 text-[6.5px] font-black px-0.5 rounded">上著</span>
                        </div>
                        <span className={`text-[8.5px] font-bold block truncate leading-tight pr-0.5 transition-colors duration-300 ${
                          isDark ? '!text-neutral-200' : '!text-slate-800'
                        }`}>
                          {carouselSets[activeOutfitIndex]?.top?.name || '裝束上衫'}
                        </span>
                      </div>
                    </div>

                    {/* C. Bottoms Card (Bottom-Left Gutter) */}
                    <div id="card_bottoms" className="absolute left-[18px] top-[125px] z-20">
                      <div className={`p-1 rounded-lg border shadow-md flex flex-col justify-between transition-all duration-300 ${
                        isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white border-slate-150'
                      }`} style={{ width: '84px', height: '102px' }}>
                        <div className="relative h-16 w-full bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden shrink-0">
                          <img 
                            src={carouselSets[activeOutfitIndex]?.bottom?.imageUrl || 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100'} 
                            className="w-full h-full object-cover object-center" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getFallbackImage('Bottoms');
                            }}
                          />
                          <span className="absolute bottom-0.5 left-0.5 bg-amber-400 text-neutral-950 text-[6.5px] font-black px-0.5 rounded">下著</span>
                        </div>
                        <span className={`text-[8.5px] font-bold block truncate leading-tight pr-0.5 transition-colors duration-300 ${
                          isDark ? '!text-neutral-200' : '!text-slate-800'
                        }`}>
                          {carouselSets[activeOutfitIndex]?.bottom?.name || '直筒褲裝'}
                        </span>
                      </div>
                    </div>

                    {/* D. Footwear Card (Bottom-Right Gutter) */}
                    <div id="card_footwear" className="absolute right-[18px] top-[125px] z-20">
                      <div className={`p-1 rounded-lg border shadow-md flex flex-col justify-between transition-all duration-300 ${
                        isDark ? 'bg-neutral-900/95 border-white/10' : 'bg-white border-slate-150'
                      }`} style={{ width: '84px', height: '102px' }}>
                        <div className="relative h-16 w-full bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden shrink-0">
                          <img 
                            src={carouselSets[activeOutfitIndex]?.shoes?.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'} 
                            className="w-full h-full object-cover object-center" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getFallbackImage('Footwear');
                            }}
                          />
                          <span className="absolute bottom-0.5 left-0.5 bg-amber-400 text-neutral-950 text-[6.5px] font-black px-0.5 rounded">鞋履</span>
                        </div>
                        <span className={`text-[8.5px] font-bold block truncate leading-tight pr-0.5 transition-colors duration-300 ${
                          isDark ? '!text-neutral-200' : '!text-slate-800'
                        }`}>
                          {carouselSets[activeOutfitIndex]?.shoes?.name || '百搭版鞋'}
                        </span>
                      </div>
                    </div>

                    {/* DYNAMIC SHUFFLING OVERLAY SCANNING ON ACTIVE RECOMMENDER MATCH */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/95 dark:bg-neutral-950/98 z-40 rounded-[28px] flex flex-col items-center justify-center p-3 animate-scaleUp">
                        <Sparkles className="w-9 h-9 text-amber-500 animate-spin mb-2" />
                        <span className="text-[11px] font-black tracking-widest text-[#B45309] dark:text-amber-400">
                          世新 30s 免挑秒配中
                        </span>
                        <span className="text-[7.5px] font-mono text-neutral-400 mt-1 block tracking-wider animate-pulse">
                          {generatingPhase}
                        </span>
                        
                        <div className="w-32 h-1 bg-slate-205 dark:bg-neutral-800 rounded-full overflow-hidden mt-3.5 relative">
                          <div className="h-full bg-amber-400 animate-shimmer" style={{ width: '100%', transition: 'width 1.2s' }}></div>
                        </div>

                        {/* Laser glowing line representing high precision AI scanning */}
                        <div className="absolute inset-x-2 h-0.5 bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-bounce z-50"></div>
                      </div>
                    )}

                  </div>

                  {/* Selected Plan Short Description with No Unnecessary Subtitles */}
                  <div className={`p-2 rounded-xl text-center z-10 shrink-0 text-[9.5px] font-medium leading-relaxed ${
                    isDark ? 'bg-black/35 text-neutral-300' : 'bg-slate-50 text-slate-600'
                  }`}>
                    「{carouselSets[activeOutfitIndex]?.desc || '優質校園風搭配'}」
                  </div>

                </div>

              </div>

              {/* Set Page Dot Indicators */}
              <div className="flex justify-center gap-1.5 my-1 shrink-0 z-10">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveOutfitIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeOutfitIndex === idx 
                        ? 'bg-amber-400 w-4.5' 
                        : 'bg-neutral-300 dark:bg-neutral-700 w-1.5'
                    }`}
                  />
                ))}
              </div>

              {/* REFRESH SETS ACTION BUTTON - iOS CAPSULE STYLE */}
              <div className="py-2 shrink-0 flex justify-center z-10">
                <button 
                  onClick={() => {
                    setSeed(prev => prev + 1);
                    setActiveOutfitIndex(0);
                    showToast("🌀 已為您一鍵重新連線，更換 5 套全新 AI 隨機混搭組合！");
                  }}
                  className={`px-6 py-2 rounded-full border text-[11px] font-black tracking-widest flex items-center gap-1.5 active:scale-[0.95] hover:scale-[1.02] transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.03)] duration-200 ${
                    isDark 
                      ? 'bg-neutral-900/90 hover:bg-neutral-850 border-white/10 text-amber-400 hover:text-amber-300' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-amber-800 hover:text-amber-900'
                  }`}
                >
                  <span className="text-sm">🔄</span>
                  都不喜歡？點我全套刷新！
                </button>
              </div>

              {/* CORE BOTTOM CONTROLLER ACTION BUTTON (AI 智能 30秒免挑穿搭) */}
              <div className="p-1.5 shrink-0 z-10 mt-1">
                <button
                  id="btn_ai_30s_outfit"
                  onClick={handle30sMatch}
                  className="w-full bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 dark:bg-amber-400 dark:border-amber-300 dark:hover:bg-amber-500 text-white dark:text-neutral-950 rounded-2xl py-3 px-4 shadow-xl flex items-center justify-center gap-2.5 transition-all text-xs font-black tracking-wider cursor-pointer active:scale-98 select-none"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 dark:text-neutral-950 animate-pulse" />
                  <span>AI 智能 30 秒免挑穿搭</span>
                </button>
              </div>
            </div>
          )}

          {/* HIGH-FIDELITY SLIDE-OUT INDEPENDENT SCHEDULE OVERLAY Drawer */}
          {isCalendarPageOpen && (
                <div 
                  id="ios_calendar_sheet"
                  className={`absolute inset-0 z-50 flex flex-col animate-slideInRight ${
                    isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-slate-800'
                  }`}
                >
                  {/* Calendar Sheet Header */}
                  <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-400 text-neutral-950 p-1.5 rounded-xl">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black font-display tracking-tight block">世新大學智慧行事曆課程表</span>
                        <span className="text-[7.5px] font-mono text-neutral-400 block">SHU CAMPUS PLANNER & COORDINATION</span>
                      </div>
                    </div>
                    {/* Modern close button resembling native iOS close sheets */}
                    <button 
                      onClick={() => setIsCalendarPageOpen(false)}
                      className="w-7 h-7 rounded-full bg-slate-100 dark:bg-neutral-900 flex items-center justify-center text-xs font-bold font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-all"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Calendar details */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    
                    {/* Interactive Selector instructions */}
                    <div className="p-2.5 rounded-xl bg-amber-450/5 border border-amber-400/20 text-[10.5px] leading-relaxed text-slate-600 dark:text-neutral-300 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p>
                        <strong>跨日穿搭預演沙盒</strong>：點選日程可與左側規格控溫器同步加乘演算法。文山校區多變天候自動納入。
                      </p>
                    </div>

                    <span className="text-[8.5px] font-black text-neutral-400 uppercase tracking-widest block font-mono">
                      📅 本週世新指定課表排程
                    </span>

                    {/* Campus schedule list */}
                    <div className="space-y-3">
                      
                      {/* Monday Schedule Item */}
                      <div 
                        onClick={() => {
                          showToast("已鎖定週一「常規普通英文課」日程，智慧穿衣系統自動載入空調防寒薄外套機制！");
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.015] ${
                          selectedDay === 'monday' 
                            ? 'border-amber-400 bg-amber-400/[0.03] shadow-md dark:bg-amber-400/[0.05]' 
                            : 'border-slate-150 bg-white dark:bg-neutral-900 dark:border-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-black flex items-center gap-1.5 text-slate-800 dark:text-neutral-100">
                            週一 ‧ 常規英文課
                            {selectedDay === 'monday' && <span className="text-[7px] bg-amber-400 text-neutral-950 py-0.2 px-1 rounded font-black font-sans uppercase">選定中</span>}
                          </span>
                          <span className="text-[8.5px] font-mono text-neutral-400">08:10 - 10:00</span>
                        </div>
                        <p className="text-[9.5px] text-neutral-500 dark:text-neutral-400">
                          上課教室：普通大樓 R403 教室（世新英語核心必修）
                        </p>
                        <div className="mt-1.5 flex gap-1.5">
                          <span className="text-[8px] bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md text-neutral-500 text-[80%] font-semibold">強冷教室空調</span>
                          <span className="text-[8px] bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md text-neutral-500 text-[80%] font-semibold">薄外搭推薦</span>
                        </div>
                      </div>

                      {/* Wednesday Schedule Item */}
                      <div 
                        onClick={() => {
                          showToast("已鎖定週三「羽球體育課」日程，安全穿搭系統自動提醒避穿大裙，改搭速乾短褲！");
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.015] ${
                          selectedDay === 'wednesday' 
                            ? 'border-amber-400 bg-amber-400/[0.03] shadow-md dark:bg-amber-400/[0.05]' 
                            : 'border-slate-150 bg-white dark:bg-neutral-900 dark:border-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-black flex items-center gap-1.5 text-slate-800 dark:text-neutral-100">
                            週三 ‧ 羽球體育課
                            {selectedDay === 'wednesday' && <span className="text-[7px] bg-amber-400 text-neutral-955 py-0.2 px-1 rounded font-black font-sans uppercase">選定中</span>}
                          </span>
                          <span className="text-[8.5px] font-mono text-neutral-400">08:10 - 10:00</span>
                        </div>
                        <p className="text-[9.5px] text-neutral-500 dark:text-neutral-400">
                          上課教室：體育館 3F 綜合羽球場 (必選修羽球課)
                        </p>
                        <div className="mt-1.5 flex gap-1.5">
                          <span className="text-[8px] bg-red-400/10 text-red-500 px-2 py-0.5 rounded-md text-[80%] font-semibold">避穿窄寬裙</span>
                          <span className="text-[8px] bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md text-neutral-500 text-[80%] font-semibold">極高運動量</span>
                        </div>
                      </div>

                      {/* Friday Schedule Item */}
                      <div 
                        onClick={() => {
                          showToast("已鎖定週五「專題簡報口試」重要日程，系統全面載入正式得體 Smart Casual 首選！");
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.015] ${
                          selectedDay === 'friday' 
                            ? 'border-amber-400 bg-amber-400/[0.03] shadow-md dark:bg-amber-400/[0.05]' 
                            : 'border-slate-150 bg-white dark:bg-neutral-900 dark:border-white/5'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-black flex items-center gap-1.5 text-slate-800 dark:text-neutral-100">
                            週五 ‧ 專題報告口試
                            {selectedDay === 'friday' && <span className="text-[7px] bg-amber-400 text-neutral-950 py-0.2 px-1 rounded font-black font-sans uppercase">選定中</span>}
                          </span>
                          <span className="text-[8.5px] font-mono text-neutral-400">10:10 - 12:00</span>
                        </div>
                        <p className="text-[9.5px] text-neutral-500 dark:text-neutral-400">
                          上課教室：管理學院大樓 T501 展示簡報廳 (期末大會)
                        </p>
                        <div className="mt-1.5 flex gap-1.5">
                          <span className="text-[8px] bg-amber-600/10 text-amber-600 px-2 py-0.5 rounded-md text-[80%] font-semibold">得體商務風格</span>
                          <span className="text-[8px] bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md text-neutral-500 text-[80%] font-semibold">評審印象分</span>
                        </div>
                      </div>

                    </div>

                    {/* Informative calendar calendar facts */}
                    <div className={`p-3 rounded-2xl text-[9.5px] leading-relaxed border ${
                      isDark ? 'bg-neutral-900/40 border-white/5 text-neutral-400' : 'bg-slate-50 border-slate-150 text-slate-500'
                    }`}>
                      <p className="font-extrabold text-slate-800 dark:text-slate-205">🎓 2026 世新大學第一學假行事曆提示：</p>
                      <p className="mt-1">
                        文山區常年相對濕度 85%，降雨機率預設與台灣氣象署(CWA)介接。AI 同步偵測騎士模式與防雨穿戴組合，保護課業自信出門！
                      </p>
                    </div>

                  </div>

                  {/* Bottom Back Button */}
                  <div className="p-4 border-t border-slate-100 dark:border-white/5 shrink-0">
                    <button 
                      onClick={() => setIsCalendarPageOpen(false)}
                      className="w-full bg-amber-400 hover:bg-amber-305 text-neutral-950 text-xs py-2.5 rounded-xl font-bold font-sans cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                    >
                      返回穿搭大廳主頁 ⏎
                    </button>
                  </div>
                </div>
              )}

          {/* 2. SCREEN: DIGITAL WARDROBE (CLOSET) */}
          {selectedMobileTab === 'wardrobe' && (
            <div className="h-full w-full overflow-hidden flex flex-col justify-start animate-fadeIn space-y-4">
              
              {/* WARDROBE HEADER */}
              <div className="px-4 pt-2">
                <h1 className="text-xl font-bold text-black tracking-tight text-left">
                  智慧數位衣櫃
                </h1>
              </div>

              {/* AI SIMULATION INGEST ACTIONS */}
              <div className="grid grid-cols-2 gap-2 px-4 shrink-0">
                <button
                  id="btn_sim_camera_phone"
                  onClick={simulatePhotoUpload}
                  disabled={isUploading}
                  className="bg-neutral-800 hover:bg-neutral-700 active:scale-98 text-stone-100 border border-neutral-700/60 rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all text-[11px] font-black select-none cursor-pointer disabled:opacity-50 h-10"
                >
                  <span className="text-xs">📸</span> 拍照錄入衣櫃
                </button>
                <button
                  id="btn_sim_url_phone_trigger"
                  onClick={() => setIsLinkModalOpen(true)}
                  className="bg-neutral-800 hover:bg-neutral-700 active:scale-98 text-stone-100 border border-neutral-700/60 rounded-xl py-2 flex items-center justify-center gap-1.5 transition-all text-[11px] font-black select-none cursor-pointer h-10"
                >
                  <span className="text-xs">🔗</span> 連結自動錄入
                </button>
              </div>

              {/* iOS MODAL FOR LINK IMPORT */}
              {isLinkModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
                  {/* Backdrop overlay listener to close when clicking outside */}
                  <div 
                    className="absolute inset-0 cursor-default" 
                    onClick={() => setIsLinkModalOpen(false)}
                  />
                  
                  {/* Modal card content */}
                  <div className="relative bg-white w-full max-w-xs rounded-[24px] p-6 shadow-xl border border-neutral-100 flex flex-col gap-4 z-10 text-neutral-800 transform scale-100 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                      <span className="text-xs font-bold tracking-wide text-neutral-900 flex items-center gap-1.5">
                        <span>🔗</span> 連結自動解析錄入
                      </span>
                      <button 
                        onClick={() => setIsLinkModalOpen(false)}
                        className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-full hover:bg-neutral-100 transition flex items-center justify-center cursor-pointer border-0 bg-transparent"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                      請貼上商品（如 蝦皮 / PAZZO）超連結，以自動下載圖片與去背解析：
                    </p>

                    {/* Input Field */}
                    <div className="space-y-1">
                      <input 
                        id="input_url_phone_sim"
                        type="text" 
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-400 transition"
                        placeholder="請貼上商品網址..."
                        value={importUrl}
                        onChange={(e) => setImportUrl(e.target.value)}
                        autoFocus
                      />
                    </div>

                    {/* Footer buttons */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button 
                        onClick={() => setIsLinkModalOpen(false)}
                        className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer border-0"
                      >
                        取消
                      </button>
                      <button 
                        id="btn_sim_url_phone"
                        onClick={(e) => {
                          handleUrlImport(e);
                          setIsLinkModalOpen(false);
                        }}
                        disabled={importStatus === 'fetching' || importStatus === 'background_removing'}
                        className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-150 disabled:text-neutral-400 !text-white text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer border-0"
                      >
                        {importStatus === 'fetching' || importStatus === 'background_removing' ? '解析中...' : '開始解析'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CURRENT CLOSET INVENTORY LIST */}
              {/* iOS CAPSULE SPEC CATEGORY CHANGER */}
              <div className="space-y-1 shrink-0">
                <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-widest block px-4">分類篩選：</span>
                <div 
                  className="w-full overflow-x-auto flex flex-row flex-nowrap gap-2 py-3 px-4 scroll-smooth [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300 shrink-0 select-none"
                >
                  {[
                    { id: 'All', name: '全部' },
                    { id: 'Outerwear', name: '外套' },
                    { id: 'Tops', name: '上衣' },
                    { id: 'Bottoms', name: '下著' },
                    { id: 'Footwear', name: '鞋履' },
                    { id: 'Jewelry', name: '首飾' },
                    { id: 'Bags', name: '包包' },
                    { id: 'Scarves', name: '圍巾' },
                    { id: 'Headwear', name: '帽子' }
                  ].map((item) => {
                    const isActive = selectedCategory === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`btn_cat_filter_${item.id}`}
                        onClick={() => {
                          setSelectedCategory(item.id);
                        }}
                        className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-black tracking-wider rounded-full border-0 cursor-pointer transition-all duration-350 ${
                          isActive
                            ? '!bg-black !text-white shadow-sm transform scale-102'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CLOTHES LIST DISPLAY CONTAINER WITH INDEPENDENT SCROLL */}
              <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3 min-h-0">
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] font-bold text-neutral-300">
                    {selectedCategory === 'All' ? '衣櫥庫存' : `分類推薦`} ({
                      wardrobe.filter(item => selectedCategory === 'All' || item.category === selectedCategory).length
                    } 件)
                  </span>
                  <span className="text-[9px] text-neutral-500 font-mono">下滑查看超時閒置提醒</span>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pb-1 flex-grow">
                  {(() => {
                    const filtered = selectedCategory === 'All' 
                      ? wardrobe 
                      : wardrobe.filter(item => item.category === selectedCategory);
                    
                    if (filtered.length === 0) {
                      return (
                        <div className="col-span-2 py-8 text-center text-[10px] text-neutral-400 font-medium">
                          📭 目前此分類無任何衣物配件
                        </div>
                      );
                    }

                    return filtered.map(item => (
                      <div key={item.id} className={`glass-card hover:border-white/15 p-2 rounded-xl border border-white/5 flex flex-col justify-between relative group animate-fadeIn transition-all ${item.isReselling ? 'opacity-55' : ''}`}>
                        
                        <div className="relative h-20 w-full mb-1.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden border border-white/5">
                          <img 
                            src={item.imageUrl} 
                            className="w-full h-full object-cover object-center" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getFallbackImage(item.category);
                            }}
                          />
                          
                          {/* Source icon pill */}
                          <span className="absolute bottom-1 left-1 bg-black/75 !text-white text-[7px] font-semibold px-1 rounded backdrop-blur">
                            {item.source}
                          </span>
                        </div>

                        <span className={`text-[9.5px] truncate block font-semibold mb-1 ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>
                          {item.name}
                        </span>
                        
                        <div className={`flex justify-between items-center mt-1 pt-1 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
                          <span className={`text-[7.5px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0 ${isDark ? 'text-neutral-300 bg-neutral-800 border border-white/5' : 'text-neutral-600 bg-neutral-100'}`}>
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.colorHex }} />
                            {item.colorName}
                          </span>
                          
                          {/* If unused, trigger resale */}
                          {item.isReselling ? (
                            <span className="text-[7.5px] bg-amber-450 text-neutral-950 font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm shrink-0 uppercase tracking-tight animate-pulse">
                              轉賣中
                            </span>
                          ) : item.lastWornDaysAgo >= 90 ? (
                            <button 
                              id={`btn_resale_phone_${item.id}`}
                              onClick={() => {
                                triggerValuation(item);
                              }}
                              className="text-[8px] bg-amber-400 text-neutral-950 font-black px-1.5 py-0.5 rounded shadow hover:bg-amber-300 transition-colors cursor-pointer border-0"
                            >
                              轉現
                            </button>
                          ) : item.lastWornDaysAgo >= 30 ? (
                            <span className="text-[7.5px] bg-red-500 !text-white font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm animate-pulse shrink-0">
                              閒置 {item.lastWornDaysAgo}d
                            </span>
                          ) : (
                            <span className="text-[8px] text-neutral-500 font-mono">worn {item.lastWornDaysAgo}d</span>
                          )}
                        </div>

                      </div>
                    ));
                  })()}
                </div>
              </div>

            </div>
          )}

          {/* 3. SCREEN: CAPSULE STYLE REPORT INDEX */}
          {selectedMobileTab === 'reports' && (
            <div className="space-y-4 flex-grow flex flex-col justify-start animate-fadeIn">
              
              <div className="glass-card p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300 block mb-0.5">數位大師穿搭大盤分析</span>
                <h4 className="text-xs font-black text-white">衣櫃「缺口」風格診斷</h4>
              </div>

              {/* VISUAL COMPOSITION DATA LIST */}
              <div className="glass-card p-3 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10.5px] text-neutral-200 font-extrabold block">【全衣櫥風格配比分析】</span>
                
                <div className="grid grid-cols-3 gap-1.5 font-sans">
                  <div className={`p-1.5 rounded-xl text-center border select-none ${isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <div className="text-[8.5px] font-semibold opacity-70">上裝</div>
                    <div className="text-[10.5px] font-extrabold mt-0.5 text-amber-300">{topsCount}件 ({topPct}%)</div>
                  </div>
                  <div className={`p-1.5 rounded-xl text-center border select-none ${isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <div className="text-[8.5px] font-semibold opacity-70">下裝</div>
                    <div className={`text-[10.5px] font-extrabold mt-0.5 ${bottomPct < 20 ? 'text-red-400' : 'text-emerald-400'}`}>{bottomsCount}件 ({bottomPct}%)</div>
                  </div>
                  <div className={`p-1.5 rounded-xl text-center border select-none ${isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <div className="text-[8.5px] font-semibold opacity-70">外套</div>
                    <div className="text-[10.5px] font-extrabold mt-0.5 text-amber-500">{outerwearCount}件 ({outerPct}%)</div>
                  </div>
                  <div className={`p-1.5 rounded-xl text-center border select-none ${isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <div className="text-[8.5px] font-semibold opacity-70">鞋履</div>
                    <div className="text-[10.5px] font-extrabold mt-0.5 text-indigo-400">{footwearCount}件 ({footwearPct}%)</div>
                  </div>
                  <div className={`p-1.5 rounded-xl text-center border select-none ${isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <div className="text-[8.5px] font-semibold opacity-70">包包</div>
                    <div className="text-[10.5px] font-extrabold mt-0.5 text-pink-400">{bagsCount}件 ({bagsPct}%)</div>
                  </div>
                  <div className={`p-1.5 rounded-xl text-center border select-none ${isDark ? 'bg-neutral-900/50 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-700'}`}>
                    <div className="text-[8.5px] font-semibold opacity-70">首飾</div>
                    <div className="text-[10.5px] font-extrabold mt-0.5 text-teal-400">{jewelryCount}件 ({jewelryPct}%)</div>
                  </div>
                </div>
              </div>

              {/* RECOMMENDED DIRECT SPONSOR BUY INKS */}
              <div className="space-y-2 mt-3">
                <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-widest block">智慧推薦導購（享有 5% 返佣）：</span>
                
                {/* Budget Preference Tabs */}
                <div className="flex gap-1.5 pb-1 overflow-x-auto no-scrollbar">
                  <button
                    id="btn_budget_filter_rec"
                    onClick={() => {
                      setBudgetFilter('recommend');
                      showToast('已切換至：智能推薦');
                    }}
                    className={`rounded-full px-3 py-1 text-[9.5px] transition-all shrink-0 border-0 cursor-pointer ${
                      budgetFilter === 'recommend'
                        ? 'bg-neutral-900 text-white !text-white font-medium border border-white/10 shadow-sm'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 font-bold'
                    }`}
                  >
                    智能推薦
                  </button>
                  <button
                    id="btn_budget_filter_low"
                    onClick={() => {
                      setBudgetFilter('budget');
                      showToast('已切換至：平價小資');
                    }}
                    className={`rounded-full px-3 py-1 text-[9.5px] transition-all shrink-0 border-0 cursor-pointer ${
                      budgetFilter === 'budget'
                        ? 'bg-neutral-900 text-white !text-white font-medium border border-white/10 shadow-sm'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 font-bold'
                    }`}
                  >
                    平價小資
                  </button>
                  <button
                    id="btn_budget_filter_high"
                    onClick={() => {
                      setBudgetFilter('premium');
                      showToast('已切換至：輕奢品牌');
                    }}
                    className={`rounded-full px-3 py-1 text-[9.5px] transition-all shrink-0 border-0 cursor-pointer ${
                      budgetFilter === 'premium'
                        ? 'bg-neutral-900 text-white !text-white font-medium border border-white/10 shadow-sm'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 font-bold'
                    }`}
                  >
                    輕奢品牌
                  </button>
                </div>

                <div className="flex flex-col gap-2.5">
                  {recommendedProducts[budgetFilter].map((item) => (
                    <div 
                      key={item.id}
                      className="glass-card p-2 border border-white/5 rounded-xl flex items-center justify-between gap-2 shadow hover:bg-white/5 transition-colors"
                    >
                      <img 
                        src={item.img} 
                        className="w-10 h-10 object-cover object-center rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-white/10 shrink-0" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImage(item.sub || item.name);
                        }}
                      />
                      <div className="flex-grow min-w-0">
                        <span className="text-[9.5px] font-extrabold text-neutral-200 block truncate">{item.name}</span>
                        <span className="text-[8px] text-neutral-450 block font-mono">{item.sub}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono text-amber-300 font-bold block">{item.price}</span>
                        <button 
                          id={`btn_aff_jump_phone_${item.id}`}
                          onClick={() => showToast(item.toast)}
                          className="bg-amber-400 hover:bg-amber-300 !text-neutral-900 font-bold text-[8.5px] px-2.5 py-1 rounded flex items-center justify-center gap-0.5 mt-1 border-0 cursor-pointer shadow-sm transition-all"
                        >
                          購買 ↗
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 4. SCREEN: CAMPUS SECOND-HAND BAZAAR */}
          {selectedMobileTab === 'bazaar' && (
            <div className="flex-grow flex flex-col justify-start relative animate-fadeIn h-full">
              
              {bazaarSelectedItem ? (
                /* PRODUCT DETAIL VIEW (PREMIUM HIGH-CONTRAST DARK THEME) */
                <div className="absolute inset-0 bg-slate-900 p-4 overflow-y-auto scrollbar-none text-slate-100 flex flex-col select-none z-30 animate-fadeIn">
                  
                  {/* Top Bar with back button */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3 shrink-0">
                    <button 
                      id="btn_bazaar_detail_back"
                      onClick={() => setBazaarSelectedItem(null)}
                      className="flex items-center gap-1.5 text-slate-300 hover:text-white font-extrabold text-[12px] border-0 bg-transparent cursor-pointer py-1"
                    >
                      <ChevronLeft className="w-4.5 h-4.5" />
                      返回市集大廳
                    </button>
                    <span className="text-[10px] text-slate-400 font-bold">世新面交專區</span>
                  </div>

                  {/* Clear Large Image */}
                  <div className="-mx-4 mb-4 relative h-80 bg-slate-950 overflow-hidden border-b border-slate-800 shrink-0">
                    <img 
                      src={bazaarSelectedItem.imageUrl} 
                      className="w-full h-full object-cover object-center" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white font-extrabold text-[8px] tracking-wider px-2.5 py-0.5 rounded-full uppercase">
                      SHU MARKET
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="space-y-4 pb-20 flex-grow">
                    
                    {/* Basic Information */}
                    <div className="space-y-1.5 text-left">
                      <h3 className="text-sm font-black text-white leading-snug">{bazaarSelectedItem.name}</h3>
                      <div className="flex items-baseline gap-1 pt-0.5">
                        <span className="text-lg font-mono font-black text-amber-400">${bazaarSelectedItem.price}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">NTD</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[9px] text-slate-400 font-bold font-mono">
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200 font-sans">{bazaarSelectedItem.department}</span>
                        <span>•</span>
                        <span>上架時間：{bazaarSelectedItem.timeText}</span>
                      </div>
                    </div>

                    {/* Condition descriptions */}
                    <div className="space-y-1.5 text-left">
                      <span className="text-[10px] text-white font-extrabold uppercase tracking-wide block">詳細情況說明：</span>
                      <div className="bg-slate-800 rounded-2xl p-4 mt-2 text-slate-200 text-[10.5px] leading-relaxed font-medium">
                        {getConditionDescription(bazaarSelectedItem)}
                      </div>
                    </div>

                    {/* Shipping and Meetup settings */}
                    <div className="space-y-2 pt-1 pb-4 text-left">
                      <span className="text-[10px] text-white font-extrabold uppercase tracking-wide block">配送與交易方式選擇：</span>
                      
                      {/* Tabs Selection Selector */}
                      <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setShippingTab('meetup')}
                          className={`py-1.5 text-[10px] rounded-lg font-black text-center transition-all cursor-pointer border-0 ${
                            shippingTab === 'meetup' 
                              ? 'bg-white text-slate-900 shadow-sm' 
                              : 'text-slate-400 hover:text-slate-200 bg-transparent'
                          }`}
                        >
                          校園面交
                        </button>
                        <button
                          type="button"
                          onClick={() => setShippingTab('delivery')}
                          className={`py-1.5 text-[10px] rounded-lg font-black text-center transition-all cursor-pointer border-0 ${
                            shippingTab === 'delivery' 
                              ? 'bg-white text-slate-900 shadow-sm' 
                              : 'text-slate-400 hover:text-slate-200 bg-transparent'
                          }`}
                        >
                          店到店寄件
                        </button>
                      </div>

                      {/* Tab Content Display Area */}
                      <div className="bg-slate-800 p-3 rounded-xl min-h-[56px] text-[10.5px] text-slate-200 leading-relaxed font-sans">
                        {shippingTab === 'meetup' ? (
                          <div className="space-y-1">
                            <span className="text-emerald-400 font-extrabold block">面交代收（無任何手續費，支持面交驗貨）：</span>
                            <span className="text-slate-300">世新面交預設地點：世新大門口、言論廣場、舍我樓地下室。課間前後十分鐘皆可配合交收。</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="text-indigo-400 font-extrabold block">超商二代店到店寄送：</span>
                            <span className="text-slate-300">店到店包裝寄件運費 NT$ +60 元。買家完成付款後 24 小時內安排快遞寄出。</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* STICKY BOTTOM FUNCTION BAR */}
                  <div className="w-full sticky bottom-0 left-0 bg-slate-900/90 backdrop-blur border-t border-slate-800 p-4 flex gap-3 z-50 -mx-4 -mb-4 shrink-0 justify-between items-center">
                    <button
                      type="button"
                      onClick={() => toggleLike(bazaarSelectedItem.id)}
                      className="aspect-square w-12 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 cursor-pointer border-0 transition-colors shrink-0"
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          likedProductIds.has(bazaarSelectedItem.id) 
                            ? 'fill-red-500 text-red-500 animate-scaleUp' 
                            : 'text-slate-300 hover:text-red-500'
                        }`} 
                      />
                    </button>

                    <button
                      type="button"
                      id="btn_bazaar_contact"
                      onClick={() => {
                        setIsChatting(true);
                        const defaultMsg = `嗨！我對你的【${bazaarSelectedItem.name}】有興趣，這堂課下課方便在舍我樓面交嗎？`;
                        setChatMessages([
                          { sender: 'seller', text: '你好！對的，這件衣服現在還可以交易。', time: '現在' }
                        ]);
                        setChatInputText(defaultMsg);
                      }}
                      className="flex-1 bg-amber-400 text-slate-900 font-bold py-3 rounded-full text-center hover:bg-amber-350 cursor-pointer transition-all border-0 text-[11.5px] font-black"
                    >
                      聯絡賣家
                    </button>
                  </div>

                </div>
              ) : (
                /* BAZAAR OVERVIEW LIST SCREEN (LIGHT PATTERN) */
                <div className="space-y-4 flex-grow flex flex-col justify-start text-slate-800 pb-12">
                  
                  {/* Header Zone */}
                  <div className="text-center py-0.5 space-y-1">
                    <span className="text-[8.5px] uppercase tracking-widest text-amber-600 font-black block">
                      世新大學專區專屬
                    </span>
                    <h4 className="text-[13px] font-black text-slate-900 tracking-tight">
                      校園二手跳蚤市集
                    </h4>
                    <div className="flex justify-center">
                      <span className="text-[7.5px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        無中介面交
                      </span>
                    </div>
                  </div>

                  {/* 24-Hour Re-awakening/Resell Guidance logic */}
                  {lastListTime !== null && !isOver24HoursSimulated ? (
                    <div className="bg-emerald-50 border border-emerald-150 py-2.5 px-3 rounded-xl text-center shadow-inner animate-fadeIn">
                      <span className="text-[9px] font-extrabold text-emerald-700 block tracking-wide">
                        成功將 1 件閒置物投入世新市集救援！
                      </span>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-3.5 rounded-xl text-center border border-slate-200/50 animate-fadeIn">
                      <span className="text-[9.5px] text-slate-600 block leading-relaxed font-bold">
                        {isOver24HoursSimulated 
                          ? "距離您上次整理已超過 24 小時，衣櫥內可能又有可以轉賣的衣服囉！"
                          : "目前沒有救援中的閒置物。您可以隨時在衣櫥內點點 閒置標籤 發起二手智慧轉賣！"
                        }
                      </span>
                    </div>
                  )}

                  {/* Simulation Controller */}
                  {lastListTime !== null && (
                    <div className="flex justify-end pr-1 text-[8px] text-slate-400 gap-1.5 items-center">
                      <span className="font-bold">模擬時間：</span>
                      <button 
                        type="button"
                        onClick={() => setIsOver24HoursSimulated(!isOver24HoursSimulated)}
                        className="bg-slate-100 hover:bg-slate-200 text-amber-700 font-black px-2 py-0.5 rounded border border-slate-200 transition-all text-[7.5px]"
                      >
                        {isOver24HoursSimulated ? "切回上架未滿 24 小時" : "模擬已上架過 24 小時"}
                      </button>
                    </div>
                  )}

                  {/* MARKET LIVE FEED ROW */}
                  <div className="space-y-2 flex-grow flex flex-col">
                    <span className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider block">
                      {showFavoritesOnly ? "我的收藏清單：" : "世新大學課間即時交易大廳看板："}
                    </span>
                    
                    <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1 scrollbar-none flex-grow">
                      {(() => {
                        const itemsToShow = showFavoritesOnly 
                          ? marketplaceItems.filter(item => likedProductIds.has(item.id))
                          : marketplaceItems;
                        
                        if (itemsToShow.length === 0) {
                          return (
                            <div className="bg-slate-100/50 border border-slate-200/60 rounded-2xl p-6 text-center animate-fadeIn py-8">
                              <Heart className="w-8 h-8 text-slate-300 mx-auto mb-2 font-light" />
                              <p className="text-[10px] text-slate-500 font-bold">
                                {showFavoritesOnly ? "目前收藏庫空空如也" : "暫無對應交易物品"}
                              </p>
                              <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">
                                {showFavoritesOnly 
                                  ? "在大廳看中哪件衣服，點擊卡片右上角的愛心隨時收入收藏專區！" 
                                  : "等待世新同學發起校園智慧二手估價救援！"
                                }
                              </p>
                            </div>
                          );
                        }

                        return itemsToShow.map((item) => (
                          <div 
                            key={item.id} 
                            onClick={() => setBazaarSelectedItem(item)}
                            className="bg-white border border-slate-150 hover:border-amber-450 hover:shadow-md p-2.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer animate-fadeIn"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-grow">
                              <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0">
                                <img src={item.imageUrl} className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                              </div>
                              <div className="leading-snug min-w-0 flex-grow">
                                <span className="text-[10.5px] font-black text-slate-900 block truncate">{item.name}</span>
                                <span className="text-[8px] text-slate-500 block truncate mt-0.5 font-mono">{item.department} ‧ {item.timeText}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between self-stretch shrink-0 pl-2">
                              {/* Small upper corner Heart */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLike(item.id);
                                }}
                                className="p-1 -mr-1 -mt-1 text-slate-400 hover:text-red-500 transition-colors bg-transparent border-0 cursor-pointer shrink-0"
                              >
                                <Heart className={`w-4 h-4 ${likedProductIds.has(item.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                              </button>
                              <span className="text-[10px] font-mono text-amber-600 font-bold mt-1 shrink-0">${item.price} NTD</span>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* FLOATING ACTION BIG HEART SWITCH BUTTON IN BAZAAR HOME RIGHT LOWER CORNER */}
                  <button
                    type="button"
                    id="btn_bazaar_favorites_toggle"
                    onClick={() => {
                      setShowFavoritesOnly(!showFavoritesOnly);
                    }}
                    className={`absolute bottom-4 right-4 z-40 w-12 h-12 rounded-full shadow-lg border flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                      showFavoritesOnly 
                        ? 'bg-red-500 border-red-400 text-white shadow-red-200' 
                        : 'bg-white border-slate-200 text-red-500 shadow-slate-200'
                    }`}
                  >
                    <Heart className={`w-5.5 h-5.5 ${showFavoritesOnly ? 'fill-white text-white' : 'fill-red-500 text-red-500'}`} />
                  </button>

                </div>
              )}

            </div>
          )}

          {/* 5. SCREEN: PRO SUBSCRIPTION SETTINGS */}
          {selectedMobileTab === 'pro' && (
            <div className="space-y-4 flex-grow flex flex-col justify-start animate-fadeIn">
              
              {/* SUBSCRIPTION BANNER */}
              <div className="bg-gradient-to-r from-amber-400/10 via-amber-300/5 to-amber-500/10 p-4 rounded-2xl border border-amber-400/15 text-center relative overflow-hidden shadow-inner">
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-450/20 text-amber-300 font-black flex items-center justify-center text-[7px] uppercase tracking-wider rounded-bl-xl border-l border-b border-amber-400/20 shadow">PRO</div>
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-300 block mb-0.5">校園智慧 PRO 訂閱體系</span>
                <h4 className="text-xs font-black text-white">月費進階 解鎖無限制數位去背</h4>
              </div>

              {/* PRICING TIER GRID COMPARISON */}
              <div className="space-y-3">
                
                {/* FREE TIER CARD */}
                <div className="glass-card p-3 rounded-xl border border-white/5 relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">標準版 (Basic)</span>
                    <span className="text-[9.5px] font-mono text-neutral-400 font-bold">NT$ 0 / 免費</span>
                  </div>
                  <p className="text-[9px] text-neutral-450 leading-normal">
                    每日穿配推薦、限制數位衣櫥容量上限 8 件。
                  </p>
                </div>

                {/* PRO TIER TIER CARD */}
                <div className="glass-card p-3.5 rounded-xl border border-amber-400/35 relative shadow-md bg-amber-400/[0.02]">
                  <div className="absolute -top-1.5 right-3 bg-amber-400 text-neutral-950 text-[7px] px-1.5 py-0.2 rounded font-black uppercase shadow">Z世代首選</div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-white flex items-center gap-1">
                      專業版 (Pro Subscription)
                      <Award className="w-3.5 h-3.5 text-amber-450 animate-bounce" />
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 font-bold">NT$ 49 / 月</span>
                  </div>
                  <p className="text-[9px] text-neutral-350 leading-normal mb-2.5">
                    解鎖無限數位衣櫥、進階 TensorFlow WASM 高算力純淨去背、3D衣櫃搭配雷達與週報。
                  </p>
                  
                  <div>
                    {isProSubscribed ? (
                      <div className="w-full bg-emerald-500/20 text-emerald-300 py-1.5 rounded-xl text-[10px] font-black text-center border border-emerald-500/30 flex items-center justify-center gap-1.5 shadow">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        專屬 Pro 特權現正啟用！
                      </div>
                    ) : (
                      <button 
                        id="btn_purchase_pro_phone"
                        onClick={() => {
                          setIsProSubscribed(true);
                          showToast('感謝厚愛！已解鎖 Pro 高級會員硬體（無限制庫存 + 本地 AI 去背加速）');
                        }}
                        className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black py-1.5 rounded-xl text-[10px] text-center transition-all shadow"
                      >
                        立即開通 (NT$49)
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* EDU ACCOUNT VERIFY */}
              <div className="glass-card p-3 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[9px] uppercase font-extrabold text-amber-300 block font-mono">🏫 台灣大專院校 .edu 特權登記：</span>
                
                {eduVerified ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/15 p-2 rounded-xl text-center text-[9.5px] text-emerald-300 font-bold animate-fadeIn">
                    ✔️ 大學校園信箱驗證成功！已解鎖 14 天 Pro 特權！
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-[9px] text-neutral-450 leading-normal">登錄您的 .edu.tw 教育帳號郵件，免費領取半個月 PRO 完整會員方案。</p>
                    <div className="flex gap-1.5">
                      <input 
                        id="input_edu_phone"
                        type="email"
                        className="bg-black/50 border border-white/5 rounded-lg px-2 py-1 text-[9.5px] text-neutral-200 flex-grow outline-none focus:border-amber-400/40"
                        placeholder="請鍵入 .edu 郵箱..."
                        value={eduEmail}
                        onChange={(e) => setEduEmail(e.target.value)}
                      />
                      <button 
                        id="btn_edu_submit_phone"
                        onClick={() => {
                          if (!eduEmail.includes('.edu')) {
                            showToast('大專院校信箱格式不符，請確認是否含有 .edu.tw！');
                            return;
                          }
                          if (!eduCodeSent) {
                            setEduCodeSent(true);
                            showToast('驗證動態動碼已發送。請查收教育信箱！');
                          } else {
                            setEduVerified(true);
                            setIsProSubscribed(true);
                            showToast('教育郵箱核實驗收成功！為您解鎖 14 日免費 VIP 開放式體驗！');
                          }
                        }}
                        className="bg-amber-400 text-neutral-950 font-black px-3 py-1 rounded-lg text-[9.5px] shadow"
                      >
                        {eduCodeSent ? '核實' : '發送'}
                      </button>
                    </div>
                    {eduCodeSent && <p className="text-[8px] text-amber-300 font-mono">動態驗證碼已傳出，請即速進入填寫驗證</p>}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* IOS BOTTOM NAVIGATION RAIL BAR */}
        <nav className={`transition-all duration-300 py-2 px-1 grid grid-cols-5 shrink-0 z-30 shadow ${
          isDark 
            ? 'bg-neutral-950 border-t border-white/5 text-neutral-400' 
            : 'bg-white border-t border-slate-200 text-slate-500'
        }`}>
          <button 
            id="nav_btn_home"
            onClick={() => setSelectedMobileTab('home')}
            className={`flex flex-col items-center py-1 transition-all duration-300 cursor-pointer ${
              selectedMobileTab === 'home' 
                ? 'text-amber-550 dark:text-amber-450 font-black' 
                : isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            <Sun className="w-4 h-4 mb-1 shrink-0" />
            <span className="text-[8px]">首頁</span>
          </button>
          <button 
            id="nav_btn_wardrobe"
            onClick={() => setSelectedMobileTab('wardrobe')}
            className={`flex flex-col items-center py-1 transition-all duration-300 cursor-pointer ${
              selectedMobileTab === 'wardrobe' 
                ? 'text-amber-550 dark:text-amber-450 font-black' 
                : isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4 mb-1 shrink-0" />
            <span className="text-[8px]">衣櫥</span>
          </button>
          <button 
            id="nav_btn_reports"
            onClick={() => setSelectedMobileTab('reports')}
            className={`flex flex-col items-center py-1 transition-all duration-300 cursor-pointer ${
              selectedMobileTab === 'reports' 
                ? 'text-amber-550 dark:text-amber-450 font-black' 
                : isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 mb-1 shrink-0" />
            <span className="text-[8px]">分析</span>
          </button>
          <button 
            id="nav_btn_bazaar"
            onClick={() => setSelectedMobileTab('bazaar')}
            className={`flex flex-col items-center py-1 transition-all duration-300 cursor-pointer ${
              selectedMobileTab === 'bazaar' 
                ? 'text-amber-550 dark:text-amber-450 font-black' 
                : isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 mb-0.5 shrink-0 animate-pulse hover:animate-none" />
            <span className="text-[8px]">二手</span>
          </button>
          <button 
            id="nav_btn_pro"
            onClick={() => setSelectedMobileTab('pro')}
            className={`flex flex-col items-center py-1 transition-all duration-300 cursor-pointer ${
              selectedMobileTab === 'pro' 
                ? 'text-amber-550 dark:text-amber-450 font-black' 
                : isDark ? 'hover:text-white' : 'hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 mb-1 shrink-0" />
            <span className="text-[8px]">訂閱</span>
          </button>
        </nav>

        {/* iOS style valuation modal overlay */}
        {valuingItem && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-end p-4 animate-fadeIn">
            <div className="bg-white border border-slate-200/80 rounded-t-[32px] rounded-b-[24px] p-5 space-y-4 shadow-2xl animate-slideUp">
              
              <div className="text-center w-full relative">
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">二手轉賣估價</span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">品相選擇與售價調整</span>
              </div>

              {/* Item Info Card */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-200">
                  <img src={valuingItem.imageUrl} className="w-full h-full object-cover" />
                </div>
                <div className="leading-tight min-w-0 flex-grow">
                  <span className="text-[11.5px] font-extrabold text-slate-900 block truncate">{valuingItem.name}</span>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">購入原價: ${valuingItem.originalPrice} NTD</span>
                </div>
              </div>

              {/* Segmented Condition Tabs Selection */}
              <div className="space-y-1.5">
                <span className="text-[9.5px] text-slate-700 font-semibold block">自訂商品良好度條件（連動折舊率）：</span>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                  <button 
                    type="button"
                    onClick={() => changeValuingCondition('brand_new')}
                    className={`py-1.5 text-[8.5px] rounded-lg font-extrabold text-center transition-all ${valuingCondition === 'brand_new' ? 'bg-amber-400 text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900 bg-transparent'}`}
                  >
                    全新僅試穿
                  </button>
                  <button 
                    type="button"
                    onClick={() => changeValuingCondition('like_new')}
                    className={`py-1.5 text-[8.5px] rounded-lg font-extrabold text-center transition-all ${valuingCondition === 'like_new' ? 'bg-amber-400 text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900 bg-transparent'}`}
                  >
                    九成新 (無瑕疵)
                  </button>
                  <button 
                    type="button"
                    onClick={() => changeValuingCondition('gently_used')}
                    className={`py-1.5 text-[8.5px] rounded-lg font-extrabold text-center transition-all ${valuingCondition === 'gently_used' ? 'bg-amber-400 text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900 bg-transparent'}`}
                  >
                    八成新 (正常使用)
                  </button>
                </div>
              </div>

              {/* Estimated Pricing and Adjustment Row */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">系統建議折舊價:</span>
                  <span className="font-mono font-bold text-slate-700">
                    {valuingCondition === 'brand_new' ? '70%' : valuingCondition === 'like_new' ? '50%' : '30%'} ➔ ${Math.round(valuingItem.originalPrice * (valuingCondition === 'brand_new' ? 0.7 : valuingCondition === 'like_new' ? 0.5 : 0.3))} NTD
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-900 font-bold">預估合理轉售價</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-900 font-extrabold">$</span>
                    <input 
                      type="number"
                      value={valuingPriceInput}
                      onChange={(e) => setValuingPriceInput(e.target.value)}
                      className="w-16 bg-transparent text-right font-mono font-black text-xs text-slate-900 border-b border-slate-300 focus:outline-none focus:border-amber-500 px-0.5 py-0"
                    />
                    <span className="text-[10px] text-slate-500 font-mono font-bold">NTD</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-1">
                <button 
                  type="button"
                  onClick={() => setValuingItem(null)}
                  className="flex-1 bg-transparent text-slate-400 hover:text-slate-600 py-2 rounded-xl text-[10.5px] font-black tracking-wide border-0"
                >
                  取消
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const priceNum = parseInt(valuingPriceInput, 10) || 150;
                    handleLiquidateItem(valuingItem, priceNum);
                    setValuingItem(null);
                  }}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black py-2 rounded-xl text-[10.5px] shadow"
                >
                  確認投入市集上架
                </button>
              </div>

            </div>
          </div>
        )}

        {/* HIGH-FIDELITY INTERACTIVE MESSAGING OVERLAY FOR CAMPUS MERCHANTS */}
        {isChatting && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div className="bg-white border-t border-slate-200 rounded-t-[32px] h-[85%] flex flex-col overflow-hidden animate-slideUp font-sans">
              
              {/* Chat Header */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-300 shrink-0">
                    <img src={bazaarSelectedItem?.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="leading-none">
                    <span className="text-[11.5px] font-black text-slate-950 block truncate max-w-[140px]">聯絡賣家 ({bazaarSelectedItem?.department})</span>
                    <span className="text-[8px] text-emerald-600 font-extrabold block mt-0.5">● 線上即時通訊中</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChatting(false)}
                  className="w-6 h-6 rounded-full bg-slate-200/60 flex items-center justify-center text-xs text-slate-500 hover:text-slate-800 cursor-pointer border-0"
                >
                  ✕
                </button>
              </div>

              {/* Chat Item Snippet Card */}
              <div className="bg-slate-100 p-2 border-b border-slate-200/60 flex items-center gap-2 px-4 shrink-0 text-[10px]">
                <span className="text-slate-500 font-semibold">洽詢二手：</span>
                <span className="text-slate-800 font-black truncate flex-grow max-w-[140px]">{bazaarSelectedItem?.name}</span>
                <span className="text-amber-600 font-black font-mono shrink-0">${bazaarSelectedItem?.price} NTD</span>
              </div>

              {/* Messages Scrolling Body */}
              <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-slate-50/50 scrollbar-none flex flex-col-reverse">
                <div className="space-y-3">
                  
                  {/* Seller Initial Greeting */}
                  <div className="flex gap-2 items-start">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-[9px] font-black text-slate-700 flex items-center justify-center shrink-0 border border-slate-300">
                      賣家
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-2.5 text-[10px] text-slate-700 leading-normal max-w-[75%] shadow-xs">
                      同學您好！我的課程剛下課，這件衣服目前還可以面交交易唷。下課時間我也會在含舍我樓大廳附近，隨時可配合看貨。
                    </div>
                  </div>

                  {/* Custom Messages list */}
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start animate-fadeIn'}`}>
                      {msg.sender === 'seller' && (
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-[9px] font-black text-slate-700 flex items-center justify-center shrink-0 border border-slate-300 font-sans">
                          賣家
                        </div>
                      )}
                      <div className={`p-2.5 rounded-2xl text-[10.5px] leading-relaxed max-w-[75%] shadow-xs border ${
                        msg.sender === 'user' 
                          ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold' 
                          : 'bg-white text-slate-700 border-slate-200 font-medium'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
                <input 
                  type="text"
                  className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10.5px] text-slate-800 placeholder-slate-400 outline-none focus:border-amber-400 font-sans"
                  placeholder="輸入訊息，打個招呼吧..."
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const text = chatInputText.trim();
                      if (!text) return;
                      setChatMessages(prev => [...prev, { sender: 'user', text, time: '現在' }]);
                      setChatInputText('');
                      // simulate automated polite reply
                      setTimeout(() => {
                        setChatMessages(prev => [...prev, { 
                          sender: 'seller', 
                          text: `沒問題！那我們等等下課 10 分鐘後在舍我樓正門見，我會拿著這件衣服等妳！`, 
                          time: '現在' 
                        }]);
                      }, 1000);
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => {
                    const text = chatInputText.trim();
                    if (!text) return;
                    setChatMessages(prev => [...prev, { sender: 'user', text, time: '現在' }]);
                    setChatInputText('');
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, { 
                        sender: 'seller', 
                        text: `沒問題！那我們等等下課 10 分鐘後在舍我樓正門見，我會拿著這件衣服等妳！`, 
                        time: '現在' 
                      }]);
                    }, 1000);
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 border-0 p-2.5 rounded-xl cursor-pointer flex items-center justify-center shadow transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Home Indicator line */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-neutral-700 rounded-full z-40"></div>
      </div>
    </div>
  );
}
