import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShieldCheck, HardHat, Cog, ChevronRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | Potencia, Resistencia y Disponibilidad en Obra",
  description: "Conozca la visión de BRONTO, el símbolo del escarabajo Dynastes y nuestro compromiso con el sector constructor e industrial en Colombia.",
  alternates: {
    canonical: "/nosotros",
  },
};

export default function AboutUsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Quiénes Somos" }]} />

        {/* Hero de Nosotros */}
        <div className="py-12 border-b border-[#242424] max-w-4xl">
          <h1 className="text-3xl sm:text-6xl font-black uppercase text-white tracking-tight">
            Potencia, resistencia y capacidad de respuesta
          </h1>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            BRONTO nace con la convicción de que las obras en Bogotá y la Sabana no pueden depender de proveedores fragmentados ni de maquinaria sin respaldo. Nuestra misión es simple: proveer soluciones técnicas contundentes para que la obra avance sin límites.
          </p>
        </div>

        {/* Bloque Central: El Escarabajo Dynastes (Concepto de Marca) */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-[#181818] border-2 border-bronto-yellow/30 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <DynastesBeetleSymbol className="w-36 h-36" colorFill="#FEE123" />
            <span className="text-xs uppercase tracking-wider text-bronto-yellow font-bold mt-6">
              Símbolo Dynastes
            </span>
            <h3 className="uppercase text-2xl font-black text-white mt-1">
              Fuerza Proporcional
            </h3>
            <p className="mt-3 text-xs text-white/70 leading-relaxed max-w-xs">
              Inspirado en el escarabajo Hércules (Dynastes), capaz de levantar hasta 850 veces su propio peso con coraza inquebrantable. Representa la resistencia y fuerza de nuestra maquinaria.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="uppercase text-3xl sm:text-4xl font-black text-white">
              &ldquo;Pida todo en BRONTO&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Entendemos la presión diaria de los directores de obra, residentes y contratistas. La falta de un equipo menor, el retraso de una formaleta o la falla de un generador pueden paralizar frentes enteros y generar sobrecostos millonarios.
            </p>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              Por eso estructuramos nuestras líneas de servicio en cuatro familias clave: maquinaria pesada y menor, encofrados certificados, concretos estructurales y sistemas de aligeramiento en EPS. Un único contacto, una única remisión técnica y un respaldo coordinado en Bogotá y la Sabana.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1C1C1C] border border-[#2B2B2B]">
                <span className="text-xs text-bronto-yellow font-bold uppercase block mb-1">
                  Disponibilidad Inmediata
                </span>
                <p className="text-xs text-white/70">
                  Parque de maquinaria alistado con protocolos estrictos previo al despacho en cama baja.
                </p>
              </div>
              <div className="p-4 bg-[#1C1C1C] border border-[#2B2B2B]">
                <span className="text-xs text-bronto-yellow font-bold uppercase block mb-1">
                  Respaldo en Obra
                </span>
                <p className="text-xs text-white/70">
                  Cuadrilla de soporte móvil para contingencias sin frenar su cronograma.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares Fundamentales */}
        <div className="py-12 border-t border-[#242424]">
          <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold mb-8">
            Nuestros Pilares de Ingeniería
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <HardHat className="w-6 h-6 text-bronto-yellow" />
              <h4 className="uppercase text-xl font-bold text-white">
                Seguridad y Normativa
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Cumplimiento de estándares de trabajo en alturas (Res. 4272), normas sismorresistentes NSR-10 y equipos con protecciones de fábrica certificadas.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <Cog className="w-6 h-6 text-bronto-yellow" />
              <h4 className="uppercase text-xl font-bold text-white">
                Rendimiento Mecánico
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Flota renovada de marcas líderes mundiales, con mantenimiento preventivo continuo y lubricación de grado industrial.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <ShieldCheck className="w-6 h-6 text-bronto-yellow" />
              <h4 className="uppercase text-xl font-bold text-white">
                Transparencia Comercial
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Actas de entrega detalladas, control de horómetros verificables y asesoría técnica real sin costos ocultos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-12 bg-[#1A1A1A] border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="uppercase text-2xl sm:text-3xl font-black text-white">
              ¿Listo para equipar su próxima obra?
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Explore el catálogo o solicite asesoría comercial inmediata en Bogotá y la Sabana.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider transition-colors"
            >
              Ver catálogo
            </Link>
            <Link
              href="/cotizar"
              className="px-6 py-3 border border-white/30 text-white text-xs uppercase tracking-wider font-bold hover:border-bronto-yellow transition-colors"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

