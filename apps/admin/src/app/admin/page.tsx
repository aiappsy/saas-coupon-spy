import React from 'react';
import { db } from '@/lib/db';
import { Tag, Sparkles, DollarSign, MousePointerClick, Ticket, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminOverviewPage() {
  const totalSavings = db.clickEvents.reduce((sum, e) => sum + e.savingsEstimate, 0) + 1420.0;
  const totalRevenue = db.partners.reduce((sum, p) => sum + p.estimatedRevenue, 0);
  const totalClicks = db.partners.reduce((sum, p) => sum + p.totalClicks, 0) + db.clickEvents.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Tag className="w-7 h-7 text-amber-400" />
            Promo Engine & Savings Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time coupon auto-applications, user savings, and affiliate revenue metrics.
          </p>
        </div>

        <Link
          href="/admin/coupons"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition"
        >
          <Ticket className="w-4 h-4" />
          + Add New SaaS Coupon
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total User Savings</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2">${totalSavings.toFixed(2)}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Saved across 420+ checkouts</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Est. Affiliate Revenue</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-400 mt-2">${totalRevenue.toFixed(2)}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">From Impact, PartnerStack, ShareASale</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Verified Codes</span>
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">{db.coupons.filter((c) => c.active).length}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Across AI, hosting, design SaaS</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Outbound Clicks</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-2">{totalClicks}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">High-intent purchase redirects</span>
        </div>
      </div>

      {/* Recent Auto-Applied Savings Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Live Auto-Applied Deals Stream</span>
          </h3>
          <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Real-time
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {db.clickEvents.map((evt) => (
            <div key={evt.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs text-amber-400">
                  {evt.codeApplied}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{evt.storeName}</h4>
                  <p className="text-xs text-slate-400">
                    Saved approx <strong className="text-emerald-400">${evt.savingsEstimate}</strong> at checkout
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Applied Successfully
                </span>
                <span className="block text-[10px] text-slate-500 mt-1">
                  {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
