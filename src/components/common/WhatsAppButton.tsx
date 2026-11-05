"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { MessageSquare } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const defaultMessage = encodeURIComponent(
    `Hola BRONTO, me comunico desde la plataforma web para solicitar asesoría técnica y cotización de equipos para mi proyecto.`
  );

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${defaultMessage}`;

  return (
    <aside aria-label="Canal directo de WhatsApp comercial">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-bronto-yellow"
        aria-label="Contactar a BRONTO por WhatsApp para asesoría comercial y cotizaciones"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6511]"></span>
          </span>
        </div>
        <span className="hidden sm:inline-block font-mono text-xs font-bold tracking-wider uppercase text-white pr-1">
          WhatsApp BRONTO
        </span>
      </a>
    </aside>
  );
};
