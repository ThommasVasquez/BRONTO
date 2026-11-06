"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HardHat, 
  GraduationCap, 
  ShoppingCart, 
  User, 
  Search, 
  SlidersHorizontal, 
  Phone, 
  MessageCircle, 
  Download, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight, 
  X, 
  Sparkles, 
  Share2, 
  Smartphone,
  ExternalLink,
  Award,
  Truck,
  Wrench,
  Fuel,
  Info
} from "lucide-react";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { catalogProducts, catalogCategories } from "@/data/catalogData";
import { coursesData, CourseItem } from "@/data/coursesData";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { formatCOP } from "@/lib/pricing";
import { Product } from "@/types/catalog";

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
  const [selectedLocation, setSelectedLocation] = useState("Bogotá Norte & Sabana");
  
  // Modal states
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseItem | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states para curso
  const [courseForm, setCourseForm] = useState({
    name: "",
    phone: "",
    company: "",
    traineesCount: "1",
  });

  // PWA Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const { items, addItem, removeItem, updateQuantity, updateDuration, clearBasket, totalCount } = useQuoteBasket();

  useEffect(() => {
    setMounted(true);

    // Leer query param si existe ?tab=cursos o ?tab=renta
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab") as AppTab;
      if (tabParam && ["renta", "cursos", "pedido", "cuenta"].includes(tabParam)) {
        setActiveTab(tabParam);
      }

      // Check standalone
      const runningStandalone = window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(runningStandalone);

      // Check iOS
      const ua = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(ua));

      // Listen beforeinstallprompt
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
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        showToast("¡BRONTO App instalada con éxito!");
      }
    } else {
      setShowInstallModal(true);
    }
  };

  // Filtrado de maquinaria
  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specifications.some(s => s.value.toLowerCase().includes(searchQuery.toLowerCase()) || s.label.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.categoryId.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCat = selectedCategory === "todos" || p.categoryId === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  // Filtrado de cursos
  const filteredCourses = useMemo(() => {
    return coursesData.filter((c) => {
      return c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.targetMachines.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Agregar producto con feedback
  const handleAddProduct = (product: Product, duration: string = "30 días") => {
    addItem(product, 1, "alquiler", duration);
    showToast(`Agregado al pedido: ${product.name.slice(0, 24)}...`);
  };

  // Enviar inscripción de curso por WhatsApp
  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseModal) return;

    const message = `*SOLICITUD DE INSCRIPCIÓN - ACADEMIA BRONTO®*\n\n` +
      `🎓 *Curso:* ${selectedCourseModal.title}\n` +
      `⏱️ *Duración:* ${selectedCourseModal.duration}\n` +
      `👤 *Contacto:* ${courseForm.name}\n` +
      `📱 *Teléfono:* ${courseForm.phone}\n` +
      `🏢 *Empresa / Contratista:* ${courseForm.company || "Independiente"}\n` +
      `👥 *Cantidad de Operadores:* ${courseForm.traineesCount}\n` +
      `📍 *Sede:* ${selectedCourseModal.modality}\n\n` +
      `Por favor indíquenme fechas disponibles e inicio de cuadrilla.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573009123456?text=${encoded}`, "_blank");
    setSelectedCourseModal(null);
    showToast("¡Solicitud enviada a la Academia BRONTO!");
  };

  // Enviar cotización global por WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let text = `*SOLICITUD DE DESPACHO & ALQUILER - BRONTO® APP*\n\n`;
    text += `📍 *Ubicación de Obra:* ${selectedLocation}\n`;
    text += `📅 *Fecha:* ${new Date().toLocaleDateString("es-CO")}\n\n`;
    text += `*EQUIPOS SOLICITADOS:*\n`;

    let totalEst = 0;
    items.forEach((item, idx) => {
      const price = item.product.pricing?.dailyRate || item.product.pricing?.monthlyRate || item.product.pricing?.basePrice || 0;
      totalEst += price * item.quantity;
      text += `${idx + 1}. *${item.product.name}*\n`;
      text += `   • Cantidad: ${item.quantity} und\n`;
      text += `   • Duración: ${item.estimatedDuration || "30 días"}\n`;
      text += `   • Ref. Tarifa: ${formatCOP(price, false)} / período\n\n`;
    });

    text += `*Subtotal Estimado Equipos:* ${formatCOP(totalEst)}\n\n`;
    text += `Solicito confirmación de disponibilidad inmediata en patio y costo de transporte.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573009123456?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#F3F4F6] font-sans antialiased pb-24 md:pb-12 selection:bg-bronto-yellow selection:text-black">
      
      {/* Toast de notificación flotante */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] border-2 border-bronto-yellow text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce text-xs font-bold tracking-wide">
          <CheckCircle2 className="w-4 h-4 text-bronto-yellow shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* App Shell Wrapper (Optimizado para móvil y centrado estilizado en desktop) */}
      <div className="max-w-2xl mx-auto min-h-screen flex flex-col bg-[#121214] border-x border-[#222226] shadow-2xl">
        
        {/* ==================================================================== */}
        {/* TOP APP HEADER */}
        {/* ==================================================================== */}
        <header className="sticky top-0 z-40 bg-[#151515]/95 backdrop-blur-md border-b border-[#252528] px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            
            {/* Logo e Identidad App */}
            <div className="flex items-center gap-2.5">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-bronto-yellow text-[#151515] flex items-center justify-center font-black rounded-sm shadow-md group-hover:scale-105 transition-transform">
                  <DynastesBeetleSymbol className="w-6 h-6" colorFill="#151515" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-base tracking-tight text-white uppercase">BRONTO®</span>
                    <span className="bg-bronto-yellow text-[#151515] text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-wider">APP</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/50 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Patio Activo Calle 80</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Acciones Superiores: Ubicación & Botón de Descarga PWA */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-bronto-yellow to-[#FED800] hover:to-white text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm shadow-lg shadow-bronto-yellow/20 active:scale-95 transition-all"
                title="Descargar e instalar en tu celular"
              >
                <Download className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Descargar</span>
                <span>App</span>
              </button>

              <Link
                href="/cotizar"
                className="relative p-2 bg-[#1E1E22] border border-[#2E2E34] text-bronto-yellow hover:border-bronto-yellow rounded-sm transition-colors"
                title="Ver lista de cotización"
              >
                <ShoppingCart className="w-4 h-4" />
                {mounted && totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-bronto-yellow text-[#151515] text-[10px] font-black rounded-full flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Selector rápido de Zona de Obra */}
          <div className="mt-2.5 pt-2 border-t border-[#222226] flex items-center justify-between text-[11px] text-white/70">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-bronto-yellow shrink-0" />
              <span>Despachos inmediatos a:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-[#1A1A1E] text-white font-semibold text-[11px] border border-[#333338] rounded px-1.5 py-0.5 focus:outline-none focus:border-bronto-yellow cursor-pointer"
              >
                <option value="Bogotá Norte & Sabana">Bogotá Norte & Sabana (Suba/Usaquén/Chía)</option>
                <option value="Bogotá Occidente & Calle 80">Bogotá Occidente (Calle 80 / Engativá / Cota)</option>
                <option value="Bogotá Sur & Soacha">Bogotá Sur & Soacha (Kennedy / Bosa)</option>
                <option value="Corredor Industrial Funza">Corredor Funza / Mosquera / Madrid</option>
              </select>
            </div>
            <span className="hidden sm:inline text-emerald-400 font-semibold text-[10px] bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
              Entrega &lt; 4 hrs
            </span>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* BUSCADOR RÁPIDO & SWITCHER DE SECCIONES (RENTA VS CURSOS) */}
        {/* ==================================================================== */}
        <div className="p-4 bg-[#141416] border-b border-[#242428]">
          
          {/* Switcher de Pestañas Principales en Estilo App */}
          <div className="grid grid-cols-2 p-1 bg-[#1E1E22] rounded-lg border border-[#2D2D34] mb-3">
            <button
              onClick={() => setActiveTab("renta")}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-wider rounded-md transition-all ${
                activeTab === "renta"
                  ? "bg-bronto-yellow text-[#151515] shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Renta de Maquinaria</span>
            </button>

            <button
              onClick={() => setActiveTab("cursos")}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-wider rounded-md transition-all ${
                activeTab === "cursos"
                  ? "bg-bronto-yellow text-[#151515] shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Cursos & Academia</span>
            </button>
          </div>

          {/* Barra de Búsqueda Reactiva */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === "renta" ? "Buscar trompos, andamios, demoledores, bobcat..." : "Buscar curso de excavadora, alturas, HSE..."}
              className="w-full pl-9 pr-9 py-2 bg-[#1A1A1E] border border-[#2F2F36] focus:border-bronto-yellow text-white text-xs rounded-md placeholder-white/40 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtros de Categoría para Renta */}
          {activeTab === "renta" && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none no-scrollbar">
              <button
                onClick={() => setSelectedCategory("todos")}
                className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === "todos"
                    ? "bg-bronto-yellow text-[#151515]"
                    : "bg-[#1E1E22] text-white/70 hover:text-white border border-[#2D2D34]"
                }`}
              >
                Todos ({catalogProducts.length})
              </button>
              {catalogCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-bronto-yellow text-[#151515]"
                      : "bg-[#1E1E22] text-white/70 hover:text-white border border-[#2D2D34]"
                  }`}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================================== */}
        {/* CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
        {/* ==================================================================== */}
        <main className="flex-1 p-4">

          {/* ------------------------------------------------------------------ */}
          {/* TAB 1: RENTA DE EQUIPOS */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "renta" && (
            <div className="space-y-4">
              
              {/* Banner de Tracción Comercial Rápida */}
              <div className="bg-gradient-to-r from-bronto-carbon via-[#1A1A1E] to-[#25252A] p-3.5 rounded-lg border border-bronto-yellow/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-bronto-yellow font-black text-xs uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5 fill-bronto-yellow" />
                    <span>Despacho Exprés en Patio</span>
                  </div>
                  <p className="text-[11px] text-white/80 mt-0.5">
                    Tarifas mayoristas, equipos calibrados y soporte en obra.
                  </p>
                </div>
                <button
                  onClick={() => window.open("https://wa.me/573009123456?text=Hola%20BRONTO,%20necesito%20alquiler%20urgente%20de%20maquinaria", "_blank")}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[11px] rounded uppercase tracking-wider flex items-center gap-1 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Lista de Productos / Maquinaria */}
              <div className="space-y-3">
                {filteredProducts.map((product) => {
                  const dayRate = product.pricing?.dailyRate;
                  const monthRate = product.pricing?.monthlyRate || product.pricing?.basePrice;
                  const primaryImg = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || "/brand/bronto-logo.png";
                  const primarySpec = product.specifications[0] ? `${product.specifications[0].label}: ${product.specifications[0].value}` : "Uso industrial pesado";

                  return (
                    <div
                      key={product.id}
                      className="bg-[#17171A] border border-[#28282E] hover:border-bronto-yellow/50 rounded-lg p-3.5 transition-all shadow-md group"
                    >
                      <div className="flex gap-3">
                        {/* Imagen del Equipo */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-md overflow-hidden bg-[#202024] shrink-0 border border-[#2F2F36]">
                          <Image
                            src={primaryImg}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="120px"
                          />
                          <span className="absolute top-1 left-1 bg-black/80 backdrop-blur-xs text-bronto-yellow text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase">
                            Stock
                          </span>
                        </div>

                        {/* Información del Equipo */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="font-black text-xs sm:text-sm text-white line-clamp-1 group-hover:text-bronto-yellow transition-colors">
                                {product.name}
                              </h3>
                            </div>

                            <p className="text-[11px] text-white/50 line-clamp-1 mt-0.5">
                              {product.subcategory} • {primarySpec}
                            </p>

                            {/* Tarifas */}
                            <div className="mt-2 flex flex-wrap items-baseline gap-2">
                              {dayRate ? (
                                <div>
                                  <span className="text-[10px] text-white/40 uppercase block">Por Día</span>
                                  <span className="text-xs sm:text-sm font-black text-bronto-yellow">
                                    {formatCOP(dayRate)}
                                  </span>
                                </div>
                              ) : null}

                              {monthRate ? (
                                <div className="pl-2 border-l border-[#33333A]">
                                  <span className="text-[10px] text-white/40 uppercase block">Por Mes</span>
                                  <span className="text-xs sm:text-sm font-black text-white">
                                    {formatCOP(monthRate)}
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {/* Acciones Rápidas */}
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => handleAddProduct(product, "30 días")}
                              className="flex-1 py-1.5 px-2 bg-bronto-yellow hover:bg-[#FED800] text-[#151515] font-black text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-center gap-1 transition-all active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Agregar</span>
                            </button>

                            <button
                              onClick={() => setSelectedProductModal(product)}
                              className="py-1.5 px-2.5 bg-[#222228] hover:bg-[#2A2A32] text-white/80 hover:text-white font-bold text-[11px] rounded-sm border border-[#33333D] transition-colors"
                              title="Ver ficha técnica"
                            >
                              Ficha
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 bg-[#17171A] rounded-lg border border-[#28282E] p-6">
                    <HardHat className="w-10 h-10 text-white/20 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-white">No encontramos ese equipo</h4>
                    <p className="text-xs text-white/50 mt-1">
                      Intenta buscar &quot;mezcladora&quot;, &quot;andamio&quot;, &quot;demoledor&quot; o solicita el equipo especial directamente a patio.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-3 px-3 py-1.5 bg-[#2A2A30] text-bronto-yellow text-xs font-bold rounded"
                    >
                      Ver todo el catálogo
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* TAB 2: CURSOS Y ACADEMIA BRONTO */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "cursos" && (
            <div className="space-y-4">
              
              {/* Banner Informativo Academia */}
              <div className="bg-gradient-to-r from-[#171B26] via-[#141824] to-[#121214] p-4 rounded-lg border border-sky-500/30">
                <div className="flex items-center gap-2 text-sky-400 font-black text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Academia Técnica para Operadores</span>
                </div>
                <h3 className="font-black text-white text-sm mt-1">
                  Certificaciones Laborales & Destreza de Maquinaria
                </h3>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Cursos prácticos en patio y obra para operarios, ayudantes y cuadrillas. Cumplimiento de normas de seguridad, ahorro de combustible y carnet de acreditación.
                </p>
              </div>

              {/* Lista de Cursos */}
              <div className="space-y-3.5">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#17171A] border border-[#28282E] hover:border-sky-500/50 rounded-lg overflow-hidden transition-all shadow-md"
                  >
                    <div className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-sky-950/60 text-sky-400 border border-sky-800/40">
                          {course.categoryLabel}
                        </span>
                        <span className="text-[10px] text-white/50 flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3 text-bronto-yellow" />
                          {course.duration}
                        </span>
                      </div>

                      <h4 className="font-black text-sm text-white mt-2 leading-snug">
                        {course.title}
                      </h4>

                      <p className="text-xs text-white/60 mt-1 line-clamp-2">
                        {course.summary}
                      </p>

                      <div className="mt-3 bg-[#111114] p-2.5 rounded border border-[#232328] space-y-1 text-[11px]">
                        <div className="text-white/40 font-semibold uppercase text-[9px]">Maquinaria de práctica:</div>
                        <div className="text-white/80 font-medium">{course.targetMachines}</div>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-[#232328]">
                        <div>
                          <span className="text-[10px] text-white/40 block">Inversión / Operador</span>
                          <span className="text-sm font-black text-bronto-yellow">
                            {formatCOP(course.priceCOP)}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedCourseModal(course)}
                          className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-black font-black text-xs uppercase tracking-wider rounded-sm flex items-center gap-1 transition-all active:scale-95 shadow"
                        >
                          <span>Inscribir Cuadrilla</span>
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* TAB 3: MI PEDIDO / COTIZACIÓN */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "pedido" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#252528] pb-3">
                <div>
                  <h3 className="font-black text-sm text-white uppercase tracking-wider">
                    Lista de Maquinaria y Cursos
                  </h3>
                  <p className="text-[11px] text-white/50">
                    {items.length} {items.length === 1 ? "equipo agregado" : "equipos agregados"}
                  </p>
                </div>
                {items.length > 0 && (
                  <button
                    onClick={clearBasket}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar</span>
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-16 bg-[#17171A] rounded-lg border border-[#28282E] p-6">
                  <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-white">Tu lista de alquiler está vacía</h4>
                  <p className="text-xs text-white/50 mt-1 max-w-xs mx-auto">
                    Explora el catálogo y agrega trompos, andamios, rotomartillos o cursos para cotizar en segundos.
                  </p>
                  <button
                    onClick={() => setActiveTab("renta")}
                    className="mt-4 px-4 py-2 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider rounded"
                  >
                    Ir a Renta de Maquinaria
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const price = item.product.pricing?.dailyRate || item.product.pricing?.monthlyRate || item.product.pricing?.basePrice || 0;
                    const subtotal = price * item.quantity;

                    return (
                      <div
                        key={item.product.id}
                        className="bg-[#17171A] border border-[#28282E] rounded-lg p-3 flex gap-3 items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-white/50 mt-0.5">
                            {formatCOP(price, false)} x {item.quantity} und • {item.estimatedDuration || "30 días"}
                          </div>
                          <div className="text-xs font-black text-bronto-yellow mt-1">
                            Subtotal: {formatCOP(subtotal)}
                          </div>
                        </div>

                        {/* Controles de Cantidad */}
                        <div className="flex items-center gap-1 bg-[#101012] p-1 rounded border border-[#2C2C32]">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#202025] rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#202025] rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-white/30 hover:text-rose-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}

                  {/* Resumen y Checkout */}
                  <div className="mt-4 p-4 bg-[#1A1A1E] rounded-lg border border-[#2E2E36] space-y-2.5">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Destino de despacho:</span>
                      <span className="text-white font-semibold">{selectedLocation.split("(")[0]}</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Tiempo estimado entrega:</span>
                      <span className="text-emerald-400 font-bold">&lt; 4 horas (Mismo día)</span>
                    </div>
                    <div className="pt-2 border-t border-[#2C2C34] flex justify-between items-baseline">
                      <span className="text-xs font-black text-white uppercase">Total Estimado Base:</span>
                      <span className="text-base font-black text-bronto-yellow">
                        {formatCOP(items.reduce((acc, curr) => {
                          const p = curr.product.pricing?.dailyRate || curr.product.pricing?.monthlyRate || curr.product.pricing?.basePrice || 0;
                          return acc + (p * curr.quantity);
                        }, 0))}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckoutWhatsApp}
                      className="w-full mt-3 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>Confirmar Despacho por WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* TAB 4: SOPORTE DE PATIO & CUENTA */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "cuenta" && (
            <div className="space-y-4">
              
              {/* Tarjeta de Operador / Contratista */}
              <div className="p-4 bg-[#17171A] border border-[#28282E] rounded-lg flex items-center gap-3">
                <div className="w-12 h-12 bg-bronto-yellow text-[#151515] rounded-full flex items-center justify-center font-black text-lg">
                  <User className="w-6 h-6 text-[#151515]" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">Contratista / Operador BRONTO</h4>
                  <p className="text-xs text-white/50">Cuenta express para cotizaciones en obra</p>
                  <span className="inline-block mt-1 text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.2 rounded font-bold">
                    Tarifa Preferencial Activa
                  </span>
                </div>
              </div>

              {/* Botón de Instalación Destacado */}
              <div className="p-4 bg-gradient-to-r from-bronto-yellow/20 via-bronto-yellow/10 to-transparent border border-bronto-yellow/50 rounded-lg">
                <div className="flex items-center gap-2 text-bronto-yellow font-black text-xs uppercase">
                  <Smartphone className="w-4 h-4" />
                  <span>Instalar BRONTO en tu Pantalla</span>
                </div>
                <p className="text-xs text-white/80 mt-1">
                  Accede a la app directamente desde tu pantalla de inicio sin abrir el navegador. Funciona incluso con señal débil en obra.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="mt-3 px-4 py-2 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider rounded flex items-center gap-1.5 active:scale-95 transition-all shadow"
                >
                  <Download className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Descargar App Ahora</span>
                </button>
              </div>

              {/* Canales Directos de Patio & Emergencias */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider">
                  Líneas Directas de Atención
                </div>

                <a
                  href="tel:+573009123456"
                  className="p-3 bg-[#17171A] hover:bg-[#1E1E22] border border-[#28282E] rounded-lg flex items-center justify-between text-xs font-bold text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Llamada de Emergencia Obra (24/7)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </a>

                <button
                  onClick={() => window.open("https://maps.google.com/?q=Bogota+Calle+80", "_blank")}
                  className="w-full p-3 bg-[#17171A] hover:bg-[#1E1E22] border border-[#28282E] rounded-lg flex items-center justify-between text-xs font-bold text-white transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-bronto-yellow" />
                    <span>Ubicación Patio Central Calle 80</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30" />
                </button>

                <Link
                  href="/"
                  className="p-3 bg-[#17171A] hover:bg-[#1E1E22] border border-[#28282E] rounded-lg flex items-center justify-between text-xs font-bold text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-sky-400" />
                    <span>Volver a la Web Corporativa BRONTO®</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </Link>
              </div>
            </div>
          )}

        </main>

        {/* ==================================================================== */}
        {/* BOTTOM APP NAVIGATION BAR (NATIVE MOBILE FEEL) */}
        {/* ==================================================================== */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-2xl mx-auto bg-[#141416]/95 backdrop-blur-lg border-t border-[#26262B] px-2 py-2 flex items-center justify-around shadow-2xl">
          
          <button
            onClick={() => setActiveTab("renta")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded transition-colors ${
              activeTab === "renta" ? "text-bronto-yellow font-black" : "text-white/50 hover:text-white"
            }`}
          >
            <HardHat className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider">Renta</span>
          </button>

          <button
            onClick={() => setActiveTab("cursos")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded transition-colors ${
              activeTab === "cursos" ? "text-bronto-yellow font-black" : "text-white/50 hover:text-white"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider">Cursos</span>
          </button>

          <button
            onClick={() => setActiveTab("pedido")}
            className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded transition-colors ${
              activeTab === "pedido" ? "text-bronto-yellow font-black" : "text-white/50 hover:text-white"
            }`}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-bronto-yellow text-[#151515] text-[9px] font-black rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider">Pedido</span>
          </button>

          <button
            onClick={() => setActiveTab("cuenta")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded transition-colors ${
              activeTab === "cuenta" ? "text-bronto-yellow font-black" : "text-white/50 hover:text-white"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider">Cuenta</span>
          </button>

        </nav>

        {/* ==================================================================== */}
        {/* MODAL DETALLES PRODUCTO */}
        {/* ==================================================================== */}
        {selectedProductModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#18181B] border border-[#2F2F36] rounded-xl max-w-sm w-full p-5 text-white max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-bronto-yellow uppercase tracking-wider bg-bronto-yellow/10 px-2 py-0.5 rounded">
                  {selectedProductModal.subcategory}
                </span>
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="text-white/50 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-44 rounded-lg overflow-hidden bg-[#222]">
                <Image
                  src={selectedProductModal.images.find(img => img.isPrimary)?.url || selectedProductModal.images[0]?.url || "/brand/bronto-logo.png"}
                  alt={selectedProductModal.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-black text-base text-white">{selectedProductModal.name}</h3>
                <p className="text-xs text-white/70 mt-1">{selectedProductModal.shortDescription}</p>
              </div>

              <div className="bg-[#111114] p-3 rounded-lg border border-[#26262C] space-y-1.5">
                <div className="text-[10px] font-bold text-white/40 uppercase">Especificaciones Técnicas:</div>
                {selectedProductModal.specifications.map((spec, i) => (
                  <div key={i} className="text-xs text-white/80 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-bronto-yellow shrink-0" />
                    <span><strong>{spec.label}:</strong> {spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#2C2C34]">
                <div>
                  <span className="text-[10px] text-white/40 uppercase block">Tarifa sugerida</span>
                  <span className="text-base font-black text-bronto-yellow">
                    {formatCOP(selectedProductModal.pricing?.dailyRate || selectedProductModal.pricing?.monthlyRate || selectedProductModal.pricing?.basePrice || 0)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddProduct(selectedProductModal);
                    setSelectedProductModal(null);
                  }}
                  className="px-4 py-2 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider rounded"
                >
                  Agregar a Pedido
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL INSCRIPCIÓN DE CURSO */}
        {/* ==================================================================== */}
        {selectedCourseModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#18181B] border border-sky-500/40 rounded-xl max-w-sm w-full p-5 text-white max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider bg-sky-950/60 px-2 py-0.5 rounded">
                  Inscripción Academia
                </span>
                <button
                  onClick={() => setSelectedCourseModal(null)}
                  className="text-white/50 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="font-black text-base text-white">{selectedCourseModal.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                  <span>⏱️ {selectedCourseModal.duration}</span>
                  <span>•</span>
                  <span className="text-bronto-yellow font-bold">{formatCOP(selectedCourseModal.priceCOP)}</span>
                </div>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-3 pt-2 border-t border-[#2C2C34]">
                <div>
                  <label className="text-[11px] font-bold text-white/60 block mb-1">Nombre del Encargado / Operador:</label>
                  <input
                    type="text"
                    required
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    placeholder="Ej. Carlos Martínez"
                    className="w-full px-3 py-2 bg-[#121214] border border-[#2E2E36] rounded text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 block mb-1">WhatsApp / Teléfono de Contacto:</label>
                  <input
                    type="tel"
                    required
                    value={courseForm.phone}
                    onChange={(e) => setCourseForm({ ...courseForm, phone: e.target.value })}
                    placeholder="Ej. 310 123 4567"
                    className="w-full px-3 py-2 bg-[#121214] border border-[#2E2E36] rounded text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-white/60 block mb-1">Empresa / Obra:</label>
                    <input
                      type="text"
                      value={courseForm.company}
                      onChange={(e) => setCourseForm({ ...courseForm, company: e.target.value })}
                      placeholder="Ej. Consorcio Sabana"
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2E2E36] rounded text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-white/60 block mb-1">Operadores:</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={courseForm.traineesCount}
                      onChange={(e) => setCourseForm({ ...courseForm, traineesCount: e.target.value })}
                      className="w-full px-3 py-2 bg-[#121214] border border-[#2E2E36] rounded text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-2.5 bg-sky-500 hover:bg-sky-400 text-black font-black text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Solicitar Cupo por WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL INSTRUCCIONES DE DESCARGA / INSTALACIÓN PWA */}
        {/* ==================================================================== */}
        {showInstallModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#18181B] border-2 border-bronto-yellow rounded-xl max-w-sm w-full p-5 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-bronto-yellow uppercase tracking-wider">
                  Instalación de la App
                </span>
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="text-white/50 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-2">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden mx-auto mb-2 border-2 border-bronto-yellow shadow-xl bg-[#151515]">
                  <Image
                    src="/icons/icon-192.png"
                    alt="BRONTO®"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-black text-base text-white tracking-wide uppercase">BRONTO®</h3>
                <p className="text-xs text-white/70 mt-1">
                  Guarda la aplicación en tu pantalla de inicio para acceso instantáneo a renta de maquinaria y cursos.
                </p>
              </div>

              {isIOS ? (
                <div className="bg-[#111114] p-3.5 rounded-lg border border-[#2D2D34] space-y-2 text-xs">
                  <div className="font-bold text-bronto-yellow flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>Pasos para iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-white/80 text-[11px]">
                    <li>Toca el botón <strong>Compartir</strong> <Share2 className="w-3.5 h-3.5 inline mx-1" /> en la barra inferior de Safari.</li>
                    <li>Baja en el menú y selecciona <strong>&quot;Agregar a inicio&quot;</strong>.</li>
                    <li>Toca <strong>&quot;Agregar&quot;</strong> en la esquina superior derecha.</li>
                  </ol>
                </div>
              ) : (
                <div className="bg-[#111114] p-3.5 rounded-lg border border-[#2D2D34] space-y-2 text-xs">
                  <div className="font-bold text-bronto-yellow flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>En Android / Google Chrome:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-white/80 text-[11px]">
                    <li>Toca los <strong>3 puntos</strong> de la esquina superior derecha del navegador.</li>
                    <li>Selecciona <strong>&quot;Instalar aplicación&quot;</strong> o <strong>&quot;Agregar a pantalla principal&quot;</strong>.</li>
                  </ol>
                </div>
              )}

              <button
                onClick={() => setShowInstallModal(false)}
                className="w-full py-2.5 bg-[#25252A] hover:bg-[#2F2F36] text-white font-bold text-xs uppercase rounded transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
