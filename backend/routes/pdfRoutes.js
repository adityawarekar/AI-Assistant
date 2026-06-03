const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadPdf, getPdfs } = require("../controllers/pdfController");

router.post("/upload", upload.single("pdf"), uploadPdf);

router.get("/", getPdfs);

module.exports = router;