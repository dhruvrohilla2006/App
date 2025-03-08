
import React from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Share Your Skills",
    description: "Tell us about your technical stack, experience level, and areas of expertise."
  },
  {
    number: "02",
    title: "Set Your Preferences",
    description: "Select your interests, preferred problem domains, and the type of impact you want to make."
  },
  {
    number: "03",
    title: "Generate Ideas",
    description: "Our AI analyzes your profile and generates tailored hackathon project ideas that match your criteria."
  },
  {
    number: "04",
    title: "Refine & Launch",
    description: "Pick your favorite idea, refine the details, and get resources to help you start building."
  }
];

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Four simple steps to your perfect hackathon idea
            </p>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border hidden md:block" />
          
          <div className="grid gap-8 md:gap-16">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className={cn(
                  "relative grid items-start md:grid-cols-8 animate-in",
                  index % 2 === 1 ? "md:rtl" : ""
                )}
                style={{ "--index": index } as React.CSSProperties}
              >
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground md:col-span-1 z-10",
                  index % 2 === 1 ? "md:ml-auto" : ""
                )}>
                  <span className="text-lg font-medium">{step.number}</span>
                </div>
                <div className={cn(
                  "md:col-span-7 ltr text-left p-6 rounded-xl bg-card shadow-sm",
                  index % 2 === 1 ? "md:text-right" : ""
                )}>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
