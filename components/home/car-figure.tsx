import dynamic from "next/dynamic";
import Image from "next/image";
import TextLink from "@/components/text-link";
import poster from "@/public/images/home/koenigsegg-poster.png";

const alt =
    "A cerulean Koenigsegg One:1 hypercar, seen from the front three-quarter angle";

/* three.js only loads in the browser and only on this page. */
const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
    ssr: false,
    loading: () => (
        <Image
            src={poster}
            alt={alt}
            placeholder="blur"
            fill
            priority
            sizes="(min-width: 896px) 832px, 100vw"
            className="object-contain"
        />
    )
});

const CarFigure = () => (
    <figure className="my-6">
        <div className="relative aspect-[2/1] w-full">
            <ModelViewer src="/koenigsegg-one.glb" poster={poster} alt={alt} />
        </div>
        <figcaption className="marginalia mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-dashed border-rule/40 pt-2">
            <span>Fig. 1 — Koenigsegg One:1 · drag to turn</span>
            <span className="normal-case">
                Model by{" "}
                <TextLink href="https://sketchfab.com/3d-models/koenigsegg-one1-9ed5d043a4194fb9a24cbaa27282d78f">
                    zjafar889
                </TextLink>{" "}
                ·{" "}
                <TextLink href="https://creativecommons.org/licenses/by/4.0/">
                    CC BY 4.0
                </TextLink>
            </span>
        </figcaption>
    </figure>
);

export default CarFigure;
