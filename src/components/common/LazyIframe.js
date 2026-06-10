export default function LazyIframe({ shouldLoad, src, onLoad, ...props }) {
    return (
        <iframe
            {...props}
            src={shouldLoad ? src : undefined}
            onLoad={onLoad}
            loading="lazy"
        />
    );
}
