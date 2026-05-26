import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Springs for the main dot (fast)
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50, mass: 0.1 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50, mass: 0.1 });
  
  // Springs for the outer ring (delayed/smooth)
  const ringX = useSpring(0, { stiffness: 200, damping: 25, mass: 0.5 });
  const ringY = useSpring(0, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const isInteractable = 
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('[data-interactable="true"]');
        
      setIsHovering(!!isInteractable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isMounted) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Outer Abstract Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-muted-foreground/40 rounded-full pointer-events-none z-[9998] mix-blend-difference will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovering ? 'transparent' : 'rgba(255, 255, 255, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}