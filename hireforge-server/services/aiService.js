const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function evaluateSubjective(question, answer, maxMarks) {
  try {
    const prompt = `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Give a score out of ${maxMarks}.
Only return the numeric score.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const scoreText = response.choices[0].message.content.trim();

    const score = Math.min(
      maxMarks,
      Math.max(0, parseFloat(scoreText))
    );

    return score;

  } catch (error) {
    console.error("AI Evaluation Error:", error);
    return 0;
  }
}

module.exports = { evaluateSubjective };
