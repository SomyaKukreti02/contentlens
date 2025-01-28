import { supabase } from "@/supabase/client";
import { getSession } from "@/supabase/services/auth.service";

// Get author details
const getAuthor = async () => {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("You need to be signed in to get author details");
    }
    const author = {
      id: session.user.id,
      aud: session.user.aud,
      role: session.user.role,
      email: session.user.email,
      full_name: session.user.user_metadata.full_name,
      avatar_url: session.user.user_metadata.avatar_url,
    };
    return author;
  } catch (error) {
    console.error("Error getting author details:", error.message);
  }
};

// Create a new blog
const createBlog = async ({ title, slug, description, banner_url, status }) => {
  try {
  } catch (error) {}
};

// Update a blog
const updateBlog = async ({}) => {
  try {
  } catch (error) {}
};

// Delete a blog
const deleteBlog = async (slug) => {
  try {
  } catch (error) {}
};

// Read all blogs
const getBlogs = async () => {
  try {
  } catch (error) {}
};

// Read a single blog
const getBlogBySlug = async (slug) => {
  try {
  } catch (error) {}
};

// check if slug is unique
const isSlugUnique = async (slug) => {
  try {
  } catch (error) {}
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlogBySlug,
  isSlugUnique,
  getAuthor,
};
