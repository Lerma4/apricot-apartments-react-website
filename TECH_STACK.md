# Stack Tecnologico & Architettura: Apricot Appartments

Questo documento funge da fonte di verità per l'intero stack, l'architettura dei componenti e le decisioni prestazionali prese durante la costruzione della *Cinematic Landing Page* "Apricot Appartments".

## 1. Core Stack
L'impianto si basa su tecnologie frontend ultra-veloci e robuste, scelte per massimizzare sia la flessibilità del design "Pixel Perfect" che le prestazioni (CSR & SSG compatibility).

- **Libreria Interfaccia**: **React (v18+)**
- **Strumento di Build & Server**: **Vite** (Garantisce un Hot Module Replacement quasi istantaneo e un bundle di produzione ultra-minimizzato tramite Rollup).
- **Routing**: **React Router DOM (v6)** - Utilizzato per la navigazione fluida SPA (Single Page Application) e per isolare logicamente la `Home` dalla pagina `ApartmentDetail`.

## 2. Ingegneria del Design & Styling (Preset "Organic Tech")
- **CSS Framework**: **Tailwind CSS (v3)**
  - Il `tailwind.config.js` è stato completamente espanso per includere i token definiti dal preset: 
    - *Colori*: Moss (`#2E4036`), Clay (`#CC5833`), Cream (`#F2F0E9`), Charcoal (`#1A1A1A`).
    - *Tipografia*: `Plus Jakarta Sans`, `Outfit`, `Cormorant Garamond` (per il contrasto drammatico intro/seriale), `IBM Plex Mono` (per i feed di logica).
- **Icons**: **Lucide React** (scelte specificamente per mantenere un peso del tratto SVG controllato globalmente: `strokeWidth={1.5}`).
- **Compositing**: Utilizzo di librerie custom `tailwind-merge` e `clsx` per condizionalizzare in modo performante le stringhe Tailwind (soprattutto in componenti dinamici come la Navbar o le Card).

## 3. Motore Cinematografico & Fisico
Le interazioni asincrone, al netto del Javascript event loop, sono state isolate dal motore di rendering di React.
- **Micro e Macro Animazioni**: **GSAP (GreenSock Animation Platform) v3**
- **Scroll Hijacking (Elegante)**: **GSAP ScrollTrigger Plugin** - Usato per agganciare le animazioni asincrone alla progressione esatta della barra di scroll (es. The Sticky Stacking Archive nel Protocollo o gli effetti Parallax nella sezione Philosophy).

## 4. Prestazioni Ingegnerizzate (Phase 2)
Ogni scelta è stata pesata per garantire frame multipli senza cali:
- **Code Splitting Dinamico**: La gerarchia in `App.jsx` utilizza `React.lazy` e `<Suspense>`. Significa che quando un utente carica la home page, scarica dal server ESCLUSIVAMENTE il javascript della home, senza l'overhead del codice del `ApartmentDetail`.
- **Preload Critical Path (LCP)**: Le Hero section richiedevano immagini HD. Il file `index.html` ospita direttamente tag `<link rel="preload" as="image">` per scaricarle in contemporanea agli stili.
- **Deep Memoization**: Interfacce animate perpetuamente (come *Cursor Protocol Scheduler* o *Telemetry Typewriter* in `Features.jsx`) invocano hooks `useState` continuamente. Sono composti mediante `React.memo` per evitare l'invalidazione della DOM (DOM repainting) sul container padre al variare dei context globale o dello scroll.
- **GPU Accelerated Effects**: Il filtro noise organico del background (`noise-overlay` nel CSS) sfrutta nativamente il `feTurbulence` in SVG. Nessuna `.png` ripetuta nel livello visivo, per alleggerire istantaneamente la cache render.
- **Scroll Rules**: Transizioni `scroll-behavior: smooth` forzate al layer root del CSS.

## 5. Pattern d'Interazione "Anti-Slop" (LLM Guardrails)
- **Zero "Generic Borders"**: Nessuna box-shadow standard o angoli da 4px. Container ampi da `rounded-[3rem]`, bordi `dark/10` ed effetti shadow "diffusion" a spread negativo (`shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`).
- **Pulsanti Magnetici**: Effetti "Hover-aware" che alterano asimmetricamente il tracciato di scaling sul button (`hover:-translate-y-[1px] hover:scale-[1.03]`).
- **Aesthetic Empty States**: Cursori "non ammessi" o immagini desaturate col 30% di overlay opacity (`grayscale backdrop-blur`) invece di layout nascosti sulle cards "in preparazione".
