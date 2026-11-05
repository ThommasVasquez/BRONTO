"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const ServicesSection: React.FC = () => {
  return (
    <section
      className="py-24 bg-[#151515] relative border-b border-[#242424]"
      aria-label="Servicios y soluciones técnicas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
              SECCIÓN 04 &bull; CAPACIDAD INTEGRAL
            </span>
            <h2 className="font-heading uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-2 tracking-tight">
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

        {/* Listado de Servicios */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#1C1C1C] border border-[#2D2D2D] rounded-sm p-8 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300 relative overflow-hidden"
            >
              {/* Indicador de número */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#FF6511] tracking-widest">
                  0{index + 1}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#252525] text-bronto-gray rounded border border-[#333333]">
                  {service.tagline.split(" ")[0]}
                </span>
              </div>

              <div>
                <h3 className="font-heading uppercase text-2xl font-bold text-white group-hover:text-bronto-yellow transition-colors leading-snug">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
                  {service.summary}
                </p>

                {/* Capacidades destacadas */}
                <ul className="mt-6 space-y-2 border-t border-[#2A2A2A] pt-4">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/80 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-bronto-yellow shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/50">
                  {service.commercialNote}
                </span>
                <Link
                  href={`/servicios#${service.id}`}
                  className="p-2 bg-[#252525] group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white rounded-sm transition-colors"
                  aria-label={`Conocer más sobre ${service.name}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
