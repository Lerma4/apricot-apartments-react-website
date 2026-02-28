import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Home = lazy(() => import('./pages/Home'));
const ApartmentDetail = lazy(() => import('./pages/ApartmentDetail'));

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <ScrollToTop />
      <Suspense fallback={<div className="h-screen w-full bg-background flex items-center justify-center font-mono text-xs tracking-widest text-dark/50 uppercase">Caricamento Ambiente...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
