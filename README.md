# 🏷️ SaaS Coupon Spy — The "Honey" for SaaS, AI Tools & Cloud Subscriptions

> Automatically detects SaaS checkout pages, tests verified promo codes in 2 seconds, applies the best discount, and generates high-ticket affiliate commissions.

---

## 🌟 Architecture Overview

```
saas-coupon-spy/
├── apps/
│   ├── extension/        # Manifest V3 Chrome Extension (React 18 + Tailwind + Auto-Applier)
│   └── admin/            # Next.js 14 Admin Portal, Edge API & Gemini AI Coupon Verifier
├── subsentry-extension-v1.0.0.zip # Store-ready ZIP package
└── Dockerfile            # Multi-stage container for 1-click Google Cloud Run deployment
```

---

## 🚀 Quick Start

### 1. Run Admin Portal Locally:
```bash
cd apps/admin
npm install
npm run dev
# Open http://localhost:3000
```

### 2. Build Chrome Extension:
```bash
cd apps/extension
npm install
npm run build
npm run package
```

### 3. Deploy to Google Cloud Run:
```bash
gcloud run deploy saas-coupon-spy \
  --source apps/admin \
  --region europe-west1 \
  --allow-unauthenticated
```
