import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
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

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                {/* Education Section */}
                <div className="flex flex-col items-center justify-center mb-16">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-[1.1] tracking-tight"
                    >
                        {t.education.title}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-between mb-20">
                    {t.education.items.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative flex items-stretch bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 w-full"
                        >
                            {/* Left colored bar */}
                            <div className="w-16 md:w-24 shrink-0 bg-[#0e2db5] relative overflow-hidden">
                                <div className="absolute -right-8 -top-8 w-24 h-24 border border-white/20 rounded-full" />
                                <div className="absolute -left-8 -bottom-8 w-32 h-32 border border-white/20 rounded-full" />
                            </div>

                            {/* Floating Icon Box */}
                            <div className="absolute left-10 md:left-16 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#133df6] rounded-xl flex items-center justify-center shadow-md border-[3px] md:border-4 border-white z-10">
                                <GraduationCap className="text-white w-5 h-5 md:w-7 md:h-7" />
                            </div>

                            {/* Content */}
                            <div className="py-6 pr-6 md:py-8 md:pr-8 pl-10 md:pl-12 flex-1 flex flex-col justify-center">
                                <span className="text-gray-500 font-semibold text-xs md:text-sm uppercase tracking-wider mb-1">{edu.school}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">{edu.degree}</h3>

                                <div className="flex flex-wrap gap-3 items-center mt-2">
                                    <div className="flex items-center gap-1.5 text-[#133df6] font-semibold text-xs md:text-sm bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                        <Calendar size={14} />
                                        <span>{edu.year}</span>
                                    </div>
                                </div>
                                {edu.description && (
                                    <p className="text-gray-600 text-sm mt-4 font-normal leading-relaxed">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
                    {t.education.courses.items.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="relative flex items-stretch bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 w-full min-h-[120px]"
                        >
                            {/* Left colored bar */}
                            <div className="w-8 md:w-10 shrink-0 bg-[#0e2db5] relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-12 h-12 border border-white/20 rounded-full" />
                                <div className="absolute -left-4 -bottom-4 w-16 h-16 border border-white/20 rounded-full" />
                            </div>

                            {/* Floating Icon Box */}
                            <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#133df6] rounded-xl flex items-center justify-center shadow-md border-[2px] md:border-[3px] border-white z-10">
                                <Award className="text-white w-3 h-3 md:w-4 md:h-4" />
                            </div>

                            {/* Content */}
                            <div className="py-4 pr-4 pl-6 md:pl-7 flex-1 flex flex-col justify-center">
                                <span className="text-gray-500 font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-1 line-clamp-1">{course.institution}</span>
                                <h4 className="text-sm md:text-base font-bold text-gray-900 mb-2 leading-tight line-clamp-2">{course.title}</h4>

                                <div className="flex items-center gap-1 text-[#133df6] font-semibold text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 w-fit">
                                    <Calendar size={10} />
                                    <span>{course.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
