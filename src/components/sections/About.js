import { motion } from 'framer-motion';
import { Route, Server } from "lucide-react";
import FadeIn from "@/components/interactive/FadeIn";
import RackModel from "./RackModel";
import SectionHeader from "@/components/common/SectionHeader";

export default function About() {
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
                description="Complexity."
                color="violet-400"
            />

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-5">
                    <FadeIn delay={0.1}>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-8 leading-[1.1]">
                            Building web projects while learning the infrastructure underneath.
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
                </div>
            </div>

            <RackModel />
        </section>
    );
}
