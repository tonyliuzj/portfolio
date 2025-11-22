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
                            href="#github"
                            className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-slate-200 transition-all active:scale-95"
                        >
                            View Work
                        </a>
                        <a 
                            href="mailto:contact@tonyliu.cloud"
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

                {/* Github / CTA Section */}
                <section id="github" className="w-full max-w-4xl mx-auto p-4 mb-24 relative z-10">
                    <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Check out my code</h3>
                            <p className="text-slate-400 max-w-md">
                                Explore my repositories, side projects, and open source contributions on GitHub.
                            </p>
                        </div>
                        <a
                            href="https://github.com/tonyliuzj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 bg-[#24292e] hover:bg-[#2f363d] text-white px-6 py-3 rounded-xl font-medium transition-all border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
                        >
                            <span>GitHub Profile</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
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
