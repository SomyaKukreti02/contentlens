import { useParams } from "react-router"; // Import from React Router
import { useEffect, useState } from "react";
import BlogForm from "@/components/Blogs/EditBlogForm";
import { getUser } from "@/supabase/services/auth.service";
import { getBlogBySlug } from "@/supabase/services/blogs.service";
import Loading from "./Loading";
import { useNavigate } from "react-router";

const EditBlog = () => {
  const { slug } = useParams(); // Get the blog slug from the URL
  const [initialData, setInitialData] = useState(null);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the blog data by slug
    const checkAuthorisation = async (author_email) => {
      try {
        const user = await getUser();
        if (author_email !== user.email) {
          navigate("/");
        }
        setIsAuthorised(true);
      } catch (error) {
        console.error("Error checking author:", error.message);
      }
    };
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setInitialData(data[0]);
        await checkAuthorisation(data[0].author_email);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  return (
    <div>
      {isAuthorised && initialData ? (
        <BlogForm initialData={initialData} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EditBlog;
