import React, { useEffect, useState } from "react";
import { getIdeas, upvoteIdea, saveIdea } from "../lib/ideaApi";

import { HackathonIdea } from "../lib/supabase";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";
import { AnimatedGradient } from "../components/ui/AnimatedGradient";
import { useAuth } from "../contexts/AuthContext";
import { ThumbsUp, Share2, Bookmark } from "lucide-react"; // Ensure these are imported correctly

export default function Browse() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<HackathonIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [projectType, setProjectType] = useState("");
  const [search, setSearch] = useState("");
  const [filteredIdeas, setFilteredIdeas] = useState<HackathonIdea[]>([]);

  // Categories
  const categories = [
    "Web",
    "AI/ML",
    "Blockchain",
    "IoT",
    "Cybersecurity",
    "Mobile",
    "Data Science",
    "Game Development",
  ];

  // Difficulty levels
  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  // Project types
  const projectTypes = [
    "Web App",
    "Mobile App",
    "AI Model",
    "Data Science",
    "IoT Device",
    "Blockchain",
    "Game",
  ];

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const fetchedIdeas = await getIdeas();
        console.log("Fetched ideas:", fetchedIdeas);
        setIdeas(fetchedIdeas);
        setFilteredIdeas(fetchedIdeas);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        toast({
          title: "Error",
          description: "Failed to load ideas.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [toast]);

  // Filter ideas when filters change
  useEffect(() => {
    let filtered = [...ideas];

    if (category) {
      filtered = filtered.filter((idea) => 
        idea.category === category || 
        (idea.categories && idea.categories.includes(category))
      );
    }

    if (difficulty) {
      filtered = filtered.filter((idea) => idea.difficulty === difficulty);
    }

    if (projectType) {
      filtered = filtered.filter((idea) => 
        idea.project_type === projectType || 
        (idea.tech_stack && idea.tech_stack.includes(projectType))
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchLower) ||
          idea.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredIdeas(filtered);
  }, [ideas, category, difficulty, projectType, search]);

  const handleUpvote = async (ideaId: string) => {
    try {
      const success = await upvoteIdea(ideaId);
      
      if (success) {
        setIdeas((prev) =>
          prev.map((idea) =>
            idea.id === ideaId
              ? { ...idea, upvotes: (idea.upvotes || 0) + 1 }
              : idea
          )
        );
        
        toast({
          title: "Upvoted!",
          description: "Thanks for your feedback!",
        });
      }
    } catch (error) {
      console.error("Error upvoting idea:", error);
      toast({
        title: "Error",
        description: "Failed to upvote idea.",
        variant: "destructive",
      });
    }
  };

  const handleSaveIdea = async (ideaId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save ideas.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await saveIdea(ideaId, user.id);
      
      if (success) {
        toast({
          title: "Idea saved!",
          description: "This idea has been added to your saved ideas.",
        });
      }
    } catch (error) {
      console.error("Error saving idea:", error);
      toast({
        title: "Error",
        description: "Failed to save idea.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
        Browse Hackathon Ideas
      </h2>
      <p className="text-center mb-8">Discover innovative ideas for your next hackathon project.</p>

      <div className="max-w-5xl mx-auto">
        {/* Filters */}
        <div className="grid gap-4 mb-8 md:grid-cols-4">
          <div>
            <Input
              placeholder="Search ideas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger>
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">No ideas found matching your filters.</p>
            <Button className="mt-4" variant="outline" onClick={() => {
              setCategory("");
              setDifficulty("");
              setProjectType("");
              setSearch("");
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea) => (
              <AnimatedGradient key={idea.id} className="rounded-xl p-0.5 h-full">
                <Card className="h-full backdrop-blur-sm bg-card/90">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{idea.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">
                            {idea.category || (idea.categories && idea.categories[0]) || "Unknown"}
                          </Badge>
                          <Badge variant="outline">{idea.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <span className="text-sm font-medium">{idea.upvotes || 0}</span>
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{idea.description}</p>
                    {idea.required_skills && idea.required_skills.length > 0 ? (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {idea.required_skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {idea.required_skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{idea.required_skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      idea.tech_stack && idea.tech_stack.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Tech Stack:</h4>
                          <div className="flex flex-wrap gap-1">
                            {idea.tech_stack.slice(0, 3).map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {idea.tech_stack.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{idea.tech_stack.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUpvote(idea.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Upvote
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSaveIdea(idea.id)}
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedGradient>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
