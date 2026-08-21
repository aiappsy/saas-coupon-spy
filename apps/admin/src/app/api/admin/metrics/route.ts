import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const totalSavings = db.clickEvents.reduce((sum, e) => sum + e.savingsEstimate, 0);
  const totalAffiliateRevenue = db.partners.reduce((sum, p) => sum + p.estimatedRevenue, 0);
  const totalClicks = db.partners.reduce((sum, p) => sum + p.totalClicks, 0) + db.clickEvents.length;

  return NextResponse.json({
    metrics: {
      totalSavingsUser: Math.round(totalSavings * 100) / 100,
      totalAffiliateRevenue: Math.round(totalAffiliateRevenue * 100) / 100,
      totalCouponsActive: db.coupons.filter((c) => c.active).length,
      totalOutboundClicks: totalClicks,
      pendingSubmissions: db.submissions.filter((s) => s.status === 'pending').length
    },
    topPartners: db.partners,
    recentEvents: db.clickEvents.slice(0, 10)
  });
}
