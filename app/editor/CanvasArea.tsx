'use client';

import { useState } from 'react';

interface CanvasAreaProps {
  elements: any[];
  selectedElement: any;
  setSelectedElement: (element: any) => void;
  showMobileView: boolean;
}

export default function CanvasArea({ 
  elements, 
  selectedElement, 
  setSelectedElement, 
  showMobileView 
}: CanvasAreaProps) {

  const renderElement = (element: any) => {
    const isSelected = selectedElement?.id === element.id;
    const selectionClass = isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : '';

    const elementWrapper = (content: React.ReactNode) => (
        <div className={`relative cursor-pointer ${selectionClass}`} onClick={(e) => {e.stopPropagation(); setSelectedElement(element)}}>
            {content}
            {isSelected && <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 rounded-bl-md">{element.type}</div>}
        </div>
    );
    
    switch (element.type) {
      case 'hero':
        return elementWrapper(
          <div 
            className="relative text-white py-20 px-6 text-center bg-cover bg-center"
            style={{ backgroundImage: `url(${element.props.backgroundImage})` }}
          >
            <div className="bg-black/40 absolute inset-0"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-4">{element.props.title}</h1>
              <p className="text-xl mb-6 opacity-90">{element.props.subtitle}</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {element.props.buttonText}
              </button>
            </div>
          </div>
        );
      
      case 'text':
        return elementWrapper(
          <div className="p-8">
            <p style={{ fontSize: element.props.fontSize, color: element.props.color }}>
              {element.props.content}
            </p>
          </div>
        );

      case 'image':
        return elementWrapper(
          <div className="p-4">
            <img 
              src={element.props.src} 
              alt={element.props.alt}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        );
      
      case 'button':
          return elementWrapper(
              <div className="p-8 text-center">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                      {element.props.buttonText}
                  </button>
              </div>
          )

      default:
        return elementWrapper(
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Unknown element: {element.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto" onClick={() => setSelectedElement(null)}>
      <div className="p-8">
        <div className={`bg-white shadow-lg mx-auto transition-all duration-300 ${
          showMobileView ? 'max-w-sm' : 'max-w-none'
        }`}>
          <div className="min-h-screen">
            {elements.length > 0 ? (
              elements.map((element) => (
                <div key={element.id}>
                  {renderElement(element)}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <i className="ri-drag-drop-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-lg">Drag components here to start building</p>
                  <p className="text-sm mt-2">Your canvas is ready for creation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
            }
