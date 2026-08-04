import type { Lead, CompanySizeRange, LeadSource, IndustryType, ScoreTier, PriorityLevel, RecommendedAction, ScoreBreakdown } from '../types/crm';

/**
 * Calculates lead score and details based on defined smart CRM business rules.
 */
export function calculateLeadScore(data: {
  budget: number;
  companySize: CompanySizeRange;
  leadSource: LeadSource;
  email: string;
  phone: string;
  website?: string;
  industry: IndustryType;
}): {
  score: number;
  scoreTier: ScoreTier;
  priority: PriorityLevel;
  recommendedAction: RecommendedAction;
  scoreBreakdown: ScoreBreakdown;
} {
  let budgetScore = 0;
  let sizeScore = 0;
  let sourceScore = 0;
  let emailScore = 0;
  let phoneScore = 0;
  let websiteScore = 0;
  let industryScore = 0;

  // 1. Budget > $10,000 -> +40
  if (data.budget > 10000) {
    budgetScore = 40;
  }

  // 2. Company Size > 100 employees -> +20
  if (data.companySize === '101-500' || data.companySize === '500+') {
    sizeScore = 20;
  }

  // 3. Referral Source -> +20
  if (data.leadSource === 'Referral') {
    sourceScore = 20;
  }

  // 4. Email exists -> +10
  if (data.email && data.email.trim().length > 0) {
    emailScore = 10;
  }

  // 5. Phone exists -> +10
  if (data.phone && data.phone.trim().length > 0) {
    phoneScore = 10;
  }

  // 6. Website exists -> +10
  if (data.website && data.website.trim().length > 0) {
    websiteScore = 10;
  }

  // 7. Industry is SaaS -> +10
  if (data.industry === 'SaaS') {
    industryScore = 10;
  }

  const total = Math.min(100, budgetScore + sizeScore + sourceScore + emailScore + phoneScore + websiteScore + industryScore);

  let scoreTier: ScoreTier = 'Cold';
  let priority: PriorityLevel = 'Low';
  let recommendedAction: RecommendedAction = 'Add to Nurture Campaign';

  if (total >= 70) {
    scoreTier = 'Hot';
    priority = 'High';
    recommendedAction = 'Schedule Demo';
  } else if (total >= 40) {
    scoreTier = 'Warm';
    priority = 'Medium';
    recommendedAction = 'Follow-up Email';
  } else {
    scoreTier = 'Cold';
    priority = 'Low';
    recommendedAction = 'Add to Nurture Campaign';
  }

  return {
    score: total,
    scoreTier,
    priority,
    recommendedAction,
    scoreBreakdown: {
      budgetScore,
      sizeScore,
      sourceScore,
      emailScore,
      phoneScore,
      websiteScore,
      industryScore,
      total
    }
  };
}

/**
 * Checks if a lead hasn't been contacted in 7+ days (and isn't Won/Lost)
 */
export function checkNeedsFollowUp(lastContactedDate: string, stage: string): boolean {
  if (stage === 'Won' || stage === 'Lost') return false;
  if (!lastContactedDate) return true;
  
  const lastDate = new Date(lastContactedDate).getTime();
  const now = new Date().getTime();
  const diffDays = (now - lastDate) / (1000 * 3600 * 24);
  return diffDays >= 7;
}

/**
 * Detects duplicate emails in current lead list
 */
export function isDuplicateEmail(email: string, currentLeadId: string | undefined, allLeads: Lead[]): boolean {
  if (!email || !email.trim()) return false;
  const normalized = email.trim().toLowerCase();
  return allLeads.some(l => l.id !== currentLeadId && l.email.trim().toLowerCase() === normalized);
}
