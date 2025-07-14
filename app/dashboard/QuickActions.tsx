'use client';

import Link from 'next/link';
import { useAppContext } from '../AppContext';

export default function QuickActions() {
  const { createProject } = useAppContext();

  const handleStartFromScratch = (e: React.MouseEvent) => {
    e.preventDefault();
    createProject("Untitled Project");
  };

  const actions = [
    {
      title: 'Start from Scratch',
      description: 'Build your website from ground up',
      icon: 'ri-add-circle-line',
      color: 'bg-blue-500',
      onClick: handleStartFromScratch,
      href: '#'
    },
    {
      title: 'AI Website Generator',
      description: 'Describe your idea, AI creates the site',
      icon: 'ri-magic-line',
      color: 'bg-purple-500',
      href: '/ai-generator'
    },
    {
      title: 'Use Template',
      description: 'Start with professional templates',
      icon: 'ri-layout-grid-line',
      color: 'bg-green-500',
      href: '/templates'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <Link
          key={index}
          href={action.href}
          onClick={action.onClick}
          className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <i className={`${action.icon} text-white text-xl`}></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
          <p className="text-gray-600 text-sm">{action.description}</p>
        </Link>
      ))}
    </div>
  );
}
