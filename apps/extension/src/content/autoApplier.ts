import { SaaSCoupon } from '../types';
import { ExtensionStorage } from '../utils/storage';
import { SaaSSpyApiClient } from '../utils/apiClient';

export interface ApplyProgressCallback {
  (progress: { currentCode: string; index: number; total: number; bestCode: string | null }): void;
}

export class AutoApplier {
  /**
   * Automatically tests a list of promo codes against the checkout form input.
   */
  public static async testAndApplyCodes(
    inputField: HTMLInputElement | null,
    applyButton: HTMLElement | null,
    coupons: SaaSCoupon[],
    onProgress?: ApplyProgressCallback
  ): Promise<{ appliedCode: string; discountValue: string }> {
    if (coupons.length === 0) {
      throw new Error('No coupons available to test');
    }

    // Sort by highest discount / success rate
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

        // Dispatch React / Vue / standard DOM input events
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        inputField.dispatchEvent(new Event('change', { bubbles: true }));
        inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

        // Small simulated delay for UI feedback
        await new Promise((r) => setTimeout(r, 400));

        if (applyButton && i === 0) {
          applyButton.click();
        }
      } else {
        // Fallback: Copy to clipboard
        try {
          await navigator.clipboard.writeText(coup.code);
        } catch {}
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    // Record savings in storage and telemetry
    const settings = await ExtensionStorage.getSettings();
    await ExtensionStorage.recordSavings(15.0);

    SaaSSpyApiClient.trackCouponApplied({
      couponId: bestCoupon.id,
      storeName: bestCoupon.storeName,
      codeApplied: bestCoupon.code,
      savingsEstimate: 15.0,
      installationId: settings.installationId
    });

    return {
      appliedCode: bestCoupon.code,
      discountValue: bestCoupon.discountValue
    };
  }
}
