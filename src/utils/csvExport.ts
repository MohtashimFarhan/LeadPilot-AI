import type { Lead } from '../types/crm';

export function exportLeadsToCSV(leads: Lead[], filename = 'leadpilot_leads_export.csv') {
  if (!leads || leads.length === 0) return;

  const headers = [
    'ID',
    'Name',
    'Company',
    'Email',
    'Phone',
    'Website',
    'Industry',
    'Company Size',
    'Budget ($)',
    'Lead Source',
    'Assigned To',
    'Stage',
    'Status',
    'Priority',
    'Score',
    'Score Tier',
    'Recommended Action',
    'Needs Follow-up',
    'Created Date',
    'Last Contacted Date',
    'Notes'
  ];

  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.company.replace(/"/g, '""')}"`,
    `"${l.email}"`,
    `"${l.phone}"`,
    `"${l.website || ''}"`,
    `"${l.industry}"`,
    `"${l.companySize}"`,
    l.budget,
    `"${l.leadSource}"`,
    `"${l.assignedTo}"`,
    `"${l.stage}"`,
    `"${l.status}"`,
    `"${l.priority}"`,
    l.score,
    `"${l.scoreTier}"`,
    `"${l.recommendedAction}"`,
    l.needsFollowUp ? 'Yes' : 'No',
    `"${l.createdAt}"`,
    `"${l.lastContactedDate}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
