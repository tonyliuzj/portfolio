import Head from 'next/head';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Preloader from '@/components/layout/Preloader';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Websites from '@/components/sections/Websites';
import Infrastructure from '@/components/sections/Infrastructure';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import SideNav from '@/components/layout/SideNav';
import DynamicBackground from '@/components/layout/DynamicBackground';
import MouseInteraction from '@/components/interactive/MouseInteraction';
import UptimeBadge from '@/components/common/UptimeBadge';

const Cursor = dynamic(() => import('@/components/interactive/Cursor'), { ssr: false });

export default function Home() {
    const siteTitle = "Tony Liu";
    const description = "Abstracting complexity. Building full-stack web applications and robust rack-scale infrastructure.";
    const url = "https://tony-liu.com";

    return (
        <SmoothScroll>
            <div className="min-h-screen bg-background text-foreground selection:bg-foreground/20 selection:text-foreground">
                <Cursor />
                <UptimeBadge />
                <SideNav />
                <DynamicBackground />
                <MouseInteraction />
                
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

                <main className="relative flex flex-col items-center overflow-hidden w-full">
                    <Preloader />
                    <Hero />
                    <About />
                    <Projects />
                    <Websites />
                    <Infrastructure />
                    <Services />
                    <Contact />
                </main>
            </div>
        </SmoothScroll>
    );
}
