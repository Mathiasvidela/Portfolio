import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaJava } from 'react-icons/fa';
import {
    SiReact,
    SiJavascript,
    SiPostgresql,
    SiTailwindcss,
    SiNodedotjs,
    SiGit,
    SiHtml5,
    SiCss3,
    SiPostman,
    SiSpringboot,
    SiHibernate
} from 'react-icons/si';

const CustomCSharpIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="1em" height="1em" {...props}>
        <path fill="currentColor" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
        <path fill="currentColor" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
        <path className="fill-background" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z" />
    </svg>
);

const techs = [
    { name: 'SQL', color: '#00758F', icon: SiPostgresql }, // Bluish (PostgreSQL style)
    { name: 'Java', color: '#E76F00', icon: FaJava },
    { name: 'Spring Boot', color: '#6DB33F', icon: SiSpringboot },
    { name: 'JPA', color: '#59666C', icon: SiHibernate },
    { name: 'C#', color: '#D946EF', icon: CustomCSharpIcon }, // Violet/Pink (Fuchsia 500)
    { name: 'HTML', color: '#E34F26', icon: SiHtml5 },
    { name: 'CSS', color: '#1572B6', icon: SiCss3 },
    { name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript }, // Yellow
    { name: 'React', color: '#61DAFB', icon: SiReact },
    { name: 'Tailwind CSS', color: '#38B2AC', icon: SiTailwindcss },
    { name: 'Git', color: '#F05032', icon: SiGit },
    { name: 'Postman', color: '#FF6C37', icon: SiPostman },
];

const TechStack = () => {
    const { t } = useLanguage();

    return (
        <section id="tech" className="py-24 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center">
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
                            className="px-6 py-4 rounded-lg bg-background border border-foreground/10 backdrop-blur-sm cursor-pointer transition-all duration-100 ease-in-out shadow-sm group flex items-center gap-3"
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
                                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-100"
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
