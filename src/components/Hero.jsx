import { motion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
            {/* Background Gradient Blob */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-50 animate-pulse delay-1000" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground mb-6 backdrop-blur-sm">
                        {t.hero.available}
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-foreground mb-6 leading-tight">
                        {t.hero.titlePart1} <br className="hidden md:block" />
                        {t.hero.titlePart2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t.hero.titlePart3}</span>.
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="group relative px-8 py-4 bg-foreground text-background font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {t.hero.viewProjects} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>

                        <a
                            href="#contact"
                            className="px-8 py-4 bg-transparent border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/5 transition-colors backdrop-blur-sm"
                        >
                            {t.hero.contactMe}
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements (Antigravity) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-[10%] hidden lg:block opacity-20"
            >
                <div className="w-24 h-24 border border-foreground rounded-2xl transform rotate-12" />
            </motion.div>

            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/3 right-[10%] hidden lg:block opacity-20"
            >
                <div className="w-32 h-32 border border-primary rounded-full" />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-muted-foreground"
            >
                <MousePointer2 size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;
