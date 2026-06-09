const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
console.log("AUTH MIDDLEWARE:", authMiddleware);
const upload = require("../middleware/upload");
const { generateSummary } = require("../services/geminiService");
const { uploadPdf, getPdfs, deletePdf, getPdfById, generatePdfSummary, generateFlashcards, generateQuiz, generateNotes, chatWithPdf, generateStudyPlan, generateInterviewQuestions, searchPdf, getDashboardStats, getRecentPdfs, updateProgress } = require("../controllers/pdfController");

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
  searchPdf,
  getDashboardStats,
  getRecentPdfs,
  updateProgress,
  getDashboardStats,
});

router.get("/", authMiddleware, getPdfs);
router.get("/summary/:id", authMiddleware, generatePdfSummary);
router.get("/flashcards/:id",authMiddleware, generateFlashcards);
router.get("/quiz/:id", authMiddleware, generateQuiz);
router.get("/notes/:id", authMiddleware, generateNotes);
router.get("/studyplan/:id",authMiddleware, generateStudyPlan);
router.get("/interview/:id", authMiddleware, generateInterviewQuestions);
router.post("/chat/:id", authMiddleware, chatWithPdf);
router.get("/search/:id", authMiddleware, searchPdf);
router.get("/dashboard/stats", authMiddleware, getDashboardStats);
router.get("/recent", authMiddleware, getRecentPdfs);
router.put("/progress/:id", authMiddleware, updateProgress);
router.get("/dashboard/stats", authMiddleware, getDashboardStats);
router.get("/gemini-test", async (req, res) => {
  try {
    const result = await generateSummary(
      "Java is an object oriented programming language."
    );

    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
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
