import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuthStore } from "../store/authStore";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      console.log("========== GOOGLE LOGIN ==========");

      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");

      console.log("STEP 1: Token =", token);

      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        console.log("STEP 2: Calling /auth/me...");

        const res = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("STEP 3: /auth/me success");
        console.log(res.data);

        setAuth(res.data, token);

        console.log("STEP 4: setAuth completed");

        navigate("/dashboard");

        console.log("STEP 5: navigate called");

      } catch (error) {
        console.error("GOOGLE LOGIN ERROR");
        console.error(error);
        console.error(error.response?.data);

        navigate("/", { replace: true });
      }
    };

    handleGoogleLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
};

export default OAuthSuccess;