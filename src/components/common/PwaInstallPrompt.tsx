"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { DynastesBeetleSymbol } from "./BrandLogo";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Verificar si ya está instalada en modo standalone
    const isRunningStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isRunningStandalone) {
      setIsStandalone(true);
      return;
    }

    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // Escuchar evento de instalación PWA en navegadores compatibles
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Solo mostrar tras 4 segundos para no agobiar en la carga inicial
      setTimeout(() => {
        const dismissedStorage = sessionStorage.getItem("bronto_pwa_dismissed");
        if (!dismissedStorage) {
          setIsDismissed(false);
        }
      }, 4000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setIsDismissed(true);
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("bronto_pwa_dismissed", "true");
  };

  if (isStandalone || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Instalación de aplicación PWA BRONTO"
      className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-sm bg-[#1A1A1A] border-2 border-bronto-yellow text-white p-4 shadow-2xl rounded-sm transition-all animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-bronto-yellow bg-[#151515] shrink-0">
          <img
            src="/icons/icon-192.png"
            alt="BRONTO®"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-bronto-yellow tracking-wider">
              App Progresiva (PWA)
            </span>
            <button
              onClick={dismiss}
              className="text-white/60 hover:text-white p-0.5 rounded focus:outline-none"
              aria-label="Cerrar aviso de instalación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h4 className="uppercase text-sm font-black text-white mt-0.5">
            Instalar BRONTO® en su dispositivo
          </h4>

          <p className="text-xs text-white/70 mt-1 leading-snug">
            App oficial para renta de maquinaria en obra y cursos certificados para operadores.
          </p>

          <div className="mt-3 flex items-center gap-2">
            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-none transition-colors"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Instalar App</span>
              </button>
            ) : (
              <a
                href="/app"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-none transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Abrir App</span>
              </a>
            )}

            {isIOS && !deferredPrompt && (
              <div className="text-xs text-bronto-yellow font-semibold flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Toque &quot;Compartir&quot; &rarr; &quot;Agregar a inicio&quot;</span>
              </div>
            )}

            <button
              onClick={dismiss}
              className="text-xs text-white/60 hover:text-white px-2 py-1 transition-colors"
            >
              Ahora no
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

