export default function LazyIframe({ shouldLoad, src, ...props }) {
    return (
        <iframe
            {...props}
            src={shouldLoad ? src : undefined}
            loading="lazy"
        />
    );
}
