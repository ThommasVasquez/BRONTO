"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const ServicesSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#151515] border-b border-[#242424] py-12 lg:py-16 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Servicios y soluciones técnicas"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SECCIÓN 04 &bull; CAPACIDAD INTEGRAL EN OBRA
          </span>
          <h2 className="font-heading uppercase text-4xl sm:text-6xl lg:text-7xl font-black text-white mt-1 tracking-tight">
            SERVICIOS Y SOLUCIONES
          </h2>
        </div>
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-bronto-yellow hover:underline"
        >
          <span>Ver detalle de servicios</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Rejilla de Servicios Full Width que llena el Viewport */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch flex-1">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="bg-[#1C1C1C] border border-[#2D2D2D] rounded-sm p-6 sm:p-7 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300 relative overflow-hidden"
          >
            {/* Indicador de número */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-black text-[#FF6511] tracking-widest">
                  0{index + 1}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#252525] text-bronto-gray rounded border border-[#333333]">
                  {service.tagline.split(" ")[0]}
                </span>
              </div>

              <h3 className="font-heading uppercase text-xl sm:text-2xl font-bold text-white group-hover:text-bronto-yellow transition-colors leading-tight">
                {service.name}
              </h3>
              <p className="mt-2 text-xs text-bronto-gray font-sans leading-relaxed line-clamp-3">
                {service.summary}
              </p>

              {/* Capacidades destacadas */}
              <ul className="mt-4 space-y-1.5 border-t border-[#2A2A2A] pt-3">
                {service.capabilities.slice(0, 3).map((cap, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white/80 font-sans">
                    <CheckCircle2 className="w-3 h-3 text-bronto-yellow shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-[#2A2A2A] flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/50 truncate pr-2">
                {service.commercialNote}
              </span>
              <Link
                href={`/servicios#${service.id}`}
                className="p-1.5 bg-[#252525] group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white rounded-sm transition-colors shrink-0"
                aria-label={`Conocer más sobre ${service.name}`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex items-center justify-between text-xs font-mono text-white/50 border-t border-[#242424]">
        <span>Soporte técnico y despacho en frentes de Bogotá D.C. y Sabana</span>
        <Link href="/cotizar" className="text-bronto-yellow hover:underline">
          Solicitar cotización de servicios &rarr;
        </Link>
      </div>
    </section>
  );
};
