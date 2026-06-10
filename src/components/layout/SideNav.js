import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import useActiveSection from '@/lib/useActiveSection';

const sections = [
    { id: 'home', label: '00 // Start' },
    { id: 'about', label: '01 // About' },
    { id: 'projects', label: '02 // Projects' },
    { id: 'websites', label: '03 // Websites' },
    { id: 'infrastructure', label: '04 // Infra' },
    { id: 'services', label: '05 // Services' },
    { id: 'contact', label: '06 // Contact' },
];

function MagneticItem({ children, onClick }) {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // Gentle magnetic pull
        x.set(middleX * 0.35);
        y.set(middleY * 0.35);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className="group cursor-pointer py-4 pl-12 pr-6 flex items-center justify-end"
            data-interactable="true"
        >
            <motion.div
                style={{ x, y }}
                className="flex items-center gap-4"
            >
                {children}
            </motion.div>
        </div>
    );
}

export default function SideNav() {
    const activeSection = useActiveSection();

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end hidden sm:flex mix-blend-difference"
        >
            {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                const isLast = index === sections.length - 1;
                
                return (
                    <div key={section.id} className="relative flex flex-col items-end">
                        {/* Connecting static line (behind the magnetic dot) */}
                        {!isLast && (
                            <div className="absolute top-1/2 right-[31px] w-[1px] h-full bg-border pointer-events-none" />
                        )}
                        
                        <MagneticItem onClick={() => scrollTo(section.id)}>
                            <span 
                                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                                    isActive 
                                        ? 'text-foreground opacity-100 translate-x-0' 
                                        : 'text-muted-foreground opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}
                            >
                                {section.label}
                            </span>
                            
                            <div className="relative flex items-center justify-center w-4 h-4">
                                {/* Dot */}
                                <motion.div 
                                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                                        isActive ? 'bg-foreground scale-125' : 'bg-muted-foreground/30 group-hover:bg-muted-foreground'
                                    }`}
                                    layout
                                />
                                
                                {/* Active Ring Indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeRing"
                                        className="absolute w-4 h-4 rounded-full border border-foreground/30 pointer-events-none"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                        </MagneticItem>
                    </div>
                );
            })}
        </motion.nav>
    );
}
