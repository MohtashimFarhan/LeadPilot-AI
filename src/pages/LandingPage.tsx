import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  HelpCircle,
  Play,
  TrendingUp,
  Layers,
  Check
} from 'lucide-react';
import { calculateLeadScore } from '../utils/scoring';
import { ScoreBadge } from '../components/common/ScoreBadge';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive Live ROI / Score Simulator on Landing Page
  const [simBudget, setSimBudget] = useState(25000);
  const [simSize, setSimSize] = useState<'101-500'>('101-500');
  const [simSource, setSimSource] = useState<'Referral'>('Referral');
  const [simIndustry, setSimIndustry] = useState<'SaaS'>('SaaS');

  const simResult = calculateLeadScore({
    budget: simBudget,
    companySize: simSize as any,
    leadSource: simSource as any,
    email: 'test@company.com',
    phone: '+1 555 0192',
    website: 'https://company.com',
    industry: simIndustry as any,
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#111827] dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">

      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                LeadPilot <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-mono">AI</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block -mt-1">Prioritize Smarter. Close Faster.</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#calculator" className="hover:text-blue-600 transition-colors">Smart Calculator</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/app/dashboard"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
            >
              <span>Launch Demo CRM</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>Next-Gen Lead Prioritization Engine for Sales Teams</span>
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]">
              Stop Chasing Every Lead. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                Start Closing the Right Ones.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              LeadPilot AI automatically scores your leads, prioritizes high-value opportunities, and tells your sales reps exactly what action to take next.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/app/dashboard')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>View Live Demo (`demo@leadpilot.ai`)</span>
              </button>
            </div>

            {/* Micro badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> No Credit Card Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Instant LocalStorage Sync</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-purple-500" /> Built for Modern Sales Teams</span>
            </div>
          </motion.div>

          {/* Hero App Screenshot Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 relative rounded-3xl p-3 bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl"
          >
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 text-left space-y-6">
              
              {/* Fake CRM App Header Mockup */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-bold text-slate-400 ml-2">app.leadpilot.ai/dashboard</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  ● Real-time AI Lead Scoring Active
                </span>
              </div>

              {/* Sample Cards preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">Bruce Wayne</h4>
                      <p className="text-[10px] text-slate-500">Wayne Enterprises ($250k Budget)</p>
                    </div>
                    <ScoreBadge score={100} tier="Hot" size="sm" />
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                    Recommended: Schedule Executive Demo
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">Marcus Vance</h4>
                      <p className="text-[10px] text-slate-500">Starlight Financial ($45k Budget)</p>
                    </div>
                    <ScoreBadge score={60} tier="Warm" size="sm" />
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                    Recommended: Send Follow-up Email
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">Jessica Alba</h4>
                      <p className="text-[10px] text-slate-500">FreshCart Store ($5k Budget)</p>
                    </div>
                    <ScoreBadge score={20} tier="Cold" size="sm" />
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                    Recommended: Add to Nurture Campaign
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-20 bg-slate-100/70 dark:bg-slate-800/40 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">The Problem with Traditional CRMs</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
              Sales reps spend 67% of their workday contacting leads with zero intent to purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-950 shadow-sm relative">
              <div className="inline-flex p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 mb-4 font-bold text-xs">
                ❌ Traditional CRM Chaos
              </div>
              <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Treating $2,000 inquiries identically to $100,000 enterprise opportunities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Manual lead scoring sheets that reps forget to update.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>High-intent leads stalling for 7+ days without follow-up reminders.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/20 relative">
              <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-md mb-4 font-bold text-xs text-white">
                ⚡ The LeadPilot AI Solution
              </div>
              <ul className="space-y-4 text-xs text-blue-100">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automatic Reactive Lead Scoring</strong> instantly evaluates budget, company size, referral source, and contact completeness.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Actionable Next Step Recommendations</strong> (&quot;Schedule Demo&quot;, &quot;Follow-up Email&quot;, &quot;Add to Nurture&quot;) generated for every single lead.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Smart Inactivity Alerts</strong> flag deals left uncontacted for &gt;7 days.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Lead Scoring Calculator */}
      <section id="calculator" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Interactive Preview
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">Try the LeadPilot Scoring Engine Live</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Adjust parameters below to see how lead score and priority recalculate instantly.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Budget (${simBudget.toLocaleString()})
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={simBudget}
                  onChange={e => setSimBudget(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="text-[10px] text-slate-400">Budget &gt;$10,000 grants +40 points</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company Size</label>
                <select
                  value={simSize}
                  onChange={e => setSimSize(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-100">51-100 employees</option>
                  <option value="101-500">101-500 employees (+20 pts)</option>
                  <option value="500+">500+ employees (+20 pts)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Lead Source</label>
                <select
                  value={simSource}
                  onChange={e => setSimSource(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="Referral">Referral (+20 pts)</option>
                  <option value="Inbound">Inbound</option>
                  <option value="Website">Website</option>
                  <option value="Cold Outreach">Cold Outreach</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                <select
                  value={simIndustry}
                  onChange={e => setSimIndustry(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="SaaS">SaaS (+10 pts)</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Box */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Calculated Score Result</span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-slate-100">{simResult.score}<span className="text-sm font-normal text-slate-400">/100</span></span>
                  <ScoreBadge score={simResult.score} tier={simResult.scoreTier} size="lg" />
                </div>

                <div className="mt-6 space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500">Priority Level:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{simResult.priority} Priority</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between">
                    <span className="text-slate-500">Recommended Step:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{simResult.recommendedAction}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/app/dashboard')}
                className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Try with 25 Real Demo Leads</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section id="features" className="py-20 bg-slate-100/70 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Built for Modern SaaS Sales Teams</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
              Everything you need to prioritize opportunities and close deals without bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Smart Lead Scoring</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Algorithmic evaluation of deal budget, size, lead source, industry, and contact completeness in real-time.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Pipeline Drag &amp; Drop</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Visual Kanban board with 7 deal stages from New to Won with instant revenue totals and stage metrics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 fill-emerald-500" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Follow-up Suggestions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Never lose a deal to inactivity. Automatic 7-day follow-up badges alert your reps before leads turn cold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Plan Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Simple, Transparent Pricing</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">100% Free forever during the hiring assessment demo.</p>

          <div className="mt-12 max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-600 shadow-2xl relative text-left">
            <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider">
              Free Plan
            </span>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Starter Pilot</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-slate-100">$0</span>
              <span className="text-xs text-slate-500">/ forever</span>
            </div>

            <ul className="mt-6 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited LocalStorage Lead Storage</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 25 Realistic Pre-populated Demo Leads</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Full Reactive Lead Scoring Engine</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Interactive Kanban Pipeline Board</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Recharts Executive CRM Analytics</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> CSV Export &amp; Duplicate Detection</li>
            </ul>

            <button
              onClick={() => navigate('/login')}
              className="mt-8 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all text-center"
            >
              Sign In to Demo (`demo@leadpilot.ai`)
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>LeadPilot AI</span>
            <span className="font-normal text-slate-400">— Prioritize Smarter. Close Faster.</span>
          </div>
          <p>© 2026 LeadPilot AI Inc. Built for SaaS Hiring Assessment.</p>
        </div>
      </footer>

    </div>
  );
};
