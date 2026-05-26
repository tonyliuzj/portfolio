import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Preloader from '@/components/layout/Preloader';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Websites from '@/components/sections/Websites';
import Infrastructure from '@/components/sections/Infrastructure';
import Services from '@/components/sections/Services';
import Status from '@/components/sections/Status';
import Contact from '@/components/sections/Contact';
import SideNav from '@/components/layout/SideNav';
import DynamicBackground from '@/components/layout/DynamicBackground';
import MouseInteraction from '@/components/interactive/MouseInteraction';

const Cursor = dynamic(() => import('@/components/interactive/Cursor'), { ssr: false });
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const siteTitle = "Tony Liu";
    const description = "Abstracting complexity. Building full-stack web applications and robust rack-scale infrastructure.";
    const url = "https://tony-liu.com";

    return (
        <SmoothScroll>
            <div className={`${inter.className} min-h-screen bg-background text-foreground selection:bg-foreground/20 selection:text-foreground`}>
                <Cursor />
                <SideNav />
                <DynamicBackground />
                <MouseInteraction />
                
                {/* Sticky Status Badge */}
                <div className="fixed top-4 left-4 md:top-6 md:left-6 z-50 mix-blend-difference">
                    <a href="#status" className="pointer-events-auto block transition-transform hover:scale-105 active:scale-95" data-interactable="true">
                        <img 
                            src="https://img.shields.io/uptimerobot/status/m803126391-c9e521193579a442256878b6?style=for-the-badge&logo=uptimerobot&logoColor=white&label=status&labelColor=0f172a&up_color=10b981&down_color=ef4444" 
                            alt="Uptime Status" 
                            className="h-6 md:h-7 opacity-80"
                        />
                    </a>
                </div>
                
                <Head>
                    <title>{siteTitle}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="description" content={description} />
                    <link rel="canonical" href={url} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={siteTitle} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={url} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={siteTitle} />
                    <meta name="twitter:description" content={description} />
                </Head>

                <main className="relative flex flex-col items-center overflow-hidden sm:pr-24 lg:pr-32 xl:pr-0">
                    <Preloader />
                    <Hero />
                    <About />
                    <Projects />
                    <Websites />
                    <Infrastructure />
                    <Services />
                    <Status />
                    <Contact />
                </main>
            </div>
        </SmoothScroll>
    );
}
