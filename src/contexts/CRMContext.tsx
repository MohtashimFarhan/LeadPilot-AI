import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Lead, Activity, Task, UserSession, LeadStage } from '../types/crm';
import { INITIAL_LEADS, INITIAL_ACTIVITIES, INITIAL_TASKS } from '../data/seedLeads';
import { calculateLeadScore, checkNeedsFollowUp, isDuplicateEmail } from '../utils/scoring';

interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
}

interface CRMContextType {
  leads: Lead[];
  activities: Activity[];
  tasks: Task[];
  userSession: UserSession;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Auth
  login: (email: string) => void;
  logout: () => void;

  // Lead CRUD
  addLead: (leadData: Omit<Lead, 'id' | 'score' | 'scoreTier' | 'priority' | 'recommendedAction' | 'scoreBreakdown' | 'needsFollowUp' | 'createdAt'>) => { success: boolean; isDuplicate: boolean; id?: string };
  updateLead: (id: string, updates: Partial<Lead>) => { success: boolean; isDuplicate: boolean };
  deleteLead: (id: string) => void;
  updateLeadStage: (id: string, newStage: LeadStage) => void;
  
  // Activity / Task actions
  addActivity: (leadId: string, type: Activity['type'], description: string) => void;
  toggleTask: (taskId: string) => void;
  
  // Utilities
  resetToSeedData: () => void;
  selectedLeadForDetail: Lead | null;
  setSelectedLeadForDetail: (lead: Lead | null) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  leadToEdit: Lead | null;
  setLeadToEdit: (lead: Lead | null) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const LOCAL_STORAGE_LEADS_KEY = 'leadpilot_leads_v1';
const LOCAL_STORAGE_ACTIVITIES_KEY = 'leadpilot_activities_v1';
const LOCAL_STORAGE_TASKS_KEY = 'leadpilot_tasks_v1';
const LOCAL_STORAGE_AUTH_KEY = 'leadpilot_auth_v1';
const LOCAL_STORAGE_THEME_KEY = 'leadpilot_theme_v1';

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (savedTheme !== null) return savedTheme === 'dark';
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'light');
    }
  }, [darkMode]);

  // Auth State
  const [userSession, setUserSession] = useState<UserSession>(() => {
    const savedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    if (savedAuth) {
      try {
        return JSON.parse(savedAuth);
      } catch (e) {
        // fallback
      }
    }
    return {
      email: 'demo@leadpilot.ai',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Senior Sales Director',
      isAuthenticated: true
    };
  });

  const login = (email: string) => {
    const session: UserSession = {
      email: email.trim() || 'demo@leadpilot.ai',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Senior Sales Director',
      isAuthenticated: true
    };
    setUserSession(session);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(session));
    addToast('success', 'Welcome back!', 'Logged in as ' + session.email);
  };

  const logout = () => {
    const session: UserSession = {
      email: '',
      name: '',
      avatar: '',
      role: '',
      isAuthenticated: false
    };
    setUserSession(session);
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    addToast('info', 'Logged out', 'You have been signed out.');
  };

  // Leads State
  const [leads, setLeads] = useState<Lead[]>(() => {
    const savedLeads = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
    if (savedLeads) {
      try {
        const parsed: Lead[] = JSON.parse(savedLeads);
        // Refresh scoring and follow-up checks
        return parsed.map(l => {
          const scored = calculateLeadScore({
            budget: l.budget,
            companySize: l.companySize,
            leadSource: l.leadSource,
            email: l.email,
            phone: l.phone,
            website: l.website,
            industry: l.industry
          });
          return {
            ...l,
            score: scored.score,
            scoreTier: scored.scoreTier,
            priority: scored.priority,
            recommendedAction: scored.recommendedAction,
            scoreBreakdown: scored.scoreBreakdown,
            needsFollowUp: checkNeedsFollowUp(l.lastContactedDate, l.stage)
          };
        });
      } catch (e) {
        console.error('Failed to parse leads from LocalStorage', e);
      }
    }
    return INITIAL_LEADS;
  });

  // Activities State
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVITIES_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_ACTIVITIES;
  });

  // Tasks State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TASKS;
  });

  // Search & Modals state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVITIES_KEY, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Lead CRUD Operations
  const addLead = (leadData: Omit<Lead, 'id' | 'score' | 'scoreTier' | 'priority' | 'recommendedAction' | 'scoreBreakdown' | 'needsFollowUp' | 'createdAt'>) => {
    const duplicate = isDuplicateEmail(leadData.email, undefined, leads);

    const scored = calculateLeadScore({
      budget: leadData.budget,
      companySize: leadData.companySize,
      leadSource: leadData.leadSource,
      email: leadData.email,
      phone: leadData.phone,
      website: leadData.website,
      industry: leadData.industry
    });

    const newId = `lead-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];

    const newLead: Lead = {
      ...leadData,
      id: newId,
      score: scored.score,
      scoreTier: scored.scoreTier,
      priority: scored.priority,
      recommendedAction: scored.recommendedAction,
      scoreBreakdown: scored.scoreBreakdown,
      createdAt: todayStr,
      lastContactedDate: todayStr,
      needsFollowUp: false,
      isDuplicate: duplicate
    };

    setLeads(prev => [newLead, ...prev]);

    // Add activity log
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      leadId: newId,
      type: 'score_update',
      description: `New lead created. Calculated score: ${scored.score}/100 (${scored.scoreTier}). Recommended: ${scored.recommendedAction}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: userSession.name || 'System'
    };
    setActivities(prev => [newActivity, ...prev]);

    if (duplicate) {
      addToast('warning', 'Duplicate Email Detected', `Lead created, but ${leadData.email} already exists in CRM.`);
    } else {
      addToast('success', 'Lead Added', `${leadData.name} (${leadData.company}) added with ${scored.scoreTier} score (${scored.score} pts).`);
    }

    return { success: true, isDuplicate: duplicate, id: newId };
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    const existing = leads.find(l => l.id === id);
    if (!existing) return { success: false, isDuplicate: false };

    const merged = { ...existing, ...updates };
    const duplicate = merged.email ? isDuplicateEmail(merged.email, id, leads) : false;

    const scored = calculateLeadScore({
      budget: merged.budget,
      companySize: merged.companySize,
      leadSource: merged.leadSource,
      email: merged.email,
      phone: merged.phone,
      website: merged.website,
      industry: merged.industry
    });

    const updatedLead: Lead = {
      ...merged,
      score: scored.score,
      scoreTier: scored.scoreTier,
      priority: scored.priority,
      recommendedAction: scored.recommendedAction,
      scoreBreakdown: scored.scoreBreakdown,
      needsFollowUp: checkNeedsFollowUp(merged.lastContactedDate, merged.stage),
      isDuplicate: duplicate
    };

    setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));

    // Update selected lead detail if currently open
    if (selectedLeadForDetail?.id === id) {
      setSelectedLeadForDetail(updatedLead);
    }

    // Add activity if score changed
    if (existing.score !== scored.score) {
      const scoreDiff = scored.score - existing.score;
      const changeText = scoreDiff > 0 ? `+${scoreDiff}` : `${scoreDiff}`;
      addActivity(id, 'score_update', `Score updated by ${changeText} pts (Now ${scored.score}/100 ${scored.scoreTier}). Rec: ${scored.recommendedAction}`);
    }

    if (duplicate) {
      addToast('warning', 'Duplicate Email Warning', `${merged.email} is used by another lead.`);
    } else {
      addToast('success', 'Lead Updated', `Changes to ${updatedLead.name} saved & score recalculated.`);
    }

    return { success: true, isDuplicate: duplicate };
  };

  const deleteLead = (id: string) => {
    const target = leads.find(l => l.id === id);
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selectedLeadForDetail?.id === id) setSelectedLeadForDetail(null);
    if (target) {
      addToast('info', 'Lead Removed', `${target.name} from ${target.company} was deleted.`);
    }
  };

  const updateLeadStage = (id: string, newStage: LeadStage) => {
    const target = leads.find(l => l.id === id);
    if (!target) return;
    if (target.stage === newStage) return;

    const prevStage = target.stage;
    const todayStr = new Date().toISOString().split('T')[0];

    const updatedLead: Lead = {
      ...target,
      stage: newStage,
      lastContactedDate: todayStr,
      needsFollowUp: checkNeedsFollowUp(todayStr, newStage)
    };

    setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));

    if (selectedLeadForDetail?.id === id) {
      setSelectedLeadForDetail(updatedLead);
    }

    addActivity(id, 'stage_change', `Stage changed from ${prevStage} ➔ ${newStage}`);

    if (newStage === 'Won') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      addToast('success', '🎉 Deal Won!', `${target.company} marked as Won ($${target.budget.toLocaleString()})!`);
    } else {
      addToast('info', 'Pipeline Updated', `${target.name} moved to ${newStage}`);
    }
  };

  const addActivity = (leadId: string, type: Activity['type'], description: string) => {
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      leadId,
      type,
      description,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
      author: userSession.name || 'System'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const resetToSeedData = () => {
    setLeads(INITIAL_LEADS);
    setActivities(INITIAL_ACTIVITIES);
    setTasks(INITIAL_TASKS);
    localStorage.removeItem(LOCAL_STORAGE_LEADS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ACTIVITIES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TASKS_KEY);
    addToast('success', 'Reset Complete', 'Restored 25 demo leads and initial pipeline state.');
  };

  return (
    <CRMContext.Provider
      value={{
        leads,
        activities,
        tasks,
        userSession,
        searchQuery,
        setSearchQuery,
        darkMode,
        setDarkMode,
        toasts,
        addToast,
        removeToast,
        login,
        logout,
        addLead,
        updateLead,
        deleteLead,
        updateLeadStage,
        addActivity,
        toggleTask,
        resetToSeedData,
        selectedLeadForDetail,
        setSelectedLeadForDetail,
        drawerOpen,
        setDrawerOpen,
        leadToEdit,
        setLeadToEdit
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
