import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full h-full flex"
        >
            <div className="group relative w-full h-full flex flex-col rounded-lg bg-foreground/5 border border-foreground/10 overflow-hidden backdrop-blur-md hover:bg-foreground/10 hover:border-primary/50 transition-colors duration-500">
                {/* Visual/Image */}
                <div className="relative h-48 w-full bg-background/50 border-b border-foreground/5 overflow-hidden shrink-0">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-50" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                            {project.role}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 rounded-md bg-foreground/5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground border border-foreground/5"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="px-2 py-1 rounded-md bg-foreground/5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground border border-foreground/5">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 mt-auto pt-4">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 text-white text-sm font-bold rounded-lg border-b-[4px] border-blue-800 hover:bg-blue-500 active:border-b-0 active:translate-y-[4px] transition-all">
                                <Github size={18} /> GitHub
                            </a>
                        )}
                        {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-foreground text-background text-sm font-bold rounded-lg border-b-[4px] border-foreground/50 hover:opacity-90 active:border-b-0 active:translate-y-[4px] transition-all">
                                <ExternalLink size={18} /> Web
                            </a>
                        )}
                    </div>
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
