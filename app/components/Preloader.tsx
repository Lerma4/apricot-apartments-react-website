import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
    onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("INITIALIZING");
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.2,
                        ease: 'power3.inOut',
                        delay: 0.3,
                        onComplete: () => {
                            document.body.style.overflow = '';
                            setIsComplete(true);
                            if (onComplete) onComplete();
                        }
                    });
                }
            });

            // Loading steps reflecting the "Clinical Boutique" / "Organic Tech" feel
            const texts = [
                "ESTABLISHING CONNECTION",
                "LOADING ASSETS",
                "CALIBRATING INTERFACE",
                "PROTOCOL OPERATIONAL"
            ];
            
            let currentProgress = { value: 0 };
            tl.to(currentProgress, {
                value: 100,
                duration: 2.2,
                ease: 'power2.inOut',
                onUpdate: () => {
                    const val = currentProgress.value;
                    setProgress(Math.round(val));
                    
                    if (val < 25) setLoadingText(texts[0]);
                    else if (val < 65) setLoadingText(texts[1]);
                    else if (val < 95) setLoadingText(texts[2]);
                    else setLoadingText(texts[3]);

                    if (barRef.current) {
                        gsap.set(barRef.current, { scaleX: val / 100 });
                    }
                }
            });

            // Initial appearance fade-in
            gsap.from([textRef.current, statusRef.current, barRef.current], {
                y: 10,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    if (isComplete) return null;

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2E4036] text-[#F2F0E9] will-change-transform font-sans"
        >
            <div className="w-full max-w-lg px-8 flex flex-col gap-10 relative">
                {/* Main Name / Branding */}
                <div ref={textRef} className="flex flex-col gap-2">
                    <span className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-[#F2F0E9]/60">
                        Apricot Apartments
                    </span>
                    <span className="font-serif italic text-4xl lg:text-5xl text-[#CC5833] drop-shadow-sm">
                        Experience
                    </span>
                </div>

                {/* Progress bar container */}
                <div className="flex flex-col gap-3">
                    <div 
                        ref={statusRef}
                        className="flex justify-between items-end font-mono text-[10px] sm:text-xs tracking-[0.1em] uppercase opacity-80"
                    >
                        <span>{loadingText}</span>
                        <span>{Math.max(0, Math.min(100, progress))}%</span>
                    </div>
                
                    <div className="h-[1px] w-full bg-[#1A1A1A] overflow-hidden relative">
                        {/* Progress bar fill */}
                        <div 
                            ref={barRef}
                            className="absolute inset-y-0 left-0 w-full bg-[#CC5833] origin-left"
                            style={{ transform: 'scaleX(0)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
