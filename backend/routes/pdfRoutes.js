const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadPdf, getPdfs, deletePdf, getPdfById, generatePdfSummary, generateFlashcards, generateQuiz, generateNotes, chatWithPdf } = require("../controllers/pdfController");

console.log({
  uploadPdf,
  getPdfs,
  deletePdf,
  getPdfById,
  generatePdfSummary,
  generateFlashcards,
  generateQuiz,
  generateNotes,
  chatWithPdf,
});

router.get("/", getPdfs);
router.get("/summary/:id",generatePdfSummary);
router.get("/flashcards/:id", generateFlashcards);
router.get("/quiz/:id", generateQuiz);
router.get("/notes/:id", generateNotes);
router.post("/chat/:id", chatWithPdf);
router.get("/:id", getPdfById);
router.post("/upload", upload.single("pdf"), uploadPdf);
router.delete("/:id", deletePdf);



module.exports = router;
