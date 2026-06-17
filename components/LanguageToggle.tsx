import React from 'react';
import { useLanguage } from '../LanguageContext';

export const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const isFrench = language === 'fr';

    return (
        <div
            className="flex items-center space-x-2 text-gray-700 cursor-pointer select-none"
            onClick={() => setLanguage(isFrench ? 'en' : 'fr')}
            aria-label="Toggle language"
        >
            <span className={`text-sm font-body font-medium transition-opacity ${isFrench ? 'opacity-100' : 'opacity-70'}`}>FR</span>
            <div className="w-10 h-5 bg-gray-200 rounded-full p-0.5 flex items-center relative">
                <div
                    className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${isFrench ? 'translate-x-0' : 'translate-x-5'}`}
                ></div>
            </div>
            <span className={`text-sm font-body font-medium transition-opacity ${isFrench ? 'opacity-70' : 'opacity-100'}`}>EN</span>
        </div>
    );
};