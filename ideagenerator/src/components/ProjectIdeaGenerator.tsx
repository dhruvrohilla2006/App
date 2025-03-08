import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { List, CheckCircle, Code, Database, CloudCog, Users, Clock, BookOpen, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';


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

  const naviagate = useNavigate();
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
  
  const handleGenerate = async() => {
    setIsGenerating(true);

    // console.log({ category, role, experienceLevel, difficulty });

    try{
      const response = await fetch("http://localhost:8000/prompt",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, role, experienceLevel, difficulty })
      })
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      
      // console.log("Generated Data:", data);
      setProjectData(data);
      localStorage.setItem("ProjectDetails",JSON.stringify(data));
      setShowProjectDetails(true)
      setShowForm(false)
    }
    catch(error){
      console.error("Error:", error.message);
    }
    
  };
  
  const handleReset = () => {
    setShowForm(true);
    setShowProjectDetails(false);
    setProjectData(null);
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
                    naviagate("/full")
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