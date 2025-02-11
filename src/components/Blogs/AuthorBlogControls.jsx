import { useRouter } from "next/router";
import PropTypes from "prop-types";

const AuthorBlogControls = ({ blogId }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${blogId}`); // Navigate to the edit page with the blog ID
  };

  const handleDelete = () => {
    // Logic for deleting the blog (e.g., API call)
    console.log(`Deleting blog with ID: ${blogId}`);
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
