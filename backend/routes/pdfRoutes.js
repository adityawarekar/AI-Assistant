const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadPdf } = require("../controllers/pdfController");

router.post("/upload", upload.single("pdf"), uploadPdf);

module.exports = router;