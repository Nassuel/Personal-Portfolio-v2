interface SectionMarkProps {
    numeral: string;
    label: string;
}

const SectionMark = ({ numeral, label }: SectionMarkProps) => (
    <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-[0.72rem] font-medium tracking-[0.22em] text-glow uppercase">
            §&nbsp;{numeral}
        </span>
        <span aria-hidden className="h-px flex-1 translate-y-px bg-rule/45" />
        <span className="marginalia">{label}</span>
    </div>
);

export default SectionMark;
