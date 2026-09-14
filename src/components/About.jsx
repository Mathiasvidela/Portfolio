import CodeKey from './CodeKey';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="relative overflow-hidden bg-[#133df6] py-16 text-white md:py-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-x-0 top-[27%] h-px bg-white/10" />
                <div className="absolute inset-x-0 bottom-[16%] h-px bg-white/10" />
                <div className="absolute bottom-0 left-[5%] top-0 w-px bg-white/10" />
                <div className="absolute bottom-0 right-[5%] top-0 w-px bg-white/10" />
                <div data-parallax="45" className="absolute -left-[2%] top-[8%] font-heading text-[clamp(8rem,20vw,22rem)] font-black uppercase leading-[0.75] text-transparent opacity-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,.65)' }}>
                    Code
                </div>
                <div data-parallax="-30" className="absolute -bottom-[2%] -left-[1%] font-heading text-[clamp(5rem,10.5vw,12rem)] font-black uppercase leading-none text-transparent opacity-20" style={{ WebkitTextStroke: '1px rgba(255,255,255,.65)' }}>
                    Architecture
                </div>
            </div>

            <div className="relative z-10 mx-auto max-w-[1800px] px-6 md:px-12 lg:px-[5vw]">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-[7vw]">
                    <CodeKey />

                    <div data-reveal>
                        <h2 className="font-heading text-[clamp(2.1rem,11.5vw,3rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl xl:text-7xl">
                            {t.about.titlePart1}
                        </h2>
                        <p className="mt-2 font-serif text-3xl italic leading-tight sm:text-4xl xl:text-5xl">
                            {t.about.titlePart2}
                        </p>

                        <p className="mt-9 max-w-2xl text-base font-normal leading-relaxed text-white/78 md:text-lg">
                            {t.about.description}
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
