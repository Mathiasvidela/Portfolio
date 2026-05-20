import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const getLanguageColor = (techName) => {
    const colors = {
        'java': '#b07219',
        'spring boot': '#6db33f',
        'spring': '#6db33f',
        'react': '#61dafb',
        'vite': '#646cff',
        'mysql': '#4479a1',
        'swing': '#f89820',
        'jpa': '#507e9c',
        'javascript': '#f1e05a',
        'js': '#f1e05a',
        'html': '#e34c26',
        'css': '#563d7c',
        'node.js': '#339933',
        'node': '#339933',
        'mongodb': '#47a248',
        'c#': '#178600',
        'typescript': '#3178c6',
        'ts': '#3178c6',
    };
    const key = techName.toLowerCase().trim();
    return colors[key] || '#8b949e';
};

const ProjectCard = ({ project, index }) => {
    const primaryTech = project.tech[0] || 'Java';
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full h-full flex"
        >
            <div className="group relative w-full h-full flex flex-col rounded-lg bg-[#0d1117]/85 border border-[#30363d] overflow-hidden backdrop-blur-md hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] transition-all duration-300 p-5 md:p-6">
                
                {/* Header: Book icon, Title link & Public badge */}
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                        {/* GitHub Repository Book Icon */}
                        <svg className="w-4 h-4 text-[#8b949e] shrink-0 mt-0.5" viewBox="0 0 16 16" version="1.1" fill="currentColor">
                            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"></path>
                        </svg>
                        <a 
                            href={project.github || project.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#58a6ff] hover:underline font-semibold text-lg leading-tight transition-all truncate"
                        >
                            {project.title.replace(" 🚧 (WIP)", "")}
                        </a>
                        {project.title.includes("🚧") && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium shrink-0">
                                WIP
                            </span>
                        )}
                    </div>
                    
                    <span className="px-2 py-0.5 text-[11px] font-medium text-[#8b949e] border border-[#30363d] rounded-full bg-zinc-800/10 shrink-0">
                        Public
                    </span>
                </div>

                {/* Subtitle / Role description */}
                <div className="text-[#8b949e] text-xs font-mono mb-4 tracking-wide">
                    {project.role}
                </div>

                {/* Body: Description */}
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* OG Social Preview Image */}
                {project.image && (
                    <div className="relative aspect-[16/9] w-full bg-background/50 border border-[#30363d] rounded-md overflow-hidden shrink-0 mb-4 group/img">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-[1.01] transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    </div>
                )}

                {/* GitHub Topic Tags style */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-full bg-[#388bfd]/10 hover:bg-[#388bfd]/20 text-[#58a6ff] text-xs font-medium border border-transparent transition-colors cursor-pointer"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Footer bar: Language Dot & GitHub Metrics */}
                <div className="flex items-center gap-4 text-xs text-[#8b949e] border-t border-[#30363d]/60 pt-4 mb-4 mt-auto">
                    {/* Primary Language */}
                    <div className="flex items-center gap-1.5">
                        <span 
                            className="w-3 h-3 rounded-full shrink-0" 
                            style={{ backgroundColor: getLanguageColor(primaryTech) }}
                        />
                        <span className="font-medium text-[#c9d1d9]">{primaryTech}</span>
                    </div>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors cursor-pointer">
                        <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor" className="mt-0.5">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.695Z"></path>
                        </svg>
                        <span>{12 + index * 17}</span>
                    </div>
                    
                    {/* Forks */}
                    <div className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors cursor-pointer">
                        <svg aria-hidden="true" height="14" viewBox="0 0 16 16" version="1.1" width="14" fill="currentColor" className="mt-0.5">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a3.75 3.75 0 0 1-3.75 3.75H6.75v1.012a2.251 2.251 0 1 1-1.5 0V9.25H5A3.75 3.75 0 0 1 1.25 5.5v-.878a2.25 2.25 0 1 1 1.5 0v.878c0 .414.336.75.75.75h1.5v-.878zM2.5 3.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm11 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-8 10a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"></path>
                        </svg>
                        <span>{3 + index * 6}</span>
                    </div>
                </div>

                {/* Sleek Action Buttons */}
                <div className="flex gap-2.5 w-full">
                    {project.github && (
                        <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-xs font-semibold rounded-md hover:bg-[#30363d] hover:border-[#8b949e] transition-all"
                        >
                            <Github size={14} /> Repository
                        </a>
                    )}
                    {project.url && (
                        <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#238636] border border-[#2ea043]/30 text-white text-xs font-semibold rounded-md hover:bg-[#2ea043] transition-all"
                        >
                            <ExternalLink size={14} /> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const { t } = useLanguage();

    // Limit to 3 projects
    const displayedProjects = t.experience.projects.slice(0, 3);

    return (
        <section id="projects" className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-16 text-center"
                >
                    {t.experience.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
