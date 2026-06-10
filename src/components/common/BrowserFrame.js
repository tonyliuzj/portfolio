import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import LazyIframe from "@/components/common/LazyIframe";
import Skeleton from "@/components/common/Skeleton";
import useNearViewport from "@/lib/useNearViewport";

export default function BrowserFrame({ children, url, title, src, projectLink, frameClassName = "h-[600px] md:h-[700px]" }) {
    const [isInteracting, setIsInteracting] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [hasFrameLoaded, setHasFrameLoaded] = useState(false);
    const [isFrameReachable, setIsFrameReachable] = useState(false);
    const [frameRef, isNearViewport] = useNearViewport('1000px');
    const hasIframe = Boolean(src);
    const hasLoaded = hasFrameLoaded && isFrameReachable;

    useEffect(() => {
        if (isNearViewport) {
            setShouldLoad(true);
        }
    }, [isNearViewport]);

    useEffect(() => {
        setHasFrameLoaded(false);
        setIsFrameReachable(false);
    }, [src]);

    useEffect(() => {
        if (!hasIframe || !shouldLoad || !src) return;

        const controller = new AbortController();

        fetch(src, {
            cache: 'no-store',
            mode: 'no-cors',
            signal: controller.signal,
        })
            .then(() => setIsFrameReachable(true))
            .catch(() => {});

        return () => controller.abort();
    }, [hasIframe, shouldLoad, src]);

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
                className={`relative w-full ${frameClassName} bg-muted/5 group`}
                onMouseLeave={() => setIsInteracting(false)}
            >
                {hasIframe && !hasLoaded && (
                    <div className="absolute inset-0 z-[1] p-4 sm:p-6">
                        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-3 w-24 rounded-full" />
                                <Skeleton className="h-3 w-40 rounded-full" />
                            </div>
                            <Skeleton className="h-full w-full rounded-none" />
                            <div className="grid grid-cols-3 gap-3">
                                <Skeleton className="h-12 rounded-none" />
                                <Skeleton className="h-12 rounded-none" />
                                <Skeleton className="h-12 rounded-none" />
                            </div>
                        </div>
                    </div>
                )}

                {hasIframe && (
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
                )}

                {hasIframe ? (
                    <LazyIframe
                        shouldLoad={shouldLoad}
                        src={src}
                        onLoad={() => setHasFrameLoaded(true)}
                        className={`relative z-[2] w-full h-full border-0 transition-all duration-500 ${hasLoaded ? 'opacity-100' : 'opacity-0'} ${isInteracting ? 'pointer-events-auto' : 'pointer-events-none grayscale'}`}
                        title={title}
                        sandbox="allow-forms allow-same-origin allow-scripts"
                    />
                ) : children}
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
