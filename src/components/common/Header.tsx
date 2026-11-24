"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { useClientAuth } from "@/components/auth/ClientAuthProvider";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { siteConfig } from "@/data/siteConfig";
import {
  Menu,
  X,
  FileText,
  Phone,
  MapPin,
  User,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount } = useQuoteBasket();
  const { user, isLoggedIn } = useClientAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Servicios", href: "/servicios" },
    { label: "Capacitación", href: "/capacitacion" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (
    pathname === "/app" ||
    pathname?.startsWith("/app/") ||
    (typeof window !== "undefined" &&
      (window.location.pathname === "/app" || window.location.pathname.startsWith("/app")))
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-matte border-b-2 border-[#FF5F00] shadow-xl">
      {/* Franja Operativa Superior */}
      <div
        className="hidden md:block bg-matte-deep border-b border-matte-border text-[#B8C1CC] text-xs"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-[#E5EAF0] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#FF5F00]" />
              Patio Central Calle 80 / Siberia · Cobertura Bogotá y Sabana
            </span>
            <a
              href={`tel:${siteConfig.contact.phoneFormatted}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-mono tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5F00]" />
              {siteConfig.contact.phone}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/preguntas-frecuentes" className="hover:text-white transition-colors">
              Requisitos de alquiler
            </Link>
            <Link
              href={mounted && isLoggedIn ? "/portal-clientes" : "/login"}
              className="inline-flex items-center gap-1.5 text-[#E5EAF0] hover:text-[#FF5F00] font-medium transition-colors"
            >
              {mounted && isLoggedIn ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5F00]" />
                  <span>{user?.companyName}</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-[#FF5F00]" />
                  <span>Portal contratistas</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Barra Principal en Negro Mate con Logo BRONTO® en Blanco */}
      <div
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <BrandLogo size="md" />

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-semibold transition-colors relative ${
                  active
                    ? "text-white bg-storm-panel"
                    : "text-[#C4CCD4] hover:text-white hover:bg-storm/50"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5F00]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Acciones Derecha Desktop */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-white text-xs font-semibold transition-colors"
            title="Abrir aplicación móvil de obra y cursos"
          >
            <Smartphone className="w-4 h-4 text-[#FF5F00]" />
            <span>App de obra</span>
          </Link>

          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-matte-deep hover:bg-storm-panel border border-storm-border text-white text-xs font-semibold transition-colors"
            title="Ver equipos en orden de cotización"
          >
            <FileText className="w-4 h-4 text-[#FF5F00]" />
            <span>Orden</span>
            <span
              className={`px-1.5 py-0.5 text-xs font-mono font-semibold tabular-nums ${
                mounted && totalCount > 0
                  ? "bg-[#FF5F00] text-[#111316]"
                  : "bg-storm text-[#B8C1CC]"
              }`}
            >
              {mounted ? totalCount : 0}
            </span>
          </Link>

          <Link
            href="/cotizar"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] font-bold text-sm tracking-tight transition-colors"
          >
            Cotizar equipo
          </Link>
        </div>

        {/* Controles Móviles */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/app"
            className="inline-flex items-center gap-1 px-2.5 py-2 bg-storm-panel border border-storm-border text-white text-xs font-semibold"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FF5F00]" />
            <span>App</span>
          </Link>

          <Link
            href="/cotizar"
            className="relative inline-flex items-center justify-center p-2 bg-storm-panel border border-storm-border text-white"
            aria-label="Ver orden de cotización"
          >
            <FileText className="w-4 h-4 text-[#FF5F00]" />
            {mounted && totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#FF5F00] text-[#111316] text-[10px] font-mono font-bold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-matte-deep border border-storm-border text-white hover:border-[#FF5F00]"
            aria-expanded={mobileMenuOpen}
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-matte-deep border-t border-storm-border px-5 py-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-1 divide-y divide-matte-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 text-base font-semibold flex items-center justify-between ${
                  isActive(link.href) ? "text-[#FF5F00]" : "text-white"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href={mounted && isLoggedIn ? "/portal-clientes" : "/login"}
              className="py-3 text-sm font-semibold text-[#C4CCD4] flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#FF5F00]" />
              <span>
                {mounted && isLoggedIn ? `Portal: ${user?.companyName}` : "Portal de contratistas"}
              </span>
            </Link>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2.5">
            <Link
              href="/app"
              className="py-3 px-3 bg-storm-panel border border-storm-border text-white text-center text-sm font-semibold"
            >
              Instalar App PWA
            </Link>
            <Link
              href="/cotizar"
              className="py-3 px-3 bg-[#FF5F00] text-[#111316] text-center text-sm font-bold"
            >
              Cotizar ({mounted ? totalCount : 0})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
