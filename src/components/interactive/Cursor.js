import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import useDesktopPointer from '@/lib/useDesktopPointer';
import usePointerMotion from '@/lib/usePointerMotion';

export default function Cursor() {
  const isDesktopPointer = useDesktopPointer();
  const [isHovering, setIsHovering] = useState(false);
  const { pointerX, pointerY } = usePointerMotion(isDesktopPointer);

  // Springs for the main dot (fast)
  const cursorX = useSpring(pointerX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const cursorY = useSpring(pointerY, { stiffness: 1000, damping: 50, mass: 0.1 });
  
  // Springs for the outer ring (delayed/smooth)
  const ringX = useSpring(pointerX, { stiffness: 200, damping: 25, mass: 0.5 });
  const ringY = useSpring(pointerY, { stiffness: 200, damping: 25, mass: 0.5 });

  useEffect(() => {
    if (!isDesktopPointer) {
      setIsHovering(false);
      return;
    }

    const handleMouseOver = (e) => {
      if (!(e.target instanceof Element)) return;

      const tagName = e.target.tagName.toLowerCase();
      const isInteractable =
        tagName === 'a' ||
        tagName === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.closest('[data-interactable="true"]');
        
      setIsHovering((prev) => {
        const next = !!isInteractable;
        return prev === next ? prev : next;
      });
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDesktopPointer]);

  if (!isDesktopPointer) return null;

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
