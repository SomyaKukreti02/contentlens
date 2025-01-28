const getUrl = () => {
  console.log(import.meta.env.MODE);
  if (import.meta.env.MODE === "development") {
    return import.meta.env.VITE_SUPABASE_URL;
  }
  return import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
};
const conf = {
  HOST_URL: String(getUrl()),
  SUPABASE_PROJECT_URL: String(import.meta.env.VITE_SUPABASE_PROJECT_URL),
  SUPABASE_ANON_KEY: String(import.meta.env.VITE_SUPABASE_ANON_KEY),
};
export default conf;
