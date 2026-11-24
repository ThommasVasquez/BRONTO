"use client";

import React, { useState } from "react";
import { faqData, FAQItem } from "@/data/faqData";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { getFAQSchema } from "@/lib/seo";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [openFaqId, setOpenFaqId] = useState<string | null>("que-es-bronto");

  const categories = [
    { id: "todas", label: "Todas las preguntas" },
    { id: "general", label: "Sobre BRONTO" },
    { id: "alquiler", label: "Alquiler de equipos" },
    { id: "suministro", label: "Suministro y materiales" },
    { id: "cotizacion", label: "Cotizaciones" },
    { id: "logistica", label: "Logística y despacho" },
  ];

  const filteredFaqs = selectedCategory === "todas"
    ? faqData
    : faqData.filter((f) => f.category === selectedCategory);

  const faqSchema = getFAQSchema(faqData);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="py-8 sm:py-10 pb-20 bg-storm min-h-screen text-white">
        <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
          <Breadcrumbs items={[{ label: "Preguntas Frecuentes" }]} />

          {/* Cabecera */}
          <div className="py-8 border-b border-storm-border">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              Preguntas Frecuentes
            </h1>
            <p className="mt-2 text-base text-[#C4CCD4]">
              Respuestas sobre requisitos de alquiler, tiempos de despacho en Bogotá y la Sabana, normatividad NSR-10 y condiciones comerciales.
            </p>
          </div>

          {/* Tabs de Categorías */}
          <div className="py-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-bronto-yellow text-[#151515] font-black"
                    : "bg-matte-deep text-[#C4CCD4] hover:text-white border border-storm-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Acordeón de FAQs */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-matte border border-storm-border overflow-hidden transition-colors hover:border-[#3D3D3D]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-bronto-yellow"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-storm-panel text-bronto-yellow border border-storm-border">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="uppercase text-lg sm:text-xl font-bold text-white tracking-wide">
                        {faq.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-bronto-yellow shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#252525] text-sm text-[#C4CCD4] leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA de Asistencia Adicional */}
          <div className="mt-16 p-8 bg-matte border border-storm-border text-center space-y-4">
            <HelpCircle className="w-8 h-8 text-bronto-yellow mx-auto" />
            <h3 className="uppercase text-2xl font-bold text-white">
              ¿Tiene una consulta técnica específica?
            </h3>
            <p className="text-xs sm:text-sm text-[#C4CCD4] max-w-md mx-auto">
              Comuníquese con nuestros ingenieros para resolver especificaciones o asesoría en modulación para su obra en Bogotá y la Sabana.
            </p>
            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                <span>Hablar con un asesor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

