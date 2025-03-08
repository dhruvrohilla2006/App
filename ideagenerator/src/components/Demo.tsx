import { useEffect, useState } from "react";
import { BackgroundLines } from "./ui/BackgroundLines";
// import SpotlightCard from "./ui/SpotlightCard";
import ProjectTree from "./ProjectTree";
import { projectData } from "./projectdata";

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


export function Demo() {
  const initialProjectData: ProjectData = {
    title: '',
    description: '',
    features: [],
    technologies: [],
    difficulty: '',
    project_type: '',
    use_case: '',
    estimated_time: '',
    required_skills: [],
    target_audience: '',
    learning_outcomes: [],
    project_breakdown: {}
  }
 const [data,setdata] = useState<ProjectData>(initialProjectData)
 useEffect(function(){
  const call = async function(){
    const dataa =localStorage.getItem("ProjectDetails");
    console.log(data)

    const response = await fetch('http://localhost:8000/fullplan',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        },
        body:dataa,
        });
       
        
   
    const result = await response.json();
    console.log(result);
    setdata(result)
      }
    call();

 },[data])
  return (
    <div className="flex items-center min-h-screen justify-center w-full flex-col px-4">
     <ProjectTree projectData={data}/>
    </div>
  );
}
