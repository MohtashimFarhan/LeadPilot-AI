import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Flame,
  Sun,
  Snowflake,
  TrendingUp,
  Award,
  DollarSign,
  PlusCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCRM } from '../contexts/CRMContext';
import { StatCard } from '../components/dashboard/StatCard';
import { ScoreChart } from '../components/dashboard/ScoreChart';
import { SourceChart } from '../components/dashboard/SourceChart';
import { FunnelChart } from '../components/dashboard/FunnelChart';
import { ActionItems } from '../components/dashboard/ActionItems';

export const DashboardPage: React.FC = () => {
  const { leads, setDrawerOpen, setLeadToEdit } = useCRM();
  const navigate = useNavigate();

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.scoreTier === 'Hot').length;
  const warmLeads = leads.filter(l => l.scoreTier === 'Warm').length;
  const coldLeads = leads.filter(l => l.scoreTier === 'Cold').length;

  const wonLeads = leads.filter(l => l.stage === 'Won');
  const wonCount = wonLeads.length;
  const totalRevenueEst = wonLeads.reduce((sum, l) => sum + l.budget, 0);

  const conversionRate = totalLeads > 0 ? ((wonCount / totalLeads) * 100).toFixed(1) : '0';

  const handleOpenAddLead = () => {
    setLeadToEdit(null);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            Executive Command Center <Sparkles className="w-5 h-5 text-blue-600" />
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time lead scoring analytics &amp; prioritized sales opportunities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/pipeline')}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <span>View Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenAddLead}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Top 7 Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          subtitle="Registered prospects"
          change="+12% this month"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          color="blue"
          onClick={() => navigate('/app/leads')}
        />

        <StatCard
          title="Hot Leads (Score 70+)"
          value={hotLeads}
          subtitle="High conversion priority"
          change="Schedule Demo"
          isPositive={true}
          icon={<Flame className="w-5 h-5 fill-rose-500" />}
          color="rose"
          onClick={() => navigate('/app/leads?tier=Hot')}
        />

        <StatCard
          title="Warm Leads (40-69)"
          value={warmLeads}
          subtitle="Follow-up candidates"
          change="Email Follow-up"
          isPositive={true}
          icon={<Sun className="w-5 h-5" />}
          color="amber"
          onClick={() => navigate('/app/leads?tier=Warm')}
        />

        <StatCard
          title="Cold Leads (0-39)"
          value={coldLeads}
          subtitle="Nurture list"
          change="Add to Campaign"
          isPositive={true}
          icon={<Snowflake className="w-5 h-5" />}
          color="indigo"
          onClick={() => navigate('/app/leads?tier=Cold')}
        />

        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          subtitle="Leads won vs total"
          change="+3.4% vs last Q"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          color="emerald"
        />

        <StatCard
          title="Deals Won"
          value={wonCount}
          subtitle="Closed-won contracts"
          change="Top performer: Sarah"
          isPositive={true}
          icon={<Award className="w-5 h-5" />}
          color="purple"
        />

        <StatCard
          title="Closed Revenue"
          value={`$${totalRevenueEst.toLocaleString()}`}
          subtitle="Actual won contract value"
          change="+28% growth"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5" />}
          color="emerald"
        />

        <StatCard
          title="Pipeline Est. Value"
          value={`$${leads.reduce((s, l) => s + l.budget, 0).toLocaleString()}`}
          subtitle="Active pipeline value"
          change="25 Active Deals"
          isPositive={true}
          icon={<Sparkles className="w-5 h-5" />}
          color="blue"
        />
      </div>

      {/* AI Action Items & Task List */}
      <ActionItems />

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScoreChart />
        <SourceChart />
        <FunnelChart />
      </div>

    </div>
  );
};
