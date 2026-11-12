import SectionMark from "./section-mark";
import SectionTitle from "./section-title";

interface PageHeaderProps {
    numeral: string;
    label: string;
    title: string;
}

/* Matches the § numerals in the nav bar, so each page reads as a numbered chapter. */
const PageHeader = ({ numeral, label, title }: PageHeaderProps) => (
    <header className="mb-8">
        <SectionMark numeral={numeral} label={label} />
        <SectionTitle as="h1" className="text-[clamp(2rem,5vw,2.75rem)]">
            {title}
        </SectionTitle>
    </header>
);

export default PageHeader;
