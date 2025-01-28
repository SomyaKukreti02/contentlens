import { useState, useEffect } from "react";
import supabase from "@/supabase/client";
const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  async function getBlogs() {
    const { data } = await supabase.from("blogs").select();
    setBlogs(data);
  }
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
