import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 'top -100px',
                onUpdate: (self) => {
                    if (self.progress > 0 && !isScrolled) {
                        setIsScrolled(true);
                    } else if (self.progress === 0 && isScrolled) {
                        setIsScrolled(false);
                    }
                },
            });
        });
        return () => ctx.revert();
    }, [isScrolled]);

    return (
        <nav
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[2rem] transition-all duration-500 w-[90%] max-w-[1000px]",
                isScrolled
                    ? "bg-background/80 backdrop-blur-xl border border-dark/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] text-dark py-4"
                    : "bg-transparent text-cream"
            )}
        >
            <div className="font-display font-semibold tracking-tight text-xl">
                Apricot
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#natura" className="relative group overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Natura</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">Natura</span>
                </a>
                <a href="#appartamenti" className="relative group overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">I Rifugi</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">I Rifugi</span>
                </a>
                <a href="#accoglienza" className="relative group overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Accoglienza</span>
                    <span className="block absolute top-0 left-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">Accoglienza</span>
                </a>
            </div>

            <button className="relative overflow-hidden bg-accent text-cream px-6 py-2.5 rounded-full text-sm font-semibold transition-transform duration-300 hover:-translate-y-[1px] hover:scale-[1.03] group">
                <span className="relative z-10 flex items-center gap-2">
                    Contattaci
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0 z-0"></div>
            </button>
        </nav>
    );
}
