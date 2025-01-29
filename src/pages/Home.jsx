import { useEffect, useState } from "react";
import { getActiveBlogs } from "@/supabase/services/blogs.service";
import SearchBox from "@/components/Home/SearchBox";
import BlogsWrapper from "@/components/Blogs/BlogsWrapper";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getActiveBlogs();
    setBlogs(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <SearchBox />
      <BlogsWrapper loading={loading} blogs={blogs} skeletons={16} />
    </div>
  );
};

export default Home;
