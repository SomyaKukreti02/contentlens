import { useEffect, useState } from "react";
import { getActiveBlogs } from "@/supabase/services/blogs.service";
import BlogCard from "@/components/BlogCard";
import SearchBox from "@/components/Home/SearchBox";
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
      <SearchBox />
      <ul className="my-2 grid grid-cols-main gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
