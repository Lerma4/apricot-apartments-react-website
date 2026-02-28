import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2 } from 'lucide-react';

// Card 1: Diagnostic Shuffler
const DiagnosticShuffler = React.memo(function DiagnosticShuffler() {
    const [items, setItems] = useState([
        { id: 1, text: "Silenzio Assoluto", sub: "Isolamento naturale" },
        { id: 2, text: "Aria Pura", sub: "Ventilazione boschiva" },
        { id: 3, text: "Vista Morsasco", sub: "Orizzonte verde" }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const newItems = [...prev];
                const last = newItems.pop();
                newItems.unshift(last);
                return newItems;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[280px] w-full relative flex items-center justify-center pointer-events-none">
            {items.map((item, index) => {
                return (
                    <div
                        key={item.id}
                        className={`absolute w-[80%] bg-white/80 border border-dark/10 backdrop-blur-md rounded-[2rem] p-6 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
                        style={{
                            transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
                            opacity: 1 - index * 0.2,
                            zIndex: 10 - index
                        }}
                    >
                        <div className="font-mono text-xs text-primary/60 mb-2">0{item.id} // PARAMETRO</div>
                        <div className="font-sans font-bold text-lg text-dark">{item.text}</div>
                        <div className="text-sm text-dark/60">{item.sub}</div>
                    </div>
                )
            })}
        </div>
    )
});

// Card 2: Telemetry Typewriter
const TelemetryTypewriter = React.memo(function TelemetryTypewriter() {
    const [text, setText] = useState("");
    const fullText = "Calcolo tariffa... \n> Accessibilità verificata. \n> Nessun costo nascosto. \n> Qualità alberghiera, \n  prezzo residenziale. \n> Sistema pronto.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, i));
            i++;
            if (i > fullText.length + 10) {
                i = 0;
                setText("");
            }
        }, 70);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[280px] w-full p-6 flex flex-col rounded-[2rem] bg-background/50 m-2 border border-dark/5">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <div className="text-xs font-mono text-dark/50 uppercase tracking-widest">Live Feed</div>
            </div>
            <div className="font-mono text-sm text-dark/80 whitespace-pre-wrap leading-relaxed flex-1">
                {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span>
            </div>
        </div>
    )
});

// Card 3: Cursor Protocol Scheduler
const CursorProtocolScheduler = React.memo(function CursorProtocolScheduler() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set('.cursor-svg', { x: 0, y: 0, scale: 1 })
                .set('.day-cell', { backgroundColor: 'transparent', scale: 1 })
                .set('.save-btn', { scale: 1, backgroundColor: 'transparent', color: '#1A1A1A' })
                .to('.cursor-svg', { duration: 1, x: 80, y: 60, ease: "power2.inOut" })
                .to('.cursor-svg', { duration: 0.1, scale: 0.8 }, "+=0.1")
                .to('.day-cell-target', { duration: 0.2, backgroundColor: '#CC5833', color: '#F2F0E9', scale: 0.95 }, "<")
                .to('.cursor-svg', { duration: 0.1, scale: 1 })
                .to('.day-cell-target', { duration: 0.2, scale: 1 }, "<")
                .to('.cursor-svg', { duration: 0.8, x: 140, y: 180, ease: "power2.inOut" }, "+=0.3")
                .to('.cursor-svg', { duration: 0.1, scale: 0.8 }, "+=0.1")
                .to('.save-btn', { duration: 0.2, scale: 0.95 }, "<")
                .to('.save-btn', { duration: 0.2, backgroundColor: '#2E4036', color: '#F2F0E9' }, "<")
                .to('.cursor-svg', { duration: 0.1, scale: 1 })
                .to('.save-btn', { duration: 0.2, scale: 1 }, "<")
                .to('.cursor-svg', { duration: 0.5, opacity: 0 }, "+=0.5")
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const days = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

    return (
        <div ref={containerRef} className="h-[280px] w-full p-6 relative overflow-hidden flex flex-col justify-between m-2 bg-background/50 rounded-[2rem] border border-dark/5">
            <MousePointer2 className="cursor-svg text-dark absolute z-20 w-6 h-6 drop-shadow-md" style={{ top: '20px', left: '20px' }} strokeWidth={1.5} fill="#F2F0E9" />

            <div>
                <div className="font-mono text-xs text-dark/50 mb-4">DISPONIBILITA' IMMINENTE</div>
                <div className="grid grid-cols-7 gap-2 mb-4 relative z-10">
                    {days.map((d, i) => (
                        <div key={i} className={`day-cell ${i === 4 ? 'day-cell-target' : ''} aspect-square rounded-lg border border-dark/10 flex items-center justify-center font-mono text-xs text-dark transition-colors`}>
                            {d}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end relative z-10">
                <div className="save-btn px-4 py-2 border border-dark/20 rounded-full text-xs font-semibold text-dark transition-colors">
                    Conferma Check-in
                </div>
            </div>
        </div>
    )
});

export default function Features() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
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
        <section ref={containerRef} id="natura" className="py-24 md:py-32 px-6 md:px-12 bg-background w-full">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24">
                    <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-dark tracking-tighter mb-6">
                        Artefatti Funzionali.
                    </h2>
                    <p className="font-sans text-dark/60 text-lg md:text-xl max-w-xl leading-relaxed">
                        Abbiamo ingegnerizzato l'accoglienza. Ogni elemento è pensato per ottimizzare il tuo recupero fisico e mentale.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="feature-card bg-white rounded-[2.5rem] border border-dark/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                        <DiagnosticShuffler />
                        <div className="p-8 pt-4 mt-auto">
                            <h3 className="font-sans font-bold text-xl text-dark mb-2">Immersione Organica</h3>
                            <p className="text-dark/60 text-sm leading-relaxed">Appartamenti situati nel verde del basso Piemonte, progettati per massimizzare il rilassamento e disconnettersi dal rumore urbano.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card bg-white rounded-[2.5rem] border border-dark/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center justify-center p-2">
                        <TelemetryTypewriter />
                        <div className="p-6 pt-2 w-full mt-auto">
                            <h3 className="font-sans font-bold text-xl text-dark mb-2">Efficienza Economica</h3>
                            <p className="text-dark/60 text-sm leading-relaxed">Tariffe ottimizzate che garantiscono l'accesso a un rifugio di alta qualità senza i sovraccarichi delle strutture tradizionali.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card bg-white rounded-[2.5rem] border border-dark/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col p-2">
                        <CursorProtocolScheduler />
                        <div className="p-6 pt-2 mt-auto">
                            <h3 className="font-sans font-bold text-xl text-dark mb-2">Condizione Perfetta</h3>
                            <p className="text-dark/60 text-sm leading-relaxed">Spazi appena ristrutturati con standard rigorosi. Tutto è nuovo, pulito e pronto per essere vissuto dal primo istante.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
