import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import {
    webglAdapters,
    type ViewerAdapters
} from "@/lib/model-viewer/adapters";
import { ModelStage } from "@/lib/model-viewer/stage";
import { cn } from "@/lib/utils";

export type ViewerStatus = "loading" | "ready" | "unavailable";

interface ModelViewerProps {
    src: string;
    poster: StaticImageData;
    alt: string;
    adapters?: ViewerAdapters;
}

/**
 * Shows a poster, then swaps in a live three.js render once the model loads.
 * Without WebGL, or if loading fails, the poster simply stays.
 */
const ModelViewer = ({
    src,
    poster,
    alt,
    adapters = webglAdapters
}: ModelViewerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<ViewerStatus>("loading");

    useEffect(() => {
        const container = containerRef.current!;
        let renderer;
        try {
            renderer = adapters.createRenderer();
        } catch {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- WebGL is the external system here, and its constructor reports failure synchronously.
            setStatus("unavailable");
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const stage = new ModelStage(container, {
            renderer,
            environment: adapters.createEnvironment(renderer),
            animate: !reducedMotion
        });

        let disposed = false;
        adapters.loadModel(src).then(
            model => {
                if (disposed) return;
                stage.show(model);
                setStatus("ready");
            },
            () => {
                if (!disposed) setStatus("unavailable");
            }
        );

        const resizeObserver = new ResizeObserver(([entry]) =>
            stage.resize(entry.contentRect.width, entry.contentRect.height)
        );
        resizeObserver.observe(container);
        const visibilityObserver = new IntersectionObserver(([entry]) =>
            stage.setActive(entry.isIntersecting)
        );
        visibilityObserver.observe(container);

        return () => {
            disposed = true;
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            stage.dispose();
        };
    }, [src, adapters]);

    return (
        <div
            ref={containerRef}
            data-status={status}
            className="relative h-full w-full cursor-grab active:cursor-grabbing [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full! [&>canvas]:w-full!"
        >
            <Image
                src={poster}
                alt={alt}
                placeholder="blur"
                fill
                priority
                sizes="(min-width: 896px) 832px, 100vw"
                className={cn(
                    "pointer-events-none object-contain transition-opacity duration-700",
                    status === "ready" && "opacity-0"
                )}
            />
            {status === "loading" && (
                <span
                    role="status"
                    className="marginalia absolute right-3 bottom-3 animate-pulse"
                >
                    Loading 3D model…
                </span>
            )}
        </div>
    );
};

export default ModelViewer;
