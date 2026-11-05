"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  HelpCircle 
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "Asesoría comercial general",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contacto Comercial" }]} />

        {/* Cabecera */}
        <div className="py-8 border-b border-[#242424] max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            Atención Comercial
          </h1>
          <p className="mt-2 text-base text-white/70">
            Comuníquese directamente con nuestro equipo de ingenieros y asesores comerciales. Atendemos requerimientos para proyectos y frentes de obra en Bogotá y municipios de la Sabana.
          </p>
        </div>

        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Columna Izquierda: Información de Canales (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#181818] border border-[#2B2B2B] p-6 sm:p-8 space-y-6">
              <h2 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold">
                Líneas Comerciales y Despacho
              </h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/50 block">Línea Telefónica Principal</span>
                    <a
                      href={`tel:${siteConfig.contact.phoneFormatted}`}
                      className="font-bold text-white hover:text-bronto-yellow transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/50 block">WhatsApp Asesoría Express</span>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-white hover:text-green-400 transition-colors"
                    >
                      {siteConfig.contact.whatsappFormatted}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/50 block">Correo Comercial</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-bold text-white hover:text-bronto-yellow transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/50 block">Ubicación y Despacho</span>
                    <span className="text-white">
                      {siteConfig.contact.address}, {siteConfig.contact.city}
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-white/50 block">Horario de Despacho</span>
                    <span className="text-xs text-white/70">
                      {siteConfig.contact.operationHours}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Enlace rápido a Preguntas Frecuentes */}
            <div className="p-6 bg-[#181818] border border-[#2B2B2B] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  ¿Dudas sobre requisitos de alquiler?
                </span>
                <span className="text-xs text-white/60">
                  Consulte nuestro centro de respuestas rápidas.
                </span>
              </div>
              <Link
                href="/preguntas-frecuentes"
                className="p-2.5 bg-[#252525] hover:bg-bronto-yellow hover:text-[#151515] transition-colors text-white"
                aria-label="Ir a preguntas frecuentes"
              >
                <HelpCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Mensaje Directo (7 cols) */}
          <div className="lg:col-span-7 bg-[#181818] border border-[#2B2B2B] p-6 sm:p-10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-bronto-yellow mx-auto" />
                <h3 className="uppercase text-2xl font-bold text-white">
                  ¡Mensaje Recibido!
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto">
                  Gracias por contactar a BRONTO. Uno de nuestros asesores comerciales se comunicará con usted a la brevedad.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-[#333333] hover:border-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="uppercase text-2xl font-bold text-white">
                  Envíenos su Consulta
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nombre del solicitante"
                      className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Empresa o Constructora
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Razón Social"
                      className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="correo@empresa.com"
                      className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Teléfono Móvil *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+57 300 000 0000"
                      className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Asunto del Requerimiento
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  >
                    <option value="Asesoría comercial general">Asesoría comercial general</option>
                    <option value="Alquiler de maquinaria pesada">Alquiler de maquinaria pesada</option>
                    <option value="Formaletas y andamios certificados">Formaletas y andamios certificados</option>
                    <option value="Suministro de concretos y bombeo">Suministro de concretos y bombeo</option>
                    <option value="Casetones y sistemas EPS">Casetones y sistemas EPS</option>
                    <option value="Otro asunto">Otro asunto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Mensaje o Requerimientos de Obra *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escriba aquí los detalles de su proyecto, ubicación en Bogotá o Sabana, fechas..."
                    className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar mensaje comercial</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

