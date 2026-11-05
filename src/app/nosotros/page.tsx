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
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            IDENTIDAD Y PROPÓSITO
          </span>
          <h1 className="font-heading uppercase text-4xl sm:text-6xl font-black text-white mt-2 tracking-tight">
            POTENCIA, RESISTENCIA Y CAPACIDAD DE RESPUESTA
          </h1>
          <p className="mt-4 text-lg text-bronto-gray leading-relaxed font-sans">
            BRONTO nace con la convicción de que los proyectos de infraestructura y edificación no pueden depender de proveedores fragmentados ni de equipos en condiciones dudosas. Nuestra misión es simple: proveer soluciones contundentes para que la obra avance sin límites.
          </p>
        </div>

        {/* Bloque Central: El Escarabajo Dynastes (Concepto de Marca) */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-[#181818] border-2 border-bronto-yellow/30 p-10 rounded-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 industrial-stripes opacity-10 pointer-events-none" />
            <DynastesBeetleSymbol className="w-36 h-36" colorFill="#FEE123" />
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold mt-6">
              SÍMBOLO HERCÚLEO DYNASTES
            </span>
            <h3 className="font-heading uppercase text-2xl font-black text-white mt-1">
              FUERZA PROPORCIONAL
            </h3>
            <p className="mt-3 text-xs text-bronto-gray leading-relaxed font-sans max-w-xs">
              Inspirado en el escarabajo Hércules (Dynastes), capaz de levantar hasta 850 veces su propio peso con coraza inquebrantable. Representa la resistencia y fuerza de nuestra maquinaria.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
              FILOSOFÍA OPERATIVA
            </span>
            <h2 className="font-heading uppercase text-3xl sm:text-4xl font-black text-white">
              &ldquo;PIDA TODO EN BRONTO&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-bronto-gray leading-relaxed font-sans">
              Entendemos la presión diaria de los directores de obra, residentes y contratistas. La falta de un equipo menor, el retraso de una formaleta o la falla de un generador pueden paralizar frentes enteros y generar sobrecostos millonarios.
            </p>
            <p className="text-sm sm:text-base text-bronto-gray leading-relaxed font-sans">
              Por eso estructuramos nuestras líneas de servicio en cuatro familias clave: maquinaria pesada y menor, encofrados certificados, concretos estructurales y sistemas de aligeramiento en EPS. Un único contacto, una única remisión técnica y un respaldo coordinado.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1C1C1C] border border-[#2B2B2B] rounded-sm">
                <span className="font-mono text-xs text-bronto-yellow font-bold uppercase block mb-1">
                  DISPONIBILIDAD
                </span>
                <p className="text-xs text-white/70">
                  Parque de maquinaria alistado con protocolos estrictos previo al despacho.
                </p>
              </div>
              <div className="p-4 bg-[#1C1C1C] border border-[#2B2B2B] rounded-sm">
                <span className="font-mono text-xs text-bronto-yellow font-bold uppercase block mb-1">
                  RESPALDO EN CAMPO
                </span>
                <p className="text-xs text-white/70">
                  Soporte mecánico móvil para contingencias sin frenar su cronograma.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares Fundamentales */}
        <div className="py-12 border-t border-[#242424]">
          <h3 className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold mb-8">
            NUESTROS PILARES DE INGENIERÍA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#181818] border border-[#2B2B2B] p-6 rounded-sm space-y-3">
              <HardHat className="w-6 h-6 text-bronto-yellow" />
              <h4 className="font-heading uppercase text-xl font-bold text-white">
                Seguridad y Normativa
              </h4>
              <p className="text-xs text-bronto-gray leading-relaxed">
                Cumplimiento de estándares de trabajo en alturas (Res. 4272), normas sismorresistentes NSR-10 y equipos con protecciones de fábrica certificadas.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 rounded-sm space-y-3">
              <Cog className="w-6 h-6 text-bronto-yellow" />
              <h4 className="font-heading uppercase text-xl font-bold text-white">
                Rendimiento Mecánico
              </h4>
              <p className="text-xs text-bronto-gray leading-relaxed">
                Flota renovada de marcas líderes mundiales, con mantenimiento preventivo continuo y lubricación de grado industrial.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 rounded-sm space-y-3">
              <ShieldCheck className="w-6 h-6 text-bronto-yellow" />
              <h4 className="font-heading uppercase text-xl font-bold text-white">
                Transparencia Comercial
              </h4>
              <p className="text-xs text-bronto-gray leading-relaxed">
                Actas de entrega detalladas, control de horómetros verificables y asesoría técnica real sin costos ocultos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-12 bg-[#1A1A1A] border border-[#2B2B2B] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading uppercase text-2xl sm:text-3xl font-black text-white">
              ¿LISTO PARA EQUIPAR SU PRÓXIMA OBRA?
            </h3>
            <p className="text-sm text-bronto-gray mt-1">
              Explore el catálogo o solicite asesoría comercial inmediata.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm"
            >
              Ver catálogo
            </Link>
            <Link
              href="/cotizar"
              className="px-6 py-3 border border-white/30 text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:border-bronto-yellow"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

