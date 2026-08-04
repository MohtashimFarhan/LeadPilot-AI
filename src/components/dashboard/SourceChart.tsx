import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCRM } from '../../contexts/CRMContext';
import { LeadSource } from '../../types/crm';

export const SourceChart: React.FC = () => {
  const { leads } = useCRM();

  const sources: LeadSource[] = ['Referral', 'Inbound', 'Website', 'LinkedIn', 'Cold Outreach', 'Conference'];
  
  const data = sources.map(src => {
    const matching = leads.filter(l => l.leadSource === src);
    const totalBudget = matching.reduce((sum, l) => sum + l.budget, 0);
    return {
      source: src,
      count: matching.length,
      revenue: totalBudget
    };
  });

  const colors = ['#2563EB', '#10B981', '#6366F1', '#8B5CF6', '#F59E0B', '#EC4899'];

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Lead Sources Breakdown</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Origin channels of prospective deals</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Referrals = +20 pts
        </span>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <XAxis dataKey="source" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(value: any, name: any) => [value, name === 'count' ? 'Leads' : 'Est. Revenue']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
