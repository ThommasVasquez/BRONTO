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
    <footer className="w-full bg-[#0E1013] border-t border-white/[0.07] text-[#E5EAF0]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Marca */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" withLink={false} />
            <p className="text-sm text-[#9BA5B4] leading-relaxed max-w-sm">
              Renta de maquinaria pesada, equipos menores, formaletas certificadas, concreto estructural y sistemas de aligeramiento en Bogotá y la Sabana.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181C22] border border-white/[0.07] text-xs text-[#C8D1DC]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{siteConfig.contact.emergencySupport}</span>
            </div>
          </div>

          {/* Catálogo */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Líneas de equipo</h3>
            <ul className="space-y-2.5 text-sm text-[#9BA5B4]">
              {catalogCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/catalogo?categoria=${cat.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/capacitacion"
                  className="text-[#FF5F00] font-medium hover:underline"
                >
                  Escuela de Operadores
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa y Servicios */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">Soluciones</h3>
            <ul className="space-y-2.5 text-sm text-[#9BA5B4]">
              {servicesData.slice(0, 4).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/servicios#${srv.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Patio y contacto</h3>
            <ul className="space-y-3 text-sm text-[#9BA5B4]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5F00] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address}, {siteConfig.contact.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF5F00] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneFormatted}`}
                  className="text-white font-medium hover:text-[#FF5F00] transition-colors tabular-nums"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF5F00] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FF5F00] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{siteConfig.contact.operationHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Franja inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D8796]">
          <p>&copy; {currentYear} BRONTO®. Todos los derechos reservados.</p>

          <a
            href={siteConfig.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95"
            title="Visitar ENERGYSOFTmedia"
          >
            <Image
              src="/brand/energysoft-logo.png"
              alt="ENERGYSOFT Official Logo"
              width={118}
              height={32}
              className="h-5 w-auto object-contain"
            />
            <span className="inline-flex items-center gap-1 text-[#9BA5B4] group-hover:text-white transition-colors">
              {siteConfig.developer.signatureText}
              <ExternalLink className="w-3 h-3 text-[#FF5F00]" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
