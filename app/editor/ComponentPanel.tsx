'use client';

import { useState } from 'react';

interface ComponentPanelProps {
  onAddElement: (elementType: string) => void;
}

export default function ComponentPanel({ onAddElement }: ComponentPanelProps) {
  const [activeCategory, setActiveCategory] = useState('layout');

  const categories = [
    { id: 'layout', name: 'Layout', icon: 'ri-layout-grid-line' },
    { id: 'basic', name: 'Basic', icon: 'ri-text' },
    { id: 'media', name: 'Media', icon: 'ri-image-line' },
  ];

  const components: Record<string, { type: string; name: string; icon: string }[]> = {
    layout: [
      { type: 'hero', name: 'Hero Section', icon: 'ri-layout-top-line' },
    ],
    basic: [
      { type: 'text', name: 'Text', icon: 'ri-text' },
      { type: 'button', name: 'Button', icon: 'ri-checkbox-blank-fill' },
    ],
    media: [
      { type: 'image', name: 'Image', icon: 'ri-image-line' },
    ],
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Components</h3>
      </div>

      <div className="flex">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 flex flex-col items-center p-3 text-xs hover:bg-gray-50 transition-colors ${
              activeCategory === category.id ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
          >
            <i className={`${category.icon} text-lg`}></i>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {components[activeCategory]?.map((component) => (
            <button
              key={component.type}
              onClick={() => onAddElement(component.type)}
              className="group p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all text-left"
              title={`Add ${component.name}`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                  <i className={`${component.icon} text-gray-600 group-hover:text-blue-600`}></i>
                </div>
                <span className="text-xs text-gray-700 group-hover:text-blue-600 text-center font-medium">
                  {component.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
