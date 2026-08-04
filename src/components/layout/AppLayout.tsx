import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastContainer } from '../common/Toast';
import { LeadDrawer } from '../leads/LeadDrawer';
import { LeadDetailModal } from '../leads/LeadDetailModal';
import { useCRM } from '../../contexts/CRMContext';

export const AppLayout: React.FC = () => {
  const { userSession } = useCRM();

  if (!userSession.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] text-[#111827] dark:text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      <LeadDrawer />
      <LeadDetailModal />
      <ToastContainer />
    </div>
  );
};
