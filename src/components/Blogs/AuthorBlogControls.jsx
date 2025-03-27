import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { deleteBlogById } from "@/supabase/services/blogs.service"; // Import the delete service
import toast from "react-hot-toast";

const AuthorBlogControls = ({ blogId }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${blogId}`); // Navigate to the edit page with the blog ID
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlogById(blogId); // Call the delete service
        toast.success("Blog deleted successfully");
        router.push("/"); // Navigate to the home page after deletion
      } catch (error) {
        toast.error("Error deleting blog");
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleEdit} className="btn btn-sm btn-circle btn-ghost">
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="btn btn-sm btn-circle btn-ghost"
      >
        Delete
      </button>
    </div>
  );
};

AuthorBlogControls.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default AuthorBlogControls;
