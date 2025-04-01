import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { uploadFile } from "@/supabase/services/storage.service";
import { updateBlog } from "@/supabase/services/blogs.service";
import { makeUrlFriendly } from "@/components/Blogs/utils";
import { v4 as uuid } from "uuid";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { CATEGORIES } from "@/constants";

const EditBlogForm = ({ initialData }) => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: initialData });

  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData.description || "<p>Start typing here...</p>",
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
    },
  });

  // Set initial form values if `initialData` is provided
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData]);

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitting(true);
    const { title, slug, banner, description, status, category } = data;
    let banner_url = initialData.banner_url || null;

    // Upload new banner image if provided
    if (banner.length > 0) {
      const file = banner[0];
      const folderName = "banners";
      const fileName = uuid();
      const { path } = await uploadFile(file, { folderName, fileName });
      banner_url = path;
    }

    // Update the blog post
    const formattedSlug = makeUrlFriendly(slug);
    await updateBlog(initialData.id, {
      title,
      slug: formattedSlug,
      banner_url,
      description,
      status,
      category,
    });
    setSubmitting(false);
    if (status === "published") {
      navigate(`/blogs/${formattedSlug}`);
    }
    if (status === "draft") {
      navigate("/profile#draft");
    }
  };

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
      {/* TITLE */}
      <label className="label">
        <span className="label-text">Title</span>
      </label>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered max-w-lg"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && (
        <span className="text-error">{errors.title.message}</span>
      )}

      {/* SLUG */}
      <label className="label">
        <span className="label-text">Slug</span>
      </label>
      <input
        type="text"
        placeholder="Slug"
        className="input input-bordered max-w-lg"
        {...register("slug", { required: "Slug is required" })}
      />
      {errors.slug && <span className="text-error">{errors.slug.message}</span>}

      {/* CATEGORY INPUT */}
      <label className="label">
        <span className="label-text">Category</span>
      </label>
      <select
        className="select select-bordered max-w-lg"
        {...register("category", { required: "Category is required" })}
        defaultValue={initialData.category || ""}
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && (
        <span className="text-error">{errors.category.message}</span>
      )}

      {/* BANNER INPUT */}
      <label className="label">
        <span className="label-text">Pick a banner image</span>
      </label>
      <div>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered file-input-sm w-full max-w-xs"
          {...register("banner", {
            validate: (value) =>
              value.length === 0 ||
              value[0].type.startsWith("image/") ||
              "Only image files are allowed",
          })}
        />
      </div>

      {/* CONTENT */}
      <label className="label">
        <span className="label-text">Content</span>
      </label>
      <div className="border rounded-md p-2 max-w-5xl min-h-64 bg-base-100 flex flex-col gap-4">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {errors.description && (
        <span className="text-error">{errors.description.message}</span>
      )}

      <div className="flex justify-end mt-4 max-w-5xl gap-4">
        <button
          type="submit"
          className="btn btn-outline btn-secondary"
          onClick={() => setValue("status", "draft")}
          disabled={submitting}
        >
          Save as draft
        </button>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={() => setValue("status", "published")}
          disabled={submitting}
        >
          Publish
        </button>
      </div>
    </form>
  );
};

EditBlogForm.propTypes = {
  initialData: PropTypes.object,
};

export default EditBlogForm;
