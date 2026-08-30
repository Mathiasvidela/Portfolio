import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[720px] overflow-hidden bg-[#080b16] pt-24 text-white sm:min-h-[820px] lg:min-h-screen">
            <div className="pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(rgba(19,61,246,.22) 1px, transparent 1px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse at center, black 8%, transparent 72%)' }} />

            <div className="pointer-events-none absolute inset-x-5 bottom-5 top-24 border-x border-[#133df6]/15 sm:inset-x-10" aria-hidden="true">
                <span className="absolute -left-3 top-[22%] h-6 w-6 before:absolute before:left-1/2 before:h-full before:w-px before:bg-[#133df6]/45 after:absolute after:top-1/2 after:h-px after:w-full after:bg-[#133df6]/45" />
                <span className="absolute -right-3 top-[42%] h-6 w-6 before:absolute before:left-1/2 before:h-full before:w-px before:bg-[#133df6]/45 after:absolute after:top-1/2 after:h-px after:w-full after:bg-[#133df6]/45" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1800px] flex-col px-5 sm:px-10 lg:px-14">
                <div className="relative flex min-h-[390px] flex-1 items-center justify-center pb-40 pt-8 sm:min-h-[480px] md:min-h-[550px] lg:min-h-0 lg:pb-36 lg:pt-4">
                    <div className="absolute inset-x-0 top-[9%] z-0 text-center lg:top-[5%]">
                        <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 mr-[60%] inline-block font-serif text-3xl italic text-[#133df6] sm:text-5xl lg:text-6xl">
                            {t.hero.iAm}
                        </motion.span>
                        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }} className="mt-1 font-heading text-[clamp(5.1rem,14.2vw,14.5rem)] font-black uppercase leading-[0.72] tracking-[-0.075em] text-[#133df6]">
                            <span className="block">Software</span>
                            <span className="block">Developer</span>
                        </motion.h1>
                    </div>

                    <motion.img initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }} src="/fotobn.png" alt={t.hero.portraitAlt} fetchPriority="high" loading="eager" className="pointer-events-none absolute bottom-10 z-10 w-[min(86vw,350px)] max-w-none object-contain object-bottom drop-shadow-[0_18px_18px_rgba(8,11,22,.2)] sm:bottom-8 sm:w-[min(68vw,480px)] md:bottom-6 md:w-[min(56vw,550px)] lg:bottom-4 lg:h-auto lg:max-h-[76vh] lg:w-auto" />
                </div>

                <div className="relative z-20 mb-5 border-y border-[#133df6]/45 bg-[#080b16]/95 py-4 backdrop-blur-sm lg:mb-6 lg:py-5">
                    <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
                        <div className="font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.08em] sm:text-xs">
                            <p><span className="mr-2 text-[#133df6]">●</span>{t.hero.identity}</p>
                            <p className="mt-1 text-white/65">{t.hero.role}</p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button onClick={() => scrollTo('contact')} className="rounded-lg bg-[#133df6] px-8 py-3.5 font-heading text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0e2db5] sm:px-10">
                                {t.hero.LetsBuild}
                            </button>
                            <button onClick={() => scrollTo('projects')} className="flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-heading text-sm font-black uppercase tracking-wide transition-colors hover:bg-[#133df6]/10">
                                {t.hero.viewProjects}<ArrowDownRight size={18} aria-hidden="true" />
                            </button>
                        </div>

                        <p className="font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.08em] sm:text-xs lg:max-w-[230px] lg:justify-self-end">
                            <span className="mr-2 text-[#133df6]">●</span>{t.hero.availability}
                        </p>
                    </div>
                </div>

                <p className="relative z-20 pb-5 text-center font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">
                    {t.hero.technologyLine}
                </p>
            </div>
        </section>
    );
};

export default Hero;
