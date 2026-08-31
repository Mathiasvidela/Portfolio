import { ArrowRight, FileDown, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();

    const secondaryLinks = [
        {
            label: t.contact.linkedin,
            href: 'https://www.linkedin.com/in/mathias-videla/',
            icon: Linkedin,
        },
        {
            label: t.contact.github,
            href: 'https://www.github.com/Mathiasvidela',
            icon: Github,
        },
        {
            label: t.contact.downloadCv,
            href: '/resume/CV-Mathias-Videla.pdf',
            download: 'CV_Mathias_Videla.pdf',
            icon: FileDown,
        },
    ];

    return (
        <section id="contact" className="relative overflow-hidden bg-[#080b16] text-white">
            <div className="grid min-h-[760px] lg:grid-cols-[56%_44%]">
                <div className="relative flex min-h-[400px] flex-col justify-center overflow-hidden bg-[#080b16] px-6 py-10 sm:min-h-[460px] sm:px-10 md:px-14 lg:min-h-[760px] lg:justify-between lg:px-[7vw] lg:py-20">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-25"
                        aria-hidden="true"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(79,109,255,.38) 1px, transparent 1px), linear-gradient(90deg, rgba(79,109,255,.38) 1px, transparent 1px)',
                            backgroundSize: 'clamp(100px, 18vw, 290px) clamp(100px, 18vw, 290px)',
                        }}
                    />

                    <div className="pointer-events-none absolute left-[8%] top-[12%] h-16 w-16 text-white/55" aria-hidden="true">
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current" />
                    </div>

                    <h2 aria-label={t.contact.title} className="relative z-10 font-heading text-[clamp(5rem,13vw,13rem)] font-black uppercase leading-[0.72] tracking-[-0.075em] lg:mt-auto">
                        <span className="block">{t.contact.titleLine1}</span>
                        <span className="block">{t.contact.titleLine2}</span>
                    </h2>

                    <p className="relative z-10 mt-7 font-mono text-xs font-medium tracking-wide text-white/90 sm:text-sm md:text-base lg:mt-10">
                        {t.contact.roleLine}
                    </p>
                </div>

                <div className="relative flex flex-col justify-center px-6 py-14 sm:px-10 md:px-14 lg:px-[6vw] lg:py-20">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-20"
                        aria-hidden="true"
                        style={{
                            backgroundImage: 'radial-gradient(rgba(19,61,246,.7) 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                            maskImage: 'linear-gradient(to bottom left, black, transparent 48%)',
                        }}
                    />

                    <div className="relative z-10 mx-auto w-full max-w-xl">
                        <p className="max-w-lg text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-[2.15rem]">
                            {t.contact.description}
                        </p>

                        <a
                            href="mailto:mathiasvidela20@gmail.com"
                            className="mt-10 flex w-full items-center justify-center rounded-lg bg-white px-6 py-5 font-heading text-base font-black uppercase tracking-wide text-[#080b16] transition-colors hover:bg-[#133df6] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg"
                        >
                            {t.contact.writeMe}
                        </a>

                        <div className="mt-10 border-t border-[#133df6]/45">
                            {secondaryLinks.map((link) => {
                                const Icon = link.icon;

                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        download={link.download}
                                        target={link.download ? undefined : '_blank'}
                                        rel={link.download ? undefined : 'noopener noreferrer'}
                                        className="group flex items-center justify-between border-b border-[#133df6]/45 py-7 font-heading text-lg font-bold uppercase tracking-wide transition-colors hover:text-[#4f6dff] sm:text-xl"
                                    >
                                        <span className="flex items-center gap-4">
                                            <Icon className="text-[#4f6dff]" size={26} strokeWidth={1.8} aria-hidden="true" />
                                            <span>{link.label}</span>
                                        </span>
                                        <ArrowRight className="text-[#133df6] transition-transform duration-200 group-hover:translate-x-1" size={28} />
                                    </a>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
