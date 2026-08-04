import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCRM } from '../../contexts/CRMContext';
import { Flame, Sun, Snowflake } from 'lucide-react';

export const ScoreChart: React.FC = () => {
  const { leads } = useCRM();

  const hotCount = leads.filter(l => l.scoreTier === 'Hot').length;
  const warmCount = leads.filter(l => l.scoreTier === 'Warm').length;
  const coldCount = leads.filter(l => l.scoreTier === 'Cold').length;

  const data = [
    { name: 'Hot Leads (70+)', value: hotCount, color: '#EF4444' },
    { name: 'Warm Leads (40-69)', value: warmCount, color: '#F59E0B' },
    { name: 'Cold Leads (0-39)', value: coldCount, color: '#3B82F6' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Lead Score Distribution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automated lead qualification tiers</p>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          {leads.length} Total
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderRadius: '12px',
                border: 'none',
                color: '#fff',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
            <Flame className="w-3 h-3 fill-rose-500" /> Hot
          </div>
          <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">{hotCount}</span>
        </div>
        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
            <Sun className="w-3 h-3" /> Warm
          </div>
          <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">{warmCount}</span>
        </div>
        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
            <Snowflake className="w-3 h-3" /> Cold
          </div>
          <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">{coldCount}</span>
        </div>
      </div>
    </div>
  );
};
