import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { List, CheckCircle, Code, Database, CloudCog, Users, Clock, BookOpen, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Button = ({ children, className = "", variant = "default", onClick }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses = {
    default: "bg-zinc-800 text-white hover:bg-zinc-900",
    outline: "border border-zinc-300 hover:bg-zinc-100 text-zinc-800",
    secondary: "bg-zinc-200 text-zinc-800 hover:bg-zinc-300",
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <select 
        value={value} 
        onChange={onChange}
        className="w-full p-2 border border-zinc-300 rounded-md bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

const ProjectIdeaGenerator = () => {
  const [showForm, setShowForm] = useState(true);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form state
  const [category, setCategory] = useState('Web Development');
  const [role, setRole] = useState('Developer');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [difficulty, setDifficulty] = useState('Medium');
  
  // Project data state
  const [projectData, setProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const categories = [
    'Web Development', 
    'Mobile App', 
    'Data Science', 
    'AI/ML', 
    'IoT', 
    'Blockchain', 
    'Game Development',
    'DevOps',
    'Cybersecurity'
  ];
  
  const roles = [
    'Student', 
    'Developer', 
    'Entrepreneur', 
    'Researcher', 
    'Educator', 
    'Hobbyist'
  ];
  
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard'];
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate project
    setTimeout(() => {
      // Map difficulty levels to the format used in the showcase
      const difficultyMap = {
        'Easy': 'Beginner',
        'Medium': 'Intermediate',
        'Hard': 'Advanced'
      };
      
      // Generate a project based on the selected options
      const generatedProject = generateProjectIdea(category, role, experienceLevel, difficultyMap[difficulty]);
      setProjectData(generatedProject);
      setShowForm(false);
      setShowProjectDetails(true);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleReset = () => {
    setShowForm(true);
    setShowProjectDetails(false);
    setProjectData(null);
  };

  // Function to generate a project idea based on user selections
  const generateProjectIdea = (category, role, experienceLevel, difficulty) => {
    // This would typically be a server call, but we're generating sample data
    
    let projectIdeas = {
      "Web Development": {
        "title": "Decentralized Knowledge Graph Construction and Querying Platform",
        "description": "A platform leveraging MERN stack and graph databases to collaboratively construct and query a decentralized knowledge graph, with advanced reasoning capabilities and blockchain-based access control.",
        "features": [
          "Collaborative knowledge graph construction with version control.",
          "Advanced graph querying capabilities using SPARQL or similar language.",
          "Decentralized data storage and retrieval using IPFS or similar technology.",
          "Blockchain-based access control and data provenance tracking.",
          "Reasoning engine for inferring new knowledge from existing graph data.",
          "User roles and permissions management for contribution and access control.",
          "API for external applications to interact with the knowledge graph."
        ],
        "technologies": [
          "MongoDB (or ArangoDB for native graph support)",
          "Express.js",
          "React.js",
          "Node.js",
          "GraphQL (or REST API)",
          "IPFS (or similar decentralized storage)",
          "Blockchain (Ethereum or similar)",
          "SPARQL Endpoint (for graph querying)",
          "Reasoning Engine (Pellet, HermiT, or custom)",
          "Docker/Kubernetes (for deployment)"
        ],
        "project_type": "Web App",
        "use_case": "Education | Research | Data Management",
        "estimated_time": difficulty === "Beginner" ? "2 Months" : difficulty === "Intermediate" ? "4 Months" : "6 Months",
        "required_skills": [
          "MERN Stack Proficiency",
          "Graph Database Concepts",
          "Knowledge Representation and Reasoning",
          "Decentralized Technologies (IPFS, Blockchain)",
          "Security and Access Control",
          "API Design and Development",
          "Cloud Deployment (AWS, Azure, GCP)"
        ],
        "target_audience": "Researchers | Data Scientists | Knowledge Engineers | Developers",
        "learning_outcomes": [
          "Mastery of MERN stack development.",
          "Understanding of graph database technologies and query languages.",
          "Experience with decentralized technologies for data storage and access control.",
          "Knowledge of knowledge representation and reasoning techniques.",
          "Ability to design and implement secure and scalable web applications.",
          "Experience with collaborative software development practices."
        ]
      },
      "Mobile App": {
        "title": "Augmented Reality Field Guide for Local Flora and Fauna",
        "description": "A mobile application that uses augmented reality to identify and provide information about local plants and animals, integrating with citizen science databases for community contributions.",
        "features": [
          "Real-time plant and animal identification using computer vision.",
          "Augmented reality overlays with educational information.",
          "Offline mode for use in remote areas without connectivity.",
          "User contributions to crowd-sourced biodiversity database.",
          "Seasonal tracking and migration patterns visualization.",
          "Gamification elements to encourage exploration and learning.",
          "Integration with global biodiversity databases."
        ],
        "technologies": [
          "React Native or Flutter",
          "ARKit (iOS) / ARCore (Android)",
          "TensorFlow Lite for on-device ML",
          "Firebase for backend services",
          "MongoDB for database",
          "Node.js for API development",
          "GIS and mapping libraries",
          "Push notifications for seasonal events"
        ],
        "project_type": "Mobile App",
        "use_case": "Education | Conservation | Citizen Science",
        "estimated_time": difficulty === "Beginner" ? "3 Months" : difficulty === "Intermediate" ? "5 Months" : "8 Months",
        "required_skills": [
          "Mobile App Development",
          "Augmented Reality Implementation",
          "Computer Vision and ML Integration",
          "API Development and Consumption",
          "Offline-First Development Approach",
          "User Experience Design",
          "Working with Geospatial Data"
        ],
        "target_audience": "Nature Enthusiasts | Educators | Conservationists | Students",
        "learning_outcomes": [
          "Proficiency in mobile development with AR capabilities.",
          "Understanding of ML-based image recognition systems.",
          "Experience creating offline-first applications.",
          "Knowledge of biodiversity data structures and taxonomies.",
          "Skills in designing intuitive AR user experiences.",
          "Understanding of citizen science data collection methodologies."
        ]
      },
      "AI/ML": {
        "title": "Multimodal Personal Assistant for Creative Workflows",
        "description": "An AI assistant that understands voice, text, and visual input to help creators manage their workflow, provide relevant inspiration, and automate repetitive tasks across creative software.",
        "features": [
          "Natural language processing for understanding creative intent.",
          "Computer vision for analyzing visual references and work-in-progress.",
          "Cross-application automation and resource management.",
          "Personalized inspiration suggestions based on current project.",
          "Voice-controlled workflow management and commands.",
          "Integration with creative software APIs (Adobe, Figma, etc.).",
          "Project progress tracking and deadline management."
        ],
        "technologies": [
          "PyTorch or TensorFlow for ML models",
          "FastAPI or Flask for backend services",
          "React/Vue.js for frontend interface",
          "ONNX for model interoperability",
          "Docker for deployment",
          "Redis for caching",
          "Elasticsearch for knowledge retrieval",
          "WebSockets for real-time communication"
        ],
        "project_type": "AI Application",
        "use_case": "Creativity | Productivity | Design",
        "estimated_time": difficulty === "Beginner" ? "4 Months" : difficulty === "Intermediate" ? "7 Months" : "10 Months",
        "required_skills": [
          "Machine Learning Model Development",
          "Natural Language Processing",
          "Computer Vision",
          "API Integration with Creative Software",
          "Real-time System Architecture",
          "User Experience Design for AI Tools",
          "Cross-platform Development"
        ],
        "target_audience": "Designers | Artists | Content Creators | Creative Professionals",
        "learning_outcomes": [
          "Development of multimodal AI systems.",
          "Integration of AI with existing creative software ecosystems.",
          "Creation of context-aware assistant technology.",
          "Understanding of creative workflows and user needs.",
          "Implementation of personalization algorithms.",
          "Building systems that enhance human creativity rather than replace it."
        ]
      }
    };
    
    // Use the selected category or default to Web Development
    const baseProject = projectIdeas[category] || projectIdeas["Web Development"];
    
    // Add difficulty
    baseProject.difficulty = difficulty;
    
    // Adjust project complexity based on experience level and role
    if (experienceLevel === "Beginner") {
      baseProject.features = baseProject.features.slice(0, 4);
      baseProject.technologies = baseProject.technologies.slice(0, 5);
    }
    
    // Customize for role
    if (role === "Student") {
      baseProject.use_case += " | Academic";
    } else if (role === "Entrepreneur") {
      baseProject.use_case += " | Commercial";
    }
    
    return baseProject;
  };
  
  // Calculate difficulty level for progress bar
  const getDifficultyPercentage = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 20;
      case 'Intermediate': return 50;
      case 'Advanced': return 80;
      case 'Expert': return 100;
      default: return 50;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {showForm && (
        <Card className="border border-zinc-200 shadow-md mb-8">
          <CardHeader className="bg-gradient-to-r from-zinc-100 to-zinc-200 rounded-t-lg border-b border-zinc-200">
            <CardTitle className="text-2xl font-bold text-zinc-800 flex items-center gap-2">
              <Sparkles size={24} className="text-zinc-700" /> Project Idea Generator
            </CardTitle>
            <CardDescription className="text-zinc-600 text-base">
              Generate a personalized project idea based on your preferences
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select 
                label="Category" 
                options={categories} 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
              />
              
              <Select 
                label="Role" 
                options={roles} 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
              />
              
              <Select 
                label="Experience Level" 
                options={experienceLevels} 
                value={experienceLevel} 
                onChange={(e) => setExperienceLevel(e.target.value)} 
              />
              
              <Select 
                label="Difficulty" 
                options={difficultyLevels} 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)} 
              />
            </div>
          </CardContent>
          
          <CardFooter className="bg-zinc-100 rounded-b-lg border-t border-zinc-200 p-4">
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Project Idea"}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {showProjectDetails && projectData && (
        <>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-zinc-800">Your Generated Project</h2>
            <Button variant="outline" onClick={handleReset}>
              Generate Another
            </Button>
          </div>
          
          <Card className="border border-zinc-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-zinc-100 to-zinc-200 rounded-t-lg border-b border-zinc-200">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold mb-2 text-zinc-800">{projectData.title}</CardTitle>
                  <CardDescription className="text-zinc-600 text-base">
                    {projectData.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-zinc-800 text-white px-3 py-1 text-sm font-semibold">
                  {projectData.project_type}
                </Badge>
              </div>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full bg-zinc-100">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:border-b-2 data-[state=active]:border-zinc-800 hover:bg-zinc-200"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="tech" 
                  className="data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:border-b-2 data-[state=active]:border-zinc-800 hover:bg-zinc-200"
                >
                  Technologies
                </TabsTrigger>
                <TabsTrigger 
                  value="skills" 
                  className="data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:border-b-2 data-[state=active]:border-zinc-800 hover:bg-zinc-200"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger 
                  value="outcomes" 
                  className="data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:border-b-2 data-[state=active]:border-zinc-800 hover:bg-zinc-200"
                >
                  Outcomes
                </TabsTrigger>
              </TabsList>
              
              <CardContent className="pt-6 bg-white">
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800">
                        <List size={18} /> Key Features
                      </h3>
                      <ul className="space-y-2">
                        {projectData.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="text-zinc-700 mt-1" size={16} />
                            <span className="text-zinc-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800">
                          <Users size={18} /> Target Audience
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {projectData.target_audience.split(' | ').map((audience, idx) => (
                            <Badge key={idx} variant="outline" className="bg-zinc-100 border-zinc-300 text-zinc-700">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800">
                          <BookOpen size={18} /> Use Cases
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {projectData.use_case.split(' | ').map((useCase, idx) => (
                            <Badge key={idx} variant="outline" className="bg-zinc-100 border-zinc-300 text-zinc-700">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-zinc-800">
                          <Clock size={18} /> Estimated Time
                        </h3>
                        <p className="text-zinc-700">{projectData.estimated_time}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-zinc-800">
                          Difficulty Level
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-zinc-600">
                            <span>Beginner</span>
                            <span className="font-medium text-zinc-800">{projectData.difficulty}</span>
                            <span>Expert</span>
                          </div>
                          <Progress value={getDifficultyPercentage(projectData.difficulty)} className="h-2 bg-zinc-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tech" className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800">
                    <Code size={18} /> Technology Stack
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projectData.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-zinc-50 rounded-md border border-zinc-200">
                        <Database className="text-zinc-600 mr-2" size={16} />
                        <span className="text-zinc-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800">
                    <CloudCog size={18} /> Required Skills
                  </h3>
                  <div className="space-y-3">
                    {projectData.required_skills.map((skill, idx) => (
                      <div key={idx} className="p-3 bg-zinc-50 rounded-md border border-zinc-200">
                        <span className="font-medium text-zinc-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="outcomes" className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-zinc-800">
                    <BookOpen size={18} /> Learning Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {projectData.learning_outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-3 bg-zinc-50 rounded-md border border-zinc-200">
                        <CheckCircle className="text-zinc-600 mt-1" size={16} />
                        <span className="text-zinc-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </CardContent>
            </Tabs>
            
            <CardFooter className="bg-zinc-100 rounded-b-lg border-t border-zinc-200 p-4">
              <div className="w-full flex justify-between items-center">
                <Badge variant="outline" className="bg-zinc-200 text-zinc-800 px-3 border-zinc-300">
                  {projectData.difficulty}
                </Badge>
                <Button onClick={()=>{
                    console.log("")
                }} variant="default" className="bg-zinc-800 hover:bg-zinc-900 text-white">
                  Start Project
                </Button>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProjectIdeaGenerator;