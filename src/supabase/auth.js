import supabase from "@/supabase/client";

const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting session:", error.message);
  }
};

const signInWithOAuth = async (provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
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

export { signInWithOAuth, signOut, getSession};
