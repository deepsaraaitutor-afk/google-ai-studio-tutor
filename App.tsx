import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ErrorMessage from './components/ErrorMessage';
import HomePage from './components/HomePage';
import type { Message } from './types';
import { createChatSession } from './services/geminiService';
import { GEMINI_MODEL } from './constants';
import { BrainCircuitIcon } from './components/Icons';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'chat'>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLLIElement>(null);
  
  const lastUserMessage = messages.filter(m => m.sender === 'user').pop()?.text || '';

  const handleSendMessage = useCallback(async (text: string) => {
    if (isLoading || !chatRef.current) return;

    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const result = await chatRef.current.sendMessage({ message: text });
      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        text: result.text,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (e) {
      const rawErrorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(e);

      let displayErrorMessage: string;
      const lowerCaseError = rawErrorMessage.toLowerCase();

      if (lowerCaseError.includes('api key')) {
        displayErrorMessage = "It seems there's an issue with the API key. Please make sure it's configured correctly and is valid.";
      } else if (lowerCaseError.includes('model') && lowerCaseError.includes('not found')) {
        displayErrorMessage = `Sorry, the AI model (${GEMINI_MODEL}) is currently unavailable. Please try again later.`;
      } else {
        displayErrorMessage = `I'm sorry, but I've run into an unexpected problem. Please try your request again in a few moments.`;
      }
      setError(displayErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  // Effect to initialize or reset chat when the view changes to 'chat'
  useEffect(() => {
    if (view === 'chat') {
      chatRef.current = createChatSession();
      setMessages([
          { id: 'initial-bot-message', text: "Hello! I'm your AI Polymath Tutor. What would you like to learn about today?", sender: 'bot' }
      ]);
    }
  }, [view]);

  // Effect to handle sending a pre-filled prompt from the home page
  useEffect(() => {
    if (view === 'chat' && initialPrompt) {
      handleSendMessage(initialPrompt);
      setInitialPrompt(null); // Reset after sending to prevent re-triggering
    }
  }, [view, initialPrompt, handleSendMessage]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleClearChat = () => {
    setIsLoading(false);
    setError(null);
    chatRef.current = createChatSession();
    setMessages([
      { id: 'initial-bot-message-reset', text: "Hello! I'm your AI Polymath Tutor. What would you like to learn about today?", sender: 'bot' }
    ]);
  };

  const handleStartChat = (prompt?: string) => {
    if (prompt) {
      setInitialPrompt(prompt);
    }
    setView('chat');
  };

  const TypingIndicator = ({ userQuery }: { userQuery: string }) => {
    const getThinkingMessages = (query: string): string[] => {
      const lowerQuery = query.toLowerCase();

      if (/\b(physics|gravity|relativity|quantum|astronomy)\b/.test(lowerQuery)) {
        return [
          "Calculating trajectories...",
          "Consulting the laws of thermodynamics...",
          "Simplifying quantum mechanics...",
          "Peering through a cosmic telescope..."
        ];
      }
      if (/\b(history|ancient|war|rome|egypt)\b/.test(lowerQuery)) {
        return [
          "Sifting through historical archives...",
          "Connecting timelines...",
          "Uncovering ancient secrets...",
          "Consulting the annals of the past..."
        ];
      }
      if (/\b(code|javascript|python|react|algorithm)\b/.test(lowerQuery)) {
        return [
          "Compiling the code in my head...",
          "Debugging the logic...",
          "Writing the perfect algorithm...",
          "Optimizing the solution..."
        ];
      }
      if (/\b(art|painting|music|symphony|sculpture)\b/.test(lowerQuery)) {
        return [
          "Analyzing brushstrokes and palettes...",
          "Composing a symphony of ideas...",
          "Finding the perfect metaphor...",
          "Exploring the gallery of knowledge..."
        ];
      }
      
      // Fallback generic messages
      return [
        "Thinking...",
        "Consulting my digital library...",
        "Formulating the perfect explanation...",
        "Just a moment...",
        "Connecting the dots...",
        "Gathering my thoughts..."
      ];
    };
    
    const [thinkingMessages, setThinkingMessages] = useState(() => getThinkingMessages(userQuery));
    const [currentMessage, setCurrentMessage] = useState(thinkingMessages[0]);
  
    useEffect(() => {
        setThinkingMessages(getThinkingMessages(userQuery));
    }, [userQuery]);

    useEffect(() => {
      let index = 0;
      setCurrentMessage(thinkingMessages[0]);
      
      const intervalId = setInterval(() => {
        index = (index + 1) % thinkingMessages.length;
        setCurrentMessage(thinkingMessages[index]);
      }, 2500);
  
      return () => clearInterval(intervalId);
    }, [thinkingMessages]);
  
    return (
      <li 
        className="flex items-start gap-3 my-4 animate-fade-in-up"
        role="status"
      >
        <div 
          className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
          aria-label="AI Tutor Avatar"
        >
          <BrainCircuitIcon className="w-5 h-5 text-white animate-pulse" aria-hidden="true" />
        </div>
        <div
          className="max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-600"
        >
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {currentMessage}
          </p>
        </div>
      </li>
    );
  };

  if (view === 'home') {
    return <HomePage onStartChat={handleStartChat} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header onClearChat={handleClearChat} onGoHome={() => setView('home')} />
      <main className="flex-1 overflow-y-auto pt-20 pb-4">
        <ul role="log" aria-live="polite" className="container mx-auto px-4 max-w-4xl">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator userQuery={lastUserMessage} />}
          <li ref={messagesEndRef} className="h-0" aria-hidden="true" />
        </ul>
      </main>
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;