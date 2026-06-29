import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaFileAlt,
  FaComments,
  FaBrain,
  FaQuestionCircle,
  FaStickyNote,
  FaMicrophone,
  FaSearch,
  FaUser,
  FaBook,
  FaPen,
  FaStar,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const featureRoutes = [
    "/chat",
    "/notes",
    "/revision",
    "/important-topics",
    "/flashcards",
    "/quiz",
    "/interview",
    "/practice-sheet",
    "/studyplan",
    "/search",
  ];
  useEffect(() => {
    if (featureRoutes.includes(location.pathname)) {
      setShowFeatures(true);
    }
  }, [location.pathname]);

  return (
    <div className="w-72 min-h-screen bg-white border-r border-[#E5E7EB] p-6">

      {/* Logo */}

      <h1 className="text-3xl font-bold text-[#111827] mb-10">
        Archivio
      </h1>

      <div className="flex flex-col gap-2">

        {/* Dashboard */}

        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-1
${isActive("/dashboard")
              ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
              : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
            }`}
        >
          <FaHome />
          Dashboard
        </Link>

        {/* Documents */}

        <Link
          to="/documents"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-1
${isActive("/documents")
              ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
              : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
            }`}
        >
          <FaFileAlt />
          Documents
        </Link>

        {/* Features */}

        <button
          onClick={() => setShowFeatures(!showFeatures)}
          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#FFF7ED] hover:text-[#EA580C] transition-all duration-300 hover:translate-x-1 text-left"
        >
          <div className="flex items-center gap-3">
            <FaStar />
            <span>Features</span>
          </div>

          {showFeatures ? (
            <FaChevronDown size={14} />
          ) : (
            <FaChevronRight size={14} />
          )}
        </button>

        {showFeatures && (
          <div className="ml-8 flex flex-col gap-2">

            <Link
              to="/chat"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/chat")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaComments className="text-[#EA580C]" />
              Chat with PDF
            </Link>

            <Link
              to="/notes"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/notes")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaStickyNote className="text-[#EA580C]" />
              Notes
            </Link>

            <Link
              to="/revision"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/revision")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaBook className="text-[#EA580C]" />
              Revision Notes
            </Link>

            <Link
              to="/important-topics"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/important-topics")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaStar className="text-[#EA580C]" />
              Important Topics
            </Link>

            <Link
              to="/flashcards"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/flashcards")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaBrain className="text-[#EA580C]" />
              Flashcards
            </Link>

            <Link
              to="/quiz"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/quiz")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaQuestionCircle className="text-[#EA580C]" />
              Quiz
            </Link>

            <Link
              to="/interview"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/interview")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaMicrophone className="text-[#EA580C]" />
              Interview Questions
            </Link>

            <Link
              to="/practice-sheet"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/practice-sheet")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaPen className="text-[#EA580C]" />
              Practice Sheet
            </Link>

            <Link
              to="/search"
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:translate-x-1
      ${isActive("/search")
                  ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
                  : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
                }`}
            >
              <FaSearch className="text-[#EA580C]" />
              PDF Search
            </Link>

          </div>
        )}

        {/* Profile */}

        <Link
          to="/profile"
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#FFF7ED] hover:text-[#EA580C] transition"
        >
          <FaUser />
          Profile
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;