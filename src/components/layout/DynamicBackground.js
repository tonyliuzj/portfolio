import { motion, AnimatePresence } from 'framer-motion';
import useActiveSection from '@/lib/useActiveSection';

// Base ambient glow colors for each section
const bgColors = {
    home: 'rgba(14, 165, 233, 0.08)',       // Sky Blue
    about: 'rgba(139, 92, 246, 0.08)',      // Violet
    projects: 'rgba(236, 72, 153, 0.08)',   // Pink
    websites: 'rgba(59, 130, 246, 0.08)',   // Blue
    infrastructure: 'rgba(16, 185, 129, 0.08)', // Emerald
    services: 'rgba(6, 182, 212, 0.08)'    // Cyan
};

const aboutShapes = [
    { width: 184, height: 312, left: '9%', top: '14%', duration: '17s' },
    { width: 346, height: 156, left: '57%', top: '18%', duration: '22s' },
    { width: 248, height: 276, left: '27%', top: '59%', duration: '19s' },
    { width: 406, height: 222, left: '68%', top: '63%', duration: '24s' },
];

const projectCubes = [
    { left: '12%', top: '18%', duration: '24s' },
    { left: '72%', top: '12%', duration: '33s' },
    { left: '20%', top: '68%', duration: '29s' },
    { left: '82%', top: '64%', duration: '38s' },
];

const infrastructureLines = [
    { width: 176, top: '8%', duration: '4.8s', delay: '0.1s' },
    { width: 254, top: '15%', duration: '5.6s', delay: '1.4s' },
    { width: 142, top: '23%', duration: '3.7s', delay: '2.8s' },
    { width: 286, top: '31%', duration: '6.1s', delay: '0.8s' },
    { width: 214, top: '37%', duration: '5.2s', delay: '3.6s' },
    { width: 118, top: '44%', duration: '3.4s', delay: '1.9s' },
    { width: 302, top: '51%', duration: '6.4s', delay: '4.2s' },
    { width: 190, top: '58%', duration: '4.4s', delay: '0.5s' },
    { width: 264, top: '66%', duration: '5.8s', delay: '2.2s' },
    { width: 136, top: '72%', duration: '3.9s', delay: '4.8s' },
    { width: 226, top: '79%', duration: '5.1s', delay: '1.1s' },
    { width: 312, top: '86%', duration: '6.7s', delay: '3.1s' },
    { width: 168, top: '92%', duration: '4.2s', delay: '0s' },
    { width: 246, top: '18%', duration: '5.5s', delay: '4.5s' },
    { width: 126, top: '63%', duration: '3.5s', delay: '2.5s' },
];

const serviceNodes = [
    { left: '8vw', top: '12vh', duration: '6.1s', delay: '0s' },
    { left: '18vw', top: '72vh', duration: '8.2s', delay: '0.4s' },
    { left: '28vw', top: '34vh', duration: '5.7s', delay: '1.2s' },
    { left: '38vw', top: '82vh', duration: '9s', delay: '0.8s' },
    { left: '48vw', top: '18vh', duration: '6.8s', delay: '1.7s' },
    { left: '58vw', top: '55vh', duration: '7.4s', delay: '0.2s' },
    { left: '68vw', top: '28vh', duration: '5.5s', delay: '1.4s' },
    { left: '78vw', top: '75vh', duration: '8.8s', delay: '0.9s' },
    { left: '88vw', top: '43vh', duration: '6.3s', delay: '1.9s' },
    { left: '94vw', top: '16vh', duration: '7.9s', delay: '0.6s' },
    { left: '14vw', top: '48vh', duration: '5.9s', delay: '1.5s' },
    { left: '24vw', top: '10vh', duration: '8.5s', delay: '0.7s' },
    { left: '34vw', top: '62vh', duration: '6.6s', delay: '1.1s' },
    { left: '44vw', top: '39vh', duration: '7.1s', delay: '0.3s' },
    { left: '54vw', top: '86vh', duration: '9.4s', delay: '1.8s' },
    { left: '64vw', top: '9vh', duration: '5.6s', delay: '0.5s' },
    { left: '74vw', top: '58vh', duration: '8.1s', delay: '1.3s' },
    { left: '84vw', top: '24vh', duration: '6.9s', delay: '0.1s' },
    { left: '6vw', top: '88vh', duration: '7.7s', delay: '1.6s' },
    { left: '92vw', top: '68vh', duration: '5.8s', delay: '0.9s' },
];

export default function DynamicBackground() {
    const activeSection = useActiveSection();

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
            {/* Global Noise Texture */}
            <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay z-50 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3)_0_1px,transparent_1px),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.18)_0_1px,transparent_1px)] bg-[size:12px_12px,17px_17px]"></div>

            {/* Smooth Ambient Color Transition */}
            <motion.div
                className="absolute inset-0"
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
                        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-sky-500/5 blur-[60px] animate-bg-home-primary" />
                        <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 blur-[80px] animate-bg-home-secondary" />
                    </motion.div>
                )}

                {/* 01 // About: Blueprint Architecture */}
                {activeSection === 'about' && (
                    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px', backgroundPosition: '0 0' }} />
                        {aboutShapes.map((shape, i) => (
                            <div key={i} className="absolute border border-violet-500/10 animate-bg-about-shape"
                                style={{ width: shape.width, height: shape.height, left: shape.left, top: shape.top, animationDuration: shape.duration }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* 02 // Projects: 3D Wireframe Tumbling Cubes */}
                {activeSection === 'projects' && (
                    <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 perspective-[1000px] overflow-hidden">
                        {projectCubes.map((cube, i) => (
                            <div key={i} className="absolute w-24 h-24 sm:w-32 sm:h-32 border border-pink-500/20 bg-pink-500/5 backdrop-blur-sm animate-bg-project-cube"
                                style={{ left: cube.left, top: cube.top, animationDuration: cube.duration }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* 03 // Websites: Synthwave 3D Horizon Grid */}
                {activeSection === 'websites' && (
                    <motion.div key="websites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 perspective-[1000px] overflow-hidden">
                        <div className="absolute bottom-[-20vh] w-[200%] left-[-50%] h-[80vh] bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.2)_2%,transparent_3%),linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.2)_2%,transparent_3%)] animate-bg-horizon-grid"
                            style={{ backgroundSize: '4rem 4rem', transformOrigin: 'top center', transform: 'rotateX(70deg)' }}
                        />
                        <div className="absolute top-[30%] w-full h-[70%] bg-gradient-to-b from-background to-transparent z-10" />
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-blue-500/5 blur-[40px]" />
                    </motion.div>
                )}

                {/* 05 // Infrastructure: Laser Data Matrix */}
                {activeSection === 'infrastructure' && (
                    <motion.div key="infrastructure" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        {infrastructureLines.map((line, i) => (
                            <div key={`h-${i}`} className="absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-bg-data-line"
                                style={{ width: line.width, top: line.top, animationDuration: line.duration, animationDelay: line.delay }}
                            />
                        ))}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                    </motion.div>
                )}

                {/* 06 // Services: Data Nodes */}
                {activeSection === 'services' && (
                    <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
                        {serviceNodes.map((node, i) => (
                            <div key={`s-${i}`} className="absolute w-2 h-2 rounded-full bg-cyan-500/20 blur-[2px] animate-bg-service-node"
                                style={{ left: node.left, top: node.top, animationDuration: node.duration, animationDelay: node.delay }}
                            />
                        ))}
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Interactive Mouse Spotlight (Subtle global overlay) */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.03)_0%,transparent_30%)]"
            />
        </div>
    );
}
