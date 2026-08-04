import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Download,
  PlusCircle,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  Building,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useCRM } from '../contexts/CRMContext';
import { Lead, ScoreTier, LeadStage, LeadSource, IndustryType } from '../types/crm';
import { exportLeadsToCSV } from '../utils/csvExport';
import { ScoreBadge } from '../components/common/ScoreBadge';
import { Badge } from '../components/common/Badge';

export const LeadsPage: React.FC = () => {
  const {
    leads,
    searchQuery,
    setSearchQuery,
    setDrawerOpen,
    setLeadToEdit,
    setSelectedLeadForDetail,
    deleteLead,
    addToast
  } = useCRM();

  const [searchParams] = useSearchParams();
  const tierFilterParam = searchParams.get('tier') as ScoreTier | null;

  // View state
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedTier, setSelectedTier] = useState<string>(tierFilterParam || 'all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'budget' | 'name' | 'created'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter & Sort Logic
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      // Global/Local Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = l.name.toLowerCase().includes(q);
        const matchCompany = l.company.toLowerCase().includes(q);
        const matchEmail = l.email.toLowerCase().includes(q);
        if (!matchName && !matchCompany && !matchEmail) return false;
      }

      // Tier filter
      if (selectedTier !== 'all' && l.scoreTier !== selectedTier) return false;

      // Stage filter
      if (selectedStage !== 'all' && l.stage !== selectedStage) return false;

      // Source filter
      if (selectedSource !== 'all' && l.leadSource !== selectedSource) return false;

      // Industry filter
      if (selectedIndustry !== 'all' && l.industry !== selectedIndustry) return false;

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'score') comparison = a.score - b.score;
      if (sortBy === 'budget') comparison = a.budget - b.budget;
      if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
      if (sortBy === 'created') comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [leads, searchQuery, selectedTier, selectedStage, selectedSource, selectedIndustry, sortBy, sortOrder]);

  // Paginated slice
  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;
  const paginatedLeads = filteredLeads.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const duplicateCount = leads.filter(l => l.isDuplicate).length;

  const handleExportCSV = () => {
    exportLeadsToCSV(filteredLeads);
    addToast('success', 'Export Complete', `Exported ${filteredLeads.length} leads to CSV.`);
  };

  const handleOpenAdd = () => {
    setLeadToEdit(null);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Lead Directory ({filteredLeads.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage, filter, and score all prospective leads in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Duplicate Email Warning Banner if exists */}
      {duplicateCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold">
              Warning: {duplicateCount} duplicate email lead entries detected in system.
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
            Check Duplicate Email Labels Below
          </span>
        </div>
      )}

      {/* Toolbar: Search, Filters & View Toggle */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Score Tier Filter */}
          <select
            value={selectedTier}
            onChange={(e) => { setSelectedTier(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tiers (Cold/Warm/Hot)</option>
            <option value="Hot">🔥 Hot (70+)</option>
            <option value="Warm">☀️ Warm (40-69)</option>
            <option value="Cold">❄️ Cold (0-39)</option>
          </select>

          {/* Stage Filter */}
          <select
            value={selectedStage}
            onChange={(e) => { setSelectedStage(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Deal Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won 🎉</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 px-2 py-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="score">Sort by Score</option>
              <option value="budget">Sort by Budget</option>
              <option value="name">Sort by Name</option>
              <option value="created">Sort by Date</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {sortOrder.toUpperCase()}
            </button>
          </div>

          {/* Table / Grid Mode */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-400'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Container */}
      {filteredLeads.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No leads matching selected filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTier('all');
              setSelectedStage('all');
              setSelectedSource('all');
              setSelectedIndustry('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Lead &amp; Company</th>
                  <th className="py-3.5 px-4">Score &amp; Priority</th>
                  <th className="py-3.5 px-4">Est. Budget</th>
                  <th className="py-3.5 px-4">Industry / Size</th>
                  <th className="py-3.5 px-4">Stage</th>
                  <th className="py-3.5 px-4">Recommended Next Step</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedLeads.map(lead => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLeadForDetail(lead)}
                  >
                    {/* Lead & Company */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                              {lead.name}
                            </span>
                            {lead.isDuplicate && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                Dup
                              </span>
                            )}
                            {lead.needsFollowUp && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Needs Follow-up" />
                            )}
                          </div>
                          <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-medium">
                            {lead.company} • {lead.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Score & Priority */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <ScoreBadge score={lead.score} tier={lead.scoreTier} size="sm" />
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ${lead.budget.toLocaleString()}
                    </td>

                    {/* Industry / Size */}
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <span>{lead.industry}</span>
                      <span className="text-slate-400 block text-[10px]">{lead.companySize} emp</span>
                    </td>

                    {/* Stage */}
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          lead.stage === 'Won' ? 'emerald' : lead.stage === 'Lost' ? 'rose' : lead.stage === 'Proposal' ? 'purple' : 'blue'
                        }
                      >
                        {lead.stage}
                      </Badge>
                    </td>

                    {/* Recommended Action */}
                    <td className="py-3.5 px-4 font-semibold text-blue-600 dark:text-blue-400">
                      {lead.recommendedAction}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedLeadForDetail(lead)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setLeadToEdit(lead);
                            setDrawerOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                          title="Edit Lead"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedLeads.map(lead => (
            <div
              key={lead.id}
              onClick={() => setSelectedLeadForDetail(lead)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
                    {lead.name.charAt(0)}
                  </div>
                  <ScoreBadge score={lead.score} tier={lead.scoreTier} size="sm" />
                </div>

                <h3 className="mt-3 font-bold text-sm text-slate-900 dark:text-slate-100">{lead.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" /> {lead.company}
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Budget:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${lead.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stage:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{lead.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Source:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{lead.leadSource}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[170px]">
                  ➜ {lead.recommendedAction}
                </span>
                {lead.needsFollowUp && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                    Needs Follow-up
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing Page {currentPage} of {totalPages} ({filteredLeads.length} total leads)
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
