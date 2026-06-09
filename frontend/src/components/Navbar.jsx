import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between">
      <h2 className="font-bold">
        AI Learning Assistant
      </h2>

      <div className="flex gap-4 items-center">
        <p>{user?.name}</p>

        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;