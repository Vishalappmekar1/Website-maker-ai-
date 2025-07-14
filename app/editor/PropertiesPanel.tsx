'use client';

import { useState, useEffect } from 'react';

interface PropertiesPanelProps {
  selectedElement: any;
  updateElement: (elementId: string, newProps: any) => void;
  deleteElement: (elementId: string) => void;
}

export default function PropertiesPanel({ selectedElement, updateElement, deleteElement }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [localProps, setLocalProps] = useState(selectedElement?.props || {});

  useEffect(() => {
    setLocalProps(selectedElement?.props || {});
    // Reset to content tab on new element selection if it has content
    if (selectedElement?.props && Object.keys(selectedElement.props).length > 0) {
      setActiveTab('content');
    }
  }, [selectedElement]);

  const handlePropChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newLocalProps = { ...localProps, [name]: value };
    setLocalProps(newLocalProps);
    updateElement(selectedElement.id, { [name]: value });
  };
  
  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 p-8 flex items-center justify-center flex-shrink-0">
        <div className="text-center text-gray-500">
          <i className="ri-settings-line text-4xl text-gray-300 mb-4"></i>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const renderContentPanel = () => {
    const propKeys = Object.keys(localProps);
    if (propKeys.length === 0) return <p className="text-sm text-gray-500">No editable content for this element.</p>

    return (
      <div className="space-y-4">
        {propKeys.map(propKey => {
            const isTextArea = propKey.toLowerCase().includes('subtitle') || propKey.toLowerCase().includes('content');
            if(propKey === 'fontSize' || propKey === 'color') return null; // Handled in style tab
            
            return (
              <div key={propKey}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{propKey.replace(/([A-Z])/g, ' $1')}</label>
                {isTextArea ? (
                    <textarea
                      name={propKey}
                      value={localProps[propKey] || ''}
                      onChange={handlePropChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                    />
                ) : (
                  <input
                    type="text"
                    name={propKey}
                    value={localProps[propKey] || ''}
                    onChange={handlePropChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            )
        })}
      </div>
    )
  }

  const renderStylePanel = () => {
      return (
          <div className="space-y-4">
              { 'color' in localProps &&
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <input type="color" name="color" value={localProps.color || '#000000'} onChange={handlePropChange} className="w-full h-8 p-1 border border-gray-300 rounded-lg cursor-pointer" />
                </div>
              }
              { 'fontSize' in localProps &&
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Size (px)</label>
                    <input type="number" name="fontSize" value={parseInt(localProps.fontSize) || 16} onChange={e => updateElement(selectedElement.id, {fontSize: `${e.target.value}px`})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              }
              <p className="text-xs text-gray-400 text-center pt-4">More style options coming soon.</p>
          </div>
      )
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900">Properties</h3>
        <p className="text-sm text-gray-500 mt-1 capitalize">{selectedElement.type} element</p>
      </div>
      <div className="border-b border-gray-200 flex">
        <button onClick={() => setActiveTab('content')} className={`flex-1 p-2 text-sm font-medium ${activeTab === 'content' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>Content</button>
        <button onClick={() => setActiveTab('style')} className={`flex-1 p-2 text-sm font-medium ${activeTab === 'style' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>Style</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' && renderContentPanel()}
        {activeTab === 'style' && renderStylePanel()}
      </div>
      <div className="border-t border-gray-200 p-4">
        <button 
          onClick={() => deleteElement(selectedElement.id)}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
        >
          <i className="ri-delete-bin-line"></i>
          <span>Delete Element</span>
        </button>
      </div>
    </div>
  );
      }
