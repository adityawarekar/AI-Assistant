# 📚 Archivio – AI Learning Assistant

Archivio is a full-stack AI-powered learning platform that helps students transform PDF documents into structured study material. Users can upload study notes, books, or lecture PDFs and instantly generate summaries, flashcards, quizzes, interview questions, revision notes, study plans, important topics, and more using Google Gemini AI.

---

## 🚀 Features

### Authentication

* User Registration & Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing

### PDF Management

* Upload PDF Documents
* View Uploaded PDFs
* Delete PDFs
* Store Extracted Text
* User-Specific Documents

### AI Study Tools

* AI Summary Generator
* Smart Notes Generator
* Flashcards Generator
* Quiz Generator
* Interview Questions Generator
* Practice Sheet Generator
* Important Topics Extraction
* Revision Notes Generator
* 7-Day Study Plan Generator
* Chat with PDF
* PDF Search

### Dashboard

* Recent Documents
* Learning Statistics
* Progress Tracking
* Quick Actions
* Modern Responsive UI

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion
* Zustand
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer
* PDF-Parse

### AI

* Google Gemini 2.5 Flash API

---

## 📁 Project Structure

```
ai-learning-assistant/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

```
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 📦 Main Functionalities

* Upload and manage PDF documents
* AI-powered document summarization
* Interactive flashcards
* Multiple-choice quizzes
* Interview question generation
* Practice sheet generation
* Revision notes
* Important topics extraction
* Personalized study plans
* Chat with uploaded PDFs
* Search inside PDF content

---

## 🔒 Security

* JWT Authentication
* Protected API Routes
* Password Hashing
* Environment Variables for Secrets

---

## 🌟 Future Improvements

* Docker Containerization
* AWS EC2 Deployment
* PDF Highlighting
* AI Voice Assistant
* OCR Support
* Study Analytics Dashboard
* Dark Mode
* Collaborative Study Groups

---

## 👨‍💻 Author

**Aditya Warekar**

GitHub: https://github.com/adityawarekar

---

