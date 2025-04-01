import { useParams } from "react-router"; // Import from React Router
import { useEffect, useState } from "react";
import BlogForm from "@/components/Blogs/EditBlogForm";
import { getBlogBySlug } from "@/supabase/services/blogs.service";
import Loading from "./Loading";
import { useNavigate } from "react-router";
import { checkAuthorisation } from "@/components/Blogs/utils";

const EditBlog = () => {
  const { slug } = useParams(); // Get the blog slug from the URL
  const [initialData, setInitialData] = useState(null);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setInitialData(data[0]);
        const author_email = data[0].author_email;
        const authorised = await checkAuthorisation(author_email);
        if (!authorised) {
          navigate("/");
        }
        setIsAuthorised(true);
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
