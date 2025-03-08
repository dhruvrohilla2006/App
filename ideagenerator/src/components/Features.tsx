
import React from "react";
import { Brain, Compass, Fingerprint, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "Collaborative knowledge graph construction with version control.",
    description: "A feature that allows multiple users to work together on building the knowledge graph while keeping track of changes."
  },
  {
    icon: Compass,
    title: "Advanced graph querying capabilities using SPARQL or similar language.",
    description: "Utilize powerful querying languages to extract meaningful insights from the knowledge graph."
  },
  {
    icon: Fingerprint,
    title: "Decentralized data storage and retrieval using IPFS or similar technology.",
    description: "Store and access data in a decentralized manner, ensuring data integrity and availability."
  },
  {
    icon: Rocket,
    title: "Blockchain-based access control and data provenance tracking.",
    description: "Implement secure access controls and track the history of data changes using blockchain technology."
  },
  {
    icon: Brain,
    title: "Reasoning engine for inferring new knowledge from existing graph data.",
    description: "Automatically derive new insights and relationships from the existing data in the knowledge graph."
  },
  {
    icon: Compass,
    title: "User roles and permissions management for contribution and access control.",
    description: "Manage user roles and permissions to control who can contribute to and access the knowledge graph."
  },
  {
    icon: Rocket,
    title: "API for external applications to interact with the knowledge graph.",
    description: "Provide a robust API for third-party applications to access and utilize the knowledge graph."
  }
];


interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <div 
      className="group relative flex flex-col gap-2 p-6 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1 animate-in" 
      style={{ "--index": index } as React.CSSProperties}
    >
      <div className="p-2 w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-2 group-hover:bg-primary/5 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how our idea generator helps you find your next winning hackathon project
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-6 py-12">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
