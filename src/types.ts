export interface WardrobeItem {
  id: string;
  name: string;
  category: 'Tops' | 'Bottoms' | 'Outerwear' | 'Footwear' | 'Jewelry' | 'Bags' | 'Scarves' | 'Headwear';
  subCategory: string;
  colorName: string;
  colorHex: string;
  lastWornDaysAgo: number;
  originalPrice: number;
  source: 'Manual' | 'Shopee' | 'PAZZO';
  imageUrl: string;
  isRiderFriendly: boolean;
  isAthletic: boolean;
  isFormal: boolean;
  isReselling?: boolean;
}

export type SpecTab = 'recommendation' | 'imports' | 'monetization' | 'marketing';
export type MobileTab = 'home' | 'wardrobe' | 'reports' | 'bazaar' | 'pro';
export type WeatherType = 'sunny' | 'rainy' | 'cold';
export type SelectedDayType = 'monday' | 'wednesday' | 'friday';
export type ResaleConditionType = 'brand_new' | 'like_new' | 'gently_used';
