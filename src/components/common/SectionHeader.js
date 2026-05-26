import FadeIn from "@/components/interactive/FadeIn";

export default function SectionHeader({ number, label, title, description, color = "muted-foreground" }) {
    return (
        <FadeIn>
            <div className="flex items-center gap-6 mb-16">
                <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                    {number} // {label}
                </span>
                <div className="h-[1px] flex-1 bg-border/50 max-w-[200px]"></div>
                <a 
                    href="#example" 
                    className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    data-interactable="true"
                >
                    Example
                </a>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-16">
                {title} <br className="hidden md:block" />
                <span className={color === "muted-foreground" ? "text-muted-foreground" : `text-${color}`}>
                    {description}
                </span>
            </h2>
        </FadeIn>
    );
}
