import React from 'react';
import { TriangleAlertIcon, XIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div 
      className="bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800/50 animate-fade-in-up"
      role="alert"
    >
        <div className="container mx-auto max-w-4xl p-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <TriangleAlertIcon className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-red-800 dark:text-red-200">{message}</p>
            </div>
            <button
                onClick={onDismiss}
                className="p-1 rounded-full text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-red-900/20"
                aria-label="Dismiss error message"
            >
                <XIcon className="w-4 h-4" />
            </button>
        </div>
    </div>
  );
};

export default ErrorMessage;