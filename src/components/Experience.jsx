import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Entrance: Fade in and slide up
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Exit: Slide to left
    const x = useTransform(scrollYProgress, [0.7, 1], [0, -100]);
    const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity, x, scale }}
            className="w-full max-w-4xl mx-auto mb-24 last:mb-0"
        >
            <div className="group relative rounded-3xl bg-foreground/5 border border-foreground/10 overflow-hidden backdrop-blur-sm hover:border-primary/50 transition-colors duration-500">
                <div className="grid md:grid-cols-2 gap-8 p-8 items-center">

                    {/* Content */}
                    <div className="order-2 md:order-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                                {project.role}
                            </span>
                        </div>

                        <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full bg-foreground/5 text-xs text-muted-foreground border border-foreground/5"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
                                View Project <ExternalLink size={16} />
                            </a>
                            <a href="#" className="flex items-center gap-2 text-muted-foreground font-medium hover:text-foreground transition-colors">
                                Source Code <Github size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Visual/Image Placeholder */}
                    <div className="order-1 md:order-2 relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-background/50 border border-foreground/5 group-hover:border-foreground/10 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Abstract Shape */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-full blur-[50px] opacity-60 animate-pulse" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-32 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-24 text-center"
                >
                    {t.experience.title}
                </motion.h2>

                <div className="relative">
                    {t.experience.projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
