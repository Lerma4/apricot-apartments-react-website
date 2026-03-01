import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    
    return (
        <footer className="bg-charcoal text-cream pt-20 pb-8 px-6 md:px-12 mt-[-4rem] rounded-t-[4rem] relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col relative z-30">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-16">
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <h2 className="font-display font-semibold tracking-tight text-3xl">Apricot</h2>
                        <p className="text-cream/50 max-w-sm font-sans leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div className="md:col-span-2 md:col-start-8 flex flex-col gap-4">
                        <h3 className="font-sans font-semibold text-sm tracking-widest uppercase text-cream/40 mb-2">{t('footer.nav_title')}</h3>
                        <a href="#natura" className="text-cream/80 hover:text-accent transition-colors font-medium">{t('nav.philosophy')}</a>
                        <a href="#accoglienza" className="text-cream/80 hover:text-accent transition-colors font-medium">{t('nav.home')}</a>
                        <a href="#contatti" className="text-cream/80 hover:text-accent transition-colors font-medium">{t('nav.contact')}</a>
                    </div>

                    <div className="md:col-span-3 flex flex-col gap-4">
                        <h3 className="font-sans font-semibold text-sm tracking-widest uppercase text-cream/40 mb-2">{t('footer.legal_title')}</h3>
                        <a href="#" className="text-cream/80 hover:text-accent transition-colors font-medium">{t('footer.privacy')}</a>
                        <a href="#" className="text-cream/80 hover:text-accent transition-colors font-medium">{t('footer.terms')}</a>
                    </div>
                </div>

                <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-cream/40 text-sm font-sans">
                        &copy; {new Date().getFullYear()} Apricot Appartments. {t('footer.rights')}
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-full border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                        <div className="font-mono text-xs text-cream/80 uppercase tracking-widest">{t('footer.system_status')}</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
