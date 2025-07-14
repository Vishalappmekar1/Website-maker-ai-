'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EditorHeaderProps {
  showMobileView: boolean;
  setShowMobileView: (show: boolean) => void;
  projectName: string;
  setProjectName: (name: string) => void;
  onSave: () => void;
}

export default function EditorHeader({ showMobileView, setShowMobileView, projectName, setProjectName, onSave }: EditorHeaderProps) {
  
  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
            <i className="ri-palette-line text-white text-sm"></i>
          </div>
          <span className="font-semibold text-gray-900 hidden sm:inline">Studio</span>
        </Link>
        
        <div className="h-6 w-px bg-gray-300"></div>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent text-gray-900 font-medium focus:outline-none focus:bg-gray-50 px-2 py-1 rounded w-32 sm:w-auto"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setShowMobileView(false)}
            title="Desktop View"
            className={`px-3 py-1 rounded text-sm font-medium transition-colors whitespace-nowrap ${
              !showMobileView ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            <i className="ri-computer-line sm:mr-1"></i><span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setShowMobileView(true)}
            title="Mobile View"
            className={`px-3 py-1 rounded text-sm font-medium transition-colors whitespace-nowrap ${
              showMobileView ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
            }`}
          >
            <i className="ri-smartphone-line sm:mr-1"></i><span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        <Link href="/export" className="hidden sm:inline-flex items-center text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium whitespace-nowrap">
            <i className="ri-download-line mr-1"></i>Export
        </Link>
        
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center"
        >
          <i className="ri-save-line mr-1"></i>Save
        </button>
      </div>
    </header>
  );
}
