import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Apartments from '../components/Apartments';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Apartments />
                <Philosophy />
                <Protocol />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
