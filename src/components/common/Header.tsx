"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Menu, X, FileText, PhoneCall, ChevronRight } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#151515]/95 backdrop-blur-md border-b border-[#242424] py-3.5 shadow-2xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Principal BRONTO */}
          <BrandLogo size="md" />

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-200 relative group rounded ${
                    active
                      ? "text-bronto-yellow"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-bronto-yellow" />
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
              className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#333333] bg-[#1E1E1E] hover:border-bronto-yellow text-xs font-mono font-medium text-white transition-colors"
              title="Ver equipos agregados para cotizar"
            >
              <FileText className="w-3.5 h-3.5 text-bronto-yellow" />
              <span className="hidden md:inline">Lista</span>
              {totalCount > 0 ? (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-bronto-yellow text-[#151515] rounded-full">
                  {totalCount}
                </span>
              ) : (
                <span className="text-[10px] text-white/50">0</span>
              )}
            </Link>

            {/* CTA Principal */}
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-4 py-2 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 rounded-sm"
            >
              <span>Solicitar cotización</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cotizar"
              className="relative inline-flex items-center p-2 rounded border border-[#333333] bg-[#1E1E1E] text-bronto-yellow"
              aria-label="Ver equipos a cotizar"
            >
              <FileText className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-bronto-yellow text-[9px] font-bold text-[#151515]">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/90 hover:text-bronto-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-bronto-yellow rounded"
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
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#151515] border-b border-[#242424] px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-mono uppercase tracking-wider font-semibold py-2 transition-colors border-b border-[#242424]/60 ${
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
                className="w-full flex items-center justify-center gap-2 py-3 bg-bronto-yellow text-[#151515] font-black text-sm uppercase tracking-wider rounded-sm shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Solicitar cotización ({totalCount})</span>
              </Link>

              <Link
                href="/contacto"
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#333333] text-white/90 font-mono text-xs uppercase tracking-wider rounded-sm hover:border-bronto-yellow transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-bronto-yellow" />
                <span>Líneas comerciales</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
