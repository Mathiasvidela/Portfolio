import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            animate={{
                x: mousePosition.x - 8,
                y: mousePosition.y - 8,
                scale: isHovering ? 2.5 : 1,
            }}
            transition={{
                // Instant tracking for position to match system mouse feel
                x: { duration: 0 },
                y: { duration: 0 },
                // Smooth transition for scale
                scale: { type: "spring", stiffness: 300, damping: 20 }
            }}
        />
    );
};

export default CustomCursor;
