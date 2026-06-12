import { Link } from "react-router-dom";
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
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-72 min-h-screen bg-[#FFFDF5] border-r border-gray-200 p-6">
      
      <h1 className="text-3xl font-bold text-black mb-10">
        Archivio
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/documents"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaFileAlt />
          Documents
        </Link>

        <Link
          to="/chat"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaComments />
          Chat
        </Link>

        <Link
          to="/flashcards"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaBrain />
          Flashcards
        </Link>

        <Link
          to="/quiz"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaQuestionCircle />
          Quiz
        </Link>

        <Link
          to="/notes"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaStickyNote />
          Notes
        </Link>

        <Link
          to="/interview"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaMicrophone />
          Interview
        </Link>

        <Link
          to="/search"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaSearch />
          Search
        </Link>

        <Link
          to="/revision"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaBook />
          Revision
        </Link>

        <Link
          to="/practice-sheet"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaPen />
          Practice Sheet
        </Link>

        <Link
          to="/important-topics"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaStar />
          Important Topics
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E9D66B] transition"
        >
          <FaUser />
          Profile
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;