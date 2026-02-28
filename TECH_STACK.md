# Stack Tecnologico & Architettura: Apricot Appartments

Questo documento funge da fonte di verità per l'intero stack, l'architettura dei componenti e le decisioni prestazionali prese durante la costruzione della *Cinematic Landing Page* "Apricot Appartments".

## 1. Core Stack
L'impianto si basa su tecnologie frontend ultra-veloci e robuste, scelte per massimizzare sia la flessibilità del design "Pixel Perfect" che le prestazioni SSR (Server-Side Rendering) a monte.

- **Libreria Interfaccia**: **React (v19)**
- **Framework & SSR Engine**: **Remix (v2)** - Gestisce nativamente il routing server-side, i data loader e l'idratazione client ottimali, eliminando la latenza delle vecchie SPA.
- **Strumento di Build**: **Vite** (Integrato con il plugin Remix per un HMR fulmineo e build di produzione ultra-minimizzate).
- **CMS File-based**: **Markdown/MDX** (`front-matter`) - I dati degli appartamenti sono gestiti tramite semplici file markdown che fungono da pseudo-database, estratti dai loader di Remix.

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
Ogni scelta è stata pesata per garantire frame multipli senza cali ed eliminare overhead lato client:
- **Server-Side Data Fetching**: Utilizzo dei `loader` di Remix per calcolare logiche di Markdown parsing o fetch dati in node (server) e inviare al client un HTML stringificato pulito e già popolato dal contenuto utile per la SEO.
- **No Client-Side React.lazy()**: Abbiamo dismesso le complesse architetture client `<Suspense>` per delegare tutto al chunking nativo generato dai path router di Remix.
- **Deep Memoization**: Interfacce animate perpetuamente (come *Cursor Protocol Scheduler* o *Telemetry Typewriter* in `Features.jsx`) invocano hooks `useState` continuamente. Sono composti mediante `React.memo` per evitare l'invalidazione della DOM (DOM repainting) sul container padre al variare dei context globale o dello scroll.
- **GPU Accelerated Effects**: Il filtro noise organico del background (`noise-overlay` nel CSS) sfrutta nativamente il `feTurbulence` in SVG. Nessuna `.png` ripetuta nel livello visivo, per alleggerire istantaneamente la cache render.
- **Scroll Rules**: Transizioni `scroll-behavior: smooth` forzate al layer root del CSS.

## 5. Pattern d'Interazione "Anti-Slop" (LLM Guardrails)
- **Zero "Generic Borders"**: Nessuna box-shadow standard o angoli da 4px. Container ampi da `rounded-[3rem]`, bordi `dark/10` ed effetti shadow "diffusion" a spread negativo (`shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`).
- **Pulsanti Magnetici**: Effetti "Hover-aware" che alterano asimmetricamente il tracciato di scaling sul button (`hover:-translate-y-[1px] hover:scale-[1.03]`).
- **Aesthetic Empty States**: Cursori "non ammessi" o immagini desaturate col 30% di overlay opacity (`grayscale backdrop-blur`) invece di layout nascosti sulle cards "in preparazione".
