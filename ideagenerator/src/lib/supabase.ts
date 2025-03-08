import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ytrfoaxwcgonoizrehzd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cmZvYXh3Y2dvbm9penJlaHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTE2NTYsImV4cCI6MjA1MzU2NzY1Nn0.hLyzx_FZ-2cCsp2RPlR2bFYv3kO6LR3TC6y6PJUmu7c';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables not found. Using development fallbacks.');
}

// Create a singleton Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for the Supabase data
export type HackathonIdea = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tech_stack: string[];
  resources?: string[];
  upvotes: number;
  created_at: string;
  
  // Adding missing properties to match what's used in Browse.tsx
  category?: string;
  project_type?: string;
  required_skills?: string[];
};

export type SavedIdea = {
  id: string;
  user_id: string;
  idea_id: string;
  created_at: string;
};

export type Profile = {
  id: string;
  user_id: string;
  username: string;
  bio?: string;
  avatar_url?: string;
  skills: string[];
  interests: string[];
  experience_level: 'Beginner' | 'Intermediate' | 'Advanced';
  created_at: string;
  updated_at: string;
};
