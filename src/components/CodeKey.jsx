import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CodeKey() {
    const { t } = useLanguage();
    const reducedMotion = useReducedMotion();
    const buttonRef = useRef(null);
    const hostRef = useRef(null);
    const shadowRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;
        let dispose;
        const observer = new IntersectionObserver(async ([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            try {
                const { createKeycapScene } = await import('../lib/keycapScene');
                if (cancelled) return;
                dispose = createKeycapScene(hostRef.current, buttonRef.current, shadowRef.current, () => setReady(false));
                setReady(true);
            } catch {
                // Preserve the original artwork if WebGL is unavailable.
                if (!cancelled) setReady(false);
            }
        }, { rootMargin: '200px' });
        observer.observe(buttonRef.current);
        return () => { cancelled = true; observer.disconnect(); dispose?.(); };
    }, []);

    return (
        <div className="code-key" data-reveal>
            <button ref={buttonRef} type="button" className="code-key__button" aria-label={ready && !reducedMotion ? t.about.keyAction : t.about.imageAlt} aria-describedby={ready && !reducedMotion ? 'code-key-hint' : undefined} disabled={!ready || reducedMotion}>
                <span ref={shadowRef} className={`code-key__shadow ${ready ? '' : 'invisible'}`} aria-hidden="true" />
                {!ready && <img src="/imagecmd.webp" alt="" className="code-key__fallback" />}
                <span ref={hostRef} className="code-key__canvas" />
            </button>
            <p id="code-key-hint" className={`code-key__hint ${ready ? '' : 'invisible'}`}><span className="code-key__desktop-hint">{t.about.keyHint}</span><span className="code-key__touch-hint">{t.about.keyTouchHint}</span></p>
        </div>
    );
}
