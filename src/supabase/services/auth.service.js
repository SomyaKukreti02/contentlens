import conf from "@/config/supabase.config";
import supabase from "@/supabase/client";
//get session is used to return data of the user which is currently logged in
const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data?.session;
  } catch (error) {
    console.error("Error getting session:", error.message);
  }
};
const getUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error getting user:", error.message);
  }
};
const signInWithOAuth = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: conf.HOST_URL,
      },
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error signing in with OAuth:", error.message);
  }
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

export { signInWithOAuth, signOut, getSession, getUser };
