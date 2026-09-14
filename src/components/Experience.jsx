import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProjectMotion } from '../lib/useProjectMotion';

const Experience = () => {
    const { t, language } = useLanguage();
    const projects = t.experience.projects.slice(0, 3);
    const root = useRef(null);
    const navigate = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pinned, setPinned] = useState(false);
    useProjectMotion(root, language, navigate, setActiveIndex, setPinned);

    const selectProject = (index) => navigate.current?.(index);
    const onNavigationKey = (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const index = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1
            : Math.max(0, Math.min(projects.length - 1, activeIndex + (event.key === 'ArrowRight' ? 1 : -1)));
        selectProject(index);
        root.current.querySelectorAll('.project-chapter')[index]?.focus({ preventScroll: true });
    };

    return (
        <section ref={root} id="projects" className="projects-scroll" aria-labelledby="projects-heading">
            <div className="projects-scroll__stage">
                <header className="projects-scroll__header">
                    <div>
                        <p className="projects-scroll__eyebrow">{t.experience.scrollEyebrow}</p>
                        <h2 id="projects-heading">{t.experience.title}</h2>
                    </div>
                    <p className="projects-scroll__intro">{t.experience.subtitle}</p>
                </header>

                <div className="projects-scroll__board">
                    <span className="projects-scroll__code" aria-hidden="true">{'</>'}</span>
                    {projects.map((project, index) => (
                        <article key={project.github} id={`project-scene-${index}`} className="project-scene"
                            aria-labelledby={`project-title-${index}`} aria-hidden={pinned && activeIndex !== index ? true : undefined}
                            inert={pinned && activeIndex !== index}>
                            <div className="project-scene__visual">
                                <span className="project-scene__backplate project-scene__backplate--far" aria-hidden="true" />
                                <span className="project-scene__backplate" aria-hidden="true" />
                                <a className="project-scene__card" href={project.url || project.github} target="_blank" rel="noopener noreferrer" aria-label={`${t.experience.openProject}: ${project.title}`}>
                                    <img src={project.image} alt="" loading="lazy" draggable="false" />
                                    <span className="project-scene__shade" />
                                    <span className="project-reflection" aria-hidden="true" />
                                    <span className="project-scene__card-caption"><span>{project.role}</span><ArrowUpRight size={20} aria-hidden="true" /></span>
                                </a>
                            </div>
                            <div className="project-scene__copy">
                                <div data-project-copy>
                                    <p className="project-scene__role"><span aria-hidden="true">0{index + 1}</span> {project.role}</p>
                                    <h3 id={`project-title-${index}`}>{project.title}</h3>
                                </div>
                                <div data-project-copy>
                                    <p className="project-scene__label">{t.experience.solution}</p>
                                    <p className="project-scene__description">{project.description}</p>
                                </div>
                                <div data-project-copy>
                                    <p className="project-scene__label">{t.experience.tools}</p>
                                    <ul className="project-scene__tech">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                                </div>
                                <div data-project-copy className="project-scene__links">
                                    {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link project-link--primary">{t.experience.liveDemo}<ArrowUpRight size={16} /></a>}
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link"><Github size={16} />{t.experience.sourceCode}</a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <footer className="projects-scroll__footer" hidden={!pinned}>
                    <div className="projects-scroll__progress" aria-hidden="true"><span /></div>
                    <div className="projects-scroll__controls">
                        <p><ArrowDown size={14} aria-hidden="true" />{t.experience.scrollHint}</p>
                        <nav aria-label={t.experience.projectNavigation} onKeyDown={onNavigationKey}>
                            {projects.map((project, index) => <button key={project.github} type="button" className="project-chapter" onClick={() => selectProject(index)} aria-label={`${t.experience.showProject} ${project.title}`} aria-controls={`project-scene-${index}`} aria-current={activeIndex === index ? 'true' : undefined}><span aria-hidden="true">0{index + 1}</span><span className="project-chapter__name">{project.title}</span></button>)}
                        </nav>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Experience;
