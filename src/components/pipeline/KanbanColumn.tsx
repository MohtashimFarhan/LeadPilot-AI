import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Lead, LeadStage } from '../../types/crm';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  stage: LeadStage;
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ stage, leads, onSelectLead }) => {
  const totalValue = leads.reduce((sum, l) => sum + l.budget, 0);

  const stageBadgeColors: Record<LeadStage, string> = {
    New: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    Contacted: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    Qualified: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
    Proposal: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    Negotiation: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    Won: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    Lost: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  };

  return (
    <div className="flex flex-col w-72 shrink-0 bg-slate-50/70 dark:bg-slate-800/40 rounded-3xl p-3 border border-slate-200/60 dark:border-slate-800/80 max-h-[80vh]">
      {/* Column Header */}
      <div className="p-2 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 tracking-tight">{stage}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stageBadgeColors[stage]}`}>
            {leads.length}
          </span>
        </div>
        <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
          ${totalValue.toLocaleString()}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto space-y-3 p-1 rounded-2xl transition-colors min-h-[150px] ${
              snapshot.isDraggingOver ? 'bg-blue-50/50 dark:bg-blue-950/20 border-2 border-dashed border-blue-400' : ''
            }`}
          >
            {leads.map((lead, index) => (
              <KanbanCard key={lead.id} lead={lead} index={index} onSelect={onSelectLead} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
