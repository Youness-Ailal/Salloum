import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ymxfmbzqbwvydpsfpjam.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteGZtYnpxYnd2eWRwc2ZwamFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNTI5OTAsImV4cCI6MjAxODgyODk5MH0.ZtrDUi9a-piD9rbxrUDo65GUvDb1BoBcBECX6QskKnM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
