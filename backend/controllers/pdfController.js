const Pdf = require("../models/Pdf");

exports.uploadPdf = async (req, res) => {
    try {
        const file = req.file;

        const pdf = await Pdf.create({
            userId: "dummy",
            title: file.originalname,
            fileUrl: file.path,
        });

        res.json(pdf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};