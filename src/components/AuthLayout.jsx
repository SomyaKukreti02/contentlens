import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import Loading from "@/pages/Loading";
import { getSession } from "@/supabase/services/auth.service";

const Protected = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        navigate("/", { replace: true });
      }
    });
    setLoader(false);
  }, []);
  return loader ? <Loading /> : <Outlet />;
};

export default Protected;
