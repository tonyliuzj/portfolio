import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const loadingDuration = prefersReducedMotion ? 0 : 650;

        if (!prefersReducedMotion) document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = '';
        }, loadingDuration);
        
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    // Animation configuration for panels
    const panelCount = 6;
    const panelVariants = {
        initial: { y: "0%" },
        exit: (i) => ({
            y: "-100%",
            transition: {
                duration: 0.35,
                ease: [0.83, 0, 0.17, 1],
                delay: i * 0.025
            }
        })
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
                    {/* Background Panels */}
                    {[...Array(panelCount)].map((_, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={panelVariants}
                            initial="initial"
                            exit="exit"
                            className="h-full w-full bg-foreground border-r border-background/5 last:border-r-0"
                        />
                    ))}

                    {/* Centered Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
                        <div className="overflow-hidden mb-4">
                            <motion.span 
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                                className="text-background font-mono text-xs sm:text-sm tracking-[0.4em] uppercase block"
                            >
                                Welcome
                            </motion.span>
                        </div>
                        
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
                            className="w-32 sm:w-48 h-[1px] bg-background/30 origin-center"
                        />

                        <div className="mt-8 flex gap-8">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ 
                                        duration: 0.35,
                                        repeat: 1,
                                        delay: 0.2 + (i * 0.05),
                                        ease: "easeInOut"
                                    }}
                                    className="w-1 h-1 rounded-full bg-background"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
