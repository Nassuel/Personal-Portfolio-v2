export default function Layout({
    children,
    className = "",
}: {
    children: any;
    className: string;
}) {
    return (
        <div className={`px-32 w-full h-full inline-block z-0 bg-light dark:bg-black ${className}`}>
            {children}
        </div>
    )
}
