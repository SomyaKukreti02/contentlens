import "@/index.css";
import "boxicons/css/boxicons.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App.jsx";
import AuthLayout from "@/components/AuthLayout.jsx";
import Home from "@/pages/Home.jsx";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/NotFound.jsx";
import CreateBlog from "@/pages/CreateBlog";
import Blog from "@/pages/Blog";
import EditBlog from "./pages/EditBlog";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* public pages */}
          <Route index path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<Blog />} />

          <Route element={<AuthLayout />}>
            {/* private pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/blog/:slug/edit" element={<EditBlog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
