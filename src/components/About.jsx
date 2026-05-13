import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="relative min-h-auto bg-[#133df6] overflow-hidden py-5 md:py-10 flex items-center">
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Left vertical line */}
                <div className="absolute left-[8%] md:left-[5%] top-0 bottom-0 w-[1px] bg-white/10"></div>
                {/* Right vertical line */}
                <div className="absolute right-[8%] md:right-[5%] top-0 bottom-0 w-[1px] bg-white/10"></div>
                {/* Bottom horizontal line */}
                <div className="absolute bottom-[10%] left-0 right-0 h-[1px] bg-white/10"></div>

                {/* Crosses at intersections */}
                <div className="absolute left-[8%] md:left-[5%] top-[15%] w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>
                </div>
                <div className="absolute right-[8%] md:right-[5%] bottom-[10%] w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20"></div>
                </div>
            </div>

            {/* Background Outlined Text */}
            <div className="absolute left-[-2%] top-[15%] md:top-[15%] text-[20vw] md:text-[16vw] font-black text-transparent whitespace-nowrap leading-[0.85] opacity-20 pointer-events-none z-0" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                CODE<br />
                ARCHIT
            </div>

            {/* Right vertical text */}
            <div className="absolute right-[2%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-0">
                <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    <span className="text-[10px] tracking-[0.3em] text-white/50 uppercase">Soluciones que escalan</span>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left space with Spline iframe */}
                    <div className="lg:col-span-4 xl:col-span-5 relative z-50 h-[300px] lg:h-auto lg:min-h-[500px] w-full">
                        <iframe src="https://my.spline.design/pixeltextsetcopycopy-8D4smM00SB6ZDOHlO8NbkuF1-Yew/" frameBorder="0" className="absolute inset-0 w-full h-full bg-transparent" allowTransparency="true" style={{ background: 'transparent' }}></iframe>

                    </div>



                    <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center items-center">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Header */}
                            {/* <div className="flex items-center gap-6 mb-10 w-full max-w-xl">
                                <span className="text-yellow-400 font-bold text-xs tracking-[0.2em] uppercase whitespace-nowrap">01 / ABOUT</span>
                                <div className="h-[1px] flex-grow bg-white/20 relative">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                </div>
                            </div> */}

                            {/* Main Content */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                                {t.about.titlePart1} <br className="hidden md:block" />
                                <span className="font-serif italic text-2xl md:text-5xl">{t.about.titlePart2}</span>
                            </h2>

                            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed font-light">
                                {t.about.description}
                            </p>
                        </motion.div>

                        {/* 3 Cards / Items */}
                        {/* <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10 rounded-sm bg-[#133df6]/50 backdrop-blur-sm"
                        >
                            {/* Item 1 */}
                        {/* <div className="p-6 md:p-8 border-b sm:border-b-0 sm:border-r border-white/10 hover:bg-white/5 transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white font-bold text-lg">01</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg md:text-xl mb-3">Java & Spring Boot</h3>
                                <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">Microservicios robustos y escalables.</p>
                            </div> */}

                        {/* Item 2 */}
                        {/* <div className="p-6 md:p-8 border-b sm:border-b-0 sm:border-r border-white/10 hover:bg-white/5 transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white font-bold text-lg">02</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg md:text-xl mb-3">React Interfaces</h3>
                                <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">Interfaces interactivas y performantes.</p>
                            </div> */}

                        {/* Item 3 */}
                        {/* <div className="p-6 md:p-8 hover:bg-white/5 transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white font-bold text-lg">03</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                </div>
                                <h3 className="text-white font-bold text-lg md:text-xl mb-3">SQL Optimization</h3>
                                <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">Consultas eficientes, datos que rinden.</p>
                            </div>
                        </motion.div> */}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
