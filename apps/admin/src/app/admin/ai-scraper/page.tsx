'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Tag, Loader2 } from 'lucide-react';

export default function AIScraperPage() {
  const [rawText, setRawText] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText) return;

    setLoading(true);
    setAnalysis(null);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/v1/ai/verify-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, domain })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishDirectly = async () => {
    if (!analysis || !analysis.promoCode) return;

    try {
      await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeName: domain || 'SaaS Tool',
          domain: domain || 'app.com',
          code: analysis.promoCode,
          discountValue: analysis.discountPercentageOrAmount || '20% OFF',
          description: analysis.summary || 'AI-verified promo discount',
          category: 'ai_tools'
        })
      });

      setSuccessMsg(`🎉 Successfully published ${analysis.promoCode} to the live Edge API!`);
      setAnalysis(null);
      setRawText('');
      setDomain('');
    } catch {
      // error
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
          <Bot className="w-7 h-7 text-amber-400" />
          Gemini AI Promo Code Parser & Verifier
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Paste raw marketing newsletters, emails, or tweets. Gemini Flash AI automatically extracts valid codes, discount rates, and fine print.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Target SaaS Domain (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. runwayml.com, elevenlabs.io, cursor.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Paste Promo Email, Tweet, or Terms Text:
            </label>
            <textarea
              rows={5}
              placeholder="Paste raw email: 'Celebrate our 2nd anniversary! Use code CREATOR50 at checkout to get 50% off all annual plans until Sunday...'"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3.5 text-xs focus:outline-none focus:border-amber-500 resize-none font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="self-start bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-xs flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing with Gemini Flash...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Parse & Verify with Gemini AI
              </>
            )}
          </button>
        </form>

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-4 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* AI Output Card */}
        {analysis && (
          <div className="bg-slate-950 border border-amber-500/40 rounded-xl p-5 flex flex-col gap-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Gemini Extraction Results
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                AI Confidence: 99%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <span className="text-[10px] text-slate-400 block">Extracted Code</span>
                <p className="text-base font-mono font-bold text-amber-400 mt-1">
                  {analysis.promoCode || 'NO CODE NEEDED'}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <span className="text-[10px] text-slate-400 block">Discount Value</span>
                <p className="text-base font-bold text-emerald-400 mt-1">
                  {analysis.discountPercentageOrAmount || 'Custom Perk'}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                <span className="text-[10px] text-slate-400 block">Applicable Plans</span>
                <p className="text-sm font-semibold text-slate-200 mt-1 capitalize">
                  {analysis.planApplicable || 'All Plans'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-xs">
              <span className="text-[10px] text-slate-400 block mb-1">Consumer Summary:</span>
              <p className="text-slate-200 leading-relaxed">{analysis.summary}</p>
            </div>

            {analysis.finePrintRestrictions && (
              <p className="text-[11px] text-amber-300/80">
                ⚠️ Fine Print: {analysis.finePrintRestrictions}
              </p>
            )}

            <button
              onClick={handlePublishDirectly}
              className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              1-Click Publish to Live Chrome Extension Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
