"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClientAuth } from "@/components/auth/ClientAuthProvider";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { 
  Building2, 
  Wrench, 
  Clock, 
  FileText, 
  Download, 
  MapPin, 
  LogOut, 
  Plus, 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle,
  HardHat,
  Truck,
  CheckCircle2
} from "lucide-react";

export default function ClientPortalPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useClientAuth();

  const [activeSection, setActiveSection] = useState<"equipos" | "proyectos" | "documentos">("equipos");
  const [supportRequested, setSupportRequested] = useState<string | null>(null);

  // Si no está autenticado, invitar a iniciar sesión
  if (!isLoggedIn || !user) {
    return (
      <div className="pt-28 pb-24 bg-[#151515] min-h-screen">
        <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
          <Breadcrumbs items={[{ label: "Portal de Clientes" }]} />

          <div className="my-16 max-w-xl mx-auto bg-[#181818] border border-[#2B2B2B] p-10 text-center space-y-6">
            <DynastesBeetleSymbol className="w-16 h-16 mx-auto" size={80} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Acceso Exclusivo para Clientes
              </h1>
              <p className="mt-2 text-xs text-white/70">
                Para consultar el estado de sus equipos en alquiler, horómetros, actas de entrega y certificados técnicos, inicie sesión con su usuario o NIT de empresa.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-colors"
              >
                <span>Ingresar con NIT o Correo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleRequestSupport = (equipmentSku: string) => {
    setSupportRequested(equipmentSku);
    setTimeout(() => {
      setSupportRequested(null);
    }, 4000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Portal de Clientes", href: "/portal-clientes" }, { label: user.companyName }]} />

        {/* Encabezado del Portal de Clientes */}
        <div className="py-8 border-b border-[#242424] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-bronto-yellow/10 border border-bronto-yellow flex items-center justify-center text-bronto-yellow shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-bronto-yellow font-bold uppercase tracking-wider block">
                Cuenta Corporativa Verificada
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mt-0.5">
                {user.companyName}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-white/60">
                <span>NIT: <strong className="text-white">{user.nit}</strong></span>
                <span>&bull;</span>
                <span>Contacto: <strong className="text-white">{user.contactName}</strong></span>
                <span>&bull;</span>
                <span>Base: <strong className="text-white">{user.city}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Solicitar más equipos</span>
            </Link>

            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#333333] hover:border-red-500 text-white/70 hover:text-red-400 text-xs uppercase font-bold tracking-wider transition-colors"
              title="Cerrar sesión corporativa"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Notificación de Soporte Móvil Solicitado */}
        {supportRequested && (
          <div className="my-6 p-4 bg-green-950/60 border border-green-600/70 text-green-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <span>
                Solicitud radicada para equipo <strong>{supportRequested}</strong>. La cuadrilla técnica móvil de la base Calle 80 / Siberia ha sido notificada para intervención prioritaria.
              </span>
            </div>
            <span className="text-[11px] text-green-300 font-bold uppercase">En camino a obra</span>
          </div>
        )}

        {/* Tarjetas de Indicadores Operativos Rápidos */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#181818] border-t-2 border-bronto-yellow p-5 flex flex-col justify-between">
            <span className="text-xs uppercase text-white/50 font-bold tracking-wider">
              Obras Activas
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">{user.activeProjects.length}</span>
              <span className="text-xs text-bronto-yellow font-bold uppercase">En Sabana y Bogotá</span>
            </div>
          </div>

          <div className="bg-[#181818] border-t-2 border-bronto-yellow p-5 flex flex-col justify-between">
            <span className="text-xs uppercase text-white/50 font-bold tracking-wider">
              Equipos en Alquiler
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">{user.rentedEquipment.length}</span>
              <span className="text-xs text-green-400 font-bold uppercase">100% Operativos</span>
            </div>
          </div>

          <div className="bg-[#181818] border-t-2 border-bronto-yellow p-5 flex flex-col justify-between">
            <span className="text-xs uppercase text-white/50 font-bold tracking-wider">
              Horómetros Acumulados
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">
                {user.rentedEquipment.reduce((acc, eq) => acc + eq.horometerHours, 0)}
              </span>
              <span className="text-xs text-white/60">Horas registradas</span>
            </div>
          </div>

          <div className="bg-[#181818] border-t-2 border-bronto-yellow p-5 flex flex-col justify-between">
            <span className="text-xs uppercase text-white/50 font-bold tracking-wider">
              Documentos de Obra
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">{user.documents.length}</span>
              <span className="text-xs text-white/60">Actas y certificados</span>
            </div>
          </div>
        </div>

        {/* Navegación por Secciones del Portal */}
        <div className="flex items-center gap-2 border-b border-[#242424] pb-4 mb-8">
          <button
            onClick={() => setActiveSection("equipos")}
            className={`px-5 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors ${
              activeSection === "equipos"
                ? "bg-bronto-yellow text-[#111111]"
                : "bg-[#181818] text-white/70 hover:text-white border border-[#2B2B2B]"
            }`}
          >
            Equipos en Alquiler ({user.rentedEquipment.length})
          </button>

          <button
            onClick={() => setActiveSection("proyectos")}
            className={`px-5 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors ${
              activeSection === "proyectos"
                ? "bg-bronto-yellow text-[#111111]"
                : "bg-[#181818] text-white/70 hover:text-white border border-[#2B2B2B]"
            }`}
          >
            Frentes de Obra ({user.activeProjects.length})
          </button>

          <button
            onClick={() => setActiveSection("documentos")}
            className={`px-5 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors ${
              activeSection === "documentos"
                ? "bg-bronto-yellow text-[#111111]"
                : "bg-[#181818] text-white/70 hover:text-white border border-[#2B2B2B]"
            }`}
          >
            Actas y Certificados ({user.documents.length})
          </button>
        </div>

        {/* SECCIÓN 1: EQUIPOS EN ALQUILER */}
        {activeSection === "equipos" && (
          <div className="space-y-4">
            {user.rentedEquipment.length === 0 ? (
              <div className="p-12 bg-[#181818] border border-[#2B2B2B] text-center space-y-3">
                <p className="text-xs text-white/60 uppercase">No tiene equipos activos en este momento.</p>
                <Link href="/catalogo" className="inline-block text-xs text-bronto-yellow font-bold uppercase hover:underline">
                  Explorar catálogo para solicitar alquiler &rarr;
                </Link>
              </div>
            ) : (
              user.rentedEquipment.map((eq) => (
                <div
                  key={eq.id}
                  className="bg-[#181818] border border-[#2B2B2B] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">
                        {eq.sku}
                      </span>
                      <span className="px-2 py-0.5 bg-[#252525] text-bronto-yellow text-[10px] uppercase font-bold">
                        {eq.category}
                      </span>
                      <span className="px-2 py-0.5 bg-green-950 text-green-400 text-[10px] uppercase font-bold border border-green-800">
                        {eq.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold uppercase text-white">
                      {eq.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 pt-1">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-bronto-yellow" />
                        <span>Frente: <strong className="text-white">{eq.projectName}</strong></span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-bronto-yellow" />
                        <span>Horómetro Actual: <strong className="text-white">{eq.horometerHours} hrs</strong></span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-bronto-yellow" />
                        <span>Próximo Mantenimiento: <strong className="text-white">{eq.nextMaintenance}</strong></span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleRequestSupport(eq.sku)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#242424] hover:bg-[#303030] text-white text-xs uppercase font-bold tracking-wider transition-colors"
                      title="Solicitar visita técnica móvil en obra"
                    >
                      <Wrench className="w-3.5 h-3.5 text-bronto-yellow" />
                      <span>Soporte Técnico</span>
                    </button>

                    <Link
                      href={`/catalogo`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#333333] hover:border-bronto-yellow text-white text-xs uppercase font-bold tracking-wider transition-colors"
                    >
                      <span>Ver Ficha</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SECCIÓN 2: FRENTES DE OBRA */}
        {activeSection === "proyectos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.activeProjects.map((prj) => (
              <div
                key={prj.id}
                className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-bronto-yellow font-bold uppercase tracking-wider">
                    Frente en Ejecución
                  </span>
                  <span className="px-2 py-0.5 bg-green-950 text-green-400 text-[10px] uppercase font-bold border border-green-800">
                    {prj.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold uppercase text-white">
                  {prj.name}
                </h3>

                <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                    <span>{prj.location} ({prj.municipality})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-bronto-yellow shrink-0" />
                    <span>Ingeniero Residente: <strong className="text-white">{prj.residentEngineer}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-bronto-yellow shrink-0" />
                    <span>Fecha de inicio de suministro: <strong className="text-white">{prj.startDate}</strong></span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/cotizar"
                    className="inline-flex items-center gap-2 text-xs uppercase font-bold text-bronto-yellow hover:underline"
                  >
                    <span>Asignar nuevos equipos a este frente &rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECCIÓN 3: ACTAS Y DOCUMENTACIÓN TÉCNICA */}
        {activeSection === "documentos" && (
          <div className="bg-[#181818] border border-[#2B2B2B]">
            <div className="p-6 border-b border-[#242424] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold uppercase text-white">
                  Repositorio Técnico y Certificaciones
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Descargue los soportes digitales válidos ante interventoría y aseguradoras.
                </p>
              </div>
            </div>

            <div className="divide-y divide-[#242424]">
              {user.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-black border border-[#333333] text-bronto-yellow shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold text-bronto-yellow px-1.5 py-0.2 bg-[#252525]">
                          {doc.type}
                        </span>
                        <span className="text-[11px] text-white/50">{doc.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white uppercase">
                        {doc.title}
                      </h4>
                    </div>
                  </div>

                  <a
                    href={`/contacto?asunto=Descarga-${doc.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#333333] hover:border-bronto-yellow text-white hover:text-bronto-yellow text-xs uppercase font-bold tracking-wider transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Franja de Respaldo Técnico de Emergencia */}
        <div className="mt-12 p-6 bg-[#181818] border border-[#2B2B2B] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-bronto-yellow text-[#111111] shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-white font-bold block text-sm sm:text-base uppercase">
                Línea Directa de Despacho y Asistencia en Obra
              </span>
              <span className="text-white/60 text-xs block">
                Atención prioritaria para contratistas activos: <strong>+57 315 705 2810</strong>
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/573157052810?text=Hola%20BRONTO,%20me%20comunico%20desde%20el%20Portal%20de%20Clientes%20para%20asistencia%20inmediata%20en%20mi%20frente%20de%20obra."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Hablar con Gerencia de Operaciones
          </a>
        </div>
      </div>
    </div>
  );
}
