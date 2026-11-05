"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Menu, X, FileText, ChevronRight } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount } = useQuoteBasket();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al navegar
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Servicios", href: "/servicios" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#111111]/95 backdrop-blur-md border-b border-[#242424] py-3.5 shadow-xl"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        <div className="flex items-center justify-between">
          {/* Logo Principal BRONTO */}
          <BrandLogo size="md" />

          {/* Navegación Desktop: Tipografía limpia y profesional */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-150 relative py-1 ${
                    active
                      ? "text-bronto-yellow"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-bronto-yellow" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Acciones Comerciales: Cotizador y CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Indicador de lista de cotización */}
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#333333] hover:border-bronto-yellow bg-[#1A1A1A] text-xs font-semibold text-white transition-colors"
              title="Ver equipos en lista de cotización"
            >
              <FileText className="w-3.5 h-3.5 text-bronto-yellow" />
              <span>Lista</span>
              {totalCount > 0 ? (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-bold bg-bronto-yellow text-black">
                  {totalCount}
                </span>
              ) : (
                <span className="text-white/50 text-xs">0</span>
              )}
            </Link>

            {/* CTA Principal */}
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98]"
            >
              <span>Solicitar cotización</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cotizar"
              className="relative inline-flex items-center p-2 border border-[#333333] bg-[#1A1A1A] text-bronto-yellow"
              aria-label="Ver equipos a cotizar"
            >
              <FileText className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-bronto-yellow text-[9px] font-bold text-black">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-bronto-yellow focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#111111] border-b border-[#242424] px-6 py-8 shadow-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-bold py-2 border-b border-[#242424] ${
                  isActive(link.href)
                    ? "text-bronto-yellow"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/cotizar"
                className="w-full flex items-center justify-center gap-2 py-3 bg-bronto-yellow text-black font-black text-xs uppercase tracking-wider"
              >
                <FileText className="w-4 h-4" />
                <span>Solicitar cotización ({totalCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
