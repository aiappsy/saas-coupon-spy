export interface DetectedCheckoutForm {
  isCheckoutPage: boolean;
  couponInputField: HTMLInputElement | null;
  applyButton: HTMLElement | null;
  formContainer: HTMLElement | null;
}

export class CouponDetector {
  private static COUPON_INPUT_SELECTORS = [
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
    '.StripeElement input',
    '[data-testid*="coupon" i]',
    '[data-testid*="promo" i]'
  ];

  private static APPLY_BUTTON_SELECTORS = [
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
  public static scanPage(): DetectedCheckoutForm {
    let couponInput: HTMLInputElement | null = null;
    let applyBtn: HTMLElement | null = null;

    // Check for input
    for (const selector of this.COUPON_INPUT_SELECTORS) {
      const el = document.querySelector(selector) as HTMLInputElement;
      if (el && el.offsetParent !== null && !el.disabled) {
        couponInput = el;
        break;
      }
    }

    // Check for apply button near the input
    if (couponInput) {
      const parent = couponInput.closest('form') || couponInput.parentElement;
      if (parent) {
        for (const btnSelector of this.APPLY_BUTTON_SELECTORS) {
          const btn = parent.querySelector(btnSelector) as HTMLElement;
          if (btn) {
            applyBtn = btn;
            break;
          }
        }
      }
    }

    const path = window.location.pathname.toLowerCase();
    const isCheckout =
      Boolean(couponInput) ||
      path.includes('/checkout') ||
      path.includes('/subscribe') ||
      path.includes('/billing') ||
      path.includes('/cart') ||
      path.includes('/pricing') ||
      path.includes('/payment');

    return {
      isCheckoutPage: isCheckout,
      couponInputField: couponInput,
      applyButton: applyBtn,
      formContainer: couponInput ? couponInput.parentElement : null
    };
  }
}
