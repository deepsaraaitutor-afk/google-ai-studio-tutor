import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const language = className?.replace(/language-/, '');

  const codeString = String(children).trim();

  const handleCopy = () => {
    if (!codeString || isCopied) return;
    navigator.clipboard.writeText(codeString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900/70 rounded-lg my-4 overflow-hidden border border-gray-700 dark:border-gray-600/50 not-prose">
      <div className="flex justify-between items-center px-4 py-1.5 bg-gray-700/50 dark:bg-gray-800/50 text-xs">
        <span className="text-gray-400 font-sans">{language || 'code'}</span>
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors disabled:cursor-not-allowed" 
          disabled={isCopied}
          aria-label={isCopied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
          <span className="font-sans text-xs">{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`text-gray-200 ${className || ''}`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
