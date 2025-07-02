/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from "@google/genai";
import { ApiResponse } from '../../types/types';

interface GeminiService {
  generateContent(prompt: string): Promise<string>;
  validateApiKey(): Promise<boolean>;
}

class GeminiAPIService implements GeminiService {
  private client: GoogleGenAI;
  
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      if (!prompt.trim()) {
        throw new Error('Prompt cannot be empty');
      }

      const response = await this.client.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: prompt,
      });

      const text = response.text || '';
      return text.replace(/\n/g, '<br>');
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const testResponse = await this.generateContent('Hello');
      return !!testResponse;
    } catch (error) {
      return false;
    }
  }

  private handleError(error: Error): never {
    console.error('Gemini API Error:', error);
    
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    
    if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }
    
    if (error.message.includes('network')) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

// Create singleton instance
let geminiServiceInstance: GeminiAPIService | null = null;

export function getGeminiService(): GeminiAPIService {
  if (!geminiServiceInstance) {
    const apiKey = (process.env as any).API_KEY || (process.env as any).GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not found in environment variables');
    }
    geminiServiceInstance = new GeminiAPIService(apiKey);
  }
  return geminiServiceInstance;
}

export async function generateThankYouMessage(): Promise<ApiResponse<string>> {
  try {
    const service = getGeminiService();
    const prompt = "A user has successfully contributed a new question to HistBench. Please provide a warm and encouraging thank you message, confirming their submission has been received and will be reviewed by our team of historians. Mention that their contribution is valuable for advancing AI's understanding of history.";
    
    const message = await service.generateContent(prompt);
    
    return {
      success: true,
      data: message
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message
    };
  }
} 