const { GoogleGenerativeAI } =
require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateSummary = async (text) => {
  const prompt = `
  Summarize this document in simple bullet points:

  ${text}
  `;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
};

module.exports = {
  generateSummary,
};

console.log(process.env.GEMINI_API_KEY);