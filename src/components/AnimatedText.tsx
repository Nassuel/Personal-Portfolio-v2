export default function AnimatedText({
    text,
    className = "",
}: {
    text: any;
    className?: string;
}) {
    return (
        <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden text-black dark:text-white">
            <h1
                className={`inline-block w-full text-black font-bold capitalize text-6xl animation-vanish ${className}`}
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
