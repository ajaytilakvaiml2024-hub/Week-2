
import { GoogleGenAI, Type } from "@google/genai";
import type { ClassificationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const classificationSchema = {
  type: Type.OBJECT,
  properties: {
    materialType: {
      type: Type.STRING,
      description: 'The primary material of the waste, e.g., Plastic, Glass, or Other.',
      enum: ['Plastic', 'Glass', 'Other'],
    },
    wasteType: {
      type: Type.STRING,
      description: 'The category of waste, either Organic or Inorganic.',
      enum: ['Organic', 'Inorganic'],
    },
  },
  required: ['materialType', 'wasteType'],
};

export const classifyWasteImage = async (
  base64ImageData: string,
  mimeType: string
): Promise<ClassificationResult> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: 'Analyze the image of waste. Determine two properties: 1. Is the primary material Plastic or Glass? If neither, classify as Other. 2. Is the waste Organic or Inorganic? Respond in JSON format according to the provided schema.'
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: classificationSchema,
        temperature: 0.1, // Lower temperature for more deterministic classification
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    // Basic validation
    if (!result.materialType || !result.wasteType) {
        throw new Error('Invalid response format from API');
    }

    return result as ClassificationResult;
  } catch (error) {
    console.error("Error classifying image with Gemini:", error);
    throw new Error("Failed to get a valid classification from the API.");
  }
};
