import { genkit } from 'genkit';
import { googleAI, gemini20FlashExp } from '@genkit-ai/googleai';
import dotenv from 'dotenv';
dotenv.config();

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
  model: gemini20FlashExp,
});