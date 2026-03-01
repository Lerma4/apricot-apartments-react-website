import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -100px',
                onUpdate: (self) => {
                    if (self.progress > 0) {
                        setIsScrolled((prev) => (!prev ? true : prev));
                    } else if (self.progress === 0) {
                        setIsScrolled((prev) => (prev ? false : prev));
                    }
                },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-500 w-[90%] max-w-[1000px]",
                isScrolled
                    ? "bg-[#F2F0E9]/80 backdrop-blur-xl border border-[#1A1A1A]/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] text-[#1A1A1A] py-4"
                    : "bg-transparent text-[#F2F0E9]"
            )}
        >
            <div className="font-display font-semibold tracking-tight text-xl">
                Apricot
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#natura" className="relative group overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{t('nav.philosophy')}</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">{t('nav.philosophy')}</span>
                </a>
                <a href="#appartamenti" className="relative group overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{t('nav.apartments')}</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">{t('nav.apartments')}</span>
                </a>
                <a href="#accoglienza" className="relative group overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{t('nav.home')}</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">{t('nav.home')}</span>
                </a>
            </div>

            <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button className="relative overflow-hidden bg-accent text-[#F2F0E9] px-6 py-2.5 rounded-full text-sm font-semibold transition-transform duration-300 hover:-translate-y-[1px] hover:scale-[1.03] group">
                    <span className="relative z-10 flex items-center gap-2">
                        {t('nav.contact')}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></div>
                </button>
            </div>
        </nav>
    );
}
