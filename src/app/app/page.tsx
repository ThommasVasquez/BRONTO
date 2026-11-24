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
  Share2, 
  Smartphone,
  ExternalLink,
  Award,
  Truck,
  Wrench,
  Fuel,
  Info,
  Radio,
  FileSpreadsheet
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
  const [selectedLocation, setSelectedLocation] = useState("Calle 80 / Sabana Norte (Chía/Cota)");
  
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

  const { items, addItem, removeItem, updateQuantity, clearBasket, totalCount } = useQuoteBasket();

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab") as AppTab;
      if (tabParam && ["renta", "cursos", "pedido", "cuenta"].includes(tabParam)) {
        setActiveTab(tabParam);
      }

      const runningStandalone = window.matchMedia("(display-mode: standalone)").matches ||
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
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
        showToast("Terminal BRONTO® instalada en pantalla");
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
    showToast(`Añadido a Manifiesto: ${product.name.slice(0, 24)}...`);
  };

  // Enviar inscripción de curso por WhatsApp
  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseModal) return;

    const message = `*SOLICITUD DE CERTIFICACIÓN TÉCNICA - BRONTO® ACADEMIA*\n\n` +
      `📌 *Curso / Certificación:* ${selectedCourseModal.title}\n` +
      `⏱️ *Carga Horaria:* ${selectedCourseModal.duration}\n` +
      `👤 *Responsable:* ${courseForm.name}\n` +
      `📱 *Contacto:* ${courseForm.phone}\n` +
      `🏢 *Empresa / Consorcio:* ${courseForm.company || "Independiente"}\n` +
      `👥 *N° Operadores:* ${courseForm.traineesCount}\n` +
      `📍 *Modalidad:* ${selectedCourseModal.modality}\n\n` +
      `Requiero validar cronograma de inicio y disponibilidad de pista de prueba.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573009123456?text=${encoded}`, "_blank");
    setSelectedCourseModal(null);
    showToast("Solicitud enviada a Coordinación Técnica");
  };

  // Enviar manifiesto de despacho por WhatsApp
  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let text = `*MANIFIESTO DE DESPACHO & RESERVA DE EQUIPOS - BRONTO®*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📍 *Frente de Obra:* ${selectedLocation}\n`;
    text += `📅 *Fecha:* ${new Date().toLocaleDateString("es-CO")} - ${new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `*DETALLE DE UNIDADES REQUERIDAS:*\n`;

    let totalEst = 0;
    items.forEach((item, idx) => {
      const price = item.product.pricing?.dailyRate || item.product.pricing?.monthlyRate || item.product.pricing?.basePrice || 0;
      totalEst += price * item.quantity;
      text += `[${idx + 1}] *${item.product.name.toUpperCase()}*\n`;
      text += `    • Cantidad: ${item.quantity} und\n`;
      text += `    • Régimen: ${item.estimatedDuration || "30 días"}\n`;
      text += `    • Tarifa Base: ${formatCOP(price, false)}\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*SUBTOTAL ESTIMADO EQUIPOS:* ${formatCOP(totalEst)}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Solicito confirmación de disponibilidad inmediata en patio y cotización de transporte en cama baja/grúa.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573009123456?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#1A1C21] text-[#F3F4F6] font-sans antialiased pb-28 md:pb-16 selection:bg-[#FF5F00] selection:text-black">
      
      {/* Toast de notificación técnica */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#101114] border-2 border-[#FF5F00] text-white px-4 py-2 rounded-none shadow-2xl flex items-center gap-2 text-xs font-mono tracking-wide uppercase">
          <CheckCircle2 className="w-4 h-4 text-[#FF5F00] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Shell Industrial de Campo */}
      <div 
        className="max-w-3xl mx-auto min-h-screen flex flex-col bg-[#101114] border-x border-[#2D313A] shadow-2xl"
        style={{
          paddingBottom: "calc(88px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        
        {/* ==================================================================== */}
        {/* TOP TERMINAL BAR: TELEMETRÍA Y CONTROL DE PATIO */}
        {/* ==================================================================== */}
        <header 
          className="sticky top-0 z-40 bg-[#141519]/98 backdrop-blur-md border-b-2 border-[#2D313A] px-4 py-3"
          style={{
            paddingTop: "max(14px, env(safe-area-inset-top, 14px))",
          }}
        >
          {/* Fila 1: Identidad Operativa y Manifiesto */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Logotipo de Maquinaria y Estado de Red */}
            <Link href="/" className="flex items-center gap-2.5 group" title="Ir al portal corporativo">
              <div className="w-9 h-9 bg-[#101114] border border-[#2D313A] text-[#FF5F00] flex items-center justify-center font-black rounded-none shadow-sm group-hover:border-[#FF5F00] transition-colors">
                <DynastesBeetleSymbol className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tighter text-white uppercase">BRONTO®</span>
                  <span className="bg-[#FF5F00] text-black text-[9px] font-black px-1 py-0.2 rounded-none uppercase font-mono tracking-wider">TERMINAL</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#94A3B8] font-mono">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse"></span>
                  <span className="uppercase tracking-wider">Patio Activo Calle 80</span>
                </div>
              </div>
            </Link>

            {/* Acciones de Cabecera */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-[#363B46] hover:border-[#FF5F00] bg-[#1A1C21] text-white text-[11px] font-mono uppercase tracking-wider transition-colors"
                title="Instalar terminal en pantalla"
              >
                <Download className="w-3.5 h-3.5 text-[#FF5F00]" />
                <span>Instalar App</span>
              </button>

              <button
                onClick={() => setActiveTab("pedido")}
                className={`relative px-3 py-1.5 border flex items-center gap-2 transition-colors font-mono text-xs ${
                  totalCount > 0 
                    ? "bg-[#1A1C21] border-[#FF5F00] text-[#FF5F00]" 
                    : "bg-[#101114] border-[#2D313A] text-white/70 hover:text-white"
                }`}
                title="Ver Manifiesto de Despacho"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span className="hidden xs:inline uppercase text-[10px] font-bold">Manifiesto</span>
                <span className="font-bold font-mono">[{totalCount}]</span>
              </button>
            </div>
          </div>

          {/* Fila 2: Selector de Frente de Obra & Indicador de Despacho */}
          <div className="mt-2.5 pt-2 border-t border-[#22252C] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <MapPin className="w-3.5 h-3.5 text-[#FF5F00] shrink-0" />
              <span className="text-[10px] uppercase text-white/60">Frente de Obra:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-[#101114] text-white font-medium text-[11px] border border-[#2D313A] rounded-none px-2 py-0.5 focus:outline-none focus:border-[#FF5F00] cursor-pointer"
              >
                <option value="Calle 80 / Sabana Norte (Chía/Cota)">Calle 80 / Sabana Norte (Chía/Cota)</option>
                <option value="Corredor Industrial Occidente (Funza/Mosquera/Madrid)">Corredor Industrial Occidente (Funza/Mosquera)</option>
                <option value="Bogotá Norte & Autopista (Suba/Usaquén/Tocancipá)">Bogotá Norte & Autopista (Suba/Usaquén)</option>
                <option value="Bogotá Sur & Conexión Soacha (Bosa/Kennedy/Siberia)">Bogotá Sur & Conexión Soacha (Bosa/Kennedy)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Despacho Patio &lt; 4h</span>
            </div>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* PANEL DE MANDO: SWITCHER OPERATIVO & BUSCADOR */}
        {/* ==================================================================== */}
        <div className="p-4 bg-[#141519] border-b border-[#2D313A]">
          
          {/* Selector de División: Maquinaria vs Certificaciones */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setActiveTab("renta")}
              className={`py-2.5 px-3 border text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "renta"
                  ? "bg-[#FF5F00] border-[#FF5F00] text-black shadow-sm"
                  : "bg-[#1A1C21] border-[#2D313A] text-white/70 hover:text-white hover:border-[#3D424F]"
              }`}
            >
              <HardHat className="w-4 h-4 stroke-[2.5]" />
              <span>01. Flota & Maquinaria</span>
            </button>

            <button
              onClick={() => setActiveTab("cursos")}
              className={`py-2.5 px-3 border text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "cursos"
                  ? "bg-[#FF5F00] border-[#FF5F00] text-black shadow-sm"
                  : "bg-[#1A1C21] border-[#2D313A] text-white/70 hover:text-white hover:border-[#3D424F]"
              }`}
            >
              <GraduationCap className="w-4 h-4 stroke-[2.5]" />
              <span>02. Certificaciones</span>
            </button>
          </div>

          {/* Buscador Técnico */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === "renta" ? "Filtrar por equipo: excavadora, rodillo, andamio, rana, bobcat..." : "Filtrar por certificación: alturas, minicargador, retroexcavadora..."}
              className="w-full pl-10 pr-9 py-2.5 bg-[#101114] border border-[#2D313A] focus:border-[#FF5F00] text-white text-xs rounded-none placeholder-[#64748B] font-mono focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtros de Categoría de Patio */}
          {activeTab === "renta" && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none no-scrollbar">
              <button
                onClick={() => setSelectedCategory("todos")}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider border whitespace-nowrap transition-colors ${
                  selectedCategory === "todos"
                    ? "bg-[#FF5F00] border-[#FF5F00] text-black font-bold"
                    : "bg-[#1A1C21] border-[#2D313A] text-[#94A3B8] hover:text-white"
                }`}
              >
                Todas las Líneas [{catalogProducts.length}]
              </button>
              {catalogCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider border whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#FF5F00] border-[#FF5F00] text-black font-bold"
                      : "bg-[#1A1C21] border-[#2D313A] text-[#94A3B8] hover:text-white"
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
        <main className="flex-1 p-4 bg-[#101114]">

          {/* ------------------------------------------------------------------ */}
          {/* TAB 1: RENTA DE EQUIPOS (HEAVY MACHINERY DATA SHEETS) */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "renta" && (
            <div className="space-y-4">
              
              {/* Notificación Operativa de Patio */}
              <div className="bg-[#141519] border-l-4 border-[#FF5F00] border-y border-r border-[#2D313A] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#FF5F00] animate-pulse shrink-0" />
                  <p className="text-xs text-white/90 font-mono">
                    <strong className="text-white">Patio Operativo:</strong> Disponibilidad inmediata con horómetro certificado y mantenimiento al día.
                  </p>
                </div>
                <button
                  onClick={() => window.open("https://wa.me/573009123456?text=Hola%20BRONTO,%20requiero%20verificar%20disponibilidad%20de%20maquinaria%20pesada%20en%20patio", "_blank")}
                  className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase tracking-wider font-mono shrink-0"
                >
                  WhatsApp Patio
                </button>
              </div>

              {/* Lista de Fichas de Maquinaria */}
              <div className="space-y-3.5">
                {filteredProducts.map((product) => {
                  const dayRate = product.pricing?.dailyRate;
                  const monthRate = product.pricing?.monthlyRate || product.pricing?.basePrice;
                  const primaryImg = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url || "/brand/bronto-logo.png";
                  const specs = product.specifications.slice(0, 3);

                  return (
                    <article
                      key={product.id}
                      className="bg-[#141519] border border-[#2D313A] hover:border-[#FF5F00]/70 transition-all p-3.5 group"
                    >
                      {/* Encabezado de la Ficha Técnica */}
                      <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#22252C]">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#94A3B8]">
                            <span className="text-[#FF5F00] font-bold">{product.sku}</span>
                            <span>•</span>
                            <span className="uppercase">{product.subcategory}</span>
                          </div>
                          <h3 className="font-black text-sm sm:text-base text-white uppercase tracking-tight mt-0.5 group-hover:text-[#FF5F00] transition-colors">
                            {product.name}
                          </h3>
                        </div>

                        <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
                          En Patio
                        </span>
                      </div>

                      {/* Cuerpo: Imagen Técnica + Data Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3">
                        {/* Fotografía de Obra Real */}
                        <div className="sm:col-span-5 relative h-36 sm:h-auto min-h-[120px] bg-[#0E0F12] border border-[#2D313A] overflow-hidden">
                          <Image
                            src={primaryImg}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, 240px"
                          />
                        </div>

                        {/* Parámetros Técnicos y Tarifas */}
                        <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                          {/* Parámetros Mecánicos */}
                          <div className="grid grid-cols-1 gap-1.5 bg-[#101114] border border-[#22252C] p-2 text-xs font-mono">
                            {specs.map((spec, i) => (
                              <div key={i} className="flex justify-between items-center text-[11px]">
                                <span className="text-[#94A3B8]">{spec.label}:</span>
                                <span className="font-bold text-white text-right">{spec.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tabla de Tarifas Oficiales */}
                          <div className="grid grid-cols-2 gap-2 bg-[#101114] border border-[#22252C] p-2">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Tarifa Turno (Día)</span>
                              <span className="text-sm font-black font-mono text-[#FF5F00]">
                                {dayRate ? formatCOP(dayRate) : "Consulte"}
                              </span>
                            </div>
                            <div className="border-l border-[#22252C] pl-2">
                              <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Tarifa Mensual</span>
                              <span className="text-sm font-black font-mono text-white">
                                {monthRate ? formatCOP(monthRate) : "A convenir"}
                              </span>
                            </div>
                          </div>

                          {/* Acciones de Obra */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => handleAddProduct(product, "30 días")}
                              className="flex-1 py-2 px-3 bg-[#FF5F00] hover:bg-[#E65500] text-black font-black text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 transition-all active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Añadir a Manifiesto</span>
                            </button>

                            <button
                              onClick={() => setSelectedProductModal(product)}
                              className="py-2 px-3 bg-[#1A1C21] hover:bg-[#22252C] text-white border border-[#2D313A] hover:border-[#FF5F00] font-mono text-xs uppercase tracking-wider transition-colors"
                              title="Ver ficha técnica completa"
                            >
                              Ficha
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 bg-[#141519] border border-[#2D313A] p-6 font-mono">
                    <HardHat className="w-10 h-10 text-white/30 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-white uppercase">Sin coincidencias en patio</h4>
                    <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto">
                      No encontramos equipos para ese criterio. Indique el requerimiento especial directamente al patio central.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-3 px-4 py-1.5 bg-[#FF5F00] text-black font-bold text-xs uppercase"
                    >
                      Restablecer Filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* TAB 2: CERTIFICACIONES DE OPERADORES & ALTURAS */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "cursos" && (
            <div className="space-y-4">
              
              {/* Manifiesto Normativo */}
              <div className="bg-[#141519] border border-[#2D313A] border-l-4 border-l-[#FF5F00] p-4 font-mono">
                <div className="flex items-center gap-2 text-[#FF5F00] font-black text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Academia Técnica de Operadores BRONTO®</span>
                </div>
                <h3 className="font-black text-white text-sm mt-1 uppercase">
                  Acreditaciones Técnicas Normativas (Resolución 4272 & Operación Pesada)
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Entrenamiento práctico en máquina real y pista de maniobras. Certificación de destreza para cuadrillas de contratistas con carnet y registro de idoneidad.
                </p>
              </div>

              {/* Lista de Certificaciones */}
              <div className="space-y-3.5">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#141519] border border-[#2D313A] hover:border-[#FF5F00]/70 p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#22252C]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#101114] text-[#FF5F00] border border-[#2D313A]">
                        {course.categoryLabel}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-mono flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#FF5F00]" />
                        {course.duration}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-white mt-2 leading-snug uppercase">
                      {course.title}
                    </h4>

                    <p className="text-xs text-[#94A3B8] mt-1.5">
                      {course.summary}
                    </p>

                    <div className="mt-3 bg-[#101114] p-2.5 border border-[#22252C] text-xs font-mono">
                      <span className="text-[#64748B] uppercase text-[10px] block">Equipos de entrenamiento:</span>
                      <span className="text-white font-medium">{course.targetMachines}</span>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-[#22252C]">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#94A3B8] block">Inversión / Operador</span>
                        <span className="text-sm font-black font-mono text-[#FF5F00]">
                          {formatCOP(course.priceCOP)}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedCourseModal(course)}
                        className="px-4 py-2 bg-[#FF5F00] hover:bg-[#E65500] text-black font-black text-xs uppercase tracking-wider font-mono flex items-center gap-1 transition-all active:scale-95"
                      >
                        <span>Inscribir Cuadrilla</span>
                        <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* TAB 3: MANIFIESTO DE DESPACHO & RESERVA (CARRITO) */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "pedido" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#2D313A] pb-3">
                <div>
                  <h3 className="font-black text-sm text-white uppercase tracking-wider font-mono">
                    Manifiesto de Despacho a Obra
                  </h3>
                  <p className="text-[11px] font-mono text-[#94A3B8]">
                    {items.length} {items.length === 1 ? "equipo consolidado" : "equipos consolidados"}
                  </p>
                </div>
                {items.length > 0 && (
                  <button
                    onClick={clearBasket}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono uppercase font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Limpiar Manifiesto</span>
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-16 bg-[#141519] border border-[#2D313A] p-6 font-mono">
                  <FileSpreadsheet className="w-12 h-12 text-[#94A3B8]/30 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-white uppercase">El manifiesto no tiene equipos</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-xs mx-auto">
                    Seleccione retroexcavadoras, andamios, minicargadores o plantas para consolidar su despacho en obra.
                  </p>
                  <button
                    onClick={() => setActiveTab("renta")}
                    className="mt-4 px-4 py-2 bg-[#FF5F00] text-black font-black text-xs uppercase tracking-wider font-mono"
                  >
                    Ver Flota de Patio
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
                        className="bg-[#141519] border border-[#2D313A] p-3 flex gap-3 items-center justify-between font-mono"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#FF5F00] font-bold uppercase">{item.product.sku}</span>
                          <h4 className="font-bold text-xs text-white uppercase line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-[#94A3B8] mt-0.5">
                            {formatCOP(price, false)} x {item.quantity} und • {item.estimatedDuration || "30 días"}
                          </div>
                          <div className="text-xs font-black text-[#FF5F00] mt-1">
                            Subtotal: {formatCOP(subtotal)}
                          </div>
                        </div>

                        {/* Cantidad de Unidades */}
                        <div className="flex items-center gap-1 bg-[#101114] border border-[#2D313A] p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center text-[#94A3B8] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#94A3B8] hover:text-white"
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

                  {/* Resumen de Despacho y Envío */}
                  <div className="mt-4 p-4 bg-[#141519] border-2 border-[#2D313A] space-y-2.5 font-mono">
                    <div className="flex justify-between text-xs text-[#94A3B8]">
                      <span>Frente de Obra Asignado:</span>
                      <span className="text-white font-bold">{selectedLocation.split("(")[0]}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#94A3B8]">
                      <span>Ventana de Despacho:</span>
                      <span className="text-emerald-400 font-bold">&lt; 4 Horas (Mismo día)</span>
                    </div>
                    <div className="pt-2 border-t border-[#22252C] flex justify-between items-baseline">
                      <span className="text-xs font-black text-white uppercase">Subtotal Base Estimado:</span>
                      <span className="text-base font-black text-[#FF5F00]">
                        {formatCOP(items.reduce((acc, curr) => {
                          const p = curr.product.pricing?.dailyRate || curr.product.pricing?.monthlyRate || curr.product.pricing?.basePrice || 0;
                          return acc + (p * curr.quantity);
                        }, 0))}
                      </span>
                    </div>

                    <button
                      onClick={handleCheckoutWhatsApp}
                      className="w-full mt-3 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 active:scale-98 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>Emitir Orden de Salida a Patio (WhatsApp)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------------ */}
          {/* TAB 4: ESTADO DE PATIO & SOPORTE TÉCNICO */}
          {/* ------------------------------------------------------------------ */}
          {activeTab === "cuenta" && (
            <div className="space-y-4 font-mono">
              
              {/* Tarjeta de Contratista / Jefe de Obra */}
              <div className="p-4 bg-[#141519] border border-[#2D313A] flex items-center gap-3">
                <div className="w-12 h-12 bg-[#101114] border border-[#FF5F00] text-[#FF5F00] flex items-center justify-center font-black text-lg">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white uppercase">Perfil de Contratista / Obra</h4>
                  <p className="text-xs text-[#94A3B8]">Acceso express a tarifas corporativas y telemetría</p>
                  <span className="inline-block mt-1 text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-2 py-0.2 font-bold uppercase">
                    Tarifa Mayorista Activa
                  </span>
                </div>
              </div>

              {/* Botón de Instalación */}
              <div className="p-4 bg-[#141519] border border-[#2D313A] border-l-4 border-l-[#FF5F00]">
                <div className="flex items-center gap-2 text-[#FF5F00] font-black text-xs uppercase">
                  <Smartphone className="w-4 h-4" />
                  <span>Instalar Terminal BRONTO® en Celular</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Acceso directo sin abrir navegador. Opera en frentes de obra con señal intermitente.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="mt-3 px-4 py-2 bg-[#FF5F00] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Instalar Aplicación</span>
                </button>
              </div>

              {/* Canales Directos de Despachador */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  Comunicaciones de Patio y Asistencia 24/7
                </div>

                <a
                  href="tel:+573009123456"
                  className="p-3 bg-[#141519] hover:bg-[#1A1C21] border border-[#2D313A] flex items-center justify-between text-xs font-bold text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Línea Directa de Urgencias de Obra (24 Horas)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </a>

                <button
                  onClick={() => window.open("https://maps.google.com/?q=Bogota+Calle+80", "_blank")}
                  className="w-full p-3 bg-[#141519] hover:bg-[#1A1C21] border border-[#2D313A] flex items-center justify-between text-xs font-bold text-white transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#FF5F00]" />
                    <span>Ubicación GPS: Patio Calle 80 / Autopista Medellín</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30" />
                </button>

                <Link
                  href="/"
                  className="p-3 bg-[#141519] hover:bg-[#1A1C21] border border-[#2D313A] flex items-center justify-between text-xs font-bold text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-[#94A3B8]" />
                    <span>Volver al Portal Web Principal BRONTO®</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </Link>
              </div>
            </div>
          )}

        </main>

        {/* ==================================================================== */}
        {/* NATIVE INDUSTRIAL FIELD BAR (CONTROL DE CABINA) */}
        {/* ==================================================================== */}
        <nav 
          className="fixed bottom-0 left-0 right-0 z-40 max-w-3xl mx-auto bg-[#141519]/98 backdrop-blur-md border-t-2 border-[#2D313A] px-2 pt-2 flex items-center justify-around shadow-2xl font-mono"
          style={{
            paddingBottom: "max(10px, env(safe-area-inset-bottom, 10px))",
          }}
        >
          
          <button
            onClick={() => setActiveTab("renta")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 transition-colors ${
              activeTab === "renta" ? "text-[#FF5F00] font-black border-t-2 border-[#FF5F00] -mt-2" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <HardHat className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] uppercase tracking-wider">Flota</span>
          </button>

          <button
            onClick={() => setActiveTab("cursos")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 transition-colors ${
              activeTab === "cursos" ? "text-[#FF5F00] font-black border-t-2 border-[#FF5F00] -mt-2" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] uppercase tracking-wider">Cursos</span>
          </button>

          <button
            onClick={() => setActiveTab("pedido")}
            className={`relative flex flex-col items-center gap-1 py-1.5 px-3 transition-colors ${
              activeTab === "pedido" ? "text-[#FF5F00] font-black border-t-2 border-[#FF5F00] -mt-2" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <div className="relative">
              <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#FF5F00] text-black text-[9px] font-black flex items-center justify-center font-mono">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider">Manifiesto</span>
          </button>

          <button
            onClick={() => setActiveTab("cuenta")}
            className={`flex flex-col items-center gap-1 py-1.5 px-3 transition-colors ${
              activeTab === "cuenta" ? "text-[#FF5F00] font-black border-t-2 border-[#FF5F00] -mt-2" : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] uppercase tracking-wider">Patio</span>
          </button>

        </nav>

        {/* ==================================================================== */}
        {/* MODAL FICHA TÉCNICA / DATA SHEET */}
        {/* ==================================================================== */}
        {selectedProductModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#141519] border-2 border-[#2D313A] max-w-md w-full p-5 text-white max-h-[90vh] overflow-y-auto space-y-4 font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[#22252C]">
                <span className="text-[10px] font-bold text-[#FF5F00] uppercase tracking-wider bg-[#101114] px-2 py-0.5 border border-[#2D313A]">
                  HOJA TÉCNICA • {selectedProductModal.sku}
                </span>
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="text-[#94A3B8] hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full h-48 bg-[#0E0F12] border border-[#2D313A] overflow-hidden">
                <Image
                  src={selectedProductModal.images.find(img => img.isPrimary)?.url || selectedProductModal.images[0]?.url || "/brand/bronto-logo.png"}
                  alt={selectedProductModal.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-black text-base text-white uppercase">{selectedProductModal.name}</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-sans">{selectedProductModal.shortDescription}</p>
              </div>

              <div className="bg-[#101114] p-3 border border-[#22252C] space-y-2">
                <div className="text-[10px] font-bold text-[#94A3B8] uppercase">Parámetros Mecánicos de Obra:</div>
                {selectedProductModal.specifications.map((spec, i) => (
                  <div key={i} className="text-xs text-white/90 flex justify-between border-b border-[#1A1C21] pb-1">
                    <span className="text-[#94A3B8]">{spec.label}:</span>
                    <span className="font-bold text-white text-right">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#22252C]">
                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase block">Tarifa Base Sugerida</span>
                  <span className="text-base font-black text-[#FF5F00]">
                    {formatCOP(selectedProductModal.pricing?.dailyRate || selectedProductModal.pricing?.monthlyRate || selectedProductModal.pricing?.basePrice || 0)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddProduct(selectedProductModal);
                    setSelectedProductModal(null);
                  }}
                  className="px-4 py-2 bg-[#FF5F00] hover:bg-[#E65500] text-black font-black text-xs uppercase tracking-wider"
                >
                  Añadir a Manifiesto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL INSCRIPCIÓN DE CERTIFICACIÓN */}
        {/* ==================================================================== */}
        {selectedCourseModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#141519] border-2 border-[#2D313A] max-w-md w-full p-5 text-white max-h-[90vh] overflow-y-auto space-y-4 font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[#22252C]">
                <span className="text-[10px] font-bold text-[#FF5F00] uppercase tracking-wider bg-[#101114] px-2 py-0.5 border border-[#2D313A]">
                  Acreditación de Cuadrilla
                </span>
                <button
                  onClick={() => setSelectedCourseModal(null)}
                  className="text-[#94A3B8] hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="font-black text-base text-white uppercase">{selectedCourseModal.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#94A3B8]">
                  <span>⏱️ {selectedCourseModal.duration}</span>
                  <span>•</span>
                  <span className="text-[#FF5F00] font-bold">{formatCOP(selectedCourseModal.priceCOP)} / operador</span>
                </div>
              </div>

              <form onSubmit={handleCourseSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#94A3B8] uppercase block mb-1">Nombre del Responsable / Residente:</label>
                  <input
                    type="text"
                    required
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    placeholder="Ej: Ing. Carlos Méndez"
                    className="w-full px-3 py-2 bg-[#101114] border border-[#2D313A] text-xs text-white focus:outline-none focus:border-[#FF5F00]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#94A3B8] uppercase block mb-1">Teléfono Móvil en Obra:</label>
                  <input
                    type="tel"
                    required
                    value={courseForm.phone}
                    onChange={(e) => setCourseForm({ ...courseForm, phone: e.target.value })}
                    placeholder="Ej: 310 123 4567"
                    className="w-full px-3 py-2 bg-[#101114] border border-[#2D313A] text-xs text-white focus:outline-none focus:border-[#FF5F00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#94A3B8] uppercase block mb-1">Empresa / Consorcio:</label>
                    <input
                      type="text"
                      value={courseForm.company}
                      onChange={(e) => setCourseForm({ ...courseForm, company: e.target.value })}
                      placeholder="Ej: Constructora Andina"
                      className="w-full px-3 py-2 bg-[#101114] border border-[#2D313A] text-xs text-white focus:outline-none focus:border-[#FF5F00]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#94A3B8] uppercase block mb-1">N° Operadores:</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={courseForm.traineesCount}
                      onChange={(e) => setCourseForm({ ...courseForm, traineesCount: e.target.value })}
                      className="w-full px-3 py-2 bg-[#101114] border border-[#2D313A] text-xs text-white focus:outline-none focus:border-[#FF5F00]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-2.5 bg-[#FF5F00] hover:bg-[#E65500] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Consultar Cupos por WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAL INSTRUCCIONES DE DESCARGA / PWA */}
        {/* ==================================================================== */}
        {showInstallModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#141519] border-2 border-[#FF5F00] max-w-sm w-full p-5 text-white space-y-4 font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[#22252C]">
                <span className="text-[10px] font-black text-[#FF5F00] uppercase tracking-wider">
                  Terminal de Campo BRONTO®
                </span>
                <button
                  onClick={() => setShowInstallModal(false)}
                  className="text-[#94A3B8] hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-2">
                <div className="relative w-16 h-16 overflow-hidden mx-auto mb-2 border-2 border-[#FF5F00] bg-[#101114]">
                  <Image
                    src="/icons/icon-192.png"
                    alt="BRONTO®"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-black text-base text-white tracking-wide uppercase">BRONTO® PWA</h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-sans">
                  Instala la terminal en la pantalla principal de tu teléfono para acceder a la flota de patio al instante.
                </p>
              </div>

              {isIOS ? (
                <div className="bg-[#101114] p-3.5 border border-[#2D313A] space-y-2 text-xs">
                  <div className="font-bold text-[#FF5F00] flex items-center gap-1.5 uppercase">
                    <Smartphone className="w-4 h-4" />
                    <span>En iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-white/80 text-[11px] font-sans">
                    <li>Toca el botón <strong>Compartir</strong> <Share2 className="w-3.5 h-3.5 inline mx-1 text-[#FF5F00]" /> en la barra inferior.</li>
                    <li>Desplaza y selecciona <strong>&quot;Agregar a inicio&quot;</strong>.</li>
                    <li>Confirma en la esquina superior derecha.</li>
                  </ol>
                </div>
              ) : (
                <div className="bg-[#101114] p-3.5 border border-[#2D313A] space-y-2 text-xs">
                  <div className="font-bold text-[#FF5F00] flex items-center gap-1.5 uppercase">
                    <Smartphone className="w-4 h-4" />
                    <span>En Android (Chrome):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-white/80 text-[11px] font-sans">
                    <li>Toca los <strong>3 puntos</strong> de la barra superior.</li>
                    <li>Selecciona <strong>&quot;Instalar aplicación&quot;</strong> o <strong>&quot;Agregar a pantalla principal&quot;</strong>.</li>
                  </ol>
                </div>
              )}

              <button
                onClick={() => setShowInstallModal(false)}
                className="w-full py-2.5 bg-[#22252C] hover:bg-[#2D313A] text-white font-bold text-xs uppercase transition-colors"
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
