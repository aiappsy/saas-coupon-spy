// Unified data store for SaaS Coupon Spy Admin Hub

export interface SaaSCoupon {
  id: string;
  domain: string;
  storeName: string;
  code: string;
  discountType: 'percentage' | 'fixed_amount' | 'extended_trial' | 'free_credits';
  discountValue: string; // e.g. "75%", "$20 OFF", "30-Day Trial"
  description: string;
  affiliateUrl: string;
  category: 'ai_tools' | 'hosting' | 'design' | 'dev_tools' | 'productivity' | 'security' | 'marketing';
  successRate: number; // e.g. 98%
  verifiedAt: string;
  expiresAt?: string;
  featured: boolean;
  active: boolean;
}

export interface AffiliatePartner {
  id: string;
  name: string;
  network: 'Impact.com' | 'PartnerStack' | 'ShareASale' | 'Direct';
  category: string;
  destinationUrl: string;
  payoutModel: 'cpa' | 'revshare';
  payoutAmount: number;
  active: boolean;
  targetDomains: string[];
  totalClicks: number;
  estimatedRevenue: number;
}

export interface CouponClickEvent {
  id: string;
  couponId: string;
  storeName: string;
  codeApplied: string;
  savingsEstimate: number;
  installationId: string;
  timestamp: string;
}

export interface CommunitySubmission {
  id: string;
  domain: string;
  storeName: string;
  code: string;
  discountValue: string;
  submittedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

class AdminDataStore {
  public coupons: SaaSCoupon[] = [
    // Hosting & Cloud
    {
      id: 'coup_hostinger_75',
      domain: 'hostinger.com',
      storeName: 'Hostinger Cloud',
      code: 'SPY75',
      discountType: 'percentage',
      discountValue: '75% OFF',
      description: '75% discount on Premium & Business Cloud hosting plans + Free Domain.',
      affiliateUrl: 'https://hostinger.com/?ref=saascouponspy',
      category: 'hosting',
      successRate: 99,
      verifiedAt: '2026-08-20',
      featured: true,
      active: true
    },
    {
      id: 'coup_namecheap_20',
      domain: 'namecheap.com',
      storeName: 'Namecheap',
      code: 'COUPONSPY',
      discountType: 'percentage',
      discountValue: '20% OFF',
      description: '20% off new domain registrations and shared hosting.',
      affiliateUrl: 'https://namecheap.com/?ref=saascouponspy',
      category: 'hosting',
      successRate: 94,
      verifiedAt: '2026-08-19',
      featured: false,
      active: true
    },

    // AI & Creator Tools
    {
      id: 'coup_elevenlabs_50',
      domain: 'elevenlabs.io',
      storeName: 'ElevenLabs AI Voice',
      code: 'VOICEPRO50',
      discountType: 'percentage',
      discountValue: '50% OFF',
      description: '50% off your first month of Creator tier voice generation.',
      affiliateUrl: 'https://elevenlabs.io/?ref=saascouponspy',
      category: 'ai_tools',
      successRate: 96,
      verifiedAt: '2026-08-20',
      featured: true,
      active: true
    },
    {
      id: 'coup_heygen_20',
      domain: 'heygen.com',
      storeName: 'HeyGen AI Video',
      code: 'GENAI20',
      discountType: 'percentage',
      discountValue: '20% OFF',
      description: '20% discount on Creator and Team annual subscriptions.',
      affiliateUrl: 'https://heygen.com/?ref=saascouponspy',
      category: 'ai_tools',
      successRate: 92,
      verifiedAt: '2026-08-18',
      featured: true,
      active: true
    },
    {
      id: 'coup_canva_30',
      domain: 'canva.com',
      storeName: 'Canva Pro',
      code: 'CREATOR30',
      discountType: 'extended_trial',
      discountValue: '30-Day Free Pro',
      description: 'Extended 30-day free trial of Canva Pro with full AI tools unlocked.',
      affiliateUrl: 'https://canva.com/pro/?ref=saascouponspy',
      category: 'design',
      successRate: 100,
      verifiedAt: '2026-08-20',
      featured: true,
      active: true
    },

    // Creative & Design
    {
      id: 'coup_affinity_20',
      domain: 'serif.com',
      storeName: 'Affinity Photo & Designer',
      code: 'NOSUB20',
      discountType: 'percentage',
      discountValue: '20% OFF',
      description: 'One-time perpetual license with zero subscriptions (Adobe alternative).',
      affiliateUrl: 'https://affinity.serif.com/?ref=saascouponspy',
      category: 'design',
      successRate: 95,
      verifiedAt: '2026-08-15',
      featured: true,
      active: true
    },
    {
      id: 'coup_descript_free',
      domain: 'descript.com',
      storeName: 'Descript Video Editor',
      code: 'EDITPRO',
      discountType: 'free_credits',
      discountValue: '10 Free Hrs',
      description: '10 hours of automatic AI transcription and video editing credits.',
      affiliateUrl: 'https://descript.com/?ref=saascouponspy',
      category: 'design',
      successRate: 97,
      verifiedAt: '2026-08-17',
      featured: false,
      active: true
    },

    // Privacy & Security
    {
      id: 'coup_proton_50',
      domain: 'protonvpn.com',
      storeName: 'Proton VPN',
      code: 'PRIVACY50',
      discountType: 'percentage',
      discountValue: '50% OFF',
      description: '50% off 2-year Swiss privacy plan with 10Gbps servers.',
      affiliateUrl: 'https://protonvpn.com/?ref=saascouponspy',
      category: 'security',
      successRate: 98,
      verifiedAt: '2026-08-20',
      featured: true,
      active: true
    },
    {
      id: 'coup_nordvpn_70',
      domain: 'nordvpn.com',
      storeName: 'NordVPN',
      code: 'SAVE70',
      discountType: 'percentage',
      discountValue: '70% OFF',
      description: '70% off 2-year plan + 3 months extra free.',
      affiliateUrl: 'https://nordvpn.com/?ref=saascouponspy',
      category: 'security',
      successRate: 93,
      verifiedAt: '2026-08-19',
      featured: false,
      active: true
    },

    // Developer & Productivity
    {
      id: 'coup_notion_ai',
      domain: 'notion.so',
      storeName: 'Notion Plus',
      code: 'STARTUPAI',
      discountType: 'free_credits',
      discountValue: '$500 Credits',
      description: 'Up to $500 in free Notion credits for startups and creators.',
      affiliateUrl: 'https://notion.so/?ref=saascouponspy',
      category: 'productivity',
      successRate: 90,
      verifiedAt: '2026-08-16',
      featured: false,
      active: true
    }
  ];

  public partners: AffiliatePartner[] = [
    {
      id: 'part_hostinger',
      name: 'Hostinger',
      network: 'Impact.com',
      category: 'hosting',
      destinationUrl: 'https://hostinger.com/?ref=saascouponspy',
      payoutModel: 'cpa',
      payoutAmount: 65.0,
      active: true,
      targetDomains: ['hostinger.com', 'bluehost.com', 'godaddy.com'],
      totalClicks: 240,
      estimatedRevenue: 3120.0
    },
    {
      id: 'part_canva',
      name: 'Canva Pro',
      network: 'Impact.com',
      category: 'design',
      destinationUrl: 'https://canva.com/pro/?ref=saascouponspy',
      payoutModel: 'revshare',
      payoutAmount: 30.0,
      active: true,
      targetDomains: ['canva.com', 'adobe.com'],
      totalClicks: 418,
      estimatedRevenue: 2280.0
    },
    {
      id: 'part_proton',
      name: 'Proton VPN',
      network: 'Impact.com',
      category: 'security',
      destinationUrl: 'https://protonvpn.com/?ref=saascouponspy',
      payoutModel: 'cpa',
      payoutAmount: 35.0,
      active: true,
      targetDomains: ['protonvpn.com', 'nordvpn.com', 'expressvpn.com'],
      totalClicks: 195,
      estimatedRevenue: 1575.0
    }
  ];

  public clickEvents: CouponClickEvent[] = [
    {
      id: 'evt_1',
      couponId: 'coup_hostinger_75',
      storeName: 'Hostinger Cloud',
      codeApplied: 'SPY75',
      savingsEstimate: 85.0,
      installationId: 'inst_x9182',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
    },
    {
      id: 'evt_2',
      couponId: 'coup_canva_30',
      storeName: 'Canva Pro',
      codeApplied: 'CREATOR30',
      savingsEstimate: 12.99,
      installationId: 'inst_k8192',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString()
    }
  ];

  public submissions: CommunitySubmission[] = [
    {
      id: 'subm_1',
      domain: 'runwayml.com',
      storeName: 'Runway Gen-3',
      code: 'GEN3STUDENT',
      discountValue: '25% OFF',
      submittedBy: 'alex@creatorlab.io',
      status: 'pending',
      submittedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
    }
  ];
}

const globalForSpy = globalThis as unknown as { couponAdminDataStore: AdminDataStore };
export const db = globalForSpy.couponAdminDataStore || new AdminDataStore();
if (process.env.NODE_ENV !== 'production') globalForSpy.couponAdminDataStore = db;
