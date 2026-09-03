import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    
    // Track scroll progress through this specific container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transform values for a more dynamic "Perspective Lift"
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const ySub = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]); // Scale up instead of letterSpacing
    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const blurY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    
    // Abstract elements parallax
    const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section 
            id="home"
            ref={containerRef}
            className="relative h-[120vh] w-full flex items-start justify-center pt-[35vh] overflow-hidden [perspective:1000px]"
        >
            {/* Ambient abstract background noise/glow that expands on scroll */}
            <motion.div 
                style={{ 
                    scale: backgroundScale,
                    y: blurY,
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0.15, 0.05]),
                    willChange: "transform, opacity"
                }}
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-foreground rounded-full blur-[80px] pointer-events-none translate-z-0 backface-hidden"
            />

            <motion.div 
                style={{ 
                    opacity,
                    rotateX,
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity"
                }}
                className="relative z-10 flex flex-col items-center text-center px-4 max-w-[100vw] overflow-hidden"
            >
                <div className="overflow-hidden mb-6">
                    <motion.p 
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                        className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground font-semibold"
                    >
                        Student / Learner
                    </motion.p>
                </div>
                
                <motion.h1 
                    style={{ 
                        y: yTitle,
                        scale: titleScale,
                        willChange: "transform"
                    }}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ 
                        opacity: { duration: 0.65, delay: 0.15 },
                        filter: { duration: 0.65, delay: 0.15 },
                        y: { duration: 0.65, delay: 0.15, ease: [0.25, 1, 0.5, 1] }
                    }}
                    className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black tracking-[0.03em] leading-[0.85] text-foreground uppercase ml-[0.03em] max-w-full break-words"
                >
                    TONY LIU
                </motion.h1>
                
                <motion.div
                    style={{ 
                        y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
                        willChange: "transform"
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
                    className="h-[1px] w-[20vw] bg-border mt-12 mb-8 origin-center"
                />

                <motion.p 
                    style={{ 
                        y: ySub,
                        willChange: "transform"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="max-w-md w-full px-4 text-sm md:text-base text-muted-foreground font-light leading-relaxed"
                >
                    Abstracting complexity. Building full-stack web applications and robust rack-scale infrastructure.
                </motion.p>
            </motion.div>

            {/* Scroll indicator line */}
            <motion.div 
                style={{ opacity }}
                className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground [writing-mode:vertical-lr] rotate-180">Scroll</span>
                <div className="relative w-[1px] h-24 bg-muted/30 overflow-hidden">
                    <motion.div 
                        style={{ y: lineY }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
                    />
                </div>
            </motion.div>
        </section>
    );
}
