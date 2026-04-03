import type { SVGProps } from "react";

// Dominican Republic flag icon as an inline SVG React component
const FlagIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 44 30" width={44} height={30} {...props}>
        <rect x="0" y="0" width="44" height="30" fill="rgb(100%,100%,100%)" />
        <path
            fill="rgb(0%,17.647059%,38.431373%)"
            fillRule="nonzero"
            stroke="none"
            fillOpacity="1"
            d="M 0 0 L 19.066406 0 L 19.066406 12 L 0 12 Z M 0 0"
        />
        <path
            fill="rgb(80.784315%,6.666667%,14.901961%)"
            fillRule="nonzero"
            stroke="none"
            fillOpacity="1"
            d="M 0 18 L 19.066406 18 L 19.066406 30 L 0 30 Z M 0 18"
        />
        <path
            fill="rgb(0%,17.647059%,38.431373%)"
            fillRule="nonzero"
            stroke="none"
            fillOpacity="1"
            d="M 24.933594 18 L 44 18 L 44 30 L 24.933594 30 Z M 24.933594 18"
        />
        <path
            fill="rgb(80.784315%,6.666667%,14.901961%)"
            fillRule="nonzero"
            stroke="none"
            fillOpacity="1"
            d="M 24.933594 0 L 44 0 L 44 12 L 24.933594 12 Z M 24.933594 0"
        />
    </svg>
);

export default FlagIcon;
