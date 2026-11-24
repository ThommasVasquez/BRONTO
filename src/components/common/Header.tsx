"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { useClientAuth } from "@/components/auth/ClientAuthProvider";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Menu, X, ShoppingBag, User, ShieldCheck, Smartphone } from "lucide-react";

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
    { label: "Academia", href: "/capacitacion" },
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
    <header
      className="sticky top-0 z-50 w-full bg-[#131518]/85 backdrop-blur-2xl border-b border-white/[0.07]"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4 py-3">
        {/* Logo oficial con texto BRONTO® en blanco puro */}
        <BrandLogo size="md" />

        {/* Cápsula central de navegación estilo producto moderno */}
        <nav
          className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#1E232A]/90 border border-white/[0.07]"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#2C333E] text-white shadow-sm"
                    : "text-[#A7B1BE] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Acciones Derecha Desktop */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1E232A] hover:bg-[#282E38] border border-white/[0.08] text-xs font-semibold text-white transition-colors"
            title="Abrir aplicación móvil BRONTO®"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FF5F00]" />
            <span>App móvil</span>
          </Link>

          <Link
            href={mounted && isLoggedIn ? "/portal-clientes" : "/login"}
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1E232A] hover:bg-[#282E38] border border-white/[0.08] text-xs font-medium text-[#D0D7E2] hover:text-white transition-colors"
          >
            {mounted && isLoggedIn ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF5F00]" />
                <span className="max-w-[100px] truncate">{user?.companyName.split(" ")[0]}</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-[#A7B1BE]" />
                <span>Clientes</span>
              </>
            )}
          </Link>

          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1E232A] hover:bg-[#282E38] border border-white/[0.08] text-xs font-semibold text-white transition-colors"
            title="Ver orden de cotización"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FF5F00]" />
            <span>Orden</span>
            {mounted && totalCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#FF5F00] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {totalCount}
              </span>
            )}
          </Link>

          <Link
            href="/cotizar"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#FF5F00] hover:bg-[#FF711A] text-white font-semibold text-sm shadow-lg shadow-[#FF5F00]/20 transition-all active:scale-[0.98]"
          >
            Cotizar equipo
          </Link>
        </div>

        {/* Controles Móviles */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1E232A] border border-white/[0.08] text-white text-xs font-semibold"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FF5F00]" />
            <span>App</span>
          </Link>

          <Link
            href="/cotizar"
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1E232A] border border-white/[0.08] text-white"
            aria-label="Ver orden"
          >
            <ShoppingBag className="w-4 h-4 text-[#FF5F00]" />
            {mounted && totalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF5F00] text-white text-[10px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-[#1E232A] border border-white/[0.08] flex items-center justify-center text-white"
            aria-expanded={mobileMenuOpen}
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Moderno */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171A1F]/98 backdrop-blur-2xl border-t border-white/[0.08] px-5 py-5 space-y-4 shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-[#252B34] text-white"
                    : "text-[#B8C2CE] hover:bg-[#1E232A] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={mounted && isLoggedIn ? "/portal-clientes" : "/login"}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[#B8C2CE] hover:bg-[#1E232A]"
            >
              <User className="w-4 h-4 text-[#FF5F00]" />
              <span>
                {mounted && isLoggedIn ? `Portal: ${user?.companyName}` : "Portal de clientes"}
              </span>
            </Link>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2.5">
            <Link
              href="/app"
              className="py-3 px-4 rounded-xl bg-[#252B34] border border-white/[0.08] text-white text-center text-sm font-semibold"
            >
              Abrir App PWA
            </Link>
            <Link
              href="/cotizar"
              className="py-3 px-4 rounded-xl bg-[#FF5F00] text-white text-center text-sm font-semibold shadow-lg shadow-[#FF5F00]/20"
            >
              Cotizar ({mounted ? totalCount : 0})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
