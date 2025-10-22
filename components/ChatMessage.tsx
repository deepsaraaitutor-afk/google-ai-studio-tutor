import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '../types';
import { BrainCircuitIcon } from './Icons';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const userMessageContent = message.text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <li className={`flex items-start gap-3 my-4 animate-fade-in-up ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
          aria-label="AI Tutor Avatar"
        >
            <BrainCircuitIcon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-600'
        }`}
      >
        {isUser ? (
            <p className="text-sm leading-relaxed">{userMessageContent}</p>
        ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.text}
                </ReactMarkdown>
            </div>
        )}
      </div>
    </li>
  );
};

export default ChatMessage;