"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { catalogProducts, catalogCategories } from "@/data/catalogData";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { formatCOP } from "@/lib/pricing";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Plus,
  Check,
  X,
  Filter,
} from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "todas";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedModality, setSelectedModality] = useState<string>("todas");
  const [sortBy, setSortBy] = useState<
    "destacados" | "nombre_asc" | "nombre_desc" | "precio_asc" | "precio_desc"
  >("destacados");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { addItem, isInBasket } = useQuoteBasket();

  const filteredProducts = useMemo(() => {
    return catalogProducts
      .filter((product) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          const matchSub = product.subcategory.toLowerCase().includes(q);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchSku && !matchSub && !matchTag) return false;
        }

        if (selectedCategory !== "todas" && product.categoryId !== selectedCategory) {
          return false;
        }

        if (selectedModality !== "todas") {
          if (
            selectedModality === "alquiler" &&
            product.modality !== "alquiler" &&
            product.modality !== "alquiler_suministro"
          ) {
            return false;
          }
          if (
            selectedModality === "suministro" &&
            product.modality !== "suministro" &&
            product.modality !== "alquiler_suministro"
          ) {
            return false;
          }
          if (selectedModality === "servicio" && product.modality !== "servicio") {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "destacados") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        if (sortBy === "precio_asc") return a.pricing.basePrice - b.pricing.basePrice;
        if (sortBy === "precio_desc") return b.pricing.basePrice - a.pricing.basePrice;
        if (sortBy === "nombre_asc") return a.name.localeCompare(b.name);
        if (sortBy === "nombre_desc") return b.name.localeCompare(a.name);
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedModality, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("todas");
    setSelectedModality("todas");
    setSortBy("destacados");
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "todas" || selectedModality !== "todas";

  return (
    <div className="py-8 sm:py-12 pb-20 bg-[#131518] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Catálogo de equipos" }]} />

        {/* Cabecera moderna */}
        <div className="py-6 sm:py-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white">
              Catálogo de maquinaria y soluciones
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[#9BA5B4] max-w-2xl">
              Equipos de construcción, maquinaria pesada, encofrados certificados y materiales aligerados listos para entrega en Bogotá y la Sabana.
            </p>
          </div>

          <div className="px-4 py-2 rounded-full bg-[#1E232A] border border-white/[0.07] text-xs text-[#B8C2CE] self-start md:self-auto">
            Mostrando <strong className="text-white">{filteredProducts.length}</strong> de{" "}
            {catalogProducts.length} referencias
          </div>
        </div>

        {/* Barra de búsqueda y ordenamiento */}
        <div className="pb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-[#8E99A8] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar equipo, SKU o aplicación..."
              className="w-full h-12 pl-11 pr-10 rounded-2xl bg-[#1E232A] border border-white/[0.08] focus:border-[#FF5F00] focus:outline-none text-sm text-white placeholder-[#8E99A8]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E99A8] hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-between lg:justify-end">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "destacados"
                    | "nombre_asc"
                    | "nombre_desc"
                    | "precio_asc"
                    | "precio_desc"
                )
              }
              className="h-11 rounded-xl bg-[#1E232A] border border-white/[0.08] text-white text-xs font-medium px-3.5 focus:border-[#FF5F00] focus:outline-none"
            >
              <option value="destacados">Más solicitados</option>
              <option value="precio_asc">Menor tarifa primero</option>
              <option value="precio_desc">Mayor tarifa primero</option>
              <option value="nombre_asc">Nombre: A - Z</option>
              <option value="nombre_desc">Nombre: Z - A</option>
            </select>

            <div className="flex items-center rounded-xl border border-white/[0.08] bg-[#1E232A] p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#FF5F00] text-white"
                    : "text-[#9BA5B4] hover:text-white"
                }`}
                aria-label="Vista en cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#FF5F00] text-white"
                    : "text-[#9BA5B4] hover:text-white"
                }`}
                aria-label="Vista en lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 h-11 px-4 rounded-xl bg-[#1E232A] border border-white/[0.08] text-xs font-semibold text-white"
            >
              <Filter className="w-3.5 h-3.5 text-[#FF5F00]" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Sidebar moderno */}
          <aside
            className={`lg:block ${
              mobileFiltersOpen ? "block" : "hidden"
            } lg:col-span-3 space-y-6 rounded-3xl bg-[#1E232A] p-6 border border-white/[0.07]`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FF5F00]" />
                Filtrar inventario
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#FF5F00] hover:underline"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#9BA5B4] mb-2.5">Línea de obra</h4>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("todas")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === "todas"
                      ? "bg-[#FF5F00] text-white font-semibold"
                      : "text-[#D0D7E2] hover:bg-[#282F39]"
                  }`}
                >
                  <span>Todas las líneas</span>
                  <span className="tabular-nums">{catalogProducts.length}</span>
                </button>
                {catalogCategories.map((cat) => {
                  const count = catalogProducts.filter((p) => p.categoryId === cat.id).length;
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        active
                          ? "bg-[#FF5F00] text-white font-semibold"
                          : "text-[#D0D7E2] hover:bg-[#282F39]"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.shortName}</span>
                      <span className="shrink-0 tabular-nums opacity-80">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.07]">
              <h4 className="text-xs font-semibold text-[#9BA5B4] mb-2.5">Modalidad</h4>
              <div className="space-y-1">
                {[
                  { id: "todas", label: "Todas las modalidades" },
                  { id: "alquiler", label: "Alquiler de equipos" },
                  { id: "suministro", label: "Suministro de materiales" },
                  { id: "servicio", label: "Servicio especializado" },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setSelectedModality(mod.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedModality === mod.id
                        ? "bg-[#282F39] text-white font-semibold border border-white/[0.1]"
                        : "text-[#9BA5B4] hover:text-white"
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.07]">
              <div className="p-4 rounded-2xl bg-[#14171C] border border-white/[0.06] space-y-2">
                <span className="text-xs font-semibold text-white block">
                  ¿Necesita un equipo especial?
                </span>
                <p className="text-xs text-[#9BA5B4] leading-relaxed">
                  Coordinamos referencias de gran tonelaje o especificaciones particulares bajo requerimiento.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block pt-1 text-xs font-semibold text-[#FF5F00] hover:underline"
                >
                  Hablar con ingeniería
                </Link>
              </div>
            </div>
          </aside>

          {/* Resultados */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl bg-[#1E232A] border border-white/[0.07] p-12 text-center space-y-4">
                <p className="text-base font-semibold text-white">
                  No encontramos equipos con los filtros seleccionados.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-full bg-[#FF5F00] text-white text-xs font-semibold"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const inBasket = mounted && isInBasket(product.id);
                  return (
                    <article
                      key={product.id}
                      className="group rounded-3xl bg-[#1E232A] hover:bg-[#232932] border border-white/[0.07] hover:border-white/[0.14] p-3.5 flex flex-col justify-between transition-all duration-300"
                    >
                      <div>
                        <Link
                          href={`/catalogo/${product.slug}`}
                          className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#131518]"
                        >
                          <Image
                            src={product.images[0]?.url || "/brand/bronto-logo.png"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#131518]/80 backdrop-blur-md border border-white/[0.1] text-[11px] font-medium text-white">
                            {product.subcategory}
                          </div>
                        </Link>

                        <div className="px-2 pt-4 pb-3 space-y-3">
                          <div>
                            <span className="text-xs font-mono text-[#8E99A8]">{product.sku}</span>
                            <Link href={`/catalogo/${product.slug}`}>
                              <h3 className="text-lg font-bold text-white group-hover:text-[#FF5F00] transition-colors leading-snug mt-0.5">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {product.specifications.slice(0, 2).map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-[#282F39] text-xs text-[#D0D7E2]"
                              >
                                {s.label}: <strong className="text-white">{s.value}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="px-2 pt-3 pb-1 border-t border-white/[0.06] flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[11px] text-[#8E99A8] block">Desde</span>
                          <div className="flex items-baseline gap-1 whitespace-nowrap">
                            <span className="text-base font-bold text-white tabular-nums">
                              {formatCOP(product.pricing.basePrice, false)}
                            </span>
                            <span className="text-[11px] text-[#9BA5B4]">
                              / {product.pricing.priceUnit.split(" ")[0].toLowerCase()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/catalogo/${product.slug}`}
                            className="px-3 py-2 rounded-xl bg-[#282F39] hover:bg-[#323A46] text-xs font-semibold text-white transition-colors"
                          >
                            Ficha
                          </Link>
                          <button
                            type="button"
                            onClick={() => addItem(product, 1)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-all ${
                              inBasket
                                ? "bg-emerald-600 text-white"
                                : "bg-[#FF5F00] hover:bg-[#FF711A] text-white shadow-md shadow-[#FF5F00]/20"
                            }`}
                          >
                            {inBasket ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Listo</span>
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
            ) : (
              <div className="space-y-3.5">
                {filteredProducts.map((product) => {
                  const inBasket = mounted && isInBasket(product.id);
                  return (
                    <div
                      key={product.id}
                      className="rounded-3xl bg-[#1E232A] border border-white/[0.07] hover:border-white/[0.14] p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#131518] shrink-0 relative">
                          <Image
                            src={product.images[0]?.url || "/brand/bronto-logo.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <span className="text-xs font-mono text-[#8E99A8]">{product.sku}</span>
                          <Link href={`/catalogo/${product.slug}`}>
                            <h3 className="text-lg font-bold text-white hover:text-[#FF5F00] transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#9BA5B4] line-clamp-2 max-w-xl">
                            {product.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {product.specifications.slice(0, 2).map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-[#282F39] text-xs text-[#D0D7E2]"
                              >
                                {s.label}: <strong className="text-white">{s.value}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 border-t md:border-t-0 md:border-l border-white/[0.07] pt-3 md:pt-0 md:pl-6 min-w-[170px]">
                        <div className="md:text-right">
                          <span className="text-[11px] text-[#8E99A8] block">Desde</span>
                          <span className="text-lg font-bold text-white tabular-nums">
                            {formatCOP(product.pricing.basePrice)}
                          </span>
                          <span className="text-[11px] text-[#9BA5B4] block">
                            / {product.pricing.priceUnit}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/catalogo/${product.slug}`}
                            className="px-3.5 py-2 rounded-xl bg-[#282F39] hover:bg-[#323A46] text-xs font-semibold text-white transition-colors"
                          >
                            Ficha
                          </Link>
                          <button
                            type="button"
                            onClick={() => addItem(product, 1)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-all ${
                              inBasket
                                ? "bg-emerald-600 text-white"
                                : "bg-[#FF5F00] hover:bg-[#FF711A] text-white"
                            }`}
                          >
                            {inBasket ? "Listo" : "+ Cotizar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-[#9BA5B4] text-sm">Cargando catálogo...</div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
