import supabase from "@/supabase/client";
import { v4 as uuid } from "uuid";

const uploadFile = async (
  file,
  { folderName = "public", fileName = uuid() }
) => {
  try {
    const { data, error } = await supabase.storage
      .from("blogs")
      .upload(`${folderName}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Error uploading file: ", error.message);
  }
};

const getPublicUrl = async (path) => {
  try {
    const { data } = supabase.storage.from("blogs").getPublicUrl(path);
    return data;
  } catch (error) {
    console.log("Error getting public url: ", error.message);
  }
};

export { uploadFile, getPublicUrl };
