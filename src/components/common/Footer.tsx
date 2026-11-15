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
    <footer className="w-full bg-[#101010] border-t border-[#242424] text-white pt-16 pb-12">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        {/* Tira superior: Frase de Marca */}
        <div className="pb-12 border-b border-[#242424] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-white/60 mt-1 font-normal">
              Alquiler de maquinaria y suministro para construcción en Bogotá y la Sabana.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-colors"
            >
              <span>Cotizar ahora</span>
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#333333] hover:border-bronto-yellow text-white text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <span>Ver catálogo</span>
            </Link>
          </div>
        </div>

        {/* Columnas Principales */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Columna 1: Identidad y Misión */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" withLink={false} />
            <p className="text-sm text-white/70 leading-relaxed pr-4">
              {siteConfig.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-bronto-yellow font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-bronto-yellow" />
              <span>{siteConfig.slogan}</span>
            </div>
            <div className="text-xs text-white/50 pt-1">
              <p>{siteConfig.contact.emergencySupport}</p>
            </div>
          </div>

          {/* Columna 2: Categorías de Catálogo */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold mb-4">
              Catálogo Comercial
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              {catalogCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogo?categoria=${cat.id}`}
                    className="hover:text-bronto-yellow transition-colors block py-0.5"
                  >
                    {cat.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/catalogo"
                  className="text-bronto-yellow hover:underline text-xs uppercase font-bold tracking-wider block pt-2"
                >
                  &rarr; Ver todas las referencias
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold mb-4">
              Servicios y Soluciones
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              {servicesData.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/servicios#${srv.id}`}
                    className="hover:text-bronto-yellow transition-colors block py-0.5"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/preguntas-frecuentes"
                  className="hover:text-bronto-yellow transition-colors block py-0.5 text-white/60"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto y Ubicación */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold mb-4">
              Atención Comercial
            </h3>
            <ul className="space-y-3 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}, {siteConfig.contact.city}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronto-yellow shrink-0" />
                <a href={`tel:${siteConfig.contact.phoneFormatted}`} className="hover:text-bronto-yellow transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-bronto-yellow shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-bronto-yellow transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight text-white/60">
                  {siteConfig.contact.operationHours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Franja Inferior: Copyright, Términos y Firma Obligatoria de Desarrollador Centrada */}
        <div className="pt-10 border-t border-[#242424] flex flex-col items-center justify-center gap-6 text-xs text-white/60 text-center">
          {/* Navegación Secundaria y Copyright */}
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

          {/* FIRMA DE DESARROLLADOR OFICIAL CENTRADA CON LOGO OFICIAL (Visible en desktop y móvil, sin contenedor) */}
          <div className="w-full flex flex-col items-center justify-center pt-3">
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

              <div className="flex items-center gap-2 text-xs font-medium text-white/80 group-hover:text-bronto-yellow transition-colors">
                <span>{siteConfig.developer.signatureText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF6511] shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

