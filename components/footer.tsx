import TextLink from "./text-link";

const Footer = () => (
    <footer className="mt-20 mb-10 px-6">
        <div className="mx-auto max-w-4xl border-t border-dashed border-rule/60 pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="marginalia tracking-[0.18em]">
                    ❦ Colophon — set in Fraunces, Newsreader & JetBrains Mono
                </p>
                <p className="marginalia normal-case">
                    © {new Date().getFullYear()} · N.V.C · All rights reserved
                </p>
            </div>
            <p className="mt-3 text-center text-[0.82rem] text-subtle italic">
                Original scaffolding by{" "}
                <TextLink href="https://www.craftz.dog">
                    Takuya Matsuyama
                </TextLink>
                , remixed in Lynnwood, WA.
            </p>
        </div>
    </footer>
);

export default Footer;
