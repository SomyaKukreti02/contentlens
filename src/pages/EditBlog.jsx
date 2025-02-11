import { useParams } from "react-router"; // Import from React Router
import { useEffect, useState } from "react";
import BlogForm from "@/components/Blogs/EditBlogForm";
import { getBlogBySlug } from "@/supabase/services/blogs.service";
import Loading from "./Loading";

const EditBlog = () => {
  const { slug } = useParams(); // Get the blog slug from the URL
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // Fetch the blog data by slug
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(slug); // Replace with your API call
        setInitialData(data[0]);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  return (
    <div>
      {initialData ? <BlogForm initialData={initialData} /> : <Loading />}
    </div>
  );
};

export default EditBlog;
