import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Building, DollarSign, Clock, ArrowUpRight, Flame, Snowflake, Sun } from 'lucide-react';
import { Lead } from '../../types/crm';
import { ScoreBadge } from '../common/ScoreBadge';
import { Badge } from '../common/Badge';

interface KanbanCardProps {
  lead: Lead;
  index: number;
  onSelect: (lead: Lead) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ lead, index, onSelect }) => {
  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onSelect(lead)}
          className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all cursor-grab active:cursor-grabbing relative group ${
            snapshot.isDragging
              ? 'shadow-2xl border-blue-500 scale-105 z-50 ring-2 ring-blue-500/30'
              : 'border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {lead.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                <Building className="w-3 h-3 text-slate-400" /> {lead.company}
              </p>
            </div>
            <ScoreBadge score={lead.score} tier={lead.scoreTier} size="sm" showLabel={false} />
          </div>

          {/* Value & Industry */}
          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
              ${lead.budget.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
              {lead.industry}
            </span>
          </div>

          {/* Recommended Action Pill */}
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[170px]">
              ➜ {lead.recommendedAction}
            </span>
            {lead.needsFollowUp && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 shrink-0">
                Needs Follow-up
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
