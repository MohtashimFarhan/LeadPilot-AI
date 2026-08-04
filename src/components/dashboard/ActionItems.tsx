import React from 'react';
import { Flame, ArrowRight, CheckSquare, Square, Sparkles, Clock, Calendar } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import { ScoreBadge } from '../common/ScoreBadge';

export const ActionItems: React.FC = () => {
  const { leads, tasks, toggleTask, setSelectedLeadForDetail, activities } = useCRM();

  // Filter top hot/warm priority leads demanding action
  const priorityLeads = leads
    .filter(l => l.scoreTier === 'Hot' || l.needsFollowUp)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Recommended Next Actions Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <Flame className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Smart AI Recommendation Engine</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">High impact actions auto-prioritized for today</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {priorityLeads.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">All hot opportunities &amp; follow-ups are up to date! 🎉</p>
            ) : (
              priorityLeads.map(lead => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadForDetail(lead)}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-800 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ScoreBadge score={lead.score} tier={lead.scoreTier} size="sm" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{lead.name}</span>
                        <span className="text-[10px] text-slate-400 truncate">({lead.company})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {lead.recommendedAction}
                        </span>
                        {lead.needsFollowUp && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                            7d+ Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Tasks & Activity Overview Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Upcoming Sales Tasks</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Team execution checklist</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">
              {tasks.filter(t => t.completed).length} / {tasks.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  task.completed
                    ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 opacity-60 line-through'
                    : 'bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-800 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {task.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{task.title}</p>
                    <span className="text-[10px] text-slate-400">{task.company} • Due {task.dueDate}</span>
                  </div>
                </div>

                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  task.priority === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
