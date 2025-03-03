
import React, { useEffect } from "react";
import { ButtonWithIcon } from "./ui/ButtonWithIcon";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  useEffect(() => {
    console.log("Hero component mounted");
  }, []);

  return (
    <section className="relative w-full py-20 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <div className="space-y-2 animate-in" style={{ "--index": 0 } as React.CSSProperties}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tighter">
              Generate Perfect Hackathon Ideas
            </h1>
            <p className="max-w-[700px] text-muted-foreground mx-auto text-base md:text-xl">
              Tailored to your skills, preferences, and ambitions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-in" style={{ "--index": 1 } as React.CSSProperties}>
            <ButtonWithIcon 
              icon={Sparkles} 
              size="lg" 
              className="px-8 font-medium"
            >
              Generate My Idea
            </ButtonWithIcon>
            <ButtonWithIcon 
              icon={ArrowRight} 
              iconPosition="right"
              variant="outline" 
              size="lg" 
              className="px-8 font-medium"
            >
              Learn More
            </ButtonWithIcon>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f3f4f6_100%)]">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-gradient-to-tr from-purple-50 to-indigo-50 opacity-50 blur-[80px]"></div>
      </div>
    </section>
  );
}
