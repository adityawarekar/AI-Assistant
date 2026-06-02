import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between">
      <h2 className="font-bold">
        AI Learning Assistant
      </h2>

      <p>{user?.name}</p>
    </div>
  );
};

export default Navbar;