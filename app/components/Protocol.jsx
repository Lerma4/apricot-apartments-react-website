import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// SVG components for the 3 cards
function PatternOne() {
    return (
        <svg viewBox="0 0 100 100" className="w-full max-w-[200px] h-full rotating-pattern opacity-50">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
            <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
    );
}

function PatternTwo() {
    return (
        <div className="w-full max-w-[200px] aspect-square border border-current/20 relative overflow-hidden grid rounded-2xl" style={{ gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)' }}>
            {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border-r border-b border-current/10"></div>
            ))}
            <div className="scanner-line absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_10px_rgba(204,88,51,0.8)]"></div>
        </div>
    );
}

function PatternThree() {
    return (
        <svg viewBox="0 0 100 100" className="w-full max-w-[200px] h-full opacity-60">
            <path className="waveform-path" d="M0,50 Q12.5,20 25,50 T50,50 T75,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function Protocol() {
    const containerRef = useRef(null);

    const cards = [
        {
            num: "01",
            title: "Scopri Morsasco",
            desc: "Immergiti nella tranquillità del basso Piemonte, circondato dal verde.",
            Visual: PatternOne
        },
        {
            num: "02",
            title: "Prenota l'Esperienza",
            desc: "Un processo lineare, trasparente, senza frizioni e costi inattesi.",
            Visual: PatternTwo
        },
        {
            num: "03",
            title: "Vivi il Riposo",
            desc: "Spazi perfettamente ottimizzati per farti ritrovare il tuo equilibrio centrale.",
            Visual: PatternThree
        }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Setup micro-animations
            gsap.to('.rotating-pattern', { rotation: 360, duration: 20, repeat: -1, ease: 'linear', transformOrigin: 'center' });
            gsap.to('.scanner-line', { y: '200px', duration: 3, repeat: -1, ease: 'linear' }); // fixed scanner line distance instead of % due to GSAP bug with 100%

            const tlWave = gsap.timeline({ repeat: -1, yoyo: true });
            tlWave.to('.waveform-path', {
                attr: { d: "M0,50 Q12.5,80 25,50 T50,50 T75,50 T100,50" },
                duration: 1.5,
                ease: "sine.inOut"
            });

            // Sticky Stacking Logic
            const cardElements = gsap.utils.toArray('.protocol-card');
            cardElements.forEach((card, i) => {
                if (i < cardElements.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        filter: 'blur(10px)',
                        opacity: 0.6,
                        scrollTrigger: {
                            trigger: cardElements[i + 1],
                            start: 'top bottom',
                            end: 'top top',
                            scrub: true,
                        }
                    });
                }
            });
        }, containerRef);
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={containerRef} id="accoglienza" className="relative py-24 md:py-32 px-6 md:px-12 bg-background w-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-[10vh] md:gap-[50vh] pb-[10vh]">
                <div className="md:mb-[-20vh] z-10 relative">
                    <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-dark tracking-tighter mb-4">
                        Il Protocollo.
                    </h2>
                    <p className="font-sans text-dark/60 text-lg md:text-xl max-w-xl">Sequenza operativa per raggiungere il riposo totale.</p>
                </div>

                <div className="flex flex-col gap-[3rem] md:block mt-12 md:mt-0">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className="protocol-card md:sticky md:top-[15vh] bg-cream border border-dark/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 md:h-[60vh] md:max-h-[600px] overflow-hidden md:mb-[50vh] last:mb-0"
                        >
                            <div className="flex-1 w-full h-full flex flex-col justify-center gap-4 md:gap-6">
                                <div className="font-mono text-accent text-lg md:text-xl font-bold">{card.num} // STEP</div>
                                <h3 className="font-sans font-bold text-3xl md:text-5xl text-dark tracking-tight leading-tight">{card.title}</h3>
                                <p className="text-dark/70 text-base md:text-xl max-w-md leading-relaxed">{card.desc}</p>
                            </div>

                            <div className="flex-1 w-full h-full min-h-[200px] rounded-[2rem] bg-moss/5 border border-moss/10 flex items-center justify-center p-8 text-primary">
                                <card.Visual />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
