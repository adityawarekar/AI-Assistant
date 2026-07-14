import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  FaTasks,
  FaTimes,
} from "react-icons/fa";

export const SidebarContext = createContext(null);
export const useSidebar = () => useContext(SidebarContext);

const Sidebar = () => {
  const location = useLocation();

  const [showFeatures, setShowFeatures] = useState(false);
  const { isOpen, setIsOpen } = useSidebar();

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

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-1 ${isActive(path)
      ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
      : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
    }`;

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-10">

        <h1 className="text-3xl font-bold text-[#111827]">
          Archivio
        </h1>

        <button
          className="lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={24} />
        </button>

      </div>

      <div className="flex flex-col gap-2">

        <Link
          to="/dashboard"
          className={linkClass("/dashboard")}
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/documents"
          className={linkClass("/documents")}
        >
          <FaFileAlt />
          Documents
        </Link>

        <button
          onClick={() =>
            setShowFeatures(!showFeatures)
          }
          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 hover:translate-x-1 text-left ${featureRoutes.includes(location.pathname)
            ? "bg-[#FFF7ED] text-[#EA580C] font-semibold"
            : "hover:bg-[#FFF7ED] hover:text-[#EA580C]"
            }`}
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
              className={linkClass("/chat")}
            >
              <FaComments className="text-[#EA580C]" />
              Chat with PDF
            </Link>

            <Link
              to="/notes"
              className={linkClass("/notes")}
            >
              <FaStickyNote className="text-[#EA580C]" />
              Notes
            </Link>

            <Link
              to="/flashcards"
              className={linkClass("/flashcards")}
            >
              <FaBrain className="text-[#EA580C]" />
              Flashcards
            </Link>

            <Link
              to="/important-topics"
              className={linkClass("/important-topics")}
            >
              <FaStar className="text-[#EA580C]" />
              Important Topics
            </Link>

            <Link
              to="/quiz"
              className={linkClass("/quiz")}
            >
              <FaQuestionCircle className="text-[#EA580C]" />
              Quiz
            </Link>

            <Link
              to="/interview"
              className={linkClass("/interview")}
            >
              <FaMicrophone className="text-[#EA580C]" />
              Interview Questions
            </Link>

            <Link
              to="/practice-sheet"
              className={linkClass("/practice-sheet")}
            >
              <FaPen className="text-[#EA580C]" />
              Practice Sheet
            </Link>

            <Link
              to="/studyplan"
              className={linkClass("/studyplan")}
            >
              <FaTasks className="text-[#EA580C]" />
              Study Plan
            </Link>

            <Link
              to="/revision"
              className={linkClass("/revision")}
            >
              <FaBook className="text-[#EA580C]" />
              Revision Notes
            </Link>

            <Link
              to="/search"
              className={linkClass("/search")}
            >
              <FaSearch className="text-[#EA580C]" />
              PDF Search
            </Link>

          </div>
        )}

        <Link
          to="/profile"
          className={linkClass("/profile")}
        >
          <FaUser />
          Profile
        </Link>

      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-72 bg-white border-r border-[#E5E7EB] p-6 z-50 overflow-y-auto lg:hidden"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 min-h-screen bg-white border-r border-[#E5E7EB] p-6 overflow-y-auto">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;