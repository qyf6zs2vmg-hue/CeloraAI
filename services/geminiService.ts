
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Always initialize a new GoogleGenAI instance right before the API call to ensure use of the most up-to-date configuration.
  async generateResponse(prompt: string, history: any[], imageBase64?: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const parts: any[] = [];
      
      if (imageBase64) {
        // Extract base64 data and mime type from the data URL.
        const match = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2]
            }
          });
        }
      }

      // Ensure at least one text part is provided.
      parts.push({ text: prompt || "Describe this image" });

      const contents = [
        ...history,
        { role: 'user', parts }
      ];

      const response = await ai.models.generateContent({
        // Recommended model for general text and reasoning tasks.
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          temperature: 0.7,
        }
      });

      // The .text property is a direct property on GenerateContentResponse.
      return response.text || "I couldn't generate a response.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
