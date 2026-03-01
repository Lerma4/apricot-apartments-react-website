import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const setI18nCookie = (lng) => {
    if (typeof document !== 'undefined') {
        // Remix's createCookie expects base64 encoded JSON
        const val = encodeURIComponent(btoa(JSON.stringify(lng)));
        window.document.cookie = `i18n=${val}; path=/; max-age=31536000; SameSite=Lax`;
    }
};

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const changeLanguage = (lng) => {
        setI18nCookie(lng);
        setIsOpen(false);
        window.location.reload();
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'it', label: 'IT' },
        { code: 'en', label: 'EN' },
        { code: 'fr', label: 'FR' },
        { code: 'de', label: 'DE' }
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={toggleOpen} 
                className="flex items-center gap-1.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-[1px] group"
                aria-label="Change Language"
            >
                <Globe size={16} className="group-hover:text-accent transition-colors" />
                <span className="uppercase font-mono">{i18n.language?.substring(0, 2) || 'IT'}</span>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-3 bg-[#F2F0E9] border border-[#1A1A1A]/10 shadow-xl rounded-2xl overflow-hidden min-w-[120px] z-50 flex flex-col p-2 gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lng) => (
                        <button
                            key={lng.code}
                            onClick={() => changeLanguage(lng.code)}
                            className={`w-full text-left px-4 py-2 text-sm rounded-xl transition-colors hover:bg-[#1A1A1A]/5 ${
                                i18n.language?.startsWith(lng.code) ? 'text-[#CC5833] font-semibold bg-[#CC5833]/10' : 'text-[#1A1A1A]'
                            }`}
                        >
                            {lng.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
