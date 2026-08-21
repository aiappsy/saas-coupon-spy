// src/utils/apiClient.ts
var ADMIN_API_BASE = "http://localhost:3000/api";
var SaaSSpyApiClient = class {
  /**
   * Fetches latest verified SaaS coupons and partner discounts from the Admin Edge API.
   */
  static async fetchLiveCoupons(domain) {
    try {
      const url = domain ? `${ADMIN_API_BASE}/v1/coupons?domain=${encodeURIComponent(domain)}` : `${ADMIN_API_BASE}/v1/coupons`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) return null;
      const data = await response.json();
      return data.coupons || null;
    } catch {
      return null;
    }
  }
  /**
   * Tracks when a user applies a discount code or clicks an affiliate offer.
   */
  static async trackCouponApplied(payload) {
    try {
      await fetch(`${ADMIN_API_BASE}/v1/events/click`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch {
    }
  }
};

// src/data/defaultCoupons.ts
var DEFAULT_SAAS_COUPONS = [
  // Hosting & Cloud
  {
    id: "coup_hostinger_75",
    domain: "hostinger.com",
    storeName: "Hostinger Cloud",
    code: "SPY75",
    discountType: "percentage",
    discountValue: "75% OFF",
    description: "75% discount on Premium & Business Cloud hosting plans + Free Domain.",
    affiliateUrl: "https://hostinger.com/?ref=saascouponspy",
    category: "hosting",
    successRate: 99,
    verifiedAt: "2026-08-20",
    featured: true
  },
  {
    id: "coup_namecheap_20",
    domain: "namecheap.com",
    storeName: "Namecheap",
    code: "COUPONSPY",
    discountType: "percentage",
    discountValue: "20% OFF",
    description: "20% off new domain registrations and shared hosting.",
    affiliateUrl: "https://namecheap.com/?ref=saascouponspy",
    category: "hosting",
    successRate: 94,
    verifiedAt: "2026-08-19",
    featured: false
  },
  // AI & Creator Tools
  {
    id: "coup_elevenlabs_50",
    domain: "elevenlabs.io",
    storeName: "ElevenLabs AI Voice",
    code: "VOICEPRO50",
    discountType: "percentage",
    discountValue: "50% OFF",
    description: "50% off your first month of Creator tier voice generation.",
    affiliateUrl: "https://elevenlabs.io/?ref=saascouponspy",
    category: "ai_tools",
    successRate: 96,
    verifiedAt: "2026-08-20",
    featured: true
  },
  {
    id: "coup_heygen_20",
    domain: "heygen.com",
    storeName: "HeyGen AI Video",
    code: "GENAI20",
    discountType: "percentage",
    discountValue: "20% OFF",
    description: "20% discount on Creator and Team annual subscriptions.",
    affiliateUrl: "https://heygen.com/?ref=saascouponspy",
    category: "ai_tools",
    successRate: 92,
    verifiedAt: "2026-08-18",
    featured: true
  },
  {
    id: "coup_canva_30",
    domain: "canva.com",
    storeName: "Canva Pro",
    code: "CREATOR30",
    discountType: "extended_trial",
    discountValue: "30-Day Free Pro",
    description: "Extended 30-day free trial of Canva Pro with full AI tools unlocked.",
    affiliateUrl: "https://canva.com/pro/?ref=saascouponspy",
    category: "design",
    successRate: 100,
    verifiedAt: "2026-08-20",
    featured: true
  },
  // Creative & Design
  {
    id: "coup_affinity_20",
    domain: "serif.com",
    storeName: "Affinity Photo & Designer",
    code: "NOSUB20",
    discountType: "percentage",
    discountValue: "20% OFF",
    description: "One-time perpetual license with zero subscriptions (Adobe alternative).",
    affiliateUrl: "https://affinity.serif.com/?ref=saascouponspy",
    category: "design",
    successRate: 95,
    verifiedAt: "2026-08-15",
    featured: true
  },
  {
    id: "coup_descript_free",
    domain: "descript.com",
    storeName: "Descript Video Editor",
    code: "EDITPRO",
    discountType: "free_credits",
    discountValue: "10 Free Hrs",
    description: "10 hours of automatic AI transcription and video editing credits.",
    affiliateUrl: "https://descript.com/?ref=saascouponspy",
    category: "design",
    successRate: 97,
    verifiedAt: "2026-08-17",
    featured: false
  },
  // Privacy & Security
  {
    id: "coup_proton_50",
    domain: "protonvpn.com",
    storeName: "Proton VPN",
    code: "PRIVACY50",
    discountType: "percentage",
    discountValue: "50% OFF",
    description: "50% off 2-year Swiss privacy plan with 10Gbps servers.",
    affiliateUrl: "https://protonvpn.com/?ref=saascouponspy",
    category: "security",
    successRate: 98,
    verifiedAt: "2026-08-20",
    featured: true
  },
  {
    id: "coup_nordvpn_70",
    domain: "nordvpn.com",
    storeName: "NordVPN",
    code: "SAVE70",
    discountType: "percentage",
    discountValue: "70% OFF",
    description: "70% off 2-year plan + 3 months extra free.",
    affiliateUrl: "https://nordvpn.com/?ref=saascouponspy",
    category: "security",
    successRate: 93,
    verifiedAt: "2026-08-19",
    featured: false
  },
  // Developer & Productivity
  {
    id: "coup_notion_ai",
    domain: "notion.so",
    storeName: "Notion Plus",
    code: "STARTUPAI",
    discountType: "free_credits",
    discountValue: "$500 Credits",
    description: "Up to $500 in free Notion credits for startups and creators.",
    affiliateUrl: "https://notion.so/?ref=saascouponspy",
    category: "productivity",
    successRate: 90,
    verifiedAt: "2026-08-16",
    featured: false
  }
];

// src/utils/storage.ts
var DEFAULT_SETTINGS = {
  autoApplyCoupons: true,
  notifyOnSavingsFound: true,
  preferredCategories: ["ai_tools", "hosting", "design", "dev_tools", "productivity", "security"],
  totalSavedDollars: 0,
  couponsAppliedCount: 0,
  installationId: `inst_${Math.random().toString(36).substring(2, 12)}`
};
var ExtensionStorage = class {
  static isContextValid() {
    try {
      return typeof chrome !== "undefined" && Boolean(chrome.runtime && chrome.runtime.id);
    } catch {
      return false;
    }
  }
  static async getSettings() {
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(["settings"], (result) => {
            try {
              if (chrome.runtime?.lastError) {
                resolve(DEFAULT_SETTINGS);
                return;
              }
              resolve(result?.settings || DEFAULT_SETTINGS);
            } catch {
              resolve(DEFAULT_SETTINGS);
            }
          });
        } else {
          const local = localStorage.getItem("saas_spy_settings");
          resolve(local ? JSON.parse(local) : DEFAULT_SETTINGS);
        }
      } catch {
        resolve(DEFAULT_SETTINGS);
      }
    });
  }
  static async saveSettings(settings) {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ settings: updated }, () => resolve(updated));
        } else {
          localStorage.setItem("saas_spy_settings", JSON.stringify(updated));
          resolve(updated);
        }
      } catch {
        resolve(updated);
      }
    });
  }
  static async getCoupons() {
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(["cachedCoupons"], (result) => {
            try {
              if (chrome.runtime?.lastError) {
                resolve(DEFAULT_SAAS_COUPONS);
                return;
              }
              resolve(result?.cachedCoupons || DEFAULT_SAAS_COUPONS);
            } catch {
              resolve(DEFAULT_SAAS_COUPONS);
            }
          });
        } else {
          const local = localStorage.getItem("saas_spy_coupons");
          resolve(local ? JSON.parse(local) : DEFAULT_SAAS_COUPONS);
        }
      } catch {
        resolve(DEFAULT_SAAS_COUPONS);
      }
    });
  }
  static async setCoupons(coupons) {
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ cachedCoupons: coupons }, () => resolve());
        } else {
          localStorage.setItem("saas_spy_coupons", JSON.stringify(coupons));
          resolve();
        }
      } catch {
        resolve();
      }
    });
  }
  static async recordSavings(amount) {
    const settings = await this.getSettings();
    await this.saveSettings({
      totalSavedDollars: Math.round((settings.totalSavedDollars + amount) * 100) / 100,
      couponsAppliedCount: settings.couponsAppliedCount + 1
    });
  }
};

// src/background/serviceWorker.ts
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    const liveCoupons = await SaaSSpyApiClient.fetchLiveCoupons();
    if (liveCoupons && liveCoupons.length > 0) {
      await ExtensionStorage.setCoupons(liveCoupons);
    }
  }
});
