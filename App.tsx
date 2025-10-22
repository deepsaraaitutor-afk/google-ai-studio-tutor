import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import type { Message } from './types';
import { createChatSession } from './services/geminiService';
import { GEMINI_MODEL } from './constants';
import { BrainCircuitIcon } from './components/Icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current = createChatSession();
    setMessages([
        { id: 'initial-bot-message', text: "Hello! I'm your AI Polymath Tutor. What would you like to learn about today?", sender: 'bot' }
    ]);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
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
      setError(rawErrorMessage);
      console.error(e);

      let displayErrorMessage: string;
      const lowerCaseError = rawErrorMessage.toLowerCase();

      if (lowerCaseError.includes('api key')) {
        displayErrorMessage = "It seems there's an issue with the API key. Please make sure it's configured correctly in your environment and is valid.";
      } else if (lowerCaseError.includes('model') && lowerCaseError.includes('not found')) {
        displayErrorMessage = `Sorry, the AI model (${GEMINI_MODEL}) is currently unavailable. Please try again later.`;
      } else {
        displayErrorMessage = `I'm sorry, but I've run into an unexpected problem. Please try your request again in a few moments.`;
      }
      
      const errorBotMessage: Message = {
        id: `${Date.now()}-error`,
        text: displayErrorMessage,
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setIsLoading(false);
    setError(null);
    chatRef.current = createChatSession();
    setMessages([
      { id: 'initial-bot-message-reset', text: "Hello! I'm your AI Polymath Tutor. What would you like to learn about today?", sender: 'bot' }
    ]);
  };
  
  const TypingIndicator = () => {
    const thinkingMessages = [
      "Thinking...",
      "Consulting my digital library...",
      "Formulating the perfect explanation...",
      "Just a moment...",
    ];
    const [currentMessage, setCurrentMessage] = useState(thinkingMessages[0]);
  
    useEffect(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        index = (index + 1) % thinkingMessages.length;
        setCurrentMessage(thinkingMessages[index]);
      }, 2500);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="flex items-start gap-3 my-4 animate-fade-in-up">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <BrainCircuitIcon className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div
          className="max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-600"
        >
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {currentMessage}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onClearChat={handleClearChat} />
      <main className="flex-1 overflow-y-auto pt-20 pb-4">
        <div className="container mx-auto px-4 max-w-4xl">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;