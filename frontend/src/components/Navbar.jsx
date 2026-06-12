import { useAuthStore } from "../store/authStore";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="bg-[#F5F3E7] px-8 py-5">
      <div className="bg-[#FFFDF5] rounded-3xl shadow-sm px-6 py-4 flex items-center justify-between">

        
        <div>
          <h1 className="text-2xl font-bold text-black">
            Welcome back 👋
          </h1>

          <p className="text-gray-500">
            Continue learning with Archivio
          </p>
        </div>

        
        <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl w-[350px]">
          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        
        <div className="flex items-center gap-4">

          <button className="bg-[#E9D66B] p-3 rounded-xl">
            <FaBell />
          </button>

          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl">
            <FaUserCircle
              size={28}
              className="text-gray-700"
            />

            <div>
              <p className="font-semibold text-black">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                Student
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;