import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import LazyIframe from "@/components/common/LazyIframe";
import FadeIn from "@/components/interactive/FadeIn";
import SectionHeader from "@/components/common/SectionHeader";
import useNearViewport from "@/lib/useNearViewport";

function BrowserFrame({ url, title, src, projectLink }) {
    const [isInteracting, setIsInteracting] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [frameRef, isNearViewport] = useNearViewport('1000px');

    useEffect(() => {
        if (isNearViewport) {
            setShouldLoad(true);
        }
    }, [isNearViewport]);

    return (
        <div className="w-full bg-background border-y border-border flex flex-col">
            <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/10">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
                <div className="flex-1 bg-background/50 border border-border rounded-none px-3 py-1 text-[10px] text-muted-foreground font-mono text-center truncate">
                    {url}
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-interactable="true">
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
            <div 
                ref={frameRef}
                className="relative w-full h-[600px] md:h-[700px] bg-muted/5 group"
                onMouseLeave={() => setIsInteracting(false)}
            >
                <div
                    className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[2px] transition-all duration-300 cursor-pointer
                    ${isInteracting ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-background/20'}`}
                    onClick={() => {
                        setShouldLoad(true);
                        setIsInteracting(true);
                    }}
                    data-interactable="true"
                >
                    <span className="px-4 py-2 bg-foreground text-background text-xs font-bold uppercase tracking-widest pointer-events-none">
                        Click to Interact
                    </span>
                </div>

                <LazyIframe
                    shouldLoad={shouldLoad}
                    src={src}
                    className={`w-full h-full border-0 transition-all duration-500 ${isInteracting ? 'pointer-events-auto' : 'pointer-events-none opacity-40 grayscale'}`}
                    title={title}
                    sandbox="allow-forms allow-same-origin allow-scripts"
                />
            </div>
            {projectLink && (
                <div className="flex justify-end px-4 py-2 bg-muted/5 border-t border-border">
                    <a 
                        href={projectLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                        data-interactable="true"
                    >
                        Powered by {projectLink.name}
                        <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                </div>
            )}
        </div>
    );
}

export default function Status() {
    return (
        <section id="status" className="w-full py-32 relative z-10 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
                <SectionHeader
                    number="06"
                    label="Status"
                    title="Live"
                    description="Systems"
                    summary="Real-time uptime monitoring and metrics for all my hosted services and infrastructure nodes."
                />            </div>

            <div className="w-full flex flex-col gap-16 px-4 md:px-12 lg:px-24">
                <FadeIn delay={0.2} className="w-full">
                    <BrowserFrame 
                        url="https://statusno.de" 
                        title="System Status" 
                        src="https://statusno.de" 
                        projectLink={{ name: "KumaView", url: "https://github.com/tonyliuzj/kumaview" }}
                    />
                </FadeIn>
                <FadeIn delay={0.4} className="w-full">
                    <BrowserFrame 
                        url="https://monitorno.de" 
                        title="System Monitor" 
                        src="https://monitorno.de" 
                        projectLink={{ name: "PocketView", url: "https://github.com/tonyliuzj/pocketview" }}
                    />
                </FadeIn>
            </div>
        </section>
    );
}
