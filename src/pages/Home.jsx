import { useEffect, useState } from "react";
import { getPublishedBlogs } from "@/supabase/services/blogs.service";
import SearchBox from "@/components/Home/SearchBox";
import BlogsWrapper from "@/components/Blogs/BlogsWrapper";
import CategoryList from "@/components/CategoryList";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch published blogs
  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getPublishedBlogs();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBox />

      {/* Header with Category Dropdown on Right */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-xl font-bold">Featured Blogs</h1>
        <CategoryList onSelectCategory={setSelectedCategory} />
      </div>

      {/* Layout: Category Section (Left) + Featured Blogs (Right) */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Category List (Left Sidebar) */}

        {/* Featured Blogs (Main Content) */}
        <div className="flex-1">
          <BlogsWrapper
            loading={loading}
            blogs={filteredBlogs}
            skeletons={16}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
