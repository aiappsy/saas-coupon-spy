import { CouponDetector } from './couponDetector';
import { FloatingCouponPill } from './ui/floatingCouponPill';
import { ExtensionStorage } from '../utils/storage';
import { SaaSSpyApiClient } from '../utils/apiClient';

// Suppress unhandled context invalidation reloads
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && String(event.reason).includes('Extension context invalidated')) {
    event.preventDefault();
  }
});

let scanTimer: number | null = null;
let observer: MutationObserver | null = null;

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

    const hostname = window.location.hostname.replace(/^www\./, '').toLowerCase();

    // 1. Fetch matching coupons (Local Cache + Live Edge API)
    const cachedCoupons = await ExtensionStorage.getCoupons();
    let matching = cachedCoupons.filter((c) => c.domain.toLowerCase().includes(hostname) || hostname.includes(c.domain.toLowerCase()));

    // Try edge API sync
    const live = await SaaSSpyApiClient.fetchLiveCoupons(hostname);
    if (live && live.length > 0) {
      matching = live;
    }

    if (matching.length === 0) return;

    // 2. Scan DOM for checkout form
    const checkoutResult = CouponDetector.scanPage();
    if (checkoutResult.isCheckoutPage) {
      FloatingCouponPill.render(matching, checkoutResult.couponInputField, checkoutResult.applyButton);
    }
  } catch {
    // Silent lifecycle handling
  }
}

// Initial Run
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(runCouponCheck, 1200));
} else {
  setTimeout(runCouponCheck, 1200);
}

// MutationObserver for dynamic checkout apps
if (typeof MutationObserver !== 'undefined') {
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
  } catch {}
}
