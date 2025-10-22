
import { GoogleGenAI, Chat } from "@google/genai";
import { GEMINI_MODEL, TUTOR_SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function createChatSession(): Chat {
  const chatSession = ai.chats.create({
    model: GEMINI_MODEL,
    config: {
      systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
    },
  });
  return chatSession;
}
