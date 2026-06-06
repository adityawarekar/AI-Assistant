const Pdf = require("../models/Pdf");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateSummary, } = require("../services/geminiService");

exports.uploadPdf = async (req, res) => {
  try {
    const file = req.file;

    const dataBuffer = fs.readFileSync(file.path);

    const pdfData = await pdfParse(dataBuffer);

    console.log(
      "Extracted Text Length:",
      pdfData.text.length
    );

    console.log(
      pdfData.text.slice(0, 200)
    );

    const pdf = await Pdf.create({
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
    const pdfs = await Pdf.find();

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

      const summary = await generateSummary(pdf.text);

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
  console.log("=== Flashcards Route Hit ===");
  console.log("PDF ID:", req.params.id);

  try {
    const pdf = await Pdf.findById(req.params.id);

    console.log("PDF Found:", pdf ? "YES" : "NO");

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found"
      });
    }

    console.log("Text Length:", pdf.text.length);

    const lines = pdf.text
      .split("\n")
      .filter(line => line.trim() !== "")
      .slice(0, 5);

    console.log("Lines:", lines);

    const cards = lines.map((line, index) => ({
      question: `Flashcard ${index + 1}`,
      answer: line
    }));

    console.log("Cards Generated:", cards);

    res.json(cards);

  } catch (error) {
    console.log("FLASHCARD ERROR:", error);

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

    const notes = pdf.text
      .split("\n")
      .filter(line => line.trim() !== "")
      .slice(0, 15)
      .join("\n");

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

    const lines = pdf.text
      .split("\n")
      .filter(line => line.trim() !== "")
      .slice(0, 5);

    const quiz = lines.map((line, index) => ({
      question: line,
      options: [
        "Option A",
        "Option B",
        "Option C",
        "Option D",
      ],
      answer: "Option A",
    }));

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

    const lines = pdf.text
      .split("\n")
      .filter(line => line.trim() !== "");

    console.log("Question:", question);

    // Convert "What is DBMS?" -> "dbms"
    const keyword = question
      .toLowerCase()
      .replace("what is", "")
      .replace("?", "")
      .trim();

    console.log("Keyword:", keyword);

    let answer = "No answer found in PDF";

    const index = lines.findIndex(line =>
      line.toLowerCase().includes(keyword)
    );

    if (index !== -1) {
      answer = lines
        .slice(index, index + 5)
        .join(" ");
    }

    res.json({
      answer,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
console.log("PDF Controller Loaded Successfully");