
import { GoogleGenAI, Type } from "@google/genai";
import type { TravelPreferences, Itinerary } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(preferences: TravelPreferences): string {
  return `
Actúa como un experto planificador de viajes. Genera un itinerario de viaje personalizado en formato JSON.

Detalles del viaje:
- Destino: ${preferences.destination}
- Duración: ${preferences.duration} días
- Presupuesto: ${preferences.budget}
- Intereses: ${preferences.interests}
- Restricciones: ${preferences.restrictions}

Requisitos:
1. Crea un título atractivo para el viaje.
2. Escribe un resumen breve e inspirador.
3. Para cada día, asigna un tema, 2-3 actividades clave con descripción, y recomendaciones específicas de comida (almuerzo y cena).
4. El tono debe ser inspirador.
`;
}

export const generateItinerary = async (preferences: TravelPreferences): Promise<Itinerary> => {
  if (!preferences.destination) {
    throw new Error("El destino es un campo obligatorio.");
  }
  
  const prompt = buildPrompt(preferences);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripTitle: { type: Type.STRING },
            summary: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  theme: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        timeSlot: { type: Type.STRING, description: "Mañana, Tarde, o Noche" }
                      }
                    }
                  },
                  meals: {
                    type: Type.OBJECT,
                    properties: {
                      lunch: { type: Type.STRING },
                      dinner: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Itinerary;
    }
    throw new Error("No se generó contenido de texto.");
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    throw new Error("No se pudo comunicar con el servicio de IA. Revisa la configuración de tu API Key.");
  }
};
