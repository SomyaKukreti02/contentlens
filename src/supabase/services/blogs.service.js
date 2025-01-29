import supabase from "@/supabase/client";
import { getSession } from "@/supabase/services/auth.service";

// Get author details
const getAuthor = async () => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("You need to be signed in to get author details");
    }
    const author = {
      author: session.user.user_metadata.full_name,
      author_id: session.user.id,
      author_email: session.user.email,
      author_avatar_url: session.user.user_metadata.avatar_url,
    };
    return author;
  } catch (error) {
    console.error("Error getting author details:", error.message);
  }
};

// Create a new blog
const createBlog = async ({ title, slug, description, banner_url, status }) => {
  try {
    const { author, author_avatar_url, author_id, author_email } =
      await getAuthor();
    const { data, error } = await supabase
      .from("blogs")
      .insert({
        title,
        slug,
        description,
        banner_url,
        status,
        author,
        author_avatar_url,
        author_id,
        author_email,
      })
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error creating blog:", error.message);
  }
};

// Update a blog
const updateBlog = async (
  id,
  { title, slug, description, banner_url, status }
) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        description,
        banner_url,
        status,
      })
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating blog:", error.message);
  }
};

// Delete a blog
const deleteBlog = async (id) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error updating blog:", error.message);
  }
};

// Read  blogs
const getPublishedBlogs = async () => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select()
      .eq("status", "published")
      .order("updated_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error getting published blogs:", error.message);
  }
};

// Read User's blogs
const getAuthorBlogs = async (email) => {
  try {
    const { data: published } = await supabase
      .from("blogs")
      .select()
      .eq("author_email", email)
      .eq("status", "published")
      .order("updated_at", { ascending: false });

    const { data: archived } = await supabase
      .from("blogs")
      .select()
      .eq("author_email", email)
      .eq("status", "archived")
      .order("updated_at", { ascending: false });

    const { data: draft } = await supabase
      .from("blogs")
      .select()
      .eq("author_email", email)
      .eq("status", "draft")
      .order("updated_at", { ascending: false });

    const blogs = {
      published,
      archived,
      draft,
    };
    return blogs;
  } catch (error) {
    console.error("Error getting user blogs:", error.message);
  }
};

// Read a single blog
const getBlog = async (id) => {
  try {
    const { data, error } = await supabase.from("blogs").select().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error("Error getting user blogs:", error.message);
  }
};

// check if slug is unique
const isSlugUnique = async (slug) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select()
      .eq("slug", slug);
    if (error) {
      throw new Error(error.message);
    }
    return data.length === 0;
  } catch (error) {
    console.error("Error getting user blogs:", error.message);
  }
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  getAuthorBlogs,
  getBlog,
  isSlugUnique,
  getAuthor,
};
