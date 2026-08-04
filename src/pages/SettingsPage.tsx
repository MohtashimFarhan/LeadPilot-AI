import React from 'react';
import { Settings, RotateCcw, Sparkles, Moon, Sun, Users } from 'lucide-react';
import { useCRM } from '../contexts/CRMContext';

export const SettingsPage: React.FC = () => {
  const { darkMode, setDarkMode, resetToSeedData } = useCRM();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          Workspace Settings <Settings className="w-5 h-5 text-blue-600" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure lead scoring algorithms, team management, and theme preferences.
        </p>
      </div>

      {/* Smart Lead Scoring Rules Reference */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-base">Smart CRM Lead Scoring Rules</h2>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          LeadPilot AI dynamically calculates a score from 0 to 100 based on weighted business parameters upon any data modification:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Estimated Budget &gt; $10,000</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+40 Pts</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Company Size &gt; 100 Employees</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+20 Pts</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Referral Lead Source</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+20 Pts</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Valid Email Address Present</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+10 Pts</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Phone Number Present</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+10 Pts</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Website URL Present</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+10 Pts</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex justify-between items-center md:col-span-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Target SaaS Industry Match</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+10 Pts</span>
          </div>
        </div>

        {/* Tiers summary */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">70 - 100 Score</span>
            <span className="text-[11px] text-rose-600 font-semibold">Hot 🔥 (High Priority)</span>
            <span className="text-[10px] text-slate-500 block mt-1">Rec: Schedule Demo</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">40 - 69 Score</span>
            <span className="text-[11px] text-amber-600 font-semibold">Warm ☀️ (Medium Priority)</span>
            <span className="text-[10px] text-slate-500 block mt-1">Rec: Follow-up Email</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">0 - 39 Score</span>
            <span className="text-[11px] text-blue-600 font-semibold">Cold ❄️ (Low Priority)</span>
            <span className="text-[10px] text-slate-500 block mt-1">Rec: Nurture Campaign</span>
          </div>
        </div>
      </div>

      {/* Theme Preference Settings */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Interface Theme</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Toggle between clean light mode and sleek dark mode.</p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      {/* Team Members List */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-base">Assigned Sales Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { name: 'Alex Rivera', role: 'Senior Sales Director (Demo User)', email: 'alex@leadpilot.ai' },
            { name: 'Sarah Chen', role: 'Enterprise Account Executive', email: 'sarah@leadpilot.ai' },
            { name: 'Michael Vance', role: 'Mid-Market Sales Rep', email: 'michael@leadpilot.ai' },
            { name: 'Emma Watson', role: 'Sales Development Rep', email: 'emma@leadpilot.ai' },
          ].map(member => (
            <div key={member.email} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{member.name}</h4>
                <p className="text-slate-500 text-[10px]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management & Seed Reset */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/60 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Reset Local Storage Seed Data</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Restore 25 original realistic demo leads and clear any custom edits.
          </p>
        </div>

        <button
          onClick={resetToSeedData}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Data</span>
        </button>
      </div>

    </div>
  );
};
