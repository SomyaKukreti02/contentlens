import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import useUserStore from "@/store/userStore";
import Loading from "@/pages/Loading";

export default function Protected() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { user, authenticated } = useUserStore();
  useEffect(() => {
    // console.log("user", user, authenticated);
    if (!user && !authenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [user, authenticated]);
  return loader ? <Loading /> : <Outlet />;
}
