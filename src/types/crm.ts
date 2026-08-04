export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export type LeadSource = 'Referral' | 'Website' | 'LinkedIn' | 'Cold Outreach' | 'Inbound' | 'Conference';

export type IndustryType = 'SaaS' | 'FinTech' | 'E-commerce' | 'Healthcare' | 'AI & Data' | 'EdTech' | 'Real Estate' | 'Other';

export type CompanySizeRange = '1-10' | '11-50' | '51-100' | '101-500' | '500+';

export type ScoreTier = 'Cold' | 'Warm' | 'Hot';

export type PriorityLevel = 'Low' | 'Medium' | 'High';

export type RecommendedAction = 'Schedule Demo' | 'Follow-up Email' | 'Add to Nurture Campaign';

export interface ScoreBreakdown {
  budgetScore: number;       // > $10000 -> +40
  sizeScore: number;         // > 100 employees -> +20
  sourceScore: number;       // Referral -> +20
  emailScore: number;        // Valid email -> +10
  phoneScore: number;        // Valid phone -> +10
  websiteScore: number;      // Website present -> +10
  industryScore: number;     // Industry is SaaS -> +10
  total: number;
}

export interface Activity {
  id: string;
  leadId: string;
  type: 'note' | 'call' | 'email' | 'stage_change' | 'score_update';
  description: string;
  timestamp: string;
  author: string;
}

export interface Task {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  title: string;
  dueDate: string;
  priority: PriorityLevel;
  completed: boolean;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  industry: IndustryType;
  companySize: CompanySizeRange;
  budget: number;
  leadSource: LeadSource;
  assignedTo: string;
  notes: string;
  status: 'Active' | 'Inactive' | 'Converted' | 'Disqualified';
  stage: LeadStage;
  priority: PriorityLevel;
  score: number;
  scoreTier: ScoreTier;
  recommendedAction: RecommendedAction;
  scoreBreakdown: ScoreBreakdown;
  lastContactedDate: string;
  createdAt: string;
  needsFollowUp: boolean;
  isDuplicate?: boolean;
}

export interface UserSession {
  email: string;
  name: string;
  avatar: string;
  role: string;
  isAuthenticated: boolean;
}
