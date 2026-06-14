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

      <div className="bg-[#FFFDF5] border border-[#ECE8D5] rounded-3xl shadow-sm px-8 py-5 flex items-center justify-between">

        

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back 👋
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Continue learning with Archivio
          </p>
        </div>

        

        <div className="hidden lg:flex items-center gap-3 bg-[#F8F6EC] px-4 py-3 rounded-2xl border border-[#ECE8D5] w-[340px]">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search documents..."
            className="bg-transparent outline-none w-full text-sm"
          />

        </div>

        

        <div className="flex items-center gap-3">

         

          <button className="w-11 h-11 rounded-2xl bg-[#F8F6EC] border border-[#ECE8D5] flex items-center justify-center hover:bg-[#EFE9D0] transition-all">

            <FaBell className="text-gray-700" />

          </button>

          

          <div className="flex items-center gap-3 bg-[#F8F6EC] border border-[#ECE8D5] px-4 py-2 rounded-2xl">

            <FaUserCircle
              size={32}
              className="text-gray-700"
            />

            <div>
              <p className="font-semibold text-gray-900">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                Student
              </p>
            </div>

          </div>

          

          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-2xl bg-[#F8F6EC] border border-[#ECE8D5] text-gray-700 font-medium hover:bg-[#EFE9D0] transition-all"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;
