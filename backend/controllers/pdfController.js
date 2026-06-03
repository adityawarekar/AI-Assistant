const Pdf = require("../models/Pdf");

exports.uploadPdf = async (req, res) => {
  try {
    const file = req.file;

    const pdf = await Pdf.create({
      title: file.originalname,
      fileUrl: file.path,
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