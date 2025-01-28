import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import useUserStore from "@/store/userStore";
import Loading from "@/pages/Loading";
import { getSession } from "@/supabase/auth";

export default function Protected() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { user, login } = useUserStore();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        navigate("/", { replace: true });
      }
      if (!user) {
        login(session?.user?.user_metadata);
      }
    });
    setLoader(false);
  }, []);
  return loader ? <Loading /> : <Outlet />;
}
