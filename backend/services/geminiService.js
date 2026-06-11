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

const generatePracticeSheet = async (text) => {
  const prompt = `
Generate a university-style practice sheet from this document.

Requirements:
- 15 to 20 questions
- Assign marks to each question
- Total marks should be 20
- Include short answer and long answer questions
- Format neatly

Document:
${text}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};

const generateQuiz = async (text) => {
  const prompt = `
Generate exactly 5 MCQ questions from this document.

Return ONLY valid JSON.

Format:

[
  {
    "question": "What is DBMS?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "Option A"
  }
]

Document:
${text}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};


const generateFlashcards = async (text) => {
  const prompt = `
Generate 10 flashcards.

Return ONLY valid JSON.

Format:

[
  {
    "question": "What is DBMS?",
    "answer": "Database Management System"
  }
]

Document:
${text}
`;

  const result =
    await model.generateContent(prompt);

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

const generateImportantTopics = async (text) => {
  const prompt = `
Analyze this document and list the 10 most important topics for exams.

Requirements:
- Return only topic names
- Number them
- Focus on exam-important concepts

Document:
${text}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};

const generateRevisionNotes = async (text) => {
  const prompt = `
Create concise last-minute revision notes from this document.

Requirements:
- Keep only important concepts
- Include definitions
- Include key points
- Use bullet points
- Make it exam revision friendly
- Maximum 1 page

Document:
${text}
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
  generatePracticeSheet,
  generateImportantTopics,
  generateRevisionNotes,
};

