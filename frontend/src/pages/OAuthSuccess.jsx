import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuthStore } from "../store/authStore";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const res = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuth(res.data, token);

        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
        navigate("/", { replace: true });
      }
    };

    handleGoogleLogin();
  }, [navigate, setAuth]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7ED] px-4 text-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-orange-200 border-t-[#C2410C] rounded-full animate-spin mb-4" />

      <p className="text-base sm:text-lg font-semibold text-[#9A3412]">
        Signing you in...
      </p>

      <p className="text-xs sm:text-sm text-gray-500 mt-1">
        Please wait a moment.
      </p>
    </div>
  );
};

export default OAuthSuccess;