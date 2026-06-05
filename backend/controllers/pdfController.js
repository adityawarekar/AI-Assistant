const Pdf = require("../models/Pdf");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateSummary, } = require("../services/geminiService");

exports.uploadPdf = async (req, res) => {
  try {
    const file = req.file;

    const dataBuffer = fs.readFileSync(file.path);

    const pdfData = await pdfParse(dataBuffer);

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
  try{
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