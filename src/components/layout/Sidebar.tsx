import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Kanban,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  PlusCircle,
  RotateCcw
} from 'lucide-react';
import { useCRM } from '../../contexts/CRMContext';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { leads, setDrawerOpen, setLeadToEdit, resetToSeedData } = useCRM();

  const hotCount = leads.filter(l => l.scoreTier === 'Hot').length;

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Leads', path: '/app/leads', icon: Users, badge: leads.length },
    { label: 'Pipeline', path: '/app/pipeline', icon: Kanban, badge: `${hotCount} Hot`, badgeColor: 'bg-rose-500 text-white' },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const handleOpenAddLead = () => {
    setLeadToEdit(null);
    setDrawerOpen(true);
  };

  return (
    <aside
      className={`relative z-30 flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 shrink-0">
        <NavLink to="/app/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 shrink-0">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                LeadPilot <span className="text-xs px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-mono">AI</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 tracking-tight">Smart CRM Engine</span>
            </div>
          )}
        </NavLink>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Action Button */}
      <div className="p-3">
        <button
          onClick={handleOpenAddLead}
          className={`w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all ${
            collapsed ? 'px-0' : ''
          }`}
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Add New Lead</span>}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              {!collapsed && (
                <span className="flex-1 truncate tracking-tight">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Lead Scoring Summary Card */}
      {!collapsed && (
        <div className="mx-3 my-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Prioritization</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">
            {hotCount} Hot leads demand immediate action today.
          </p>
        </div>
      )}

      {/* Footer / Reset Data */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
        <button
          onClick={resetToSeedData}
          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Restore 25 realistic demo leads"
        >
          <RotateCcw className="w-4 h-4 shrink-0 text-slate-400" />
          {!collapsed && <span>Reset Demo Data</span>}
        </button>
      </div>
    </aside>
  );
};
