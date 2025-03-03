const generateIdeaPrompt = (category, role, experienceLevel, difficulty) => {
  const result = `
Generate a structured and unique project idea based on the following inputs:
- Category: ${category}
- Role: ${role} (e.g., Student, Developer, Entrepreneur)
- Experience Level: ${experienceLevel} (Beginner, Intermediate, Advanced)
- Difficulty: ${difficulty} (Easy, Medium, Hard)

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
Only return valid JSON with no extra text.
`;
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
};
