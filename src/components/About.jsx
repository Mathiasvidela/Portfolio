import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="relative min-h-auto bg-[#133df6] overflow-hidden py-5 md:py-10 flex items-center">
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
            <div className="absolute left-[-2%] top-[15%] md:top-[15%] text-[20vw] md:text-[16vw] font-black text-transparent whitespace-nowrap leading-[0.85] opacity-20 pointer-events-none z-0" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                CODE<br />
                ARCHIT
            </div>

            {/* Right vertical text */}
            <div className="absolute right-[2%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-0">
                <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase">Soluciones que escalan</span>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left space with User's Terminal Image */}
                    <div className="lg:col-span-4 xl:col-span-5 relative z-50 flex items-center justify-center w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full flex justify-center"
                        >
                            <motion.img
                                src="/imagecmd.webp"
                                alt="Command Terminal Interface"
                                className="w-full max-w-[420px] h-auto object-contain rounded-lg"
                                animate={{
                                    y: [0, -12, 0]
                                }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </div>



                    <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center items-center">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >


                            {/* Main Content */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                                {t.about.titlePart1} <br className="hidden md:block" />
                                <span className="font-serif italic text-2xl md:text-5xl">{t.about.titlePart2}</span>
                            </h2>

                            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed font-light">
                                {t.about.description}
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
