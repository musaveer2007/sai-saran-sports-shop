import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Inserting...");
  try {
    const payload = { title: "Test", price: 10, category: "Football", thumbnail_url: "" };
    const { data, error } = await supabase.from('ss_products').insert([payload]).select();
    console.log("Result:", data);
    console.log("Error:", error);
  } catch (e) {
    console.log("Exception:", e);
  }
}
test();
