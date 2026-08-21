import { DEFAULT_SAAS_COUPONS } from '../data/defaultCoupons';
import { SaaSCoupon, UserSettings } from '../types';

const DEFAULT_SETTINGS: UserSettings = {
  autoApplyCoupons: true,
  notifyOnSavingsFound: true,
  preferredCategories: ['ai_tools', 'hosting', 'design', 'dev_tools', 'productivity', 'security'],
  totalSavedDollars: 0,
  couponsAppliedCount: 0,
  installationId: `inst_${Math.random().toString(36).substring(2, 12)}`
};

export class ExtensionStorage {
  public static isContextValid(): boolean {
    try {
      return typeof chrome !== 'undefined' && Boolean(chrome.runtime && chrome.runtime.id);
    } catch {
      return false;
    }
  }

  public static async getSettings(): Promise<UserSettings> {
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(['settings'], (result) => {
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
          const local = localStorage.getItem('saas_spy_settings');
          resolve(local ? JSON.parse(local) : DEFAULT_SETTINGS);
        }
      } catch {
        resolve(DEFAULT_SETTINGS);
      }
    });
  }

  public static async saveSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ settings: updated }, () => resolve(updated));
        } else {
          localStorage.setItem('saas_spy_settings', JSON.stringify(updated));
          resolve(updated);
        }
      } catch {
        resolve(updated);
      }
    });
  }

  public static async getCoupons(): Promise<SaaSCoupon[]> {
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(['cachedCoupons'], (result) => {
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
          const local = localStorage.getItem('saas_spy_coupons');
          resolve(local ? JSON.parse(local) : DEFAULT_SAAS_COUPONS);
        }
      } catch {
        resolve(DEFAULT_SAAS_COUPONS);
      }
    });
  }

  public static async setCoupons(coupons: SaaSCoupon[]): Promise<void> {
    return new Promise((resolve) => {
      try {
        if (this.isContextValid() && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ cachedCoupons: coupons }, () => resolve());
        } else {
          localStorage.setItem('saas_spy_coupons', JSON.stringify(coupons));
          resolve();
        }
      } catch {
        resolve();
      }
    });
  }

  public static async recordSavings(amount: number): Promise<void> {
    const settings = await this.getSettings();
    await this.saveSettings({
      totalSavedDollars: Math.round((settings.totalSavedDollars + amount) * 100) / 100,
      couponsAppliedCount: settings.couponsAppliedCount + 1
    });
  }
}
