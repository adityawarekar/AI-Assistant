const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadPdf, getPdfs, deletePdf, getPdfById, } = require("../controllers/pdfController");

router.get("/", getPdfs);
router.get("/:id", getPdfById);
router.post("/upload", upload.single("pdf"), uploadPdf);
router.delete("/:id", deletePdf);


module.exports = router;