import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Wifi, Coffee, Bath, Trees, Car, ThermometerSun } from 'lucide-react';

import Footer from '../components/Footer';

export default function ApartmentDetail() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        // Simple fade-up animation for the content
        const ctx = gsap.context(() => {
            gsap.from('.detail-anim', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2
            });
        });
        return () => ctx.revert();
    }, [id]);

    const services = [
        { icon: <Wifi size={24} strokeWidth={1.5} />, name: "Wi-Fi Veloce (Starlink)" },
        { icon: <Coffee size={24} strokeWidth={1.5} />, name: "Cucina Attrezzata" },
        { icon: <Bath size={24} strokeWidth={1.5} />, name: "Vasca Isolata" },
        { icon: <Trees size={24} strokeWidth={1.5} />, name: "Vista Bosco" },
        { icon: <Car size={24} strokeWidth={1.5} />, name: "Parcheggio Privato" },
        { icon: <ThermometerSun size={24} strokeWidth={1.5} />, name: "Climatizzazione" },
    ];

    return (
        <div className="bg-background min-h-screen relative font-sans text-dark">
            {/* Mini Nav / Back Button */}
            <nav className="fixed top-6 left-6 md:left-12 z-50">
                <Link to="/" className="flex items-center gap-2 bg-white/50 backdrop-blur-xl border border-dark/10 shadow-[0_4px_10px_rgba(0,0,0,0.05)] text-dark px-4 py-3 rounded-full text-sm font-semibold transition-transform duration-300 hover:-translate-y-[1px] hover:scale-[1.03]">
                    <ArrowLeft size={16} /> Indietro
                </Link>
            </nav>

            {/* Hero Section 60vh */}
            <section className="relative h-[60vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                    alt="Rifugio Silva"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 pb-32 -mt-16 relative z-10 w-full flex flex-col lg:flex-row gap-16 items-start">

                {/* Left Column 70% */}
                <div className="w-full lg:w-[65%] flex flex-col gap-12">

                    <div className="detail-anim flex flex-col gap-4">
                        <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                            Appartamento Operativo
                        </div>
                        <h1 className="font-drama italic text-5xl md:text-7xl text-dark tracking-tighter leading-none">
                            Rifugio Silva
                        </h1>
                        <p className="font-sans text-dark/70 text-lg">
                            2-4 Ospiti &bull; 1 Camera matrimoniale &bull; 1 Divano letto &bull; 1 Bagno
                        </p>
                    </div>

                    <div className="detail-anim h-px w-full bg-dark/10"></div>

                    <div className="detail-anim">
                        <h2 className="font-sans font-bold text-2xl mb-4">Lo Spazio</h2>
                        <p className="font-sans text-dark/70 text-lg leading-relaxed max-w-[65ch]">
                            Una meticolosa ristrutturazione ha restituito vita a queste antiche mura. Il Rifugio Silva offre un'esperienza organica: pietra grezza e legno lavorato artigianalmente si combinano con il comfort dei sistemi climatici discreti. Le ampie finestre annullano il confine tra interno e l'infinita estensione verde del bosco di Morsasco. Niente rumore, niente distrazioni: solo un riposo totale ed ininterrotto.
                        </p>
                    </div>

                    <div className="detail-anim h-px w-full bg-dark/10"></div>

                    <div className="detail-anim">
                        <h2 className="font-sans font-bold text-2xl mb-6">Servizi Integrati</h2>

                        {/* Bento Grid layout for Services */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {services.map((item, i) => (
                                <div key={i} className="bg-white border border-dark/5 shadow-sm rounded-3xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1">
                                    <div className="text-accent">{item.icon}</div>
                                    <div className="font-sans font-medium text-sm text-dark">{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column Sticky Booking Widget 35% */}
                <div className="w-full lg:w-[35%] lg:sticky lg:top-24 detail-anim bg-white border border-dark/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8">
                    <div className="flex justify-between items-end mb-8">
                        <div className="flex flex-col">
                            <span className="font-sans text-dark/60 text-sm">Tariffa base</span>
                            <span className="font-sans font-bold text-3xl tracking-tight text-dark">€85 <span className="font-medium text-lg text-dark/60">/ notte</span></span>
                        </div>
                    </div>

                    <div className="border border-dark/20 rounded-2xl overflow-hidden mb-6 flex flex-col">
                        <div className="grid grid-cols-2 border-b border-dark/20">
                            <div className="p-4 border-r border-dark/20 font-mono text-xs cursor-text">
                                <span className="text-dark/40 uppercase block mb-1">Check-in</span>
                                Seleziona data
                            </div>
                            <div className="p-4 font-mono text-xs cursor-text">
                                <span className="text-dark/40 uppercase block mb-1">Check-out</span>
                                Seleziona data
                            </div>
                        </div>
                        <div className="p-4 font-mono text-xs cursor-pointer flex justify-between items-center group">
                            <div>
                                <span className="text-dark/40 uppercase block mb-1">Ospiti</span>
                                <span className="group-hover:text-accent transition-colors">2 Ospiti</span>
                            </div>
                        </div>
                    </div>

                    <button className="relative overflow-hidden bg-accent w-full text-cream px-6 py-4 rounded-full text-base font-semibold transition-transform duration-300 hover:scale-[1.03] group shadow-lg shadow-accent/20 cursor-pointer">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Verifica Disponibilità
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></div>
                    </button>

                    <div className="mt-4 text-center font-sans text-xs text-dark/50">
                        Non ti sarà addebitato alcun importo in questa fase.
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
