import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'indigo';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon,
  color = 'blue',
  onClick
}) => {
  const colorStyles = {
    blue: 'from-blue-500/10 to-indigo-500/5 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/40',
    emerald: 'from-emerald-500/10 to-teal-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40',
    amber: 'from-amber-500/10 to-orange-500/5 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40',
    rose: 'from-rose-500/10 to-pink-500/5 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/40',
    purple: 'from-purple-500/10 to-indigo-500/5 text-purple-600 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/40',
    indigo: 'from-indigo-500/10 to-blue-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/40',
  };

  const iconBg = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    rose: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden ${
        onClick ? 'hover:border-blue-300 dark:hover:border-blue-700' : ''
      }`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorStyles[color]} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-60`} />

      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl ${iconBg[color]} shrink-0 shadow-sm`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 relative z-10">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tracking-tight">{value}</h3>
        
        <div className="flex items-center gap-2 mt-1">
          {change && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-[11px] text-slate-400 truncate">{subtitle}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
