import conf from "@/conf/conf";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  conf.SUPABASE_PROJECT_URL,
  conf.SUPABASE_ANON_KEY
);

export default supabase;
