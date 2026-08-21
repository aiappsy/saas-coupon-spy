import { NextResponse } from 'next/server';
import { db, SaaSCoupon } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    total: db.coupons.length,
    coupons: db.coupons
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { domain, storeName, code, discountType, discountValue, description, affiliateUrl, category } = body;

    if (!domain || !code) {
      return NextResponse.json({ error: 'Domain and Code are required' }, { status: 400 });
    }

    const newCoupon: SaaSCoupon = {
      id: `coup_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      domain: domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, ''),
      storeName: storeName || domain,
      code: code.toUpperCase().trim(),
      discountType: discountType || 'percentage',
      discountValue: discountValue || '20% OFF',
      description: description || `Verified promo code for ${storeName || domain}.`,
      affiliateUrl: affiliateUrl || `https://${domain}`,
      category: category || 'ai_tools',
      successRate: 98,
      verifiedAt: new Date().toISOString().split('T')[0],
      featured: false,
      active: true
    };

    db.coupons.unshift(newCoupon);

    return NextResponse.json({ success: true, coupon: newCoupon });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}
