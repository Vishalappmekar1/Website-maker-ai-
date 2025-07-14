'use client';

interface LayersPanelProps {
  elements: any[];
  selectedElement: any;
  setSelectedElement: (element: any) => void;
}

export default function LayersPanel({ elements, selectedElement, setSelectedElement }: LayersPanelProps) {
  const getElementIcon = (type: string) => {
    switch (type) {
      case 'hero': return 'ri-layout-top-line';
      case 'text': return 'ri-text';
      case 'image': return 'ri-image-line';
      case 'button': return 'ri-checkbox-blank-fill';
      default: return 'ri-square-line';
    }
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900">Layers</h3>
        <p className="text-sm text-gray-500 mt-1">{elements.length} elements</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {elements.length > 0 ? (
          <div className="p-2 space-y-1">
            {elements.map((element) => (
              <button
                key={element.id}
                onClick={() => setSelectedElement(element)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                  selectedElement?.id === element.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <i className={`${getElementIcon(element.type)} text-lg opacity-70`}></i>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <i className="ri-stack-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-sm">No layers yet</p>
            <p className="text-xs mt-1">Add elements to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}
