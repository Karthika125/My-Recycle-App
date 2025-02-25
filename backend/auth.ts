import { supabase } from "./supabase";

// ✅ Signup Function
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    return null;
  }

  return data.user; // ✅ Extracting `user` correctly
};

// ✅ Login Function
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return null;
  }

  return data.user; // ✅ Extracting `user` correctly
};

// ✅ Logout Function
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
  }
};
