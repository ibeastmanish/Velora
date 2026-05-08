import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export interface ItineraryItem {
  time: string;
  activity: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  type: 'HOTEL' | 'RESTAURANT' | 'ATTRACTION' | 'TRANSPORT';
  estimatedCost?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  items: ItineraryItem[];
}

export interface TripPlan {
  destination: string;
  countryCode: string;
  totalBudget: string;
  days: DayPlan[];
}

export async function generateTripPlan(prompt: string): Promise<TripPlan> {
  const model = "gemini-3.1-pro-preview";
  
  const systemInstruction = `
    You are Velora, a premium AI travel assistant. 
    You generate structured, high-quality, logistical travel plans.
    Return ONLY a JSON object matching the TripPlan interface.
    
    TripPlan {
      destination: string;
      countryCode: string; (ISO 2-letter)
      totalBudget: string;
      days: {
        day: number;
        title: string;
        items: {
          time: string; (e.g. "09:00 AM")
          activity: string;
          description: string;
          location: {
            lat: number;
            lng: number;
            name: string;
          };
          type: 'HOTEL' | 'RESTAURANT' | 'ATTRACTION' | 'TRANSPORT';
          estimatedCost?: string;
        }[]
      }[]
    }

    Rules:
    - Locations must be accurate.
    - Day items must be logical (opening hours, travel distance).
    - Provide at least 3 items per day.
    - Be creative but realistic.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
