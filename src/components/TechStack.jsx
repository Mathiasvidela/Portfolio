import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { FaJava } from 'react-icons/fa';
import {
    SiCss3,
    SiGit,
    SiHibernate,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiPostgresql,
    SiPostman,
    SiReact,
    SiSpringboot,
    SiTailwindcss,
} from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';

const CSharpIcon = (props) => (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
        <path fill="currentColor" d="M115.4 30.7 67.1 2.9a6.5 6.5 0 0 0-6.2 0l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 2 1.2 4.4 2.9 5.4l48 27.8a6.5 6.5 0 0 0 6.2 0l48.3-27.8c1.7-1 2.6-3.5 2.6-5.4V36.2c0-2-1-4.5-2.6-5.5Z" />
        <path fill="#512BD4" d="M85.3 76.1A24.4 24.4 0 1 1 85.3 52l13-7.5A39.5 39.5 0 1 0 98.2 83.7l-12.9-7.6ZM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h2.4v-4.7H97Zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3Z" />
    </svg>
);

const pieces = [
    { id: 'sql', label: 'SQL', icon: SiPostgresql, color: '#336791', text: '#ffffff' },
    { id: 'java', label: 'JAVA', icon: FaJava, color: '#E76F00', text: '#ffffff' },
    { id: 'spring', label: 'SPRING BOOT', icon: SiSpringboot, color: '#6DB33F', text: '#ffffff' },
    { id: 'jpa', label: 'JPA', icon: SiHibernate, color: '#59666C', text: '#ffffff' },
    { id: 'csharp', label: 'C#', icon: CSharpIcon, color: '#512BD4', text: '#ffffff' },
    { id: 'html', label: 'HTML', icon: SiHtml5, color: '#E34F26', text: '#ffffff' },
    { id: 'css', label: 'CSS', icon: SiCss3, color: '#1572B6', text: '#ffffff' },
    { id: 'javascript', label: 'JAVASCRIPT', icon: SiJavascript, color: '#F7DF1E', text: '#111111' },
    { id: 'react', label: 'REACT', icon: SiReact, color: '#61DAFB', text: '#08131a' },
    { id: 'tailwind', label: 'TAILWIND CSS', icon: SiTailwindcss, color: '#06B6D4', text: '#071317' },
    { id: 'git', label: 'GIT', icon: SiGit, color: '#F05032', text: '#ffffff' },
    { id: 'postman', label: 'POSTMAN', icon: SiPostman, color: '#FF6C37', text: '#ffffff', extraWidth: 28 },
    { id: 'mongodb', label: 'MONGODB', icon: SiMongodb, color: '#47A248', text: '#ffffff', extraWidth: 28 },
];

const getPieceSize = (piece, compact) => {
    const labelLength = piece.label.replace(/\s/g, '').length;
    const baseWidth = compact
        ? Math.min(180, Math.max(132, 108 + labelLength * 8))
        : Math.min(230, Math.max(154, 126 + labelLength * 9));
    const width = baseWidth + (compact ? (piece.extraWidth ?? 0) * 0.65 : piece.extraWidth ?? 0);
    return { width, height: compact ? 64 : 82 };
};

const TechStack = () => {
    const { t } = useLanguage();
    const stageRef = useRef(null);
    const engineRef = useRef(null);
    const bodiesRef = useRef(new Map());
    const pieceRefs = useRef(new Map());
    const frameRef = useRef(null);
    const observerRef = useRef(null);
    const dragRef = useRef(null);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setReducedMotion(media.matches);
        updatePreference();
        media.addEventListener('change', updatePreference);
        return () => media.removeEventListener('change', updatePreference);
    }, []);

    useEffect(() => {
        if (reducedMotion || !stageRef.current) return undefined;

        const stage = stageRef.current;
        const { Engine, Bodies, Composite } = Matter;
        const engine = Engine.create({ gravity: { x: 0, y: 1.05, scale: 0.001 } });
        engineRef.current = engine;

        const buildWorld = () => {
            const width = stage.clientWidth;
            const height = stage.clientHeight;
            const compact = width < 640;
            Composite.clear(engine.world, false);
            bodiesRef.current.clear();

            const thickness = 80;
            const boundaries = [
                Bodies.rectangle(width / 2, height + thickness / 2 - 4, width + thickness * 2, thickness, { isStatic: true }),
                Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, { isStatic: true }),
                Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, { isStatic: true }),
            ];

            const bodies = pieces.map((piece, index) => {
                const size = getPieceSize(piece, compact);
                const x = Math.max(size.width / 2 + 12, Math.min(width - size.width / 2 - 12, width * ((index + 1) / (pieces.length + 1))));
                const y = -size.height * (1.5 + (index % 5) * 1.3);
                const options = {
                    restitution: 0.42,
                    friction: 0.55,
                    frictionAir: 0.012,
                    density: 0.002,
                    chamfer: { radius: 8 },
                    angle: ((index % 5) - 2) * 0.12,
                };
                const body = Bodies.rectangle(x, y, size.width, size.height, options);
                body.plugin = { pieceId: piece.id, size };
                bodiesRef.current.set(piece.id, body);
                return body;
            });

            Composite.add(engine.world, [...boundaries, ...bodies]);
        };

        buildWorld();
        setReady(true);

        let lastTime = performance.now();
        let running = false;
        const tick = (time) => {
            if (!running) return;
            Engine.update(engine, Math.min(time - lastTime, 16.667));
            lastTime = time;
            bodiesRef.current.forEach((body, id) => {
                const node = pieceRefs.current.get(id);
                if (!node) return;
                node.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
            });
            frameRef.current = requestAnimationFrame(tick);
        };

        observerRef.current = new IntersectionObserver(([entry]) => {
            running = entry.isIntersecting;
            if (running) {
                lastTime = performance.now();
                cancelAnimationFrame(frameRef.current);
                frameRef.current = requestAnimationFrame(tick);
            } else {
                cancelAnimationFrame(frameRef.current);
            }
        }, { threshold: 0.08 });
        observerRef.current.observe(stage);

        const onResize = () => {
            setReady(false);
            buildWorld();
            setReady(true);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            observerRef.current?.disconnect();
            cancelAnimationFrame(frameRef.current);
            Engine.clear(engine);
            engineRef.current = null;
        };
    }, [reducedMotion]);

    const handlePointerDown = (event, id) => {
        const body = bodiesRef.current.get(id);
        const stage = stageRef.current;
        if (!body || !stage) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = stage.getBoundingClientRect();
        const pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        Matter.Body.setStatic(body, true);
        dragRef.current = {
            id,
            pointerId: event.pointerId,
            offset: { x: body.position.x - pointer.x, y: body.position.y - pointer.y },
            previous: pointer,
            previousTime: performance.now(),
            velocity: { x: 0, y: 0 },
        };
    };

    const handlePointerMove = (event, id) => {
        const drag = dragRef.current;
        const body = bodiesRef.current.get(id);
        const stage = stageRef.current;
        if (!drag || drag.id !== id || drag.pointerId !== event.pointerId || !body || !stage) return;
        const rect = stage.getBoundingClientRect();
        const pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        const now = performance.now();
        const elapsed = Math.max(now - drag.previousTime, 8);
        drag.velocity = {
            x: ((pointer.x - drag.previous.x) / elapsed) * 16.67,
            y: ((pointer.y - drag.previous.y) / elapsed) * 16.67,
        };
        drag.previous = pointer;
        drag.previousTime = now;
        Matter.Body.setPosition(body, { x: pointer.x + drag.offset.x, y: pointer.y + drag.offset.y });
    };

    const releasePiece = (event, id) => {
        const drag = dragRef.current;
        const body = bodiesRef.current.get(id);
        if (!drag || drag.id !== id || !body) return;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        Matter.Body.setStatic(body, false);
        Matter.Body.setVelocity(body, {
            x: Math.max(-18, Math.min(18, drag.velocity.x)),
            y: Math.max(-18, Math.min(18, drag.velocity.y)),
        });
        dragRef.current = null;
    };

    return (
        <section id="tech" className="relative overflow-hidden bg-[#080b16] text-white">
            <div
                className="pointer-events-none absolute inset-0 opacity-25"
                aria-hidden="true"
                style={{
                    backgroundImage: 'linear-gradient(rgba(19,61,246,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(19,61,246,.24) 1px, transparent 1px)',
                    backgroundSize: 'clamp(72px, 10vw, 150px) clamp(72px, 10vw, 150px)',
                }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 pb-8 pt-16 md:px-12 md:pt-24">
                <div className="mb-8 text-center md:mb-10">
                    <h2 data-reveal aria-label={t.tech.title} className="font-heading text-[clamp(2.45rem,11.5vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
                        <span className="block">{t.tech.titleLine1}</span>
                        <span className="block">{t.tech.titleLine2}</span>
                    </h2>
                </div>

                {reducedMotion ? (
                    <div className="flex min-h-[340px] flex-wrap content-end items-end justify-center gap-3 border-b-2 border-black pb-5 md:gap-5">
                        {pieces.map((piece) => (
                            <span
                                key={piece.id}
                                className="tech-piece static-tech-piece"
                                style={{ '--piece-color': piece.color, '--piece-text': piece.text }}
                            >
                                <piece.icon className="tech-piece__icon" />
                                <span>{piece.label}</span>
                            </span>
                        ))}
                    </div>
                ) : (
                    <div
                        ref={stageRef}
                        className="relative h-[460px] touch-pan-y overflow-hidden border-b-2 border-black sm:h-[520px] lg:h-[570px]"
                        aria-label={t.tech.physicsLabel}
                    >
                        {pieces.map((piece) => {
                            const size = getPieceSize(piece, false);
                            const compactSize = getPieceSize(piece, true);
                            return (
                                <button
                                    key={piece.id}
                                    ref={(node) => node ? pieceRefs.current.set(piece.id, node) : pieceRefs.current.delete(piece.id)}
                                    type="button"
                                    className={`tech-piece absolute left-0 top-0 select-none ${ready ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                        '--piece-width': `${size.width}px`,
                                        '--piece-height': `${size.height}px`,
                                        '--piece-width-compact': `${compactSize.width}px`,
                                        '--piece-height-compact': `${compactSize.height}px`,
                                        '--piece-color': piece.color,
                                        '--piece-text': piece.text,
                                    }}
                                    onPointerDown={(event) => handlePointerDown(event, piece.id)}
                                    onPointerMove={(event) => handlePointerMove(event, piece.id)}
                                    onPointerUp={(event) => releasePiece(event, piece.id)}
                                    onPointerCancel={(event) => releasePiece(event, piece.id)}
                                    aria-label={`${piece.label}. ${t.tech.dragLabel}`}
                                >
                                    <piece.icon className="tech-piece__icon" />
                                    <span>{piece.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className="border-t border-white/10 py-6" aria-label={t.tech.staticListLabel}>
                    <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/55 sm:text-xs">
                        {pieces.map((piece, index) => (
                            <li key={piece.id} className="flex items-center gap-4">
                                <span>{piece.label}</span>
                                {index < pieces.length - 1 && <span className="text-[#133df6]/70" aria-hidden="true">·</span>}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default TechStack;
