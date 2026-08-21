'use client';

import React, { useState, useEffect } from 'react';
import { db, SaaSCoupon } from '@/lib/db';
import { Ticket, Plus, Search, CheckCircle2, Sparkles, ExternalLink, Filter, Tag } from 'lucide-react';

export default function CouponsCMSPage() {
  const [coupons, setCoupons] = useState<SaaSCoupon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [storeName, setStoreName] = useState('');
  const [domain, setDomain] = useState('');
  const [code, setCode] = useState('');
  const [discountValue, setDiscountValue] = useState('20% OFF');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'ai_tools' | 'hosting' | 'design' | 'dev_tools' | 'productivity' | 'security' | 'marketing'>('ai_tools');
  const [affiliateUrl, setAffiliateUrl] = useState('');

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      setCoupons(data.coupons || []);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName,
          domain,
          code,
          discountValue,
          description,
          category,
          affiliateUrl
        })
      });

      setShowAddModal(false);
      setStoreName('');
      setDomain('');
      setCode('');
      setDescription('');
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Ticket className="w-7 h-7 text-amber-400" />
            SaaS Coupons & Promo Code CMS
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage active promo codes and discount triggers distributed to all extension users via Edge API.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-sm transition"
        >
          <Plus className="w-4 h-4" />
          + Add New Promo Code
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tool name, domain, or promo code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Categories</option>
            <option value="ai_tools">AI & Video Tools</option>
            <option value="hosting">Cloud & Hosting</option>
            <option value="design">Design & Creative</option>
            <option value="dev_tools">Developer Tools</option>
            <option value="security">Security & VPN</option>
            <option value="productivity">Productivity</option>
          </select>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">SaaS Service</th>
                <th className="py-3.5 px-4">Promo Code</th>
                <th className="py-3.5 px-4">Discount Value</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Success Rate</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-100 block text-sm">{coupon.storeName}</span>
                    <span className="text-[11px] text-slate-400">{coupon.domain}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-950 border border-amber-500/30 text-amber-400 font-mono font-bold px-2.5 py-1 rounded-md text-xs">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{coupon.discountValue}</td>
                  <td className="py-3.5 px-4 capitalize text-slate-400">{coupon.category.replace('_', ' ')}</td>
                  <td className="py-3.5 px-4 font-semibold text-sky-400">{coupon.successRate}% verified</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      Live on Edge
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-400" />
              Add New SaaS Coupon Code
            </h3>

            <form onSubmit={handleAddCoupon} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Store / Service Name</label>
                <input
                  type="text"
                  placeholder="e.g. Midjourney AI"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Domain</label>
                <input
                  type="text"
                  placeholder="e.g. midjourney.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Promo Code</label>
                  <input
                    type="text"
                    placeholder="e.g. SUMMER25"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Discount Value</label>
                  <input
                    type="text"
                    placeholder="e.g. 25% OFF"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="ai_tools">AI & Video Tools</option>
                  <option value="hosting">Cloud & Hosting</option>
                  <option value="design">Design & Creative</option>
                  <option value="dev_tools">Developer Tools</option>
                  <option value="security">Security & VPN</option>
                  <option value="productivity">Productivity</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Affiliate Destination URL</label>
                <input
                  type="text"
                  placeholder="https://partner.link/?ref=yourid"
                  value={affiliateUrl}
                  onChange={(e) => setAffiliateUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl"
                >
                  Save & Publish to Edge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
