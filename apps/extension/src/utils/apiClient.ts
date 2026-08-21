import { SaaSCoupon } from '../types';

export const ADMIN_API_BASE = 'http://localhost:3000/api';

export class SaaSSpyApiClient {
  /**
   * Fetches latest verified SaaS coupons and partner discounts from the Admin Edge API.
   */
  public static async fetchLiveCoupons(domain?: string): Promise<SaaSCoupon[] | null> {
    try {
      const url = domain
        ? `${ADMIN_API_BASE}/v1/coupons?domain=${encodeURIComponent(domain)}`
        : `${ADMIN_API_BASE}/v1/coupons`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
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
  public static async trackCouponApplied(payload: {
    couponId: string;
    storeName: string;
    codeApplied: string;
    savingsEstimate: number;
    installationId: string;
  }): Promise<void> {
    try {
      await fetch(`${ADMIN_API_BASE}/v1/events/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      // non-blocking
    }
  }
}
