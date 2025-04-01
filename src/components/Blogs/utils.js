import { isSlugUnique } from "@/supabase/services/blogs.service";
import { getUser } from "@/supabase/services/auth.service";
const makeUrlFriendly = (input) => {
  let slug = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_~.%]/g, "")
    .replace(/--+/g, "-");

  if (!isSlugUnique(slug)) {
    slug += `-${Math.floor(Math.random() * 1000)}`;
  }
  return slug;
};

const checkAuthorisation = async (author_email) => {
  try {
    const user = await getUser();
    if (!user) return false;

    return user.email === author_email;
  } catch (error) {
    console.error("Error checking author: ", error.message);
  }
};

export { makeUrlFriendly, checkAuthorisation };
