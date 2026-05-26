import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/interactive/FadeIn";

function ContactLink({ href, label, icon: Icon, value }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-6 md:p-8 border border-border bg-background hover:bg-muted/10 transition-all duration-500"
            data-interactable="true"
        >
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</span>
                    <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">{value}</span>
                </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
        </a>
    );
}

export default function Contact() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="w-full border-t border-border bg-background pt-32 pb-16 relative z-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="flex items-center gap-6 mb-16">
                        <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                            07 // Contact
                        </span>
                        <div className="h-[1px] flex-1 bg-border/50 max-w-[200px]"></div>
                        <a 
                            href="#example" 
                            className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                            data-interactable="true"
                        >
                            Example
                        </a>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground mb-8">
                                Let's <br className="hidden md:block" />
                                <span className="text-muted-foreground">Collaborate.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-md leading-relaxed">
                                Currently exploring new opportunities in full-stack engineering and infrastructure. Reach out if you'd like to build something meaningful together.
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <ContactLink 
                                href="mailto:tony@liuzj.net" 
                                label="Email" 
                                icon={Mail} 
                                value="tony@liuzj.net" 
                            />
                            <ContactLink 
                                href="https://github.com/tonyliuzj" 
                                label="GitHub" 
                                icon={Github} 
                                value="tonyliuzj" 
                            />
                            <ContactLink 
                                href="https://linkedin.com/in/tonyliuzj" 
                                label="LinkedIn" 
                                icon={Linkedin} 
                                value="Tony Liu" 
                            />
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-12 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                        <p>© {year} Tony Liu. All rights reserved.</p>
                        <div className="flex gap-8 mt-6 md:mt-0">
                            <p>Abstracting Complexity</p>
                            <p>Built with Next.js</p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </footer>
    );
}