import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });

export default function Home() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            setPosition({ x: e.pageX, y: e.pageY });
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
                    <nav className="flex gap-6 text-sm font-medium">
                        <a href="#home" className="hover:text-white transition-colors duration-200">Home</a>
                        <a href="#projects" className="hover:text-white transition-colors duration-200">Projects</a>
                        <a href="#github" className="hover:text-white transition-colors duration-200">Github</a>
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
                <section className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 text-center max-w-4xl mx-auto mt-20 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fadeIn">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">Open to Opportunities</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white animate-slideUp">
                        Hello, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-indigo-300">
                            I am Tony
                        </span>
                    </h2>

                    <div className={`${mono.className} text-sm md:text-base text-slate-400 mb-10 h-8 flex items-center justify-center gap-2 animate-fadeIn delay-150`}>
                        <span className="text-indigo-400">&gt;</span>
                        <span>const currentFocus =</span>
                        <span className="inline-block px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-300 min-w-[100px] text-left">
                            "{typedText}"
                        </span>
                    </div>

                    <div className="flex gap-4 animate-fadeIn delay-300">
                        <a 
                            href="#projects"
                            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-slate-200 transition-all active:scale-95"
                        >
                            View Work
                        </a>
                        <a 
                            href="#contact"
                            className="px-8 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-all active:scale-95"
                        >
                            Contact Me
                        </a>
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

                {/* Projects Section */}
                <section id="projects" className="w-full max-w-4xl mx-auto p-4 mb-20 relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center md:text-left">Featured Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Shrinx */}
                        <a 
                            href="https://123415.xyz/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Shrinx</h4>
                                <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Shrinx is a modern, minimalistic URL shortener that transforms long links into concise, trackable URLs. Fast, secure, and easy to integrate with a RESTful API.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                                <span className="px-2 py-1 rounded bg-white/5">URL Shortener</span>
                                <span className="px-2 py-1 rounded bg-white/5">REST API</span>
                            </div>
                        </a>

                        {/* Mailsy */}
                        <a 
                            href="https://emailno.de" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Mailsy</h4>
                                <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                A simple, modern disposable email web app built with Next.js, Tailwind CSS, and SQLite.
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                                <span className="px-2 py-1 rounded bg-white/5">Next.js</span>
                                <span className="px-2 py-1 rounded bg-white/5">Tailwind CSS</span>
                                <span className="px-2 py-1 rounded bg-white/5">SQLite</span>
                            </div>
                        </a>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="w-full max-w-4xl mx-auto p-4 mb-24 relative z-10">
                    <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold text-white mb-4">Let's Connect</h3>
                            <p className="text-slate-400 max-w-md mx-auto">
                                I'm always interested in hearing about new projects and opportunities.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Email */}
                            <a
                                href="mailto:contact@tonyliu.uk"
                                className="group flex flex-col items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 text-center"
                            >
                                <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Email</h4>
                                    <span className="text-sm text-slate-400">contact@tonyliu.uk</span>
                                </div>
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com/tonyliuzj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 text-center"
                            >
                                <div className="p-3 rounded-full bg-slate-700/50 text-white group-hover:text-slate-200 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">GitHub</h4>
                                    <span className="text-sm text-slate-400">View Profile</span>
                                </div>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/in/tonyliuzj"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 text-center"
                            >
                                <div className="p-3 rounded-full bg-blue-600/20 text-blue-400 group-hover:text-blue-300 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">LinkedIn</h4>
                                    <span className="text-sm text-slate-400">Connect</span>
                                </div>
                            </a>
                        </div>
                    </div>
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
