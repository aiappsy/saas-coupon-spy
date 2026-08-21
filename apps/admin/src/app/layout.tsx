import type { Metadata } from 'next';
import './globals.css';
import { AdminLayout } from '@/components/AdminLayout';

export const metadata: Metadata = {
  title: 'SaaS Coupon Spy — Admin Control Hub & Edge API',
  description: 'Manage SaaS promo codes, affiliate routes, and Gemini AI coupon scraping.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
