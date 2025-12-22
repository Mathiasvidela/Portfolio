import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaJava } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';
import {
    SiReact,
    SiJavascript,
    SiPostgresql,
    SiTailwindcss,
    SiNodedotjs,
    SiGit,
    SiHtml5,
    SiCss3
} from 'react-icons/si';

const techs = [
    { name: 'Java', color: '#E76F00', icon: FaJava },
    { name: 'C#', color: '#D946EF', icon: TbBrandCSharp }, // Violet/Pink (Fuchsia 500)
    { name: 'React', color: '#61DAFB', icon: SiReact },
    { name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript }, // Yellow
    { name: 'SQL', color: '#00758F', icon: SiPostgresql }, // Bluish (PostgreSQL style)
    { name: 'Tailwind CSS', color: '#38B2AC', icon: SiTailwindcss },
    { name: 'Node.js', color: '#339933', icon: SiNodedotjs },
    { name: 'Git', color: '#F05032', icon: SiGit },
    { name: 'HTML', color: '#E34F26', icon: SiHtml5 },
    { name: 'CSS', color: '#1572B6', icon: SiCss3 },
];

const TechStack = () => {
    const { t } = useLanguage();

    return (
        <section id="tech" className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-16"
                >
                    {t.tech.title}
                </motion.h2>

                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                    {techs.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.05 }} // Faster transition
                            whileHover={{
                                y: -10,
                                scale: 1.05,
                                boxShadow: `0 0 20px ${tech.color}40`,
                                borderColor: tech.color,
                                transition: { duration: 0.1 } // Fast hover effect
                            }}
                            className="px-6 py-4 rounded-xl bg-background border border-foreground/10 backdrop-blur-sm cursor-pointer transition-all duration-100 shadow-sm group flex items-center gap-3"
                        >
                            <tech.icon
                                size={24}
                                className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                                style={{ color: undefined }} // Let CSS/Tailwind handle color or override on hover if needed
                            />

                            <span
                                className="text-lg font-medium text-muted-foreground transition-colors duration-300"
                            >
                                <span className="group-hover:text-foreground">{tech.name}</span>
                            </span>

                            {/* Optional: Add a subtle colored glow inside the card too */}
                            <div
                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-100"
                                style={{ backgroundColor: tech.color }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
