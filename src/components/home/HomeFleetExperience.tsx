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
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Wrench,
  GraduationCap,
  Clock,
  MessageCircle,
  Smartphone,
} from "lucide-react";

export const HomeFleetExperience: React.FC = () => {
  const router = useRouter();
  const { addItem, isInBasket, totalCount } = useQuoteBasket();
  const [mounted, setMounted] = useState(false);

  const [heroSearch, setHeroSearch] = useState("");
  const [heroZone, setHeroZone] = useState("Bogotá y Sabana Norte");
  const [activeCategory, setActiveCategory] = useState<string>("destacados");

  useEffect(() => {
    setMounted(true);
  }, []);

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
    { label: "Andamios Res. 4272", href: "/catalogo/andamio-multidireccional-certificado" },
    { label: "Planta 150 kVA", href: "/catalogo/planta-electrica-insonorizada-150kva" },
    { label: "Concreto bombeable", href: "/catalogo/concreto-premezclado-bombeable" },
  ];

  const bentoSpans = [
    "lg:col-span-7 h-[340px] sm:h-[400px]",
    "lg:col-span-5 h-[340px] sm:h-[400px]",
    "lg:col-span-5 h-[320px] sm:h-[360px]",
    "lg:col-span-7 h-[320px] sm:h-[360px]",
  ];

  return (
    <div className="w-full bg-[#131518] text-[#F5F7FA]">
      {/* =====================================================================
          1. HERO CINEMATOGRÁFICO ENMARCADO + CONSOLA FLOTANTE DE BÚSQUEDA
          ===================================================================== */}
      <section aria-label="Presentación principal BRONTO®" className="pt-4 sm:pt-6 pb-14 sm:pb-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[560px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 border border-white/[0.08] shadow-2xl">
            {/* Fotografía real de maquinaria pesada con iluminación arquitectónica */}
            <Image
              src="/images/products/retroexcavadora-oruga-20t.jpg"
              alt="Excavadora sobre orugas 20 toneladas BRONTO®"
              fill
              priority
              className="object-cover object-center scale-[1.01]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E1013]/95 via-[#131518]/80 to-[#131518]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-transparent to-[#0E1013]/40" />

            {/* Píldora superior de estado de patio */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1E232A]/85 backdrop-blur-xl border border-white/[0.12] text-xs font-medium text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Patio Calle 80 / Siberia activo · Despacho en menos de 4h</span>
              </div>

              <Link
                href="/app"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/[0.12] text-xs font-medium text-white transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#FF5F00]" />
                <span>Instalar App iOS y Android</span>
              </Link>
            </div>

            {/* Titular + Dock de Búsqueda */}
            <div className="relative z-10 mt-16 lg:mt-24 max-w-3xl space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] leading-[1.03] text-white">
                Maquinaria, formaletas y concreto para obras que no se detienen.
              </h1>

              <p className="text-base sm:text-lg text-[#C6CFD9] max-w-2xl leading-relaxed font-normal">
                Alquiler flexible por día o mes con alistamiento certificado, modalidad con o sin operador y movilización propia hacia Bogotá y toda la Sabana.
              </p>

              {/* Dock Moderno de Búsqueda en Gris Tormenta Translúcido */}
              <form
                onSubmit={handleHeroSearchSubmit}
                className="bg-[#1F242C]/90 backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="flex-1 flex items-center gap-3 px-3.5 py-2">
                  <Search className="w-5 h-5 text-[#FF5F00] shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="¿Qué necesita hoy? Ej: excavadora, minicargador, andamio..."
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#8E99A8] focus:outline-none"
                  />
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-2 border-l border-white/[0.08]">
                  <MapPin className="w-4 h-4 text-[#9BA5B4] shrink-0" />
                  <select
                    value={heroZone}
                    onChange={(e) => setHeroZone(e.target.value)}
                    aria-label="Zona de obra"
                    className="bg-transparent text-xs font-medium text-[#E2E8F0] focus:outline-none cursor-pointer"
                  >
                    <option className="bg-[#1B1F25]">Bogotá y Sabana Norte</option>
                    <option className="bg-[#1B1F25]">Calle 80 / Cota / Chía</option>
                    <option className="bg-[#1B1F25]">Funza / Mosquera / Madrid</option>
                    <option className="bg-[#1B1F25]">Bogotá Sur / Soacha</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="h-12 px-6 rounded-xl bg-[#FF5F00] hover:bg-[#FF711A] text-white font-semibold text-sm shadow-lg shadow-[#FF5F00]/25 transition-all shrink-0 active:scale-[0.99]"
                >
                  Buscar en flota
                </button>
              </form>

              {/* Accesos rápidos */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {quickTags.map((tag) => (
                  <Link
                    key={tag.href}
                    href={tag.href}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] backdrop-blur-md border border-white/[0.09] text-xs font-medium text-[#E5EAF0] transition-colors"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FLOTA INTERACTIVA SOBRE TARJETAS GRIS TORMENTA ESCULPIDAS
          ===================================================================== */}
      <section aria-label="Flota disponible" className="py-10 sm:py-16">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white">
                Equipos listos para despacho
              </h2>
              <p className="mt-2 text-base text-[#9BA5B4] max-w-xl">
                Tarifas transparentes y fichas verificadas. Agregue unidades a su orden para calcular transporte e IVA al instante.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E232A] hover:bg-[#272E38] border border-white/[0.08] text-sm font-semibold text-white transition-colors self-start md:self-auto"
            >
              <span>Ver las {catalogProducts.length} referencias</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF5F00]" />
            </Link>
          </div>

          {/* Filtros tipo píldora moderna */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory("destacados")}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === "destacados"
                  ? "bg-[#FF5F00] text-white shadow-md shadow-[#FF5F00]/20"
                  : "bg-[#1E232A] text-[#B8C2CE] hover:bg-[#262C35] hover:text-white border border-white/[0.06]"
              }`}
            >
              Más solicitados
            </button>
            {catalogCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#FF5F00] text-white shadow-md shadow-[#FF5F00]/20"
                    : "bg-[#1E232A] text-[#B8C2CE] hover:bg-[#262C35] hover:text-white border border-white/[0.06]"
                }`}
              >
                {cat.shortName}
              </button>
            ))}
          </div>

          {/* Notificación limpia si hay ítems en la orden */}
          {mounted && totalCount > 0 && (
            <div className="rounded-2xl bg-[#1E232A] border border-[#FF5F00]/40 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#FF5F00] text-white text-xs font-bold flex items-center justify-center tabular-nums">
                  {totalCount}
                </span>
                <span className="text-sm font-medium text-white">
                  Equipos seleccionados en su orden de cotización
                </span>
              </div>
              <Link
                href="/cotizar"
                className="px-4 py-2 rounded-xl bg-[#FF5F00] hover:bg-[#FF711A] text-white text-xs font-semibold transition-colors"
              >
                Revisar orden y flete
              </Link>
            </div>
          )}

          {/* Grid de Tarjetas Esculpidas en Gris Tormenta (#1E232A) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFleet.map((product) => {
              const inBasket = mounted && isInBasket(product.id);
              return (
                <article
                  key={product.id}
                  className="group rounded-3xl bg-[#1E232A] hover:bg-[#232932] border border-white/[0.07] hover:border-white/[0.14] p-3.5 flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Marco de imagen con radio interno armónico */}
                    <Link
                      href={`/catalogo/${product.slug}`}
                      className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#131518]"
                    >
                      <Image
                        src={product.images[0]?.url || "/brand/bronto-logo.png"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#131518]/80 backdrop-blur-md border border-white/[0.1] text-[11px] font-medium text-white">
                        {product.subcategory}
                      </div>
                    </Link>

                    {/* Contenido */}
                    <div className="px-2 pt-4 pb-3 space-y-3">
                      <div>
                        <span className="text-xs font-mono text-[#8E99A8]">{product.sku}</span>
                        <Link href={`/catalogo/${product.slug}`}>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#FF5F00] transition-colors leading-snug mt-0.5">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      {/* Píldoras de especificación limpias en Gris Tormenta Elevado */}
                      <div className="flex flex-wrap gap-1.5">
                        {product.specifications.slice(0, 2).map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#282F39] text-xs text-[#D0D7E2]"
                          >
                            {spec.label}: <strong className="text-white font-semibold">{spec.value}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Precio + Botones */}
                  <div className="px-2 pt-3 pb-1 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-[#8E99A8] block">Desde</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-white tabular-nums">
                          {formatCOP(product.pricing.basePrice)}
                        </span>
                        <span className="text-xs text-[#9BA5B4]">
                          / {product.pricing.priceUnit.split(" ")[0].toLowerCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/catalogo/${product.slug}`}
                        className="px-3.5 py-2.5 rounded-xl bg-[#282F39] hover:bg-[#323A46] text-xs font-semibold text-white transition-colors"
                      >
                        Ficha
                      </Link>
                      <button
                        type="button"
                        onClick={() => addItem(product, 1)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all active:scale-[0.98] ${
                          inBasket
                            ? "bg-emerald-600 text-white"
                            : "bg-[#FF5F00] hover:bg-[#FF711A] text-white shadow-md shadow-[#FF5F00]/20"
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
          3. BENTO GRID ASIMÉTRICO: LAS 4 DIVISIONES DE OBRA
          ===================================================================== */}
      <section aria-label="Divisiones de suministro" className="py-12 sm:py-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white">
              Un solo aliado desde la excavación hasta la estructura
            </h2>
            <p className="mt-2.5 text-base text-[#9BA5B4]">
              Elimine tiempos muertos coordinando maquinaria, encofrados, vaciado de concreto y casetones con facturación consolidada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {catalogCategories.map((cat, index) => {
              const count = catalogProducts.filter((p) => p.categoryId === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/catalogo?categoria=${cat.id}`}
                  className={`group relative rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/[0.18] flex flex-col justify-between p-6 sm:p-8 transition-all ${bentoSpans[index]}`}
                >
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013]/95 via-[#131518]/55 to-[#131518]/20" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#1E232A]/85 backdrop-blur-md border border-white/[0.1] text-xs font-medium text-white">
                      {count} referencias
                    </span>
                    <span className="w-10 h-10 rounded-full bg-white/[0.1] group-hover:bg-[#FF5F00] backdrop-blur-md border border-white/[0.12] flex items-center justify-center text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="relative z-10 max-w-lg space-y-2.5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-[#D0D7E2] line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {cat.subcategories.slice(0, 3).map((sub, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur-sm text-[11px] text-white/90"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. BENTO DOBLE: LOGÍSTICA DE CAMPO & ESCUELA DE OPERADORES
          ===================================================================== */}
      <section aria-label="Respaldo operativo y formación" className="py-10 sm:py-16">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Estándar operativo BRONTO */}
          <div className="lg:col-span-7 rounded-3xl bg-[#1E232A] border border-white/[0.07] p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-white">
                Ingeniería logística pensada para residentes de obra
              </h2>
              <p className="text-sm sm:text-base text-[#9BA5B4]">
                Respaldo técnico real antes, durante y después de descargar el equipo en su proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#15181E] border border-white/[0.06] p-5 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5F00]/15 flex items-center justify-center text-[#FF5F00]">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Cama baja y grúa propia</h3>
                <p className="text-xs text-[#9BA5B4] leading-relaxed">
                  Ubicación estratégica en el corredor Calle 80 / Siberia para entregas ágiles en Bogotá, Chía, Cota, Funza y Soacha.
                </p>
              </div>

              <div className="rounded-2xl bg-[#15181E] border border-white/[0.06] p-5 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5F00]/15 flex items-center justify-center text-[#FF5F00]">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Protocolo de 40 puntos</h3>
                <p className="text-xs text-[#9BA5B4] leading-relaxed">
                  Revisión hidráulica preoperacional y reemplazo prioritario de unidad en caso de contingencia mecánica.
                </p>
              </div>

              <div className="rounded-2xl bg-[#15181E] border border-white/[0.06] p-5 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5F00]/15 flex items-center justify-center text-[#FF5F00]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Carpeta para interventoría</h3>
                <p className="text-xs text-[#9BA5B4] leading-relaxed">
                  Certificados de conformidad Res. 4272, memorias de cálculo de andamios y documentación ARL vigente.
                </p>
              </div>

              <div className="rounded-2xl bg-[#15181E] border border-white/[0.06] p-5 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5F00]/15 flex items-center justify-center text-[#FF5F00]">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Modalidad flexible</h3>
                <p className="text-xs text-[#9BA5B4] leading-relaxed">
                  Alquiler en modalidad seca o con operador certificado por día, semana o contrato mensual de obra.
                </p>
              </div>
            </div>
          </div>

          {/* Escuela de Operadores */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#252B35] to-[#1A1E25] border border-white/[0.09] p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5F00]/15 text-[#FF5F00] text-xs font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Academia BRONTO®</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-white leading-tight">
                Certificación de operadores y seguridad en alturas
              </h2>

              <p className="text-sm text-[#B8C2CE] leading-relaxed">
                Formación teórico-práctica en maquinaria real para cuadrillas y contratistas, con consulta de certificados en línea.
              </p>

              <div className="space-y-2.5 pt-1">
                {coursesData.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl bg-[#131518]/75 border border-white/[0.06] px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{course.title}</h4>
                      <span className="text-xs text-[#8E99A8]">{course.duration}</span>
                    </div>
                    <span className="text-xs font-bold text-[#FF5F00] shrink-0 tabular-nums">
                      {formatCOP(course.priceCOP)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/capacitacion"
                className="flex-1 text-center py-3 px-5 rounded-xl bg-[#FF5F00] hover:bg-[#FF711A] text-white text-sm font-semibold shadow-lg shadow-[#FF5F00]/20 transition-all"
              >
                Ver programas
              </Link>
              <Link
                href="/app?tab=cursos"
                className="py-3 px-4 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.08] text-sm font-semibold text-white transition-colors"
              >
                Inscribir en App
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. BANNER DE CIERRE ESCULPIDO EN GRIS TORMENTA
          ===================================================================== */}
      <section aria-label="Cotización inmediata" className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#1E232A] border border-white/[0.09] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 20%, rgba(255, 95, 0, 0.16), transparent 50%)",
            }}
          >
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white leading-tight">
                Cotice su próximo frente de obra en minutos.
              </h2>
              <p className="text-base text-[#B8C2CE] leading-relaxed">
                Seleccione equipos en línea con cálculo automático de flete o envíe su requerimiento directo a coordinación de patio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                href="/cotizar"
                className="flex-1 sm:flex-initial text-center px-7 py-4 rounded-full bg-[#FF5F00] hover:bg-[#FF711A] text-white font-semibold text-sm shadow-xl shadow-[#FF5F00]/25 transition-all"
              >
                Abrir cotizador en línea
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  "Hola BRONTO®, requiero disponibilidad y cotización para obra."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#282F39] hover:bg-[#323A46] border border-white/[0.09] text-white font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#FF5F00]" />
                <span>WhatsApp directo</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
