import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        let frameId = null;
        let destroyed = false;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        const scheduleFrame = () => {
            if (destroyed || frameId !== null || document.hidden) return;
            frameId = requestAnimationFrame(raf);
        };

        function raf(time) {
            frameId = null;
            lenis.raf(time);

            if (!destroyed && lenis.isScrolling) {
                scheduleFrame();
            }
        }

        const cancelFrame = () => {
            if (frameId === null) return;
            cancelAnimationFrame(frameId);
            frameId = null;
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelFrame();
            } else if (lenis.isScrolling) {
                scheduleFrame();
            }
        };

        window.addEventListener('wheel', scheduleFrame, { passive: true });
        window.addEventListener('touchstart', scheduleFrame, { passive: true });
        window.addEventListener('touchmove', scheduleFrame, { passive: true });
        window.addEventListener('keydown', scheduleFrame);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            destroyed = true;
            cancelFrame();
            window.removeEventListener('wheel', scheduleFrame);
            window.removeEventListener('touchstart', scheduleFrame);
            window.removeEventListener('touchmove', scheduleFrame);
            window.removeEventListener('keydown', scheduleFrame);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
