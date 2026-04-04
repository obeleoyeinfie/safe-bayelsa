import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection
export const testConnection = async () => {
  const { data, error } = await supabase.from('services').select('count');
  if (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
  console.log('✅ Supabase connected');
  return true;
};