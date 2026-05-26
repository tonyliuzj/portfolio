import { useEffect } from 'react';
import { motionValue } from 'framer-motion';

const pointerX = motionValue(0);
const pointerY = motionValue(0);
let subscribers = 0;

const updatePointer = (event) => {
  pointerX.set(event.clientX);
  pointerY.set(event.clientY);
};

export default function usePointerMotion(enabled) {
  useEffect(() => {
    if (!enabled) return;

    subscribers += 1;

    if (subscribers === 1) {
      window.addEventListener('mousemove', updatePointer, { passive: true });
    }

    return () => {
      subscribers -= 1;

      if (subscribers === 0) {
        window.removeEventListener('mousemove', updatePointer);
      }
    };
  }, [enabled]);

  return { pointerX, pointerY };
}
