import { useEffect, useState } from "react";
import { getActiveBlogs } from "@/supabase/services/blogs.service";
const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const data = await getActiveBlogs();
    setBlogs(data);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
