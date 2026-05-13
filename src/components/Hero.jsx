import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    const fullText = "SOFTWARE\nDEVELOPER";
    const [text, setText] = useState("");

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 150); // Speed of typing

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
            {/* Background Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 mt-10 md:mt-0">
                <h1 className="text-[14vw] md:text-[13vw] font-black leading-[0.8] text-[#133df6] tracking-tighter w-full text-center whitespace-pre-wrap">
                    {text}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                        className="inline-block w-[1.5vw] md:w-[1vw] h-[10vw] md:h-[9vw] bg-[#133df6] ml-2 align-bottom"
                    />
                </h1>
            </div>

            {/* Small floating text overlays */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-[20%] md:top-[25%] left-[40%] md:left-[16%]">
                    <span className="font-serif italic text-4xl md:text-6xl text-foreground/90">I'm a</span>
                </div>
            </div>

            {/* Photo Overlapping text */}
            <div className="absolute bottom-0 w-full flex justify-center pointer-events-none z-20">
                <motion.img
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                    src="/fotobn.png"
                    alt="Developer"
                    className="max-h-[75vh] md:max-h-[85vh] object-contain object-bottom drop-shadow-2xl"
                />
            </div>

            {/* textura fondo */}
            <div className="absolute top-0 w-full h-full bg-[url('/texture_background.png')] opacity-20 pointer-events-none">
                <img
                    src="/texture_dust.webp"
                    alt="Texture Background"
                    className="w-full h-[120vh] md:max-h-[120vh] object-cover opacity-60"
                />
            </div>

            {/* Bottom Footer Section */}
            <div className="absolute bottom-8 w-full z-30 px-6 md:px-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div className="w-full md:w-1/3 order-2 md:order-1 hidden md:block">
                        <p className="text-xs md:text-sm font-semibold tracking-wide max-w-[250px] uppercase text-foreground/80 leading-relaxed">
                            FULL-STACK DEVELOPER · JAVA · SPRING BOOT · REACT · DATABASES AND APIS.
                        </p>
                    </div>

                    <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
                        <button
                            onClick={scrollToContact}
                            className="px-8 md:px-12 py-4 bg-[#133df6] text-white rounded-lg font-bold tracking-wide uppercase hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl w-full md:w-auto" >
                            {t.hero.LetsBuild}
                        </button>
                    </div>

                    <div className="w-full md:w-1/3 flex justify-end order-3 md:order-3 hidden md:flex">
                        <p className="text-xs md:text-sm text-foreground/60 max-w-[250px] leading-relaxed">
                            I build digital solutions designed to scale, stay maintainable, and improve the user experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
