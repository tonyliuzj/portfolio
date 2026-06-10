const UPTIME_BADGE_URL = "https://img.shields.io/uptimerobot/status/m803126391-c9e521193579a442256878b6?style=for-the-badge&logo=uptimerobot&logoColor=white&label=uptime&labelColor=0f172a&up_color=10b981&down_color=ef4444";

export default function UptimeBadge() {
    return (
        <a
            href="https://status.tony-liu.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View uptime status"
            className="fixed left-3 top-3 z-[80] inline-flex max-w-[calc(100vw-1.5rem)] rounded-md border border-white/10 bg-background/80 p-px shadow-lg backdrop-blur-sm transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 sm:left-4 sm:top-4"
            data-interactable="true"
        >
            <img
                src={UPTIME_BADGE_URL}
                alt="UptimeRobot status"
                width="168"
                height="28"
                loading="lazy"
                decoding="async"
                className="block h-7 w-auto max-w-full rounded-[5px]"
            />
        </a>
    );
}
