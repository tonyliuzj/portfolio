import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const starCache = new Map();

function getGithubApiUrl(url) {
    try {
        const urlObj = new URL(url);
        const isGithub = urlObj.hostname === 'github.com' || urlObj.hostname === 'www.github.com';
        if (!isGithub) return null;

        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (pathParts.length < 2) return null;

        return `https://api.github.com/repos/${pathParts[0]}/${pathParts[1]}`;
    } catch {        return null;
    }
}

export default function GithubStars({ url, active = true }) {
    const [stars, setStars] = useState(null);

    useEffect(() => {
        if (!active || !url) return;

        const apiUrl = getGithubApiUrl(url);
        if (!apiUrl) return;

        if (starCache.has(apiUrl)) {
            setStars(starCache.get(apiUrl));
            return;
        }

        const controller = new AbortController();
        let isMounted = true;

        fetch(apiUrl, { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                if (typeof data.stargazers_count === 'number') {
                    starCache.set(apiUrl, data.stargazers_count);

                    if (isMounted) {
                        setStars(data.stargazers_count);
                    }
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error("Failed to fetch github stars", err);
                }
            });

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [active, url]);

    if (stars === null) return null;

    return (
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/40 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm" title="GitHub Stars">
            <Star className="w-3.5 h-3.5 fill-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)] animate-pulse" />
            {stars}
        </div>
    );
}
