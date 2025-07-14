'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '../../AppContext';
import EditorHeader from '../EditorHeader';
import ComponentPanel from '../ComponentPanel';
import CanvasArea from '../CanvasArea';
import PropertiesPanel from '../PropertiesPanel';
import LayersPanel from '../LayersPanel';

export default function EditorPage() {
  const params = useParams();
  const router = useRouter();
  const { getProject, saveProject: saveProjectToContext, loading: appContextLoading } = useAppContext();
  const id = params.id as string;

  const [project, setProject] = useState<any>(null);
  const [elements, setElements] = useState<any[]>([]);
  const [projectName, setProjectName] = useState('');
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [showMobileView, setShowMobileView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appContextLoading) return; // Wait for context to load projects

    if (id) {
      const loadedProject = getProject(id);
      if (loadedProject) {
        setProject(loadedProject);
        setElements(loadedProject.elements);
        setProjectName(loadedProject.name);
        setSelectedElement(null); 
      } else {
        // Project not found, redirect
        alert("Project not found. Redirecting to dashboard.");
        router.push('/dashboard');
      }
      setLoading(false);
    }
  }, [id, getProject, appContextLoading, router]);

  const handleSaveProject = () => {
    if (project) {
      saveProjectToContext(project.id, projectName, elements);
      alert('Project Saved!');
    }
  };
  
  const addElement = (elementType: string) => {
    const newElement = {
      id: `${elementType}-${Date.now()}`,
      type: elementType,
      props: getDefaultProps(elementType)
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const deleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    setSelectedElement(null);
  };
  
  const updateElement = (elementId: string, newProps: any) => {
    const updatedElements = elements.map(el => 
      el.id === elementId 
        ? { ...el, props: { ...el.props, ...newProps } } 
        : el
    );
    setElements(updatedElements);
    
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(prev => ({ ...prev, props: { ...prev.props, ...newProps } }));
    }
  };

  const getDefaultProps = (type: string) => {
    switch (type) {
      case 'hero':
        return { title: 'New Hero Section', subtitle: 'A compelling subtitle', buttonText: 'Click Me', backgroundImage: 'https://readdy.ai/api/search-image?query=abstract%20blue%20background&width=1200&height=600' };
      case 'text':
        return { content: 'This is some new text content. Edit me in the properties panel.', fontSize: '16px', color: '#333333' };
      case 'image':
        return { src: 'https://readdy.ai/api/search-image?query=gray%20placeholder%20image&width=400&height=300&seq=newimg', alt: 'Placeholder' };
      case 'button':
        return { buttonText: 'New Button' };
      default:
        return { info: 'No properties to edit yet.'};
    }
  };
  
  if (loading || appContextLoading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50"><p>Loading Editor...</p></div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorHeader 
        showMobileView={showMobileView}
        setShowMobileView={setShowMobileView}
        projectName={projectName}
        setProjectName={setProjectName}
        onSave={handleSaveProject}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <ComponentPanel onAddElement={addElement} />
        
        <div className="flex-1 flex flex-col">
          <CanvasArea 
            elements={elements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            showMobileView={showMobileView}
          />
        </div>
        
        <div className="flex">
          <LayersPanel elements={elements} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
          <PropertiesPanel 
            key={selectedElement ? selectedElement.id : 'no-selection'}
            selectedElement={selectedElement} 
            updateElement={updateElement}
            deleteElement={deleteElement}
          />
        </div>
      </div>
    </div>
  );
}
