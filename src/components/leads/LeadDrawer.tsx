import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertTriangle, CheckCircle2, DollarSign, Building, Mail, Phone, Globe, Layers, UserCheck } from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';
import { Lead, IndustryType, CompanySizeRange, LeadSource, LeadStage } from '../../types/crm';
import { calculateLeadScore, isDuplicateEmail } from '../../utils/scoring';
import { ScoreBadge } from '../common/ScoreBadge';

export const LeadDrawer: React.FC = () => {
  const { drawerOpen, setDrawerOpen, leadToEdit, setLeadToEdit, addLead, updateLead, leads } = useCRM();

  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
    website: string;
    industry: IndustryType;
    companySize: CompanySizeRange;
    budget: number;
    leadSource: LeadSource;
    assignedTo: string;
    stage: LeadStage;
    status: 'Active' | 'Inactive' | 'Converted' | 'Disqualified';
    notes: string;
    lastContactedDate: string;
  }>({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    industry: 'SaaS',
    companySize: '11-50',
    budget: 15000,
    leadSource: 'Referral',
    assignedTo: 'Alex Rivera',
    stage: 'New',
    status: 'Active',
    notes: '',
    lastContactedDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (leadToEdit) {
      setFormData({
        name: leadToEdit.name,
        company: leadToEdit.company,
        email: leadToEdit.email,
        phone: leadToEdit.phone,
        website: leadToEdit.website || '',
        industry: leadToEdit.industry,
        companySize: leadToEdit.companySize,
        budget: leadToEdit.budget,
        leadSource: leadToEdit.leadSource,
        assignedTo: leadToEdit.assignedTo,
        stage: leadToEdit.stage,
        status: leadToEdit.status,
        notes: leadToEdit.notes || '',
        lastContactedDate: leadToEdit.lastContactedDate || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        industry: 'SaaS',
        companySize: '11-50',
        budget: 15000,
        leadSource: 'Referral',
        assignedTo: 'Alex Rivera',
        stage: 'New',
        status: 'Active',
        notes: '',
        lastContactedDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [leadToEdit, drawerOpen]);

  // Reactive Live Score Calculation
  const liveScored = calculateLeadScore({
    budget: Number(formData.budget) || 0,
    companySize: formData.companySize,
    leadSource: formData.leadSource,
    email: formData.email,
    phone: formData.phone,
    website: formData.website,
    industry: formData.industry,
  });

  const duplicateWarning = isDuplicateEmail(formData.email, leadToEdit?.id, leads);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert('Please fill in required fields (Name, Company, Email)');
      return;
    }

    if (leadToEdit) {
      updateLead(leadToEdit.id, formData);
    } else {
      addLead(formData);
    }

    setDrawerOpen(false);
    setLeadToEdit(null);
  };

  if (!drawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl relative"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {leadToEdit ? 'Edit Lead Details' : 'Add New Lead'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                LeadPilot AI automatically calculates score & recommended action as you type.
              </p>
            </div>
            <button
              onClick={() => {
                setDrawerOpen(false);
                setLeadToEdit(null);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Live AI Score Preview Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-200/80 dark:border-blue-800/50 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Live AI Scoring Engine</span>
                </div>
                <ScoreBadge score={liveScored.score} tier={liveScored.scoreTier} size="md" />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Assigned Priority</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5 block">{liveScored.priority} Priority</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Recommended Action</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 mt-0.5 block truncate">{liveScored.recommendedAction}</span>
                </div>
              </div>

              {/* Score Breakdown pills */}
              <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
                <span className={`px-2 py-0.5 rounded-md font-medium ${liveScored.scoreBreakdown.budgetScore ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                  Budget &gt;$10k (+40)
                </span>
                <span className={`px-2 py-0.5 rounded-md font-medium ${liveScored.scoreBreakdown.sizeScore ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                  Size &gt;100 (+20)
                </span>
                <span className={`px-2 py-0.5 rounded-md font-medium ${liveScored.scoreBreakdown.sourceScore ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                  Referral (+20)
                </span>
                <span className={`px-2 py-0.5 rounded-md font-medium ${liveScored.scoreBreakdown.industryScore ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                  SaaS Industry (+10)
                </span>
              </div>
            </div>

            {/* Duplicate Warning Banner */}
            {duplicateWarning && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Duplicate Email Detected</span>
                  <span>The email &quot;{formData.email}&quot; is already registered in LeadPilot CRM.</span>
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" /> Lead Contact Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Cybernetics"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@apexcyber.com"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://apexcyber.com"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Firmographics & Qualification */}
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-600" /> Qualification &amp; Budget
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value as IndustryType })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SaaS">SaaS (+10 pts)</option>
                    <option value="FinTech">FinTech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="AI & Data">AI &amp; Data</option>
                    <option value="EdTech">EdTech</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={e => setFormData({ ...formData, companySize: e.target.value as CompanySizeRange })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="101-500">101-500 employees (+20 pts)</option>
                    <option value="500+">500+ employees (+20 pts)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Budget ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Over $10,000 grants +40 points</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Lead Source</label>
                  <select
                    value={formData.leadSource}
                    onChange={e => setFormData({ ...formData, leadSource: e.target.value as LeadSource })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Referral">Referral (+20 pts)</option>
                    <option value="Inbound">Inbound</option>
                    <option value="Website">Website</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Cold Outreach">Cold Outreach</option>
                    <option value="Conference">Conference</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pipeline Stage & Assignment */}
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Pipeline Stage</label>
                  <select
                    value={formData.stage}
                    onChange={e => setFormData({ ...formData, stage: e.target.value as LeadStage })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Sales Rep</label>
                  <select
                    value={formData.assignedTo}
                    onChange={e => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Alex Rivera">Alex Rivera</option>
                    <option value="Sarah Chen">Sarah Chen</option>
                    <option value="Michael Vance">Michael Vance</option>
                    <option value="Emma Watson">Emma Watson</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes &amp; Background Context</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Include key deal notes, specific user requirements, software stack..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-900 pb-2">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setLeadToEdit(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{leadToEdit ? 'Save Changes' : 'Create & Score Lead'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
