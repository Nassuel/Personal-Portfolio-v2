export default function AnimatedText({
    text,
    className = "",
}: {
    text: any;
    className?: string;
}) {
    return (
        <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden">
            <h1
                className={`inline-block w-full font-bold capitalize text-7xl animation-vanish ${className}`}
            >
                {text.split(" ").map((word: string, index: number) => (
                    <span key={word + "-" + index} className="inline-block">
                        {word}&nbsp;
                    </span>
                ))}
            </h1>
        </div>
    );
}
