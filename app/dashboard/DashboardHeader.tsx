'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../AppContext';

export default function DashboardHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout, createProject } = useAppContext();

  const handleNewProject = () => {
    const projectName = prompt("Enter new project name:", "New Awesome Site");
    if (projectName) {
      createProject(projectName);
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-palette-line text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">Studio</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">Dashboard</Link>
              <Link href="/templates" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">Templates</Link>
              <Link href="/ai-generator" className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap">AI Generator</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
             <button onClick={handleNewProject} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              New Project
            </button>
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium"
                >
                  {user.initial}
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign Out</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
