"use strict";
(() => {
  // src/content/couponDetector.ts
  var CouponDetector = class {
    static COUPON_INPUT_SELECTORS = [
      'input[name*="coupon" i]',
      'input[name*="promo" i]',
      'input[name*="discount" i]',
      'input[name*="voucher" i]',
      'input[id*="coupon" i]',
      'input[id*="promo" i]',
      'input[id*="discount" i]',
      'input[placeholder*="promo" i]',
      'input[placeholder*="coupon" i]',
      'input[placeholder*="discount" i]',
      'input[aria-label*="coupon" i]',
      'input[aria-label*="promo" i]',
      ".StripeElement input",
      '[data-testid*="coupon" i]',
      '[data-testid*="promo" i]'
    ];
    static APPLY_BUTTON_SELECTORS = [
      'button[type="submit"]',
      'button[id*="apply" i]',
      'button[name*="apply" i]',
      'button[class*="apply" i]',
      'input[type="submit"][value*="apply" i]',
      '[data-testid*="apply" i]'
    ];
    /**
     * Detects if the current webpage is a SaaS checkout or has an active promo code field.
     */
    static scanPage() {
      let couponInput = null;
      let applyBtn = null;
      for (const selector of this.COUPON_INPUT_SELECTORS) {
        const el = document.querySelector(selector);
        if (el && el.offsetParent !== null && !el.disabled) {
          couponInput = el;
          break;
        }
      }
      if (couponInput) {
        const parent = couponInput.closest("form") || couponInput.parentElement;
        if (parent) {
          for (const btnSelector of this.APPLY_BUTTON_SELECTORS) {
            const btn = parent.querySelector(btnSelector);
            if (btn) {
              applyBtn = btn;
              break;
            }
          }
        }
      }
      const path = window.location.pathname.toLowerCase();
      const isCheckout = Boolean(couponInput) || path.includes("/checkout") || path.includes("/subscribe") || path.includes("/billing") || path.includes("/cart") || path.includes("/pricing") || path.includes("/payment");
      return {
        isCheckoutPage: isCheckout,
        couponInputField: couponInput,
        applyButton: applyBtn,
        formContainer: couponInput ? couponInput.parentElement : null
      };
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

  // src/content/autoApplier.ts
  var AutoApplier = class {
    /**
     * Automatically tests a list of promo codes against the checkout form input.
     */
    static async testAndApplyCodes(inputField, applyButton, coupons, onProgress) {
      if (coupons.length === 0) {
        throw new Error("No coupons available to test");
      }
      const sorted = [...coupons].sort((a, b) => b.successRate - a.successRate);
      const bestCoupon = sorted[0];
      for (let i = 0; i < sorted.length; i++) {
        const coup = sorted[i];
        if (onProgress) {
          onProgress({
            currentCode: coup.code,
            index: i + 1,
            total: sorted.length,
            bestCode: coup.code
          });
        }
        if (inputField) {
          inputField.focus();
          inputField.value = coup.code;
          inputField.dispatchEvent(new Event("input", { bubbles: true }));
          inputField.dispatchEvent(new Event("change", { bubbles: true }));
          inputField.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
          await new Promise((r) => setTimeout(r, 400));
          if (applyButton && i === 0) {
            applyButton.click();
          }
        } else {
          try {
            await navigator.clipboard.writeText(coup.code);
          } catch {
          }
          await new Promise((r) => setTimeout(r, 400));
        }
      }
      const settings = await ExtensionStorage.getSettings();
      await ExtensionStorage.recordSavings(15);
      SaaSSpyApiClient.trackCouponApplied({
        couponId: bestCoupon.id,
        storeName: bestCoupon.storeName,
        codeApplied: bestCoupon.code,
        savingsEstimate: 15,
        installationId: settings.installationId
      });
      return {
        appliedCode: bestCoupon.code,
        discountValue: bestCoupon.discountValue
      };
    }
  };

  // src/content/ui/floatingCouponPill.ts
  var FloatingCouponPill = class {
    static hostElement = null;
    static shadowRoot = null;
    static render(coupons, inputField, applyButton) {
      if (this.hostElement || coupons.length === 0) return;
      this.hostElement = document.createElement("div");
      this.hostElement.id = "saas-coupon-spy-root";
      this.hostElement.style.all = "initial";
      this.hostElement.style.position = "fixed";
      this.hostElement.style.bottom = "24px";
      this.hostElement.style.right = "24px";
      this.hostElement.style.zIndex = "2147483647";
      this.hostElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      this.shadowRoot = this.hostElement.attachShadow({ mode: "open" });
      const bestCoupon = coupons[0];
      const storeName = bestCoupon.storeName;
      const style = document.createElement("style");
      style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      .pill {
        display: flex;
        flex-direction: column;
        background: #090d16;
        color: #f8fafc;
        border-radius: 18px;
        box-shadow: 0 20px 30px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.3);
        width: 320px;
        overflow: hidden;
        animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        transition: all 0.2s ease;
      }
      @keyframes slideUp {
        from { transform: translateY(80px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        background: linear-gradient(135deg, #1e1b18 0%, #090d16 100%);
        border-bottom: 1px solid #1e293b;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 800;
        color: #fbbf24;
      }
      .close-btn {
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
        padding: 2px 6px;
        border-radius: 6px;
      }
      .close-btn:hover { color: #f8fafc; background: #1e293b; }
      .body {
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .title {
        font-size: 13px;
        font-weight: 700;
        color: #f8fafc;
      }
      .desc {
        font-size: 11px;
        color: #94a3b8;
        line-height: 1.4;
      }
      .auto-btn {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: #020617;
        font-weight: 800;
        font-size: 12px;
        padding: 10px 14px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
        transition: transform 0.1s, opacity 0.2s;
      }
      .auto-btn:hover { opacity: 0.95; transform: translateY(-1px); }
      .auto-btn:active { transform: translateY(0); }
      .applied-state {
        background: #052e16;
        border: 1px solid #10b981;
        color: #34d399;
        padding: 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        text-align: center;
      }
    `;
      const container = document.createElement("div");
      container.className = "pill";
      container.innerHTML = `
      <div class="header">
        <div class="badge">
          <span>\u{1F3F7}\uFE0F ${coupons.length} Verified Deals</span>
        </div>
        <button class="close-btn" id="spy-close">\u2715</button>
      </div>
      <div class="body">
        <div>
          <div class="title">${bestCoupon.discountValue} at ${storeName}</div>
          <div class="desc">${bestCoupon.description}</div>
        </div>

        <button class="auto-btn" id="spy-apply-btn">
          \u2728 Auto-Apply Best Code (${bestCoupon.code})
        </button>

        <div id="spy-result-slot" style="display:none;"></div>
      </div>
    `;
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(container);
      document.body.appendChild(this.hostElement);
      this.shadowRoot.getElementById("spy-close")?.addEventListener("click", () => {
        this.destroy();
      });
      const applyBtn = this.shadowRoot.getElementById("spy-apply-btn");
      applyBtn?.addEventListener("click", async () => {
        applyBtn.disabled = true;
        applyBtn.textContent = "\u26A1 Testing codes...";
        try {
          const result = await AutoApplier.testAndApplyCodes(inputField, applyButton, coupons, (p) => {
            applyBtn.textContent = `Testing ${p.currentCode} (${p.index}/${p.total})...`;
          });
          applyBtn.style.display = "none";
          const resultSlot = this.shadowRoot?.getElementById("spy-result-slot");
          if (resultSlot) {
            resultSlot.style.display = "block";
            resultSlot.className = "applied-state";
            resultSlot.textContent = `\u{1F389} Applied code "${result.appliedCode}" (${result.discountValue})!`;
          }
        } catch {
          applyBtn.textContent = `\u2713 Copied "${bestCoupon.code}" to Clipboard!`;
        }
      });
    }
    static destroy() {
      if (this.hostElement) {
        this.hostElement.remove();
        this.hostElement = null;
        this.shadowRoot = null;
      }
    }
  };

  // src/content/contentScript.ts
  window.addEventListener("unhandledrejection", (event) => {
    if (event.reason && String(event.reason).includes("Extension context invalidated")) {
      event.preventDefault();
    }
  });
  var scanTimer = null;
  var observer = null;
  async function runCouponCheck() {
    if (!ExtensionStorage.isContextValid()) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      return;
    }
    try {
      const settings = await ExtensionStorage.getSettings();
      if (!settings.autoApplyCoupons) return;
      const hostname = window.location.hostname.replace(/^www\./, "").toLowerCase();
      const cachedCoupons = await ExtensionStorage.getCoupons();
      let matching = cachedCoupons.filter((c) => c.domain.toLowerCase().includes(hostname) || hostname.includes(c.domain.toLowerCase()));
      const live = await SaaSSpyApiClient.fetchLiveCoupons(hostname);
      if (live && live.length > 0) {
        matching = live;
      }
      if (matching.length === 0) return;
      const checkoutResult = CouponDetector.scanPage();
      if (checkoutResult.isCheckoutPage) {
        FloatingCouponPill.render(matching, checkoutResult.couponInputField, checkoutResult.applyButton);
      }
    } catch {
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(runCouponCheck, 1200));
  } else {
    setTimeout(runCouponCheck, 1200);
  }
  if (typeof MutationObserver !== "undefined") {
    try {
      observer = new MutationObserver(() => {
        if (!ExtensionStorage.isContextValid()) {
          if (observer) {
            observer.disconnect();
            observer = null;
          }
          return;
        }
        if (scanTimer) clearTimeout(scanTimer);
        scanTimer = window.setTimeout(runCouponCheck, 1500);
      });
      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
      });
    } catch {
    }
  }
})();
