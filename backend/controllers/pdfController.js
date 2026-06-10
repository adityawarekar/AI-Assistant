const Pdf = require("../models/Pdf");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateSummary, generateNotes, generateInterviewQuestions: generateAIInterviewQuestions, generateQuiz: generateAIQuiz, generateFlashcards: generateAIFlashcards, chatWithPdfAI, generatePracticeSheet: generateAIPracticeSheet, generateImportantTopics: generateAIImportantTopics, generateRevisionNotes: generateAIRevisionNotes, } = require("../services/geminiService");

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

    await Pdf.findByIdAndDelete(id);

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
        message: "PDF not found"
      });
    }

    const flashcards =
      await generateAIFlashcards(
        pdf.text.slice(0, 1000)
      );

    await updatePdfProgress(
      req.params.id,
      20
    );

    res.json({
      flashcards,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message
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
      pdf.text.slice(0, 1000)
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
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    const quizText =
      await generateAIQuiz(
        pdf.text.slice(0, 1000)
      );

    const quiz =
      JSON.parse(
        quizText.replace(/```json/g, "")
          .replace(/```/g, "")
      );

    res.json(quiz);
  } catch (error) {
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

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }



    const topics = pdf.text
      .split("\n")
      .filter(line => line.trim() !== "")
      .slice(0, 20);





    const studyPlan = [];

    const days = 5;
    const topicsPerDay = Math.ceil(
      topics.length / days
    );

    for (let i = 0; i < days; i++) {
      studyPlan.push({
        day: `Day ${i + 1}`,
        topics: topics.slice(
          i * topicsPerDay,
          (i + 1) * topicsPerDay
        ),
      });
    }

    studyPlan.push({
      day: "Revision",
      topics: [
        "Revise all important topics",
      ],
    });
    await updatePdfProgress(
      req.params.id,
      10
    );

    res.json(studyPlan);

  } catch (error) {
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

    const question =
      await generateAIInterviewQuestions(
        pdf.text.slice(0, 1000)
      );

    await updatePdfProgress(
      req.params.id,
      10
    );

    res.json({
      question,
    });

  } catch (error) {
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

    const totalDocuments = pdfs.length;

    const totalFlashcards =
      totalDocuments * 5;

    const totalInterviewQuestions =
      totalDocuments * 10;

    const totalStudyPlans =
      totalDocuments;

    res.json({
      totalDocuments,
      totalFlashcards,
      totalInterviewQuestions,
      totalStudyPlans,
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


exports.generateImportantTopics =
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

      const topics =
        await generateAIImportantTopics(
          pdf.text.slice(0, 5000)
        );

      await updatePdfProgress(
        req.params.id,
        10
      );

      res.json({
        topics,
      });

    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

exports.generateRevisionNotes =
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

      const revisionNotes =
        await generateAIRevisionNotes(
          pdf.text.slice(0, 5000)
        );

      await updatePdfProgress(
        req.params.id,
        10
      );

      res.json({
        revisionNotes,
      });

    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };


