import { supabase, HackathonIdea, SavedIdea, Profile } from './supabase';

// Idea generation API
export const generateIdea = async (
  skills: string,
  interest: string,
  complexity: number,
  innovationFocus: boolean
): Promise<HackathonIdea | null> => {
  try {
    // This would ideally call an AI-powered endpoint, for now we're using a Supabase function
    const { data, error } = await supabase.functions.invoke('generate-idea', {
      body: { skills, interest, complexity, innovationFocus },
    });

    if (error) throw error;
    return data as HackathonIdea;
  } catch (error) {
    console.error('Error generating idea:', error);
    return null;
  }
};

// Get ideas
export const getIdeas = async (
  category?: string,
  difficulty?: string,
  projectType?: string,
  limit = 10
): Promise<HackathonIdea[]> => {
  try {
    // If we can't connect to Supabase, return mock data for development
    let query = supabase.from('ideas').select('*');

    if (category) query = query.eq('category', category);
    if (difficulty) query = query.eq('difficulty', difficulty);
    if (projectType) query = query.eq('project_type', projectType);

    const { data, error } = await query.limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      // Return mock data if we can't connect to Supabase
      return getMockIdeas();
    }
    
    return data as HackathonIdea[] || [];
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return getMockIdeas();
  }
};

// Mock data for development when Supabase is not accessible
function getMockIdeas(): HackathonIdea[] {
  return [
    {
      id: "1",
      title: "AI-Powered Meal Planner",
      description: "Create a meal planning app that uses AI to suggest recipes based on user preferences, dietary restrictions, and available ingredients.",
      categories: ["AI/ML", "Web"],
      difficulty: "Intermediate",
      tech_stack: ["React", "Python", "TensorFlow", "Node.js"],
      upvotes: 45,
      created_at: new Date().toISOString(),
      category: "AI/ML",
      required_skills: ["React", "Machine Learning", "API Development"]
    },
    {
      id: "2",
      title: "Blockchain Voting System",
      description: "Build a secure voting system using blockchain technology to ensure transparency and security in elections.",
      categories: ["Blockchain", "Web"],
      difficulty: "Advanced",
      tech_stack: ["Solidity", "Ethereum", "React", "Web3.js"],
      upvotes: 32,
      created_at: new Date().toISOString(),
      category: "Blockchain",
      required_skills: ["Solidity", "React", "Ethereum"]
    },
    {
      id: "3",
      title: "AR Navigation for Indoor Spaces",
      description: "Develop an augmented reality app that helps users navigate complex indoor spaces like malls, airports, or universities.",
      categories: ["Mobile", "AR/VR"],
      difficulty: "Advanced",
      tech_stack: ["Unity", "ARKit", "ARCore", "React Native"],
      upvotes: 28,
      created_at: new Date().toISOString(),
      category: "Mobile",
      project_type: "Mobile App",
      required_skills: ["Unity", "AR Development", "3D Modeling"]
    }
  ];
}

// Get a single idea
export const getIdea = async (id: string): Promise<HackathonIdea | null> => {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as HackathonIdea;
  } catch (error) {
    console.error('Error fetching idea:', error);
    return null;
  }
};

// Save an idea
export const saveIdea = async (ideaId: string, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('saved_ideas')
      .insert([{ idea_id: ideaId, user_id: userId }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving idea:', error);
    return false;
  }
};

// Get saved ideas for a user
export const getSavedIdeas = async (userId: string): Promise<HackathonIdea[]> => {
  try {
    const { data, error } = await supabase
      .from('saved_ideas')
      .select('idea_id')
      .eq('user_id', userId);

    if (error) throw error;
    
    if (data.length === 0) return [];
    
    const ideaIds = data.map((item: SavedIdea) => item.idea_id);
    
    const { data: ideas, error: ideasError } = await supabase
      .from('ideas')
      .select('*')
      .in('id', ideaIds);
      
    if (ideasError) throw ideasError;
    
    return ideas as HackathonIdea[];
  } catch (error) {
    console.error('Error fetching saved ideas:', error);
    return [];
  }
};

// Upvote an idea
export const upvoteIdea = async (ideaId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('ideas')
      .select('upvotes')
      .eq('id', ideaId)
      .single();
      
    if (error) throw error;
    
    const { error: updateError } = await supabase
      .from('ideas')
      .update({ upvotes: (data.upvotes || 0) + 1 })
      .eq('id', ideaId);
      
    if (updateError) throw updateError;
    
    return true;
  } catch (error) {
    console.error('Error upvoting idea:', error);
    return false;
  }
};

// Get or create user profile
export const getOrCreateProfile = async (userId: string): Promise<Profile | null> => {
  try {
    // Check if profile exists
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows returned"
      throw error;
    }
    
    if (data) return data as Profile;
    
    // Create profile if it doesn't exist
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{
        user_id: userId,
        username: `user_${Math.floor(Math.random() * 10000)}`,
        skills: [],
        interests: [],
        experience_level: 'Beginner'
      }])
      .select()
      .single();
      
    if (createError) throw createError;
    
    return newProfile as Profile;
  } catch (error) {
    console.error('Error getting/creating profile:', error);
    return null;
  }
};

// Update user profile
export const updateProfile = async (
  userId: string,
  profile: Partial<Profile>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('user_id', userId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};
