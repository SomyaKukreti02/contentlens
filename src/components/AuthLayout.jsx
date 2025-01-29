import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { getSession } from "@/supabase/services/auth.service";
import LoginModal from "./LoginModal";

const Protected = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = async () => {
    const session = await getSession();
    if (!session) {
      const loginModal = document.getElementById("login_modal");
      loginModal.showModal();
      loginModal.addEventListener("close", () => {
        navigate(location.state?.from || "/");
      });
    } else {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [authenticated]);

  return !authenticated ? <LoginModal /> : <Outlet />;
};

export default Protected;
