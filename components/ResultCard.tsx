
import React from 'react';
import type { ClassificationResult } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { PlasticIcon } from './icons/PlasticIcon';
import { GlassIcon } from './icons/GlassIcon';
import { RecycleIcon } from './icons/RecycleIcon';

interface ResultCardProps {
  result: ClassificationResult;
}

const MaterialIcon: React.FC<{type: ClassificationResult['materialType']}> = ({ type }) => {
    switch(type) {
        case 'Plastic': return <PlasticIcon className="w-12 h-12 text-blue-500" />;
        case 'Glass': return <GlassIcon className="w-12 h-12 text-cyan-500" />;
        default: return <RecycleIcon className="w-12 h-12 text-gray-500" />;
    }
}

const WasteTypeIcon: React.FC<{type: ClassificationResult['wasteType']}> = ({ type }) => {
    switch(type) {
        case 'Organic': return <LeafIcon className="w-12 h-12 text-green-500" />;
        case 'Inorganic': return <RecycleIcon className="w-12 h-12 text-slate-500" />;
        default: return null;
    }
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-fade-in">
        <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-xl flex items-center space-x-4">
            <div className="flex-shrink-0">
               <MaterialIcon type={result.materialType} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Material Type</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{result.materialType}</p>
            </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-xl flex items-center space-x-4">
            <div className="flex-shrink-0">
               <WasteTypeIcon type={result.wasteType} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Waste Type</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{result.wasteType}</p>
            </div>
        </div>
    </div>
  );
};

// Add fade-in animation to tailwind config (or in a style tag if no config is available)
// This is a simple way to do it without a config file.
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
