import { motion } from 'framer-motion';
import { Terminal, Layers, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <Terminal className="text-primary" size={32} />,
            title: t.about.features[0].title,
            description: t.about.features[0].description
        },
        {
            icon: <Layers className="text-accent" size={32} />,
            title: t.about.features[1].title,
            description: t.about.features[1].description
        },
        {
            icon: <Cpu className="text-yellow-400" size={32} />,
            title: t.about.features[2].title,
            description: t.about.features[2].description
        }
    ];

    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
                        {t.about.titlePart1} <span className="text-primary">{t.about.titlePart2}</span> {t.about.titlePart3} <span className="text-accent">{t.about.titlePart4}</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {t.about.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="p-8 rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-colors group"
                        >
                            <div className="mb-6 p-4 rounded-full bg-foreground/5 w-fit group-hover:bg-foreground/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
