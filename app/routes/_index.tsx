import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { getAllApartments } from '../utils/mdx.server';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Apartments from '../components/Apartments';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export const loader = async () => {
    const apartments = await getAllApartments();
    return Response.json({ apartments });
};

export default function Home() {
    const { apartments } = useLoaderData<typeof loader>();

    return (
        <>
            <Preloader />
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Apartments apartments={apartments} />
                <Philosophy />
                <Protocol />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
