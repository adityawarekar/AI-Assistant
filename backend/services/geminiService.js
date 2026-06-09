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

const generateNotes = async (text) => {
  const prompt = `
Create concise study notes from this document:

${text}
`;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
};

const generateInterviewQuestions = async (text) => {
  const prompt = `
  Generate 10 interview questions from this document.
  Return only the questions.
  ${text}

  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

const generateQuiz = async (text) => {
  const prompt = `
Generate 5 MCQ questions from this document.

For each question provide:
Question
A)
B)
C)
D)
Correct Answer

${text}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

const generateFlashcards = async (text) => {
  const prompt = `
Generate 10 flashcards from this document.

Format:
Q:
A:

${text}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

const chatWithPdfAI = async (
  text,
  question
) => {
  const prompt = `
You are an AI tutor.

Answer the question using only the PDF content below.

PDF Content:
${text}

Question:
${question}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};


module.exports = {
  generateSummary,
  generateNotes,
  generateInterviewQuestions,
  generateQuiz,
  generateFlashcards,
  chatWithPdfAI,
};

