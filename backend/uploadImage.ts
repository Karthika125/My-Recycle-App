import { supabase } from "./supabase";

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from("images") // Make sure "images" is your storage bucket name
      .upload(filePath, file);

    if (error) {
      console.error("Upload Error:", error.message);
      return null;
    }

    console.log("Uploaded image data:", data);

    // Generate Public URL for uploaded file
    const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Unexpected Upload Error:", error);
    return null;
  }
};
