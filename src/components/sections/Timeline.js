import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Code, Network, Terminal, Cpu, Server, Route, Globe, GitBranch } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

const timelineData = [
    {
        year: '2018',
        title: 'The Beginning',
        description: 'Got my first laptop, sparking an interest in computers and technology.',
        icon: Laptop,
    },
    {
        year: '2020',
        title: 'Started Coding',
        description: 'Wrote my first lines of code, with Lua. Later on I went and learnt Python.',
        icon: Code,
    },
    {
        year: '2021',
        title: 'Exploring Networks',
        description: 'Began exploring how networks function, laying the foundation for future infrastructure projects.',
        icon: Network,
    },
    {
        year: '2022',
        title: 'Open Source & Linux',
        description: 'Built apps based on open-source projects (frontend UIs, WireGuard mesh networks). Started exploring Linux environments.',
        icon: Terminal,
    },
    {
        year: '2023',
        title: 'Self-Hosting & AI',
        description: 'Created my own networking projects. Started self-hosting and built/trained AI applications using Python YOLO.',
        icon: Cpu,
    },
    {
        year: '2024',
        title: 'Home Lab & Full Stack',
        description: 'Built a 42U rack with Dell R730/R730XD. Learned JavaScript (Node.js, React, Next.js) and built my portfolio.',
        icon: Server,
    },
    {
        year: '2025',
        title: 'Advanced Virtualization',
        description: 'Deep dive into Linux, overlay networks, and NAT with Tailscale and Proxmox. Explored KVM, LXC, and Incus virtualization.',
        icon: Route,
    },
    {
        year: '2026',
        title: 'Self-Hosting Everything',
        description: 'Started my first blog and self-hosted DNS/DoH with PowerDNS. My first GitHub project received hundreds of stars.',
        icon: Globe,
    },
    {
        year: 'Current',
        title: 'Open Source Maintainer',
        description: (
            <div className="flex flex-col gap-4 items-start md:items-[inherit]">
                <span>Starting and maintaining a growing ecosystem of interesting projects.</span>
                <a 
                    href="https://github.com/tonyliuzj" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[10px] font-mono tracking-widest uppercase border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                >
                    Visit my GitHub
                </a>
            </div>
        ),
        icon: GitBranch,
    }
];

export default function Timeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 50%"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="timeline" className="w-full max-w-4xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
            <SectionHeader 
                number="02"
                label="Journey"
                title="The"
                description="Journey."
            />

            <div className="relative pl-6 md:pl-0" ref={containerRef}>
                {/* Center Line (Mobile left, Desktop center) */}
                <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-1/2" />
                
                {/* Animated progress line */}
                <motion.div 
                    className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-foreground origin-top md:-translate-x-1/2" 
                    style={{ scaleY }}
                />

                <div className="space-y-16 md:space-y-32">
                    {timelineData.map((item, index) => {
                        const Icon = item.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Node */}
                                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-background border border-foreground rounded-full md:-translate-x-1/2 z-10" />

                                {/* Content */}
                                <div className="w-full md:w-1/2 pl-8 md:pl-0 flex flex-col">
                                    <div className={`flex flex-col ${isEven ? 'md:items-end md:text-right md:pr-16' : 'md:items-start md:text-left md:pl-16'}`}>
                                        <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-3">
                                            {item.year}
                                        </span>
                                        <Card className="bg-background/50 border-border rounded-none w-full hover:bg-muted/30 transition-colors">
                                            <CardContent className="p-6 md:p-8">
                                                <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                    <Icon className="w-5 h-5 text-muted-foreground" />
                                                    <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                                                </div>
                                                <div className="text-muted-foreground text-sm md:text-base leading-relaxed font-light">
                                                    {item.description}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}