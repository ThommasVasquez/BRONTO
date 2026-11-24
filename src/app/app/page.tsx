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
  FileText,
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
  { id: "Bogotá D.C.", label: "Bogotá D.C.", eta: "Despacho mismo día" },
  { id: "Cota / Siberia", label: "Calle 80 / Siberia / Cota", eta: "Salida inmediata" },
  { id: "Chía / Cajicá", label: "Sabana Norte (Chía / Cajicá)", eta: "2 a 4 horas" },
  { id: "Funza / Mosquera / Madrid", label: "Occidente (Funza / Mosquera)", eta: "2 a 4 horas" },
  { id: "Soacha", label: "Sur y Soacha", eta: "Mismo día" },
];

export default function BrontoAppPage() {
  const [activeTab, setActiveTab] = useState<AppTab>("renta");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedCity, setSelectedCity] = useState("Bogotá D.C.");
  const [requiresTransport, setRequiresTransport] = useState(true);
  const [requiresOperator, setRequiresOperator] = useState(false);

  // Native Bottom Sheets
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
      `*INSCRIPCIÓN ESCUELA DE OPERADORES BRONTO®*\n\n` +
      `*Programa:* ${selectedCourseSheet.title}\n` +
      `*Duración:* ${selectedCourseSheet.duration}\n` +
      `*Responsable:* ${courseForm.name}\n` +
      `*Teléfono:* ${courseForm.phone}\n` +
      `*Empresa:* ${courseForm.company || "Independiente"}\n` +
      `*Participantes:* ${courseForm.traineesCount}\n\n` +
      `Solicito confirmar fechas disponibles de práctica.`;

    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSelectedCourseSheet(null);
    showToast("Solicitud enviada por WhatsApp");
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let text = `*ORDEN DE COTIZACIÓN Y DESPACHO — BRONTO® APP*\n\n`;
    text += `*Destino de obra:* ${selectedCity}\n`;
    text += `*Transporte cama baja:* ${requiresTransport ? "Sí" : "No"}\n`;
    text += `*Operador certificado:* ${requiresOperator ? "Sí" : "No"}\n\n`;
    text += `*EQUIPOS SOLICITADOS:*\n`;

    items.forEach((item, idx) => {
      const calc = calculateItemTotal(item, requiresOperator);
      text += `${idx + 1}. *${item.product.name}* (${item.product.sku})\n`;
      text += `   Cant: ${item.quantity} | Plazo: ${item.estimatedDuration || "1 mes"} | Subtotal: ${formatCOP(
        calc.equipmentSubtotal
      )}\n`;
    });

    text += `\n*Total estimado (IVA incl.):* ${formatCOP(quoteSummary.grandTotal)}\n`;
    text += `Solicito validar disponibilidad inmediata en patio Calle 80.`;

    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const currentZoneObj =
    DELIVERY_ZONES.find((z) => z.id === selectedCity) || DELIVERY_ZONES[0];

  return (
    <div className="w-full h-[100dvh] max-w-[100vw] overflow-hidden bg-matte-deep flex justify-center select-none">
      {/* ====================================================================
          SHELL NATIVO BLOQUEADO (100vw en móvil · 430px marco iPhone en desktop)
          Cero desborde horizontal: w-full max-w-[430px] h-[100dvh] overflow-hidden
          ==================================================================== */}
      <div className="relative w-full max-w-[430px] h-[100dvh] bg-storm sm:border-x sm:border-storm-border flex flex-col overflow-hidden shadow-2xl">
        {/* Toast Nativo Superior */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 z-50 bg-matte border border-[#FF5F00] text-white px-3.5 py-2.5 shadow-2xl flex items-center gap-2 text-xs font-semibold pointer-events-none">
            <Check className="w-4 h-4 text-[#FF5F00] shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* ==================================================================
            1. NATIVE APP BAR FIJA (SIN SCROLL LATERAL)
            ================================================================== */}
        <header
          className="shrink-0 w-full bg-matte border-b border-storm-border px-4 pb-2.5 z-30"
          style={{ paddingTop: "max(10px, env(safe-area-inset-top, 10px))" }}
        >
          <div className="flex items-center justify-between gap-2 min-w-0">
            <BrandLogo size="sm" withLink={false} />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowZoneSheet(true)}
                className="inline-flex items-center gap-1 max-w-[155px] px-2.5 py-1.5 bg-storm-panel border border-storm-border text-xs font-medium text-white active:scale-[0.98] transition-transform"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF5F00] shrink-0" />
                <span className="truncate">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#B8C1CC] shrink-0" />
              </button>

              {!isStandalone && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  aria-label="Instalar aplicación"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] text-xs font-bold shrink-0"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>App</span>
                </button>
              )}
            </div>
          </div>

          {/* Controles fijos de búsqueda y filtros cuando está en Equipos o Cursos */}
          {(activeTab === "renta" || activeTab === "cursos") && (
            <div className="mt-2.5 space-y-2 min-w-0">
              {/* Buscador con font-size 16px (text-base) para evitar auto-zoom y desplazamiento en iOS */}
              <div className="relative w-full min-w-0">
                <Search className="w-4 h-4 text-[#8E99A6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTab === "renta"
                      ? "Buscar equipo, SKU o aplicación..."
                      : "Buscar programa o máquina..."
                  }
                  className="w-full h-10 pl-9 pr-8 bg-matte-deep border border-storm-border focus:border-[#FF5F00] text-[16px] leading-tight text-white placeholder-[#8E99A6] rounded-none focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8E99A6] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Chips horizontales contenidos estrictamente dentro del ancho del teléfono */}
              {activeTab === "renta" && (
                <div className="w-full max-w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-0.5 touch-pan-x">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("todos")}
                    className={`shrink-0 px-3 py-1.5 text-xs font-semibold border transition-colors ${
                      selectedCategory === "todos"
                        ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316] font-bold"
                        : "bg-storm-panel border-storm-border text-[#E5EAF0]"
                    }`}
                  >
                    Todos ({catalogProducts.length})
                  </button>
                  {catalogCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`shrink-0 px-3 py-1.5 text-xs font-semibold border transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316] font-bold"
                          : "bg-storm-panel border-storm-border text-[#E5EAF0]"
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
            2. ÁREA DE SCROLL VERTICAL EXCLUSIVO (touch-pan-y, overflow-x-hidden)
            ================================================================== */}
        <div
          className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden overscroll-y-contain px-3.5 py-3.5 space-y-3"
          style={{
            paddingBottom:
              mounted && totalCount > 0 && (activeTab === "renta" || activeTab === "cursos")
                ? "76px"
                : "16px",
          }}
        >
          {/* ----------------------------------------------------------------
              VISTA 1: CATÁLOGO NATIVO DE EQUIPOS (TARJETAS COMPACTAS TÁCTILES)
              ---------------------------------------------------------------- */}
          {activeTab === "renta" && (
            <>
              <div className="flex items-center justify-between text-xs text-[#C4CCD4] px-0.5">
                <span>
                  <strong className="text-white">{filteredProducts.length}</strong> equipos en patio
                </span>
                <span className="text-emerald-400 font-medium">{currentZoneObj.eta}</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-matte border border-storm-border p-8 text-center space-y-3">
                  <p className="text-sm font-semibold text-white">
                    Sin resultados para &ldquo;{searchQuery}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("todos");
                    }}
                    className="px-4 py-2 bg-[#FF5F00] text-[#111316] text-xs font-bold"
                  >
                    Mostrar toda la flota
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
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
                        className="w-full min-w-0 bg-matte border border-storm-border active:border-[#FF5F00] p-3 flex items-stretch gap-3 cursor-pointer transition-colors"
                      >
                        {/* Miniatura cuadrada nítida */}
                        <div className="relative w-[96px] h-[96px] shrink-0 bg-matte-deep border border-matte-border overflow-hidden self-center">
                          <Image
                            src={primaryImg}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Datos compactos y control táctil */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="min-w-0">
                            <div className="flex items-center justify-between gap-1.5 text-[11px]">
                              <span className="font-mono text-[#8E99A6] truncate">
                                {product.sku}
                              </span>
                              <span className="text-emerald-400 font-medium shrink-0">Stock</span>
                            </div>

                            <h3 className="font-display text-lg font-bold text-white leading-tight line-clamp-1 mt-0.5">
                              {product.name}
                            </h3>

                            {mainSpec && (
                              <p className="text-xs text-[#B8C1CC] truncate mt-0.5">
                                {mainSpec.label}: {mainSpec.value}
                              </p>
                            )}
                          </div>

                          <div className="pt-2 mt-1.5 border-t border-matte-border flex items-center justify-between gap-2 min-w-0">
                            <div className="min-w-0">
                              <span className="font-mono text-sm font-bold text-[#FF5F00] tabular-nums block truncate">
                                {formatCOP(product.pricing.basePrice)}
                              </span>
                              <span className="text-[10px] text-[#8E99A6] block truncate">
                                / {product.pricing.priceUnit}
                              </span>
                            </div>

                            {/* Stepper nativo si ya está en la orden, o botón Agregar */}
                            {qty > 0 ? (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="shrink-0 flex items-center bg-matte-deep border border-[#FF5F00]"
                              >
                                <button
                                  type="button"
                                  onClick={(e) => handleStepQty(product, -1, e)}
                                  className="w-8 h-8 flex items-center justify-center text-white active:bg-storm-panel"
                                  aria-label="Restar unidad"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-6 text-center text-xs font-mono font-bold text-[#FF5F00] tabular-nums">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => handleStepQty(product, 1, e)}
                                  className="w-8 h-8 flex items-center justify-center text-white active:bg-storm-panel"
                                  aria-label="Sumar unidad"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => handleQuickAdd(product, e)}
                                className="shrink-0 h-8 px-3 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] text-xs font-bold inline-flex items-center gap-1"
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
            <div className="space-y-2.5">
              <div className="bg-matte border-l-4 border-l-[#FF5F00] border-y border-r border-storm-border p-3.5">
                <h2 className="font-display text-xl font-bold text-white">
                  Escuela de Operadores BRONTO®
                </h2>
                <p className="text-xs text-[#B8C1CC] mt-0.5 leading-relaxed">
                  Certificación práctica en patio Calle 80 o en su frente de obra. Homologado para ARL e interventoría.
                </p>
              </div>

              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-matte border border-storm-border p-4 space-y-3 min-w-0"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-storm-panel border border-storm-border text-white font-semibold truncate">
                      {course.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#C4CCD4] font-mono shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#FF5F00]" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#B8C1CC] leading-relaxed line-clamp-2">
                    {course.summary}
                  </p>

                  <div className="pt-2.5 border-t border-matte-border flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#8E99A6] block">Por operador</span>
                      <span className="font-mono text-base font-bold text-[#FF5F00] tabular-nums">
                        {formatCOP(course.priceCOP)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCourseSheet(course)}
                      className="px-3.5 py-2 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] text-xs font-bold shrink-0"
                    >
                      Inscribir cuadrilla
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
              <div className="bg-matte border border-storm-border p-3.5 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white leading-none">
                    Orden de despacho
                  </h2>
                  <span className="text-xs text-[#B8C1CC] mt-1 block">
                    Destino: {selectedCity}
                  </span>
                </div>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="inline-flex items-center gap-1 text-xs text-rose-400 font-semibold px-2 py-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="bg-matte border border-storm-border p-8 text-center space-y-3">
                  <FileText className="w-10 h-10 text-[#8E99A6] mx-auto" />
                  <p className="text-sm font-semibold text-white">Su orden está vacía</p>
                  <p className="text-xs text-[#B8C1CC]">
                    Agregue equipos desde la pestaña Equipos para calcular transporte y tarifas en tiempo real.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("renta")}
                    className="px-5 py-2.5 bg-[#FF5F00] text-[#111316] text-xs font-bold"
                  >
                    Explorar equipos
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {items.map((item) => {
                      const calc = calculateItemTotal(item, requiresOperator);
                      return (
                        <div
                          key={item.product.id}
                          className="bg-matte border border-storm-border p-3.5 space-y-2.5 min-w-0"
                        >
                          <div className="flex items-start justify-between gap-2 min-w-0">
                            <div className="min-w-0">
                              <span className="text-[11px] font-mono text-[#8E99A6] block">
                                {item.product.sku}
                              </span>
                              <h4 className="font-display text-lg font-bold text-white leading-tight truncate">
                                {item.product.name}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="p-1 text-[#8E99A6] hover:text-rose-400 shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-matte-border">
                            <select
                              value={item.estimatedDuration || "1 mes"}
                              onChange={(e) => updateDuration(item.product.id, e.target.value)}
                              className="h-8 bg-matte-deep border border-storm-border text-white text-[14px] px-2 focus:outline-none"
                            >
                              <option value="1 a 7 días">1 a 7 días</option>
                              <option value="15 días">15 días</option>
                              <option value="1 mes">1 mes</option>
                              <option value="3 meses">3 meses</option>
                            </select>

                            <div className="flex items-center bg-matte-deep border border-storm-border">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                }
                                className="w-8 h-8 flex items-center justify-center text-white"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-bold text-white tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-white"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-bold text-[#FF5F00] tabular-nums shrink-0">
                              {formatCOP(calc.equipmentSubtotal)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Opciones logísticas y liquidación */}
                  <div className="bg-matte border border-storm-border p-4 space-y-3">
                    <div className="space-y-2">
                      <label className="flex items-center justify-between p-2.5 bg-matte-deep border border-matte-border cursor-pointer text-xs">
                        <span className="flex items-center gap-2 text-white font-medium min-w-0">
                          <Truck className="w-4 h-4 text-[#FF5F00] shrink-0" />
                          <span className="truncate">Cama baja ({selectedCity})</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={requiresTransport}
                          onChange={(e) => setRequiresTransport(e.target.checked)}
                          className="w-4 h-4 accent-[#FF5F00] shrink-0"
                        />
                      </label>

                      <label className="flex items-center justify-between p-2.5 bg-matte-deep border border-matte-border cursor-pointer text-xs">
                        <span className="flex items-center gap-2 text-white font-medium min-w-0">
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

                    <div className="divide-y divide-matte-border border-y border-matte-border text-xs">
                      <div className="py-2 flex justify-between">
                        <span className="text-[#B8C1CC]">Equipos ({totalCount})</span>
                        <span className="font-mono text-white tabular-nums">
                          {formatCOP(quoteSummary.equipmentTotal)}
                        </span>
                      </div>
                      {requiresTransport && (
                        <div className="py-2 flex justify-between">
                          <span className="text-[#B8C1CC]">Transporte estimado</span>
                          <span className="font-mono text-white tabular-nums">
                            {formatCOP(quoteSummary.transportTotal)}
                          </span>
                        </div>
                      )}
                      {requiresOperator && quoteSummary.operatorTotal > 0 && (
                        <div className="py-2 flex justify-between">
                          <span className="text-[#B8C1CC]">Operador certificado</span>
                          <span className="font-mono text-white tabular-nums">
                            {formatCOP(quoteSummary.operatorTotal)}
                          </span>
                        </div>
                      )}
                      <div className="py-2 flex justify-between">
                        <span className="text-[#B8C1CC]">IVA (19%)</span>
                        <span className="font-mono text-white tabular-nums">
                          {formatCOP(quoteSummary.taxAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-white">Total estimado</span>
                      <span className="font-mono text-xl font-bold text-[#FF5F00] tabular-nums">
                        {formatCOP(quoteSummary.grandTotal)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCheckoutWhatsApp}
                      className="w-full py-3.5 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enviar orden a despacho</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------
              VISTA 4: PATIO Y CONTACTO
              ---------------------------------------------------------------- */}
          {activeTab === "cuenta" && (
            <div className="space-y-3">
              <div className="bg-matte border border-storm-border p-4 flex items-center gap-3.5">
                <div className="relative w-14 h-14 border border-storm-border bg-[#16181B] shrink-0 overflow-hidden">
                  <Image src="/icons/icon-192-v3.png" alt="BRONTO®" fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-bold text-white leading-tight">
                    BRONTO® App de Obra
                  </h2>
                  <p className="text-xs text-[#B8C1CC] mt-0.5">
                    Renta directa de maquinaria y formación técnica en Bogotá y Sabana.
                  </p>
                </div>
              </div>

              {!isStandalone && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full p-4 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] flex items-center justify-between font-bold text-sm"
                >
                  <span className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Instalar aplicación en este teléfono</span>
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div className="bg-matte border border-storm-border divide-y divide-matte-border text-sm">
                <a
                  href={`tel:${siteConfig.contact.phoneFormatted}`}
                  className="p-4 flex items-center justify-between active:bg-storm-panel"
                >
                  <span className="flex items-center gap-3 text-white font-medium">
                    <Phone className="w-4 h-4 text-[#FF5F00] shrink-0" />
                    <span>Llamar a patio ({siteConfig.contact.phone})</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8E99A6]" />
                </a>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-between active:bg-storm-panel"
                >
                  <span className="flex items-center gap-3 text-white font-medium">
                    <MessageCircle className="w-4 h-4 text-[#FF5F00] shrink-0" />
                    <span>WhatsApp soporte de obra</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8E99A6]" />
                </a>

                <a
                  href="https://maps.google.com/?q=Bogota+Calle+80+Siberia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex items-center justify-between active:bg-storm-panel"
                >
                  <span className="flex items-center gap-3 text-white font-medium">
                    <MapPin className="w-4 h-4 text-[#FF5F00] shrink-0" />
                    <span>Patio Central Calle 80 / Siberia</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#8E99A6]" />
                </a>

                <Link
                  href="/"
                  className="p-4 flex items-center justify-between active:bg-storm-panel text-[#C4CCD4]"
                >
                  <span>Abrir sitio web de escritorio</span>
                  <ExternalLink className="w-4 h-4 text-[#8E99A6]" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ==================================================================
            3. BARRA FLOTANTE DE ORDEN ACTIVA (ESTILO APP NATIVA DE PEDIDOS)
            ================================================================== */}
        {mounted && totalCount > 0 && (activeTab === "renta" || activeTab === "cursos") && (
          <div className="absolute bottom-[68px] left-3.5 right-3.5 z-30">
            <button
              type="button"
              onClick={() => setActiveTab("pedido")}
              className="w-full h-12 px-4 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] shadow-2xl flex items-center justify-between font-bold text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 bg-[#111316] text-white font-mono text-xs tabular-nums">
                  {totalCount}
                </span>
                <span className="truncate">Ver orden de despacho</span>
              </div>
              <span className="font-mono text-sm tabular-nums shrink-0">
                {formatCOP(quoteSummary.equipmentTotal)}
              </span>
            </button>
          </div>
        )}

        {/* ==================================================================
            4. NATIVE BOTTOM TAB BAR FIJA (SIEMPRE VISIBLE EN EL SHELL)
            ================================================================== */}
        <nav
          aria-label="Navegación de la aplicación"
          className="shrink-0 w-full bg-matte border-t border-storm-border grid grid-cols-4 z-30"
          style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))" }}
        >
          {(
            [
              { id: "renta", label: "Equipos", Icon: HardHat },
              { id: "cursos", label: "Cursos", Icon: GraduationCap },
              { id: "pedido", label: "Orden", Icon: FileText, badge: mounted ? totalCount : 0 },
              { id: "cuenta", label: "Patio", Icon: Phone },
            ] as { id: AppTab; label: string; Icon: React.ElementType; badge?: number }[]
          ).map(({ id, label, Icon, badge }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`relative pt-2 pb-1 flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  active ? "text-[#FF5F00]" : "text-[#B8C1CC]"
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-4 right-4 h-0.5 bg-[#FF5F00]" />
                )}
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {badge && badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-[#FF5F00] text-[#111316] text-[10px] font-mono font-bold flex items-center justify-center tabular-nums">
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
            BOTTOM SHEET 1: SELECTOR DE FRENTE DE OBRA
            ================================================================== */}
        {showZoneSheet && (
          <div
            onClick={() => setShowZoneSheet(false)}
            className="absolute inset-0 z-50 bg-black/75 flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-matte border-t-2 border-[#FF5F00] p-5 space-y-3"
              style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom, 20px))" }}
            >
              <div className="w-10 h-1 bg-storm-border mx-auto mb-1" />
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-white">
                  Ubicación de su obra
                </h3>
                <button
                  type="button"
                  onClick={() => setShowZoneSheet(false)}
                  className="p-1 text-[#B8C1CC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="divide-y divide-matte-border border-y border-matte-border">
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
                      className="w-full py-3 flex items-center justify-between text-left"
                    >
                      <div>
                        <span
                          className={`text-sm font-semibold block ${
                            selected ? "text-[#FF5F00]" : "text-white"
                          }`}
                        >
                          {z.label}
                        </span>
                        <span className="text-xs text-[#8E99A6]">{z.eta}</span>
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
            BOTTOM SHEET 2: FICHA TÉCNICA DE EQUIPO
            ================================================================== */}
        {selectedProductSheet && (
          <div
            onClick={() => setSelectedProductSheet(null)}
            className="absolute inset-0 z-50 bg-black/75 flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[88dvh] bg-matte border-t-2 border-[#FF5F00] flex flex-col overflow-hidden"
              style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 16px))" }}
            >
              <div className="shrink-0 px-4 pt-3 pb-2.5 border-b border-matte-border flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF5F00] font-semibold">
                  {selectedProductSheet.sku} · {selectedProductSheet.subcategory}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProductSheet(null)}
                  className="p-1 text-[#B8C1CC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="relative aspect-[16/10] bg-matte-deep border border-matte-border overflow-hidden">
                  <Image
                    src={selectedProductSheet.images[0]?.url || "/brand/bronto-logo.png"}
                    alt={selectedProductSheet.name}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {selectedProductSheet.name}
                  </h3>
                  <p className="text-xs text-[#C4CCD4] mt-1.5 leading-relaxed">
                    {selectedProductSheet.shortDescription}
                  </p>
                </div>

                <div className="divide-y divide-matte-border border-y border-matte-border text-xs">
                  {selectedProductSheet.specifications.map((spec, idx) => (
                    <div key={idx} className="py-2 flex justify-between gap-3">
                      <span className="text-[#8E99A6]">{spec.label}</span>
                      <span className="font-mono text-white text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-xs font-semibold text-white block mb-2">
                    Plazo estimado de alquiler
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {["1 a 7 días", "15 días", "1 mes"].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setSheetDuration(dur)}
                        className={`py-2 text-xs font-semibold border ${
                          sheetDuration === dur
                            ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316] font-bold"
                            : "bg-storm-panel border-storm-border text-white"
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 px-4 pt-3 border-t border-matte-border flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-[#8E99A6] block">Tarifa base</span>
                  <span className="font-mono text-lg font-bold text-[#FF5F00] tabular-nums">
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
                  className="flex-1 py-3 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] font-bold text-sm"
                >
                  Agregar a la orden
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            BOTTOM SHEET 3: INSCRIPCIÓN DE CURSO
            ================================================================== */}
        {selectedCourseSheet && (
          <div
            onClick={() => setSelectedCourseSheet(null)}
            className="absolute inset-0 z-50 bg-black/75 flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-h-[88dvh] bg-matte border-t-2 border-[#FF5F00] p-4 space-y-3 overflow-y-auto"
              style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom, 20px))" }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-matte-border">
                <span className="text-xs font-semibold text-[#FF5F00]">
                  Inscripción Escuela de Operadores
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCourseSheet(null)}
                  className="p-1 text-[#B8C1CC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">
                  {selectedCourseSheet.title}
                </h3>
                <p className="text-xs text-[#B8C1CC] mt-1">
                  {selectedCourseSheet.duration} · {formatCOP(selectedCourseSheet.priceCOP)} / operador
                </p>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-[#C4CCD4] font-medium mb-1">
                    Nombre del responsable
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full h-11 px-3 bg-matte-deep border border-storm-border text-[16px] text-white rounded-none focus:border-[#FF5F00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#C4CCD4] font-medium mb-1">
                    Teléfono celular
                  </label>
                  <input
                    type="tel"
                    required
                    value={courseForm.phone}
                    onChange={(e) => setCourseForm({ ...courseForm, phone: e.target.value })}
                    className="w-full h-11 px-3 bg-matte-deep border border-storm-border text-[16px] text-white rounded-none focus:border-[#FF5F00] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs text-[#C4CCD4] font-medium mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={courseForm.company}
                      onChange={(e) => setCourseForm({ ...courseForm, company: e.target.value })}
                      className="w-full h-11 px-3 bg-matte-deep border border-storm-border text-[16px] text-white rounded-none focus:border-[#FF5F00] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#C4CCD4] font-medium mb-1">
                      Operadores
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={courseForm.traineesCount}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, traineesCount: e.target.value })
                      }
                      className="w-full h-11 px-3 bg-matte-deep border border-storm-border text-[16px] text-white rounded-none focus:border-[#FF5F00] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF5F00] active:bg-[#E55500] text-[#111316] font-bold text-sm"
                >
                  Confirmar cupos por WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================
            BOTTOM SHEET 4: INSTALACIÓN EN PANTALLA DE INICIO
            ================================================================== */}
        {showInstallSheet && (
          <div
            onClick={() => setShowInstallSheet(false)}
            className="absolute inset-0 z-50 bg-black/75 flex flex-col justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-matte border-t-2 border-[#FF5F00] p-5 space-y-4"
              style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom, 20px))" }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF5F00]">Instalar BRONTO®</span>
                <button
                  type="button"
                  onClick={() => setShowInstallSheet(false)}
                  className="p-1 text-[#B8C1CC]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 border border-storm-border bg-[#16181B] shrink-0 overflow-hidden">
                  <Image src="/icons/icon-192-v3.png" alt="BRONTO®" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">BRONTO®</h3>
                  <p className="text-xs text-[#B8C1CC]">
                    Acceso directo desde su pantalla principal como aplicación nativa.
                  </p>
                </div>
              </div>

              {isIOS ? (
                <div className="bg-matte-deep border border-matte-border p-3.5 text-xs space-y-1.5 text-[#E5EAF0]">
                  <strong className="text-[#FF5F00] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    En iPhone / Safari:
                  </strong>
                  <p>
                    1. Toque <strong>Compartir</strong>{" "}
                    <Share2 className="w-3.5 h-3.5 inline text-[#FF5F00]" /> en la barra de Safari.
                  </p>
                  <p>
                    2. Elija <strong>Agregar a inicio</strong> y pulse Agregar.
                  </p>
                </div>
              ) : (
                <div className="bg-matte-deep border border-matte-border p-3.5 text-xs space-y-1.5 text-[#E5EAF0]">
                  <strong className="text-[#FF5F00] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    En Android / Chrome:
                  </strong>
                  <p>1. Toque el menú de tres puntos arriba a la derecha.</p>
                  <p>
                    2. Seleccione <strong>Instalar aplicación</strong>.
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
