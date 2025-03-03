
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getSavedIdeas, getOrCreateProfile, updateProfile } from "@/lib/ideaApi";
import { HackathonIdea, Profile as UserProfile } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, Share2, Bookmark, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedGradient } from "@/components/ui/AnimatedGradient";
import { Auth } from "@/components/Auth";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedIdeas, setSavedIdeas] = useState<HackathonIdea[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [saving, setSaving] = useState(false);

  // Available options
  const skills = [
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "AR/VR",
    "Blockchain",
    "UI/UX Design",
    "Game Development"
  ];

  const interests = [
    "Healthcare",
    "Education",
    "Environment",
    "Finance",
    "Social Impact",
    "Entertainment",
    "Productivity",
    "Transportation",
    "Retail"
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get user profile
        const userProfile = await getOrCreateProfile(user.id);
        if (userProfile) {
          setProfile(userProfile);
          setUsername(userProfile.username);
          setSelectedSkills(userProfile.skills || []);
          setSelectedInterests(userProfile.interests || []);
          setExperienceLevel(userProfile.experience_level);
        }

        // Get saved ideas
        const ideas = await getSavedIdeas(user.id);
        setSavedIdeas(ideas);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, toast]);

  const handleUpdateProfile = async () => {
    if (!user || !profile) return;

    setSaving(true);

    try {
      const success = await updateProfile(user.id, {
        ...profile,
        username,
        skills: selectedSkills,
        interests: selectedInterests,
        experience_level: experienceLevel,
      });

      if (success) {
        setProfile({
          ...profile,
          username,
          skills: selectedSkills,
          interests: selectedInterests,
          experience_level: experienceLevel,
        });

        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        toast({
          title: "Update Failed",
          description: "There was an error updating your profile.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
          Sign In to View Your Profile
        </h2>
        <div className="max-w-md mx-auto">
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
        My Profile
      </h2>

      <Tabs defaultValue="ideas" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ideas">Saved Ideas</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas">
          <div className="space-y-8 py-4">
            <h3 className="text-xl font-semibold">My Saved Ideas</h3>
            
            {savedIdeas.length === 0 ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <Bookmark className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">You haven't saved any ideas yet.</p>
                <Button className="mt-4" variant="outline" onClick={() => window.location.href = '/'}>
                  Generate New Ideas
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {savedIdeas.map((idea) => (
                  <AnimatedGradient key={idea.id} className="rounded-xl p-0.5">
                    <Card className="h-full backdrop-blur-sm bg-card/90">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{idea.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline">{idea.category}</Badge>
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
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </CardFooter>
                    </Card>
                  </AnimatedGradient>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="space-y-6 py-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select
                    value={experienceLevel}
                    onValueChange={(value) => setExperienceLevel(value as "Beginner" | "Intermediate" | "Advanced")}
                  >
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedSkills.includes(skill)) {
                            setSelectedSkills(selectedSkills.filter((s) => s !== skill));
                          } else {
                            setSelectedSkills([...selectedSkills, skill]);
                          }
                        }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedInterests.includes(interest)) {
                            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
                          } else {
                            setSelectedInterests([...selectedInterests, interest]);
                          }
                        }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleUpdateProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
