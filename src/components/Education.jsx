import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6">
                {/* Education Section */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-16 text-center"
                >
                    {t.education.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
                    {t.education.items.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-2xl bg-background border border-foreground/5 hover:border-primary/30 transition-colors shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{edu.school}</h3>
                                    <p className="text-primary text-sm font-medium">{edu.degree}</p>
                                </div>
                                <GraduationCap className="text-muted-foreground" size={24} />
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">{edu.year}</p>
                            <p className="text-muted-foreground leading-relaxed">
                                {edu.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Courses Section */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-12 text-center"
                >
                    {t.education.courses.title}
                </motion.h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {t.education.courses.items.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="p-6 rounded-xl bg-background border border-foreground/5 hover:border-accent/30 transition-colors shadow-sm group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Award className="text-accent" size={20} />
                                <span className="text-xs font-medium text-muted-foreground bg-foreground/5 px-2 py-1 rounded-full">
                                    {course.year}
                                </span>
                            </div>
                            <h4 className="text-base font-bold text-foreground mb-1 group-hover:text-accent transition-colors line-clamp-2">
                                {course.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {course.institution}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
