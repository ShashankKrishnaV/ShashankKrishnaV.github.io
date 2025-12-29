import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize Gemini Client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
  // Check if API Key is available before attempting to use the client
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing in process.env");
    return (async function* () {
      yield "Configuration Error: API_KEY is missing. Please set the API_KEY environment variable.";
    })();
  }

  try {
    // Initialize chat session if it doesn't exist
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    }

    const result = await chatSession.sendMessageStream({ message });
    
    // Generator to yield chunks of text as they arrive
    return (async function* () {
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    })();
    
  } catch (error) {
    console.error("Gemini Interaction Error:", error);
    // Reset session to recover from potential state issues
    chatSession = null;
    return (async function* () {
      yield "I'm having trouble connecting to the AI service right now. Please try again in a moment.";
    })();
  }
};