import React from "react";
import type { Metadata } from "next";
import { HomeFleetExperience } from "@/components/home/HomeFleetExperience";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BRONTO® | Alquiler de Maquinaria Pesada, Formaletas y Concreto en Bogotá y Sabana",
  description:
    "Alquiler y suministro de maquinaria pesada, equipos de compactación, formaletas certificadas, concreto premezclado y casetones para construcción en Bogotá y la Sabana.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BRONTO® | Maquinaria Pesada, Formaletas y Concreto en Obra",
    description:
      "Despacho directo desde Calle 80 / Siberia hacia Bogotá, Chía, Cota, Funza, Mosquera y Soacha.",
    url: "/",
    siteName: "BRONTO®",
    locale: "es_CO",
    type: "website",
  },
};

export default function HomePage() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeFleetExperience />
    </>
  );
}
