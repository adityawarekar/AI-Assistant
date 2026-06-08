const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
console.log("AUTH MIDDLEWARE:", authMiddleware);
const upload = require("../middleware/upload");
const { uploadPdf, getPdfs, deletePdf, getPdfById, generatePdfSummary, generateFlashcards, generateQuiz, generateNotes, chatWithPdf, generateStudyPlan, generateInterviewQuestions } = require("../controllers/pdfController");

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
  generateStudyPlan,
  generateInterviewQuestions,
});

router.get("/", authMiddleware, getPdfs);
router.get("/summary/:id", authMiddleware, generatePdfSummary);
router.get("/flashcards/:id",authMiddleware, generateFlashcards);
router.get("/quiz/:id", authMiddleware, generateQuiz);
router.get("/notes/:id", authMiddleware, generateNotes);
router.get("/studyplan/:id",authMiddleware, generateStudyPlan);
router.get("/interview/:id", authMiddleware, generateInterviewQuestions);
router.post("/chat/:id", authMiddleware, chatWithPdf);
router.get("/:id", authMiddleware, getPdfById);
router.post(
  "/upload",
  (req, res, next) => {
    
    next();
  },
  authMiddleware,
  upload.single("pdf"),
  uploadPdf
);
router.delete("/:id", authMiddleware, deletePdf);



module.exports = router;
