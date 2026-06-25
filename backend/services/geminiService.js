const { GoogleGenerativeAI } =
  require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateText = async (prompt) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.error(`Attempt ${attempt}:`, error.message);

      if (error.status === 429) {
        throw new Error(
          "Gemini API quota exceeded. Please try again later."
        );
      }

      if (error.status === 503 && attempt < 3) {
        console.log("Retrying...");
        await delay(3000);
        continue;
      }

      if (error.status === 503) {
        throw new Error(
          "Gemini servers are busy. Please try again after a few minutes."
        );
      }

      throw error;
    }
  }
};

const generateSummary = async (text) => {
  const prompt = `
  Summarize this document in simple bullet points:

  ${text}
  `;

  return await generateText(prompt);
};

const generateNotes = async (text) => {
  const prompt = `
Create concise study notes from this document:

${text}
`;

  return await generateText(prompt);
};

const generateInterviewQuestions = async (text) => {
  const prompt = `
Generate 10 interview questions from this document.

Return ONLY valid JSON.

Format:

[
  {
    "id": 1,
    "question": "What is DBMS?"
  }
]

Document:
${text}
`;
  return await generateText(prompt);
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

  return await generateText(prompt);
};

const generateQuiz = async (text) => {
  const prompt = `
You are an expert university exam setter.

Create EXACTLY 5 multiple choice questions.

VERY IMPORTANT:

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT wrap inside \`\`\`json

Every object MUST contain:

- question
- options (array of exactly 4 strings)
- answer

Example:

[
  {
    "question":"What is DBMS?",
    "options":[
      "Database Management System",
      "Database Main Server",
      "Data Backup Manager",
      "None"
    ],
    "answer":"Database Management System"
  }
]

Document:

${text}
`;

  return await generateText(prompt);
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

  return await generateText(prompt);
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

  return await generateText(prompt);
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

  return await generateText(prompt);
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

  return await generateText(prompt);
};

const generateStudyPlanAI = async (text) => {
  const prompt = `
Create a 7-day study plan from this document.

Requirements:
- Day wise plan
- Divide topics logically
- Include revision day
- Exam preparation focused

Document:
${text}
`;

  return await generateText(prompt);
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
  generateStudyPlanAI,
};

