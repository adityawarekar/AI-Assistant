import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        🤖 AI Assistant
      </h1>

      <div className="flex flex-col gap-4">
        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/documents">📄 Documents</Link>
        <Link to="/chat">💬 AI Chat</Link>
        <Link to="/flashcards">🧠 Flashcards</Link>
        <Link to="/quiz">❓ Quiz</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/interview">🎤 Interview Questions</Link>
        <Link to="/profile">👤 Profile</Link>
      </div>
    </div>
  );
};

export default Sidebar;