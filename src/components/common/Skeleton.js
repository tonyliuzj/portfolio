export default function Skeleton({ className = "" }) {
    return (
        <div
            className={`animate-pulse bg-muted/20 border border-border/30 ${className}`}
            aria-hidden="true"
        />
    );
}
