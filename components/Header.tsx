import React from 'react';
import { BrainCircuitIcon, RotateCwIcon, HomeIcon } from './Icons';

interface HeaderProps {
    onClearChat: () => void;
    onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearChat, onGoHome }) => {
  return (
    <header className="bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-md fixed top-0 left-0 right-0 z-10 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            AI Polymath Tutor
          </h1>
        </div>
        <div className="flex items-center space-x-2">
            <button
                onClick={onGoHome}
                title="Go to Home"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                aria-label="Go to Home"
            >
                <HomeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onClearChat}
              title="Start New Chat"
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              aria-label="Start New Chat"
            >
              <RotateCwIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;