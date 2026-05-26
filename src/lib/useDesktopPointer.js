import { useEffect, useState } from 'react';

const DESKTOP_POINTER_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)';

export default function useDesktopPointer() {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);
    const updatePointerState = () => setIsDesktopPointer(mediaQuery.matches);

    updatePointerState();
    mediaQuery.addEventListener('change', updatePointerState);

    return () => mediaQuery.removeEventListener('change', updatePointerState);
  }, []);

  return isDesktopPointer;
}
