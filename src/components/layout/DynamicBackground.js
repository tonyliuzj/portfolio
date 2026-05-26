import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Base ambient glow colors for each section
const bgColors = {
    home: 'rgba(14, 165, 233, 0.08)',       // Sky Blue
    about: 'rgba(139, 92, 246, 0.08)',      // Violet
    projects: 'rgba(236, 72, 153, 0.08)',   // Pink
    websites: 'rgba(59, 130, 246, 0.08)',   // Blue
    infrastructure: 'rgba(16, 185, 129, 0.08)', // Emerald
    services: 'rgba(6, 182, 212, 0.08)',    // Cyan
    status: 'rgba(239, 68, 68, 0.08)'      // Red
};

export default function DynamicBackground() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Trigger point: 40% down the screen
                    const triggerPoint = window.innerHeight * 0.4;
                    const ids = ['home', 'about', 'projects', 'websites', 'infrastructure', 'services', 'status', 'contact'];
                    
                    let current = 'home';
                    
                    for (const id of ids) {
                        const element = document.getElementById(id);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= triggerPoint) {
                                current = id;
                            }
                        }
                    }
                    
                    // Force contact section if scrolled to the absolute bottom
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                        current = 'contact';
                    }

                    setActiveSection((prev) => current !== prev ? current : prev);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
            {/* Global Noise Texture */}
            <div className="absolute inset-0 opacity-[0.025] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-50"></div>

            {/* Smooth Ambient Color Transition */}
            <motion.div
                className="absolute inset-0 will-change-[background]"
                animate={{
                    background: `radial-gradient(circle at 50% 50%, ${bgColors[activeSection] || 'transparent'} 0%, transparent 80%)`
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Section-Specific Highly Creative Overlay Effects */}
            <AnimatePresence>
                {/* 00 // Start: Deep Space Nebula */}
                {activeSection === 'home' && (
                    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-sky-500/5 blur-[60px] will-change-transform" />
                        <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 blur-[80px] will-change-transform" />
                    </motion.div>
                )}

                {/* 01 // About: Blueprint Architecture */}
                {activeSection === 'about' && (
                    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px', backgroundPosition: '0 0' }} />
                        {[...Array(4)].map((_, i) => (
                            <motion.div key={i} className="absolute border border-violet-500/10 will-change-transform"
                                style={{ width: Math.random() * 300 + 100, height: Math.random() * 300 + 100, left: `${Math.random()*80}%`, top: `${Math.random()*80}%` }}
                                animate={{ rotate: [0, 90], opacity: [0, 0.3, 0] }}
                                transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* 02 // Projects: 3D Wireframe Tumbling Cubes */}
                {activeSection === 'projects' && (
                    <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 perspective-[1000px] overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                            <motion.div key={i} className="absolute w-24 h-24 sm:w-32 sm:h-32 border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm will-change-transform"
                                style={{ left: `${Math.random()*90}%`, top: `${Math.random()*90}%` }}
                                animate={{ rotateX: 360, rotateY: 360, z: [0, 100, 0] }}
                                transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* 03 // Websites: Synthwave 3D Horizon Grid */}
                {activeSection === 'websites' && (
                    <motion.div key="websites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 perspective-[1000px] overflow-hidden">
                        <motion.div className="absolute bottom-[-20vh] w-[200%] left-[-50%] h-[80vh] bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.2)_2%,transparent_3%),linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.2)_2%,transparent_3%)] will-change-transform"
                            style={{ backgroundSize: '4rem 4rem', transformOrigin: 'top center', rotateX: '70deg' }}
                            animate={{ backgroundPosition: ['0px 0px', '0px 4rem'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute top-[30%] w-full h-[70%] bg-gradient-to-b from-background to-transparent z-10" />
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-blue-500/5 blur-[40px]" />
                    </motion.div>
                )}

                {/* 05 // Infrastructure: Laser Data Matrix */}
                {activeSection === 'infrastructure' && (
                    <motion.div key="infrastructure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        {[...Array(15)].map((_, i) => (
                            <motion.div key={`h-${i}`} className="absolute h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent will-change-[left]"
                                style={{ width: `${Math.random() * 200 + 100}px`, top: `${Math.random() * 100}%`, left: "-400px" }}
                                animate={{ left: "100vw" }}
                                transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                            />
                        ))}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                    </motion.div>
                )}

                {/* 06 // Services: Data Nodes */}
                {activeSection === 'services' && (
                    <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        {[...Array(20)].map((_, i) => (
                            <motion.div key={`s-${i}`} className="absolute w-2 h-2 rounded-full bg-cyan-500/20 blur-[2px] will-change-transform"
                                style={{ left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh` }}
                                animate={{ y: [0, -100, 0], opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
                                transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* 07 // Status: Radar / Heartbeat */}
                {activeSection === 'status' && (
                    <motion.div key="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-red-500/20 rounded-full flex items-center justify-center">
                            <div className="absolute w-[75%] h-[75%] border border-red-500/10 rounded-full" />
                            <div className="absolute w-[50%] h-[50%] border border-red-500/10 rounded-full" />
                            <div className="absolute w-[25%] h-[25%] border border-red-500/10 rounded-full" />
                            <motion.div className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent to-red-500/60 origin-left will-change-transform" style={{ left: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
                        </div>
                        <motion.div animate={{ opacity: [0.05, 0.1, 0.05], scale: [0.98, 1.02, 0.98] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-[60px]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Interactive Mouse Spotlight (Subtle global overlay) */}
            <motion.div 
                className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.03)_0%,transparent_30%)]"
            />
        </div>
    );
}
