import "@/App.css";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/pages/Loading";
import { Outlet } from "react-router";
import useUserStore from "@/store/userStore";
import { getSession } from "@/supabase/auth";

const App = () => {
  const { login } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSession().then((session) => {
      if (session) {
        login(session?.user?.user_metadata);
      }
    });
    setLoading(false);
  }, []);
  return (
    <div className="container mx-auto px-2 relative">
      <Header />
      <main className="min-h-screen">{loading ? <Loading /> : <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default App;
