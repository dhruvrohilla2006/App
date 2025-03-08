
import React, { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { IdeaGenerator } from "@/components/IdeaGenerator";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    console.log("Index component mounted");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <IdeaGenerator />
      <Footer />
    </div>
  );
};

export default Index;
