import { WardrobeItem } from './types';

const RAW_WARDROBE: WardrobeItem[] = [
  // -----------------------------------------------------------------
  // 1. OUTERWEAR (外套)
  // -----------------------------------------------------------------
  { 
    id: 'out-1', 
    name: 'GAP 復古草寫刺繡大衣', 
    category: 'Outerwear', 
    subCategory: '經典毛呢大衣', 
    colorName: '冷灰黑', 
    colorHex: '#2B2B2B', 
    lastWornDaysAgo: 95, 
    originalPrice: 3200, 
    source: 'Shopee', 
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: true 
  },
  { 
    id: 'out-2', 
    name: '日系寬鬆軍裝 M51 魚尾外套', 
    category: 'Outerwear', 
    subCategory: '軍裝夾克', 
    colorName: '軍綠色', 
    colorHex: '#4B5320', 
    lastWornDaysAgo: 0, 
    originalPrice: 1980, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'out-3', 
    name: '防風防雨連帽衝鋒衣', 
    category: 'Outerwear', 
    subCategory: '機能外套', 
    colorName: '曜石黑', 
    colorHex: '#121212', 
    lastWornDaysAgo: 14, 
    originalPrice: 2490, 
    source: 'Shopee', 
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'out-4', 
    name: '復古重磅水洗牛仔夾克外套', 
    category: 'Outerwear', 
    subCategory: '牛仔單寧', 
    colorName: '經典單寧藍', 
    colorHex: '#4682B4', 
    lastWornDaysAgo: 110, 
    originalPrice: 1580, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: false 
  },
  { 
    id: 'out-5', 
    name: '極地絨感雙面厚羔羊毛外套', 
    category: 'Outerwear', 
    subCategory: '羔羊毛夾克', 
    colorName: '落葉褐', 
    colorHex: '#B25329', 
    lastWornDaysAgo: 0, 
    originalPrice: 2280, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: false, 
    isAthletic: true, 
    isFormal: false 
  },

  // -----------------------------------------------------------------
  // 2. TOPS (上衣)
  // -----------------------------------------------------------------
  { 
    id: 'top-1', 
    name: 'PAZZO 簡約寬鬆純棉短版上衣', 
    category: 'Tops', 
    subCategory: '短袖 T-Shirt', 
    colorName: '純淨白', 
    colorHex: '#FFFFFF', 
    lastWornDaysAgo: 3, 
    originalPrice: 390, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'top-2', 
    name: 'UNIQLO 寬鬆落肩連帽上衣', 
    category: 'Tops', 
    subCategory: '衛衣/帽衫', 
    colorName: '霧灰色', 
    colorHex: '#9E9E9E', 
    lastWornDaysAgo: 5, 
    originalPrice: 990, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'top-3', 
    name: '韓國設計落肩條紋針織衫', 
    category: 'Tops', 
    subCategory: '針織衫', 
    colorName: '海軍藍/白', 
    colorHex: '#1D2F44', 
    lastWornDaysAgo: 115, 
    originalPrice: 880, 
    source: 'Shopee', 
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: true 
  },
  { 
    id: 'top-4', 
    name: 'PAZZO 直條紋翻領硬挺襯衫', 
    category: 'Tops', 
    subCategory: '襯衫', 
    colorName: '天藍色', 
    colorHex: '#AED8F2', 
    lastWornDaysAgo: 1, 
    originalPrice: 590, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: true 
  },
  { 
    id: 'top-5', 
    name: '美式復古重磅數圓領無口袋短 T', 
    category: 'Tops', 
    subCategory: '純棉短 T', 
    colorName: '燕麥白', 
    colorHex: '#F3EFE9', 
    lastWornDaysAgo: 0, 
    originalPrice: 420, 
    source: 'Shopee', 
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'top-6', 
    name: '純色修身圓領休閒長袖', 
    category: 'Tops', 
    subCategory: '長袖上衣', 
    colorName: '炭黑色', 
    colorHex: '#262626', 
    lastWornDaysAgo: 95, 
    originalPrice: 450, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },

  // -----------------------------------------------------------------
  // 3. BOTTOMS (下著)
  // -----------------------------------------------------------------
  { 
    id: 'bot-1', 
    name: 'PAZZO 厚磅針織束口運動棉褲', 
    category: 'Bottoms', 
    subCategory: '束口長褲', 
    colorName: '灰白色', 
    colorHex: '#ECE9E6', 
    lastWornDaysAgo: 2, 
    originalPrice: 590, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'bot-2', 
    name: '高腰彈力修身 A 字窄短裙', 
    category: 'Bottoms', 
    subCategory: '半身裙', 
    colorName: '摩卡咖', 
    colorHex: '#6F4E37', 
    lastWornDaysAgo: 6, 
    originalPrice: 490, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: false, 
    isAthletic: false, 
    isFormal: true 
  },
  { 
    id: 'bot-3', 
    name: '高腰直筒復古水洗老爹牛仔褲', 
    category: 'Bottoms', 
    subCategory: '牛仔褲', 
    colorName: '淺藍色', 
    colorHex: '#87CEEB', 
    lastWornDaysAgo: 0, 
    originalPrice: 1280, 
    source: 'Shopee', 
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: false 
  },
  { 
    id: 'bot-4', 
    name: '工裝多口袋寬鬆微落地長褲', 
    category: 'Bottoms', 
    subCategory: '工裝褲', 
    colorName: '卡其色', 
    colorHex: '#C3B091', 
    lastWornDaysAgo: 9, 
    originalPrice: 1150, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'bot-5', 
    name: '韓版休閒抗皺西裝短褲', 
    category: 'Bottoms', 
    subCategory: '短褲', 
    colorName: '奶茶色', 
    colorHex: '#EAE0D5', 
    lastWornDaysAgo: 15, 
    originalPrice: 790, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: true 
  },

  // -----------------------------------------------------------------
  // 4. FOOTWEAR (鞋履)
  // -----------------------------------------------------------------
  { 
    id: 'foot-1', 
    name: 'New Balance Classic 574 復古運動鞋', 
    category: 'Footwear', 
    subCategory: '休閒鞋', 
    colorName: '經典元祖灰', 
    colorHex: '#D1D5DB', 
    lastWornDaysAgo: 2, 
    originalPrice: 2880, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'foot-2', 
    name: '無印極簡質感全白防潑水小白鞋', 
    category: 'Footwear', 
    subCategory: '帆布鞋', 
    colorName: '純白', 
    colorHex: '#FFFFFF', 
    lastWornDaysAgo: 0, 
    originalPrice: 690, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'foot-3', 
    name: 'Nike Air Max 運動緩震機能跑鞋', 
    category: 'Footwear', 
    subCategory: '慢跑鞋', 
    colorName: '經典紅白黑', 
    colorHex: '#E63946', 
    lastWornDaysAgo: 4, 
    originalPrice: 3800, 
    source: 'Shopee', 
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: true, 
    isFormal: false 
  },
  { 
    id: 'foot-4', 
    name: '英倫風復古馬汀三孔真皮短靴', 
    category: 'Footwear', 
    subCategory: '皮鞋/短靴', 
    colorName: '酒紅色', 
    colorHex: '#800020', 
    lastWornDaysAgo: 120, 
    originalPrice: 4200, 
    source: 'Manual', 
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: true, 
    isAthletic: false, 
    isFormal: true 
  },
  { 
    id: 'foot-5', 
    name: '極簡霧面羊皮軟底小尖頭穆勒鞋', 
    category: 'Footwear', 
    subCategory: '半拖鞋', 
    colorName: '燕麥米色', 
    colorHex: '#ECE4DB', 
    lastWornDaysAgo: 0, 
    originalPrice: 1480, 
    source: 'PAZZO', 
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&auto=format&fit=crop&q=80', 
    isRiderFriendly: false, 
    isAthletic: false, 
    isFormal: true 
  },

  // -----------------------------------------------------------------
  // 5. JEWELRY (首飾)
  // -----------------------------------------------------------------
  {
    id: 'jew-1',
    name: '金色極簡刻面法式鎖骨項鍊',
    category: 'Jewelry',
    subCategory: '項鍊',
    colorName: '香檳金',
    colorHex: '#D4AF37',
    lastWornDaysAgo: 4,
    originalPrice: 1280,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'jew-2',
    name: '優雅巴洛克天然淡水珍珠吊墜耳環',
    category: 'Jewelry',
    subCategory: '耳環',
    colorName: '極光白',
    colorHex: '#FFFDF9',
    lastWornDaysAgo: 9,
    originalPrice: 980,
    source: 'Shopee',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'jew-3',
    name: '純銀刻字弧面極簡中性開口手鏈',
    category: 'Jewelry',
    subCategory: '手鏈',
    colorName: '古銀色',
    colorHex: '#C0C0C0',
    lastWornDaysAgo: 0,
    originalPrice: 1650,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1611085583191-a3b1a1a29d81?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: true,
    isFormal: false
  },
  {
    id: 'jew-4',
    name: '法式復古手工扭紋磨砂金屬對戒',
    category: 'Jewelry',
    subCategory: '戒指',
    colorName: '霧面金',
    colorHex: '#B8860B',
    lastWornDaysAgo: 1,
    originalPrice: 850,
    source: 'PAZZO',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'jew-5',
    name: '八芒星璀璨輕奢耀石大針胸針',
    category: 'Jewelry',
    subCategory: '胸針',
    colorName: '閃鑽銀',
    colorHex: '#EAEAEA',
    lastWornDaysAgo: 85,
    originalPrice: 1100,
    source: 'Shopee',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: false,
    isAthletic: false,
    isFormal: true
  },

  // -----------------------------------------------------------------
  // 6. BAGS (包包)
  // -----------------------------------------------------------------
  {
    id: 'bag-1',
    name: 'Y-3 耐刮防雨機能休閒雙肩包',
    category: 'Bags',
    subCategory: '後背包',
    colorName: '極致黑',
    colorHex: '#1D1D1D',
    lastWornDaysAgo: 150,
    originalPrice: 4200,
    source: 'Shopee',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: true,
    isFormal: false
  },
  {
    id: 'bag-2',
    name: '法式復古焦糖半月牛皮側肩包',
    category: 'Bags',
    subCategory: '單肩/腋下包',
    colorName: '焦糖橘',
    colorHex: '#D47A22',
    lastWornDaysAgo: 0,
    originalPrice: 2400,
    source: 'PAZZO',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'bag-3',
    name: '手作植鞣革加厚純棉水洗托特包',
    category: 'Bags',
    subCategory: '托特包',
    colorName: '亞麻灰綠',
    colorHex: '#556B2F',
    lastWornDaysAgo: 6,
    originalPrice: 1350,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: false
  },
  {
    id: 'bag-4',
    name: '卡爾老爺經典菱格金扣小羊皮鏈條包',
    category: 'Bags',
    subCategory: '斜挎小包',
    colorName: '經典黑金',
    colorHex: '#252525',
    lastWornDaysAgo: 15,
    originalPrice: 12000,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: false,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'bag-5',
    name: '日系輕量大容量防水尼龍餃子包',
    category: 'Bags',
    subCategory: '手提水餃包',
    colorName: '軍綠色',
    colorHex: '#525B4C',
    lastWornDaysAgo: 0,
    originalPrice: 890,
    source: 'PAZZO',
    imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: true,
    isFormal: false
  },

  // -----------------------------------------------------------------
  // 7. SCARVES (圍巾)
  // -----------------------------------------------------------------
  {
    id: 'sc-1',
    name: 'Acne Studios 經典格紋羊毛保暖大圍巾',
    category: 'Scarves',
    subCategory: '羊毛長圍巾',
    colorName: '莫蘭迪粉格子',
    colorHex: '#CD9A9A',
    lastWornDaysAgo: 185,
    originalPrice: 2200,
    source: 'PAZZO',
    imageUrl: 'https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: false
  },
  {
    id: 'sc-2',
    name: '落葉褐純手工複古粗針針織毛線圍巾',
    category: 'Scarves',
    subCategory: '粗針織圍巾',
    colorName: '落葉褐',
    colorHex: '#9E6D4E',
    lastWornDaysAgo: 0,
    originalPrice: 780,
    source: 'Shopee',
    imageUrl: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: false
  },
  {
    id: 'sc-3',
    name: '日系流蘇極致厚糯保暖喀什米爾披肩',
    category: 'Scarves',
    subCategory: '流蘇披肩',
    colorName: '奶白色',
    colorHex: '#F6F6F2',
    lastWornDaysAgo: 10,
    originalPrice: 1980,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'sc-4',
    name: '法式印花真絲小方絲巾',
    category: 'Scarves',
    subCategory: '真絲方巾',
    colorName: '海藍印花',
    colorHex: '#4E7E91',
    lastWornDaysAgo: 3,
    originalPrice: 1250,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  },
  {
    id: 'sc-5',
    name: '北歐英倫雅皮棋盤格提花圍巾',
    category: 'Scarves',
    subCategory: '格紋圍巾',
    colorName: '黑白配',
    colorHex: '#333333',
    lastWornDaysAgo: 7,
    originalPrice: 850,
    source: 'PAZZO',
    imageUrl: 'https://images.unsplash.com/photo-1520903781411-7616687efcfe?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: false
  },

  // -----------------------------------------------------------------
  // 8. HEADWEAR (帽子)
  // -----------------------------------------------------------------
  {
    id: 'hd-1',
    name: 'New Era NY 刺繡潮流低頂棒球帽',
    category: 'Headwear',
    subCategory: '棒球帽',
    colorName: '藏青色',
    colorHex: '#0F2035',
    lastWornDaysAgo: 8,
    originalPrice: 980,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: true,
    isFormal: false
  },
  {
    id: 'hd-2',
    name: '冷感重磅純棉抗UV平頂漁夫帽',
    category: 'Headwear',
    subCategory: '漁夫帽',
    colorName: '象牙白',
    colorHex: '#F6F5F2',
    lastWornDaysAgo: 0,
    originalPrice: 650,
    source: 'PAZZO',
    imageUrl: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: true,
    isFormal: false
  },
  {
    id: 'hd-3',
    name: '極簡冷感防寒保暖羊毛冷帽',
    category: 'Headwear',
    subCategory: '毛帽',
    colorName: '霧灰色',
    colorHex: '#7F7F7F',
    lastWornDaysAgo: 4,
    originalPrice: 480,
    source: 'Shopee',
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: true,
    isFormal: false
  },
  {
    id: 'hd-4',
    name: '焦糖橘手勾拉菲草度假系遮陽大草帽',
    category: 'Headwear',
    subCategory: '草帽',
    colorName: '焦糖橘',
    colorHex: '#CA7539',
    lastWornDaysAgo: 95,
    originalPrice: 1250,
    source: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: false,
    isAthletic: false,
    isFormal: false
  },
  {
    id: 'hd-5',
    name: '英倫名媛復古小香風呢帽',
    category: 'Headwear',
    subCategory: '八角帽/畫家帽',
    colorName: '深琥珀',
    colorHex: '#522A0A',
    lastWornDaysAgo: 16,
    originalPrice: 1890,
    source: 'Shopee',
    imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&auto=format&fit=crop&q=80',
    isRiderFriendly: true,
    isAthletic: false,
    isFormal: true
  }
];

const CATEGORY_CHOSEN_PHOTOS: Record<string, string[]> = {
  Outerwear: [
    'photo-1591047139829-d91aecb6caea', // GAP 復古草寫刺繡大衣
    'photo-1548883354-7622d03aca27', // 日系寬鬆軍裝 M51 魚尾外套
    'photo-1614975058789-41316d0e2e9c', // 防風防雨連帽衝鋒衣
    'photo-1576995853123-5a10305d93c0', // 復古重磅水洗牛仔夾克外套
    'photo-1608256246200-53e635b5b65f', // 極地絨感雙面厚羔羊毛外套
  ],
  Tops: [
    'photo-1521572267360-ee0c2909d518', // PAZZO 簡約寬鬆純棉短版上衣
    'photo-1556821840-3a63f95609a7', // UNIQLO 寬鬆落肩連帽上衣
    'photo-1620799140408-edc6dcb6d633', // 韓國設計落肩條紋針織衫
    'photo-1596755094514-f87e34085b2c', // PAZZO 直條紋翻領硬挺襯衫
    'photo-1554568218-0f1715e72254', // 美式復古重磅數圓領無口袋短 T
    'photo-1618354691373-d851c5c3a990', // 純色修身圓領休閒長袖
  ],
  Bottoms: [
    'photo-1551854838-212c50b4c184', // PAZZO 厚磅針織束口運動棉褲
    'photo-1583496661160-fb5886a0aaaa', // 高腰彈力修身 A 字窄短裙
    'photo-1582562124811-c09040d0a901', // 高腰直筒復古水洗老爹牛仔褲
    'photo-1624378439575-d8705ad7ae80', // 工裝多口袋寬鬆微落地長褲
    'photo-1591195853828-11db59a44f6b', // 韓版休閒抗皺西裝短褲
  ],
  Footwear: [
    'photo-1539185441755-769473a23570', // New Balance Classic 574 復古運動鞋
    'photo-1600269452121-4f2416e55c28', // 無印極簡質感全白防潑水小白鞋
    'photo-1542291026-7eec264c27ff', // Nike Air Max 運動緩震機能跑鞋
    'photo-1608231387042-66d1773070a5', // 英倫風復古馬汀三孔真皮短靴
    'photo-1603252109303-2751441dd157', // 極簡霧面羊皮軟底小尖頭穆勒鞋
  ],
  Bags: [
    'photo-1553062407-98eeb64c6a62', // Y-3 耐刮防雨機能休閒雙肩包
    'photo-1584917865442-de89df76afd3', // 法式復古焦糖半月牛皮側肩包
    'photo-1544816155-12df9643f363', // 手作植鞣革加厚純棉水洗托特包
    'photo-1614179924047-e1bf49a0a0cf', // 卡爾老爺經典菱格金扣小羊皮鏈條包
    'photo-1598532163257-ae3c6b2524b6', // 日系輕量大容量防水尼龍餃子包
  ],
  Jewelry: [
    'photo-1599643478518-a784e5dc4c8f', // 金色極簡刻面法式鎖骨項鍊
    'photo-1630019852942-f89202989a59', // 優雅巴洛克天然淡水珍珠吊墜耳環
    'photo-1611085583191-a3b1a1a29d81', // 純銀刻字弧面極簡中性開口手鏈
    'photo-1605100804763-247f67b3557e', // 法式復古手工扭紋磨砂金屬對戒
    'photo-1515562141207-7a88fb7ce338', // 八芒星璀璨輕奢耀石大針胸針
  ],
  Scarves: [
    'photo-1520635360276-79f3dbd809f6', // Acne Studios 經典格紋羊毛保暖大圍巾
    'photo-1584030373081-f37b7bb4fa8e', // 落葉褐純手工複古粗針針織毛線圍巾
    'photo-1601924994987-69e26d50dc26', // 日系流蘇極致厚糯保暖喀什米爾披肩
    'photo-1589363460779-cd717d2ed8fa', // 法式印花真絲小方絲巾
    'photo-1520903781411-7616687efcfe', // 北歐英倫雅皮棋盤格提花圍巾
  ],
  Headwear: [
    'photo-1588850561407-ed78c282e89b', // New Era NY 刺繡潮流低頂棒球帽
    'photo-1514327605112-b887c0e61c0a', // 冷感重磅純棉抗UV平頂漁夫帽
    'photo-1576871337622-98d48d4aa53e', // 極簡冷感防寒保暖羊毛冷帽
    'photo-1534215754734-18e55d13e346', // 焦糖橘手勾拉菲草度假系遮陽大草帽
    'photo-1521369909029-2afed882baee', // 英倫名媛復古小香風呢帽
  ]
};

export const INITIAL_WARDROBE: WardrobeItem[] = RAW_WARDROBE.map((item) => {
  return {
    ...item
  };
});

export const getFallbackImage = (category: string): string => {
  const normalized = (category || '').toLowerCase();
  
  if (normalized.includes('outer')) {
    return 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('top')) {
    return 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('bottom')) {
    return 'https://images.unsplash.com/photo-1506629082925-5347b969569d?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('foot') || normalized.includes('shoe')) {
    return 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('bag')) {
    return 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('jewel')) {
    return 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('scarf') || normalized.includes('scarves')) {
    return 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&auto=format&fit=crop&q=80';
  }
  
  if (normalized.includes('head') || normalized.includes('cap') || normalized.includes('hat')) {
    return 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&auto=format&fit=crop&q=80';
  }

  // Default fallback is a high quality stylish general clothing photo
  return 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&auto=format&fit=crop&q=80';
};

