import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MouseInteraction() {
  const [isMounted, setIsMounted] = useState(false);

  // Smooth springs for spotlight tracking
  const mouseX = useSpring(0, { stiffness: 40, damping: 25, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 25, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[1000px] h-[1000px] z-30 opacity-40 will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
        background: `radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)`
      }}
    />
  );
}