import React, { useState, useEffect } from 'react';
import { SaaSCoupon, UserSettings } from '../types';
import { ExtensionStorage } from '../utils/storage';
import { SaaSSpyApiClient } from '../utils/apiClient';
import {
  Tag,
  Search,
  Copy,
  Check,
  ExternalLink,
  TrendingUp,
  PlusCircle,
  X,
  CheckCircle2
} from 'lucide-react';

export const App: React.FC = () => {
  const [coupons, setCoupons] = useState<SaaSCoupon[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Submit modal state
  const [submitStore, setSubmitStore] = useState('');
  const [submitCode, setSubmitCode] = useState('');
  const [submitDiscount, setSubmitDiscount] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const [storedCoupons, storedSettings] = await Promise.all([
        ExtensionStorage.getCoupons(),
        ExtensionStorage.getSettings()
      ]);
      setCoupons(storedCoupons);
      setSettings(storedSettings);

      // Background sync with live Edge API
      const live = await SaaSSpyApiClient.fetchLiveCoupons();
      if (live && live.length > 0) {
        setCoupons(live);
        await ExtensionStorage.setCoupons(live);
      }
    };

    loadData();
  }, []);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch {}
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
  };

  const handleSubmitDeal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setSubmitStore('');
      setSubmitCode('');
      setSubmitDiscount('');
    }, 2000);
  };

  const categories = [
    { id: 'all', label: '🔥 All Deals' },
    { id: 'ai_tools', label: '🤖 AI & Video' },
    { id: 'hosting', label: '☁️ Hosting' },
    { id: 'design', label: '🎨 Design' },
    { id: 'security', label: '🛡️ Security' },
    { id: 'productivity', label: '⚡ Productivity' }
  ];

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-[360px] min-h-[520px] max-h-[580px] bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="p-3.5 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/30 text-amber-400">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white flex items-center gap-1.5 leading-tight">
              SaaS Coupon Spy
              <span className="bg-amber-500/20 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                PRO
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">AI & Software Discounts</p>
          </div>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700 font-medium transition"
        >
          <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Submit</span>
        </button>
      </header>

      {/* Savings Summary Banner */}
      <div className="px-3.5 pt-3 pb-2">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Total Saved</span>
              <p className="text-lg font-bold text-emerald-400 leading-tight">
                ${settings ? settings.totalSavedDollars.toFixed(2) : '0.00'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Deals Applied</span>
            <span className="text-xs font-bold text-slate-200">
              {settings ? settings.couponsAppliedCount : 0} Checkouts
            </span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-3.5 py-1.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI tools, hosting, promo codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-amber-500 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="px-3.5 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Coupons List */}
      <main className="flex-1 overflow-y-auto px-3.5 py-2 flex flex-col gap-2.5">
        {filteredCoupons.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No active deals matching your search.
          </div>
        ) : (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 rounded-xl p-3 flex flex-col gap-2 transition shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                    {coupon.storeName}
                  </h3>
                  <p className="text-[10px] text-slate-400">{coupon.domain}</p>
                </div>

                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {coupon.discountValue}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug">{coupon.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-0.5">
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs px-2.5 py-1 rounded-lg transition"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{coupon.code}</span>
                    </>
                  )}
                </button>

                <a
                  href={coupon.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-amber-400 transition"
                >
                  <span>Open Store</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Submit Deal Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xs p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-400" />
                Submit a SaaS Promo Code
              </h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-6 text-center text-emerald-400 font-bold text-xs flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <span>Thank you! Deal submitted for verification.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitDeal} className="flex flex-col gap-2.5 text-xs">
                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">SaaS Store Name / Domain</label>
                  <input
                    type="text"
                    placeholder="e.g. cursor.com"
                    value={submitStore}
                    onChange={(e) => setSubmitStore(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-100 focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">Promo Code</label>
                  <input
                    type="text"
                    placeholder="e.g. AI2026"
                    value={submitCode}
                    onChange={(e) => setSubmitCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">Estimated Discount</label>
                  <input
                    type="text"
                    placeholder="e.g. 20% OFF or $10 Credit"
                    value={submitDiscount}
                    onChange={(e) => setSubmitDiscount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition"
                >
                  Submit for Community Verification
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
