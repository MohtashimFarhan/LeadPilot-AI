import React from 'react';
import { Flame, Sun, Snowflake } from 'lucide-react';
import { ScoreTier } from '../../types/crm';

interface ScoreBadgeProps {
  score: number;
  tier: ScoreTier;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  tier,
  size = 'md',
  showLabel = true
}) => {
  let badgeConfig = {
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    border: 'border-blue-200 dark:border-blue-800/60',
    text: 'text-blue-700 dark:text-blue-300',
    icon: <Snowflake className="w-3.5 h-3.5 text-blue-500 shrink-0" />,
    label: 'Cold'
  };

  if (tier === 'Hot') {
    badgeConfig = {
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      border: 'border-rose-200 dark:border-rose-800/60',
      text: 'text-rose-700 dark:text-rose-300',
      icon: <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />,
      label: 'Hot'
    };
  } else if (tier === 'Warm') {
    badgeConfig = {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      border: 'border-amber-200 dark:border-amber-800/60',
      text: 'text-amber-700 dark:text-amber-300',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
      label: 'Warm'
    };
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-medium rounded-md gap-1',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-lg gap-1.5',
    lg: 'px-3 py-1.5 text-sm font-semibold rounded-lg gap-2',
  };

  return (
    <span
      className={`inline-flex items-center border ${badgeConfig.bg} ${badgeConfig.border} ${badgeConfig.text} ${sizeClasses[size]} shrink-0 shadow-sm`}
    >
      {badgeConfig.icon}
      <span className="font-bold font-mono tracking-tight">{score}</span>
      {showLabel && <span className="opacity-90 font-medium">({badgeConfig.label})</span>}
    </span>
  );
};
