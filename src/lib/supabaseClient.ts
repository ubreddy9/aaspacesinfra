import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://dxhjarqkneyftegktqde.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4aGphcnFrbmV5ZnRlZ2t0cWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMDU3NzQsImV4cCI6MjEwNDY4MTc3NH0.a9HquizZXT99oURwcUM1AUPr8Q7Ph9aKpfZM3Bxy27U';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  { auth: { persistSession: false } }
);

export const STORAGE_BUCKET = 'project-images';
