"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { siteConfig } from "@/data/siteConfig";
import { QuoteFormData } from "@/types/quote";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
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
  Info
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

  // Construir mensaje estructurado para WhatsApp Business
  const buildWhatsAppMessage = (refId: string) => {
    let msg = `*SOLICITUD DE COTIZACIÓN BRONTO - REF: ${refId}*\n\n`;
    msg += `*Cliente:* ${formData.fullName}\n`;
    msg += `*Empresa:* ${formData.companyName || "N/A"} (NIT: ${formData.taxId || "N/A"})\n`;
    msg += `*Teléfono:* ${formData.phone}\n`;
    msg += `*Email:* ${formData.email}\n`;
    msg += `*Ciudad / Destino:* ${formData.city}\n`;
    msg += `*Tipo de Proyecto:* ${formData.projectType.toUpperCase()}\n`;
    msg += `*Fecha estimada inicio:* ${formData.startDate || "Inmediata"}\n`;
    msg += `*Transporte requerido:* ${formData.requiresTransport ? "SÍ" : "NO"}\n`;
    msg += `*Operador requerido:* ${formData.requiresOperator ? "SÍ" : "NO"}\n\n`;
    msg += `*EQUIPOS / MATERIALES SOLICITADOS:*\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku})\n`;
      msg += `   - Cantidad: ${item.quantity} | Modalidad: ${item.modality.toUpperCase()}\n`;
      msg += `   - Tiempo estimado: ${item.estimatedDuration || "No especificado"}\n`;
    });

    if (formData.observations.trim()) {
      msg += `\n*Observaciones:* ${formData.observations}\n`;
    }

    msg += `\n_Generado desde la plataforma web BRONTO._`;
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

    // Simulación de registro / demostración transparente
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 800);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${buildWhatsAppMessage(generatedRefId || "DIRECTA")}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Solicitud de Cotización" }]} />

        {/* Cabecera */}
        <div className="py-8 border-b border-[#242424] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Solicitud de Cotización
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-2xl">
              Consolide su lista de equipos de alquiler y suministros para su obra en Bogotá y la Sabana. Nuestro departamento técnico revisará la disponibilidad y emitirá la propuesta formal.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold text-bronto-yellow hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        {/* Pantalla de Confirmación de Cotización */}
        {submissionSuccess ? (
          <div className="my-12 max-w-2xl mx-auto bg-[#1A1A1A] border-2 border-bronto-yellow p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-bronto-yellow/10 border border-bronto-yellow rounded-full flex items-center justify-center mx-auto text-bronto-yellow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="uppercase text-3xl font-black text-white mt-2">
                ¡Solicitud Preparada con Éxito!
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Referencia generada: <strong className="text-bronto-yellow">{generatedRefId}</strong>
              </p>
            </div>

            <div className="p-4 bg-black/50 border border-[#333333] text-left text-xs text-white/70 space-y-2">
              <div className="flex items-center gap-2 text-bronto-yellow font-bold">
                <Info className="w-4 h-4 shrink-0" />
                <span>Solicitud Lista para Procesamiento Comercial</span>
              </div>
              <p>
                Esta solicitud se encuentra estructurada. Puede enviar el resumen formal directamente por WhatsApp a nuestros ingenieros comerciales con un solo clic:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Enviar por WhatsApp comercial</span>
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
          /* Flujo Principal: Lista de Equipos + Formulario Comercial */
          <form onSubmit={handleSubmit} className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* COLUMNA IZQUIERDA: RESUMEN DE EQUIPOS SELECCIONADOS (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="uppercase text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-bronto-yellow" />
                  <span>Equipos y Materiales Seleccionados ({items.length})</span>
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
                <div className="p-8 bg-[#181818] border border-[#2B2B2B] text-center space-y-4">
                  <p className="text-xs uppercase font-semibold text-white/60">
                    No tiene equipos en su lista de cotización.
                  </p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider"
                  >
                    <span>Ir a explorar el catálogo</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
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
                          <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">{item.product.sku}</span>
                          <h4 className="uppercase text-base font-bold text-white leading-tight">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] uppercase font-bold text-bronto-yellow">
                            Modalidad: {item.modality.toUpperCase()} &bull; {item.product.unit}
                          </span>
                        </div>
                      </div>

                      {/* Controles de cantidad y tiempo */}
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
                          <span className="px-3 text-xs font-bold text-white">
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
                  ))}

                  <div className="p-4 bg-[#141414] border border-[#262626] flex items-center justify-between text-xs">
                    <span className="text-white/60">Total de unidades solicitadas:</span>
                    <strong className="text-bronto-yellow text-sm font-bold">{totalCount} ítems</strong>
                  </div>
                </div>
              )}

              {/* Opciones Logísticas */}
              <div className="bg-[#181818] border border-[#2B2B2B] p-5 space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold">
                  Servicios Adicionales Requeridos en Obra
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 bg-black/40 border border-[#333333] cursor-pointer hover:border-bronto-yellow">
                    <input
                      type="checkbox"
                      name="requiresTransport"
                      checked={formData.requiresTransport}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-bronto-yellow"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Transporte / Cama baja</span>
                      <span className="text-white/60 text-[11px]">Entrega a pie de obra por BRONTO</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-black/40 border border-[#333333] cursor-pointer hover:border-bronto-yellow">
                    <input
                      type="checkbox"
                      name="requiresOperator"
                      checked={formData.requiresOperator}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-bronto-yellow"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block">Operador Certificado</span>
                      <span className="text-white/60 text-[11px]">Con SST y competencias laborales</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: DATOS DE CONTACTO Y ENVÍO (5 cols) */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#2B2B2B] p-6 sm:p-8 space-y-5 h-fit">
              <h2 className="uppercase text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-bronto-yellow" />
                <span>Datos del Proyecto y Contacto</span>
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
                  placeholder="Ej: Ing. Carlos Méndez"
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Empresa / Razón Social
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Constructora S.A.S."
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    NIT / Cédula
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="900.000.000-1"
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="carlos@constructora.com"
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Teléfono celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+57 310 000 0000"
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Zona / Municipio de Obra (Bogotá y Sabana) *
                  </label>
                  <select
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  >
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Chía">Chía</option>
                    <option value="Cajicá">Cajicá</option>
                    <option value="Cota / Siberia">Cota / Siberia</option>
                    <option value="Mosquera">Mosquera</option>
                    <option value="Funza">Funza</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Facatativá">Facatativá</option>
                    <option value="Soacha">Soacha</option>
                    <option value="Zipaquirá">Zipaquirá</option>
                    <option value="Tocancipá">Tocancipá</option>
                    <option value="Sopó">Sopó</option>
                    <option value="Tenjo / Subachoque">Tenjo / Subachoque</option>
                    <option value="Otra zona aledaña a Bogotá">Otra zona aledaña a Bogotá</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Fecha estimada de inicio
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                  Observaciones, accesos o especificaciones
                </label>
                <textarea
                  rows={3}
                  name="observations"
                  value={formData.observations}
                  onChange={handleInputChange}
                  placeholder="Detalles sobre vías de acceso, turnos nocturnos, bombeo especial..."
                  className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Generando radicado..." : "Radicar solicitud de cotización"}</span>
                </button>
              </div>

              <div className="text-[11px] text-white/50 text-center pt-2">
                Respuesta técnica garantizada &bull; Sin compromiso comercial inicial
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
