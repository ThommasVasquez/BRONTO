import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BrontoInActionSection } from "@/components/home/BrontoInActionSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { WhyBrontoSection } from "@/components/home/WhyBrontoSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BRONTO | Alquiler de Maquinaria y Soluciones para Construcción en Bogotá y Sabana",
  description: "Plataforma especializada en alquiler y suministro de maquinaria pesada, equipos menores, formaletas, concretos y sistemas modulados para construcción e industria en Bogotá y zonas aledañas de la Sabana. Pida todo en BRONTO.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BRONTO | La Obra No Se Detiene (Bogotá y Sabana)",
    description: "Equipos, maquinaria y soluciones para construir sin límites. Despacho express en Bogotá y zonas aledañas.",
    url: "/",
    siteName: "BRONTO",
    locale: "es_CO",
    type: "website",
  },
};

export default function HomePage() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      {/* Datos Estructurados JSON-LD para SEO y GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Flujo de 7 Secciones Principales */}
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <CategoriesSection />
        <BrontoInActionSection />
        <ServicesSection />
        <FeaturedProductsSection />
        <WhyBrontoSection />
        <FinalCtaSection />
      </div>
    </>
  );
}
