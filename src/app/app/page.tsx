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
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type AppTab = "renta" | "cursos" | "pedido" | "cuenta";

export default function BrontoAppPage() {
  const [activeTab, setActiveTab] = useState<AppTab>("renta");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedCity, setSelectedCity] = useState("Bogotá D.C.");
  const [requiresTransport, setRequiresTransport] = useState(true);
  const [requiresOperator, setRequiresOperator] = useState(false);

  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseItem | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
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
    isInBasket,
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
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        showToast("Aplicación BRONTO® instalada");
      }
    } else {
      setShowInstallModal(true);
    }
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

  const handleAddProduct = (product: Product, duration: string = "1 mes") => {
    addItem(product, 1, product.modality, duration);
    showToast(`Agregado a orden: ${product.name}`);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseModal) return;

    const message =
      `*INSCRIPCIÓN ESCUELA DE OPERADORES BRONTO®*\n\n` +
      `*Programa:* ${selectedCourseModal.title}\n` +
      `*Duración:* ${selectedCourseModal.duration}\n` +
      `*Responsable:* ${courseForm.name}\n` +
      `*Teléfono:* ${courseForm.phone}\n` +
      `*Empresa:* ${courseForm.company || "Independiente"}\n` +
      `*Participantes:* ${courseForm.traineesCount}\n\n` +
      `Solicito confirmar fechas disponibles de práctica.`;

    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSelectedCourseModal(null);
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
      text += `   Cantidad: ${item.quantity} | Plazo: ${item.estimatedDuration || "1 mes"} | Subtotal: ${formatCOP(
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

  return (
    <div
      className="min-h-screen bg-storm text-[#F5F7F9] font-sans antialiased"
      style={{ paddingBottom: "calc(82px + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Aviso flotante */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-matte border-2 border-[#FF5F00] text-white px-4 py-2.5 shadow-2xl flex items-center gap-2 text-xs font-semibold">
          <Check className="w-4 h-4 text-[#FF5F00] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          BARRA SUPERIOR DE LA APP — NEGRO MATE CON LOGO BRONTO® BLANCO
          ==================================================================== */}
      <header
        className="sticky top-0 z-40 bg-matte border-b-2 border-[#FF5F00] shadow-lg"
        style={{ paddingTop: "max(10px, env(safe-area-inset-top, 10px))" }}
      >
        <div className="max-w-6xl mx-auto px-4 pb-3 space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" />
              <span className="hidden sm:inline-block px-2 py-0.5 bg-storm-panel border border-storm-border text-[11px] font-semibold text-[#E5EAF0]">
                App de Renta y Academia
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isStandalone && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Instalar</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("pedido")}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-storm-panel border border-storm-border text-white text-xs font-semibold"
              >
                <FileText className="w-3.5 h-3.5 text-[#FF5F00]" />
                <span className="hidden xs:inline">Orden</span>
                <span className="px-1.5 py-0.2 bg-matte text-[#FF5F00] font-mono font-bold tabular-nums">
                  {mounted ? totalCount : 0}
                </span>
              </button>
            </div>
          </div>

          {/* Selector de municipio / frente + Navegación Desktop */}
          <div className="pt-2 border-t border-matte-border flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#C4CCD4]">
              <MapPin className="w-3.5 h-3.5 text-[#FF5F00] shrink-0" />
              <span>Entrega en:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-matte-deep border border-storm-border text-white text-xs px-2 py-1 focus:border-[#FF5F00] focus:outline-none"
              >
                <option value="Bogotá D.C.">Bogotá D.C.</option>
                <option value="Chía / Cajicá">Chía / Cajicá</option>
                <option value="Cota / Siberia">Cota / Siberia (Calle 80)</option>
                <option value="Funza / Mosquera / Madrid">Funza / Mosquera / Madrid</option>
                <option value="Soacha">Soacha</option>
              </select>
            </div>

            {/* Navegación rápida en pantallas medianas/grandes */}
            <div className="hidden md:flex items-center gap-1">
              {(
                [
                  { id: "renta", label: "Equipos en renta" },
                  { id: "cursos", label: "Cursos y certificaciones" },
                  { id: "pedido", label: `Orden (${mounted ? totalCount : 0})` },
                  { id: "cuenta", label: "Patio y contacto" },
                ] as { id: AppTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-xs font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#FF5F00] text-[#111316] font-bold"
                      : "bg-storm-panel text-[#E5EAF0] hover:bg-storm-elevated"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          CONTENIDO PRINCIPAL SOBRE GRIS TORMENTA (60%)
          ==================================================================== */}
      <main className="max-w-6xl mx-auto px-4 py-5 space-y-5">
        {/* Switcher principal Renta / Cursos visible en móvil */}
        {(activeTab === "renta" || activeTab === "cursos") && (
          <div className="bg-matte border border-storm-border p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setActiveTab("renta")}
                className={`py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors ${
                  activeTab === "renta"
                    ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316]"
                    : "bg-storm-panel border-storm-border text-white"
                }`}
              >
                <HardHat className="w-4 h-4" />
                <span>Renta de equipos</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("cursos")}
                className={`py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 border transition-colors ${
                  activeTab === "cursos"
                    ? "bg-[#FF5F00] border-[#FF5F00] text-[#111316]"
                    : "bg-storm-panel border-storm-border text-white"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Cursos operadores</span>
              </button>
            </div>

            {/* Buscador */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8E99A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === "renta"
                    ? "Buscar excavadora, minicargador, andamio, rana, planta..."
                    : "Buscar curso de excavadora, alturas Res. 4272, compactación..."
                }
                className="w-full h-11 pl-10 pr-9 bg-matte-deep border border-storm-border focus:border-[#FF5F00] text-sm text-white placeholder-[#8E99A6] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E99A6] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Categorías */}
            {activeTab === "renta" && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("todos")}
                  className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap border transition-colors ${
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
                    className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap border transition-colors ${
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

        {/* ==================================================================
            PESTAÑA 1: RENTA DE EQUIPOS
            ================================================================== */}
        {activeTab === "renta" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => {
              const primaryImg =
                product.images.find((img) => img.isPrimary)?.url ||
                product.images[0]?.url ||
                "/brand/bronto-logo.png";
              const inBasket = mounted && isInBasket(product.id);

              return (
                <article
                  key={product.id}
                  className="bg-matte border border-storm-border hover:border-[#FF5F00] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="px-4 py-2 bg-matte-deep border-b border-matte-border flex items-center justify-between text-xs">
                      <span className="font-mono text-[#B8C1CC]">{product.sku}</span>
                      <span className="text-emerald-400 font-medium">Disponible</span>
                    </div>

                    <div className="relative aspect-[16/10] bg-matte-deep overflow-hidden">
                      <Image
                        src={primaryImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-xs text-[#8E99A6] block">{product.subcategory}</span>
                        <h3 className="font-display text-2xl font-bold text-white leading-tight mt-0.5">
                          {product.name}
                        </h3>
                      </div>

                      <div className="divide-y divide-matte-border border-y border-matte-border text-xs">
                        {product.specifications.slice(0, 2).map((spec, idx) => (
                          <div key={idx} className="py-1.5 flex items-center justify-between gap-2">
                            <span className="text-[#8E99A6]">{spec.label}</span>
                            <span className="font-mono text-[#E5EAF0] text-right">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-[#8E99A6] block">Tarifa base</span>
                        <span className="font-mono text-lg font-bold text-[#FF5F00] tabular-nums">
                          {formatCOP(product.pricing.basePrice)}
                        </span>
                      </div>
                      <span className="text-xs text-[#B8C1CC]">/ {product.pricing.priceUnit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProductModal(product)}
                        className="px-3 py-2.5 bg-storm-panel hover:bg-storm-elevated border border-storm-border text-xs font-semibold text-white transition-colors"
                      >
                        Ficha técnica
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddProduct(product)}
                        className={`flex-1 py-2.5 px-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                          inBasket
                            ? "bg-emerald-600 text-white"
                            : "bg-[#FF5F00] hover:bg-[#E55500] text-[#111316]"
                        }`}
                      >
                        {inBasket ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>En orden</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Agregar a orden</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ==================================================================
            PESTAÑA 2: ESCUELA DE OPERADORES Y CURSOS
            ================================================================== */}
        {activeTab === "cursos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="bg-matte border border-storm-border p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-1 bg-storm-panel border border-storm-border text-white font-semibold">
                      {course.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#C4CCD4] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#FF5F00]" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-sm text-[#B8C1CC] leading-relaxed">{course.summary}</p>

                  <div className="p-3 bg-matte-deep border border-matte-border text-xs">
                    <span className="text-[#8E99A6] block">Equipos de práctica:</span>
                    <strong className="text-[#E5EAF0] mt-0.5 block">{course.targetMachines}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-matte-border flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#8E99A6] block">Valor por operador</span>
                    <span className="font-mono text-lg font-bold text-[#FF5F00] tabular-nums">
                      {formatCOP(course.priceCOP)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCourseModal(course)}
                    className="px-4 py-2.5 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] text-xs font-bold transition-colors"
                  >
                    Inscribir cuadrilla
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ==================================================================
            PESTAÑA 3: ORDEN DE DESPACHO Y LIQUIDACIÓN
            ================================================================== */}
        {activeTab === "pedido" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-matte border border-storm-border p-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Orden de cotización y despacho
                  </h2>
                  <p className="text-xs text-[#B8C1CC]">
                    {items.length} {items.length === 1 ? "referencia seleccionada" : "referencias seleccionadas"}
                  </p>
                </div>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="bg-matte border border-storm-border p-10 text-center space-y-4">
                  <p className="text-base font-semibold text-white">
                    Aún no ha seleccionado equipos para cotizar.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("renta")}
                    className="px-5 py-2.5 bg-[#FF5F00] text-[#111316] text-xs font-bold"
                  >
                    Explorar flota disponible
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const calc = calculateItemTotal(item, requiresOperator);
                    return (
                      <div
                        key={item.product.id}
                        className="bg-matte border border-storm-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-mono text-[#8E99A6]">
                            {item.product.sku}
                          </span>
                          <h4 className="font-display text-xl font-bold text-white leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-mono text-[#FF5F00] block tabular-nums">
                            Subtotal: {formatCOP(calc.equipmentSubtotal)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <select
                            value={item.estimatedDuration || "1 mes"}
                            onChange={(e) => updateDuration(item.product.id, e.target.value)}
                            className="bg-matte-deep border border-storm-border text-white text-xs px-2.5 py-2"
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
                              className="p-2 text-[#C4CCD4] hover:text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 text-[#C4CCD4] hover:text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-[#8E99A6] hover:text-rose-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Columna Derecha: Liquidación */}
            {items.length > 0 && (
              <div className="lg:col-span-5 bg-matte border border-storm-border p-5 space-y-4">
                <h3 className="font-display text-2xl font-bold text-white">
                  Resumen estimado de obra
                </h3>

                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3 bg-matte-deep border border-matte-border cursor-pointer text-xs">
                    <span className="flex items-center gap-2 text-white font-medium">
                      <Truck className="w-4 h-4 text-[#FF5F00]" />
                      Incluir transporte cama baja ({selectedCity})
                    </span>
                    <input
                      type="checkbox"
                      checked={requiresTransport}
                      onChange={(e) => setRequiresTransport(e.target.checked)}
                      className="w-4 h-4 accent-[#FF5F00]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-matte-deep border border-matte-border cursor-pointer text-xs">
                    <span className="flex items-center gap-2 text-white font-medium">
                      <HardHat className="w-4 h-4 text-[#FF5F00]" />
                      Incluir operador certificado
                    </span>
                    <input
                      type="checkbox"
                      checked={requiresOperator}
                      onChange={(e) => setRequiresOperator(e.target.checked)}
                      className="w-4 h-4 accent-[#FF5F00]"
                    />
                  </label>
                </div>

                <div className="divide-y divide-matte-border border-y border-matte-border text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-[#B8C1CC]">Subtotal equipos</span>
                    <span className="font-mono text-white tabular-nums">
                      {formatCOP(quoteSummary.equipmentTotal)}
                    </span>
                  </div>
                  {requiresTransport && (
                    <div className="py-2 flex justify-between">
                      <span className="text-[#B8C1CC]">Flete estimado</span>
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
                  className="w-full py-3.5 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirmar despacho por WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================
            PESTAÑA 4: PATIO Y SOPORTE
            ================================================================== */}
        {activeTab === "cuenta" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-matte border border-storm-border p-5 flex items-center gap-4">
              <div className="relative w-16 h-16 border border-storm-border bg-matte-deep shrink-0 overflow-hidden">
                <Image src="/icons/icon-192-v3.png" alt="BRONTO®" fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="font-display text-2xl font-bold text-white">
                  BRONTO® Aplicación Oficial
                </h2>
                <p className="text-xs text-[#B8C1CC]">
                  Acceso directo desde pantalla de inicio para residentes de obra, directores y jefes de compras.
                </p>
              </div>
            </div>

            {!isStandalone && (
              <div className="bg-matte border-l-4 border-l-[#FF5F00] border-y border-r border-storm-border p-5 space-y-3">
                <h3 className="font-display text-xl font-bold text-white">
                  Instalar en este dispositivo
                </h3>
                <p className="text-xs text-[#B8C1CC]">
                  Guarde BRONTO® en su pantalla principal con ícono de alto contraste y consulta rápida en obra.
                </p>
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="px-5 py-2.5 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] text-xs font-bold inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Instalar aplicación</span>
                </button>
              </div>
            )}

            <div className="bg-matte border border-storm-border divide-y divide-matte-border text-sm">
              <a
                href={`tel:${siteConfig.contact.phoneFormatted}`}
                className="p-4 flex items-center justify-between hover:bg-storm-panel transition-colors"
              >
                <span className="flex items-center gap-3 font-medium text-white">
                  <Phone className="w-4 h-4 text-[#FF5F00]" />
                  Línea directa de patio ({siteConfig.contact.phone})
                </span>
                <ExternalLink className="w-4 h-4 text-[#8E99A6]" />
              </a>

              <a
                href="https://maps.google.com/?q=Bogota+Calle+80+Siberia"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 flex items-center justify-between hover:bg-storm-panel transition-colors"
              >
                <span className="flex items-center gap-3 font-medium text-white">
                  <MapPin className="w-4 h-4 text-[#FF5F00]" />
                  Ubicación Corredor Calle 80 / Siberia
                </span>
                <ExternalLink className="w-4 h-4 text-[#8E99A6]" />
              </a>

              <Link
                href="/"
                className="p-4 flex items-center justify-between hover:bg-storm-panel transition-colors text-[#C4CCD4]"
              >
                <span>Ir al portal web corporativo BRONTO®</span>
                <ExternalLink className="w-4 h-4 text-[#8E99A6]" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* ====================================================================
          BARRA INFERIOR NATIVA MÓVIL
          ==================================================================== */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-matte border-t border-storm-border px-2 pt-1.5 flex items-center justify-around shadow-2xl"
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom, 8px))" }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("renta")}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold ${
            activeTab === "renta" ? "text-[#FF5F00]" : "text-[#B8C1CC]"
          }`}
        >
          <HardHat className="w-5 h-5" />
          <span>Equipos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cursos")}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold ${
            activeTab === "cursos" ? "text-[#FF5F00]" : "text-[#B8C1CC]"
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span>Cursos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pedido")}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold ${
            activeTab === "pedido" ? "text-[#FF5F00]" : "text-[#B8C1CC]"
          }`}
        >
          <div className="relative">
            <FileText className="w-5 h-5" />
            {mounted && totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-[#FF5F00] text-[#111316] text-[10px] font-mono font-bold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <span>Orden</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cuenta")}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold ${
            activeTab === "cuenta" ? "text-[#FF5F00]" : "text-[#B8C1CC]"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span>Patio</span>
        </button>
      </nav>

      {/* ====================================================================
          MODAL FICHA TÉCNICA DE EQUIPO
          ==================================================================== */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-matte border border-storm-border max-w-md w-full p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-matte-border">
              <span className="font-mono text-xs text-[#FF5F00] font-semibold">
                {selectedProductModal.sku}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProductModal(null)}
                className="p-1 text-[#B8C1CC] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-matte-deep border border-matte-border overflow-hidden">
              <Image
                src={selectedProductModal.images[0]?.url || "/brand/bronto-logo.png"}
                alt={selectedProductModal.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white">
                {selectedProductModal.name}
              </h3>
              <p className="text-xs text-[#B8C1CC] mt-1 leading-relaxed">
                {selectedProductModal.shortDescription}
              </p>
            </div>

            <div className="divide-y divide-matte-border border-y border-matte-border text-xs">
              {selectedProductModal.specifications.map((spec, idx) => (
                <div key={idx} className="py-2 flex justify-between gap-3">
                  <span className="text-[#8E99A6]">{spec.label}</span>
                  <span className="font-mono text-white text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs text-[#8E99A6] block">Tarifa base</span>
                <span className="font-mono text-lg font-bold text-[#FF5F00]">
                  {formatCOP(selectedProductModal.pricing.basePrice)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleAddProduct(selectedProductModal);
                  setSelectedProductModal(null);
                }}
                className="px-4 py-2.5 bg-[#FF5F00] text-[#111316] text-xs font-bold"
              >
                Agregar a orden
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL INSCRIPCIÓN DE CURSO
          ==================================================================== */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-matte border border-storm-border max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-matte-border">
              <span className="text-xs font-semibold text-[#FF5F00]">
                Inscripción Escuela de Operadores
              </span>
              <button
                type="button"
                onClick={() => setSelectedCourseModal(null)}
                className="p-1 text-[#B8C1CC] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white leading-tight">
                {selectedCourseModal.title}
              </h3>
              <p className="text-xs text-[#B8C1CC] mt-1">
                {selectedCourseModal.duration} · {formatCOP(selectedCourseModal.priceCOP)} / operador
              </p>
            </div>

            <form onSubmit={handleCourseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#C4CCD4] font-medium mb-1">
                  Nombre del responsable
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-matte-deep border border-storm-border text-white focus:border-[#FF5F00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#C4CCD4] font-medium mb-1">Teléfono celular</label>
                <input
                  type="tel"
                  required
                  value={courseForm.phone}
                  onChange={(e) => setCourseForm({ ...courseForm, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-matte-deep border border-storm-border text-white focus:border-[#FF5F00] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[#C4CCD4] font-medium mb-1">Constructora</label>
                  <input
                    type="text"
                    value={courseForm.company}
                    onChange={(e) => setCourseForm({ ...courseForm, company: e.target.value })}
                    className="w-full px-3 py-2.5 bg-matte-deep border border-storm-border text-white focus:border-[#FF5F00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#C4CCD4] font-medium mb-1">N° operadores</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={courseForm.traineesCount}
                    onChange={(e) => setCourseForm({ ...courseForm, traineesCount: e.target.value })}
                    className="w-full px-3 py-2.5 bg-matte-deep border border-storm-border text-white focus:border-[#FF5F00] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FF5F00] hover:bg-[#E55500] text-[#111316] font-bold text-xs"
              >
                Solicitar cupo por WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL INSTALACIÓN PWA (CON ÍCONO V3 DE TEXTO BLANCO)
          ==================================================================== */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-matte border-2 border-[#FF5F00] max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-matte-border">
              <span className="text-xs font-bold text-[#FF5F00]">Instalar aplicación BRONTO®</span>
              <button
                type="button"
                onClick={() => setShowInstallModal(false)}
                className="p-1 text-[#B8C1CC] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-2">
              <div className="relative w-20 h-20 mx-auto border border-storm-border bg-[#17191D] overflow-hidden">
                <Image src="/icons/icon-192-v3.png" alt="BRONTO®" fill className="object-cover" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">BRONTO®</h3>
              <p className="text-xs text-[#B8C1CC]">
                Agregue la aplicación a su pantalla principal para cotizar maquinaria e inscribir operadores desde obra.
              </p>
            </div>

            {isIOS ? (
              <div className="bg-matte-deep border border-matte-border p-3.5 text-xs space-y-1.5 text-[#E5EAF0]">
                <strong className="text-[#FF5F00] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  En iPhone / Safari:
                </strong>
                <p>
                  1. Toque <strong>Compartir</strong>{" "}
                  <Share2 className="w-3.5 h-3.5 inline text-[#FF5F00]" /> en la barra inferior.
                </p>
                <p>2. Seleccione <strong>Agregar a inicio</strong> y confirme.</p>
              </div>
            ) : (
              <div className="bg-matte-deep border border-matte-border p-3.5 text-xs space-y-1.5 text-[#E5EAF0]">
                <strong className="text-[#FF5F00] flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  En Android / Chrome:
                </strong>
                <p>1. Abra el menú de tres puntos del navegador.</p>
                <p>2. Toque <strong>Instalar aplicación</strong>.</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowInstallModal(false)}
              className="w-full py-2.5 bg-storm-panel hover:bg-storm-elevated text-white text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
