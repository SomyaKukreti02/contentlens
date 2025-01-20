import "@/App.css";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/pages/Loading";
import { Outlet } from "react-router";
import useUserStore from "@/store/userStore";
import { getSession } from "@/supabase/auth";

const App = () => {
  const { user, login } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (user) {
      // console.log("User", user);
      setLoading(false);
      return;
    }
    getSession().then((data) => {
      if (data) {
        login(data?.session?.user?.user_metadata);
      }
    });
    setLoading(false);
  }, []);
  return (
    <div className="container mx-auto px-2">
      <Header />
      <main className="min-h-screen">{loading ? <Loading /> : <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default App;
