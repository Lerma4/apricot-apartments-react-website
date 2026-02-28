import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Philosophy() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect on background
            gsap.to('.philo-bg', {
                y: '20%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

            // Text reveal
            gsap.from('.philo-text', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-40 md:py-60 px-6 md:px-12 bg-charcoal w-full overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0 bg-charcoal">
                <img
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop"
                    alt="Dark moss texture"
                    className="philo-bg w-full h-[120%] object-cover opacity-10 absolute -top-[10%] mix-blend-screen"
                />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
                <div className="overflow-hidden">
                    <p className="philo-text font-sans text-cream/70 text-lg md:text-2xl font-medium tracking-tight">
                        La maggior parte degli alloggi si concentra su: <br className="md:hidden" /> standard impersonali e costi nascosti.
                    </p>
                </div>

                <div className="overflow-hidden w-full flex justify-center mt-4">
                    <h2 className="philo-text font-drama italic text-5xl md:text-7xl lg:text-[6rem] text-cream leading-[1.05] tracking-tight max-w-4xl">
                        Noi ci concentriamo su:<br />
                        un <span className="text-accent">rifugio organico</span> e accessibile.
                    </h2>
                </div>
            </div>
        </section>
    );
}
