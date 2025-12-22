import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                        {t.contact.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t.contact.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md mx-auto bg-foreground/5 border border-foreground/10 rounded-3xl p-8 backdrop-blur-sm"
                >
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">{t.contact.nameLabel}</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 text-foreground focus:outline-none focus:border-primary transition-colors"
                                placeholder={t.contact.namePlaceholder}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">{t.contact.emailLabel}</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 text-foreground focus:outline-none focus:border-primary transition-colors"
                                placeholder={t.contact.emailPlaceholder}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">{t.contact.messageLabel}</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder={t.contact.messagePlaceholder}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 group"
                        >
                            {t.contact.sendButton}
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
