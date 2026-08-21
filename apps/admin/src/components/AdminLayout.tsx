'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tag,
  LayoutDashboard,
  Ticket,
  Sparkles,
  DollarSign,
  Bot,
  ExternalLink
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
    { href: '/admin/coupons', label: 'Coupons & Deals CMS', icon: Ticket },
    { href: '/admin/ai-scraper', label: 'Gemini AI Deals Parser', icon: Bot },
    { href: '/admin/partners', label: 'Affiliate Networks', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30 text-amber-400">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                SaaS Spy
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                  Admin
                </span>
              </h1>
              <p className="text-xs text-slate-400">Promo Engine & Edge API</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800/80 px-2 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gemini Flash API:</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live
            </span>
          </div>
          <p className="text-[11px] text-slate-500">SaaS Coupon Spy Engine v1.0.0</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-200 font-semibold capitalize">
              {pathname === '/admin' ? 'Overview' : pathname.replace('/admin/', '')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/api/v1/coupons"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-lg font-medium transition"
            >
              <span>Test Edge Coupons JSON</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                PJ
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-slate-200">Pål Alexander</p>
                <p className="text-[10px] text-slate-500">Owner & Publisher</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
