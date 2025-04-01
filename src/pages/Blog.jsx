import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { checkAuthorisation } from "@/components/Blogs/utils";
import { getBlogBySlug } from "@/supabase/services/blogs.service";
import { getPublicUrl } from "@/supabase/services/storage.service";
import Loading from "./Loading";

const BlogDetails = () => {
  const { slug } = useParams();
  const [bannerUrl, setBannerUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");
  const [initials, setInitials] = useState("");

  const fetchBlog = async (slug) => {
    try {
      const data = await getBlogBySlug(slug);
      setBlog(data[0]);
      setPublishedAt(new Date(data[0].updated_at).toDateString());
      setInitials(
        data[0].author
          .split(" ")
          .map((n) => n[0])
          .join("")
      );
    } catch (error) {
      console.log("Error fetching blog: ", error.message);
    }
  };

  const getBannerUrl = async () => {
    try {
      if (!blog.banner_url) return;
      const { publicUrl } = await getPublicUrl(blog.banner_url);
      setBannerUrl(publicUrl);
    } catch (error) {
      console.log("Error getting banner url: ", error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBlog(slug);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    const showControlsHandler = async () => {
      const authorisation = await checkAuthorisation(blog.author_email);
      if (authorisation) {
        setShowControls(true);
      }
    };
    if (blog) {
      getBannerUrl();
      showControlsHandler();
    }
  }, [blog]);

  return (
    <>
      {loading && <Loading />}
      {!loading && blog && (
        <div className="my-4 relative">
          {bannerUrl?.trim() && (
            <figure className="flex items-center justify-center h-64">
              <img
                src={bannerUrl}
                alt="banner"
                className="object-cover h-full w-full"
              />
            </figure>
          )}
          <div className="flex flex-col gap-4 p-4">
            <h1 className="">{blog?.title}</h1>
            <div className="flex gap-4">
              <div>
                {blog?.author_avatar_url && (
                  <img
                    className="rounded-full w-16"
                    alt={initials}
                    src={blog?.author_avatar_url}
                  />
                )}
                {!blog.author_avatar_url && (
                  <i className="bx bx-user text-3xl" />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold">{blog?.author}</span>
                <span className="text-sm opacity-50">{publishedAt}</span>
              </div>
            </div>
            <span className="divider"></span>
            <article
              className="prose prose-lg"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            ></article>
          </div>
          {/* <span className="divider"></span> */}
          {showControls && (
            <Link to={`/blogs/${blog.slug}/edit`}>
              <button className="btn btn-secondary rounded-full absolute right-4 top-4 z-10 ">
                Edit
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default BlogDetails;
