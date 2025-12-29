import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Database, Layout, Terminal, Menu, X, ChevronDown, Sparkles, Cpu, Globe } from 'lucide-react';
import { PORTFOLIO_OWNER, JOB_TITLE, BIO_PARAGRAPHS, SKILLS, PROJECTS, SOCIALS, TAGLINE, PROFILE_IMAGE_URL } from './constants';
import ChatWidget from './components/ChatWidget';

// -- Sub Components --

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  // Generate initials from the portfolio owner's name (First and Last)
  const names = PORTFOLIO_OWNER.split(' ');
  const initials = names.length >= 2 
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    : names[0].substring(0, 2).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center py-4 px-4">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`w-full max-w-5xl transition-all duration-300 rounded-2xl px-6 py-3 flex justify-between items-center ${
          scrolled 
            ? 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20' 
            : 'bg-transparent'
        }`}
      >
        <a href="#" className="text-xl font-display font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
            {initials}
          </div>
          <span className="hidden sm:block">{PORTFOLIO_OWNER}</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={SOCIALS.find(s => s.platform === 'GitHub')?.url || '#'} target="_blank" className="text-slate-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="#contact" className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-300 p-2 hover:bg-white/10 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 md:hidden"
        >
             {links.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="p-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10 my-2"/>
              <a href="#contact" onClick={() => setIsOpen(false)} className="p-4 bg-primary text-white text-center rounded-xl font-bold">
                Let's Talk
              </a>
        </motion.div>
      )}
    </nav>
  );
};

const EXPERIENCE_START_YEAR = 2025; // <-- change this when needed

const getYearsOfExperience = () => {
  const now = new Date();
  const startDate = new Date(EXPERIENCE_START_YEAR, 7, 1); // Jan 1
  const diffMs = now.getTime() - startDate.getTime();

  const yearsExact = diffMs / (1000 * 60 * 60 * 24 * 365.25);

  // round to nearest 0.5 year
  const rounded = Math.round(yearsExact * 2) / 2;

  return rounded.toFixed(1);
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid -z-20" />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-blob" />
        <motion.div style={{ y: y2 }} className="absolute top-[20%] right-[10%] w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[30%] w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-primary text-xs font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
            Available
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
            Research. <br/>
            <span className="text-slate-500">Engineer.</span> <br/>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Innovate.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            {TAGLINE}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="group bg-white text-slate-900 px-8 py-4 rounded-xl font-bold transition-all hover:bg-slate-200 flex items-center justify-center gap-2">
              See My Work 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center text-white">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative z-10 w-80 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden glass-panel p-2 animate-float shadow-2xl shadow-primary/20">
             <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                <img 
                  src={PROFILE_IMAGE_URL}
                  alt={PORTFOLIO_OWNER} 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                   <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <Cpu size={24} />
                      </div>
                      <div>
                        <div className="text-white font-bold leading-tight text-lg">{PORTFOLIO_OWNER}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">MS (R) in AI @ IIT Delhi</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Background decoration for the image */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10 opacity-60" />
        </motion.div>
      </div>

      <motion.a 
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ChevronDown size={24} className="animate-bounce" />
      </motion.a>
    </section>
  );
};

const BentoCard = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5 }}
    className={`glass-panel rounded-3xl p-6 md:p-8 hover:bg-white/5 transition-colors group relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-colors" />
    {children}
  </motion.div>
);

const About = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <motion.span 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-primary font-medium tracking-wider uppercase text-sm"
          >
            About Me
          </motion.span>
          <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6"
          >
            Thinking in AI
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl text-lg leading-relaxed"
          >
            I'm {PORTFOLIO_OWNER}, a {JOB_TITLE}. {BIO_PARAGRAPHS[0]}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Main Stats/Bio */}
           <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-center">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Real-World Impact</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {BIO_PARAGRAPHS[1]} {BIO_PARAGRAPHS[2]}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8 border-t border-white/10 pt-8">
                 <div>
                    <div className="text-3xl font-display font-bold text-white mb-1">2+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Research Papers</div>
                 </div>
                 <div>
                    <div className="text-3xl font-display font-bold text-white mb-1">{getYearsOfExperience()}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Years of Experience</div>
                 </div>
                 <div>
                    <div className="text-3xl font-display font-bold text-white mb-1">100%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Commitment</div>
                 </div>
              </div>
           </BentoCard>

           {/* Stack Cards */}
           <BentoCard delay={0.1} className="min-h-[240px]">
              <Code2 className="text-secondary mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Core Tech</h3>
              <p className="text-sm text-slate-400">Python, C++, PyTorch, OpenCV, Agents, Transformers, LLMs, LaTeX</p>
           </BentoCard>

           <BentoCard delay={0.2} className="min-h-[240px]">
              <Database className="text-accent mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Systems</h3>
              <p className="text-sm text-slate-400">Typeface, Linux, Azure DevOps, SQL, Salesforce, Git</p>
           </BentoCard>

           <BentoCard delay={0.3} className="md:col-span-3">
              <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 max-w-[70%]">
                <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Resume Snapshot
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    My resume captures my journey across research, engineering, and real-world deployments.
                  </p>
                </div>
              </div>

              <a
                href="/resume/Shashank_Resume.pdf"
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Download
              </a>
            </div>
           </BentoCard>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-secondary font-medium tracking-wider uppercase text-sm">Portfolio</span>
             <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Selected Works</h2>
           </motion.div>
           <motion.a 
             href="https://github.com/ShashankKrishnaV"
             target="_blank"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
           >
             View all on GitHub <ArrowRight size={16} />
           </motion.a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-slate-900">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/10 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.description}</p>
                </div>
                
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <a href={project.liveUrl} target="_blank" className="p-3 bg-primary hover:bg-indigo-500 rounded-full text-white shadow-lg shadow-indigo-500/30 transition-all">
                    <ExternalLink size={20} />
                  </a>
                  <a href={project.githubUrl} target="_blank" className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
           <span className="text-accent font-medium tracking-wider uppercase text-sm">Expertise</span>
           <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">Technical Arsenal</h2>
           <p className="text-slate-400 max-w-lg mx-auto">I constantly explore new technologies to find the best tools for the job.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {SKILLS.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex justify-between mb-2 items-center">
                <span className="font-semibold text-white group-hover:text-primary transition-colors">{skill.name}</span>
                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-primary to-secondary relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  // Extract email URL securely from SOCIALS or fallback
  const emailLink = SOCIALS.find(s => s.platform === 'Email')?.url || "mailto:vempatishashankbzy@gmail.com";

  return (
    <footer id="contact" className="py-24 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <div className="inline-block p-4 rounded-full bg-slate-800 mb-6">
            <Mail size={32} className="text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Ready to create <br/> the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">next big thing?</span></h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Whether you have a research idea in mind or just want to say hi, my inbox is always open.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href={emailLink}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-xl shadow-white/5 whitespace-nowrap"
            >
              Say Hello <ArrowRight size={20} />
            </a>

            <a
              href="/resume/Shashank_Resume.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 border border-white/10 transition-all whitespace-nowrap"
            >
              View Resume
            </a>
          </div>
        </motion.div>

        <div className="flex gap-4 mb-12">
           {SOCIALS.map(social => (
              <a 
                key={social.platform}
                href={social.url}
                target="_blank"
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all hover:scale-110"
              >
                {social.platform === "GitHub" && <Github size={20} />}
                {social.platform === "Twitter" && <Twitter size={20} />}
                {social.platform === "LinkedIn" && <Linkedin size={20} />}
                {social.platform === "Email" && <Mail size={20} />}
              </a>
           ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full pt-8 border-t border-white/5 text-sm text-slate-500">
           <p>© {new Date().getFullYear()} {PORTFOLIO_OWNER}. Crafted with 💜 and AI.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary/30 selection:text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;