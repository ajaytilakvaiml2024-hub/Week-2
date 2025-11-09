
import React from 'react';
import { RecycleIcon } from './icons/RecycleIcon';

export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-white dark:bg-gray-800/50 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center">
        <RecycleIcon className="w-12 h-12 text-emerald-500 mb-2 md:mb-0 md:mr-4" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Smart Waste Segregation System
          </h1>
          <p className="mt-1 text-md text-gray-500 dark:text-gray-400">
            Upload an image to classify waste using AI
          </p>
        </div>
      </div>
    </header>
  );
};
