import { useEffect, useState } from "react";
import { getUser } from "@/supabase/services/auth.service";
import { getAuthorBlogs } from "@/supabase/services/blogs.service";
import BlogsWrapper from "@/components/Blogs/BlogsWrapper";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [archivedBlogs, setArchivedBlogs] = useState([]);
  const [draftBlogs, setDraftBlogs] = useState([]);

  const fetchBlogs = async () => {
    const user = await getUser();
    setLoading(true);
    const data = await getAuthorBlogs(user?.email);
    console.log(data);
    setPublishedBlogs(data.published);
    setArchivedBlogs(data.archived);
    setDraftBlogs(data.draft);
    setLoading(false);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div>
      <div className="">
        <BlogsWrapper loading={loading} blogs={publishedBlogs} skeletons={8} />
      </div>
      {/* Accordian */}
      <div className="join join-vertical w-full bg-base-200">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Saved as draft :
          </div>
          <div className="collapse-content">
            <BlogsWrapper loading={loading} blogs={draftBlogs} skeletons={4} />
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">Archives</div>
          <div className="collapse-content">
            <BlogsWrapper
              loading={loading}
              blogs={archivedBlogs}
              skeletons={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
