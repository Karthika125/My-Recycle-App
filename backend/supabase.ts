import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://uygzkrcewddpjvnjkghf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5Z3prcmNld2RkcGp2bmprZ2hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDM4ODYsImV4cCI6MjA1NTk3OTg4Nn0.wHBsIk2aHp7jLYCjO55oOx5TA5hff2qMHfN6-QEuF0I"; // Get from Supabase dashboard

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
