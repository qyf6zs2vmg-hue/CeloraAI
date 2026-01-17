import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateResponse(prompt: string, history: any[], imageBase64?: string) {
    // API_KEY берется из process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    try {
      const parts: any[] = [];
      
      if (imageBase64) {
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

      parts.push({ text: prompt || "Describe this image" });

      const contents = history.map(h => ({
        role: h.role,
        parts: h.parts
      }));
      
      contents.push({ role: 'user', parts });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          temperature: 0.7,
        }
      });

      // В новом SDK .text — это getter, а не метод.
      return response.text || "Не удалось получить ответ.";
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return `Ошибка: ${error.message || "Ошибка соединения с ИИ"}`;
    }
  }
}

export const geminiService = new GeminiService();