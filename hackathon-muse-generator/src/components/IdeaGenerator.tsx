
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

export function IdeaGenerator() {
  console.log("IdeaGenerator component rendering");
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Decentralized Knowledge Graph Construction and Querying Platform</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A platform leveraging MERN stack and graph databases to collaboratively construct and query a decentralized knowledge graph, with advanced reasoning capabilities and blockchain-based access control.

            </p>
          </div>
        </div>
        
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Idea Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills</Label>
                <Input 
                  id="skills" 
                  placeholder="e.g. React, Node.js, Python, ML"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Your Interests</Label>
                <Input 
                  id="interests" 
                  placeholder="e.g. Healthcare, Education, Climate"
                />
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <Button type="submit" className="w-full" size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate My Idea
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
