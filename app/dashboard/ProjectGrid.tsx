'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../AppContext';

const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

export default function ProjectGrid() {
  const { projects, deleteProject, createProject } = useAppContext();
  const [showOptions, setShowOptions] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
      setShowOptions(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Projects ({projects.length})</h2>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
              <Link href={`/editor/${project.id}`} className="block relative">
                <img 
                  src={project.thumbnail} 
                  alt={project.name}
                  className="w-full h-48 object-cover object-top"
                />
                 <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <div className="relative">
                    <button
                      onClick={() => setShowOptions(showOptions === project.id ? null : project.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <i className="ri-more-line"></i>
                    </button>
                    {showOptions === project.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                        <Link href={`/editor/${project.id}`} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><i className="ri-edit-line mr-2"></i>Edit</Link>
                        <button onClick={() => handleDelete(project.id)} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"><i className="ri-delete-bin-line mr-2"></i>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Modified {timeAgo(project.lastModified)}</span>
                  <Link href={`/editor/${project.id}`} className="text-blue-600 font-medium">Open →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
          <i className="ri-folder-add-line text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600">No projects yet</h3>
          <p className="text-gray-500 mt-2">Create your first website to get started</p>
          <button 
            onClick={() => createProject("My First Project")}
            className="inline-flex items-center mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Create Project
          </button>
        </div>
      )}
    </div>
  );
          }
