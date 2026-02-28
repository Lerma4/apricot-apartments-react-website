import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-elem', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="contatti" className="py-24 md:py-40 px-6 md:px-12 bg-cream w-full flex justify-center mt-0">
            <div className="w-full max-w-3xl bg-white rounded-[3rem] p-8 md:p-16 border border-dark/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <div className="text-center mb-12">
                    <h2 className="contact-elem font-sans font-bold text-4xl md:text-5xl text-dark tracking-tighter mb-4">
                        Inizia il Riposo.
                    </h2>
                    <p className="contact-elem font-sans text-dark/60 text-lg">
                        Compila i dati per verificare la disponibilità e le tariffe in tempo reale. Nessun impegno.
                    </p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="contact-elem flex flex-col gap-2">
                            <label htmlFor="name" className="font-sans font-medium text-sm text-dark">Nome Completo</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-background border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                placeholder="es. Mario Rossi"
                            />
                        </div>

                        <div className="contact-elem flex flex-col gap-2">
                            <label htmlFor="email" className="font-sans font-medium text-sm text-dark">Email Operativa</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-background border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                placeholder="es. nome@dominio.com"
                            />
                        </div>
                    </div>

                    <div className="contact-elem flex flex-col gap-2">
                        <label htmlFor="dates" className="font-sans font-medium text-sm text-dark">Periodo Desiderato (Opzionale)</label>
                        <input
                            type="text"
                            id="dates"
                            className="w-full bg-background border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                            placeholder="es. Metà Agosto"
                        />
                    </div>

                    <div className="contact-elem flex flex-col gap-2">
                        <label htmlFor="message" className="font-sans font-medium text-sm text-dark">Note Aggiuntive</label>
                        <textarea
                            id="message"
                            rows="3"
                            className="w-full bg-background border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                            placeholder="Richieste particolari o domande..."
                        ></textarea>
                    </div>

                    <button className="contact-elem mt-4 relative overflow-hidden bg-accent text-cream px-8 py-4 rounded-full text-base font-semibold transition-transform duration-300 hover:-translate-y-[1px] hover:scale-[1.02] group w-full flex justify-center items-center shadow-lg shadow-accent/20 cursor-pointer">
                        <span className="relative z-10 flex items-center gap-2">
                            Invia Richiesta
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></div>
                    </button>
                </form>
            </div>
        </section>
    );
}
