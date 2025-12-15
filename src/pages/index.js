import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown } from "lucide-react"

const inter = Inter({ subsets: ['latin'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });

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
            />
        </div>
    );
}

export default function Home() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollOpacity, setScrollOpacity] = useState(1);

    useEffect(() => {
        setMounted(true);

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

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Projects', href: '#projects' },
        { name: 'Status', href: '#status' },
        { name: 'Monitor', href: '#monitor' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <div className={`${inter.className} min-h-screen bg-black text-slate-300 selection:bg-indigo-500/30`}>
            <Head>
                <title>Tony Liu's Portfolio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Full Stack Developer Portfolio" />
            </Head>

            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative z-50">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                        <h1 className="text-white font-bold text-lg tracking-tight">Tony Liu</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-1">
                        {navItems.map((item) => (
                            <Button key={item.name} variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                                <a href={item.href}>{item.name}</a>
                            </Button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
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
                                    <a href={item.href}>{item.name}</a>
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

                    <div className={`${mono.className} text-sm md:text-base text-slate-400 mb-10 h-8 flex items-center justify-center gap-2 animate-fadeIn delay-150`}>
                        <span className="text-indigo-400">{'>'}</span>
                        <span className="hidden sm:inline">const currentFocus =</span>
                        <span className="sm:hidden">focus =</span>
                        <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300 px-2 py-1 font-normal">
                            "{typedText}"
                        </Badge>
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
                <section id="projects" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10 scroll-mt-24">
                    <h3 className="text-3xl font-bold text-white mb-12 text-center animate-slideUp">Featured Projects</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Project 1 */}
                        <a href="https://shortenno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        Shrinx
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4 text-sm md:text-base">
                                        Shrinx is a modern, minimalistic URL shortener that transforms long links into concise, trackable URLs. Fast, secure, and easy to integrate with a RESTful API.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">API</Badge>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">Secure</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Project 2 */}
                        <a href="https://emailno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        Mailsy
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4 text-sm md:text-base">
                                        A simple, modern disposable email web app built with Next.js, shadcn/ui, and SQLite.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">shadcn/ui</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">SQLite</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Project 3 */}
                        <a href="https://statusno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        KumaView
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4 text-sm md:text-base">
                                        A modern frontend dashboard for monitoring multiple Uptime Kuma instances, built with Next.js, shadcn/ui, and SQLite.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">shadcn/ui</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">SQLite</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Project 4 */}
                        <a href="https://monitorno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        PocketView
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4 text-sm md:text-base">
                                        A modern, lightweight web interface for monitoring system metrics and performance. Built with Next.js and designed to work seamlessly with PocketBase (Beszel).
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">shadcn/ui</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">SQLite</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Project 5 */}
                        <a href="https://fileno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        Librix
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4 text-sm md:text-base">
                                        A front-end NEXT.JS application for HTTP/WebDAV–style servers.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">shadcn/ui</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">SQLite</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                        {/* Project 6 */}
                        <a href="https://github.com/tonyliuzj/arkiv" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        Arkiv
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4 text-sm md:text-base">
                                        A full-stack file library system for managing, storing, and accessing files with user authentication.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">shadcn/ui</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">SQLite</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                    </div>
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
                                https://status.tony-liu.com/
                            </div>
                        </div>
                        <CardContent className="p-0">
                            <InteractiveIframe
                                src="https://status.tony-liu.com/"
                                title="System Status"
                            />
                        </CardContent>
                        <CardFooter className="py-2 px-4 bg-white/5 border-t border-white/10 flex justify-end">
                            <p className="text-xs text-slate-500">
                                Powered by <a href="https://github.com/tonyliuzj/kumaview" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">KumaView</a>, on <a href="https://tony-liu.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">tony-liu.com</a>
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
                                https://monitor.tony-liu.com
                            </div>
                        </div>
                        <CardContent className="p-0">
                            <InteractiveIframe
                                src="https://monitor.tony-liu.com"
                                title="Monitor"
                            />
                        </CardContent>
                        <CardFooter className="py-2 px-4 bg-white/5 border-t border-white/10 flex justify-end">
                            <p className="text-xs text-slate-500">
                                Powered by <a href="https://github.com/tonyliuzj/pocketview" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">PocketView</a>, on <a href="https://tony-liu.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">tony-liu.com</a>
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
                                        href="https://www.linkedin.com/in/tonyliuzj"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>LinkedIn</span>
                                        <Linkedin className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#24292e] hover:bg-[#2f363d] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group w-full sm:w-auto">
                                    <a
                                        href="https://github.com/tonyliuzj"
                                        target="_blank"
                                        rel="noopener noreferrer"
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

            <footer className="border-t border-white/10 bg-black pt-16 pb-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                        <div className="md:col-span-5">
                            <h3 className="text-white font-bold text-xl mb-4 tracking-tight">Tony Liu</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                                Trying to learn and build cool stuff even though its shit.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://github.com/tonyliuzj" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/in/tonyliuzj" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:tony@liuzj.net" className="text-slate-400 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        
                        <div className="md:col-span-3">
                            <h4 className="text-white font-semibold mb-6">Navigation</h4>
                            <ul className="flex flex-col gap-3 text-sm text-slate-400">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <a href={item.href} className="hover:text-indigo-400 transition-colors">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-4">
                            <h4 className="text-white font-semibold mb-6">Domains & Status</h4>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2 text-sm text-slate-400">
                                    <a href="https://tony-liu.com" className="hover:text-indigo-400 transition-colors">Tony-Liu.com</a>
                                    <span className="text-slate-700">•</span>
                                    <a href="https://tonyliu.cloud" className="hover:text-indigo-400 transition-colors">TonyLiu.cloud</a>
                                    <span className="text-slate-700">•</span>
                                    <a href="https://tonyliu.uk" className="hover:text-indigo-400 transition-colors">TonyLiu.uk</a>
                                    <span className="text-slate-700">•</span>
                                    <a href="https://liuzj.net" className="hover:text-indigo-400 transition-colors">LiuZJ.net</a>
                                </div>
                                <div className="mt-2">
                                    <iframe src="https://uptime.tony-liu.com/badge?theme=dark" width="250" height="30" frameBorder="0" scrolling="no" style={{ colorScheme: 'normal' }}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Tony Liu. All rights reserved.</p>
                        <p className="text-slate-600 text-xs">Designed & Built with Next.js</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
