import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { couponId, storeName, codeApplied, savingsEstimate, installationId } = body;

    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      couponId: couponId || 'direct_affiliate',
      storeName: storeName || 'SaaS Tool',
      codeApplied: codeApplied || 'NONE',
      savingsEstimate: Number(savingsEstimate) || 15.0,
      installationId: installationId || 'anonymous',
      timestamp: new Date().toISOString()
    };

    db.clickEvents.unshift(event);

    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
