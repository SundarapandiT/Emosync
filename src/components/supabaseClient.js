import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yashchlkrfvlmmlwjanc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhc2hjaGxrcmZ2bG1tbHdqYW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MTMzMzEsImV4cCI6MjA1NzE4OTMzMX0.AWWdKR4FDSP996iZywV4OCDdhSE2cgPgPfUKItETo0k"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
