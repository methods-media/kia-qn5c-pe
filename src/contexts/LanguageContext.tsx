import React, { createContext, useContext, useState } from 'react';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const translations: Record<string, any> = { en, ar };

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('en');

    const t = (key: string) => {
        const keys = key.split('.');
        let val = translations[language];
        for (const k of keys) {
            if (val) val = val[k];
        }
        return val || key;
    };

    const i18n = {
        language,
        changeLanguage: setLanguage
    };

    return (
        <LanguageContext.Provider value={{ t, i18n }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within LanguageProvider');
    }
    return context;
};
