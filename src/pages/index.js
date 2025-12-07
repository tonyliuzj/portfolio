import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

const inter = Inter({ subsets: ['latin'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });

export default function Home() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
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

    return (
        <div className={`${inter.className} min-h-screen bg-black text-slate-300 selection:bg-indigo-500/30`}>
            <Head>
                <title>Tony Liu's Portfolio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Full Stack Developer Portfolio" />
            </Head>

            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                        <h1 className="text-white font-bold text-lg tracking-tight">Tony Liu</h1>
                    </div>
                    <nav className="flex gap-1">
                        <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                            <a href="#home">Home</a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                            <a href="#projects">Projects</a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                            <a href="#contact">Contact</a>
                        </Button>
                    </nav>
                </div>
            </header>

            <main id="home" className="relative pt-24 min-h-screen flex flex-col items-center overflow-hidden">
                
                {/* Background Grid & Spotlight */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
                    {mounted && (
                        <div
                            className="absolute bg-indigo-500/10 rounded-full blur-3xl -z-10 transition-transform duration-75 will-change-transform"
                            style={{
                                width: '300px',
                                height: '300px',
                                left: 0,
                                top: 0,
                                transform: `translate(${position.x - 150}px, ${position.y - 150}px)`,
                            }}
                        />
                    )}
                </div>

                {/* Hero Section */}
                <section className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center max-w-6xl mx-auto mt-20 md:mt-0">

                    <h2 className="text-5xl md:text-8xl font-black mt-12 mb-6 tracking-tighter text-white animate-slideUp">
                        Hello, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-indigo-300">
                            I am Tony
                        </span>
                    </h2>

                    <div className={`${mono.className} text-sm md:text-base text-slate-400 mb-10 h-8 flex items-center justify-center gap-2 animate-fadeIn delay-150`}>
                        <span className="text-indigo-400">{'>'}</span>
                        <span>const currentFocus =</span>
                        <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300 px-2 py-1 font-normal">
                            "{typedText}"
                        </Badge>
                    </div>

                    <div className="flex gap-4 animate-fadeIn delay-300">
                        <Button asChild size="lg" className="rounded-full font-semibold px-8 h-12">
                            <a href="#projects">View Work</a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full font-semibold px-8 h-12 border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white">
                            <a href="#contact">Contact Me</a>
                        </Button>
                    </div>
                </section>

                {/* Tech Stack Marquee (Mockup) */}
                <div className="w-full mt-20 mb-20 overflow-hidden relative z-10 opacity-50">
                    <div className="flex justify-center gap-8 md:gap-16 text-slate-600 font-bold uppercase tracking-widest text-sm">
                        <span>React</span>
                        <span>Next.js</span>
                        <span>TypeScript</span>
                        <span>Node.js</span>
                        <span>Python</span>
                        <span>Go</span>
                    </div>
                </div>

                {/* Featured Projects */}
                <section id="projects" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-12 text-center animate-slideUp">Featured Projects</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <a href="https://shortenno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        Shrinx
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4">Shrinx is a modern, minimalistic URL shortener that transforms long links into concise, trackable URLs. Fast, secure, and easy to integrate with a RESTful API.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">API</Badge>
                                        <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">Secure</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                        <a href="https://emailno.de" target="_blank" rel="noopener noreferrer" className="block">
                            <Card className="flex flex-col bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-xl text-white">
                                        Mailsy
                                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-slate-400 mb-4">A simple, modern disposable email web app built with Next.js, Tailwind CSS, and SQLite.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Next.js</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">Tailwind CSS</Badge>
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20">SQLite</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>

                        {/* KumaView */}
                        <a 
                            href="https://statusno.de/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">KumaView</h4>
                                <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                A modern frontend dashboard for monitoring multiple Uptime Kuma instances, built with Next.js, shadcn/ui, and SQLite.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                                <span className="px-2 py-1 rounded bg-white/5">Next.js</span>
                                <span className="px-2 py-1 rounded bg-white/5">shadcn/ui</span>
                                <span className="px-2 py-1 rounded bg-white/5">SQLite</span>
                            </div>
                        </a>

                        {/* Librix */}
                        <a 
                            href="https://fileno.de" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Librix</h4>
                                <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                A front-end NEXT.JS application for HTTP/WebDAV–style servers.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                                <span className="px-2 py-1 rounded bg-white/5">Next.js</span>
                                <span className="px-2 py-1 rounded bg-white/5">WebDAV</span>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="w-full max-w-6xl mx-auto p-4 mb-32 relative z-10">
                    <Card className="bg-gradient-to-b from-white/5 to-transparent border-white/10 overflow-hidden backdrop-blur-sm">
                        <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                                <p className="text-slate-400 max-w-md">
                                    Feel free to reach out for collaborations, opportunities, or just to say hi. I'm always open to discussing new projects and ideas.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="bg-white hover:bg-slate-200 text-black border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group">
                                    <a href="mailto:contact@tonyliu.uk">
                                        <span>Email Me</span>
                                        <Mail className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#0077b5] hover:bg-[#006399] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group">
                                    <a
                                        href="https://www.linkedin.com/in/tonyliuzj"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>LinkedIn</span>
                                        <Linkedin className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </Button>
                                <Button asChild size="lg" className="bg-[#24292e] hover:bg-[#2f363d] text-white border border-white/10 hover:border-white/20 shadow-lg h-14 px-6 rounded-xl gap-2 group">
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

            <footer className="border-t border-white/5 bg-black py-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Tony Liu. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className="hover:text-slate-300 transition-colors cursor-pointer">Tony-Liu.com</span>
                        <span className="hover:text-slate-300 transition-colors cursor-pointer">TonyLiu.cloud</span>
                        <span className="hover:text-slate-300 transition-colors cursor-pointer">TonyLiu.uk</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
