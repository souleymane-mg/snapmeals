import { GoogleGenAI } from "@google/genai";

// Safe initialization
const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGeminiFoodSuggestion = async (userMood: string, availableDishes: string[]): Promise<string> => {
  if (!ai) {
    return "Désolé, je ne peux pas me connecter au Chef IA pour le moment (Clé API manquante). Mais je vous recommande le Burger Classique !";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Tu es un assistant Chef IA utile pour une application de livraison de repas à Bamako, Mali.
      L'utilisateur se sent : "${userMood}".
      Les plats disponibles au menu sont : ${availableDishes.join(', ')}.
      
      Suggère UN plat de la liste qui correspond à son humeur et explique pourquoi en 1 courte phrase en FRANÇAIS.
      Sois enthousiaste et donne faim !
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Je vous recommande le Burger Classique !";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "J'ai du mal à réfléchir pour l'instant, mais le Double Cheese Burger est toujours un excellent choix !";
  }
};