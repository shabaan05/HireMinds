import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateRoadmap = async (data) => {

  try {

    const weakTopics =
      data?.weakTopics
        ?.map((t) => t.topic)
        ?.join(", ") || "None";

    const strongTopics =
      data?.strengths
        ?.map((t) => t.topic)
        ?.join(", ") || "None";

    const prompt = `
Weak topics:
${weakTopics}

Strong topics:
${strongTopics}

Generate:
- personalized roadmap
- study plan
- improvement strategy
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

    return response.text;

  } catch (error) {

    // console.log("Gemini Failed:", error);
console.error("Gemini Failed:");
console.error(error);
console.error(error.message);
    return `
# Personalized Learning Roadmap

1. Focus on weak topics first
2. Practice MCQs daily
3. Improve DSA problem solving
4. Revise JavaScript fundamentals
5. Build small projects weekly
`;

  }

};