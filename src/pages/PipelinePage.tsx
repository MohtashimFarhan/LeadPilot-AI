import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Sparkles, Kanban, DollarSign, PlusCircle } from 'lucide-react';
import { useCRM } from '../contexts/CRMContext';
import { LeadStage, Lead } from '../types/crm';
import { KanbanColumn } from '../components/pipeline/KanbanColumn';

export const PipelinePage: React.FC = () => {
  const { leads, updateLeadStage, setSelectedLeadForDetail, setDrawerOpen, setLeadToEdit } = useCRM();

  const stages: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStage = destination.droppableId as LeadStage;
    updateLeadStage(draggableId, newStage);
  };

  const handleOpenAdd = () => {
    setLeadToEdit(null);
    setDrawerOpen(true);
  };

  const totalPipelineRevenue = leads.reduce((sum, l) => sum + l.budget, 0);

  return (
    <div className="space-y-6 max-w-full pb-10">

      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Interactive Sales Pipeline <Kanban className="w-5 h-5 text-blue-600" />
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Drag and drop deals across stages to advance opportunity progression.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <span>Total Pipeline Value:</span>
            <span className="font-mono font-extrabold text-sm">${totalPipelineRevenue.toLocaleString()}</span>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x">
          {stages.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage);
            return (
              <KanbanColumn
                key={stage}
                stage={stage}
                leads={stageLeads}
                onSelectLead={(lead) => setSelectedLeadForDetail(lead)}
              />
            );
          })}
        </div>
      </DragDropContext>

    </div>
  );
};
