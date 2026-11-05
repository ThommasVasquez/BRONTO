import React from "react";
import Link from "next/link";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { WifiOff, RefreshCw, PhoneCall } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function OfflinePage() {
  return (
    <div className="pt-32 pb-24 bg-[#151515] min-h-screen text-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-bronto-carbon border-2 border-bronto-yellow/40 rounded-full flex items-center justify-center mx-auto text-bronto-yellow">
          <WifiOff className="w-10 h-10" />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            MODO SIN CONEXIÓN &bull; PWA BRONTO
          </span>
          <h1 className="font-heading uppercase text-3xl sm:text-4xl font-black text-white mt-2">
            SIN CONEXIÓN A INTERNET
          </h1>
          <p className="mt-3 text-sm text-bronto-gray font-sans">
            Está consultando la aplicación fuera de línea. Los recursos almacenados en caché previamente siguen disponibles en su dispositivo.
          </p>
        </div>

        <div className="p-4 bg-[#1C1C1C] border border-[#2E2E2E] rounded-sm text-xs font-mono text-white/70 space-y-2 text-left">
          <div className="text-bronto-yellow font-bold uppercase">
            Canales Telefónicos de Emergencia en Obra:
          </div>
          <div>Línea: {siteConfig.contact.phone}</div>
          <div>WhatsApp: {siteConfig.contact.whatsappFormatted}</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar conexión</span>
          </Link>

          <Link
            href="/catalogo"
            className="w-full sm:w-auto px-6 py-3 border border-[#333333] hover:border-white text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            <span>Ver catálogo en caché</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
