import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Clean up any trailing path to ensure the base URL is correct
supabaseUrl = supabaseUrl.trim();
if (supabaseUrl.includes('/rest/v1')) {
  supabaseUrl = supabaseUrl.split('/rest/v1')[0];
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
