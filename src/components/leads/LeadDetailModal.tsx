import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building,
  Mail,
  Phone,
  Globe,
  Calendar,
  Sparkles,
  Edit,
  Trash2,
  Send,
  MessageSquare,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import { ScoreBadge } from '../common/ScoreBadge';
import { Badge } from '../common/Badge';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const LeadDetailModal: React.FC = () => {
  const {
    selectedLeadForDetail,
    setSelectedLeadForDetail,
    setLeadToEdit,
    setDrawerOpen,
    deleteLead,
    updateLeadStage,
    activities,
    addActivity,
    addToast
  } = useCRM();

  const [newNote, setNewNote] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  if (!selectedLeadForDetail) return null;

  const lead = selectedLeadForDetail;
  const leadActivities = activities.filter(a => a.leadId === lead.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addActivity(lead.id, 'note', newNote.trim());
    setNewNote('');
    addToast('success', 'Note Logged', 'New activity added to lead timeline.');
  };

  const handleExecuteRecommendedAction = () => {
    if (lead.recommendedAction === 'Schedule Demo') {
      addActivity(lead.id, 'call', 'Scheduled product demo meeting with lead.');
      addToast('success', 'Demo Scheduled', `Meeting invitation drafted for ${lead.email}`);
    } else if (lead.recommendedAction === 'Follow-up Email') {
      addActivity(lead.id, 'email', 'Sent follow-up email with product overview deck.');
      addToast('success', 'Email Sent', `Follow-up email dispatched to ${lead.email}`);
    } else {
      addActivity(lead.id, 'note', 'Enrolled lead in automated 30-day nurture drip email campaign.');
      addToast('info', 'Nurture Started', `${lead.name} added to nurture campaign list.`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="p-6 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/20">
                {lead.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{lead.name}</h2>
                  <ScoreBadge score={lead.score} tier={lead.scoreTier} size="md" />
                  <Badge variant={lead.priority === 'High' ? 'rose' : lead.priority === 'Medium' ? 'amber' : 'blue'}>
                    {lead.priority} Priority
                  </Badge>
                  {lead.needsFollowUp && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800 animate-pulse">
                      Needs Follow-up (&gt;7 days)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                    <Building className="w-3.5 h-3.5 text-slate-400" /> {lead.company}
                  </span>
                  <span>•</span>
                  <span>{lead.industry}</span>
                  <span>•</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${lead.budget.toLocaleString()} Budget</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setLeadToEdit(lead);
                  setSelectedLeadForDetail(null);
                  setDrawerOpen(true);
                }}
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                title="Edit Lead"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirmOpen(true)}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                title="Delete Lead"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedLeadForDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Smart Action Recommendation Highlight Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-200">AI Recommended Next Action</span>
                  <h4 className="text-base font-bold">{lead.recommendedAction}</h4>
                  <p className="text-xs text-blue-100/90 mt-0.5">
                    Lead score is {lead.score}/100 ({lead.scoreTier}). Prioritize this lead based on high conversion potential.
                  </p>
                </div>
              </div>
              <button
                onClick={handleExecuteRecommendedAction}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-all shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Execute Action</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid layout for Specs & Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left Column: Lead Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Contact &amp; Specs</h3>
                
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                    <a href={`mailto:${lead.email}`} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                      {lead.email}
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" /> Phone
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.phone || 'N/A'}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" /> Website
                    </span>
                    {lead.website ? (
                      <a href={lead.website} target="_blank" rel="noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[180px]">
                        {lead.website}
                      </a>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Company Size</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.companySize} employees</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Lead Source</span>
                    <Badge variant="indigo">{lead.leadSource}</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Assigned Rep</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{lead.assignedTo}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-400">Current Stage</span>
                    <select
                      value={lead.stage}
                      onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                      className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Won">Won 🎉</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Score Breakdown */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center justify-between">
                  <span>Score Composition</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{lead.score}/100 PTS</span>
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
                      <span>Budget (&gt;$10,000)</span>
                      <span className="font-bold">{lead.scoreBreakdown.budgetScore} / 40</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(lead.scoreBreakdown.budgetScore / 40) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
                      <span>Company Size (&gt;100)</span>
                      <span className="font-bold">{lead.scoreBreakdown.sizeScore} / 20</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(lead.scoreBreakdown.sizeScore / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
                      <span>Referral Lead Source</span>
                      <span className="font-bold">{lead.scoreBreakdown.sourceScore} / 20</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(lead.scoreBreakdown.sourceScore / 20) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
                      <span>SaaS Industry Match</span>
                      <span className="font-bold">{lead.scoreBreakdown.industryScore} / 10</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(lead.scoreBreakdown.industryScore / 10) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-1 font-medium">
                      <span>Contact Info Completeness</span>
                      <span className="font-bold">
                        {lead.scoreBreakdown.emailScore + lead.scoreBreakdown.phoneScore + lead.scoreBreakdown.websiteScore} / 30
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((lead.scoreBreakdown.emailScore + lead.scoreBreakdown.phoneScore + lead.scoreBreakdown.websiteScore) / 30) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Activity History Timeline */}
            <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center justify-between">
                <span>Activity &amp; Engagement Timeline</span>
                <span className="text-[10px] text-slate-400 font-normal">{leadActivities.length} events logged</span>
              </h3>

              {/* Add Quick Activity Note */}
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Log a call, email, or meeting note for this lead..."
                  className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Note</span>
                </button>
              </form>

              {/* Timeline list */}
              <div className="space-y-3 pt-2">
                {leadActivities.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">No custom activity logged yet. Add your first note above!</p>
                ) : (
                  leadActivities.map(act => (
                    <div key={act.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-start gap-3 text-xs">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{act.author}</span>
                          <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-0.5">{act.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <ConfirmDialog
          isOpen={deleteConfirmOpen}
          title="Delete Lead?"
          message={`Are you sure you want to delete ${lead.name} from ${lead.company}? This operation cannot be undone.`}
          confirmText="Yes, Delete Lead"
          onConfirm={() => {
            deleteLead(lead.id);
            setDeleteConfirmOpen(false);
          }}
          onCancel={() => setDeleteConfirmOpen(false)}
        />
      </div>
    </AnimatePresence>
  );
};
