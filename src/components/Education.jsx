import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t } = useLanguage();

    return (
        <section id="education" className="relative py-24 bg-[#133df6] overflow-hidden">
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Left vertical line */}
                <div className="absolute left-[8%] md:left-[5%] top-0 bottom-0 w-[1px] bg-white/10"></div>
                {/* Right vertical line */}
                <div className="absolute right-[8%] md:right-[5%] top-0 bottom-0 w-[1px] bg-white/10"></div>
                {/* Bottom horizontal line */}
                <div className="absolute bottom-[10%] left-0 right-0 h-[1px] bg-white/10"></div>

                {/* Crosses at intersections */}
                <div className="absolute left-[8%] md:left-[5%] top-[15%] w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>
                </div>
                <div className="absolute right-[8%] md:right-[5%] bottom-[10%] w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>
                </div>
            </div>

            {/* Background Outlined Text */}
            <div className="absolute right-[-2%] top-[10%] md:top-[15%] text-[20vw] md:text-[16vw] font-black text-transparent whitespace-nowrap leading-[0.85] opacity-20 pointer-events-none z-0 text-right" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                LEARN<br />
                ING
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Education Section */}
                <div className="flex flex-col items-center justify-center mb-16">
                    {/* <div className="flex items-center gap-6 mb-6 w-full max-w-xl justify-center">
                        <div className="h-[1px] w-12 bg-white/20 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                        </div>
                        <span className="text-yellow-400 font-bold text-xs tracking-[0.2em] uppercase whitespace-nowrap">03 / EDUCATION</span>
                        <div className="h-[1px] w-12 bg-white/20 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                        </div>
                    </div> */}

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-[1.1] tracking-tight"
                    >
                        {t.education.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32">
                    {t.education.items.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{edu.school}</h3>
                                    <p className="text-blue-100 text-sm font-medium">{edu.degree}</p>
                                </div>
                                <GraduationCap className="text-white/60" size={24} />
                            </div>
                            <p className="text-white/50 text-sm mb-4">{edu.year}</p>
                            <p className="text-white/80 leading-relaxed font-light">
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
                    className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
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
                            className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm transition-colors group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Award className="text-yellow-400" size={20} />
                                <span className="text-xs font-medium text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-full">
                                    {course.year}
                                </span>
                            </div>
                            <h4 className="text-base font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                                {course.title}
                            </h4>
                            <p className="text-sm text-white/60 font-light">
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
