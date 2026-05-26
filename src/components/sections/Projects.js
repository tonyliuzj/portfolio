import { ExternalLink } from "lucide-react";
import FadeIn from "@/components/interactive/FadeIn";
import GithubStars from "@/components/interactive/GithubStars";
import SectionHeader from "@/components/common/SectionHeader";
const projectsData = [
    {
      "id": 1,
      "title": "Komari Next",
      "url": "https://github.com/tonyliuzj/komari-next",
      "description": "Komari-Next is a modern frontend for the Komari monitoring project. It is built with Next.js, TypeScript, Tailwind CSS and Shadcn UI and packaged as a static site that can be used as a Komari theme.",
      "stats": true,
      "badges": [
        { "text": "Next.js", "color": "indigo" },
        { "text": "API", "color": "indigo" },
        { "text": "shadcn/ui", "color": "emerald" }
      ]
    },
    {
      "id": 2,
      "title": "Link Guide",
      "url": "https://github.com/tonyliuzj/link-guide",
      "description": "Link Guide is a modern, minimalistic URL shortener that transforms long links into concise, trackable URLs.",
      "stats": true,
      "badges": [
        { "text": "Next.js", "color": "indigo" },
        { "text": "API", "color": "indigo" },
        { "text": "Secure", "color": "indigo" }
      ]
    },
    {
      "id": 3,
      "title": "Mailsy",
      "url": "https://github.com/tonyliuzj/mailsy",
      "description": "A simple, modern disposable email web app built with Next.js, shadcn/ui, and SQLite.",
      "stats": true,
      "badges": [
        { "text": "Next.js", "color": "emerald" },
        { "text": "shadcn/ui", "color": "emerald" },
        { "text": "SQLite", "color": "emerald" }
      ]
    },
    {
      "id": 4,
      "title": "KumaView",
      "url": "https://github.com/tonyliuzj/kumaview",
      "description": "A modern frontend dashboard for monitoring multiple Uptime Kuma instances, built with Next.js, shadcn/ui, and SQLite.",
      "stats": true,
      "badges": [
        { "text": "Next.js", "color": "emerald" },
        { "text": "shadcn/ui", "color": "emerald" },
        { "text": "SQLite", "color": "emerald" }
      ]
    },
    {
      "id": 5,
      "title": "PocketView",
      "url": "https://github.com/tonyliuzj/pocketview",
      "description": "A modern, lightweight web interface for monitoring system metrics and performance. Built with Next.js and designed to work seamlessly with PocketBase (Beszel).",
      "stats": true,
      "badges": [
        { "text": "Next.js", "color": "emerald" },
        { "text": "shadcn/ui", "color": "emerald" },
        { "text": "SQLite", "color": "emerald" }
      ]
    },
    {
      "id": 6,
      "title": "Librix",
      "url": "https://github.com/tonyliuzj/librix",
      "description": "A front-end NEXT.JS application for HTTP/WebDAV–style servers.",
      "stats": true,
      "badges": [
        { "text": "Next.js", "color": "emerald" },
        { "text": "shadcn/ui", "color": "emerald" },
        { "text": "SQLite", "color": "emerald" }
      ]
    },
    {
      "id": 7,
      "title": "scan4domain",
      "url": "https://github.com/tonyliuzj/scan4domain",
      "description": "A Python tool for generating domain combinations and checking domain registration status.",
      "stats": true,
      "badges": [
        { "text": "Python", "color": "yellow" }
      ]
    },
    {
      "id": 8,
      "title": "available-domains",
      "url": "https://github.com/tonyliuzj/available-domains",
      "description": "A list of domains that are available to register, using scan4domain",
      "stats": true,
      "badges": [
        { "text": "Python", "color": "yellow" }
      ]
    }
];

export default function Projects() {
    const projects = projectsData;

    return (
        <section id="projects" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10">
            <SectionHeader 
                number="02"
                label="Projects"
                title="Featured"
                description="Projects."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-32">
                {projects.map((item, index) => {
                    const isEven = index % 2 === 0;
                    // Create an asymmetrical layout by pushing odd items down on desktop
                    const mtClass = !isEven ? 'md:mt-32' : '';

                    return (
                        <FadeIn key={item.id} delay={0.1} className={mtClass}>
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group block relative"
                                data-interactable="true"
                            >
                                {/* Minimalist card */}
                                <div className="p-8 md:p-12 bg-background border border-border transition-colors duration-500 group-hover:bg-muted/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                    
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="flex flex-wrap gap-2">
                                            {item.badges?.slice(0, 2).map((badge, bIdx) => (
                                                <span key={bIdx} className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">
                                                    {badge.text}
                                                </span>
                                            ))}
                                            {item.stats && <GithubStars url={item.url} />}
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" strokeWidth={1} />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </a>
                        </FadeIn>
                    );
                })}
            </div>

            {/* Bottom GitHub Link */}
            <FadeIn delay={0.2} className="mt-24 flex justify-center">
                <a 
                    href="https://github.com/tonyliuzj" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 px-6 py-3 text-xs font-mono tracking-widest uppercase border border-border/50 text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                    View more projects on GitHub
                    <ExternalLink className="w-4 h-4" />
                </a>
            </FadeIn>
        </section>
    );
}