import { Project, Skill, SocialLink } from './types';

// NOTE: We use an absolute path assuming the 'images' folder is inside the 'public' directory.
// INSTRUCTIONS:
// 1. Create a folder named 'public' in the project root.
// 2. Move the 'images' folder INSIDE the 'public' folder.
// 3. Ensure the file path is 'public/images/profile.png'.
export const PROFILE_IMAGE_URL = "/images/profile.png";

export const PORTFOLIO_OWNER = "Shashank Krishna Vempati";
export const JOB_TITLE = "AI Researcher & ML Engineer";
export const TAGLINE = "Bridging the gap between Computer Vision research and scalable AI solutions.";

export const BIO_PARAGRAPHS = [
  "I am a Master of Science (Research) scholar in Artificial Intelligence at IIT Delhi, specializing in Computer Vision and Optical Character Recognition (OCR) under the guidance of Prof. Chetan Arora. Ranked 1st in my department with a GPA of 9.58, my research focuses on building robust visual intelligence systems for complex, real-world text and document understanding tasks.",
  "I am currently working as a Machine Learning Engineer at Typeface.AI, where I design and build scalable video generation frameworks and meta-intelligence for conversational agents. My work focuses on translating cutting-edge research into reliable, production-grade ML systems that operate at scale. Prior to this, I developed enterprise security solutions at Salesforce and built forgery detection pipelines at Newron AI, giving me strong exposure to both applied research and real-world deployments.",
  "What defines me best is my ability to operate seamlessly across research and engineering. I am deeply invested in open-source and inclusive AI, having led the 'Lipikar' project under the government-led Bhashini AI initiative to digitize 22 Indian languages during my time at IIT Delhi. Beyond my core work, I actively solve algorithmic problems (top 10% on LeetCode) and continuously explore emerging advances in multimodal large language models, driven by a strong bias toward impact and scalability."
];

export const SKILLS: Skill[] = [
  { name: "Python / C++", level: 98, category: "Frontend" }, // Mapped to primary coding
  { name: "PyTorch & CV", level: 95, category: "Backend" }, // Mapped to core ML
  { name: "Deep Learning", level: 92, category: "Backend" },
  { name: "LLMs / MLLMs", level: 90, category: "Tools" },
  { name: "OpenCV", level: 88, category: "Tools" },
  { name: "SQL & Databases", level: 85, category: "Backend" },
  { name: "Apex (Salesforce)", level: 80, category: "Frontend" },
  { name: "Azure DevOps", level: 75, category: "Tools" },
];

// Note: Using generic AI/Tech images as placeholders. 
// You can replace these with screenshots of your actual papers/projects later.
export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Spatial Text in MLLMs",
    description: "A reverse localization framework aimed at improving Multimodal LLMs (like QwenVL) in interpreting spatially embedded text. Achieved a 10% accuracy boost across diverse datasets using a custom 27K QA pair dataset.",
    technologies: ["PyTorch", "LLMs", "Transformers", "Python"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ShashankKrishnaV",
    liveUrl: "https://github.com/ShashankKrishnaV"
  },
  {
    id: "2",
    title: "Lipikar OCR System",
    description: "Spearheaded a team to develop an End-to-End OCR system for 22 official Indian languages. Integrated into the Government-led Bhashini AI initiative, recognizing both printed and scene text.",
    technologies: ["OCR", "Deep Learning", "Computer Vision", "Python"],
    imageUrl: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ShashankKrishnaV",
    liveUrl: "https://bhashini.gov.in/" 
  },
  {
    id: "3",
    title: "Hierarchical Text Detection",
    description: "Accepted in ACM ICVGIP 2025. A two-stage segmentation framework leveraging SAM backbone and Def-DETR decoder. Surpassed SoTA benchmarks across 9 datasets with a 16% boost in F1 score on high-res images.",
    technologies: ["SAM", "Def-DETR", "Segmentation", "Research"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ShashankKrishnaV",
    liveUrl: "https://github.com/ShashankKrishnaV"
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/ShashankKrishnaV", iconName: "Github" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/shashank-krishna-vempati/", iconName: "Linkedin" },
  { platform: "Email", url: "mailto:vempatishashankbzy@gmail.com", iconName: "Mail" },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for Shashank's portfolio website. 
Your goal is to answer questions about Shashank's professional experience, research in AI, and skills.
Be professional, concise, and scientifically accurate. 

**NOTE:** If asked anything not related to Shashank and his profile, reply gracefully that the assistant is only designed to answer questions on Shashank and his profile.

Context:
Name: ${PORTFOLIO_OWNER}
Title: ${JOB_TITLE}
Tagline: ${TAGLINE}
Bio: ${BIO_PARAGRAPHS.join(' ')}
Education: MS (Research) in AI from IIT Delhi (GPA 9.58, Rank 1); B.Tech IT from SASTRA University (GPA 9.24).
Skills: ${SKILLS.map(s => s.name).join(', ')}
Experience: ML Engineer at Typeface.AI
Previous Experience: Research Intern at Newron AI, Associate Technical Consultant at Salesforce (after B.Tech).
Projects: ${PROJECTS.map(p => `${p.title}: ${p.description} (Tech: ${p.technologies.join(', ')})`).join('; ')}
Research Areas: Computer Vision, OCR, MLLMs, Document Intelligence.
Contact: vempatishashankbzy@gmail.com
`;