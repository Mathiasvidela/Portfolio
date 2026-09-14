import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioMotion(root, language) {
    useLayoutEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            const select = gsap.utils.selector(root);
            const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
            intro.from(select('[data-hero-line]'), { yPercent: 110, duration: 1.05, stagger: 0.12 })
                .from(select('[data-hero-portrait]'), { y: 65, opacity: 0, duration: 1.1 }, 0.2)
                .from(select('[data-hero-detail]'), { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, 0.45);

            select('[data-reveal]').forEach((element) => {
                gsap.from(element, { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
            });
            select('[data-reveal-group]').forEach((group) => {
                // Explicit end values prevent CSS transitions or effect re-runs from
                // making an in-progress transparent state the reveal destination.
                gsap.fromTo(Array.from(group.children), { y: 42, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
                    clearProps: 'transform,opacity',
                    scrollTrigger: { trigger: group, start: 'top 90%', once: true },
                });
            });
            select('[data-section-transition]').forEach((element) => {
                const panel = element.querySelector('.section-transition__panel');
                const code = element.querySelector('.section-transition__code');
                gsap.timeline({ scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom 65%', scrub: 0.65 } })
                    .fromTo(panel, { xPercent: Number(element.dataset.direction) * 105 }, { xPercent: 0, ease: 'power2.out' }, 0)
                    .fromTo(code, { rotation: -12, scale: 0.85 }, { rotation: 0, scale: 1, ease: 'power2.out' }, 0);
            });
            select('[data-parallax]').forEach((element) => {
                gsap.to(element, { y: () => Number(element.dataset.parallax), ease: 'none',
                    scrollTrigger: { trigger: element.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 1 } });
            });
        }, root);
        media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
            const cleanups = [];
            const hero = root.current.querySelector('[data-hero-stage]');
            if (hero) {
                // Pointer depth and intro/scroll animation use separate nested layers.
                const layers = Array.from(hero.querySelectorAll('[data-hero-depth]')).map((element) => ({
                    depth: Number(element.dataset.heroDepth),
                    xTo: gsap.quickTo(element, 'x', { duration: Number(element.dataset.heroDepth) < 0 ? 1.15 : 0.7, ease: 'power3.out' }),
                    yTo: gsap.quickTo(element, 'y', { duration: Number(element.dataset.heroDepth) < 0 ? 1.15 : 0.7, ease: 'power3.out' }),
                }));
                const move = (event) => {
                    const bounds = hero.getBoundingClientRect();
                    const x = gsap.utils.clamp(-1, 1, (event.clientX - bounds.left) / bounds.width * 2 - 1);
                    const y = gsap.utils.clamp(-1, 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
                    layers.forEach((layer) => { layer.xTo(x * layer.depth); layer.yTo(y * layer.depth * 0.5); });
                };
                const reset = () => layers.forEach((layer) => { layer.xTo(0); layer.yTo(0); });
                hero.addEventListener('pointermove', move);
                hero.addEventListener('pointerleave', reset);
                window.addEventListener('blur', reset);
                cleanups.push(() => {
                    hero.removeEventListener('pointermove', move);
                    hero.removeEventListener('pointerleave', reset);
                    window.removeEventListener('blur', reset);
                });
            }

            root.current.querySelectorAll('[data-magnetic]').forEach((element) => {
                const xTo = gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3.out' });
                const yTo = gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3.out' });
                let bounds;
                const enter = () => { bounds = element.getBoundingClientRect(); };
                const move = (event) => {
                    if (!bounds) enter();
                    xTo(gsap.utils.clamp(-8, 8, (event.clientX - bounds.left - bounds.width / 2) * 0.12));
                    yTo(gsap.utils.clamp(-6, 6, (event.clientY - bounds.top - bounds.height / 2) * 0.18));
                };
                const reset = () => { xTo(0); yTo(0); bounds = undefined; };
                element.addEventListener('pointerenter', enter);
                element.addEventListener('pointermove', move);
                element.addEventListener('pointerleave', reset);
                element.addEventListener('blur', reset);
                cleanups.push(() => {
                    element.removeEventListener('pointerenter', enter);
                    element.removeEventListener('pointermove', move);
                    element.removeEventListener('pointerleave', reset);
                    element.removeEventListener('blur', reset);
                });
            });
            return () => cleanups.forEach((cleanup) => cleanup());
        }, root);
        media.add('(prefers-reduced-motion: no-preference)', () => {
            const cleanups = [];
            root.current.querySelectorAll('[data-keypress]').forEach((element) => {
                const yTo = gsap.quickTo(element, 'y', { duration: 0.14, ease: 'power2.out' });
                const down = () => { yTo(6); element.dataset.pressed = 'true'; };
                const up = () => { yTo(0); delete element.dataset.pressed; };
                const keyDown = (event) => {
                    if (event.key === 'Enter' || (event.key === ' ' && element.tagName === 'BUTTON')) down();
                };
                element.addEventListener('pointerdown', down);
                element.addEventListener('keydown', keyDown);
                ['pointerup', 'pointercancel', 'pointerleave', 'keyup', 'blur'].forEach((name) => element.addEventListener(name, up));
                cleanups.push(() => {
                    element.removeEventListener('pointerdown', down);
                    element.removeEventListener('keydown', keyDown);
                    ['pointerup', 'pointercancel', 'pointerleave', 'keyup', 'blur'].forEach((name) => element.removeEventListener(name, up));
                    delete element.dataset.pressed;
                });
            });
            return () => cleanups.forEach((cleanup) => cleanup());
        }, root);
        return () => media.revert();
    }, [root, language]);
}
