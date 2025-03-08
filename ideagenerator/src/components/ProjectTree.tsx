
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Lightbulb, Shuffle } from "lucide-react"

type ProjectData = {
  title: string
  description: string
  features: string[]
  technologies: string[]
  difficulty: string
  project_type: string
  use_case: string
  estimated_time: string
  required_skills: string[]
  target_audience: string
  learning_outcomes: string[]
  project_breakdown: Record<
    string,
    Record<
      string,
      {
        steps: string[]
        hints: string[]
        alternatives: string[]
      }
    >
  >
}

type ProjectTreeProps = {
  projectData: ProjectData
}

export default function ProjectTree({ projectData }: ProjectTreeProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({})
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({})
  const [expandedAlternatives, setExpandedAlternatives] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleStep = (step: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [step]: !prev[step],
    }))
  }

  const toggleHints = (step: string) => {
    setExpandedHints((prev) => ({
      ...prev,
      [step]: !prev[step],
    }))
  }

  const toggleAlternatives = (step: string) => {
    setExpandedAlternatives((prev) => ({
      ...prev,
      [step]: !prev[step],
    }))
  }

  return (
    <div className="w-full">
      {/* Project Overview */}
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-2 text-primary-foreground bg-primary inline-block px-4 py-1 rounded-md">
          {projectData.title}
        </h2>
        <p className="text-muted-foreground mb-6 mt-4">{projectData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Project Details</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="font-medium w-36">Difficulty:</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded text-sm">{projectData.difficulty}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-36">Type:</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded text-sm">{projectData.project_type}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-36">Use Case:</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded text-sm">{projectData.use_case}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-36">Estimated Time:</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded text-sm">{projectData.estimated_time}</span>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-36">Target Audience:</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded text-sm">{projectData.target_audience}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-4 mb-3 border-b pb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.required_skills.map((skill, index) => (
                <span key={index} className="bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Tree */}
      <div className="relative bg-white/50 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-center border-b pb-3">Project Implementation Steps</h2>

        {/* Main trunk line */}
        <div className="absolute left-8 top-24 bottom-8 w-1 bg-primary/40 rounded-full" />

        {/* Project Breakdown */}
        <div className="space-y-4 mt-8">
          {Object.entries(projectData.project_breakdown).map(([stepNumber, stepContent]) => {
            const stepKey = Object.keys(stepContent)[0]
            const stepData = stepContent[stepKey]

            return (
              <div key={stepNumber} className="relative">
                {/* Step node */}
                <div className="absolute left-8 top-6 w-6 h-6 rounded-full bg-primary shadow-md transform -translate-x-1/2 flex items-center justify-center text-white text-xs font-bold">
                  {stepNumber}
                </div>

                {/* Branch line to step content (only visible when expanded) */}
                {expandedSections[stepNumber] && (
                  <div className="absolute left-8 top-6 bottom-0 w-0.5 bg-primary/30 transform translate-x-6" />
                )}

                {/* Step header */}
                <div
                  className={`ml-16 pl-4 py-3 flex items-center cursor-pointer rounded-md transition-all ${
                    expandedSections[stepNumber] ? "bg-primary/10 shadow-sm" : "hover:bg-muted"
                  }`}
                  onClick={() => toggleSection(stepNumber)}
                >
                  {expandedSections[stepNumber] ? (
                    <ChevronDown className="mr-2 h-5 w-5 text-primary" />
                  ) : (
                    <ChevronRight className="mr-2 h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={`font-semibold text-lg ${expandedSections[stepNumber] ? "text-primary" : ""}`}>
                    {stepKey}
                  </span>
                </div>

                {/* Step content */}
                <AnimatePresence>
                  {expandedSections[stepNumber] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-24 pl-8 relative mt-2 mb-6"
                    >
                      {/* Steps */}
                      <div className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div
                          className={`flex items-center cursor-pointer px-4 py-2 transition-colors border-l-4 ${
                            expandedSteps[`${stepNumber}-steps`]
                              ? "bg-blue-50 border-blue-500"
                              : "hover:bg-gray-50 border-transparent"
                          }`}
                          onClick={() => toggleStep(`${stepNumber}-steps`)}
                        >
                          {expandedSteps[`${stepNumber}-steps`] ? (
                            <ChevronDown className="mr-2 h-5 w-5 text-blue-500" />
                          ) : (
                            <ChevronRight className="mr-2 h-5 w-5 text-gray-400" />
                          )}
                          <h4 className={`font-medium ${expandedSteps[`${stepNumber}-steps`] ? "text-blue-700" : ""}`}>
                            Implementation Steps
                          </h4>
                        </div>

                        <AnimatePresence>
                          {expandedSteps[`${stepNumber}-steps`] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ol className="list-decimal pl-10 pr-4 py-3 space-y-2 bg-blue-50/50">
                                {stepData.steps.map((step, index) => (
                                  <li key={index} className="text-sm pb-2">
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Hints */}
                      <div className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div
                          className={`flex items-center cursor-pointer px-4 py-2 transition-colors border-l-4 ${
                            expandedHints[stepNumber]
                              ? "bg-amber-50 border-amber-500"
                              : "hover:bg-gray-50 border-transparent"
                          }`}
                          onClick={() => toggleHints(stepNumber)}
                        >
                          <Lightbulb
                            className={`mr-2 h-5 w-5 ${expandedHints[stepNumber] ? "text-amber-500" : "text-gray-400"}`}
                          />
                          <h4 className={`font-medium ${expandedHints[stepNumber] ? "text-amber-700" : ""}`}>
                            Helpful Hints
                          </h4>
                        </div>

                        <AnimatePresence>
                          {expandedHints[stepNumber] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ul className="list-disc pl-10 pr-4 py-3 space-y-2 bg-amber-50/50">
                                {stepData.hints.map((hint, index) => (
                                  <li key={index} className="text-sm pb-2">
                                    {hint}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Alternatives */}
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div
                          className={`flex items-center cursor-pointer px-4 py-2 transition-colors border-l-4 ${
                            expandedAlternatives[stepNumber]
                              ? "bg-indigo-50 border-indigo-500"
                              : "hover:bg-gray-50 border-transparent"
                          }`}
                          onClick={() => toggleAlternatives(stepNumber)}
                        >
                          <Shuffle
                            className={`mr-2 h-5 w-5 ${expandedAlternatives[stepNumber] ? "text-indigo-500" : "text-gray-400"}`}
                          />
                          <h4 className={`font-medium ${expandedAlternatives[stepNumber] ? "text-indigo-700" : ""}`}>
                            Alternative Approaches
                          </h4>
                        </div>

                        <AnimatePresence>
                          {expandedAlternatives[stepNumber] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ul className="list-disc pl-10 pr-4 py-3 space-y-2 bg-indigo-50/50">
                                {stepData.alternatives.map((alternative, index) => (
                                  <li key={index} className="text-sm pb-2">
                                    {alternative}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

