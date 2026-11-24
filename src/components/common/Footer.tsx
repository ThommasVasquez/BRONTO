import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "./BrandLogo";
import { siteConfig } from "@/data/siteConfig";
import { catalogCategories } from "@/data/catalogData";
import { servicesData } from "@/data/servicesData";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#101114] border-t-2 border-[#2D313A] text-white pt-14 pb-12 font-sans">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        {/* Tira superior: Frase de Marca & Estado Operativo */}
        <div className="pb-10 border-b border-[#2D313A] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-mono">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-[#94A3B8] mt-1 font-mono uppercase">
              Operación y despacho de maquinaria pesada, formaletas y concretos en Bogotá y Sabana.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#FF5F00] hover:bg-[#E65500] text-black font-black text-xs uppercase tracking-wider font-mono transition-colors"
            >
              <span>Cotizar Obra</span>
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#2D313A] hover:border-[#FF5F00] bg-[#1A1C21] text-white text-xs uppercase tracking-wider font-mono transition-colors"
            >
              <span>Ver Catálogo Técnico</span>
            </Link>
          </div>
        </div>

        {/* Columnas Principales */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Columna 1: Identidad y Misión */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" withLink={false} />
            <p className="text-xs text-[#94A3B8] leading-relaxed pr-4">
              {siteConfig.description}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#FF5F00] font-bold uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-[#FF5F00]" />
              <span>{siteConfig.slogan}</span>
            </div>
            <div className="text-xs text-white/50 pt-1 font-mono">
              <p>{siteConfig.contact.emergencySupport}</p>
            </div>
          </div>

          {/* Columna 2: Categorías de Catálogo */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#FF5F00] font-bold mb-4 font-mono">
              Líneas de Maquinaria
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80 font-mono">
              {catalogCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogo?categoria=${cat.id}`}
                    className="hover:text-[#FF5F00] transition-colors block py-0.5"
                  >
                    {cat.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/catalogo"
                  className="text-[#FF5F00] hover:underline text-xs uppercase font-bold tracking-wider block pt-2"
                >
                  &rarr; Ver todas las referencias
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#FF5F00] font-bold mb-4 font-mono">
              Servicios Técnicos
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80 font-mono">
              {servicesData.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/servicios#${srv.id}`}
                    className="hover:text-[#FF5F00] transition-colors block py-0.5"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="hover:text-[#FF5F00] transition-colors block py-0.5 text-white/60"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto y Ubicación */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#FF5F00] font-bold mb-4 font-mono">
              Patios de Operación
            </h3>
            <ul className="space-y-3 text-xs text-white/80 font-mono">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5F00] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}, {siteConfig.contact.city}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF5F00] shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneFormatted}`} className="hover:text-[#FF5F00] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF5F00] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#FF5F00] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FF5F00] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight text-[#94A3B8]">
                  {siteConfig.contact.operationHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Franja Inferior: Copyright, Términos y Firma */}
        <div className="pt-8 border-t border-[#2D313A] flex flex-col items-center justify-center gap-5 text-xs text-[#94A3B8] text-center font-mono">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
            <p>
              &copy; {currentYear} {siteConfig.brandName}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/nosotros" className="hover:text-white transition-colors">
                Nosotros
              </Link>
              <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
                Preguntas Frecuentes
              </Link>
              <Link href="/contacto" className="hover:text-white transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center pt-2">
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col sm:flex-row items-center justify-center gap-3 text-center transition-opacity hover:opacity-95"
              title="Visitar sitio web oficial de ENERGYSOFTmedia"
            >
              <div className="relative flex items-center justify-center shrink-0">
                <Image
                  src="/brand/energysoft-logo.png"
                  alt="ENERGYSOFT Official Logo"
                  width={130}
                  height={36}
                  className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-white/80 group-hover:text-[#FF5F00] transition-colors">
                <span>{siteConfig.developer.signatureText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF5F00] shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

