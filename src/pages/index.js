import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Activity, Compass, Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown, Globe, ShieldCheck } from "lucide-react"

const inter = Inter({ subsets: ['latin'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });
const defaultDomains = [
    { label: 'Tony-Liu.com', url: 'https://tony-liu.com', type: 'domain' }
];
const domainTypeOrder = ['domain', 'redirect', 'alias'];
const domainTypeConfig = {
    domain: {
        label: 'Primary',
        title: 'Primary Domain',
        description: 'Canonical home for the portfolio.',
        badgeClass: 'border-indigo-400/20 bg-indigo-400/10 text-indigo-200',
    },
    redirect: {
        label: 'Redirect',
        title: 'Redirects',
        description: 'Domains that forward visitors to the main site.',
        badgeClass: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
    },
    alias: {
        label: 'Alias',
        title: 'Aliases',
        description: 'Extra hostnames that resolve to the portfolio.',
        badgeClass: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
    },
};

const normalizeDomainType = (type, index = 0) => {
    if (domainTypeOrder.includes(type)) return type;
    return index === 0 ? 'domain' : 'alias';
};

const stripTrailingCommas = (input) => {
    let output = '';
    let inString = false;
    let isEscaped = false;

    for (let index = 0; index < input.length; index += 1) {
        const char = input[index];

        if (isEscaped) {
            output += char;
            isEscaped = false;
            continue;
        }

        if (inString && char === '\\') {
            output += char;
            isEscaped = true;
            continue;
        }

        if (char === '"') {
            inString = !inString;
            output += char;
            continue;
        }

        if (!inString && char === ',') {
            let nextIndex = index + 1;

            while (nextIndex < input.length && /\s/.test(input[nextIndex])) {
                nextIndex += 1;
            }

            if (input[nextIndex] === ']' || input[nextIndex] === '}') {
                continue;
            }
        }

        output += char;
    }

    return output;
};

const parsePortfolioData = (text) => {
    try {
        return JSON.parse(text);
    } catch (error) {
        const sanitizedText = stripTrailingCommas(text);

        if (sanitizedText === text) {
            throw error;
        }

        try {
            console.warn('Recovered malformed portfolio data by removing trailing commas.');
            return JSON.parse(sanitizedText);
        } catch {
            throw error;
        }
    }
};

const parsePortfolioItems = (items) => {
    if (!Array.isArray(items)) return [];

    return items
        .filter((item) =>
            typeof item?.title === 'string' &&
            typeof item?.description === 'string' &&
            typeof item?.url === 'string'
        )
        .map((item, index) => ({
            id: item.id ?? `${item.title}-${index}`,
            ...item,
            badges: Array.isArray(item.badges)
                ? item.badges.filter((badge) =>
                    typeof badge?.text === 'string' && typeof badge?.color === 'string'
                )
                : [],
        }));
};

const parseDomains = (domains) => {
    if (!Array.isArray(domains)) return defaultDomains;

    const validDomains = domains
        .filter((domain) =>
            typeof domain?.label === 'string' && typeof domain?.url === 'string'
        )
        .map((domain, index) => ({
            ...domain,
            type: normalizeDomainType(domain.type, index),
        }));

    return validDomains.length > 0 ? validDomains : defaultDomains;
};

// Interactive Iframe Component - Prevents scroll trap on mobile
function InteractiveIframe({ src, title }) {
    const [isInteracting, setIsInteracting] = useState(false);

    return (
        <div
            className="relative w-full h-[60vh] md:h-[80vh] bg-black/20"
            onMouseLeave={() => setIsInteracting(false)}
        >
            <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300 cursor-pointer
                ${isInteracting ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-black/30'}`}
                onClick={() => setIsInteracting(true)}
            >
                <Button variant="secondary" size="sm" className="pointer-events-none">
                    Click to Interact
                </Button>
            </div>

            <iframe
                src={src}
                className={`w-full h-full border-0 transition-all duration-500 ${isInteracting ? 'pointer-events-auto' : 'pointer-events-none opacity-40'}`}
                title={title}
                sandbox="allow-forms allow-same-origin allow-scripts"
            />
        </div>
    );
}

function DnsInfo({ externalLinkProps }) {
    const [ipRecords, setIpRecords] = useState({ a: [], aaaa: [] });
    const [loadingIPs, setLoadingIPs] = useState(true);

    const staticNS = ['ns1.nameserver.ing', 'ns2.nameserver.ing'];

    useEffect(() => {
        const fetchIPs = async () => {
            try {
                const fetchDNS = async (name, typeCode) => {
                    const typeStr = typeCode === 1 ? 'A' : 'AAAA';
                    const res = await fetch(`https://dns.google/resolve?name=${name}&type=${typeStr}`);
                    const data = await res.json();
                    if (!data.Answer) return [];
                    return data.Answer.filter(r => r.type === typeCode).map(r => r.data);
                };

                const fetchProvider = async (ip) => {
                    try {
                        const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
                            headers: {
                                Accept: 'application/json',
                            },
                        });
                        if (!res.ok) {
                            return null;
                        }
                        const data = await res.json();
                        if (data.error) {
                            return null;
                        }
                        return data.org || data.asn || null;
                    } catch {
                        return null;
                    }
                };

                const resolveWithProvider = async (name, typeCode) => {
                    const ips = await fetchDNS(name, typeCode);
                    const withProvider = await Promise.all(ips.map(async (ip) => {
                        const provider = await fetchProvider(ip);
                        return { ip, provider };
                    }));
                    return withProvider;
                };

                const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
                
                const [a, aaaa] = await Promise.all([
                    resolveWithProvider('tony-liu.com', 1),
                    resolveWithProvider('tony-liu.com', 28),
                    minDelay
                ]);

                setIpRecords({ a, aaaa });
            } catch (error) {
                console.error('Failed to fetch IP records', error);
            } finally {
                setLoadingIPs(false);
            }
        };

        fetchIPs();
    }, []);

    const SkeletonLoader = () => (
        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
    );

    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-6">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                    <Globe className="w-5 h-5 text-indigo-400" />
                    DNS
                </CardTitle>
                <CardDescription className="text-slate-400">
                    tony-liu.com
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 mb-2">
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-200 text-xs font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                        Protected by Cloudflare
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        Nameservers
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {staticNS.map((r, i) => (
                            <div key={i} className="bg-black/20 rounded px-2 py-1.5 text-xs font-mono text-slate-300 border border-white/5 truncate">
                                {r}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            IPv4 (A)
                        </h4>
                        <div className="grid gap-1.5">
                            {loadingIPs ? (
                                <div className="bg-black/20 rounded px-2 py-1.5 border border-white/5 flex items-center justify-between h-[30px]">
                                    <SkeletonLoader />
                                </div>
                            ) : ipRecords.a.length > 0 ? (
                                ipRecords.a.map((r, i) => (
                                    <div key={i} className="bg-black/20 rounded px-2 py-1.5 text-xs font-mono text-slate-300 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 break-all">
                                        <span>{r.ip}</span>
                                        {r.provider && (
                                            <span className="text-[10px] text-emerald-400/80 font-sans">{r.provider}</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-slate-500 italic">No A records found</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            IPv6 (AAAA)
                        </h4>
                        <div className="grid gap-1.5">
                            {loadingIPs ? (
                                <div className="bg-black/20 rounded px-2 py-1.5 border border-white/5 flex items-center justify-between h-[30px]">
                                    <SkeletonLoader />
                                </div>
                            ) : ipRecords.aaaa.length > 0 ? (
                                ipRecords.aaaa.map((r, i) => (
                                    <div key={i} className="bg-black/20 rounded px-2 py-1.5 text-xs font-mono text-slate-300 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 break-all">
                                        <span>{r.ip}</span>
                                        {r.provider && (
                                            <span className="text-[10px] text-blue-400/80 font-sans">{r.provider}</span>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-slate-500 italic">No AAAA records found</div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="py-2 px-4 bg-white/5 border-t border-white/10 flex justify-end">
                <p className="text-xs text-slate-500">
                    Powered by <a {...externalLinkProps} href="https://nameserver.ing" className="text-indigo-400 hover:text-indigo-300 transition-colors">nameserver.ing</a>
                </p>
            </CardFooter>
        </Card>
    );
}

function UptimeBadge({ className = '', loading = 'lazy' }) {
    return (
        <iframe
            src="https://status.tony-liu.com/badge?theme=dark"
            title="Tony Liu uptime status badge"
            width="250"
            height="30"
            frameBorder="0"
            scrolling="no"
            loading={loading}
            className={`h-[30px] w-full max-w-[250px] ${className}`}
            style={{ colorScheme: 'normal' }}
        />
    );
}

function FooterGroup({ group }) {
    const Icon = group.icon;

    return (
        <section className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-4 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-indigo-300 ring-1 ring-white/10">
                    <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white">{group.title}</h4>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{group.description}</p>
                </div>
            </div>

            <ul className="space-y-2.5 text-sm text-slate-400">
                {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                        <a
                            {...item.linkProps}
                            href={item.href}
                            className="group/link flex min-w-0 items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-indigo-300"
                        >
                            <span className="truncate">{item.label}</span>
                            {item.external && (
                                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover/link:opacity-100" />
                            )}
                        </a>
                    </li>
                ))}
            </ul>

            {group.note && (
                <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-2 text-xs font-medium text-emerald-200">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span>{group.note}</span>
                </div>
            )}

            {group.pills && (
                <div className="mt-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">Nameservers</p>
                    <div className="grid gap-2">
                        {group.pills.map((pill) => (
                            <span key={pill} className="truncate rounded-md border border-white/5 bg-black/25 px-2 py-1.5 font-mono text-xs text-slate-400">
                                {pill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {group.statusBadge && (
                <div className="mt-4 overflow-hidden">
                    <UptimeBadge />
                </div>
            )}
        </section>
    );
}

function DomainFooterGroup({ domains, externalLinkProps }) {
    const domainGroups = domainTypeOrder
        .map((type) => ({
            type,
            ...domainTypeConfig[type],
            domains: domains.filter((domain) => normalizeDomainType(domain.type) === type),
        }))
        .filter((group) => group.domains.length > 0);

    const totalDomains = domains.length;
    const aliasCount = domains.filter((domain) => normalizeDomainType(domain.type) === 'alias').length;

    return (
        <section className="min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-indigo-300 ring-1 ring-white/10">
                        <Globe className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white">Domains</h4>
                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                            Grouped by primary, redirect, and alias records.
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 gap-2 text-[11px] font-medium">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-slate-400">
                        {totalDomains} total
                    </span>
                    {aliasCount > 0 && (
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-cyan-200">
                            {aliasCount} aliases
                        </span>
                    )}
                </div>
            </div>

            <div>
                <div className="grid gap-4">
                    {domainGroups.map((group) => {
                        return (
                            <div key={group.type} className="min-w-0 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                                <div className="mb-2.5 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            {group.title}
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-slate-600">
                                            {group.description}
                                        </p>
                                    </div>
                                    <span className={`shrink-0 rounded-full border px-2 py-1 text-[11px] font-medium ${group.badgeClass}`}>
                                        {group.domains.length}
                                    </span>
                                </div>

                                <div className="grid gap-1.5 sm:grid-cols-2">
                                    {group.domains.map((domain) => (
                                        <a
                                            key={`${group.type}-${domain.url}`}
                                            {...externalLinkProps}
                                            href={domain.url}
                                            className="group/domain flex min-w-0 items-start justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-indigo-300"
                                        >
                                            <span className="min-w-0 flex-1">
                                                <span className="block break-all font-mono text-[13px] leading-5">
                                                    {domain.label}
                                                </span>
                                            </span>
                                            <span className={`mt-0.5 shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${group.badgeClass}`}>
                                                {group.label}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const [isNestedFrame, setIsNestedFrame] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollOpacity, setScrollOpacity] = useState(1);
    const [projects, setProjects] = useState([]);
    const [websites, setWebsites] = useState([]);
    const [domains, setDomains] = useState(defaultDomains);

    const getBadgeClasses = (color) => {
        const colorMap = {
            indigo: 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20',
            emerald: 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20',
            blue: 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20',
            purple: 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20',
            pink: 'bg-pink-500/10 text-pink-300 hover:bg-pink-500/20',
            orange: 'bg-orange-500/10 text-orange-300 hover:bg-orange-500/20',
            red: 'bg-red-500/10 text-red-300 hover:bg-red-500/20',
            green: 'bg-green-500/10 text-green-300 hover:bg-green-500/20',
            yellow: 'bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20',
            teal: 'bg-teal-500/10 text-teal-300 hover:bg-teal-500/20',
            cyan: 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20',
            sky: 'bg-sky-500/10 text-sky-300 hover:bg-sky-500/20',
            violet: 'bg-violet-500/10 text-violet-300 hover:bg-violet-500/20',
            fuchsia: 'bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20',
            rose: 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20',
            amber: 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20',
            lime: 'bg-lime-500/10 text-lime-300 hover:bg-lime-500/20',
            slate: 'bg-slate-500/10 text-slate-300 hover:bg-slate-500/20',
            gray: 'bg-gray-500/10 text-gray-300 hover:bg-gray-500/20',
            white: 'bg-white/10 text-white hover:bg-white/20',
        };
        return colorMap[color] || colorMap.indigo;
    };

    useEffect(() => {
        setMounted(true);
        try {
            setIsNestedFrame(window.self !== window.top);
        } catch {
            setIsNestedFrame(true);
        }

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const windowHeight = window.innerHeight;
                    // Calculate opacity: 1 at top, 0 when scrolled past 50% of viewport
                    const newOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.5)));
                    setScrollOpacity(newOpacity);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('https://tonyliuzj.github.io/portfolio-static/data.json', {
                    cache: 'no-cache',
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const text = await response.text();
                if (!text.trim()) {
                    throw new Error('Empty response');
                }

                const data = parsePortfolioData(text);
                setProjects(parsePortfolioItems(data.projects));
                setWebsites(parsePortfolioItems(data.websites));
                setDomains(parseDomains(data.domains));
            } catch (error) {
                console.error('Failed to fetch content:', error);
            }
        };

        fetchContent();
    }, []);

    function useTypewriter(words, speed = 90, pause = 1500) {
        const [text, setText] = useState('');
        const [index, setIndex] = useState(0);
        const [isDeleting, setIsDeleting] = useState(false);
        const [waiting, setWaiting] = useState(false);

        useEffect(() => {
            if (waiting) return;

            const currentWord = words[index % words.length];

            const update = () => {
                setText((prev) => {
                    if (!isDeleting) {
                        const next = currentWord.substring(0, prev.length + 1);
                        if (next === currentWord) {
                            setWaiting(true);
                            setTimeout(() => {
                                setIsDeleting(true);
                                setWaiting(false);
                            }, pause);
                        }
                        return next;
                    } else {
                        const next = currentWord.substring(0, prev.length - 1);
                        if (next === '') {
                            setIsDeleting(false);
                            setIndex((prevIndex) => prevIndex + 1);
                        }
                        return next;
                    }
                });
            };

            const timer = setTimeout(update, isDeleting ? speed / 2 : speed);
            return () => clearTimeout(timer);
        }, [text, isDeleting, index, waiting, words, speed, pause]);

        return text;
    }

    const phrases = [
        "React", "Node.js", "Next.js", "Python",
        "JavaScript", "Go", "SQLite", "MySQL"
    ];

    const typedText = useTypewriter(phrases);
    const siteTitle = "Tony Liu";
    const siteUrl = "https://tony-liu.com";
    const logoPath = "/parrot.gif";
    const aboutMe = "A student learning full-stack development and building wonderful projects";
    const externalLinkProps = isNestedFrame
        ? { target: '_top' }
        : { target: '_blank', rel: 'noopener noreferrer' };
    const sectionLinkProps = isNestedFrame ? { target: '_top' } : {};

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Projects', href: '#projects' },
        { name: 'Websites', href: '#websites' },
        { name: 'DNS', href: '#dns' },
        { name: 'Status', href: '#status' },
        { name: 'Monitor', href: '#monitor' },
        { name: 'Contact', href: '#contact' },
    ];

    const footerGroups = [
        {
            title: 'Navigation',
            description: 'Jump around the page.',
            icon: Compass,
            items: navItems.map((item) => ({
                label: item.name,
                href: item.href,
                linkProps: sectionLinkProps,
            })),
        },
        {
            title: 'DNS',
            description: 'Records, provider, and nameservers.',
            icon: ShieldCheck,
            items: [
                {
                    label: 'DNS records',
                    href: '#dns',
                    linkProps: sectionLinkProps,
                },
                {
                    label: 'nameserver.ing',
                    href: 'https://nameserver.ing',
                    linkProps: externalLinkProps,
                    external: true,
                },
            ],
            note: 'Cloudflare protected',
            pills: ['ns1.nameserver.ing', 'ns2.nameserver.ing'],
        },
        {
            title: 'Status',
            description: 'Uptime and monitoring surfaces.',
            icon: Activity,
            items: [
                {
                    label: 'Status page',
                    href: '#status',
                    linkProps: sectionLinkProps,
                },
                {
                    label: 'Monitor page',
                    href: '#monitor',
                    linkProps: sectionLinkProps,
                },
                {
                    label: 'Public badge',
                    href: 'https://status.tony-liu.com',
                    linkProps: externalLinkProps,
                    external: true,
                },
            ],
            statusBadge: true,
        },
    ];

    return (
        <div className={`${inter.className} min-h-screen bg-black text-slate-300 selection:bg-indigo-500/30`}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={aboutMe} />
                <link rel="canonical" href={siteUrl} />
                <meta name="robots" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Tony Liu" />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={aboutMe} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:image" content={`${siteUrl}${logoPath}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siteTitle} />
                <meta name="twitter:description" content={aboutMe} />
                <meta name="twitter:image" content={`${siteUrl}${logoPath}`} />
            </Head>

            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="relative z-50 mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-6">
                    <div className="flex items-center gap-2 justify-self-start">
                        <Image
                            src={logoPath}
                            alt=""
                            aria-hidden="true"
                            width={32}
                            height={32}
                            priority
                            unoptimized
                            className="h-8 w-8 shrink-0"
                        />
                        <h1 className="text-white font-bold text-lg tracking-tight">Tony Liu</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden justify-self-center md:flex gap-1">
                        {navItems.map((item) => (
                            <Button key={item.name} variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                                <a {...sectionLinkProps} href={item.href}>{item.name}</a>
                            </Button>
                        ))}
                    </nav>

                    <div className="hidden h-[30px] w-[250px] items-center justify-self-end overflow-hidden xl:flex">
                        <UptimeBadge loading="eager" />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="justify-self-end md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-300 hover:text-white hover:bg-white/10"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-slideDown max-h-[85vh] overflow-y-auto">
                        <nav className="flex flex-col p-4">
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-start text-base font-medium text-slate-400 hover:text-white hover:bg-white/5 h-12 px-4"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <a {...sectionLinkProps} href={item.href}>{item.name}</a>
                                </Button>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            <main id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden">
                
                {/* Background Grid */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    
                    {/* The Blue Glow Effects - Controlled by scrollOpacity */}
                    <div 
                        className="transition-opacity duration-300 ease-out"
                        style={{ opacity: scrollOpacity }}
                    >
                        {/* Static center glow */}
                        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
                        
                        {/* Dynamic Mouse Follower */}
                        {mounted && (
                            <div
                                className="absolute bg-indigo-500/15 rounded-full blur-3xl -z-10 transition-transform duration-75 will-change-transform"
                                style={{
                                    width: '400px',
                                    height: '400px',
                                    left: 0,
                                    top: 0,
                                    transform: `translate(${position.x - 200}px, ${position.y - 200}px)`,
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 text-center max-w-6xl mx-auto pt-20">

                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white animate-slideUp">
                        Hello, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-indigo-300">
                            I am Tony
                        </span>
                    </h2>

                    <div className={`${mono.className} text-sm md:text-base text-slate-400 mb-6 h-8 flex items-center justify-center gap-2 animate-fadeIn delay-150`}>
                        <span className="text-indigo-400">{'>'}</span>
                        <span className="hidden sm:inline">const currentFocus =</span>
                        <span className="sm:hidden">focus =</span>
                        <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300 px-2 py-1 font-normal">
                            "{typedText}"
                        </Badge>
                    </div>

                    <div className="max-w-3xl w-full px-4 mb-10 animate-fadeIn delay-200">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 shadow-xl shadow-black/20">
                            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-medium tracking-wide">
                                {aboutMe}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 animate-fadeIn delay-300 flex-col sm:flex-row w-full sm:w-auto px-6 sm:px-0">
                        <Button asChild size="lg" className="rounded-full font-semibold px-8 h-12 w-full sm:w-auto">
                            <a href="#projects">View Work</a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full font-semibold px-8 h-12 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white w-full sm:w-auto">
                            <a href="#contact">Contact Me</a>
                        </Button>
                    </div>

                    {/* Scroll Down Indicator */}
                    <div 
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 transition-opacity duration-500"
                        style={{ opacity: scrollOpacity }}
                    >
                        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="w-6 h-6 text-indigo-400" />
                    </div>
                </section>

                {/* Tech Stack Marquee (Mockup) */}
                <div className="w-full mb-20 overflow-hidden relative z-10 opacity-50 px-4">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-16 text-slate-600 font-bold uppercase tracking-widest text-xs md:text-sm text-center">
                        <span>React</span>
                        <span>Next.js</span>
                        <span>TypeScript</span>
                        <span>Node.js</span>
                        <span>Python</span>
                        <span>Go</span>
                    </div>
                </div>

                {/* Featured Projects */}
                <section id="projects" data-nosnippet="" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <h3 className="text-3xl font-bold text-white mb-12 text-center animate-slideUp">Featured Projects</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project) => (
                            <a key={project.id} {...externalLinkProps} href={project.url} className="block">
                                <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                    <CardHeader>
                                        <CardTitle className="flex justify-between items-center text-xl text-white">
                                            {project.title}
                                            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-slate-400 mb-4 text-sm md:text-base">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.badges.map((badge, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className={getBadgeClasses(badge.color)}
                                                >
                                                    {badge.text}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Websites Section */}
                {websites.length > 0 && (
                    <section id="websites" data-nosnippet="" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                        <h3 className="text-3xl font-bold text-white mb-12 text-center animate-slideUp">Websites</h3>
                        <div className={`grid gap-8 ${websites.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
                            {websites.map((website) => (
                                <a key={website.id} {...externalLinkProps} href={website.url} className="block">
                                    <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center text-xl text-white">
                                                {website.title}
                                                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <p className="text-slate-400 mb-4 text-sm md:text-base">
                                                {website.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {website.badges.map((badge, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className={getBadgeClasses(badge.color)}
                                                    >
                                                        {badge.text}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* DNS Section */}
                <section id="dns" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-14">
                    <DnsInfo externalLinkProps={externalLinkProps} />
                </section>

                {/* Status Section */}
                <section id="status" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-14">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 ml-4 bg-black/20 rounded-md px-3 py-1 text-xs text-slate-500 font-mono text-center truncate">
                                https://statusno.de/
                            </div>
                        </div>
                        <CardContent className="p-0">
                            <InteractiveIframe
                                src="https://statusno.de/"
                                title="System Status"
                            />
                        </CardContent>
                        <CardFooter className="py-2 px-4 bg-white/5 border-t border-white/10 flex justify-end">
                            <p className="text-xs text-slate-500">
                                Powered by <a {...externalLinkProps} href="https://github.com/tonyliuzj/kumaview" className="text-indigo-400 hover:text-indigo-300 transition-colors">KumaView</a>
                            </p>
                        </CardFooter>
                    </Card>
                </section>

                {/* Monitor Section */}
                <section id="monitor" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-14">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="flex-1 ml-4 bg-black/20 rounded-md px-3 py-1 text-xs text-slate-500 font-mono text-center truncate">
                                https://monitorno.de
                            </div>
                        </div>
                        <CardContent className="p-0">
                            <InteractiveIframe
                                src="https://monitorno.de"
                                title="Monitor"
                            />
                        </CardContent>
                        <CardFooter className="py-2 px-4 bg-white/5 border-t border-white/10 flex justify-end">
                            <p className="text-xs text-slate-500">
                                Powered by <a {...externalLinkProps} href="https://github.com/tonyliuzj/pocketview" className="text-indigo-400 hover:text-indigo-300 transition-colors">PocketView</a>
                            </p>
                        </CardFooter>
                    </Card>
                </section>

                {/* Contact Section */}
                <section id="contact" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <Card className="bg-gradient-to-b from-white/5 to-transparent border-white/10 overflow-hidden backdrop-blur-sm">
                        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                                <p className="text-slate-400 max-w-md">
                                    Feel free to reach out for collaborations, opportunities, or just to say hi. I'm always open to discussing new projects and ideas.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <Button asChild size="lg" className="bg-white hover:bg-slate-200 text-black border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a href="mailto:tony@liuzj.net">
                                        <span>Email Me</span>
                                        <Mail className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#0077b5] hover:bg-[#006399] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a
                                        {...externalLinkProps}
                                        href="https://www.linkedin.com/in/tonyliuzj"
                                    >
                                        <span>LinkedIn</span>
                                        <Linkedin className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#24292e] hover:bg-[#2f363d] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a
                                        {...externalLinkProps}
                                        href="https://github.com/tonyliuzj"
                                    >
                                        <span>GitHub</span>
                                        <Github className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/10 bg-black py-10 sm:py-14">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,2.2fr)]">
                        <div className="max-w-sm">
                            <h3 className="text-xl font-bold tracking-tight text-white">Tony Liu</h3>
                            <p className="mt-4 text-sm leading-6 text-slate-400">
                                Learning full-stack development and shipping small, useful web projects.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <a {...externalLinkProps} href="https://github.com/tonyliuzj" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                    <Github className="h-4 w-4" />
                                </a>
                                <a {...externalLinkProps} href="https://www.linkedin.com/in/tonyliuzj" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                                <a href="mailto:tony@liuzj.net" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                    <Mail className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <FooterGroup group={footerGroups[0]} />
                            {footerGroups.slice(1).map((group) => (
                                <FooterGroup key={group.title} group={group} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <DomainFooterGroup domains={domains} externalLinkProps={externalLinkProps} />
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                        <p>© {new Date().getFullYear()} Tony Liu. tony-liu.com. All rights reserved.</p>
                        <p className="text-xs text-slate-600">Designed and built with Next.js</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
