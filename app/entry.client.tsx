import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { getInitialNamespaces } from "remix-i18next/client";
import i18n from "./i18n";
import "./tailwind.css";

async function hydrate() {
  console.log("[entry.client.tsx] Hydration starting...");
  try {
    await i18next
      .use(initReactI18next)
      .use(LanguageDetector)
      .use(Backend)
      .init({
        ...i18n,
        ns: ["common"],
        backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
        detection: {
          order: ["htmlTag"],
          caches: [],
        },
      });

    console.log("[entry.client.tsx] i18next initialized successfully, calling hydrateRoot.");
    startTransition(() => {
      hydrateRoot(
        document,
        <I18nextProvider i18n={i18next}>
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </I18nextProvider>
      );
    });
  } catch (error) {
    console.error("[entry.client.tsx] Error during hydration initialization:", error);
  }
}

// Directly invoke hydrate to prevent silent hangs
setTimeout(hydrate, 0);
