import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { getServiceSchema } from "@/lib/seo";
import { CheckCircle2, ChevronRight, Truck, Wrench, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios Especializados para Construcción e Industria",
  description: "Alquiler de maquinaria pesada, suministro de concretos, transporte en cama baja, mantenimiento en campo y modulación técnica en Colombia.",
  alternates: {
    canonical: "/servicios",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Servicios y Soluciones" }]} />

        {/* Cabecera */}
        <div className="py-8 border-b border-[#242424] max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SOLUCIONES OPERATIVAS Y LOGÍSTICAS
          </span>
          <h1 className="font-heading uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-1 tracking-tight">
            SERVICIOS INTEGRALES
          </h1>
          <p className="mt-3 text-base text-bronto-gray font-sans">
            Más que un parque de equipos, somos su respaldo en obra. Desde el transporte especializado y la asesoría técnica hasta el mantenimiento preventivo en campo.
          </p>
        </div>

        {/* Listado Detallado de Servicios */}
        <div className="py-12 space-y-16">
          {servicesData.map((service, index) => {
            const serviceSchema = getServiceSchema(service);

            return (
              <article
                key={service.id}
                id={service.id}
                className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-8 sm:p-12 scroll-mt-28 relative overflow-hidden"
              >
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Columna Izquierda: Información del Servicio */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#242424] text-bronto-yellow font-mono text-xs font-bold uppercase rounded-sm border border-[#333333]">
                        Servicio 0{index + 1}
                      </span>
                      <span className="font-mono text-xs text-white/50 uppercase">
                        {service.commercialNote}
                      </span>
                    </div>

                    <h2 className="font-heading uppercase text-3xl sm:text-4xl font-black text-white leading-tight">
                      {service.name}
                    </h2>

                    <p className="font-mono text-xs text-bronto-yellow uppercase tracking-wide">
                      {service.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-bronto-gray font-sans leading-relaxed">
                      {service.description}
                    </p>

                    {/* Capacidades */}
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3">
                        Capacidades y Alcance Operativo:
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white/80 font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-bronto-yellow shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-4">
                      <Link
                        href={`/cotizar?servicio=${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm transition-colors"
                      >
                        <span>Cotizar este servicio</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                      </Link>

                      <Link
                        href="/catalogo"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#333333] hover:border-bronto-yellow text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
                      >
                        <span>Ver equipos aplicables</span>
                      </Link>
                    </div>
                  </div>

                  {/* Columna Derecha: Flujo de Trabajo / Etapas */}
                  <div className="lg:col-span-5 bg-[#141414] border border-[#262626] p-6 sm:p-8 rounded-sm space-y-6">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
                      Protocolo de Ejecución
                    </h3>

                    <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#333333]">
                      {service.workflow.map((w, idx) => (
                        <div key={idx} className="relative pl-8">
                          <span className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-[#1F1F1F] border border-bronto-yellow text-bronto-yellow font-mono text-[10px] font-bold flex items-center justify-center">
                            {w.step}
                          </span>
                          <h4 className="font-mono text-xs uppercase font-bold text-white">
                            {w.title}
                          </h4>
                          <p className="mt-1 text-xs text-bronto-gray font-sans leading-relaxed">
                            {w.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

