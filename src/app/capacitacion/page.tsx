"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/data/siteConfig";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { 
  GraduationCap, 
  ShieldCheck, 
  Wrench, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  PhoneCall, 
  Search, 
  Award, 
  Clock, 
  Building2, 
  HardHat, 
  AlertTriangle,
  Zap,
  Flame,
  FileCheck2,
  Users
} from "lucide-react";

interface CourseItem {
  id: string;
  category: "operacion" | "tecnica" | "seguridad";
  title: string;
  targetMachines: string;
  duration: string;
  modality: string;
  summary: string;
  syllabus: string[];
  certificationBadge: string;
}

const courses: CourseItem[] = [
  {
    id: "excavadora-orugas",
    category: "operacion",
    title: "Operación Técnica y Productividad en Excavadora sobre Orugas",
    targetMachines: "Excavadoras 20T a 36T (CAT, Komatsu, Volvo, Sany)",
    duration: "40 horas (Teórico-Práctico)",
    modality: "En Obra (In-Company) o Patio Central Calle 80",
    summary: "Desarrollo de destreza operativa en excavación de zanjas profundas, descapote masivo, cargue rápido a volquetas y perfilado de taludes con economía de combustible.",
    syllabus: [
      "Inspección preoperacional de 40 puntos: niveles, orugas, mandos finales y tornamesa",
      "Dinámica hidráulica, ángulos óptimos de cuchara y balance del equipo",
      "Técnicas de zanjeo en seco y bajo nivel freático en la Sabana",
      "Posicionamiento seguro en pendientes, banquetas y taludes inestables",
      "Modos de trabajo eco y control de rpm para ahorro de hasta un 18% de diésel",
    ],
    certificationBadge: "Operador Profesional de Excavadora Hidráulica",
  },
  {
    id: "retroexcavadora-pajarita",
    category: "operacion",
    title: "Operación de Retroexcavadora 4x4 y Minicargador",
    targetMachines: "Retroexcavadoras tipo Pajarita y Minicargadores con aditamentos",
    duration: "36 horas (Teórico-Práctico)",
    modality: "En Obra (In-Company) o Patio Central Calle 80",
    summary: "Formación integral en los dos equipos más versátiles de la obra urbana. Coordinación de brazos, estabilizadores, martillo de demolición y maniobras en espacios reducidos.",
    syllabus: [
      "Estabilización correcta en zanjas urbanas y protección de redes de servicios públicos",
      "Maniobras simultáneas de giro, pluma y balde con mínimo esfuerzo mecánico",
      "Acople hidráulico de martillos neumáticos, hoyadoras y barredoras en minicargador",
      "Seguridad operativa en vías públicas y coordinación con señaleros / paleteros",
      "Mantenimiento diario autónomo: puntos de engrase y filtro separador de agua",
    ],
    certificationBadge: "Operador Integral de Maquinaria Mediana y Aditamentos",
  },
  {
    id: "compactacion-rasantes",
    category: "operacion",
    title: "Operación de Rodillos Compactadores y Control de Densidad",
    targetMachines: "Rodillos monocilíndricos 10T a 12T y vibrocompactadores dobles",
    duration: "24 horas (Teórico-Práctico)",
    modality: "En Obra (In-Company) o Patio Central",
    summary: "Control milimétrico de compactación de sub-bases granulares, afirmados y mezclas asfálticas. Ajuste de frecuencias de vibración y traslape de pasadas.",
    syllabus: [
      "Conceptos de geotecnia básica: humedad óptima, densidades Proctor y capacidad portante",
      "Configuración de amplitud alta/baja y frecuencias según tipo de suelo",
      "Patrones de traslape y velocidad constante para evitar ondulaciones",
      "Protocolos de frenado de emergencia y prevención de volcamiento lateral",
      "Revisión de tambor vibratorio, tacos de caucho y sistemas de aspersión",
    ],
    certificationBadge: "Operador Especializado en Compactación y Vías",
  },
  {
    id: "topografia-maquinaria",
    category: "tecnica",
    title: "Topografía Aplicada a Obra y Nivelación para Operadores",
    targetMachines: "Nivel de Ingeniero, Estación Total, Láser de Pendiente y GPS",
    duration: "30 horas (Teórico-Práctico)",
    modality: "Presencial en Patio y Campo de Pruebas",
    summary: "Capacitación para que operadores y encargados de frente interpreten planos topográficos, estacas de corte/relleno y utilicen niveles láser de rasante sin depender de un topógrafo permanente.",
    syllabus: [
      "Lectura de cotas, abscisas, chaflanes y estacas de corte/terraplén",
      "Calibración y lectura rápida de nivel de ingeniero óptico y láser rotatorio",
      "Control de pendientes para drenajes, alcantarillados y cunetas",
      "Uso de sensores de rasante montados en pala o cuchilla niveladora",
      "Verificación de tolerancias milimétricas en explanaciones industriales",
    ],
    certificationBadge: "Técnico en Nivelación y Topografía Operativa",
  },
  {
    id: "mecanica-preventiva",
    category: "tecnica",
    title: "Mecánica Básica, Sistemas Hidráulicos e Inspección Preoperacional",
    targetMachines: "Flota multimarca diésel de línea amarilla",
    duration: "32 horas (Taller y Campo)",
    modality: "En Patio Central de Mantenimiento BRONTO",
    summary: "Diagnóstico preventivo de campo para reducir tiempos muertos. Detección temprana de fugas, sobrepresiones hidráulicas, fallas eléctricas y purga de combustible.",
    syllabus: [
      "Circuitos electro-hidráulicos: bombas de caudal variable, distribuidores y cilindros",
      "Cuidado y lectura de manómetros de presión y telemetría de motor",
      "Procedimiento seguro de cambio y ponchado de mangueras hidráulicas en campo",
      "Mantenimiento de sistemas de admisión de aire en ambientes de alto polvo",
      "Protocolo de aislamiento y bloqueo (LOTO) para reparaciones en frente",
    ],
    certificationBadge: "Técnico en Mantenimiento Preventivo de Maquinaria",
  },
  {
    id: "seguridad-hse-defensivo",
    category: "seguridad",
    title: "Seguridad Industrial (HSE), Manejo Defensivo y Prevención de Volcamientos",
    targetMachines: "Todas las categorías de maquinaria pesada y transporte",
    duration: "20 horas (Certificación Oficial)",
    modality: "In-Company en Obra o Virtual + Práctica",
    summary: "Módulo indispensable exigido por interventorías y ARL. Identificación de puntos ciegos, radios de giro, izajes seguros con retroexcavadora y trabajo cerca a redes de alta tensión.",
    syllabus: [
      "Matriz de riesgos en excavación y demolición según normatividad colombiana",
      "Puntos ciegos y zonas de atrapamiento: protocolos de comunicación con vigías",
      "Cálculo de cargas de izaje con cuchara y verificación de eslingas certificadas",
      "Comportamiento de la máquina ante desprendimiento de bermas o fallas de talud",
      "Plan de emergencias y primeros auxilios en incidentes con maquinaria",
    ],
    certificationBadge: "Certificación en Seguridad y Manejo Defensivo de Maquinaria",
  },
];

export default function CapacitacionPage() {
  const [selectedCategory, setSelectedCategory] = useState<"todas" | "operacion" | "tecnica" | "seguridad">("todas");
  const [certQuery, setCertQuery] = useState("");
  const [certResult, setCertResult] = useState<{
    found: boolean;
    name?: string;
    doc?: string;
    course?: string;
    date?: string;
    status?: string;
  } | null>(null);

  const filteredCourses = selectedCategory === "todas"
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certQuery.trim()) return;

    // Base de datos de prueba / demostración de verificación técnica
    const normalized = certQuery.trim().toLowerCase();
    if (normalized.includes("860051240") || normalized.includes("101845") || normalized.includes("bronto-2026")) {
      setCertResult({
        found: true,
        name: "Carlos Eduardo Morales Henao",
        doc: "C.C. 1.018.452.910",
        course: "Operación Técnica y Productividad en Excavadora sobre Orugas (Nivel Avanzado)",
        date: "Vigente hasta Febrero 2027",
        status: "Certificado Activo y Homologado ante Interventoría",
      });
    } else {
      setCertResult({
        found: false,
      });
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#151515] min-h-screen text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16 2xl:px-24">
        <Breadcrumbs items={[{ label: "Servicios", href: "/servicios" }, { label: "Capacitación y Escuela de Operadores" }]} />

        {/* Hero de Capacitación Técnica */}
        <section className="py-10 border-b border-[#242424]">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#202020] border border-bronto-yellow/50 text-xs uppercase font-bold text-bronto-yellow tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Centro de Formación y Certificación Laboral BRONTO</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-tight">
              Escuela de Operadores de Maquinaria Pesada
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              Inspirados en las mejores academias de línea amarilla como <strong className="text-white">Dozer Maquinarias</strong>, formamos y certificamos operadores de maquinaria pesada, cuadrillas técnicas y personal de obra en Bogotá y la Sabana. Elevamos la productividad en campo, reducimos el consumo de combustible diésel y blindamos sus frentes de trabajo bajo normas de seguridad industrial y ARL.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link
                href="/cotizar?servicio=capacitacion-y-certificacion-de-operadores"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-colors"
              >
                <span>Cotizar capacitación para empresa</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola BRONTO, solicito información sobre los cursos y certificaciones de la Escuela de Operadores de maquinaria pesada.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#333333] hover:border-bronto-yellow text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-bronto-yellow" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4 Pilares de Impacto en Obra */}
        <section className="py-14 border-b border-[#242424]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase text-white">Ahorro de Combustible</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Técnicas de operación económica, aceleración progresiva y control de ciclos que disminuyen el consumo diésel entre un 12% y un 18% mensual por equipo.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase text-white">Cero Paradas Evitables</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Inspección preoperacional estandarizada de 40 puntos para identificar desgastes prematuros, fugas y fallas antes de que detengan el frente de obra.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase text-white">Seguridad y Normatividad</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Manejo defensivo en obra, visibilidad de ángulos ciegos y procedimientos seguros para cumplir al 100% las exigencias de interventoría y ARL.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 space-y-3">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase text-white">Certificación con QR</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Expedición de carnet físico y digital con código de verificación en línea para consulta inmediata de interventores, auditores y directores de proyecto.
              </p>
            </div>
          </div>
        </section>

        {/* Selector de Categorías y Catálogo de Cursos */}
        <section className="py-14 border-b border-[#242424]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                Programas y Cursos de Formación
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1 font-normal">
                Módulos diseñados para empresas constructoras, consorcios viales y operadores que buscan homologación laboral.
              </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("todas")}
                className={`px-4 py-2 text-xs font-bold uppercase transition-colors border ${
                  selectedCategory === "todas"
                    ? "bg-bronto-yellow text-black border-bronto-yellow"
                    : "bg-[#181818] text-white/80 border-[#333333] hover:border-white/50"
                }`}
              >
                Todos los Programas ({courses.length})
              </button>
              <button
                onClick={() => setSelectedCategory("operacion")}
                className={`px-4 py-2 text-xs font-bold uppercase transition-colors border ${
                  selectedCategory === "operacion"
                    ? "bg-bronto-yellow text-black border-bronto-yellow"
                    : "bg-[#181818] text-white/80 border-[#333333] hover:border-white/50"
                }`}
              >
                Operación de Maquinaria
              </button>
              <button
                onClick={() => setSelectedCategory("tecnica")}
                className={`px-4 py-2 text-xs font-bold uppercase transition-colors border ${
                  selectedCategory === "tecnica"
                    ? "bg-bronto-yellow text-black border-bronto-yellow"
                    : "bg-[#181818] text-white/80 border-[#333333] hover:border-white/50"
                }`}
              >
                Mecánica y Topografía
              </button>
              <button
                onClick={() => setSelectedCategory("seguridad")}
                className={`px-4 py-2 text-xs font-bold uppercase transition-colors border ${
                  selectedCategory === "seguridad"
                    ? "bg-bronto-yellow text-black border-bronto-yellow"
                    : "bg-[#181818] text-white/80 border-[#333333] hover:border-white/50"
                }`}
              >
                Seguridad Industrial (HSE)
              </button>
            </div>
          </div>

          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#181818] border border-[#2B2B2B] hover:border-bronto-yellow flex flex-col justify-between p-6 sm:p-8 transition-colors duration-150"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="text-[11px] font-bold uppercase text-bronto-yellow tracking-wider">
                      {course.targetMachines}
                    </span>
                    <span className="text-[11px] text-white/50 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-bronto-yellow" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-white leading-tight">
                    {course.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed font-normal">
                    {course.summary}
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
                      Temario y Competencias Prácticas:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/80">
                      {course.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-bronto-yellow shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-[11px] text-white/60">
                    <Award className="w-4 h-4 text-bronto-yellow shrink-0" />
                    <span>Otorga: <strong className="text-white">{course.certificationBadge}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/cotizar?servicio=capacitacion-y-certificacion-de-operadores&curso=${course.id}`}
                      className="w-full py-2.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-black font-black text-xs uppercase tracking-wider text-center transition-colors"
                    >
                      Solicitar cupos
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modalidades de Formación: In-Company vs Patio Central */}
        <section className="py-14 border-b border-[#242424]">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              Modalidades Flexibles para Proyectos
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1 font-normal">
              Entendemos que los cronogramas de obra no se pueden detener. Adaptamos la capacitación al horario y ubicación de su empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#181818] border border-[#2B2B2B] p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white">Modalidad In-Company (En Obra)</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Nuestros instructores certificados se desplazan a su frente de trabajo en Bogotá o la Sabana. Capacitamos a sus operarios en la misma maquinaria del proyecto con turnos escalonados para no frenar la producción.
              </p>
              <ul className="text-xs text-white/80 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Sin costos de traslado de personal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Práctica en el terreno real del proyecto</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Evaluación de condiciones específicas de obra</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white">Patio Central de Maniobras</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Práctica intensiva en nuestra base operativa del Corredor Industrial Calle 80 / Siberia. Flota propia multimarca disponible, pista de maniobras y aulas técnicas de simulación hidráulica.
              </p>
              <ul className="text-xs text-white/80 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Sin riesgo de comprometer equipos de obra</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Zanjas y bancos de prueba controlados</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Cupos individuales y grupales</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#181818] border border-[#2B2B2B] p-6 sm:p-8 space-y-4">
              <div className="w-10 h-10 bg-[#222222] border border-bronto-yellow/40 flex items-center justify-center text-bronto-yellow">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white">Homologación y Recertificación</h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Pruebas de suficiencia teórica y práctica para operadores con experiencia empírica que requieren certificar formalmente sus competencias laborales ante auditorías de interventoría.
              </p>
              <ul className="text-xs text-white/80 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Evaluación en 1 jornada (8 horas)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Emisión inmediata de carnet provisional</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-bronto-yellow font-bold">&bull;</span>
                  <span>Válido para licitaciones públicas y privadas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Verificador de Certificados (Funcionalidad inspirada en Dozer Maquinarias) */}
        <section className="py-14 border-b border-[#242424]">
          <div className="bg-[#181818] border border-[#2B2B2B] p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#222222] text-bronto-yellow text-xs font-bold uppercase border border-[#333333]">
                <Search className="w-3.5 h-3.5" />
                <span>Consulta Oficial en Línea</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Validar Certificado de Operador
              </h2>

              <p className="text-xs sm:text-sm text-white/70 font-normal">
                Interventores, contratistas y áreas de SST pueden verificar la autenticidad del carnet y vigencia de la certificación expedida por la Escuela Técnica BRONTO.
              </p>

              <form onSubmit={handleVerifyCert} className="pt-4 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder="Ingrese C.C. o Código (Ej: 1018452910 o BRONTO-2026)"
                  className="flex-1 px-4 py-3 bg-[#111111] border border-[#333333] focus:border-bronto-yellow text-white text-xs outline-none font-mono"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-black font-black text-xs uppercase tracking-wider transition-colors shrink-0"
                >
                  Verificar
                </button>
              </form>

              {certResult && (
                <div className="mt-6 text-left p-6 bg-[#141414] border border-[#333333] transition-all">
                  {certResult.found ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{certResult.status}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-white/10">
                        <div>
                          <span className="text-white/50 block">Operador Certificado:</span>
                          <strong className="text-white">{certResult.name}</strong>
                        </div>
                        <div>
                          <span className="text-white/50 block">Identificación:</span>
                          <strong className="text-white font-mono">{certResult.doc}</strong>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-white/50 block">Programa Aprobado:</span>
                          <strong className="text-white">{certResult.course}</strong>
                        </div>
                        <div>
                          <span className="text-white/50 block">Estado de Vigencia:</span>
                          <span className="text-bronto-yellow font-bold">{certResult.date}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3 text-xs text-white/70">
                      <p className="text-amber-400 font-bold mb-1">Registro no encontrado</p>
                      <p>No se encontró un certificado asociado a ese criterio. Puede ingresar <code className="text-bronto-yellow">1018452910</code> o <code className="text-bronto-yellow">BRONTO-2026</code> para ver una validación de muestra, o comunicarse con soporte técnico.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-14 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <DynastesBeetleSymbol className="w-12 h-12 mx-auto" size={54} />
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              ¿Listo para certificar a su cuadrilla operativa?
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-normal">
              Diseñamos planes a la medida de su empresa con tarifas especiales por volumen de operadores o integradas en su contrato de alquiler de maquinaria.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/cotizar?servicio=capacitacion-y-certificacion-de-operadores"
                className="px-8 py-3.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-black font-black text-xs uppercase tracking-wider transition-colors"
              >
                Solicitar propuesta corporativa
              </Link>
              <Link
                href="/contacto"
                className="px-8 py-3.5 border border-[#333333] hover:border-bronto-yellow text-white text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Contactar a un asesor técnico
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
