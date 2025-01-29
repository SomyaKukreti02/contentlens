import no_image from "@/assets/no_image.svg";
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
  return (
    <div className="card bg-base-100 shadow-xl">
      {banner_url && (
        <figure className="h-32 overflow-hidden">
          <img
            src={banner_url || no_image}
            alt="Shoes"
            className="object-cover h-full w-full"
          />
        </figure>
      )}
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
          <div className="avatar w-10 h-10">
            <img
              className="rounded-full"
              alt={initials || "JD"}
              src={
                author_avatar_url ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
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
