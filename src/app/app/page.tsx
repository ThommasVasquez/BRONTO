"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { catalogProducts, catalogCategories } from "@/data/catalogData";
import { coursesData, CourseItem } from "@/data/coursesData";
import { siteConfig } from "@/data/siteConfig";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { formatCOP, computeQuoteSummary, calculateItemTotal } from "@/lib/pricing";
import { Product } from "@/types/catalog";
import {
  HardHat,
  GraduationCap,
  ShoppingBag,
  Phone,
  Search,
  MessageCircle,
  Download,
  Check,
  Clock,
  MapPin,
  Plus,
  Minus,
  Trash2,
  X,
  Share2,
  Smartphone,
  ExternalLink,
  Truck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type AppTab = "renta" | "cursos" | "pedido" | "cuenta";

const DELIVERY_ZONES = [
  { id: "Bogotá D.C.", label: "Bogotá D.C.", eta: "Entrega mismo día" },
  { id: "Cota / Siberia", label: "Calle 80 · Siberia · Cota", eta: "Salida en < 2h" },
  { id: "Chía / Cajicá", label: "Sabana Norte (Chía · Cajicá)", eta: "2 a 4 horas" },
  { id: "Funza / Mosquera / Madrid", label: "Occidente (Funza · Mosquera)", eta: "2 a 4 horas" },
  { id: "Soacha", label: "Bogotá Sur y Soacha", eta: "Mismo día" },
];

export default function BrontoAppPage() {
  const [activeTab, setActiveTab] = useState<AppTab>("renta");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedCity, setSelectedCity] = useState("Bogotá D.C.");
  const [requiresTransport, setRequiresTransport] = useState(true);
  const [requiresOperator, setRequiresOperator] = useState(false);

  const [showZoneSheet, setShowZoneSheet] = useState(false);
  const [selectedProductSheet, setSelectedProductSheet] = useState<Product | null>(null);
  const [sheetDuration, setSheetDuration] = useState("1 mes");
  const [selectedCourseSheet, setSelectedCourseSheet] = useState<CourseItem | null>(null);
  const [showInstallSheet, setShowInstallSheet] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [courseForm, setCourseForm] = useState({
    name: "",
    phone: "",
    company: "",
    traineesCount: "1",
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateDuration,
    clearBasket,
    totalCount,
  } = useQuoteBasket();

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab") as AppTab;
      if (tabParam && ["renta", "cursos", "pedido", "cuenta"].includes(tabParam)) {
        setActiveTab(tabParam);
      }

      const runningStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(runningStandalone);

      const ua = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(ua));

      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };
      window.addEventListener("beforeinstallprompt", handleBeforeInstall);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        showToast("BRONTO® instalada en inicio");
      }
    } else {
      setShowInstallSheet(true);
    }
  };

  const getProductQty = (productId: string) => {
    if (!mounted) return 0;
    const found = items.find((i) => i.product.id === productId);
    return found ? found.quantity : 0;
  };

  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchCat = selectedCategory === "todos" || p.categoryId === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return coursesData.filter(
      (c) =>
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.targetMachines.toLowerCase().includes(q) ||
        c.categoryLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const quoteSummary = useMemo(
    () => computeQuoteSummary(items, requiresOperator, requiresTransport, selectedCity),
    [items, requiresOperator, requiresTransport, selectedCity]
  );

  const handleQuickAdd = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addItem(product, 1, product.modality, "1 mes");
    showToast(`Agregado: ${product.name}`);
  };

  const handleStepQty = (product: Product, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = getProductQty(product.id);
    const next = current + delta;
    if (next <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, next);
    }
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseSheet) return;

    const message =
      `*INSCRIPCIÓN ACADEMIA BRONTO®*\n\n` +
      `*Programa:* ${selectedCourseSheet.title}\n` +
      `*Duración:* ${selectedCourseSheet.duration}\n` +
      `*Responsable:* ${courseForm.name}\n` +
      `*Teléfono:* ${courseForm.phone}\n` +
      `*Empresa:* ${courseForm.company || "Independiente"}\n` +
      `*Participantes:* ${courseForm.traineesCount}\n\n` +
      `Solicito confirmar fechas disponibles.`;

    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSelectedCourseSheet(null);
    showToast("Solicitud enviada");
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let text = `*ORDEN DE COTIZACIÓN — BRONTO® APP*\n\n`;
    text += `*Destino:* ${selectedCity}\n`;
    text += `*Transporte cama baja:* ${requiresTransport ? "Sí" : "No"}\n`;
    text += `*Operador certificado:* ${requiresOperator ? "Sí" : "No"}\n\n`;
    text += `*EQUIPOS:*\n`;

    items.forEach((item, idx) => {
      const calc = calculateItemTotal(item, requiresOperator);
      text += `${idx + 1}. *${item.product.name}* (${item.product.sku})\n`;
      text += `   Cant: ${item.quantity} · Plazo: ${item.estimatedDuration || "1 mes"} · ${formatCOP(
        calc.equipmentSubtotal
      )}\n`;
    });

    text += `\n*Total estimado (IVA incl.):* ${formatCOP(quoteSummary.grandTotal)}\n`;

    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const currentZoneObj =
    DELIVERY_ZONES.find((z) => z.id === selectedCity) || DELIVERY_ZONES[0];

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-[#131518] sm:bg-[#0A0C0E] sm:flex sm:justify-center select-none">
      {/* ====================================================================
          MODERN NATIVE MOBILE SHELL (100% edge-to-edge on all phones · 430px centered frame on desktop)
          ==================================================================== */}
      <div className="relative w-full max-w-full sm:max-w-[430px] h-full bg-[#131518] sm:border-x sm:border-white/[0.08] flex flex-col min-w-0 overflow-hidden shadow-2xl">
        {/* Toast Flotante Tipo Píldora */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 max-w-[90%] bg-[#252B35]/95 backdrop-blur-xl border border-white/[0.12] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold pointer-events-none">
            <span className="w-4 h-4 rounded-full bg-[#FF5F00] flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
            </span>
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* ==================================================================
            1. NATIVE GLASS TOP BAR
            ================================================================== */}
        <header
          className="shrink-0 w-full min-w-0 max-w-full overflow-hidden bg-[#131518]/90 backdrop-blur-2xl border-b border-white/[0.06] px-4 pb-3 z-30"
          style={{ paddingTop: "max(10px, env(safe-area-inset-top, 10px))" }}
        >
          <div className="flex items-center justify-between gap-2 min-w-0">
            <BrandLogo size="sm" withLink={false} />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowZoneSheet(true)}
                className="inline-flex items-center gap-1.5 max-w-[162px] px-3 py-1.5 rounded-full bg-[#1E232B] hover:bg-[#272D37] border border-white/[0.08] text-xs font-medium text-white active:scale-[0.98] transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF5F00] shrink-0" />
                <span className="truncate">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#9BA5B4] shrink-0" />
              </button>

              {!isStandalone && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  aria-label="Instalar aplicación"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FF5F00] active:bg-[#FF711A] text-white text-xs font-semibold shadow-md shadow-[#FF5F00]/25 shrink-0"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Instalar</span>
                </button>
              )}
            </div>
          </div>

          {/* Buscador moderno + Chips en Equipos / Cursos */}
          {(activeTab === "renta" || activeTab === "cursos") && (
            <div className="mt-3 space-y-2.5 min-w-0">
              <div className="relative w-full min-w-0">
                <Search className="w-4 h-4 text-[#8E99A8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === "renta"
                      ? "¿Qué equipo necesita hoy?"
                      : "Buscar curso o máquina..."
                  }
                  className="w-full h-11 pl-10 pr-9 rounded-2xl bg-[#1E232B] border border-white/[0.07] focus:border-[#FF5F00]/60 text-[16px] leading-tight text-white placeholder-[#8E99A8] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8E99A8] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {activeTab === "renta" && (
                <div className="w-full max-w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-0.5 touch-pan-x">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("todos")}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === "todos"
                        ? "bg-[#FF5F00] text-white shadow-sm shadow-[#FF5F00]/25"
                        : "bg-[#1E232B] text-[#B8C2CE] border border-white/[0.06]"
                    }`}
                  >
                    Todos ({catalogProducts.length})
                  </button>
                  {catalogCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? "bg-[#FF5F00] text-white shadow-sm shadow-[#FF5F00]/25"
                          : "bg-[#1E232B] text-[#B8C2CE] border border-white/[0.06]"
                      }`}
                    >
                      {cat.shortName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        {/* ==================================================================
            2. CONTENIDO DESLIZABLE VERTICAL
            ================================================================== */}
        <div
          className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 py-4 space-y-3"
          style={{
            paddingBottom:
              mounted && totalCount > 0 && (activeTab === "renta" || activeTab === "cursos")
                ? "84px"
                : "20px",
          }}
        >
          {/* ----------------------------------------------------------------
              VISTA 1: CATÁLOGO DE EQUIPOS (TARJETAS MODERNAS EN GRIS TORMENTA)
              ---------------------------------------------------------------- */}
          {activeTab === "renta" && (
            <>
              <div className="flex items-center justify-between text-xs text-[#9BA5B4] px-0.5">
                <span>{filteredProducts.length} equipos disponibles</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {currentZoneObj.eta}
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl bg-[#1E232B] border border-white/[0.06] p-8 text-center space-y-3">
                  <p className="text-sm font-semibold text-white">
                    No encontramos &ldquo;{searchQuery}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("todos");
                    }}
                    className="px-4 py-2 rounded-full bg-[#FF5F00] text-white text-xs font-semibold"
                  >
                    Ver todos los equipos
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => {
                    const primaryImg =
                      product.images.find((img) => img.isPrimary)?.url ||
                      product.images[0]?.url ||
                      "/brand/bronto-logo.png";
                    const qty = getProductQty(product.id);
                    const mainSpec = product.specifications[0];

                    return (
                      <div
                        key={product.id}
                        onClick={() => {
                          setSheetDuration("1 mes");
                          setSelectedProductSheet(product);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setSelectedProductSheet(product);
                        }}
                        className="w-full min-w-0 rounded-2xl bg-[#1E232B] active:bg-[#252B35] border border-white/[0.07] p-3 flex items-center gap-3.5 cursor-pointer transition-colors"
                      >
                        {/* Miniatura redondeada moderna */}
                        <div className="relative w-[96px] h-[96px] shrink-0 rounded-xl bg-[#131518] overflow-hidden">
                          <Image
                            src={primaryImg}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="min-w-0">
                            <span className="text-[11px] text-[#9BA5B4] block truncate">
                              {product.subcategory}
                            </span>

                            <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-1 mt-0.5">
                              {product.name}
                            </h3>

                            {mainSpec && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-[#282F3A] text-[11px] text-[#C8D1DC] max-w-full truncate">
                                {mainSpec.value}
                              </span>
                            )}
                          </div>

                          <div className="mt-2.5 flex items-center justify-between gap-2 min-w-0">
                            <div className="min-w-0">
                              <span className="text-sm font-bold text-white tabular-nums block truncate">
                                {formatCOP(product.pricing.basePrice)}
                              </span>
                              <span className="text-[10px] text-[#8E99A8] block truncate">
                                / {product.pricing.priceUnit.split(" ")[0].toLowerCase()}
                              </span>
                            </div>

                            {/* Stepper redondeado moderno */}
                            {qty > 0 ? (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="shrink-0 flex items-center rounded-full bg-[#282F3A] border border-[#FF5F00]/50 p-0.5"
                              >
                                <button
                                  type="button"
                                  onClick={(e) => handleStepQty(product, -1, e)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-white active:bg-white/10"
                                  aria-label="Restar"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-[#FF5F00] tabular-nums">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => handleStepQty(product, 1, e)}
                                  className="w-7 h-7 rounded-full bg-[#FF5F00] flex items-center justify-center text-white"
                                  aria-label="Sumar"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleQuickAdd(product, e)}
                                className="shrink-0 h-8 px-3.5 rounded-full bg-[#FF5F00] active:bg-[#FF711A] text-white text-xs font-semibold inline-flex items-center gap-1 shadow-sm shadow-[#FF5F00]/25"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Agregar</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ----------------------------------------------------------------
              VISTA 2: ESCUELA DE OPERADORES
              ---------------------------------------------------------------- */}
          {activeTab === "cursos" && (
            <div className="space-y-3">
              <div
                className="rounded-2xl bg-[#1E232B] border border-white/[0.08] p-4 space-y-1"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 95% 10%, rgba(255,95,0,0.18), transparent 55%)",
                }}
              >
                <span className="text-xs font-semibold text-[#FF5F00]">Academia BRONTO®</span>
                <h2 className="text-lg font-bold text-white">
                  Certificación práctica de operadores
                </h2>
                <p className="text-xs text-[#B8C2CE] leading-relaxed">
                  Cursos en máquina real en Patio Calle 80 o en su proyecto, homologados para interventoría y ARL.
                </p>
              </div>

              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl bg-[#1E232B] border border-white/[0.07] p-4 space-y-3 min-w-0"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-[#282F3A] text-white font-medium truncate">
                      {course.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#9BA5B4] shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#FF5F00]" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{course.title}</h3>

                  <p className="text-xs text-[#9BA5B4] leading-relaxed line-clamp-2">
                    {course.summary}
                  </p>

                  <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#8E99A8] block">Por operador</span>
                      <span className="text-base font-bold text-white tabular-nums">
                        {formatCOP(course.priceCOP)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCourseSheet(course)}
                      className="px-4 py-2 rounded-full bg-[#FF5F00] active:bg-[#FF711A] text-white text-xs font-semibold shadow-sm shadow-[#FF5F00]/25 shrink-0"
                    >
                      Inscribir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ----------------------------------------------------------------
              VISTA 3: ORDEN DE DESPACHO
              ---------------------------------------------------------------- */}
          {activeTab === "pedido" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-0.5">
                <div>
                  <h2 className="text-xl font-bold text-white">Su orden</h2>
                  <span className="text-xs text-[#9BA5B4]">Entrega en {selectedCity}</span>
                </div>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1E232B] text-xs text-rose-400 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="rounded-3xl bg-[#1E232B] border border-white/[0.07] p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#282F3A] flex items-center justify-center mx-auto text-[#9BA5B4]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-base font-bold text-white">No hay equipos agregados</p>
                  <p className="text-xs text-[#9BA5B4]">
                    Seleccione maquinaria o materiales para ver el estimado con transporte en tiempo real.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("renta")}
                    className="px-5 py-2.5 rounded-full bg-[#FF5F00] text-white text-xs font-semibold"
                  >
                    Explorar equipos
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5">
                    {items.map((item) => {
                      const calc = calculateItemTotal(item, requiresOperator);
                      return (
                        <div
                          key={item.product.id}
                          className="rounded-2xl bg-[#1E232B] border border-white/[0.07] p-3.5 space-y-3 min-w-0"
                        >
                          <div className="flex items-start justify-between gap-2 min-w-0">
                            <div className="min-w-0">
                              <span className="text-[11px] font-mono text-[#8E99A8] block">
                                {item.product.sku}
                              </span>
                              <h4 className="text-sm font-bold text-white leading-snug truncate">
                                {item.product.name}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="p-1 text-[#8E99A8] hover:text-rose-400 shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
                            <select
                              value={item.estimatedDuration || "1 mes"}
                              onChange={(e) => updateDuration(item.product.id, e.target.value)}
                              className="h-8 rounded-xl bg-[#131518] border border-white/[0.08] text-white text-[13px] px-2.5 focus:outline-none"
                            >
                              <option value="1 a 7 días">1 a 7 días</option>
                              <option value="15 días">15 días</option>
                              <option value="1 mes">1 mes</option>
                              <option value="3 meses">3 meses</option>
                            </select>

                            <div className="flex items-center rounded-full bg-[#131518] border border-white/[0.08] p-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                }
                                className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full bg-[#282F3A] flex items-center justify-center text-white"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-white tabular-nums shrink-0">
                              {formatCOP(calc.equipmentSubtotal)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Liquidación moderna */}
                  <div className="rounded-3xl bg-[#1E232B] border border-white/[0.08] p-4 space-y-3.5">
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-3 rounded-2xl bg-[#14171C] border border-white/[0.06] cursor-pointer text-xs">
                        <span className="flex items-center gap-2.5 text-white font-medium min-w-0">
                          <Truck className="w-4 h-4 text-[#FF5F00] shrink-0" />
                          <span className="truncate">Transporte cama baja ({selectedCity})</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={requiresTransport}
                          onChange={(e) => setRequiresTransport(e.target.checked)}
                          className="w-4 h-4 accent-[#FF5F00] shrink-0"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-2xl bg-[#14171C] border border-white/[0.06] cursor-pointer text-xs">
                        <span className="flex items-center gap-2.5 text-white font-medium min-w-0">
                          <HardHat className="w-4 h-4 text-[#FF5F00] shrink-0" />
                          <span className="truncate">Incluir operador certificado</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={requiresOperator}
                          onChange={(e) => setRequiresOperator(e.target.checked)}
                          className="w-4 h-4 accent-[#FF5F00] shrink-0"
                        />
                      </label>
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="flex justify-between text-[#9BA5B4]">
                        <span>Subtotal equipos ({totalCount})</span>
                        <span className="text-white font-medium tabular-nums">
                          {formatCOP(quoteSummary.equipmentTotal)}
                        </span>
                      </div>
                      {requiresTransport && (
                        <div className="flex justify-between text-[#9BA5B4]">
                          <span>Transporte estimado</span>
                          <span className="text-white font-medium tabular-nums">
                            {formatCOP(quoteSummary.transportTotal)}
                          </span>
                        </div>
                      )}
                      {requiresOperator && quoteSummary.operatorTotal > 0 && (
                        <div className="flex justify-between text-[#9BA5B4]">
                          <span>Operador certificado</span>
                          <span className="text-white font-medium tabular-nums">
                            {formatCOP(quoteSummary.operatorTotal)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#9BA5B4]">
                        <span>IVA (19%)</span>
                        <span className="text-white font-medium tabular-nums">
                          {formatCOP(quoteSummary.taxAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-baseline justify-between">
                      <span className="text-sm font-bold text-white">Total estimado</span>
                      <span className="text-xl font-extrabold text-[#FF5F00] tabular-nums">
                        {formatCOP(quoteSummary.grandTotal)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCheckoutWhatsApp}
                      className="w-full py-3.5 rounded-2xl bg-[#FF5F00] active:bg-[#FF711A] text-white font-semibold text-sm shadow-lg shadow-[#FF5F00]/25 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirmar por WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------
              VISTA 4: PATIO Y SOPORTE
              ---------------------------------------------------------------- */}
          {activeTab === "cuenta" && (
            <div className="space-y-3">
              <div className="rounded-3xl bg-[#1E232B] border border-white/[0.07] p-4 flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl border border-white/[0.1] bg-[#16181B] shrink-0 overflow-hidden">
                  <Image src="/icons/icon-192-v3.png" alt="BRONTO®" fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-white">BRONTO® App</h2>
                  <p className="text-xs text-[#9BA5B4] mt-0.5">
                    Renta de maquinaria y certificaciones técnicas en Bogotá y Sabana.
                  </p>
                </div>
              </div>

              {!isStandalone && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full p-4 rounded-2xl bg-[#FF5F00] active:bg-[#FF711A] text-white flex items-center justify-between font-semibold text-sm shadow-lg shadow-[#FF5F00]/20"
                >
                  <span className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Agregar a pantalla de inicio</span>
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div className="rounded-3xl bg-[#1E232B] border border-white/[0.07] divide-y divide-white/[0.06] overflow-hidden text-sm">
                <a
                  href={`tel:${siteConfig.contact.phoneFormatted}`}
                  className="p-4 flex items-center justify-between active:bg-[#262C36]"
                >
                  <span className="flex items-center gap-3 text-white font-medium">
                    <Phone className="w-4 h-4 text-[#FF5F00] shrink-0" />
                    <span>Llamar a patio ({siteConfig.contact.phone})</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8E99A8]" />
                </a>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-between active:bg-[#262C36]"
                >
                  <span className="flex items-center gap-3 text-white font-medium">
                    <MessageCircle className="w-4 h-4 text-[#FF5F00] shrink-0" />
                    <span>Soporte directo por WhatsApp</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8E99A8]" />
                </a>

                <a
                  href="https://maps.google.com/?q=Bogota+Calle+80+Siberia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-between active:bg-[#262C36]"
                >
                  <span className="flex items-center gap-3 text-white font-medium">
                    <MapPin className="w-4 h-4 text-[#FF5F00] shrink-0" />
                    <span>Ubicación Calle 80 / Siberia</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#8E99A8]" />
                </a>

                <Link
                  href="/"
                  className="p-4 flex items-center justify-between active:bg-[#262C36] text-[#B8C2CE]"
                >
                  <span>Ir a la web principal</span>
                  <ExternalLink className="w-4 h-4 text-[#8E99A8]" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ==================================================================
            3. PÍLDORA FLOTANTE DE ORDEN ACTIVA (ESTILO UBER / RAPPI)
            ================================================================== */}
        {mounted && totalCount > 0 && (activeTab === "renta" || activeTab === "cursos") && (
          <div className="absolute bottom-[74px] left-4 right-4 z-30">
            <button
              type="button"
              onClick={() => setActiveTab("pedido")}
              className="w-full h-13 py-3 px-4 rounded-2xl bg-[#FF5F00] active:bg-[#FF711A] text-white shadow-2xl shadow-black/60 flex items-center justify-between font-semibold text-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="min-w-[24px] h-6 px-1.5 rounded-full bg-black/25 text-white text-xs font-bold flex items-center justify-center tabular-nums">
                  {totalCount}
                </span>
                <span className="truncate">Ver orden</span>
              </div>
              <span className="font-bold text-sm tabular-nums shrink-0">
                {formatCOP(quoteSummary.equipmentTotal)}
              </span>
            </button>
          </div>
        )}

        {/* ==================================================================
            4. NATIVE GLASS BOTTOM TAB BAR
            ================================================================== */}
        <nav
          aria-label="Navegación inferior"
          className="shrink-0 w-full bg-[#131518]/92 backdrop-blur-2xl border-t border-white/[0.07] grid grid-cols-4 z-30 pt-1.5"
          style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))" }}
        >
          {(
            [
              { id: "renta", label: "Equipos", Icon: HardHat },
              { id: "cursos", label: "Academia", Icon: GraduationCap },
              { id: "pedido", label: "Orden", Icon: ShoppingBag, badge: mounted ? totalCount : 0 },
              { id: "cuenta", label: "Patio", Icon: Phone },
            ] as { id: AppTab; label: string; Icon: React.ElementType; badge?: number }[]
          ).map(({ id, label, Icon, badge }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`py-1 flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  active ? "text-[#FF5F00]" : "text-[#8E99A8]"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {badge && badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#FF5F00] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                      {badge}
                    </span>
                  ) : null}
                </div>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* ==================================================================
            SHEET 1: UBICACIÓN DE OBRA
            ================================================================== */}
        {showZoneSheet && (
          <div
            onClick={() => setShowZoneSheet(false)}
            className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-[28px] bg-[#1C2027] border-t border-white/[0.1] p-5 space-y-4"
              style={{ paddingBottom: "max(22px, env(safe-area-inset-bottom, 22px))" }}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Ubicación de entrega</h3>
                <button
                  type="button"
                  onClick={() => setShowZoneSheet(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center text-[#B8C2CE]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {DELIVERY_ZONES.map((z) => {
                  const selected = selectedCity === z.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => {
                        setSelectedCity(z.id);
                        setShowZoneSheet(false);
                      }}
                      className={`w-full px-4 py-3 rounded-2xl flex items-center justify-between text-left transition-colors ${
                        selected
                          ? "bg-[#FF5F00]/15 border border-[#FF5F00]/40"
                          : "bg-[#14171C] border border-white/[0.05]"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-sm font-semibold block ${
                            selected ? "text-[#FF5F00]" : "text-white"
                          }`}
                        >
                          {z.label}
                        </span>
                        <span className="text-xs text-[#8E99A8]">{z.eta}</span>
                      </div>
                      {selected && <Check className="w-4 h-4 text-[#FF5F00]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            SHEET 2: DETALLE DE EQUIPO
            ================================================================== */}
        {selectedProductSheet && (
          <div
            onClick={() => setSelectedProductSheet(null)}
            className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[88dvh] rounded-t-[28px] bg-[#1C2027] border-t border-white/[0.1] flex flex-col overflow-hidden"
              style={{ paddingBottom: "max(18px, env(safe-area-inset-bottom, 18px))" }}
            >
              <div className="pt-3 pb-2 px-5 flex items-center justify-between">
                <span className="text-xs font-mono text-[#9BA5B4]">
                  {selectedProductSheet.sku}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProductSheet(null)}
                  className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center text-[#B8C2CE]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl bg-[#131518] overflow-hidden">
                  <Image
                    src={selectedProductSheet.images[0]?.url || "/brand/bronto-logo.png"}
                    alt={selectedProductSheet.name}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {selectedProductSheet.name}
                  </h3>
                  <p className="text-xs text-[#B8C2CE] mt-1.5 leading-relaxed">
                    {selectedProductSheet.shortDescription}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#14171C] border border-white/[0.06] divide-y divide-white/[0.05] px-4 text-xs">
                  {selectedProductSheet.specifications.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between gap-3">
                      <span className="text-[#8E99A8]">{spec.label}</span>
                      <span className="font-semibold text-white text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-xs font-semibold text-white block mb-2">
                    Periodo estimado
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {["1 a 7 días", "15 días", "1 mes"].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSheetDuration(dur)}
                        className={`py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                          sheetDuration === dur
                            ? "bg-[#FF5F00] text-white"
                            : "bg-[#14171C] border border-white/[0.07] text-[#C8D1DC]"
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 px-5 pt-3 border-t border-white/[0.07] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#8E99A8] block">Tarifa base</span>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {formatCOP(selectedProductSheet.pricing.basePrice)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addItem(
                      selectedProductSheet,
                      1,
                      selectedProductSheet.modality,
                      sheetDuration
                    );
                    showToast(`Agregado: ${selectedProductSheet.name}`);
                    setSelectedProductSheet(null);
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-[#FF5F00] active:bg-[#FF711A] text-white font-semibold text-sm shadow-lg shadow-[#FF5F00]/25"
                >
                  Agregar a la orden
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            SHEET 3: INSCRIPCIÓN DE CURSO
            ================================================================== */}
        {selectedCourseSheet && (
          <div
            onClick={() => setSelectedCourseSheet(null)}
            className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[88dvh] rounded-t-[28px] bg-[#1C2027] border-t border-white/[0.1] p-5 space-y-4 overflow-y-auto"
              style={{ paddingBottom: "max(22px, env(safe-area-inset-bottom, 22px))" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FF5F00]">Academia BRONTO®</span>
                <button
                  type="button"
                  onClick={() => setSelectedCourseSheet(null)}
                  className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center text-[#B8C2CE]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {selectedCourseSheet.title}
                </h3>
                <p className="text-xs text-[#9BA5B4] mt-1">
                  {selectedCourseSheet.duration} · {formatCOP(selectedCourseSheet.priceCOP)} / operador
                </p>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Nombre del responsable"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-[#131518] border border-white/[0.08] text-[16px] text-white placeholder-[#8E99A8] focus:border-[#FF5F00] focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Teléfono celular"
                  value={courseForm.phone}
                  onChange={(e) => setCourseForm({ ...courseForm, phone: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-[#131518] border border-white/[0.08] text-[16px] text-white placeholder-[#8E99A8] focus:border-[#FF5F00] focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Constructora"
                    value={courseForm.company}
                    onChange={(e) => setCourseForm({ ...courseForm, company: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-[#131518] border border-white/[0.08] text-[16px] text-white placeholder-[#8E99A8] focus:border-[#FF5F00] focus:outline-none"
                  />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Operadores"
                    value={courseForm.traineesCount}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, traineesCount: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-xl bg-[#131518] border border-white/[0.08] text-[16px] text-white placeholder-[#8E99A8] focus:border-[#FF5F00] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#FF5F00] active:bg-[#FF711A] text-white font-semibold text-sm shadow-lg shadow-[#FF5F00]/25"
                >
                  Solicitar cupos por WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================
            SHEET 4: INSTALAR APP EN INICIO
            ================================================================== */}
        {showInstallSheet && (
          <div
            onClick={() => setShowInstallSheet(false)}
            className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded-t-[28px] bg-[#1C2027] border-t border-white/[0.1] p-5 space-y-4"
              style={{ paddingBottom: "max(22px, env(safe-area-inset-bottom, 22px))" }}
            >
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl border border-white/[0.1] bg-[#16181B] overflow-hidden shrink-0">
                    <Image src="/icons/icon-192-v3.png" alt="BRONTO®" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Instalar BRONTO®</h3>
                    <p className="text-xs text-[#9BA5B4]">Acceso rápido desde su inicio</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInstallSheet(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center text-[#B8C2CE]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isIOS ? (
                <div className="rounded-2xl bg-[#14171C] border border-white/[0.06] p-4 text-xs space-y-2 text-[#E2E8F0]">
                  <strong className="text-[#FF5F00] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    En iPhone / Safari:
                  </strong>
                  <p>
                    1. Toque <strong>Compartir</strong>{" "}
                    <Share2 className="w-3.5 h-3.5 inline text-[#FF5F00]" /> en la barra inferior.
                  </p>
                  <p>
                    2. Seleccione <strong>Agregar a inicio</strong>.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#14171C] border border-white/[0.06] p-4 text-xs space-y-2 text-[#E2E8F0]">
                  <strong className="text-[#FF5F00] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    En Android / Chrome:
                  </strong>
                  <p>1. Abra el menú superior de tres puntos.</p>
                  <p>
                    2. Toque <strong>Instalar aplicación</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
