const Pdf = require("../models/Pdf");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateSummary, generateNotes, generateInterviewQuestions: generateAIInterviewQuestions, generateQuiz: generateAIQuiz, generateFlashcards: generateAIFlashcards, chatWithPdfAI, generatePracticeSheet: generateAIPracticeSheet, generateImportantTopics: generateAIImportantTopics, generateRevisionNotes: generateAIRevisionNotes, generateStudyPlanAI } = require("../services/geminiService");

const cleanJson = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

const updatePdfProgress = async (
  pdfId,
  increaseBy
) => {
  const pdf = await Pdf.findById(pdfId);
  if (!pdf) {

    return;
  }
  pdf.progress = Math.min(
    pdf.progress + increaseBy,
    100
  );
  await pdf.save();
};

exports.uploadPdf = async (req, res) => {

  try {
    const file = req.file;

    const dataBuffer = fs.readFileSync(file.path);

    const pdfData = await pdfParse(dataBuffer);


    const pdf = await Pdf.create({
      userId: req.user.id,
      title: file.originalname,
      fileUrl: file.path,
      text: pdfData.text,
    });

    res.json(pdf);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({
      userId: req.user.id,
    });

    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePdf = async (req, res) => {
  try {
    const { id } = req.params;

    await Pdf.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    res.json({
      message: "PDF deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getPdfById = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    res.json(pdf);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generatePdfSummary =
  async (req, res) => {
    try {
      const pdf = await Pdf.findById(
        req.params.id
      );
      if (!pdf) {
        return res.status(404).json({
          message: "PDF not found",
        });
      }

      const summary = await generateSummary(
        pdf.text.slice(0, 3000)
      );
      res.json({
        summary,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });

    }
  };

exports.generateFlashcards = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    console.log("Step 1");
    console.log(pdf.text.length);

    const flashcardsText = await generateAIFlashcards(
      pdf.text.slice(0, 5000)
    );

    console.log("Step 2");
    console.log(flashcardsText);

    const flashcards = JSON.parse(
      cleanJson(flashcardsText)
    );

    console.log("Step 3");
    console.log(flashcards);

    console.log("Step 4");

    res.json(flashcards);

  } catch (error) {
    console.log("FLASHCARD ERROR");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generateNotes = async (req, res) => {
  try {


    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    const notes = await generateNotes(
      pdf.text.slice(0, 5000)
    );

    await updatePdfProgress(
      req.params.id,
      20
    );

    res.json({
      notes,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
console.log("generateNotes loaded");

exports.generateQuiz = async (req, res) => {
  try {
    console.log("STEP 1");

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    console.log("STEP 2");

    const quizText = await generateAIQuiz(
      pdf.text.slice(0, 5000)
    );

    console.log("Gemini Response:");
    console.log(quizText);

    const quiz = JSON.parse(
      cleanJson(quizText)
    );

    console.log("Parsed Quiz:");
    console.log(quiz);

    console.log("FIRST QUESTION:");
    console.log(quiz[0]);

    console.log("OPTIONS:");
    console.log(quiz[0].options);

    res.json(quiz);

  } catch (error) {
    console.log("QUIZ ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.chatWithPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    const { question } = req.body;

    const answer =
      await chatWithPdfAI(
        pdf.text.slice(0, 5000),
        question
      );

    await updatePdfProgress(
      req.params.id,
      10
    );

    res.json({
      answer,
    });

  } catch (error) {
    console.log("CHAT AI ERROR:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generateStudyPlan = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    console.log("PDF FOUND:", pdf);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    console.log("TEXT EXISTS:", pdf.text);

    const studyPlan = await generateStudyPlanAI(
      pdf.text.slice(0, 5000)
    );

    console.log("STUDY PLAN GENERATED");

    await updatePdfProgress(
      req.params.id,
      10
    );

    res.json({
      studyPlan,
    });

  } catch (error) {

    console.log("STUDY PLAN ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generateInterviewQuestions = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    const questionText =
      await generateAIInterviewQuestions(
        pdf.text.slice(0, 5000)
      );

    const questions = JSON.parse(
      cleanJson(questionText)
    );

    res.json(questions);

  } catch (error) {
    console.log("INTERVIEW QUESTIONS ERROR");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generateImportantTopics = async (req, res) => {
  try {
    console.log("===== IMPORTANT TOPICS =====");

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    console.log("Step 1");
    console.log("PDF Length:", pdf.text.length);

    const topics = await generateAIImportantTopics(
      pdf.text.slice(0, 5000)
    );

    console.log("Step 2");
    console.log(topics);

    await updatePdfProgress(req.params.id, 10);

    console.log("Step 3");
    console.log("Topics Generated");

    res.json({
      topics,
    });

  } catch (error) {
    console.log("IMPORTANT TOPICS ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

exports.searchPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }
    if (!req.query.query) {
      return res.status(400).json({
        message: "Search query required",
      });
    }
    const query = req.query.query;

    const results = pdf.text
      .split("\n")
      .filter(
        (line) =>
          line
            .toLowerCase()
            .includes(query.toLowerCase())
      );

    res.json({
      count: results.length,
      results,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const pdfs = await Pdf.find({
      userId: req.user.id,
    });

    const totalDocuments =
      pdfs.length;

    const averageProgress =
      pdfs.length > 0
        ? Math.round(
          pdfs.reduce(
            (sum, pdf) =>
              sum + pdf.progress,
            0
          ) / pdfs.length
        )
        : 0;

    res.json({
      totalDocuments,
      averageProgress,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getRecentPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(pdfs);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


exports.updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    const pdf = await Pdf.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true }
    );

    res.json(pdf);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generatePracticeSheet =
  async (req, res) => {
    try {
      const pdf = await Pdf.findById(
        req.params.id
      );

      if (!pdf) {
        return res.status(404).json({
          message: "PDF not found",
        });
      }

      const practiceSheet =
        await generateAIPracticeSheet(
          pdf.text.slice(0, 5000)
        );

      await updatePdfProgress(
        req.params.id,
        10
      );

      res.json({
        practiceSheet,
      });

    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };




exports.generateRevisionNotes = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    console.log("===== REVISION =====");
    console.log("Step 1");
    console.log("PDF Length:", pdf.text.length);

    const revisionNotes =
      await generateAIRevisionNotes(
        pdf.text.slice(0, 5000)
      );

    console.log("Step 2");
    console.log(revisionNotes);

    await updatePdfProgress(
      req.params.id,
      10
    );

    console.log("Step 3");
    console.log("Revision Generated");

    res.json({
      revisionNotes,
    });

  } catch (error) {
    console.log("REVISION ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};


