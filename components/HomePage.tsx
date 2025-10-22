import React from 'react';
import { BrainCircuitIcon } from './Icons';

interface HomePageProps {
  onStartChat: (prompt?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartChat }) => {
  const examplePrompts = [
    "Explain quantum computing like I'm 10",
    "What was the importance of the Silk Road?",
    "How does a neural network work?",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
            <BrainCircuitIcon className="w-20 h-20 text-blue-500 mx-auto" aria-hidden="true" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
          Welcome to the AI Polymath Tutor
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Unlock knowledge, explore complex topics, and get clear, engaging explanations on anything you can imagine. Your personal tutor for any subject, available 24/7.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onStartChat()}
              className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Start Learning Now
            </button>
        </div>
        <div className="mt-12 w-full animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-4">Or try one of these starters:</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onStartChat(prompt)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400">
        Powered by Gemini
      </footer>
    </div>
  );
};

export default HomePage;