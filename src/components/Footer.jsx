import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-muted/30 py-12 border-t border-foreground/10">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <p className="text-2xl font-heading font-bold tracking-tighter text-foreground mb-2">
                        MV<span className="text-primary">.</span>
                    </p>
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Mathias Laureano Videla. {t.footer.rights}
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="https://www.github.com/Mathiasvidela" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="www.linkedin.com/in/mathias-videla/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:mathiasvidela20@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
