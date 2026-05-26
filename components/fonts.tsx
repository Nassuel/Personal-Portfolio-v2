const Fonts = () => (
    <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Babylonica&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=JetBrains+Mono:ital,wght@0,300..700;1,300..700&display=swap");

        @keyframes nvcBlink {
            0%,
            49% {
                opacity: 1;
            }
            50%,
            100% {
                opacity: 0;
            }
        }

        @keyframes nvcReveal {
            from {
                clip-path: inset(0 100% 0 0);
            }
            to {
                clip-path: inset(0 0 0 0);
            }
        }

        @keyframes nvcDrift {
            0%,
            100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-4px) rotate(-1.5deg);
            }
        }
    `}</style>
);
export default Fonts;
