"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { catalogProducts, catalogCategories } from "@/data/catalogData";
import { ModalityType } from "@/types/catalog";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  Eye, 
  Plus, 
  Check, 
  X,
  Filter,
  CheckCircle2
} from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "todas";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedModality, setSelectedModality] = useState<string>("todas");
  const [sortBy, setSortBy] = useState<"destacados" | "nombre_asc" | "nombre_desc">("destacados");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { addItem, isInBasket } = useQuoteBasket();

  // Filtrado reactivo optimizado
  const filteredProducts = useMemo(() => {
    return catalogProducts
      .filter((product) => {
        // Búsqueda por texto (nombre, SKU, subcategoría, tags)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          const matchSub = product.subcategory.toLowerCase().includes(q);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchSku && !matchSub && !matchTag) return false;
        }

        // Filtro por categoría
        if (selectedCategory !== "todas" && product.categoryId !== selectedCategory) {
          return false;
        }

        // Filtro por modalidad (alquiler, suministro, servicio)
        if (selectedModality !== "todas") {
          if (selectedModality === "alquiler" && product.modality !== "alquiler" && product.modality !== "alquiler_suministro") {
            return false;
          }
          if (selectedModality === "suministro" && product.modality !== "suministro" && product.modality !== "alquiler_suministro") {
            return false;
          }
          if (selectedModality === "servicio" && product.modality !== "servicio") {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "destacados") {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === "nombre_asc") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "nombre_desc") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedModality, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("todas");
    setSelectedModality("todas");
    setSortBy("destacados");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "todas" || selectedModality !== "todas";

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Catálogo de Equipos y Soluciones" }]} />

        {/* Cabecera Principal del Catálogo */}
        <div className="py-8 border-b border-[#242424] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              Catálogo Comercial
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-2xl">
              Equipos de construcción, maquinaria pesada, encofrados certificados y materiales aligerados para frentes de obra en Bogotá y municipios de la Sabana.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>
              Mostrando <strong className="text-bronto-yellow">{filteredProducts.length}</strong> de {catalogProducts.length} referencias
            </span>
          </div>
        </div>

        {/* Barra de Filtros Rápidos y Búsqueda */}
        <div className="py-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Campo de Búsqueda */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por equipo, referencia (ej: BRT-MAQ) o aplicación..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#1C1C1C] border border-[#333333] focus:border-bronto-yellow focus:outline-none text-sm text-white placeholder-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Selector de Orden y Alternador de Vistas */}
          <div className="flex items-center gap-3 justify-between lg:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 hidden sm:inline">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "destacados" | "nombre_asc" | "nombre_desc")}
                className="bg-[#1C1C1C] border border-[#333333] text-white text-xs py-2 px-3 focus:border-bronto-yellow focus:outline-none"
              >
                <option value="destacados">Destacados primero</option>
                <option value="nombre_asc">Nombre: A - Z</option>
                <option value="nombre_desc">Nombre: Z - A</option>
              </select>
            </div>

            {/* Alternador Grid / List */}
            <div className="flex items-center border border-[#333333] bg-[#1C1C1C] p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${viewMode === "grid" ? "bg-bronto-yellow text-[#151515]" : "text-white/60 hover:text-white"}`}
                aria-label="Vista en cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 ${viewMode === "list" ? "bg-bronto-yellow text-[#151515]" : "text-white/60 hover:text-white"}`}
                aria-label="Vista en lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Botón filtros en móviles */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#252525] border border-[#333333] text-xs uppercase font-bold text-bronto-yellow"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Layout Principal: Sidebar de Filtros + Rejilla de Productos Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR DE FILTROS (Desktop + Móvil) */}
          <aside className={`lg:block ${mobileFiltersOpen ? "block" : "hidden"} lg:col-span-3 space-y-6 bg-[#181818] p-6 border border-[#2B2B2B] h-fit`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
              <span className="text-xs uppercase tracking-wider font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-bronto-yellow" />
                Filtros de Catálogo
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-bronto-yellow hover:underline"
                >
                  Restablecer
                </button>
              )}
            </div>

            {/* Filtro: Familias de Catálogo */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/60 font-bold mb-3">
                Familia Principal
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory("todas")}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === "todas"
                      ? "bg-bronto-yellow text-[#151515] font-black"
                      : "text-white/80 hover:bg-[#252525]"
                  }`}
                >
                  <span>Todas las familias</span>
                  <span>({catalogProducts.length})</span>
                </button>
                {catalogCategories.map((cat) => {
                  const count = catalogProducts.filter((p) => p.categoryId === cat.id).length;
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                        active
                          ? "bg-bronto-yellow text-[#151515] font-black"
                          : "text-white/80 hover:bg-[#252525]"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.shortName}</span>
                      <span className="shrink-0 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtro: Modalidad Comercial */}
            <div className="pt-4 border-t border-[#2A2A2A]">
              <h4 className="text-xs uppercase tracking-wider text-white/60 font-bold mb-3">
                Modalidad Comercial
              </h4>
              <div className="space-y-1.5">
                {[
                  { id: "todas", label: "Cualquier modalidad" },
                  { id: "alquiler", label: "Alquiler de equipos" },
                  { id: "suministro", label: "Suministro de materiales" },
                  { id: "servicio", label: "Prestación de servicios" },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModality(mod.id)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      selectedModality === mod.id
                        ? "text-bronto-yellow font-bold bg-[#252525] border-l-2 border-bronto-yellow"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Asesoría Rápida */}
            <div className="pt-4 border-t border-[#2A2A2A]">
              <div className="p-4 bg-black/40 border border-[#333333] text-xs space-y-2">
                <span className="text-xs font-bold text-bronto-yellow uppercase block">
                  ¿No encuentra su equipo?
                </span>
                <p className="text-white/70 text-xs">
                  Consulte a nuestro equipo técnico. Coordinamos referencias especiales o de gran tonelaje bajo pedido.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block pt-1 text-xs text-white hover:text-bronto-yellow underline font-semibold"
                >
                  Contactar asesor técnico &rarr;
                </Link>
              </div>
            </div>
          </aside>

          {/* REJILLA / LISTA DE RESULTADOS */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#181818] border border-[#2B2B2B] p-12 text-center rounded-sm space-y-4">
                <p className="text-sm uppercase text-white/70 font-semibold">
                  No se encontraron referencias con los criterios aplicados.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Vista en Cuadrícula Full Width */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const inBasket = isInBasket(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-[#181818] border border-[#2B2B2B] rounded-sm flex flex-col justify-between overflow-hidden group hover:border-bronto-yellow transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                          style={{ backgroundImage: `url('${product.images[0]?.url}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />

                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 bg-black/80 text-[10px] uppercase text-white font-bold">
                            {product.subcategory}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 bg-bronto-yellow text-[#151515] text-[10px] uppercase font-black">
                            {product.modality.replace("_", " & ")}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-white/50 block mb-1 uppercase tracking-wider">
                            {product.sku}
                          </span>
                          <h3 className="uppercase text-lg font-bold text-white group-hover:text-bronto-yellow transition-colors leading-tight">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-xs text-white/70 line-clamp-2">
                            {product.shortDescription}
                          </p>

                          <div className="mt-3 pt-3 border-t border-[#2A2A2A] space-y-1">
                            {product.specifications.slice(0, 2).map((s, idx) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span className="text-white/50">{s.label}:</span>
                                <span className="text-white font-semibold">{s.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#2A2A2A] flex items-center gap-2">
                          <Link
                            href={`/catalogo/${product.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 bg-[#252525] hover:bg-[#303030] text-white text-xs uppercase font-bold transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detalle</span>
                          </Link>

                          <button
                            onClick={() => addItem(product, 1)}
                            className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-2.5 text-xs uppercase font-bold transition-colors ${
                              inBasket
                                ? "bg-green-700 text-white"
                                : "bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black"
                            }`}
                          >
                            {inBasket ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Listo</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Cotizar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Vista en Lista */
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const inBasket = isInBasket(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-[#181818] border border-[#2B2B2B] p-4 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 group hover:border-bronto-yellow transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden bg-black shrink-0 relative">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${product.images[0]?.url}')` }}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">{product.sku}</span>
                            <span className="px-2 py-0.5 bg-bronto-yellow text-[#151515] text-[10px] uppercase font-black">
                              {product.modality.replace("_", " & ")}
                            </span>
                          </div>
                          <h3 className="uppercase text-xl font-bold text-white group-hover:text-bronto-yellow transition-colors mt-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-white/70 mt-1 max-w-xl line-clamp-2">
                            {product.shortDescription}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/70">
                            {product.specifications.slice(0, 2).map((s, idx) => (
                              <span key={idx} className="bg-[#242424] px-2 py-0.5">
                                {s.label}: <strong>{s.value}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-[#2B2B2B] pt-4 md:pt-0 md:pl-6">
                        <Link
                          href={`/catalogo/${product.slug}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 bg-[#252525] hover:bg-[#303030] text-white text-xs uppercase font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Ficha</span>
                        </Link>

                        <button
                          onClick={() => addItem(product, 1)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs uppercase font-bold transition-colors ${
                            inBasket
                              ? "bg-green-700 text-white"
                              : "bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black"
                          }`}
                        >
                          {inBasket ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>En Lista</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Cotizar</span>
                            </>
                          )}
                        </button>
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
    <Suspense fallback={<div className="pt-32 text-center text-white font-bold text-sm">Cargando catálogo BRONTO...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

