import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or Key. Check your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  console.log("Fetching published products...");
  try {
    const { data, error } = await supabase
      .from('ss_products')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
    } else {
      console.log("Fetched Data Count:", data ? data.length : 0);
      if (data && data.length > 0) {
        console.log("First item:", data[0].title, "-", data[0].status);
      }
    }
  } catch (err) {
    console.error("Exception thrown:", err);
  }
}

testFetch();
