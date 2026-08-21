export type CouponCategory = 'ai_tools' | 'hosting' | 'design' | 'dev_tools' | 'productivity' | 'security' | 'marketing';

export interface SaaSCoupon {
  id: string;
  domain: string;
  storeName: string;
  code: string;
  discountType: 'percentage' | 'fixed_amount' | 'extended_trial' | 'free_credits';
  discountValue: string; // e.g. "75%", "$20 OFF", "30-Day Trial"
  description: string;
  affiliateUrl: string;
  category: CouponCategory;
  successRate: number; // 0-100%
  verifiedAt: string;
  featured?: boolean;
}

export interface UserSettings {
  autoApplyCoupons: boolean;
  notifyOnSavingsFound: boolean;
  preferredCategories: CouponCategory[];
  totalSavedDollars: number;
  couponsAppliedCount: number;
  installationId: string;
}
