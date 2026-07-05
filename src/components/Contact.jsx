import { motion } from 'framer-motion';
import { Mail, Linkedin, FileText, Github, ArrowUpRight, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();

    const contactLinks = [
        {
            title: t.contact.email,
            description: t.contact.emailDesc,
            icon: Mail,
            href: "mailto:mathiasvidela20@gmail.com",
            actionIcon: ArrowUpRight,
        },
        {
            title: t.contact.linkedin,
            description: t.contact.linkedinDesc,
            icon: Linkedin,
            href: "https://www.linkedin.com/in/mathias-videla/",
            actionIcon: ArrowUpRight,
        },
        {
            title: t.contact.github,
            description: t.contact.githubDesc,
            icon: Github,
            href: "https://www.github.com/Mathiasvidela",
            actionIcon: ArrowUpRight,
        },
        {
            title: t.contact.cv,
            description: t.contact.cvDesc,
            icon: FileText,
            href: "/resume/CV-Mathias-Videla.pdf",
            download: "CV_Mathias_Videla.pdf",
            actionIcon: Download,
        }
    ];

    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden border-t border-foreground/5">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#133df6]/30 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#133df6]/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="flex flex-col xl:flex-row gap-16 xl:gap-8 items-center xl:items-start">

                    {/* Left Side: Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full xl:w-1/3 flex flex-col"
                    >

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 tracking-tight">
                            {t.contact.title}<span className="text-[#133df6]">.</span>
                        </h2>

                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
                            {t.contact.description}
                        </p>
                    </motion.div>

                    {/* Right Side: Contact Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="w-full xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 xl:mt-8"
                    >
                        {contactLinks.map((link, index) => {
                            const ActionIcon = link.actionIcon;
                            return (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    download={link.download}
                                    target={link.download ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="group relative flex flex-col justify-between p-6 rounded-xl bg-foreground/[0.03] border border-foreground/10 hover:border-[#133df6]/40 hover:bg-[#133df6]/[0.02] backdrop-blur-md transition-all duration-200 overflow-hidden"
                                >
                                    {/* Glow Effect on Hover */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#133df6]/5 rounded-full blur-2xl group-hover:bg-[#133df6]/20 transition-all duration-300 pointer-events-none" />

                                    <div className="flex items-start justify-between mb-8 relative z-10">
                                        <div className="p-3 bg-background/50 rounded-xl border border-foreground/10 text-[#133df6] transition-all duration-300 group-hover:bg-[#133df6] group-hover:text-white group-hover:border-[#133df6] group-hover:scale-110 flex items-center justify-center">
                                            <link.icon size={22} />
                                        </div>

                                        <div className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-[#133df6] transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                                            <ActionIcon size={20} />
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-foreground font-heading font-bold text-lg md:text-xl mb-1.5">
                                            {link.title}
                                        </h3>
                                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-normal">
                                            {link.description}
                                        </p>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Footer divider */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 md:mt-24 pt-8 border-t border-foreground/10 flex items-center gap-3"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#133df6]"></div>
                    <p className="text-xs font-medium text-muted-foreground">
                        {t.contact.availability}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
