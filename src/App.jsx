import "@/App.css";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/pages/Loading";

import { Outlet } from "react-router";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="container mx-auto px-2 relative">
      <Header />
      <main className="min-h-screen">{loading ? <Loading /> : <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default App;
