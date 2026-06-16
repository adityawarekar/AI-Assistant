import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PdfViewer from "./pages/PdfViewer";
import StudyPlan from "./pages/StudyPlan";
import InterviewQuestions from "./pages/InterviewQuestions";
import PdfSearch from "./pages/PdfSearch";
import RevisionNotes from "./pages/RevisionNotes";
import PracticeSheet from "./pages/PracticeSheet";
import ImportantTopics from "./pages/ImportantTopics";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/flashcards"
          element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/revision"
          element={
            <ProtectedRoute>
              <RevisionNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice-sheet"
          element={
            <ProtectedRoute>
              <PracticeSheet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/important-topics"
          element={
            <ProtectedRoute>
              <ImportantTopics />
            </ProtectedRoute>
          }
        />



        <Route
          path="/pdf/:id"
          element={
            <ProtectedRoute>
              <PdfViewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/studyplan/:id"
          element={
            <ProtectedRoute>
              <StudyPlan />
            </ProtectedRoute>

          }

        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <PdfSearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test"
          element={<h1>TEST PAGE</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;