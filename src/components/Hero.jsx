import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-element', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[100dvh] w-full flex items-end pb-24 md:pb-32 px-6 md:px-12 overflow-hidden">
            {/* Background Image & Gradient */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop"
                    alt="Dark forest texture"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-6">
                <div className="flex flex-col">
                    <h1 className="hero-element text-cream font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-2">
                        Il riposo assoluto è la
                    </h1>
                    <span className="hero-element text-cream font-drama italic text-7xl md:text-8xl lg:text-[9rem] leading-[0.8] tracking-tight pr-4">
                        Natura.
                    </span>
                </div>

                <p className="hero-element text-cream/80 font-sans text-lg md:text-xl max-w-md leading-relaxed mt-4">
                    Un rifugio nel basso Piemonte. Spazi appena ristrutturati dove il comfort incontra l'essenza organica del territorio.
                </p>

                <button onClick={() => document.getElementById('contatti').scrollIntoView({ behavior: 'smooth' })} className="hero-element mt-8 relative overflow-hidden bg-accent text-cream px-8 py-4 rounded-full text-base font-semibold transition-transform duration-300 hover:-translate-y-[1px] hover:scale-[1.03] group shadow-lg shadow-accent/20 cursor-pointer">
                    <span className="relative z-10 flex items-center gap-2">
                        Richiedi Disponibilità
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></div>
                </button>
            </div>
        </section>
    );
}
