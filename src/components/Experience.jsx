import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const wrapIndex = (index, length) => (index + length) % length;

const Experience = () => {
    const { t } = useLanguage();
    const projects = t.experience.projects.slice(0, 3);
    const [activeIndex, setActiveIndex] = useState(0);
    const wheelLocked = useRef(false);

    const move = (direction) => {
        setActiveIndex((current) => wrapIndex(current + direction, projects.length));
    };

    const getPosition = (index) => {
        let difference = index - activeIndex;
        if (difference > projects.length / 2) difference -= projects.length;
        if (difference < -projects.length / 2) difference += projects.length;

        if (difference === 0) {
            return { x: '-50%', y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 30 };
        }

        const isRight = difference > 0;
        return {
            x: isRight ? '48%' : '-148%',
            y: 36,
            rotate: isRight ? 13 : -13,
            scale: 0.88,
            opacity: 0.78,
            zIndex: 20,
        };
    };

    const handleWheel = (event) => {
        if (wheelLocked.current || Math.abs(event.deltaX) < 14) return;

        wheelLocked.current = true;
        move(event.deltaX > 0 ? 1 : -1);
        window.setTimeout(() => {
            wheelLocked.current = false;
        }, 650);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') move(1);
        if (event.key === 'ArrowLeft') move(-1);
    };

    const handleDragEnd = (_, info) => {
        if (info.offset.x < -70 || info.velocity.x < -500) move(1);
        if (info.offset.x > 70 || info.velocity.x > 500) move(-1);
    };

    return (
        <section id="projects" className="relative overflow-hidden bg-[#080b16] py-20 text-white md:py-28">
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                aria-hidden="true"
                style={{
                    backgroundImage: 'radial-gradient(rgba(19,61,246,.55) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1600px] px-5 text-center md:px-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-heading text-[clamp(2.5rem,11.5vw,3rem)] font-black uppercase leading-none tracking-[-0.045em] sm:text-6xl lg:text-8xl"
                >
                    {t.experience.title}
                </motion.h2>
                <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:text-base md:text-lg">
                    {t.experience.subtitle}
                </p>
            </div>

            <div
                className="relative mx-auto mt-14 h-[480px] w-full max-w-[1700px] outline-none sm:h-[590px] lg:mt-16 lg:h-[640px]"
                role="region"
                aria-roledescription="carousel"
                aria-label={t.experience.carouselLabel}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
            >
                <motion.div
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                >
                    {projects.map((project, index) => {
                        const position = getPosition(index);
                        const isActive = index === activeIndex;
                        const projectUrl = project.url || project.github;

                        return (
                            <motion.a
                                key={project.title}
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                animate={position}
                                transition={{ type: 'spring', stiffness: 115, damping: 18, mass: 0.8 }}
                                className="group absolute left-1/2 top-0 block aspect-square w-[min(72vw,500px)] overflow-hidden rounded-xl border border-white/10 bg-[#111525] shadow-[0_30px_90px_rgba(0,0,0,.5)] sm:w-[min(60vw,540px)]"
                                style={{ transformOrigin: '50% 115%' }}
                                aria-label={`${project.title}. ${isActive ? t.experience.openProject : t.experience.selectProject}`}
                                aria-current={isActive ? 'true' : undefined}
                                onClick={(event) => {
                                    if (!isActive) {
                                        event.preventDefault();
                                        setActiveIndex(index);
                                    }
                                }}
                            >
                                <img
                                    src={project.image}
                                    alt=""
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                                    draggable="false"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left sm:p-7">
                                    <div>
                                        <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65 sm:text-xs">
                                            {project.role}
                                        </p>
                                        <h3 className="font-heading text-3xl font-black uppercase leading-none tracking-[-0.035em] sm:text-5xl">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#133df6] text-white sm:h-14 sm:w-14">
                                        <ArrowUpRight size={24} />
                                    </span>
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>

                <div className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 text-center sm:bottom-1">
                    <a
                        href={projects[activeIndex].url || projects[activeIndex].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#133df6] px-6 py-3 font-heading text-sm font-black uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        {projects[activeIndex].title}
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>

            <div className="relative z-20 mt-4 flex justify-center gap-2" aria-label={t.experience.projectNavigation}>
                {projects.map((project, index) => (
                    <button
                        key={project.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-10 bg-[#133df6]' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                        aria-label={`${t.experience.showProject} ${project.title}`}
                        aria-current={index === activeIndex ? 'true' : undefined}
                    />
                ))}
            </div>
        </section>
    );
};

export default Experience;
