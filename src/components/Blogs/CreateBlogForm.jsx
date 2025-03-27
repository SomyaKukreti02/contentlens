import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { uploadFile } from "@/supabase/services/storage.service";
import { createBlog } from "@/supabase/services/blogs.service";
import { v4 as uuid } from "uuid";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { CATEGORIES } from "@/constants";

const BlogForm = ({ initialData = {} }) => {
  const [submitting, setSubmitting] = useState(false);
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
      setValue("description", editor.getHTML()); // Update form value with editor content
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
    let banner_url = null;

    // Upload banner image if provided
    if (banner.length > 0) {
      const file = banner[0];
      const folderName = "banners";
      const fileName = uuid();
      const { path } = await uploadFile(file, {
        folderName,
        fileName,
      });
      banner_url = path;
    }

    // Create the blog post
    await createBlog({
      title,
      slug: makeUrlFriendly(slug),
      banner_url,
      description,
      status,
      category,
    });
    setSubmitting(false);
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

      {/* CATEGORY */}
      <label className="label">
        <span className="label-text">Category</span>
      </label>
      <select
        className="select select-bordered max-w-lg"
        {...register("category", { required: "Category is required" })}
      >
        <option value="">Select a category</option>
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
          type="button"
          className="btn btn-circle btn-outline btn-secondary"
          disabled={submitting}
        >
          <i className="bx bx-show text-2xl"></i>
        </button>
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

BlogForm.propTypes = {
  initialData: PropTypes.object,
};

const makeUrlFriendly = (input) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_~.%]/g, "")
    .replace(/--+/g, "-");
};

export default BlogForm;
