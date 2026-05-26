import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    Route, Server, Laptop, Code, Network, 
    Terminal, Cpu, Globe, GitBranch 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/interactive/FadeIn";
import RackModel from "./RackModel";
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

export default function About() {
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 80%", "end 50%"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const aboutFocusGroups = [
        {
            title: 'Networking',
            description: 'How traffic moves, how networks connect, and how reachability is announced.',
            icon: Route,
            items: ['Overlay Networks', 'NAT and Networking Concepts', 'Network engineering, BGP and ASNs'],
        },
        {
            title: 'Infrastructure',
            description: 'The systems that keep services reachable, isolated, and understandable.',
            icon: Server,
            items: ['Domains and DNS', 'Virtualization, KVM and LXC Containers'],
        },
    ];

    return (
        <section id="about" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10">
            <SectionHeader 
                number="01"
                label="About"
                title="Abstracting"
                description="Complexity"
                color="violet-400"
            />

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
                <div className="lg:col-span-5">
                    <FadeIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-8 leading-[1.1]">
                            Building web projects while learning the infrastructure underneath
                        </h2>
                        <div className="space-y-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                            <p>
                                I am a student learning full-stack development by building and shipping small web projects. I also like home labbing and working with rack-scale infrastructure.
                            </p>
                            <p>
                                I am interested in networking, DNS, virtualization, and internet infrastructure.
                            </p>
                        </div>
                    </FadeIn>
                </div>

                <div className="lg:col-span-7 grid md:grid-cols-2 gap-6 mt-8 lg:mt-0">
                    {aboutFocusGroups.map((group, idx) => {
                        const Icon = group.icon;
                        return (
                            <FadeIn key={group.title} delay={0.2 + (idx * 0.1)} className="h-full">
                                <div className="h-full flex flex-col p-8 border border-border bg-background group hover:bg-muted/10 transition-colors">
                                    <div className="mb-6">
                                        <Icon className="w-6 h-6 text-foreground mb-4 opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                                        <h3 className="text-xl font-bold tracking-tight text-foreground">{group.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                                        {group.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {group.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3 text-xs text-muted-foreground">
                                                <span className="mt-1.5 w-1 h-1 rounded-none bg-foreground shrink-0" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        );
                    })}

                    {/* Public Services Highlight */}
                    <FadeIn delay={0.4} className="md:col-span-2">
                        <a 
                            href="#services" 
                            className="group flex flex-col md:flex-row items-center justify-between p-8 border border-border bg-background hover:bg-muted/10 transition-all duration-500"
                            data-interactable="true"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                                    <Globe className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-bold tracking-tight text-foreground">Free Public Services</h3>
                                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                        I am running some free public services including DNS, DoH, and privacy tools.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0 px-6 py-2 border border-foreground/30 text-[10px] font-mono tracking-widest uppercase group-hover:bg-foreground group-hover:text-background transition-all">
                                View Services
                            </div>
                        </a>
                    </FadeIn>
                </div>
            </div>

            <RackModel />

            {/* Journey Section Merged */}
            <div className="mt-48 pt-32 border-t border-border/50">
                <SectionHeader 
                    number="01.2"
                    label="Journey"
                    title="The"
                    description="Journey"
                    summary="A timeline of my progress, from writing my first lines of code to managing rack-scale infrastructure."
                />

                <div className="relative pl-6 md:pl-0 mt-24" ref={timelineRef}>
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
            </div>
        </section>
    );
}
