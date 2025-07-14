'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AIGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const router = useRouter();

  const generateContent = async () => {
    setGenerating(true);
    setTimeout(() => {
        const aiResponse = `Based on your prompt for "${prompt}", here is some AI-generated content: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.`;
        setGeneratedText(aiResponse);
        setGenerating(false);
    }, 1500);
  };
  
  const addToProject = () => {
      // In a real app, you would select a project. Here we simulate adding to a "last active" project.
      localStorage.setItem('ai_generated_content', generatedText);
      alert("Content will be added to the next project you open.");
      // Ideally, you would redirect to a project selection or the last active project.
      // router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800 flex items-center">
              <i className="ri-arrow-left-line mr-2"></i> Back to Dashboard
            </Link>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Content Generator</h1>
          <p className="text-gray-600 text-lg">Describe what you need, and let AI write it for you.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., An 'About Us' section for a coffee shop"
                className="w-full h-32 border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={generateContent}
                disabled={generating || !prompt.trim()}
                className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
                {generating ? 'Generating...' : 'Generate with AI'}
            </button>
            {generatedText && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="font-semibold mb-2">Generated Content:</h3>
                    <div className="p-4 border rounded-lg bg-gray-50 text-gray-700">
                        {generatedText}
                    </div>
                    <button onClick={addToProject} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Add to a Project</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
