import PropTypes from "prop-types";

const BlogCard = ({
  title = "",
  description = "",
  slug = "",
  banner_url = "",
  author = "",
  author_avatar_url = "",
  updated_at = "",
  tags = [],
}) => {
  const publishedAt = new Date(updated_at).toDateString();
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("");
  console.log(title, banner_url);
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-32 flex items-center justify-center">
        {banner_url?.trim() ? (
          <img
            src={banner_url}
            alt="banner"
            className="object-cover h-full w-full"
          />
        ) : (
          <svg
            className="w-20 h-20 text-gray-400"
            fill="currentColor"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Z"></path>
            <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"></path>
          </svg>
        )}
      </figure>

      <div className="card-body">
        <p className="overflow-hidden text-ellipsis max-h-14 text-lg font-bold">
          {title}
        </p>
        <p className="truncate">{description}</p>
        {tags.length != 0 && (
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Fashion</div>
            <div className="badge badge-outline">Products</div>
          </div>
        )}
        <div className="card-actions">
          <div className="avatar w-10 h-10 rounded-full">
            {author_avatar_url && (
              <img
                className="rounded-full"
                alt={initials}
                src={author_avatar_url}
              />
            )}
            {!author_avatar_url && <i className="bx bx-user text-3xl" />}
          </div>
          <div>
            <p className="text-sm font-bold">{author}</p>
            <p className="text-sm opacity-50">{publishedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  banner_url: PropTypes.string,
  author: PropTypes.string,
  author_avatar_url: PropTypes.string,
  updated_at: PropTypes.string,
  tags: PropTypes.array,
};

export default BlogCard;
