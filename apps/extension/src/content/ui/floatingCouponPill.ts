import { SaaSCoupon } from '../../types';
import { AutoApplier } from '../autoApplier';

export class FloatingCouponPill {
  private static hostElement: HTMLElement | null = null;
  private static shadowRoot: ShadowRoot | null = null;

  public static render(
    coupons: SaaSCoupon[],
    inputField: HTMLInputElement | null,
    applyButton: HTMLElement | null
  ) {
    if (this.hostElement || coupons.length === 0) return;

    this.hostElement = document.createElement('div');
    this.hostElement.id = 'saas-coupon-spy-root';
    this.hostElement.style.all = 'initial';
    this.hostElement.style.position = 'fixed';
    this.hostElement.style.bottom = '24px';
    this.hostElement.style.right = '24px';
    this.hostElement.style.zIndex = '2147483647';
    this.hostElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    this.shadowRoot = this.hostElement.attachShadow({ mode: 'open' });

    const bestCoupon = coupons[0];
    const storeName = bestCoupon.storeName;

    const style = document.createElement('style');
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

    const container = document.createElement('div');
    container.className = 'pill';
    container.innerHTML = `
      <div class="header">
        <div class="badge">
          <span>🏷️ ${coupons.length} Verified Deals</span>
        </div>
        <button class="close-btn" id="spy-close">✕</button>
      </div>
      <div class="body">
        <div>
          <div class="title">${bestCoupon.discountValue} at ${storeName}</div>
          <div class="desc">${bestCoupon.description}</div>
        </div>

        <button class="auto-btn" id="spy-apply-btn">
          ✨ Auto-Apply Best Code (${bestCoupon.code})
        </button>

        <div id="spy-result-slot" style="display:none;"></div>
      </div>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
    document.body.appendChild(this.hostElement);

    // Click handlers
    this.shadowRoot.getElementById('spy-close')?.addEventListener('click', () => {
      this.destroy();
    });

    const applyBtn = this.shadowRoot.getElementById('spy-apply-btn') as HTMLButtonElement;
    applyBtn?.addEventListener('click', async () => {
      applyBtn.disabled = true;
      applyBtn.textContent = '⚡ Testing codes...';

      try {
        const result = await AutoApplier.testAndApplyCodes(inputField, applyButton, coupons, (p) => {
          applyBtn.textContent = `Testing ${p.currentCode} (${p.index}/${p.total})...`;
        });

        applyBtn.style.display = 'none';
        const resultSlot = this.shadowRoot?.getElementById('spy-result-slot');
        if (resultSlot) {
          resultSlot.style.display = 'block';
          resultSlot.className = 'applied-state';
          resultSlot.textContent = `🎉 Applied code "${result.appliedCode}" (${result.discountValue})!`;
        }
      } catch {
        applyBtn.textContent = `✓ Copied "${bestCoupon.code}" to Clipboard!`;
      }
    });
  }

  public static destroy() {
    if (this.hostElement) {
      this.hostElement.remove();
      this.hostElement = null;
      this.shadowRoot = null;
    }
  }
}
