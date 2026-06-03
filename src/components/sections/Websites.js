import { ExternalLink } from "lucide-react";
import FadeIn from "@/components/interactive/FadeIn";
import GithubStars from "@/components/interactive/GithubStars";
import SectionHeader from "@/components/common/SectionHeader";

const websitesData = [
    {
      "id": 1,
      "title": "Personal Portfolio",
      "url": "https://tony-liu.com",
      "description": "Hello",
      "badges": [
        { "text": "Portfolio", "color": "blue" },
        { "text": "Personal Site", "color": "indigo" }
      ]
    },
    {
      "id": 2,
      "title": "Kenya Charity Fundraising",
      "url": "https://fundgogar.com",
      "description": "Fund raising for Gogar Primary School in Kenya, with a trip for volunteering work.",
      "badges": [
        { "text": "Charity", "color": "green" },
        { "text": "Fundraising", "color": "emerald" },
        { "text": "Volunteering", "color": "blue" }
      ]
    },
        {
      "id": 3,
      "title": "Comany Website",
      "url": null,
      "description": "Not for showcase",
      "badges": [
        { "text": "Wordpress", "color": "purple" }
      ]
    },
    {
      "id": 4,
      "title": "Name Server",
      "url": "https://nameserver.ing",
      "description": "I use my own brilliant nameserver selfhosted using PowerDNS to control DNS.",
      "badges": [
        { "text": "DNS", "color": "purple" },
        { "text": "PowerDNS", "color": "indigo" },
        { "text": "Self-Hosted", "color": "blue" }
      ]
    },
    {
      "id": 5,
      "title": "Host Name",
      "url": "https://hostname.ee",
      "description": "For host names",
      "badges": [
        { "text": "Hostnames", "color": "purple" },
        { "text": "Domains", "color": "blue" }
      ]
    },
    {
      "id": 6,
      "title": "Self-Host Guides",
      "url": "https://selfhostguides.com",
      "description": "A comprehensive collection of guides and tutorials for self-hosting applications and services.",
      "badges": [
        { "text": "Guides", "color": "blue" },
        { "text": "Self-Hosting", "color": "blue" },
        { "text": "Tutorials", "color": "blue" },
        { "text": "Blog", "color": "white" }
      ]
    },
    {
      "id": 7,
      "title": "CloudRam Service",
      "url": "https://cloudram.download",
      "description": "Free service of cloud ram for download",
      "badges": [
        { "text": "Service", "color": "green" },
        { "text": "Download", "color": "blue" },
        { "text": "Free", "color": "emerald" }
      ]
    },
    {
      "id": 8,
      "title": "Party Parrots",
      "url": "https://parrots.click",
      "description": "Click to go to the party parrots",
      "badges": [
        { "text": "Fun", "color": "white" },
        { "text": "Interactive", "color": "green" },
        { "text": "Parrot", "color": "yellow" }
      ]
    }
];

export default function Websites() {
    const websites = websitesData;

    return (
        <section id="websites" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10 border-t border-border/50">
            <SectionHeader 
                number="03"
                label="Websites"
                title="Public"
                description="Surfaces"
                summary="A collection of public-facing web properties, services, and experimental domains I operate."
            />

            <div className="flex flex-col border-t border-border">
                {websites.map((site, index) => {
                    const hasUrl = !!site.url;
                    const Container = hasUrl ? 'a' : 'div';
                    
                    let hostname = "";
                    if (hasUrl) {
                        try {
                            hostname = new URL(site.url).hostname;
                        } catch {
                            hostname = site.url;
                        }
                    }

                    return (
                        <FadeIn key={site.id} delay={0.1 * index}>
                            <Container 
                                href={site.url} 
                                target={hasUrl ? "_blank" : undefined} 
                                rel={hasUrl ? "noopener noreferrer" : undefined} 
                                className={`group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-border transition-all duration-500 ${hasUrl ? 'hover:px-6 hover:bg-muted/10 cursor-pointer' : 'opacity-70'}`}
                                data-interactable={hasUrl ? "true" : "false"}
                            >
                                <div className="flex flex-col md:w-1/2 pr-8">
                                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 transition-transform group-hover:translate-x-2 duration-500">
                                        {site.title}
                                    </h3>
                                    {hostname && (
                                        <p className="text-sm text-muted-foreground font-mono tracking-widest uppercase">
                                            {hostname}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col md:w-1/2 mt-6 md:mt-0 items-start md:items-end text-left md:text-right">
                                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-6 max-w-sm">
                                        {site.description}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-2 flex-wrap justify-end">
                                            {site.badges?.map((badge, bIdx) => (
                                                <span key={bIdx} className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 px-2 py-1">
                                                    {badge.text}
                                                </span>
                                            ))}
                                            {site.stats && hasUrl && <GithubStars url={site.url} />}
                                        </div>
                                        {hasUrl && (
                                            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Container>
                        </FadeIn>
                    );
                })}
            </div>
        </section>
    );
}