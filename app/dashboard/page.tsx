'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import ProjectGrid from './ProjectGrid';
import TemplateGallery from './TemplateGallery';
import QuickActions from './QuickActions';
import AuthModal from '../auth/AuthModal';
import { useAppContext } from '../AppContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { user, loading, login } = useAppContext();

  useEffect(() => {
    if (!loading && !user) {
      setAuthModalOpen(true);
    }
  }, [user, loading]);

  const handleAuthSuccess = () => {
    login("Demo User", "demo@example.com");
    setAuthModalOpen(false);
  };
  
  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50"><p>Loading Dashboard...</p></div>
  }
  
  if (!user) {
     return <AuthModal isOpen={true} onClose={() => {}} onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Create stunning websites with AI-powered tools</p>
        </div>

        <QuickActions />

        <div className="mt-12">
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Projects
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Templates
              </button>
            </nav>
          </div>

          {activeTab === 'projects' && <ProjectGrid />}
          {activeTab === 'templates' && <TemplateGallery />}
        </div>
      </div>
    </div>
  );
                  }
