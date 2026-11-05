"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClientAuth } from "@/components/auth/ClientAuthProvider";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { 
  Building2, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, user, login, loginWithDemo, register } = useClientAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [emailOrNit, setEmailOrNit] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Formulario de Registro
  const [regCompany, setRegCompany] = useState("");
  const [regNit, setRegNit] = useState("");
  const [regContact, setRegContact] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCity, setRegCity] = useState("Bogotá D.C.");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrNit.trim()) {
      setErrorMessage("Por favor ingrese su correo electrónico o NIT corporativo.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await login(emailOrNit, password);
      if (res.success) {
        router.push("/portal-clientes");
      } else {
        setErrorMessage(res.error || "Datos incorrectos. Intente nuevamente.");
      }
    } catch {
      setErrorMessage("Error de conexión. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoId: string) => {
    loginWithDemo(demoId);
    router.push("/portal-clientes");
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        companyName: regCompany,
        nit: regNit,
        contactName: regContact,
        email: regEmail,
        phone: regPhone,
        city: regCity,
      });
      router.push("/portal-clientes");
    } finally {
      setIsLoading(false);
    }
  };

  // Si ya tiene sesión iniciada, mostrar acceso directo
  if (isLoggedIn && user) {
    return (
      <div className="pt-28 pb-24 bg-[#151515] min-h-screen">
        <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
          <Breadcrumbs items={[{ label: "Portal de Clientes", href: "/portal-clientes" }, { label: "Sesión Activa" }]} />

          <div className="my-12 max-w-xl mx-auto bg-[#181818] border border-[#2B2B2B] p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-bronto-yellow/10 border border-bronto-yellow rounded-full flex items-center justify-center mx-auto text-bronto-yellow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs text-bronto-yellow font-bold uppercase tracking-wider block">
                Sesión Iniciada
              </span>
              <h2 className="text-2xl font-black uppercase text-white mt-1">
                {user.companyName}
              </h2>
              <p className="mt-2 text-xs text-white/70">
                Identificado como {user.contactName} (NIT: {user.nit})
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/portal-clientes"
                className="w-full sm:w-auto px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Ir al panel de obra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        <Breadcrumbs items={[{ label: "Acceso para Clientes" }]} />

        {/* Cabecera */}
        <div className="py-8 border-b border-[#242424] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Portal de Clientes y Contratistas
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-2xl">
              Consulte frentes de obra activos, horómetros de maquinaria, actas de entrega digital y certificados técnicos en Bogotá y municipios de la Sabana.
            </p>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Columna Izquierda: Beneficios y Respaldo Institucional (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#181818] border border-[#2B2B2B] p-8 space-y-6">
              <div className="flex items-center gap-3">
                <DynastesBeetleSymbol className="w-10 h-10" size={50} />
                <div>
                  <h3 className="uppercase text-lg font-black text-white">
                    Respaldo BRONTO
                  </h3>
                  <span className="text-xs text-bronto-yellow font-bold uppercase tracking-wider block">
                    Gestión Integral de Flota
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-white/70 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Telemetría y Horómetros</strong>
                    <span>Control de horas operadas por frente de trabajo con corte quincenal y mensual transparente.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Repositorio Técnico Digital</strong>
                    <span>Descarga de actas de inspección, certificaciones de trabajo en alturas Res. 4272 y fichas NSR-10.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold">Soporte Mecánico Prioritario</strong>
                    <span>Botón directo para despachar cuadrilla técnica móvil de emergencia a su obra.</span>
                  </div>
                </div>
              </div>

              {/* Acceso Rápido Demo para Pruebas Inmediatas */}
              <div className="p-4 bg-[#141414] border border-bronto-yellow/40 space-y-3">
                <div className="flex items-center gap-2 text-bronto-yellow text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Demostración de Cliente Activo</span>
                </div>
                <p className="text-[11px] text-white/70">
                  Haga clic para ingresar instantáneamente con una constructora simulada con 2 obras activas en Cota y Siberia:
                </p>
                <button
                  type="button"
                  onClick={() => handleDemoLogin("cli-bolivar")}
                  className="w-full py-2.5 px-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-colors text-center"
                >
                  Ingresar como Constructora Bolívar (Demo)
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Login / Registro (7 cols) */}
          <div className="lg:col-span-7 bg-[#181818] border border-[#2B2B2B] p-6 sm:p-10">
            {/* Tabs Selector */}
            <div className="flex items-center border-b border-[#2B2B2B] mb-8">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-colors ${
                  activeTab === "login"
                    ? "border-bronto-yellow text-bronto-yellow"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-colors ${
                  activeTab === "register"
                    ? "border-bronto-yellow text-bronto-yellow"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                Vincular Empresa Nueva
              </button>
            </div>

            {errorMessage && (
              <div className="mb-6 p-3 bg-red-950/50 border border-red-700/50 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            {activeTab === "login" ? (
              /* FORMULARIO DE INICIO DE SESIÓN */
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                    Correo Electrónico Corporativo o NIT de la Empresa *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={emailOrNit}
                      onChange={(e) => setEmailOrNit(e.target.value)}
                      placeholder="ej: carlos@constructorabolivar.com o 860.051.240-1"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs uppercase font-semibold text-white/70">
                      Contraseña *
                    </label>
                    <span className="text-[11px] text-white/50">
                      (Para demo, ingrese cualquier valor)
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? "Validando credenciales..." : "Ingresar al portal de clientes"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-4 border-t border-[#2A2A2A] text-center text-xs text-white/50">
                  ¿Es cliente nuevo y aún no tiene usuario registrado?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="text-bronto-yellow hover:underline font-bold"
                  >
                    Registrar constructora
                  </button>
                </div>
              </form>
            ) : (
              /* FORMULARIO DE REGISTRO */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Razón Social de la Empresa *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regCompany}
                        onChange={(e) => setRegCompany(e.target.value)}
                        placeholder="Constructora S.A.S."
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      NIT de la Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={regNit}
                      onChange={(e) => setRegNit(e.target.value)}
                      placeholder="900.000.000-1"
                      className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Nombre del Residente o Contacto *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regContact}
                        onChange={(e) => setRegContact(e.target.value)}
                        placeholder="Ing. Carlos Pérez"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Teléfono Móvil / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+57 315 000 0000"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Correo Electrónico Corporativo *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="residente@constructora.com"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-white/70 mb-1.5">
                      Municipio Principal de Operación *
                    </label>
                    <select
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#121212] border border-[#333333] text-sm text-white focus:border-bronto-yellow focus:outline-none"
                    >
                      <option value="Bogotá D.C.">Bogotá D.C.</option>
                      <option value="Chía">Chía</option>
                      <option value="Cota / Siberia">Cota / Siberia</option>
                      <option value="Cajicá">Cajicá</option>
                      <option value="Mosquera">Mosquera</option>
                      <option value="Funza">Funza</option>
                      <option value="Madrid">Madrid</option>
                      <option value="Zipaquirá">Zipaquirá</option>
                      <option value="Soacha">Soacha</option>
                      <option value="Otra zona de la Sabana">Otra zona de la Sabana</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <span>{isLoading ? "Creando registro..." : "Crear cuenta corporativa"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

