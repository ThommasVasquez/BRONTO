"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useClientAuth } from "@/components/auth/ClientAuthProvider";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Menu, X, FileText, ChevronRight, User, ShieldCheck, Smartphone, Download } from "lucide-react";

export const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount } = useQuoteBasket();
  const { user, isLoggedIn } = useClientAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { label: "Capacitación", href: "/capacitacion" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Si estamos en la aplicación PWA (/app), el Header corporativo no se renderiza
  if (
    pathname === "/app" ||
    pathname?.startsWith("/app/") ||
    (typeof window !== "undefined" && (window.location.pathname === "/app" || window.location.pathname.startsWith("/app")))
  ) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#141519]/98 backdrop-blur-md border-b-2 border-[#2D313A] py-3 shadow-2xl"
          : "bg-[#1A1C21]/95 border-b border-[#2D313A] py-3.5"
      }`}
      style={{
        paddingTop: isScrolled
          ? "max(12px, env(safe-area-inset-top, 12px))"
          : "max(16px, env(safe-area-inset-top, 16px))",
      }}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-20">
        <div className="flex items-center justify-between">
          {/* Logo Principal BRONTO */}
          <div className="flex items-center gap-4">
            <BrandLogo size="md" />
            <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8] border-l border-[#2D313A] pl-4">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse"></span>
              <span className="uppercase">Patios Operativos: Calle 80 & Funza</span>
            </div>
          </div>

          {/* Navegación Desktop: Tipografía limpia y profesional */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase font-mono tracking-wider transition-colors duration-150 relative py-1 ${
                    active
                      ? "text-[#FF5F00] font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5F00]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Acciones Comerciales: Theme, Portal Clientes, Cotizador y CTA */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Selector de Modo Claro / Modo Oscuro */}
            <ThemeToggle />

            {/* Acceso a App PWA: Renta & Cursos */}
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1A1C21] hover:bg-[#22252C] border border-[#FF5F00] text-[#FF5F00] hover:text-white text-xs font-mono uppercase tracking-wider rounded-none transition-colors"
              title="Abrir Terminal de Renta y Despacho en Campo"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#FF5F00]" />
              <span>Terminal App</span>
            </Link>

            {/* Acceso a Portal de Clientes */}
            {mounted && isLoggedIn ? (
              <Link
                href="/portal-clientes"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#2D313A] hover:border-[#FF5F00] bg-[#141519] text-xs font-mono text-white transition-colors"
                title={`Conectado como ${user?.companyName}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5F00]" />
                <span className="max-w-[110px] truncate">{user?.companyName.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#2D313A] hover:border-[#FF5F00] bg-[#141519] text-xs font-mono text-white transition-colors"
                title="Acceso exclusivo para clientes y contratistas"
              >
                <User className="w-3.5 h-3.5 text-[#FF5F00]" />
                <span>Clientes</span>
              </Link>
            )}

            {/* Indicador de lista de cotización */}
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-3 py-2 border border-[#2D313A] hover:border-[#FF5F00] bg-[#141519] text-xs font-mono text-white transition-colors"
              title="Ver equipos en lista de cotización"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF5F00]" />
              <span>Lista</span>
              {mounted && totalCount > 0 ? (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold bg-[#FF5F00] text-black font-mono">
                  {totalCount}
                </span>
              ) : (
                <span className="text-[#94A3B8] text-xs font-mono">0</span>
              )}
            </Link>

            {/* CTA Principal */}
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF5F00] hover:bg-[#E65500] text-black font-black text-xs uppercase tracking-wider font-mono transition-all duration-150 active:scale-[0.98]"
            >
              <span>Cotizar Obra</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/app"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FF5F00] text-black text-[11px] font-mono font-black uppercase tracking-wider"
              title="Terminal App"
            >
              <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>App</span>
            </Link>

            <ThemeToggle />

            <Link
              href="/cotizar"
              className="relative inline-flex items-center p-2 border border-[#2D313A] bg-[#141519] text-[#FF5F00]"
              aria-label="Ver equipos a cotizar"
            >
              <FileText className="w-4 h-4" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-[#FF5F00] text-[9px] font-bold text-black font-mono">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#FF5F00] border border-[#2D313A] bg-[#141519] focus:outline-none"
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
        <div className="lg:hidden absolute inset-x-0 top-full bg-[#101114] border-b-2 border-[#2D313A] px-6 py-6 shadow-2xl font-mono">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase font-bold py-2 border-b border-[#22252C] ${
                  isActive(link.href)
                    ? "text-[#FF5F00]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={mounted && isLoggedIn ? "/portal-clientes" : "/login"}
              className="flex items-center gap-2 text-sm font-bold py-2 border-b border-[#22252C] text-[#FF5F00] uppercase"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{mounted && isLoggedIn ? `Portal: ${user?.companyName}` : "Portal de Clientes / Login"}</span>
            </Link>

            <div className="pt-3 flex flex-col gap-2.5">
              <Link
                href="/app"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A1C21] border border-[#FF5F00] text-[#FF5F00] font-black text-xs uppercase tracking-wider"
              >
                <Smartphone className="w-4 h-4 stroke-[2.5]" />
                <span>Abrir Terminal de Campo BRONTO®</span>
              </Link>

              <Link
                href="/cotizar"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FF5F00] text-black font-black text-xs uppercase tracking-wider"
              >
                <FileText className="w-4 h-4" />
                <span>Solicitar Cotización de Obra ({totalCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
