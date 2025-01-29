import { useEffect, useState } from "react";
import { getUser } from "@/supabase/services/auth.service";
import { getAuthorBlogs } from "@/supabase/services/blogs.service";
import BlogCard from "@/components/Blogs/BlogCard";
import BlogCardSkeleton from "@/components/Blogs/BlogCardSkeleton";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const user = await getUser();
    setLoading(true);
    const data = await getAuthorBlogs(user?.email);
    setBlogs(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <div className="my-2 grid grid-cols-main gap-4">
        {!loading && blogs.map((blog) => <BlogCard key={blog.id} {...blog} />)}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <BlogCardSkeleton key={i} />)}
      </div>
    </div>
  );
};

export default Profile;
