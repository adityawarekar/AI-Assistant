import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const params = new URLSearchParams(
        window.location.search
      );

      const token = params.get("token");

      if (!token) return;

      localStorage.setItem(
        "token",
        token
      );

      try {

        const res = await API.get(
          "/auth/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

        navigate("/dashboard");

      } catch (error) {

        console.log(error);

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