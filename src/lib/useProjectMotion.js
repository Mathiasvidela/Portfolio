import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectMotion(root, language, navigate, setActiveIndex, setPinned) {
    useLayoutEffect(() => {
        const section = root.current;
        const scenes = Array.from(section.querySelectorAll('.project-scene'));
        const media = gsap.matchMedia();
        let refreshFrame;
        let disposed = false;
        const refresh = () => {
            cancelAnimationFrame(refreshFrame);
            refreshFrame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
        };
        media.add({ desktop: '(min-width: 900px) and (min-height: 700px)', mobile: '(max-width: 899px) and (min-height: 600px)', reduced: '(prefers-reduced-motion: reduce)', all: 'all' }, ({ conditions }) => {
            const { desktop, mobile, reduced } = conditions;
            let timeline;
            let currentIndex = -1;
            let enhanced = (desktop || mobile) && !reduced;
            if (enhanced) {
                section.classList.add('projects-scroll--pinned');
                // Fall back to normal document flow if zoom or longer copy needs more room.
                const board = section.querySelector('.projects-scroll__board');
                enhanced = scenes.every((scene) => {
                    const copyHeight = scene.querySelector('.project-scene__copy').scrollHeight;
                    const visualHeight = scene.querySelector('.project-scene__visual').offsetHeight;
                    const layout = getComputedStyle(scene);
                    const spacing = parseFloat(layout.paddingTop) + parseFloat(layout.paddingBottom)
                        + (mobile ? parseFloat(layout.rowGap) : 0);
                    return (mobile ? copyHeight + visualHeight : copyHeight) + spacing <= board.clientHeight;
                });
                if (!enhanced) section.classList.remove('projects-scroll--pinned');
            }
            setPinned(enhanced);
            setActiveIndex(0);
            if (enhanced) {
                const progress = section.querySelector('.projects-scroll__progress span');
                gsap.set(scenes, { autoAlpha: 0 });
                gsap.set(scenes[0], { autoAlpha: 1 });
                gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
                const syncActive = () => {
                    const time = timeline.time();
                    const index = Math.min(scenes.length - 1, Math.floor(time + 0.25));
                    if (index === currentIndex) return;
                    if (scenes[currentIndex]?.contains(document.activeElement)) {
                        section.querySelectorAll('.project-chapter')[index]?.focus({ preventScroll: true });
                    }
                    currentIndex = index;
                    setActiveIndex(index);
                };
                timeline = gsap.timeline({ onUpdate: syncActive });
                scenes.forEach((scene, index) => {
                    timeline.addLabel(`project-${index}`, index + 0.12);
                    if (index === 0) return;
                    const previous = scenes[index - 1];
                    const start = index - 0.5;
                    timeline.to(previous, { autoAlpha: 0, duration: 0.42 }, start)
                        .to(previous.querySelectorAll('[data-project-copy]'), { opacity: 0, duration: 0.14 }, start)
                        .to(previous.querySelector('.project-scene__visual'), { x: mobile ? -35 : -65, y: -45, rotation: -8, scale: 0.9, duration: 0.55, ease: 'power2.inOut' }, start)
                        .fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, immediateRender: false }, start + 0.08)
                        .fromTo(scene.querySelector('.project-scene__visual'), { x: mobile ? 45 : 100, y: mobile ? 55 : 90, rotation: 9, scale: 0.88 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.65, ease: 'power3.out', immediateRender: false }, start)
                        .fromTo(scene.querySelectorAll('[data-project-copy]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, stagger: 0.06, ease: 'power2.out', immediateRender: false }, start + 0.14);
                });
                const duration = scenes.length - 0.55;
                timeline.to(progress, { scaleX: 1, duration, ease: 'none' }, 0);
                const trigger = ScrollTrigger.create({
                    trigger: section, start: 'top 76px', end: 'bottom bottom', animation: timeline,
                    scrub: 0.45, invalidateOnRefresh: true,
                });
                navigate.current = (index) => {
                    const time = timeline.labels[`project-${index}`];
                    if (time === undefined) return;
                    const top = trigger.start + (trigger.end - trigger.start) * (time / timeline.duration());
                    window.scrollTo({ top, behavior: 'smooth' });
                };
            } else if (!reduced) {
                scenes.forEach((scene) => {
                    gsap.fromTo(scene.querySelector('.project-scene__visual'), { y: 50, rotation: 5, scale: 0.95 }, {
                        y: 0, rotation: 0, scale: 1, ease: 'none',
                        scrollTrigger: { trigger: scene, start: 'top bottom', end: 'top 20%', scrub: 0.45 },
                    });
                    gsap.fromTo(scene.querySelectorAll('[data-project-copy]'), { y: 20, opacity: 0 }, {
                        y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity',
                        scrollTrigger: { trigger: scene.querySelector('.project-scene__copy'), start: 'top 94%', once: true },
                    });
                });
            }
            refresh();
            return () => {
                navigate.current = null;
                section.classList.remove('projects-scroll--pinned');
            };
        });
        media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
            const cleanups = scenes.map((scene) => {
                const card = scene.querySelector('.project-scene__card');
                const reflection = card.querySelector('.project-reflection');
                const xTo = gsap.quickTo(reflection, 'x', { duration: 0.35, ease: 'power3.out' });
                const yTo = gsap.quickTo(reflection, 'y', { duration: 0.35, ease: 'power3.out' });
                const opacityTo = gsap.quickTo(reflection, 'opacity', { duration: 0.2 });
                const move = (event) => {
                    const rect = card.getBoundingClientRect();
                    xTo(event.clientX - rect.left - 180);
                    yTo(event.clientY - rect.top - 180);
                    opacityTo(1);
                };
                const reset = () => opacityTo(0);
                card.addEventListener('pointermove', move);
                card.addEventListener('pointerleave', reset);
                return () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', reset); };
            });
            return () => cleanups.forEach((cleanup) => cleanup());
        });
        document.fonts.ready.then(() => { if (!disposed) refresh(); });
        return () => {
            disposed = true;
            cancelAnimationFrame(refreshFrame);
            media.revert();
        };
    }, [root, language, navigate, setActiveIndex, setPinned]);
}
