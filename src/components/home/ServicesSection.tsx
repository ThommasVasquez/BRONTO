"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { ArrowUpRight } from "lucide-react";

export const ServicesSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#111111] border-b border-[#242424] py-14 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Servicios y soluciones técnicas"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Servicios y soporte técnico
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl font-normal">
            Soluciones integradas para que contratistas, empresas de ingeniería y cuadrillas cuenten con respaldo técnico permanente.
          </p>
        </div>
        <Link
          href="/servicios"
          className="text-xs font-bold uppercase tracking-wider text-bronto-yellow hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>Ver especificaciones de servicio</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid de Servicios con Estructura Limpia */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch flex-1">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-[#161616] border border-[#242424] hover:border-bronto-yellow p-6 flex flex-col justify-between transition-colors duration-150"
          >
            <div>
              <h3 className="text-white text-lg sm:text-xl font-black uppercase leading-tight">
                {service.name}
              </h3>
              <p className="mt-3 text-xs text-white/70 leading-relaxed font-normal">
                {service.summary}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs text-white/50 uppercase tracking-wider block font-bold">
                  Alcance principal:
                </span>
                <ul className="space-y-1.5 text-xs text-white/80">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-bronto-yellow font-bold leading-none mt-1">&bull;</span>
                      <span className="leading-snug">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/50">
                {service.commercialNote}
              </span>
              <Link
                href={`/servicios#${service.id}`}
                className="text-xs font-bold text-white hover:text-bronto-yellow transition-colors inline-flex items-center gap-1"
                aria-label={`Detalles de ${service.name}`}
              >
                <span>Detalle</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 border-t border-[#242424] gap-2">
        <span>Contratos de alquiler con opción seca o con operador certificado</span>
        <Link href="/cotizar" className="text-bronto-yellow hover:underline">
          Solicitar cotización personalizada &rarr;
        </Link>
      </div>
    </section>
  );
};
