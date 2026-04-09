import React, { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { connection } from 'next/server'; // এটি ইম্পোর্ট করুন
import { BarChart3, MousePointer2, Eye, Globe, Clock } from 'lucide-react';

// ডেটা নিয়ে আসার ফাংশন (এটিকে ক্যাশ করবেন না)
async function AnalyticsList() {
  // ১. explicit-লি কানেকশন কল করুন যাতে Next.js জানে এটি রিকোয়েস্ট টাইমে রান হবে
  await connection(); 

  const data = await prisma.adAnalytics.findMany({
    orderBy: { lastUpdated: 'desc' },
  });

  const totalImpressions = data.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = data.reduce((acc, curr) => acc + curr.clicks, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00";

  return (
    <>
      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Impressions" value={totalImpressions.toLocaleString()} icon={<Eye size={20}/>} color="bg-blue-600" />
        <StatCard title="Total Clicks" value={totalClicks.toLocaleString()} icon={<MousePointer2 size={20}/>} color="bg-green-600" />
        <StatCard title="Avg. Click Rate" value={`${avgCTR}%`} icon={<BarChart3 size={20}/>} color="bg-purple-600" />
      </div> */}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ad Identifier</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Site</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Impressions</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Clicks</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((ad) => (
              <tr key={ad.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-blue-600 font-semibold">{ad.adId}</td>
                <td className="px-6 py-4 text-slate-600 text-sm">{ad.site}</td>
                <td className="px-6 py-4 text-center font-medium">{ad.impressions.toLocaleString()}</td>
                <td className="px-6 py-4 text-center text-green-600">{ad.clicks.toLocaleString()}</td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  {ad.lastUpdated.toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// মেইন পেজ কম্পোনেন্ট
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">Campaign Analytics</h1>
          <p className="text-slate-500 text-sm">Real-time tracking with Next.js 16 PPR.</p>
        </div>

        {/* ৩. অবশ্যই Suspense দিয়ে র‍্যাপ করতে হবে */}
        <Suspense fallback={<div className="p-20 text-center text-slate-500 animate-pulse">Loading Analytics Data...</div>}>
          <AnalyticsList />
        </Suspense>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase">{title}</p>
        <h3 className="text-3xl font-black">{value}</h3>
      </div>
      <div className={`${color} p-2.5 rounded-lg text-white`}>{icon}</div>
    </div>
  );
}