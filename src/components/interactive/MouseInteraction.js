import { motion, useSpring } from 'framer-motion';
import useDesktopPointer from '@/lib/useDesktopPointer';
import usePointerMotion from '@/lib/usePointerMotion';

export default function MouseInteraction() {
  const isDesktopPointer = useDesktopPointer();
  const { pointerX, pointerY } = usePointerMotion(isDesktopPointer);

  // Smooth springs for spotlight tracking
  const mouseX = useSpring(pointerX, { stiffness: 40, damping: 25, mass: 0.5 });
  const mouseY = useSpring(pointerY, { stiffness: 40, damping: 25, mass: 0.5 });

  if (!isDesktopPointer) return null;

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
