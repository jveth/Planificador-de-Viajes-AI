
import { GoogleGenAI } from "@google/genai";
import type { TravelPreferences } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(preferences: TravelPreferences): string {
  return `
Actúa como un experto planificador de viajes y agente de viajes personal. Tu objetivo es crear un itinerario de viaje personalizado, detallado y atractivo basado en las preferencias del usuario.

Aquí están los detalles del viaje:
- Destino: ${preferences.destination}
- Duración: ${preferences.duration} días
- Presupuesto Aproximado: ${preferences.budget}
- Intereses Principales: ${preferences.interests}
- Restricciones y Preferencias Adicionales: ${preferences.restrictions}

Tu tarea es generar un itinerario día por día. Para cada día, debes incluir:
1.  Un título temático para el día (ej. "Día 1: Exploración Histórica y Sabores Locales").
2.  Entre 2 y 3 actividades sugeridas, con una breve descripción de por qué es interesante.
3.  Una recomendación para el almuerzo y otra para la cena, sugiriendo un tipo de cocina o un restaurante específico si es conocido.
4.  Asegúrate de que el plan sea logísticamente coherente y realista para el tiempo disponible.
5.  El tono debe ser amigable, inspirador y útil.

Formatea la respuesta completa usando Markdown para una fácil lectura, utilizando encabezados, listas y negritas. No incluyas ninguna introducción o conclusión fuera del itinerario en sí. Comienza directamente con 'Día 1'.
`;
}


export const generateItinerary = async (preferences: TravelPreferences): Promise<string> => {
  if (!preferences.destination) {
    throw new Error("El destino es un campo obligatorio.");
  }
  
  const prompt = buildPrompt(preferences);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    throw new Error("No se pudo comunicar con el servicio de IA. Revisa la configuración de tu API Key.");
  }
};
