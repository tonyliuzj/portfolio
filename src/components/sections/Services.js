import { useState } from "react";
import { ExternalLink, Globe, Copy, Check, Search, Mail, Link as LinkIcon, Shield } from "lucide-react";
import FadeIn from "@/components/interactive/FadeIn";
import SectionHeader from "@/components/common/SectionHeader";

function CopyButton({ text, label, className = "" }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className={`flex items-center gap-3 px-6 py-3 border border-border bg-background hover:bg-muted/10 transition-colors group ${className}`}
            data-interactable="true"
        >
            <span className="font-mono text-sm">{label || text}</span>
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />}
        </button>
    );
}

function LinkButton({ href, label }) {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 border border-border bg-foreground text-background hover:bg-foreground/90 transition-colors group w-max"
            data-interactable="true"
        >
            <span className="font-mono text-sm tracking-widest uppercase">{label}</span>
            <ExternalLink className="w-4 h-4" />
        </a>
    );
}

export default function Services() {
    return (
        <section id="services" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10 border-t border-border/50">
            <SectionHeader 
                number="05"
                label="Services"
                title="Public"
                description="Services"
            />

            <div className="flex flex-col mt-24">
                
                {/* 1. Link Shortener */}
                <FadeIn delay={0.1}>
                    <div className="py-24 border-b border-border/50">
                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 border border-border bg-muted/5">
                                        <LinkIcon className="w-6 h-6 text-foreground" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Link Shortener.</h3>
                                </div>
                                <p className="text-lg text-muted-foreground font-light mb-8 max-w-xl">
                                    A minimalist and modern link shortening service, powered by Link Guide. Open for public use to transform long URLs into concise, trackable links.
                                </p>
                                <div className="flex gap-2 mb-8">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">Link Guide</span>
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">URL Shortener</span>
                                </div>
                                <LinkButton href="https://linkgui.de" label="Visit linkgui.de" />
                            </div>
                            <div className="lg:col-span-4 hidden lg:flex justify-end opacity-10">
                                <LinkIcon className="w-64 h-64" strokeWidth={0.5} />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* 2. EmailNode */}
                <FadeIn delay={0.2}>
                    <div className="py-24 border-b border-border/50 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full border border-border flex items-center justify-center mb-8 bg-muted/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-foreground/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <Mail className="w-10 h-10 text-foreground relative z-10" strokeWidth={1} />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">EmailNode.</h3>
                        <p className="text-lg text-muted-foreground font-light mb-8 max-w-2xl">
                            An email receiving service offering free, disposable email addresses. Protect your primary inbox from spam and tracking.
                        </p>
                        <div className="flex gap-2 justify-center mb-10">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">Email</span>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">Privacy</span>
                        </div>
                        <LinkButton href="https://emailno.de" label="Open EmailNode" />
                    </div>
                </FadeIn>

                {/* 3. Public DNS Server */}
                <FadeIn delay={0.3}>
                    <div className="py-24 border-b border-border/50">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 bg-[#0a0a0a] rounded-lg p-6 border border-border shadow-2xl relative overflow-hidden group">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                                </div>
                                <div className="font-mono text-sm text-green-400 mb-4">$ dig @188.68.50.56 example.com</div>
                                <div className="font-mono text-xs text-muted-foreground/70 leading-relaxed mb-6">
                                    ; &lt;&lt;&gt;&gt; DiG 9.18.x &lt;&lt;&gt;&gt; @188.68.50.56 example.com<br/>
                                    ;; global options: +cmd<br/>
                                    ;; Got answer:<br/>
                                    ;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 6112<br/>
                                    ;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1<br/>
                                    <br/>
                                    ;; Query time: 14 msec<br/>
                                    ;; SERVER: 188.68.50.56#53(188.68.50.56)<br/>
                                </div>
                                <CopyButton text="188.68.50.56" label="188.68.50.56" className="w-full justify-center bg-white/5 border-white/10 hover:bg-white/10" />
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Public DNS Server.</h3>
                                </div>
                                <p className="text-lg text-muted-foreground font-light mb-8">
                                    A free, public DNS server powered by PowerDNS, providing reliable and fast domain name resolution without logging your queries.
                                </p>
                                <div className="flex gap-2 mb-8">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">DNS</span>
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">PowerDNS</span>
                                </div>
                                <CopyButton text="188.68.50.56" label="Copy IP Address" />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* 4. Public DoH Service */}
                <FadeIn delay={0.4}>
                    <div className="py-24 border-b border-border/50">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 bg-muted/5 border border-border p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
                                <Shield className="w-64 h-64" strokeWidth={0.5} />
                            </div>
                            <div className="relative z-10 max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center gap-3">
                                    <Shield className="w-8 h-8 text-foreground" />
                                    Public DoH Service.
                                </h3>
                                <p className="text-lg text-muted-foreground font-light mb-6">
                                    DNS over HTTPS (DoH) service powered by PowerDNS. Encrypt your DNS queries to prevent tracking and spoofing on public networks.
                                </p>
                                <div className="flex gap-2">
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1 bg-background">DoH</span>
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1 bg-background">Security</span>
                                </div>
                            </div>
                            <div className="relative z-10 shrink-0 w-full lg:w-auto">
                                <div className="mb-3 text-xs text-muted-foreground font-mono uppercase tracking-widest">Query Endpoint</div>
                                <div className="bg-background border border-border px-4 py-2 font-mono text-xs text-foreground mb-4 break-all">
                                    https://dns.liuzj.net/dns-query
                                </div>
                                <CopyButton text="https://dns.liuzj.net/dns-query" label="Copy DoH URL" className="w-full lg:w-auto justify-center" />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* 5. SearXNG Search Engine */}
                <FadeIn delay={0.5}>
                    <div className="py-24">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 flex justify-center items-center gap-3">
                                <Globe className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                                SearXNG Search Engine.
                            </h3>
                            <p className="text-lg text-muted-foreground font-light mb-6">
                                A privacy-respecting, hackable metasearch engine. Aggregates results from multiple search services without tracking your footprint.
                            </p>
                            <div className="flex gap-2 justify-center">
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">SearXNG</span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">Privacy</span>
                            </div>
                        </div>
                        
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute inset-0 bg-foreground/5 blur-xl group-hover:bg-foreground/10 transition-colors duration-500 rounded-full" />
                            <a 
                                href="https://search.liuzj.net/" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center gap-4 w-full p-4 border border-border bg-background hover:border-foreground/50 transition-colors shadow-lg"
                                data-interactable="true"
                            >
                                <Search className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0 ml-2" />
                                <span className="font-mono text-muted-foreground group-hover:text-foreground transition-colors flex-1 text-left truncate">Search the web privately...</span>
                                <div className="px-4 py-2 bg-foreground text-background text-xs font-mono uppercase tracking-widest shrink-0 hidden sm:block">
                                    Search
                                </div>
                            </a>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </section>
    );
}