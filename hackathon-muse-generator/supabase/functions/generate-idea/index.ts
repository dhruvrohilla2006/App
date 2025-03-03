
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

// Define idea types
type IdeaCategory = 'Web' | 'AI/ML' | 'Blockchain' | 'IoT' | 'Cybersecurity' | 'Mobile' | 'Data Science' | 'Game Development';
type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type ProjectType = 'Web App' | 'Mobile App' | 'AI Model' | 'Data Science' | 'IoT Device' | 'Blockchain' | 'Game';

interface HackathonIdea {
  id: string;
  title: string;
  description: string;
  category: IdeaCategory;
  difficulty: DifficultyLevel;
  project_type: ProjectType;
  required_skills: string[];
  suggested_interests: string[];
  resources: {
    github_links?: string[];
    tutorials?: string[];
    api_references?: string[];
  };
  roadmap: string[];
  upvotes: number;
  created_at: string;
}

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock database of ideas templates by skills and interests
const ideaTemplates: Record<string, Record<string, any[]>> = {
  "Frontend Development": {
    "Healthcare": [
      {
        title: "Health Monitoring Dashboard",
        description: "Create a user-friendly dashboard for patients to monitor their health metrics, appointments, and medication schedules. Implement data visualization for trends and integrate with wearable device APIs.",
        category: "Web",
        project_type: "Web App",
        roadmap: [
          "Design user interface and experience",
          "Implement dashboard layout and components",
          "Connect to health data APIs",
          "Create data visualization charts", 
          "Add notification system",
          "Implement responsive design"
        ],
        resources: {
          github_links: ["https://github.com/reaviz/reaviz", "https://github.com/recharts/recharts"],
          tutorials: ["https://www.smashingmagazine.com/2020/03/accessible-data-visualization-web/"],
          api_references: ["https://fhir.org/"]
        }
      }
    ],
    "Education": [
      {
        title: "Interactive Learning Platform",
        description: "Build an interactive learning platform with progress tracking, quizzes, and educational content. Focus on creating an engaging UI with animations and gamification elements.",
        category: "Web",
        project_type: "Web App",
        roadmap: [
          "Design user interface with focus on engagement",
          "Create interactive quiz components",
          "Implement progress tracking system",
          "Add animations and gamification elements",
          "Design responsive layouts for mobile learning"
        ],
        resources: {
          github_links: ["https://github.com/framer/motion", "https://github.com/pmndrs/react-spring"],
          tutorials: ["https://css-tricks.com/intro-to-animation-and-transitions-in-react/"],
          api_references: ["https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API"]
        }
      }
    ]
  },
  "Backend Development": {
    "Environment": [
      {
        title: "Carbon Footprint Tracker API",
        description: "Develop a RESTful API that calculates and tracks carbon footprints for individuals and businesses. Include data processing for transportation, energy usage, and consumption patterns.",
        category: "Web",
        project_type: "Web App",
        roadmap: [
          "Design API specifications",
          "Create database schema for environmental data",
          "Implement carbon calculation algorithms",
          "Build authentication and user management",
          "Create data aggregation endpoints",
          "Document API endpoints"
        ],
        resources: {
          github_links: ["https://github.com/expressjs/express", "https://github.com/nestjs/nest"],
          tutorials: ["https://dev.to/santypk4/rest-api-architecture-best-practices-4coh"],
          api_references: ["https://www.climatiq.io/docs"]
        }
      }
    ],
    "Finance": [
      {
        title: "Expense Tracking Microservice",
        description: "Create a microservice architecture for expense tracking with features like categorization, budget alerts, and financial insights. Focus on secure data handling and efficient query performance.",
        category: "Web",
        project_type: "Web App",
        roadmap: [
          "Design microservice architecture",
          "Create data models for financial transactions",
          "Implement secure authentication",
          "Build RESTful endpoints",
          "Add budget calculation logic",
          "Implement notification service"
        ],
        resources: {
          github_links: ["https://github.com/microservices-patterns/examples", "https://github.com/prisma/prisma"],
          tutorials: ["https://microservices.io/patterns/index.html"],
          api_references: ["https://plaid.com/docs/"]
        }
      }
    ]
  },
  "Mobile Development": {
    "Transportation": [
      {
        title: "Sustainable Transport Companion",
        description: "Build a mobile app that tracks carbon emissions from different transportation methods and suggests eco-friendly alternatives. Include features like route planning and achievement badges.",
        category: "Mobile",
        project_type: "Mobile App",
        roadmap: [
          "Design mobile UI/UX workflows",
          "Implement location tracking",
          "Create carbon emission calculation logic",
          "Build route suggestion algorithm",
          "Add achievements and gamification",
          "Implement offline capabilities"
        ],
        resources: {
          github_links: ["https://github.com/react-native-maps/react-native-maps", "https://github.com/infinitered/ignite"],
          tutorials: ["https://reactnative.dev/docs/environment-setup"],
          api_references: ["https://developers.google.com/maps/documentation/directions"]
        }
      }
    ],
    "Productivity": [
      {
        title: "Focus Timer with Analytics",
        description: "Create a mobile application that helps users improve productivity through timed work sessions. Include features for tracking progress, setting goals, and analyzing productivity patterns.",
        category: "Mobile",
        project_type: "Mobile App",
        roadmap: [
          "Design timer interface and workflows",
          "Implement timer functionality with notifications",
          "Create data tracking for user sessions",
          "Build analytics dashboard",
          "Add goal setting features",
          "Implement settings and customization"
        ],
        resources: {
          github_links: ["https://github.com/wix/react-native-calendars", "https://github.com/software-mansion/react-native-reanimated"],
          tutorials: ["https://www.reactnative.guide/"],
          api_references: ["https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API"]
        }
      }
    ]
  }
};

// Function to generate an idea based on inputs
const generateIdeaBasedOnInputs = (
  skills: string,
  interest: string,
  complexity: number,
  innovationFocus: boolean
): HackathonIdea => {
  // Get matching templates
  const skillTemplates = ideaTemplates[skills] || {};
  const interestIdeas = skillTemplates[interest] || [];
  
  // If no matching template, create a generic one
  if (interestIdeas.length === 0) {
    return createGenericIdea(skills, interest, complexity, innovationFocus);
  }
  
  // Select a template
  const baseTemplate = interestIdeas[0];
  
  // Adjust difficulty based on complexity
  let difficulty: DifficultyLevel = "Intermediate";
  if (complexity < 33) {
    difficulty = "Beginner";
  } else if (complexity > 66) {
    difficulty = "Advanced";
  }
  
  // Generate skills based on primary skill and complexity
  const requiredSkills = [skills];
  const possibleSkills = [
    "JavaScript", "Python", "React", "TypeScript", "Node.js", 
    "SQL", "NoSQL", "UI/UX Design", "DevOps", "Cloud Services",
    "Docker", "Kubernetes", "GraphQL", "RESTful APIs"
  ];
  
  // Add more skills based on complexity
  const additionalSkillsCount = Math.floor(complexity / 25) + 1;
  for (let i = 0; i < additionalSkillsCount; i++) {
    const randomSkill = possibleSkills[Math.floor(Math.random() * possibleSkills.length)];
    if (!requiredSkills.includes(randomSkill)) {
      requiredSkills.push(randomSkill);
    }
  }
  
  // Add innovation aspects if requested
  let title = baseTemplate.title;
  let description = baseTemplate.description;
  
  if (innovationFocus) {
    const innovationAspects = [
      "with AI-powered recommendations",
      "using blockchain for secure data",
      "with AR visualization",
      "powered by machine learning",
      "with real-time collaboration"
    ];
    
    const randomInnovation = innovationAspects[Math.floor(Math.random() * innovationAspects.length)];
    title = `${title} ${randomInnovation}`;
    description = `${description} Incorporating cutting-edge technology to stand out.`;
  }
  
  return {
    id: crypto.randomUUID(),
    title,
    description,
    category: baseTemplate.category,
    difficulty,
    project_type: baseTemplate.project_type,
    required_skills: requiredSkills,
    suggested_interests: [interest],
    resources: baseTemplate.resources,
    roadmap: baseTemplate.roadmap,
    upvotes: 0,
    created_at: new Date().toISOString()
  };
};

// Create a generic idea if no templates match
const createGenericIdea = (
  skills: string,
  interest: string,
  complexity: number,
  innovationFocus: boolean
): HackathonIdea => {
  let difficulty: DifficultyLevel = "Intermediate";
  if (complexity < 33) {
    difficulty = "Beginner";
  } else if (complexity > 66) {
    difficulty = "Advanced";
  }
  
  let category: IdeaCategory = "Web";
  let projectType: ProjectType = "Web App";
  
  // Set category and project type based on skills
  if (skills.includes("Mobile")) {
    category = "Mobile";
    projectType = "Mobile App";
  } else if (skills.includes("Data") || skills.includes("Machine Learning")) {
    category = "Data Science";
    projectType = "Data Science";
  } else if (skills.includes("Game")) {
    category = "Game Development";
    projectType = "Game";
  } else if (skills.includes("Blockchain")) {
    category = "Blockchain";
    projectType = "Blockchain";
  }
  
  const title = `${interest} Platform for ${skills}`;
  const description = `A ${projectType} focused on the ${interest} sector, utilizing ${skills} technologies to create an innovative solution. This project aims to address common challenges in the ${interest} space through modern development approaches.`;
  
  // Generate roadmap based on project type and complexity
  const roadmap = [
    "Research and define project requirements",
    "Create wireframes and design mockups",
    "Set up project structure and dependencies",
    "Implement core functionality",
    "Add user authentication and data storage",
    "Test and optimize performance",
    "Deploy and present project"
  ];
  
  if (complexity > 50) {
    roadmap.push("Implement advanced features and integrations");
    roadmap.push("Add analytics and monitoring");
  }
  
  if (innovationFocus) {
    roadmap.push("Research and integrate cutting-edge technologies");
    roadmap.push("Create unique selling points through innovation");
  }
  
  return {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    difficulty,
    project_type: projectType,
    required_skills: [skills, "JavaScript", "UI/UX Design"],
    suggested_interests: [interest],
    resources: {
      github_links: ["https://github.com/topics/" + skills.toLowerCase().replace(" ", "-")],
      tutorials: [],
      api_references: []
    },
    roadmap,
    upvotes: 0,
    created_at: new Date().toISOString()
  };
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Get request data
    const { skills, interest, complexity, innovationFocus } = await req.json();
    
    // Check required fields
    if (!skills || !interest) {
      return new Response(
        JSON.stringify({ error: 'Skills and interest are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate the idea
    const idea = generateIdeaBasedOnInputs(skills, interest, complexity, innovationFocus);
    
    // Insert into database
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const { data, error } = await supabaseClient
      .from('ideas')
      .insert([idea])
      .select()
      .single();
      
    if (error) throw error;
    
    return new Response(
      JSON.stringify(data),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error generating idea:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate idea' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
