import { ShieldCheck, Globe } from "lucide-react";
import BrowserFrame from "@/components/common/BrowserFrame";
import FadeIn from "@/components/interactive/FadeIn";
import SectionHeader from "@/components/common/SectionHeader";

const domainsData = [
    { "label": "Tony-Liu.com", "url": "https://tony-liu.com", "type": "domain" },
    { "label": "TonyLiu.cloud", "url": "https://tonyliu.cloud", "type": "redirect" },
    { "label": "TonyLiu.uk", "url": "https://tonyliu.uk", "type": "redirect" },
    { "label": "LiuZJ.net", "url": "https://liuzj.net", "type": "redirect" },
    { "label": "Liu.my.id", "url": "https://liu.my.id", "type": "redirect" },
    { "label": "Tony.Liu.my.id", "url": "https://tony.liu.my.id", "type": "redirect" },
    { "label": "Liu.us.kg", "url": "https://liu.us.kg", "type": "alias" },
    { "label": "Liu.xx.kg", "url": "https://liu.xx.kg", "type": "alias" },
    { "label": "Liu.is-a-fullstack.dev", "url": "https://liu.is-a-fullstack.dev", "type": "alias" },
    { "label": "Liu.is-cool.dev", "url": "https://liu.is-cool.dev", "type": "alias" },
    { "label": "Liu.is-local.org", "url": "https://liu.is-local.org", "type": "alias" },
    { "label": "Liu.is-not-a.dev", "url": "https://liu.is-not-a.dev", "type": "alias" },
    { "label": "Liu.is-a-good.dev", "url": "https://liu.is-a-good.dev", "type": "alias" },
    { "label": "Liu.localplayer.dev", "url": "https://liu.localplayer.dev", "type": "alias" },
    { "label": "Tony.LiuZJ.workers.dev", "url": "https://tony.liuzj.workers.dev", "type": "alias" },
    { "label": "TonyLiuZJ.github.io", "url": "https://tonyliuzj.github.io", "type": "alias" },
    { "label": "LiuZJ.duckdns.org", "url": "https://liuzj.duckdns.org", "type": "alias" },
    { "label": "TonyLiuZJ.duckdns.org", "url": "https://tonyliuzj.duckdns.org", "type": "alias" },
    { "label": "TonyLiu.ddnsfree.com", "url": "https://tonyliu.ddnsfree.com", "type": "alias" },
    { "label": "TonyLiu.ddnsgeek.com", "url": "https://tonyliu.ddnsgeek.com", "type": "alias" },
    { "label": "TonyLiu.freeddns.org", "url": "https://tonyliu.freeddns.org", "type": "alias" },
    { "label": "TonyLiu.loseyourip.com", "url": "https://tonyliu.loseyourip.com", "type": "alias" },
    { "label": "Liu.qd.je", "url": "https://liu.qd.je", "type": "alias" },
    { "label": "Tony.zone.id", "url": "https://tony.zone.id", "type": "alias" },
    { "label": "Tony.nett.to", "url": "https://tony.nett.to", "type": "alias" },
    { "label": "TonyLiu.indevs.in", "url": "https://tonyliu.indevs.in", "type": "alias" },
    { "label": "LiuZJ.indevs.in", "url": "https://liuzj.indevs.in", "type": "alias" },
    { "label": "Tony.sryze.cc", "url": "https://tony.sryze.cc", "type": "alias" },
    { "label": "Liu.ryzedns.org", "url": "https://liu.ryzedns.org", "type": "alias" },
    { "label": "TonyLiu.pp.ua", "url": "https://tonyliu.pp.ua", "type": "alias" },
    { "label": "LiuZJ.pp.ua", "url": "https://liuzj.pp.ua", "type": "alias" },
    { "label": "TonyLiuZJ.pp.ua", "url": "https://tonyliuzj.pp.ua", "type": "alias" },
    { "label": "TonyLiu.qzz.io", "url": "https://tonyliu.qzz.io", "type": "alias" },
    { "label": "LiuZJ.bbroot.com", "url": "https://liuzj.bbroot.com", "type": "alias" },
    { "label": "LiuZJ.ccwu.cc", "url": "https://liuzj.ccwu.cc", "type": "alias" },
    { "label": "LiuZJ.cn.mt", "url": "https://liuzj.cn.mt", "type": "alias" },
    { "label": "TonyLiu.bbroot.com", "url": "https://tonyliu.bbroot.com", "type": "alias" },
    { "label": "TonyLiu.ccwu.cc", "url": "https://tonyliu.ccwu.cc", "type": "alias" },
    { "label": "TonyLiu.cn.mt", "url": "https://tonyliu.cn.mt", "type": "alias" },
    { "label": "LiuZJ.cc.cd", "url": "https://liuzj.cc.cd", "type": "alias" },
    { "label": "Liu.my.uy", "url": "https://liu.my.uy", "type": "alias" },
    { "label": "Liu.ee.cd", "url": "https://liu.ee.cd", "type": "alias" },
    { "label": "Tony.int.yt", "url": "https://tony.int.yt", "type": "alias" },
    { "label": "TonyLiu.int.yt", "url": "https://tonyliu.int.yt", "type": "alias" },
    { "label": "LiuZJ.int.yt", "url": "https://liuzj.int.yt", "type": "alias" },
    { "label": "Liu.rweb.site", "url": "https://liu.rweb.site", "type": "alias" },
    { "label": "Liu.foo.ng", "url": "https://liu.foo.ng", "type": "alias" },
    { "label": "Liu.js.org", "url": "https://liu.js.org", "type": "alias" },
    { "label": "Liu.2bd.net", "url": "https://liu.2bd.net", "type": "alias" },
    { "label": "Liu.jo3.org", "url": "https://liu.jo3.org", "type": "alias" },
    { "label": "Liu.work.gd", "url": "https://liu.work.gd", "type": "alias" }
];

export default function Infrastructure() {
    const domains = domainsData;
    const cloudflareRecords = {
        a: ['104.21.75.157', '172.67.178.111'],
        aaaa: ['2606:4700:3030::6815:4b9d', '2606:4700:3033::ac43:b26f'],
    };
    
    // Separate aliases from main domains
    const primaryDomains = domains.filter(d => d.type !== 'alias');
    const aliasDomains = domains.filter(d => d.type === 'alias');

    return (
        <section id="infrastructure" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10">
            <SectionHeader 
                number="04"
                label="Infrastructure"
                title="Backbone"
                description="Fabric"
                summary="The underlying operations layer of my portfolio. A look into the homelab, routing, and virtualization stack."
            />

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start w-full min-w-0">
                <div className="min-w-0 w-full">
                    <FadeIn delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-6">
                            Routing & Telemetry
                        </h2>
                        <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12 max-w-md w-full">
                            The operations layer for the portfolio. Exploring abstract DNS routing, edge protection, and live monitoring surfaces.
                        </p>
                    </FadeIn>

                    {/* Routing Path */}
                    <FadeIn delay={0.2}>
                        <div className="relative border-l border-border ml-4 space-y-12 pb-8 overflow-hidden">
                            <div className="relative pl-8">
                                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-foreground" />
                                <h4 className="text-sm font-bold text-foreground tracking-wide uppercase mb-1">DNS Resolution</h4>
                                <p className="text-xs text-muted-foreground font-mono truncate">nameserver.ing</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-foreground/50" />
                                <h4 className="text-sm font-bold text-foreground tracking-wide uppercase mb-1">Public Edge</h4>
                                <p className="text-xs text-muted-foreground font-mono truncate">Cloudflare Anycast</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-background border border-foreground" />
                                <h4 className="text-sm font-bold text-foreground tracking-wide uppercase mb-1">Origin Host</h4>
                                <p className="text-xs text-muted-foreground font-mono truncate">hostname.ee</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                <div className="space-y-8 min-w-0 w-full">
                    {/* Security Node */}
                    <FadeIn delay={0.3}>
                        <div className="border border-border bg-background p-8 relative overflow-hidden group" data-interactable="true">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldCheck className="w-24 h-24 text-foreground" strokeWidth={0.5} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest font-semibold text-foreground">Protected Edge</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="border-b border-border pb-4">
                                        <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-2">IPv4 Edge</span>
                                        {cloudflareRecords.a.map(ip => <div key={ip} className="font-mono text-sm text-foreground">{ip}</div>)}
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-2">IPv6 Edge</span>
                                        {cloudflareRecords.aaaa.map(ip => <div key={ip} className="font-mono text-sm text-foreground">{ip}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Domains Matrix */}
                    <FadeIn delay={0.4}>
                        <div className="border border-border bg-muted/10 p-8 overflow-hidden flex flex-col min-w-0 w-full">
                            <div className="flex items-center gap-3 mb-8">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm uppercase tracking-widest font-semibold text-foreground">Registered Domains</span>
                            </div>
                            
                            {/* Primary Domains Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                {primaryDomains.map((domain, i) => (
                                    <a key={i} href={domain.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 p-4 border border-border/50 hover:bg-muted/30 transition-colors overflow-hidden" data-interactable="true">
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{domain.type}</span>
                                        <span className="font-mono text-xs text-foreground truncate">{domain.label}</span>
                                    </a>
                                ))}
                            </div>

                            {/* Tor Onion Service */}
                            <div className="mb-8 border border-border/50 p-4 hover:bg-muted/30 transition-colors w-full overflow-hidden">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">onion</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse shrink-0"></div>
                                        <span className="text-[8px] uppercase tracking-widest text-emerald-500/80 font-mono shrink-0">Live</span>
                                    </div>
                                </div>
                                <a 
                                    href="http://tonyliuzjm4hmzzu3fnjhzuhaugfxivm6xyapadcu2olnrq3ixyoixyd.onion"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[11px] sm:text-xs text-foreground hover:opacity-80 transition-opacity break-all block w-full min-w-0"
                                    data-interactable="true"
                                >
                                    tonyliuzjm4hmzzu3fnjhzuhaugfxivm6xyapadcu2olnrq3ixyoixyd.onion
                                </a>
                            </div>

                            {/* Alias Domains Marquee */}
                            {aliasDomains.length > 0 && (
                                <div className="relative flex items-center border-t border-border pt-6 mt-auto min-w-0 w-full">
                                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground border-r border-border pr-4 mr-6 shrink-0">
                                        Aliases
                                    </span>
                                    <div className="relative flex-1 overflow-x-hidden min-w-0">
                                        <span className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[hsl(var(--muted)/0.1)] to-transparent z-10 pointer-events-none" />
                                        <span className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[hsl(var(--muted)/0.1)] to-transparent z-10 pointer-events-none" />
                                        
                                        <div className="flex w-max whitespace-nowrap animate-domain-marquee">
                                            {[0, 1].map((groupIndex) => (
                                                <div key={groupIndex} className="flex shrink-0 gap-8 pr-8" aria-hidden={groupIndex === 1}>
                                                    {aliasDomains.map((domain) => (
                                                        <a
                                                            key={`${groupIndex}-${domain.url}`}
                                                            href={domain.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            tabIndex={groupIndex === 1 ? -1 : undefined}
                                                            className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                                                            data-interactable="true"
                                                        >
                                                            {domain.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>

            <FadeIn delay={0.5} className="mt-16 w-full">
                <BrowserFrame
                    url="https://status.tony-liu.com"
                    title="Tony Liu Infrastructure Status"
                    frameClassName="h-[520px] md:h-[640px]"
                >
                    <a
                        href="https://status.tony-liu.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full w-full flex-col justify-between p-6 sm:p-8 md:p-10 hover:bg-muted/10 transition-colors"
                        data-interactable="true"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Live Operations</span>
                            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-emerald-500/80 font-mono">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                                Online
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Status Endpoint</p>
                                <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground break-words">
                                    status.tony-liu.com
                                </h3>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {['Services', 'Latency', 'Incidents'].map((metric) => (
                                    <div key={metric} className="border border-border/60 bg-background/50 p-4">
                                        <span className="block text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-3">{metric}</span>
                                        <span className="font-mono text-sm text-foreground">Monitoring</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
                            <span className="font-mono text-xs text-muted-foreground truncate">https://status.tony-liu.com</span>
                            <span className="shrink-0 bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest text-background">
                                Open Status
                            </span>
                        </div>
                    </a>
                </BrowserFrame>
            </FadeIn>
        </section>
    );
}
