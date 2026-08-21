import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domainParam = searchParams.get('domain');

  let activeCoupons = db.coupons.filter((c) => c.active);

  if (domainParam) {
    const clean = domainParam.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();
    activeCoupons = activeCoupons.filter((c) => c.domain.toLowerCase().includes(clean));
  }

  return NextResponse.json({
    version: '1.0.0',
    totalCoupons: activeCoupons.length,
    coupons: activeCoupons,
    updatedAt: new Date().toISOString()
  });
}
