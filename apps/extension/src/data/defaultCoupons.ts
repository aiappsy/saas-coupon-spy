import { SaaSCoupon } from '../types';

export const DEFAULT_SAAS_COUPONS: SaaSCoupon[] = [
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
    featured: true
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
    featured: false
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
    featured: true
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
    featured: true
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
    featured: true
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
    featured: true
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
    featured: false
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
    featured: true
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
    featured: false
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
    featured: false
  }
];
