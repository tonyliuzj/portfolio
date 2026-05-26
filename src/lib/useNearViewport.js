import { useEffect, useRef, useState } from 'react';

export default function useNearViewport(rootMargin = '1000px') {
  const ref = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) return;

    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return [ref, isNearViewport];
}
