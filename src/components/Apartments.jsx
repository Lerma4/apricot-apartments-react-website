import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock } from 'lucide-react';

export default function Apartments() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.apt-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="appartamenti" className="py-24 md:py-32 px-6 md:px-12 bg-cream w-full">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-dark tracking-tighter mb-6">
                            I Rifugi.
                        </h2>
                        <p className="font-sans text-dark/60 text-lg md:text-xl max-w-xl leading-relaxed">
                            Spazi curati per un'esperienza immersiva nel cuore del basso Piemonte. Prenota il tuo isolamento rigenerativo.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Active Apartment */}
                    <Link to="/apartment/1" className="apt-card group relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-dark block">
                        <img
                            loading="lazy"
                            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                            alt="Rifugio Silva"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-cream/20 backdrop-blur-md border border-cream/20 px-4 py-2 rounded-full text-cream font-mono text-xs uppercase tracking-widest">
                                    Disponibile
                                </div>
                                <div className="w-12 h-12 rounded-full bg-cream text-dark flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                                    <ArrowUpRight size={20} strokeWidth={2} />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-drama italic text-4xl md:text-5xl text-cream mb-2">Rifugio Silva</h3>
                                <p className="text-cream/80 font-sans text-sm md:text-base max-w-sm">Dettagli in pietra e legno organico. Ideale per 2-4 persone.</p>
                            </div>
                        </div>
                    </Link>

                    {/* In Preparation Apartment */}
                    <div className="apt-card relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-background border border-dark/10 group cursor-not-allowed">
                        <img
                            loading="lazy"
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                            alt="Studio Terrena"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>

                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-dark/10 backdrop-blur-md border border-dark/10 px-4 py-2 rounded-full text-dark font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Clock size={14} />
                                    In Preparazione
                                </div>
                            </div>

                            <div>
                                <h3 className="font-drama italic text-4xl md:text-5xl text-dark mb-2">Studio Terrena</h3>
                                <p className="text-dark/60 font-sans text-sm md:text-base max-w-sm">Attualmente in fase di allestimento finale. Prossimamente disponibile per prenotazioni.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
