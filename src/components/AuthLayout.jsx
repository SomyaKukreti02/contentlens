import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router";
import Loading from "../pages/Loading";

export default function Protected({ authentication = false }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication == false) {
      navigate("/welcome");
    }
    setLoader(false);
  }, [navigate, authentication]);

  return loader ? <Loading /> : <Outlet />;
}
