'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Stunning Websites with 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Power</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create professional websites in minutes with our drag-and-drop builder, AI-powered content generation, and 200+ features. No coding required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/dashboard" 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg whitespace-nowrap inline-flex items-center"
              >
                <i className="ri-rocket-line mr-2"></i>
                Start Building Free
              </Link>
              <Link 
                href="/templates" 
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-medium text-lg whitespace-nowrap inline-flex items-center"
              >
                <i className="ri-layout-grid-line mr-2"></i>
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Build Amazing Websites</h2>
          <p className="text-gray-600 text-lg">Powerful tools and AI features to bring your vision to life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: 'ri-drag-drop-line', title: 'Drag & Drop Builder', description: 'Intuitive visual editor with live preview and responsive design tools' },
            { icon: 'ri-magic-line', title: 'AI-Powered Generation', description: 'Generate websites, content, and designs with advanced AI technology' },
            { icon: 'ri-layout-grid-line', title: '200+ Components', description: 'Pre-built components for hero sections, forms, galleries, and more' },
            { icon: 'ri-smartphone-line', title: 'Mobile Responsive', description: 'Automatically optimized for all devices and screen sizes' },
            { icon: 'ri-cloud-line', title: 'One-Click Deploy', description: 'Publish to custom domains or export for any hosting platform' },
            { icon: 'ri-team-line', title: 'Real-time Collaboration', description: 'Work together with your team in real-time, Google Docs style' }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <i className={`${feature.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Website?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of creators building amazing websites with our platform</p>
          <Link 
            href="/dashboard" 
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-medium text-lg whitespace-nowrap inline-flex items-center"
          >
            <i className="ri-arrow-right-line mr-2"></i>
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
              }
