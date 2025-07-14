'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../AppContext';

const templates = [
    {
      id: 1,
      name: 'Business Pro',
      category: 'business',
      author: 'StudioTeam',
      thumbnail: 'https://readdy.ai/api/search-image?query=professional%20business%20website%20template%20with%20corporate%20design%2C%20clean%20layout%2C%20blue%20and%20white%20color%20scheme%2C%20modern%20interface&width=400&height=300&seq=template1&orientation=landscape',
      elements: [
          {id: `hero-${Date.now()}`, type: 'hero', props: {title: 'Modern Business Solutions', subtitle: 'We help your business grow and succeed.', buttonText: 'Our Services', backgroundImage: 'https://readdy.ai/api/search-image?query=corporate%20office%20background&width=1200&height=600'}},
          {id: `text-${Date.now()}`, type: 'text', props: {content: 'This is a detailed section about our company history and mission. We are dedicated to providing the best services in the industry.', fontSize: '18px', color: '#555'}}
      ]
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      category: 'portfolio',
      author: 'DesignMaster',
      thumbnail: 'https://readdy.ai/api/search-image?query=creative%20portfolio%20website%20template%20with%20artistic%20design%2C%20showcase%20layout%2C%20modern%20typography%2C%20minimalist%20white%20background&width=400&height=300&seq=template2&orientation=landscape',
      elements: [
          {id: `hero-${Date.now()}`, type: 'hero', props: {title: 'My Creative Portfolio', subtitle: 'A collection of my best work in design and development.', buttonText: 'View Gallery', backgroundImage: 'https://readdy.ai/api/search-image?query=art%20gallery%20background&width=1200&height=600'}},
          {id: `image-${Date.now()}`, type: 'image', props: {src: 'https://readdy.ai/api/search-image?query=artistic%20portfolio%20piece&width=600&height=400', alt: 'Showcase work'}}
      ]
    },
    {
      id: 3,
      name: 'Online Store',
      category: 'ecommerce',
      author: 'EcomExpert',
      thumbnail: 'https://readdy.ai/api/search-image?query=ecommerce%20website%20template%20with%20product%20showcase%2C%20shopping%20cart%20design%2C%20clean%20white%20background%2C%20modern%20retail%20interface&width=400&height=300&seq=template3&orientation=landscape',
      elements: [
          {id: `hero-${Date.now()}`, type: 'hero', props: {title: 'Welcome to Our Store', subtitle: 'Find the best products at unbeatable prices.', buttonText: 'Shop Now', backgroundImage: 'https://readdy.ai/api/search-image?query=retail%20store%20background&width=1200&height=600'}},
          {id: `text-${Date.now()}`, type: 'text', props: {content: 'Featured products of the week.', fontSize: '24px', color: '#333'}},
          {id: `button-${Date.now()}`, type: 'button', props: {buttonText: 'View All Products'}}
      ]
    },
];

export default function TemplatesPage() {
  const { createProject } = useAppContext();
  const [loadingTemplate, setLoadingTemplate] = useState<number | null>(null);

  const handleUseTemplate = (template: any) => {
    setLoadingTemplate(template.id);
    setTimeout(() => {
      createProject(`Copy of ${template.name}`, template.elements);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 flex items-center">
                <i className="ri-arrow-left-line mr-2"></i> Back to Dashboard
                </Link>
            </div>
        </header>
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose a Template</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                <div key={template.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative">
                    <img 
                        src={template.thumbnail} 
                        alt={template.name}
                        className="w-full h-56 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={() => handleUseTemplate(template)}
                            disabled={loadingTemplate === template.id}
                            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap disabled:opacity-50"
                        >
                            {loadingTemplate === template.id ? (
                                <><i className="ri-loader-4-line animate-spin mr-2"></i>Creating...</>
                            ) : (
                                <><i className="ri-edit-line mr-2"></i>Use Template</>
                            )}
                        </button>
                    </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">by {template.author}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
}
