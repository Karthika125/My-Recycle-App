import { supabase } from "./supabase"; // Import the Supabase client

export const uploadImage = async (file) => {
  const filePath = `uploads/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("images") // Bucket name
    .upload(filePath, file);

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  return data.path; // Return the uploaded file path
};
