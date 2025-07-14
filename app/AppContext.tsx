'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  initial: string;
}

interface Project {
  id: string;
  name: string;
  elements: any[];
  lastModified: string;
  thumbnail: string;
  status: 'Draft' | 'Published';
}

interface AppContextType {
  user: User | null;
  projects: Project[];
  login: (name: string, email: string) => void;
  logout: () => void;
  createProject: (name: string, templateElements?: any[]) => Project;
  getProject: (id: string) => Project | undefined;
  saveProject: (id: string, name: string, elements: any[]) => void;
  deleteProject: (id: string) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load from localStorage on initial render
    try {
      const storedUser = localStorage.getItem('studio-user');
      const storedProjects = localStorage.getItem('studio-projects');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      localStorage.clear(); // Clear corrupted storage
    }
    setLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    const newUser = { name, email, initial: name.charAt(0).toUpperCase() };
    setUser(newUser);
    localStorage.setItem('studio-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studio-user');
    router.push('/');
  };

  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('studio-projects', JSON.stringify(updatedProjects));
  };

  const createProject = (name: string, templateElements: any[] = []) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: name,
      elements: templateElements.length > 0 ? templateElements : [
        {
          id: `hero-${Date.now()}`,
          type: 'hero',
          props: {
            title: 'Your New Awesome Project',
            subtitle: 'Start building something amazing!',
            buttonText: 'Get Started',
            backgroundImage: 'https://readdy.ai/api/search-image?query=abstract%20minimalist%20background%20gradient&width=1200&height=600&seq=newproj'
          }
        }
      ],
      lastModified: new Date().toISOString(),
      thumbnail: 'https://readdy.ai/api/search-image?query=abstract%20website%20wireframe%20mockup&width=400&height=300&seq=' + Date.now(),
      status: 'Draft'
    };
    const updatedProjects = [...projects, newProject];
    saveProjectsToStorage(updatedProjects);
    router.push(`/editor/${newProject.id}`);
    return newProject;
  };
  
  const getProject = (id: string) => {
    return projects.find(p => p.id === id);
  }

  const saveProject = (id: string, name: string, elements: any[]) => {
    const updatedProjects = projects.map(p =>
      p.id === id
        ? { ...p, name, elements, lastModified: new Date().toISOString() }
        : p
    );
    saveProjectsToStorage(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjectsToStorage(updatedProjects);
  };

  const value = {
    user,
    projects,
    login,
    logout,
    createProject,
    getProject,
    saveProject,
    deleteProject,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
