import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { gsap } from 'gsap';

// Loaded only when the key approaches the viewport. No external models or textures.
export function createKeycapScene(host, button, shadow, onFailure) {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.z = 7.8;
    scene.add(new THREE.HemisphereLight(0xe6eeff, 0x131a30, 3));
    const light = new THREE.DirectionalLight(0xffffff, 4.5);
    light.position.set(-3, 5, 6);
    scene.add(light);
    const rim = new THREE.DirectionalLight(0x668aff, 5);
    rim.position.set(4, -1, 2);
    scene.add(rim);

    const floating = new THREE.Group();
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    const key = new THREE.Group();
    scene.add(floating);
    floating.add(tilt);
    tilt.add(spin);
    spin.add(key);
    tilt.rotation.set(-0.38, -0.46, -0.22);

    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x151821, roughness: 0.32, metalness: 0.38 });
    const faceMaterial = new THREE.MeshStandardMaterial({ color: 0x262a33, roughness: 0.4, metalness: 0.22 });
    const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0x080b12, roughness: 0.44, metalness: 0.45 });
    const glyphMaterial = new THREE.MeshStandardMaterial({ color: 0xf7f8ff, roughness: 0.3, emissive: 0x8faaff, emissiveIntensity: 0.18 });
    const box = (width, height, depth, radius, z, material) => {
        const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 5, radius), material);
        mesh.position.z = z;
        key.add(mesh);
        return mesh;
    };
    box(2.92, 2.92, 0.55, 0.2, 0, bodyMaterial);
    box(2.75, 2.75, 0.16, 0.075, -0.31, edgeMaterial);
    box(2.57, 2.57, 0.23, 0.11, 0.29, faceMaterial);

    // Raised code glyph: actual geometry, visible from the side during rotation.
    const stroke = (ax, ay, bx, by) => {
        const length = Math.hypot(bx - ax, by - ay);
        const mesh = new THREE.Mesh(new RoundedBoxGeometry(length, 0.11, 0.045, 3, 0.022), glyphMaterial);
        mesh.position.set((ax + bx) / 2, (ay + by) / 2, 0.423);
        mesh.rotation.z = Math.atan2(by - ay, bx - ax);
        key.add(mesh);
    };
    stroke(-0.47, 0.37, -0.86, 0);
    stroke(-0.86, 0, -0.47, -0.37);
    stroke(0.47, 0.37, 0.86, 0);
    stroke(0.86, 0, 0.47, -0.37);
    stroke(-0.12, -0.62, 0.14, 0.62);

    const render = () => {
        renderer.render(scene, camera);
        shadow.style.transform = `translateX(-50%) scale(${1 - floating.position.y * 0.3})`;
        shadow.style.opacity = String(0.28 - floating.position.y * 0.25);
    };
    const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let visible = false;
    let activeAnimation;
    let spinTween;
    let pressTween;
    let disposed = false;
    const media = gsap.matchMedia();
    const updateActivity = () => activeAnimation?.(visible && !document.hidden);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateActivity();
    });
    visibilityObserver.observe(host);
    document.addEventListener('visibilitychange', updateActivity);

    media.add({ reduced: '(prefers-reduced-motion: reduce)', fine: '(hover: hover) and (pointer: fine)', all: 'all' }, ({ conditions }) => {
        const { reduced, fine } = conditions;
        const idle = gsap.timeline({ repeat: -1, yoyo: true, paused: true, defaults: { duration: 2.8, ease: 'sine.inOut' } })
            .to(floating.position, { y: 0.16 }, 0)
            .to(floating.rotation, { z: 0.07, y: 0.08 }, 0);
        const xTo = gsap.quickTo(tilt.rotation, 'x', { duration: 0.65, ease: 'power3.out' });
        const yTo = gsap.quickTo(tilt.rotation, 'y', { duration: 0.65, ease: 'power3.out' });
        const pointerMove = (event) => {
            if (reduced || !fine || event.pointerType === 'touch') return;
            const rect = button.getBoundingClientRect();
            const x = gsap.utils.clamp(-1, 1, ((event.clientX - rect.left) / rect.width - 0.5) * 2);
            const y = gsap.utils.clamp(-1, 1, ((event.clientY - rect.top) / rect.height - 0.5) * 2);
            xTo(-0.38 + y * 0.42);
            yTo(-0.46 + x * 0.65);
        };
        const reset = () => { if (!reduced) { xTo(-0.38); yTo(-0.46); } };
        const activate = () => {
            if (reduced || spinTween?.isActive()) return;
            button.setAttribute('aria-busy', 'true');
            spinTween = gsap.to(spin.rotation, { y: Math.PI * 2, duration: 1.35, ease: 'power2.inOut', onComplete: () => { spin.rotation.y = 0; button.removeAttribute('aria-busy'); } });
            pressTween = gsap.timeline().to(key.position, { z: -0.14, duration: 0.12 }).to(key.position, { z: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
        };
        activeAnimation = (active) => {
            gsap.ticker.remove(render);
            if (active && !reduced) { idle.resume(); spinTween?.resume(); pressTween?.resume(); gsap.ticker.add(render); }
            else { idle.pause(); spinTween?.pause(); pressTween?.pause(); }
            if (active) render();
        };
        button.addEventListener('pointermove', pointerMove);
        button.addEventListener('pointerleave', reset);
        button.addEventListener('blur', reset);
        button.addEventListener('click', activate);
        updateActivity();
        return () => {
            activeAnimation = undefined;
            gsap.ticker.remove(render);
            button.removeAttribute('aria-busy');
            spinTween?.kill();
            pressTween?.kill();
            button.removeEventListener('pointermove', pointerMove);
            button.removeEventListener('pointerleave', reset);
            button.removeEventListener('blur', reset);
            button.removeEventListener('click', activate);
        };
    });

    const dispose = () => {
        if (disposed) return;
        disposed = true;
        media.revert();
        visibilityObserver.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', updateActivity);
        renderer.domElement.removeEventListener('webglcontextlost', contextLost);
        const materials = new Set();
        scene.traverse((object) => {
            object.geometry?.dispose();
            if (object.material) materials.add(object.material);
        });
        materials.forEach((material) => material.dispose());
        renderer.dispose();
        renderer.domElement.remove();
    };
    const contextLost = (event) => { event.preventDefault(); dispose(); onFailure(); };
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    return dispose;
}
