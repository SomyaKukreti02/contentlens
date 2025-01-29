import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import PropTypes from "prop-types";

const BlogsWrapper = ({ loading = true, blogs = [], skeletons = 8 }) => {
  return (
    <>
      <div className="grid grid-cols-main gap-4 my-4">
        {!loading &&
          blogs.map((blog) => <BlogCard key={blog.slug} {...blog} />)}
        {loading &&
          Array.from({ length: skeletons }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
      </div>
      {!loading && !blogs.length && (
        <div className="flex flex-col items-center justify-center py-10">
          <i className="bx bx-ghost text-6xl" />
          <p className="text-gray-500 mt-2 text-lg">No Data Available</p>
        </div>
      )}
    </>
  );
};
BlogsWrapper.propTypes = {
  loading: PropTypes.bool,
  blogs: PropTypes.arrayOf(PropTypes.object),
  skeletons: PropTypes.number,
};
export default BlogsWrapper;
