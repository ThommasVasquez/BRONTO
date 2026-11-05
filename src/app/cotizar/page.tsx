"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { siteConfig } from "@/data/siteConfig";
import { QuoteFormData } from "@/types/quote";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { formatCOP, computeQuoteSummary, calculateItemTotal, transportRatesByZone } from "@/lib/pricing";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { 
  FileText, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Info,
  Printer,
  Calculator,
  ShieldCheck,
  Truck,
  HardHat,
  Tag
} from "lucide-react";

export default function QuotePage() {
  const { items, removeItem, updateQuantity, updateDuration, clearBasket, totalCount } = useQuoteBasket();

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: "",
    companyName: "",
    taxId: "",
    email: "",
    phone: "",
    city: "Bogotá D.C.",
    deliveryAddress: "",
    projectType: "edificacion",
    startDate: "",
    estimatedDuration: "1 mes",
    observations: "",
    requiresTransport: true,
    requiresOperator: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Cálculo en tiempo real con +10% de tarifas de referencia
  const summary = computeQuoteSummary(
    items,
    formData.requiresOperator,
    formData.requiresTransport,
    formData.city
  );

  // Construir mensaje estructurado para WhatsApp Business con desglose financiero
  const buildWhatsAppMessage = (refId: string) => {
    let msg = `*COTIZACIÓN EN LÍNEA BRONTO - REF: ${refId}*\n\n`;
    msg += `*Cliente:* ${formData.fullName}\n`;
    msg += `*Empresa:* ${formData.companyName || "N/A"} (NIT: ${formData.taxId || "N/A"})\n`;
    msg += `*Teléfono:* ${formData.phone}\n`;
    msg += `*Email:* ${formData.email}\n`;
    msg += `*Ciudad / Destino:* ${formData.city}\n`;
    msg += `*Dirección de Obra:* ${formData.deliveryAddress || "A convenir"}\n`;
    msg += `*Tipo de Proyecto:* ${formData.projectType.toUpperCase()}\n`;
    msg += `*Fecha estimada inicio:* ${formData.startDate || "Inmediata"}\n`;
    msg += `*Transporte:* ${formData.requiresTransport ? "SÍ (Flete incluido)" : "NO"}\n`;
    msg += `*Operador:* ${formData.requiresOperator ? "SÍ (Certificado)" : "NO"}\n\n`;
    
    msg += `*DETALLE DE EQUIPOS Y MATERIALES:*\n`;
    items.forEach((item, idx) => {
      const itemCalc = calculateItemTotal(item, formData.requiresOperator);
      msg += `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku})\n`;
      msg += `   - Cantidad: ${item.quantity} | Modalidad: ${item.modality.toUpperCase()}\n`;
      msg += `   - Plazo: ${item.estimatedDuration || "1 mes"}\n`;
      msg += `   - Tarifa ref: ${formatCOP(itemCalc.unitPrice)} / ${itemCalc.priceBasis}\n`;
      msg += `   - Subtotal ítem: ${formatCOP(itemCalc.equipmentSubtotal)}\n`;
    });

    msg += `\n*RESUMEN FINANCIERO ESTIMADO:*\n`;
    msg += `- Subtotal Equipos: ${formatCOP(summary.equipmentTotal)}\n`;
    if (formData.requiresOperator && summary.operatorTotal > 0) {
      msg += `- Subtotal Operadores: ${formatCOP(summary.operatorTotal)}\n`;
    }
    if (formData.requiresTransport) {
      msg += `- Flete Logístico (${formData.city}): ${formatCOP(summary.transportTotal)}\n`;
    }
    if (summary.discountAmount > 0) {
      msg += `- Descuento Corporativo: -${formatCOP(summary.discountAmount)}\n`;
    }
    msg += `- Subtotal antes de IVA: ${formatCOP(summary.subtotalBeforeTax)}\n`;
    msg += `- IVA (19%): ${formatCOP(summary.taxAmount)}\n`;
    msg += `*TOTAL ESTIMADO: ${formatCOP(summary.grandTotal)}*\n`;

    if (formData.observations.trim()) {
      msg += `\n*Observaciones:* ${formData.observations}\n`;
    }

    msg += `\n_Generado automáticamente desde el Cotizador en Línea de BRONTO (bronto.com.co)._`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Por favor agregue al menos un equipo o material del catálogo para cotizar.");
      return;
    }

    setIsSubmitting(true);
    const refId = `BRT-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRefId(refId);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 600);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWhatsAppMessage(generatedRefId || "DIRECTA")}`;
    window.open(waUrl, "_blank");
  };

  const handlePrintQuote = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        <Breadcrumbs items={[{ label: "Cotizador en Línea" }]} />

        {/* Cabecera */}
        <div className="py-8 border-b border-[#242424] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#202020] border border-bronto-yellow/40 text-[11px] font-bold uppercase text-bronto-yellow tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Cotizador en Línea con Tarifas Actualizadas (+10%)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Cotizador en Línea
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-2xl font-normal">
              Calcule al instante el costo estimado de alquiler de maquinaria, equipos y suministros para su frente de obra en Bogotá y la Sabana.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-xs uppercase font-bold text-bronto-yellow hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explorar más equipos</span>
            </Link>
          </div>
        </div>

        {/* Pantalla de Confirmación de Cotización */}
        {submissionSuccess ? (
          <div className="my-12 max-w-3xl mx-auto bg-[#1A1A1A] border-2 border-bronto-yellow p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-bronto-yellow/10 border border-bronto-yellow rounded-full flex items-center justify-center mx-auto text-bronto-yellow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-bronto-yellow tracking-widest block">
                Propuesta Comercial Generada
              </span>
              <h2 className="uppercase text-3xl sm:text-4xl font-black text-white mt-1">
                ¡Cotización Lista y Radicada!
              </h2>
              <p className="mt-2 text-sm text-white/80 font-mono">
                Radicado No: <strong className="text-bronto-yellow text-base">{generatedRefId}</strong>
              </p>
            </div>

            {/* Resumen Financiero Generado */}
            <div className="p-6 bg-black/50 border border-[#333333] text-left text-xs text-white/80 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Cliente / Empresa:</span>
                <strong className="text-white">{formData.fullName} {formData.companyName ? `(${formData.companyName})` : ""}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Destino de Entrega:</span>
                <strong className="text-white">{formData.city}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">Subtotal Neto:</span>
                <span className="font-mono">{formatCOP(summary.subtotalBeforeTax)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/60">IVA (19%):</span>
                <span className="font-mono">{formatCOP(summary.taxAmount)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-sm font-bold">
                <span className="text-white">TOTAL ESTIMADO COP:</span>
                <span className="text-bronto-yellow text-lg font-black font-mono">{formatCOP(summary.grandTotal)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Enviar cotización a WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handlePrintQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-bronto-yellow text-bronto-yellow hover:bg-bronto-yellow hover:text-black font-black text-xs uppercase tracking-wider transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Guardar PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmissionSuccess(false);
                  clearBasket();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#333333] hover:border-white text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <span>Nueva cotización</span>
              </button>
            </div>
          </div>
        ) : (
          /* Flujo Principal: Lista de Equipos con Precios + Resumen Financiero + Formulario */
          <form onSubmit={handleSubmit} className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* COLUMNA IZQUIERDA: RESUMEN DE EQUIPOS Y PRECIOS (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="uppercase text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-bronto-yellow" />
                  <span>Ítems Seleccionados ({items.length})</span>
                </h2>

                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="text-xs text-white/50 hover:text-red-400 transition-colors"
                  >
                    Vaciar lista
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="p-10 bg-[#181818] border border-[#2B2B2B] text-center space-y-4">
                  <Calculator className="w-12 h-12 text-bronto-yellow/50 mx-auto" />
                  <p className="text-sm uppercase font-semibold text-white/80">
                    No tiene equipos en su lista de cotización.
                  </p>
                  <p className="text-xs text-white/60 max-w-md mx-auto font-normal">
                    Navegue por el catálogo de maquinaria, encofrados o concretos y agregue los equipos para ver el cálculo financiero en tiempo real.
                  </p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Explorar catálogo con precios</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const itemCalc = calculateItemTotal(item, formData.requiresOperator);
                    return (
                      <div
                        key={item.product.id}
                        className="bg-[#181818] border border-[#2B2B2B] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-black overflow-hidden shrink-0 relative">
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url('${item.product.images[0]?.url}')` }}
                            />
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-white/50 tracking-wider uppercase font-mono">
                              {item.product.sku}
                            </span>
                            <h4 className="uppercase text-sm sm:text-base font-bold text-white leading-tight">
                              {item.product.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-[11px] font-mono text-bronto-yellow font-bold">
                                {formatCOP(itemCalc.unitPrice)} / {itemCalc.priceBasis}
                              </span>
                              <span className="text-[10px] uppercase text-white/50 bg-[#252525] px-1.5 py-0.5">
                                {item.modality}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Controles de cantidad, duración y subtotal del ítem */}
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <div className="flex items-center border border-[#333333] bg-black/40">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 text-white/70 hover:text-white"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-white font-mono">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 text-white/70 hover:text-white"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <select
                            value={item.estimatedDuration || "1 mes"}
                            onChange={(e) => updateDuration(item.product.id, e.target.value)}
                            className="bg-black/40 border border-[#333333] text-white text-xs py-1.5 px-2 font-medium"
                          >
                            <option value="1 a 7 días">1 a 7 días</option>
                            <option value="15 días">15 días</option>
                            <option value="1 mes">1 mes</option>
                            <option value="3 meses">3 meses</option>
                            <option value="6+ meses">6+ meses</option>
                          </select>

                          {/* Subtotal del ítem */}
                          <div className="text-right min-w-[100px] hidden sm:block">
                            <span className="text-[10px] text-white/50 block uppercase">Subtotal:</span>
                            <strong className="text-xs text-white font-mono font-bold">
                              {formatCOP(itemCalc.equipmentSubtotal)}
                            </strong>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-white/40 hover:text-red-400 transition-colors"
                            aria-label="Eliminar equipo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Opciones Adicionales de Cotización */}
              <div className="bg-[#181818] border border-[#2B2B2B] p-5 space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Servicios Opcionales en Obra (Cálculo Instantáneo)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-3 bg-black/40 border border-[#333333] cursor-pointer hover:border-bronto-yellow transition-colors">
                    <input
                      type="checkbox"
                      name="requiresTransport"
                      checked={formData.requiresTransport}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-bronto-yellow mt-0.5"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-bronto-yellow" />
                        <span>Transporte / Cama Baja</span>
                      </span>
                      <span className="text-white/60 text-[11px] block mt-0.5">
                        Despacho a {formData.city}: <strong>{formatCOP(summary.transportTotal)}</strong>
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-black/40 border border-[#333333] cursor-pointer hover:border-bronto-yellow transition-colors">
                    <input
                      type="checkbox"
                      name="requiresOperator"
                      checked={formData.requiresOperator}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-bronto-yellow mt-0.5"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block flex items-center gap-1.5">
                        <HardHat className="w-3.5 h-3.5 text-bronto-yellow" />
                        <span>Operador Calificado</span>
                      </span>
                      <span className="text-white/60 text-[11px] block mt-0.5">
                        {summary.operatorTotal > 0
                          ? `Total estimado operador: ${formatCOP(summary.operatorTotal)}`
                          : "Tarifa estándar por jornada laboral en máquina"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* RESUMEN FINANCIERO EN VIVO */}
              {items.length > 0 && (
                <div className="p-6 bg-[#161616] border-2 border-bronto-yellow space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs uppercase font-bold text-bronto-yellow tracking-wider flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span>Liquidación Financiera en Tiempo Real</span>
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">Tarifas Mercado +10% Ref.</span>
                  </div>

                  <div className="space-y-2 text-xs text-white/80">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Subtotal Equipos y Materiales ({totalCount} unidades):</span>
                      <span className="font-mono font-semibold">{formatCOP(summary.equipmentTotal)}</span>
                    </div>

                    {formData.requiresOperator && summary.operatorTotal > 0 && (
                      <div className="flex items-center justify-between text-bronto-yellow">
                        <span>Servicio de Operadores Certificados:</span>
                        <span className="font-mono font-semibold">+{formatCOP(summary.operatorTotal)}</span>
                      </div>
                    )}

                    {formData.requiresTransport && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">Flete y Logística a {formData.city}:</span>
                        <span className="font-mono font-semibold">+{formatCOP(summary.transportTotal)}</span>
                      </div>
                    )}

                    {summary.discountAmount > 0 && (
                      <div className="flex items-center justify-between text-green-400">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Descuento por Volumen Obra Grande (5%):</span>
                        </span>
                        <span className="font-mono font-semibold">-{formatCOP(summary.discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-white/70 font-semibold">Subtotal Neto antes de IVA:</span>
                      <span className="font-mono font-bold text-white">{formatCOP(summary.subtotalBeforeTax)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/60">IVA (19% servicio / arrendamiento):</span>
                      <span className="font-mono">{formatCOP(summary.taxAmount)}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-bronto-yellow flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="text-sm font-black uppercase text-white">
                      TOTAL ESTIMADO DE LA PROPUESTA:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-bronto-yellow font-mono">
                      {formatCOP(summary.grandTotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA: DATOS DE CONTACTO Y RADICACIÓN (5 cols) */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#2B2B2B] p-6 sm:p-8 space-y-5 h-fit">
              <h2 className="uppercase text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-bronto-yellow" />
                <span>Datos del Proyecto y Radicación</span>
              </h2>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                  Nombre completo o Contacto comercial *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ej: Ing. Mauricio Cárdenas"
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Empresa / Razón Social
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Ej: Constructora Bolívar S.A.S."
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    NIT o Cédula
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="Ej: 860.051.240-1"
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Teléfono Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej: 315 705 2810"
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="comercial@empresa.com"
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Municipio / Zona de Obra *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                  >
                    {Object.keys(transportRatesByZone).map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Tipo de Proyecto
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                  >
                    <option value="edificacion">Edificación / Vivienda</option>
                    <option value="infraestructura">Vías e Infraestructura</option>
                    <option value="industrial">Bodegas e Industria</option>
                    <option value="remodelacion">Remodelación / Acabados</option>
                    <option value="otro">Otro frente de obra</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                  Dirección o Punto de Referencia del Frente
                </label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Ej: Corredor Industrial Siberia Km 2.5 / Lagos de Torca"
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                  Observaciones Técnicas o Requerimientos Especiales
                </label>
                <textarea
                  name="observations"
                  rows={3}
                  value={formData.observations}
                  onChange={handleInputChange}
                  placeholder="Especifique requerimientos de potencia, altura de vaciado, horario nocturno, etc."
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none resize-none"
                />
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover disabled:opacity-50 disabled:cursor-not-allowed text-[#111111] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Generando cotización formal..." : "Generar Cotización Formal"}</span>
                </button>

                <p className="text-[11px] text-white/50 text-center font-normal">
                  La propuesta comercial incluye precios con el 10% de referencia sobre mercado, pólizas y disponibilidad inmediata en Bogotá y la Sabana.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
