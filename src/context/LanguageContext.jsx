import { createContext, useContext, useState } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('es'); // Default to Spanish as requested

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
