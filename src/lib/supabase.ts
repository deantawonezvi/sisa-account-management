import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://huoohkvewuchhoxtefmu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1b29oa3Zld3VjaGhveHRlZm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQzODIyNTksImV4cCI6MTk3OTk1ODI1OX0.7sZOBMP-I8NOqEc05zMbKqC-YFnA5uCfmHDzb0sZMvU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);