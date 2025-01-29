import { useEffect, useState } from "react";
import { getActiveBlogs } from "@/supabase/services/blogs.service";
import BlogCard from "@/components/Blogs/BlogCard";
import SearchBox from "@/components/Home/SearchBox";
import BlogCardSkeleton from "@/components/Blogs/BlogCardSkeleton";
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
      <div className="my-2 grid grid-cols-main gap-4">
        {!loading && blogs.map((blog) => <BlogCard key={blog.id} {...blog} />)}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <BlogCardSkeleton key={i} />)}
      </div>
    </div>
  );
};

export default Home;
