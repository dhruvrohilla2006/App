const generateIdeaPrompt = (category, role, experienceLevel, difficulty) => {
  const result = `
Generate a structured and unique project idea based on the following inputs:
- Category: ${category}
- Role: ${role} 
- Experience Level: ${experienceLevel}
- Difficulty: ${difficulty} 

Respond strictly in JSON format with the following fields:
{
  "title": "Project Title",
  "description": "A concise description of the project.",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "technologies": ["Technology 1", "Technology 2", "Technology 3"],
  "difficulty": "Beginner | Intermediate | Advanced",
  "project_type": "Web App | Mobile App | AI Tool | Game | Other",
  "use_case": "Education | Healthcare | Finance | Entertainment | Productivity | Other",
  "estimated_time": "1 Week | 1 Month | 3 Months | 6 Months",
  "required_skills": ["Skill 1", "Skill 2", "Skill 3"],
  "target_audience": "Students | Developers | Businesses | General Public",
  "learning_outcomes": ["What users will learn by completing this project"]
}
Only return valid JSON with no extra text example for extra text like(''' , json ,''') & No Comments like '''json ''' Follow the response format strictly.
`;
  return result;
};

const gererateFullPlanPrompt = (preReponse) => {
  result = `Generate a fully detailed project roadmap for the following project. ${JSON.stringify(
    preReponse
  )}. Break down the project into major phases, covering setup, configuration, building components, installing dependencies, and alternatives. The response should strictly follow the JSON structure below and must include highly detailed steps, hints, alternative tools, and best practices for each phase. The breakdown must cover: project setup, backend and frontend development, authentication, API integration, data visualization, testing, and deployment. Ensure that every section contains:"

Steps: A step-by-step guide with clear instructions.
Hints: Best practices, performance tips, and debugging strategies.
Alternatives: Different approaches/tools users can consider.
"The AI must output only valid JSON without extra explanations, and the structure must match the following format:"

{
  "title": "Project Title",
  "description": "A concise description of the project.",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "technologies": ["Technology 1", "Technology 2", "Technology 3"],
  "difficulty": "Beginner | Intermediate | Advanced",
  "project_type": "Web App | Mobile App | AI Tool | Game | Other",
  "use_case": "Education | Healthcare | Finance | Entertainment | Productivity | Other",
  "estimated_time": "1 Week | 1 Month | 3 Months | 6 Months",
  "required_skills": ["Skill 1", "Skill 2", "Skill 3"],
  "target_audience": "Students | Developers | Businesses | General Public",
  "learning_outcomes": ["What users will learn by completing this project"],
  "project_breakdown": {
    "1. Setup Development Environment": {
      "steps": ["Step 1", "Step 2", "Step 3"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "2. Install Required Packages": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "3. Configure Frontend": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "4. Build UI Components": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "5. Set Up Backend": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "6. Implement Authentication": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "7. Connect Frontend with Backend": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "8. Add Data Visualization": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "9. Testing": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    },
    "10. Deployment": {
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
    }
  }
}
Important:

Do not generate any explanation or extra text outside the JSON.
Ensure all steps are fully detailed, with at least 3-5 steps per section.
Each step should be practical and executable.
Hints must contain debugging strategies, optimizations, and best practices.
Alternatives must offer different tools/approaches for flexibility.`;

  return result;
};

const gererateFullPlanPrompt2 = (preReponse) => {
  result = `Generate a fully detailed project roadmap for the following project. ${JSON.stringify(
    preReponse
  )}. Break down the project into major phases, covering setup, configuration, building components, installing dependencies, and alternatives. The response should strictly follow the JSON structure below and must include highly detailed steps, hints, alternative tools, and best practices for each phase. The breakdown must cover: project setup, backend and frontend development, authentication, API integration, data visualization, testing, and deployment. Ensure that every section contains:"

Steps: A step-by-step guide with clear instructions.
Hints: Best practices, performance tips, and debugging strategies.
Alternatives: Different approaches/tools users can consider.
"The AI must output only valid JSON without extra explanations, and the structure must match the following format:"

{
  "title": "Project Title",
  "description": "A concise description of the project.",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "technologies": ["Technology 1", "Technology 2", "Technology 3"],
  "difficulty": "Beginner | Intermediate | Advanced",
  "project_type": "Web App | Mobile App | AI Tool | Game | Other",
  "use_case": "Education | Healthcare | Finance | Entertainment | Productivity | Other",
  "estimated_time": "1 Week | 1 Month | 3 Months | 6 Months",
  "required_skills": ["Skill 1", "Skill 2", "Skill 3"],
  "target_audience": "Students | Developers | Businesses | General Public",
  "learning_outcomes": ["What users will learn by completing this project"],
  "project_breakdown": {
    1:{
       Setup Development Environment:{
       "steps": ["Step 1", "Step 2", "Step 3"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    2: {
       Install Required Packages:{
       "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    3 : {
     Configure Frontend:{
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
     }
    },
    4: {
      Build UI Components:{
       "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    5 : {
      Set Up Backend:{
       "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    6 : {
     Implement Authentication:{
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    7 : {
      Connect Frontend with Backend:{
       "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    8 : {
     Add Data Visualization:{
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    9 : {
     Testing:{
      "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    },
    10 : {
    Deployment:{
     "steps": ["Step 1", "Step 2"],
      "hints": ["Hint 1", "Hint 2"],
      "alternatives": ["Alternative 1", "Alternative 2"]
      }
    }
  }
}
Important:

Do not generate any explanation or extra text outside the JSON.
Ensure all steps are fully detailed, with at least 5-7 steps per section.
Each step should be practical and executable.
Hints must contain debugging strategies, optimizations, and best practices.
Alternatives must offer different tools/approaches for flexibility.`;

  return result;
};

const generateFeaturePrompt = (feature) => `
Explain the importance of the feature: ${feature} in software development.
Provide a structured response in JSON format:
{
  "feature": "${feature}",
  "importance": "Why this feature is important",
  "best_practices": ["Best Practice 1", "Best Practice 2"]
}
`;

const generateTechStackPrompt = (techStack) => `
Provide an overview of the technology stack: ${techStack}.
Respond in JSON format:
{
  "technology": "${techStack}",
  "description": "Brief description",
  "pros": ["Advantage 1", "Advantage 2"],
  "cons": ["Disadvantage 1", "Disadvantage 2"],
  "use_cases": ["Use Case 1", "Use Case 2"]
}
`;

module.exports = {
  generateIdeaPrompt,
  generateFeaturePrompt,
  generateTechStackPrompt,
  gererateFullPlanPrompt,
  gererateFullPlanPrompt2,
};
