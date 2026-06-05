const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); 
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
const path = require("path");


app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes)
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});                                                                               
