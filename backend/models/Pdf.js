const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    fileUrl: String,

    text: {
        type: String,
        default: "",
    },
    progress: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("Pdf", pdfSchema);