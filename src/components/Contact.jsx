import { motion } from 'framer-motion';
import { Mail, Linkedin, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();

    const contactLinks = [
        {
            title: t.contact.email,
            description: t.contact.emailDesc,
            icon: Mail,
            href: "mailto:mathiasvidela20@gmail.com",
        },
        {
            title: t.contact.linkedin,
            description: t.contact.linkedinDesc,
            icon: Linkedin,
            href: "https://www.linkedin.com/in/mathias-videla/",
        },
        {
            title: t.contact.cv,
            description: t.contact.cvDesc,
            icon: FileText,
            href: "/resume.pdf",
        }
    ];

    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden border-t border-foreground/5">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#133df6]/30 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#133df6]/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
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
                        transition={{ delay: 0.2 }}
                        className="w-full xl:w-2/3 flex flex-col sm:flex-row gap-4 xl:justify-end xl:mt-16"
                    >
                        {contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="group relative flex-1 flex items-center p-4 lg:p-6 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[#133df6]/50 hover:bg-foreground/10 backdrop-blur-md transition-all duration-300 overflow-hidden"
                            >
                                {/* Glow Effect on Hover */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#133df6]/0 group-hover:bg-[#133df6]/10 blur-2xl transition-colors duration-500 rounded-full pointer-events-none" />

                                <div className="relative z-10 flex items-center w-full gap-4">
                                    <div className="p-3 bg-background/50 rounded-lg border border-foreground/10 text-[#133df6] flex-shrink-0">
                                        <link.icon size={20} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-foreground font-bold text-sm lg:text-base mb-0.5">{link.title}</h3>
                                        <p className="text-muted-foreground text-[10px] lg:text-xs font-medium">{link.description}</p>
                                    </div>

                                    <ArrowRight size={18} className="text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:text-[#133df6] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                </div>
                            </a>
                        ))}
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
