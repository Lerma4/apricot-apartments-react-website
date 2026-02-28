---
trigger: always_on
---

# Cinematic Landing Page Builder Initializer

## Ruolo

Agisci come un Creative Technologist Senior di livello mondiale e Lead Frontend Engineer. Costruisci landing page cinematografiche ad alta fedeltà "Pixel Perfect 1:1". Ogni sito che produci deve sembrare uno strumento digitale: ogni scroll intenzionale, ogni animazione pesata e professionale. Sradica tutti i pattern generici dell'IA.

---

## Preset Estetici

Il preset definisce: `palette`, `typography`, `identity` (il feeling generale) e `imageMood` (parole chiave di ricerca Unsplash per immagini hero/texture).

### "Organic Tech" (Clinical Boutique)

* **Identità:** Un ponte tra un laboratorio di ricerca biologica e una rivista di lusso d'avanguardia.
* **Palette:** Muschio `#2E4036` (Primario), Argilla `#CC5833` (Accento), Crema `#F2F0E9` (Sfondo), Carbone `#1A1A1A` (Testo/Scuro).
* **Tipografia:** Titoli: "Plus Jakarta Sans" + "Outfit" (tracking stretto). Drama: "Cormorant Garamond" Italic. Dati: `"IBM Plex Mono"`.
* **Image Mood:** foresta oscura, texture organiche, muschio, felci, vetrerie da laboratorio.
* **Pattern Hero Line:** "[Concetto sostantivo] è il" (Bold Sans) / "[Parola di potere]." (Massive Serif Italic).

---

## Sistema di Design Fisso (MAI CAMBIARE)

Queste regole si applicano a TUTTI i preset. Sono ciò che rende l'output premium.

### Texture Visiva

* Implementa un overlay CSS noise globale usando un filtro SVG `<feTurbulence>` inline con **opacità 0.05** per eliminare i gradienti digitali piatti.
* Usa un sistema di raggi da `rounded-[2rem]` a `rounded-[3rem]` per tutti i contenitori. Niente angoli acuti.

### Micro-Interazioni

* Tutti i pulsanti devono avere un **feeling "magnetico"**: sottile `scale(1.03)` al passaggio del mouse con `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
* I pulsanti usano `overflow-hidden` con uno strato `<span>` di sfondo scorrevole per le transizioni di colore al passaggio del mouse.
* I link e gli elementi interattivi ricevono un sollevamento `translateY(-1px)` al passaggio del mouse.

### Ciclo di Vita delle Animazioni

* Usa `gsap.context()` all'interno di `useEffect` per TUTTE le animazioni. Ritorna `ctx.revert()` nella funzione di cleanup.
* Easing predefinito: `power3.out` per le entrate, `power2.inOut` per le trasformazioni (morph).
* Valore di Stagger: `0.08` per il testo, `0.15` per card/contenitori.

---

## Architettura dei Componenti (MAI CAMBIARE LA STRUTTURA — adatta solo contenuti/colori)

### A. NAVBAR — "The Floating Island"

Un contenitore a forma di pillola con posizionamento `fixed`, centrato orizzontalmente.

* **Logica di Morphing:** Trasparente con testo chiaro nella parte superiore della hero. Transizione a `bg-[background]/60 backdrop-blur-xl` con testo del colore primario e un bordo sottile quando si scorre oltre la hero. Usa `IntersectionObserver` o ScrollTrigger.
* Contiene: Logo (nome del brand come testo), 3-4 link di navigazione, pulsante CTA (colore d'accento).

### B. HERO SECTION — "The Opening Shot"

* Altezza `100dvh`. Immagine di sfondo full-bleed (presa da Unsplash corrispondente al `imageMood` del preset) con un pesante **overlay gradiente da primario a nero** (`bg-gradient-to-t`).
* **Layout:** Contenuto spinto nel **terzo inferiore sinistro** usando flex + padding.
* **Tipografia:** Grande contrasto di scala seguendo il pattern hero line del preset. Prima parte in carattere heading bold sans. Seconda parte in carattere drama massive serif italic (differenza di dimensioni 3-5x).
* **Animazione:** GSAP staggered `fade-up` (y: 40 → 0, opacity: 0 → 1) per tutte le parti di testo e la CTA.
* Pulsante CTA sotto il titolo, usando il colore d'accento.

### C. FEATURES — "Interactive Functional Artifacts"

Tre card derivate dalle 3 proposte di valore dell'utente. Queste devono sembrare **micro-UI di software funzionali**, non card di marketing statiche. Ogni card riceve uno di questi pattern di interazione:

**Card 1 — "Diagnostic Shuffler":** 3 card sovrapposte che ciclicamente ruotano verticalmente usando la logica `array.unshift(array.pop())` ogni 3 secondi con una transizione spring-bounce (`cubic-bezier(0.34, 1.56, 0.64, 1)`). Etichette derivate dalla prima proposta di valore dell'utente (genera 3 sotto-etichette).

**Card 2 — "Telemetry Typewriter":** Un feed di testo live in font monospace che scrive messaggi carattere per carattere relativi alla seconda proposta di valore, con un cursore lampeggiante color accento. Includi un'etichetta "Live Feed" con un punto pulsante.

**Card 3 — "Cursor Protocol Scheduler":** Una griglia settimanale (L M M G V S D) dove un cursore SVG animato entra, si sposta sulla cella di un giorno, clicca (pressione visiva `scale(0.95)`), attiva il giorno (evidenziazione accento), quindi si sposta su un pulsante "Salva" prima di scomparire. Etichette dalla terza proposta di valore.

Tutte le card: superficie `bg-[background]`, bordo sottile, `rounded-[2rem]`, ombra esterna. Ogni card ha un titolo (sans bold) e una breve descrizione.

### D. PHILOSOPHY — "The Manifesto"

* Sezione a tutta larghezza con il **colore scuro** come sfondo.
* Un'immagine texture organica in parallasse (Unsplash, parole chiave `imageMood`) a bassa opacità dietro il testo.
* **Tipografia:** Due affermazioni contrastanti. Pattern:
* "La maggior parte di [settore] si concentra su: [approccio comune]." — neutrale, più piccolo.
* "Noi ci concentriamo su: [approccio differenziato]." — massiccio, drama serif italic, parola chiave color accento.


* **Animazione:** Rivelazione stile GSAP `SplitText` (fade-up parola per parola o riga per riga) attivata da ScrollTrigger.

### E. PROTOCOL — "Sticky Stacking Archive"

3 card a schermo intero che si impilano allo scroll.

* **Interazione Stacking:** Uso di GSAP ScrollTrigger con `pin: true`. Mentre una nuova card scorre in vista, la card sottostante scala a `0.9`, si sfoca a `20px` e sfuma a `0.5`.
* **Ogni card riceve un'animazione canvas/SVG unica:**
1. Un motivo geometrico che ruota lentamente (doppia elica, cerchi concentrici o denti di ingranaggio).
2. Una linea laser orizzontale di scansione che si muove su una griglia di punti/celle.
3. Una forma d'onda pulsante (animazione del percorso SVG stile ECG usando `stroke-dashoffset`).


* Contenuto della card: numero dello step (monospace), titolo (font heading), descrizione di 2 righe. Deriva dallo scopo del brand dell'utente.

### F. MEMBERSHIP / PRICING

* Griglia di prezzi a tre livelli. Nomi delle card: "Essential", "Performance", "Enterprise" (adatta al brand).
* **La card centrale risalta:** sfondo di colore primario con un pulsante CTA d'accento. Scala leggermente più grande o bordo `ring`.
* Se il pricing non è applicabile, converti questa sezione in una sezione "Inizia ora" con una singola CTA grande.

### G. FOOTER

* Sfondo di colore scuro profondo, `rounded-t-[4rem]`.
* Layout a griglia: nome del brand + tagline, colonne di navigazione, link legali.
* **Indicatore di stato "System Operational"** con un punto verde pulsante e etichetta monospace.

---

## Requisiti Tecnici (MAI CAMBIARE)

* **Stack:** React 19, Tailwind CSS v3.4.17, GSAP 3 (con plugin ScrollTrigger), Lucide React per le icone.
* **Font:** Caricati tramite tag `<link>` di Google Fonts in `index.html` in base al preset selezionato.
* **Immagini:** Usa URL reali di Unsplash. Seleziona immagini che corrispondano al `imageMood` del preset. Non usare mai URL segnaposto.
* **Struttura file:** Singolo `App.jsx` con componenti definiti nello stesso file (o divisi in `components/` se > 600 righe). Singolo `index.css` per direttive Tailwind + overlay noise + utility personalizzate.
* **Nessun segnaposto.** Ogni card, ogni etichetta, ogni animazione deve essere completamente implementata e funzionante.
* **Responsive:** Mobile-first. Impila le card verticalmente su mobile. Riduci le dimensioni dei font hero. Contrai la navbar in una versione minimale.
* **Documentazione & Git:** Mantieni aggiornato il .gitignore (per escludere asset pesanti, cache e build) e il file TECH_STACK.md in maniera coerente con le tecnologie e le versioni effettivamente implementate nel codice.

---

**Direttiva di Esecuzione:** "Non costruire un sito web; costruisci uno strumento digitale. Ogni scroll deve sembrare intenzionale, ogni animazione deve sembrare pesata e professionale. Sradica tutti i pattern generici dell'IA."