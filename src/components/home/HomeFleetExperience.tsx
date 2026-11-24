"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { catalogProducts, catalogCategories } from "@/data/catalogData";
import { coursesData } from "@/data/coursesData";
import { siteConfig } from "@/data/siteConfig";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { formatCOP } from "@/lib/pricing";
import {
  Search,
  MapPin,
  Plus,
  Check,
  Phone,
  Truck,
  ShieldCheck,
  Wrench,
  GraduationCap,
  FileText,
  SlidersHorizontal,
} from "lucide-react";

const HERO_UNITS = [
  catalogProducts.find((p) => p.slug === "retroexcavadora-sobre-orugas-20t")!,
  catalogProducts.find((p) => p.slug === "minicargador-con-aditamentos")!,
  catalogProducts.find((p) => p.slug === "andamio-multidireccional-certificado")!,
].filter(Boolean);

export const HomeFleetExperience: React.FC = () => {
  const router = useRouter();
  const { addItem, isInBasket, totalCount } = useQuoteBasket();
  const [mounted, setMounted] = useState(false);

  // Estado del buscador rápido en el Hero
  const [heroSearch, setHeroSearch] = useState("");
  const [heroZone, setHeroZone] = useState("Bogotá Norte y Sabana Centro");
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  // Estado del explorador de flota en vivo sobre Gris Tormenta
  const [activeCategory, setActiveCategory] = useState<string>("destacados");

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroUnit = HERO_UNITS[activeHeroIdx] || catalogProducts[0];

  const visibleFleet = useMemo(() => {
    if (activeCategory === "destacados") {
      return catalogProducts.filter((p) => p.featured).slice(0, 6);
    }
    return catalogProducts.filter((p) => p.categoryId === activeCategory).slice(0, 6);
  }, [activeCategory]);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push("/catalogo");
    }
  };

  const quickTags = [
    { label: "Excavadora 20T", href: "/catalogo/retroexcavadora-sobre-orugas-20t" },
    { label: "Minicargador Bobcat", href: "/catalogo/minicargador-con-aditamentos" },
    { label: "Rodillo 10T", href: "/catalogo/rodillo-compactador-monocilindrico-10t" },
    { label: "Andamio Res. 4272", href: "/catalogo/andamio-multidireccional-certificado" },
    { label: "Planta 150 kVA", href: "/catalogo/planta-electrica-insonorizada-150kva" },
    { label: "Concreto bombeable", href: "/catalogo/concreto-premezclado-bombeable" },
  ];

  return (
    <div className="w-full bg-storm text-[#F5F7F9]">
      {/* =====================================================================
          SECCIÓN 1: HERO ARQUITECTÓNICO DIVIDIDO + MESA DE BÚSQUEDA DE FLOTA
          60% Gris Tormenta (#2B3036) · 30% Negro Mate (#17191D) · 10% Naranja (#FF5F00)
          ===================================================================== */}
      <section
        aria-label="Buscador de maquinaria y despacho en obra"
        className="w-full bg-storm industrial-grid border-b border-storm-border"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Columna Izquierda: Titular directo + Buscador de Patio */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-matte border border-storm-border text-xs text-[#E5EAF0]">
                  <span className="w-2 h-2 bg-[#FF5F00]" />
                  <span>Despacho desde Calle 80 / Siberia hacia Bogotá y Sabana</span>
                </div>

                <h1 className="font-display text-5xl sm:text-6xl xl:text-[4.6rem] font-extrabold tracking-tight leading-[0.94] text-white">
                  Maquinaria pesada, formaletas y concreto puestos en su frente de obra.
                </h1>

                <p className="text-base sm:text-lg text-[#C4CCD4] max-w-2xl leading-relaxed">
                  Unifique excavación, compactación, encofrados certificados y suministro de concreto con un solo proveedor operativo. Alquiler por día o mes, en modalidad seca o con operador acreditado.
                </p>
              </div>

              {/* Consola de Búsqueda Rápida en Negro Mate (30%) sobre Gris Tormenta (60%) */}
              <div className="bg-matte border border-storm-border p-5 sm:p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">
                    Consultar equipo y tarifa de referencia
                  </span>
                  <span className="text-xs text-[#B8C1CC] font-mono tabular-nums">
                    {catalogProducts.length} equipos en línea
                  </span>
                </div>

                <form
                  onSubmit={handleHeroSearchSubmit}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2.5"
                >
                  <div className="sm:col-span-6 relative">
                    <Search className="w-4 h-4 text-[#8E99A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder="Buscar excavadora, rodillo, andamio, planta..."
                      className="w-full h-12 pl-10 pr-3 bg-matte-deep border border-storm-border focus:border-[#FF5F00] text-sm text-white placeholder-[#8E99A6] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 relative">
                    <select
                      value={heroZone}
                      onChange={(e) => setHeroZone(e.target.value)}
                      aria-label="Zona de entrega"
                      className="w-full h-12 px-3 bg-matte-deep border border-storm-border focus:border-[#FF5F00] text-xs font-medium text-[#E5EAF0] focus:outline-none"
                    >
                      <option>Bogotá Norte y Sabana</option>
                      <option>Calle 80 / Cota / Chía</option>
                      <option>Funza / Mosquera / Madrid</option>
                      <option>Bogotá Centro / Sur / Soacha</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full h-12 px-4 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] font-bold text-sm transition-colors"
                    >
                      Buscar equipo
                    </button>
                  </div>
                </form>

                {/* Accesos directos a referencias de alta rotación */}
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#8E99A6] mr-1">Frecuentes:</span>
                  {quickTags.map((tag) => (
                    <Link
                      key={tag.href}
                      href={tag.href}
                      className="px-2.5 py-1 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-xs text-[#E5EAF0] transition-colors"
                    >
                      {tag.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Vitrina Técnica de Unidad en Patio */}
            <div className="lg:col-span-5 bg-matte border border-storm-border flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Selector superior de unidad */}
              <div className="px-4 py-3 bg-matte-deep border-b border-matte-border flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#B8C1CC] tabular-nums">
                  {heroUnit.sku} · {heroUnit.subcategory}
                </span>
                <div className="flex items-center gap-1.5">
                  {HERO_UNITS.map((u, idx) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setActiveHeroIdx(idx)}
                      className={`px-2 py-0.5 text-xs font-mono transition-colors ${
                        activeHeroIdx === idx
                          ? "bg-[#FF5F00] text-[#111316] font-bold"
                          : "bg-storm-panel text-[#C4CCD4] hover:text-white"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fotografía real del equipo */}
              <div className="relative aspect-[16/10] w-full bg-matte-deep overflow-hidden">
                <Image
                  src={heroUnit.images[0]?.url || "/images/products/retroexcavadora-oruga-20t.jpg"}
                  alt={heroUnit.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-matte-deep/90 border border-storm-border text-xs text-emerald-400 font-medium">
                  {heroUnit.availabilityLabel}
                </div>
              </div>

              {/* Placa de Especificación y Tarifa */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {heroUnit.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-[#B8C1CC] line-clamp-2">
                    {heroUnit.shortDescription}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2.5 pt-3 border-t border-matte-border text-xs">
                    {heroUnit.specifications.slice(0, 2).map((spec, idx) => (
                      <div key={idx} className="bg-matte-deep p-2.5 border border-matte-border">
                        <span className="text-[#8E99A6] block">{spec.label}</span>
                        <strong className="text-white font-mono text-xs mt-0.5 block">
                          {spec.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-matte-border flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#8E99A6] block">Tarifa de referencia</span>
                    <span className="font-mono text-xl font-bold text-[#FF5F00] tabular-nums">
                      {formatCOP(heroUnit.pricing.basePrice)}
                    </span>
                    <span className="text-xs text-[#B8C1CC] ml-1">
                      / {heroUnit.pricing.priceUnit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/catalogo/${heroUnit.slug}`}
                      className="px-3.5 py-2.5 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-xs font-semibold text-white transition-colors"
                    >
                      Ver ficha
                    </Link>
                    <button
                      type="button"
                      onClick={() => addItem(heroUnit, 1)}
                      className="px-4 py-2.5 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] text-xs font-bold transition-colors"
                    >
                      {mounted && isInBasket(heroUnit.id) ? "En orden" : "Cotizar unidad"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2: BANDA DE RESPALDO OPERATIVO EN NEGRO MATE (30%)
          ===================================================================== */}
      <section
        aria-label="Respaldo logístico y normativo"
        className="w-full bg-matte border-b border-storm-border"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-matte-border">
          <div className="pt-3 sm:pt-0 lg:pr-6 flex items-start gap-3.5">
            <Truck className="w-6 h-6 text-[#FF5F00] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Movilización en cama baja
              </h3>
              <p className="text-xs text-[#B8C1CC] mt-1 leading-relaxed">
                Salida directa por el corredor Calle 80 / Siberia hacia Bogotá, Chía, Cota, Funza, Mosquera y Soacha.
              </p>
            </div>
          </div>

          <div className="pt-4 sm:pt-0 lg:px-6 flex items-start gap-3.5">
            <Wrench className="w-6 h-6 text-[#FF5F00] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Protocolo de 40 puntos
              </h3>
              <p className="text-xs text-[#B8C1CC] mt-1 leading-relaxed">
                Verificación hidráulica, niveles, horómetro calibrado y cuadrilla móvil para soporte mecánico en obra.
              </p>
            </div>
          </div>

          <div className="pt-4 sm:pt-0 lg:px-6 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-[#FF5F00] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Carpeta para interventoría
              </h3>
              <p className="text-xs text-[#B8C1CC] mt-1 leading-relaxed">
                Equipos y andamios certificados bajo Resolución 4272, memorias de cálculo y planillas ARL vigentes.
              </p>
            </div>
          </div>

          <div className="pt-4 sm:pt-0 lg:pl-6 flex items-start gap-3.5">
            <FileText className="w-6 h-6 text-[#FF5F00] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Facturación unificada
              </h3>
              <p className="text-xs text-[#B8C1CC] mt-1 leading-relaxed">
                Consolide maquinaria amarilla, encofrados, concreto y casetones con una sola cuenta comercial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: EXPLORADOR DE FLOTA EN VIVO SOBRE GRIS TORMENTA (60%)
          Contraste directo entre fondo Gris Tormenta (#2B3036) y chasis Negro Mate (#17191D)
          ===================================================================== */}
      <section
        aria-label="Inventario disponible y tarifas"
        className="w-full bg-storm py-14 lg:py-20 border-b border-storm-border"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Flota y suministros para cotización inmediata
              </h2>
              <p className="mt-2 text-base text-[#C4CCD4] max-w-2xl">
                Filtre por frente constructivo, revise parámetros mecánicos y arme su solicitud de despacho en línea.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="self-start lg:self-auto px-4 py-2.5 bg-matte hover:bg-matte-deep border border-storm-border text-sm font-semibold text-white transition-colors"
            >
              Ver las {catalogProducts.length} referencias del catálogo
            </Link>
          </div>

          {/* Pestañas de División en Gris Tormenta Panel (#343A42) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory("destacados")}
              className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border transition-colors ${
                activeCategory === "destacados"
                  ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316] font-bold"
                  : "bg-storm-panel border-storm-border text-[#E5EAF0] hover:bg-storm-elevated"
              }`}
            >
              Alta rotación en obra
            </button>
            {catalogCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316] font-bold"
                    : "bg-storm-panel border-storm-border text-[#E5EAF0] hover:bg-storm-elevated"
                }`}
              >
                {cat.shortName}
              </button>
            ))}
          </div>

          {/* Barra aviso si hay equipos en la orden */}
          {mounted && totalCount > 0 && (
            <div className="bg-matte border-l-4 border-l-[#FF5F00] border-y border-r border-storm-border px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-white">
                Tiene <strong className="text-[#FF5F00] font-mono">{totalCount}</strong>{" "}
                {totalCount === 1 ? "unidad agregada" : "unidades agregadas"} en su orden de cotización.
              </span>
              <Link
                href="/cotizar"
                className="px-4 py-2 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] text-xs font-bold transition-colors"
              >
                Revisar liquidación y flete
              </Link>
            </div>
          )}

          {/* Rejilla de 3 columnas amplias y legibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFleet.map((product) => {
              const inBasket = mounted && isInBasket(product.id);
              return (
                <article
                  key={product.id}
                  className="bg-matte border border-storm-border hover:border-[#FF5F00] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    {/* Cabecera de ficha */}
                    <div className="px-4 py-2.5 bg-matte-deep border-b border-matte-border flex items-center justify-between text-xs">
                      <span className="font-mono text-[#B8C1CC]">{product.sku}</span>
                      <span className="text-[#E5EAF0] font-medium capitalize">
                        {product.modality.replace("_", " / ")}
                      </span>
                    </div>

                    {/* Imagen */}
                    <Link
                      href={`/catalogo/${product.slug}`}
                      className="block relative aspect-[16/10] bg-matte-deep overflow-hidden"
                    >
                      <Image
                        src={product.images[0]?.url || "/brand/bronto-logo.png"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    {/* Cuerpo técnico */}
                    <div className="p-5 space-y-4">
                      <div>
                        <span className="text-xs text-[#8E99A6] block">{product.subcategory}</span>
                        <Link href={`/catalogo/${product.slug}`}>
                          <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#FF5F00] transition-colors leading-tight mt-0.5">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="divide-y divide-matte-border border-y border-matte-border text-xs">
                        {product.specifications.slice(0, 3).map((spec, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between gap-3">
                            <span className="text-[#8E99A6]">{spec.label}</span>
                            <span className="font-mono font-medium text-[#E5EAF0] text-right">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pie de Tarifa y Acción */}
                  <div className="px-5 pb-5 pt-1 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#8E99A6] block">Tarifa base</span>
                      <span className="font-mono text-lg font-bold text-[#FF5F00] tabular-nums">
                        {formatCOP(product.pricing.basePrice)}
                      </span>
                      <span className="text-[11px] text-[#B8C1CC] block">
                        / {product.pricing.priceUnit}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/catalogo/${product.slug}`}
                        className="px-3 py-2.5 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-xs font-semibold text-white transition-colors"
                      >
                        Ficha
                      </Link>
                      <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className={`px-3.5 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                          inBasket
                            ? "bg-emerald-600 text-white"
                            : "bg-[#FF5F00] hover:bg-[#E55500] text-[#111316]"
                        }`}
                      >
                        {inBasket ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Agregado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Cotizar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: LAS 4 DIVISIONES DE OBRA (DISEÑO ASIMÉTRICO EN GRIS TORMENTA PANEL)
          ===================================================================== */}
      <section
        aria-label="Divisiones técnicas de suministro"
        className="w-full bg-storm-panel py-14 lg:py-20 border-b border-storm-border"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Columna Izquierda Fija */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-[0.96]">
              Cuatro frentes críticos resueltos con una sola remisión.
            </h2>
            <p className="text-sm sm:text-base text-[#C4CCD4] leading-relaxed">
              Coordinar excavación por un lado, formaleta por otro y concreto con un tercero multiplica los tiempos muertos en obra. En BRONTO® integramos el ciclo estructural completo.
            </p>
            <div className="pt-2">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-5 py-3 bg-matte hover:bg-matte-deep border border-storm-border text-sm font-semibold text-white transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#FF5F00]" />
                <span>Conocer alcance de servicios</span>
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Filas Horizontales de Ingeniería */}
          <div className="lg:col-span-8 space-y-4">
            {catalogCategories.map((cat) => {
              const count = catalogProducts.filter((p) => p.categoryId === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.id}`}
                  className="group block bg-matte border border-storm-border hover:border-[#FF5F00] transition-colors overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch">
                    <div className="sm:col-span-4 relative min-h-[180px] bg-matte-deep overflow-hidden">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 280px"
                      />
                    </div>
                    <div className="sm:col-span-8 p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono text-[#FF5F00] font-semibold">
                            {count} referencias activas
                          </span>
                          <span className="text-xs font-semibold text-[#C4CCD4] group-hover:text-white">
                            Abrir división
                          </span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#FF5F00] transition-colors mt-1">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-[#B8C1CC] mt-1.5 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-matte-border">
                        {cat.subcategories.map((sub, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-matte-deep border border-matte-border text-xs text-[#C4CCD4]"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 5: PROTOCOLO DE DESPACHO + ESCUELA DE OPERADORES BRONTO®
          ===================================================================== */}
      <section
        aria-label="Proceso logístico y certificación de operadores"
        className="w-full bg-storm py-14 lg:py-20 border-b border-storm-border"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Proceso real paso a paso (aquí la numeración 1-4 SÍ es una secuencia operativa) */}
          <div className="lg:col-span-7 bg-matte border border-storm-border p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Cómo operamos cada despacho a obra
              </h2>
              <p className="text-sm text-[#B8C1CC] mt-1.5">
                Desde la solicitud de cotización hasta el cierre de acta en su proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  step: "Paso 1",
                  title: "Cubicaje y reserva en patio",
                  desc: "Validamos tonelaje, aditamentos, metraje de formaleta o volumen de concreto según su programación semanal.",
                },
                {
                  step: "Paso 2",
                  title: "Inspección preoperacional",
                  desc: "Ejecutamos revisión mecánica de 40 puntos y emitimos carpeta de seguridad social y certificados para interventoría.",
                },
                {
                  step: "Paso 3",
                  title: "Transporte especializado",
                  desc: "Despachamos en cama baja o camión grúa desde Calle 80 / Siberia directamente hasta la portería de su frente.",
                },
                {
                  step: "Paso 4",
                  title: "Soporte continuo en campo",
                  desc: "Mantenimiento preventivo programado en sitio y reemplazo prioritario de unidad ante cualquier eventualidad.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-matte-deep border border-matte-border p-5 space-y-2"
                >
                  <span className="text-xs font-mono font-semibold text-[#FF5F00]">
                    {item.step}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-[#B8C1CC] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque Escuela de Operadores */}
          <div className="lg:col-span-5 bg-matte border-t-4 border-t-[#FF5F00] border-x border-b border-storm-border p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF5F00]">
                <GraduationCap className="w-4 h-4" />
                <span>Formación y acreditación técnica</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Escuela de Operadores y Seguridad en Obra
              </h2>

              <p className="text-sm text-[#B8C1CC] leading-relaxed">
                Capacitamos y certificamos cuadrillas y operadores en excavadora hidráulica, minicargador, compactación vial y armado seguro de andamios conforme a la Resolución 4272.
              </p>

              <div className="divide-y divide-matte-border border-y border-matte-border">
                {coursesData.slice(0, 3).map((course) => (
                  <div key={course.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-snug">
                        {course.title}
                      </h4>
                      <span className="text-xs text-[#8E99A6]">{course.duration}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#FF5F00] shrink-0 tabular-nums">
                      {formatCOP(course.priceCOP)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/capacitacion"
                className="flex-1 text-center py-3 px-4 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] text-sm font-bold transition-colors"
              >
                Ver programas y validar certificados
              </Link>
              <Link
                href="/app?tab=cursos"
                className="py-3 px-4 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-sm font-semibold text-white transition-colors"
              >
                Inscribir en App
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 6: MESA DE DESPACHO DIRECTO (CIERRE OPERATIVO COMPACTO)
          ===================================================================== */}
      <section aria-label="Contacto directo de despacho" className="w-full bg-matte">
        <div className="h-2 w-full hazard-stripe" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              ¿Tiene programación de obra o fundida esta semana?
            </h2>
            <p className="text-base text-[#C4CCD4]">
              Envíenos su listado de equipos o hable directamente con coordinación de patio en Calle 80 para bloqueo inmediato de unidades.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Link
              href="/cotizar"
              className="flex-1 sm:flex-initial text-center px-7 py-4 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] font-bold text-sm transition-colors"
            >
              Abrir cotizador en línea
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Hola BRONTO®, requiero disponibilidad y cotización de maquinaria para frente de obra."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-4 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-white font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FF5F00]" />
              <span>Hablar con despacho</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
