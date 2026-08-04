import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCRM } from '../../contexts/CRMContext';
import { LeadStage } from '../../types/crm';

export const FunnelChart: React.FC = () => {
  const { leads } = useCRM();

  const stages: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  const data = stages.map(stg => {
    const matching = leads.filter(l => l.stage === stg);
    const totalVal = matching.reduce((sum, l) => sum + l.budget, 0);
    return {
      stage: stg,
      count: matching.length,
      value: totalVal
    };
  });

  const stageColors: Record<LeadStage, string> = {
    New: '#94A3B8',
    Contacted: '#3B82F6',
    Qualified: '#6366F1',
    Proposal: '#8B5CF6',
    Negotiation: '#F59E0B',
    Won: '#10B981',
    Lost: '#EF4444'
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Pipeline Sales Funnel</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Leads by current deal stage</p>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
          ${leads.filter(l => l.stage === 'Won').reduce((s, l) => s + l.budget, 0).toLocaleString()} Won
        </span>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 15, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis dataKey="stage" type="category" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(value: any, name: any, item: any) => [
                `${value} Leads ($${item.payload.value.toLocaleString()})`,
                'Stage Volume'
              ]}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={stageColors[entry.stage as LeadStage]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
