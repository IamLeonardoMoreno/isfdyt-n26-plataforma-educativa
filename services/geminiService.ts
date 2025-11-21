import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTutorResponse = async (question: string, subject: string): Promise<string> => {
  if (!apiKey) return "Error: API Key no configurada.";
  
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Eres un tutor educativo amable y paciente para estudiantes de secundaria. 
    La materia es: ${subject}.
    El estudiante pregunta: "${question}".
    Responde de manera clara, concisa y alentadora. Usa formato Markdown para resaltar puntos clave.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    return response.text || "No se pudo generar una respuesta.";
  } catch (error) {
    console.error("Gemini Tutor Error:", error);
    return "Lo siento, tuve un problema al procesar tu consulta.";
  }
};

export const generateLessonPlan = async (topic: string, gradeLevel: string): Promise<string> => {
  if (!apiKey) return "Error: API Key no configurada.";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Actúa como un coordinador pedagógico experto. Crea un plan de clase breve para docentes.
    Tema: ${topic}
    Nivel/Año: ${gradeLevel}
    
    Estructura requerida (en Markdown):
    1. Objetivos de aprendizaje
    2. Actividad de inicio (5 min)
    3. Desarrollo (20 min)
    4. Cierre y evaluación (10 min)
    5. Recursos necesarios`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Error al generar la planificación.";
  } catch (error) {
    console.error("Gemini Planner Error:", error);
    return "Ocurrió un error al conectar con el asistente de planificación.";
  }
};

export const analyzeInstitutionalData = async (dataDescription: string): Promise<string> => {
    if (!apiKey) return "Error: API Key no configurada.";
  
    try {
      const model = 'gemini-2.5-flash';
      const prompt = `Eres un asesor educativo analizando datos de una escuela.
      Datos actuales: "${dataDescription}"
      
      Proporciona un resumen ejecutivo breve (máximo 3 párrafos) con:
      1. Análisis de la situación.
      2. Una recomendación estratégica para mejorar.
      Usa un tono profesional y directivo.`;
  
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
  
      return response.text || "Error al analizar datos.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "No se pudo realizar el análisis en este momento.";
    }
  };