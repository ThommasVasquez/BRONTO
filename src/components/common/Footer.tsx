import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "./BrandLogo";
import { siteConfig } from "@/data/siteConfig";
import { catalogCategories } from "@/data/catalogData";
import { servicesData } from "@/data/servicesData";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-matte-deep border-t-2 border-storm-border text-[#E5EAF0]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        {/* Columnas Operativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-matte-border">
          {/* Identidad */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" withLink={false} />
            <p className="text-sm text-[#B8C1CC] leading-relaxed max-w-sm">
              Alquiler de maquinaria pesada, equipos de compactación, formaletas certificadas, concreto estructural y sistemas de aligeramiento para obras civiles e industriales en Bogotá y la Sabana.
            </p>
            <div className="p-3.5 bg-matte border border-matte-border text-xs text-[#C4CCD4] space-y-1">
              <strong className="text-white block">Soporte mecánico en campo</strong>
              <span>{siteConfig.contact.emergencySupport}</span>
            </div>
          </div>

          {/* Divisiones */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xl font-bold text-white tracking-tight mb-4">
              Divisiones de catálogo
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B8C1CC]">
              {catalogCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogo?categoria=${cat.id}`}
                    className="hover:text-[#FF5F00] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/capacitacion"
                  className="text-white font-semibold hover:text-[#FF5F00] transition-colors"
                >
                  Escuela de Operadores BRONTO®
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-white tracking-tight mb-4">
              Operación
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B8C1CC]">
              {servicesData.slice(0, 4).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/servicios#${srv.id}`}
                    className="hover:text-[#FF5F00] transition-colors"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Quiénes somos
                </Link>
              </li>
            </ul>
          </div>

          {/* Patio y Despacho */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xl font-bold text-white tracking-tight mb-4">
              Patio y despacho
            </h3>
            <ul className="space-y-3 text-sm text-[#B8C1CC]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5F00] shrink-0 mt-1" />
                <span>
                  {siteConfig.contact.address}, {siteConfig.contact.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF5F00] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneFormatted}`}
                  className="font-mono text-white hover:text-[#FF5F00] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF5F00] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#FF5F00] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FF5F00] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">{siteConfig.contact.operationHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pie legal y firma de desarrollador */}
        <div className="pt-8 flex flex-col items-center justify-center gap-5 text-xs text-[#8E99A6] text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <p>&copy; {currentYear} BRONTO®. Todos los derechos reservados.</p>
            <Link href="/catalogo" className="hover:text-white transition-colors">
              Catálogo
            </Link>
            <Link href="/cotizar" className="hover:text-white transition-colors">
              Cotizador en línea
            </Link>
            <Link href="/contacto" className="hover:text-white transition-colors">
              Contacto comercial
            </Link>
          </div>

          <a
            href={siteConfig.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col sm:flex-row items-center justify-center gap-3 transition-opacity hover:opacity-95"
            title="Visitar ENERGYSOFTmedia"
          >
            <Image
              src="/brand/energysoft-logo.png"
              alt="ENERGYSOFT Official Logo"
              width={130}
              height={36}
              className="h-6 w-auto object-contain"
            />
            <span className="inline-flex items-center gap-1.5 text-xs text-[#C4CCD4] group-hover:text-[#FF5F00] transition-colors">
              {siteConfig.developer.signatureText}
              <ExternalLink className="w-3.5 h-3.5 text-[#FF5F00]" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
