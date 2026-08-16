import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Resolve environment variables with flexible naming (supports Vite, standard Vercel integration, Next prefixes)
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  '';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_KEY || 
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info('[EasternRun] Supabase keys not detected in client environment. Falling back to local storage.');
}
