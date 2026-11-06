export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  imageUrl: string;
  iconName: string;
  capabilities: string[];
  workflow: {
    step: string;
    title: string;
    detail: string;
  }[];
  commercialNote: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "alquiler-equipos",
    slug: "alquiler-de-equipos-y-maquinaria",
    name: "Alquiler de Equipos y Maquinaria",
    tagline: "Flota de alta disponibilidad para que su obra nunca se detenga",
    summary: "Parque moderno de maquinaria pesada, equipos menores, formaletas y andamios certificados con planes por día, semana o mes.",
    description: "Diseñado para constructores e industrias que requieren confiabilidad operativa absoluta. Ofrecemos modalidades de renta seca (dry) o con operador certificado, telemetría activa en tiempo real y mantenimiento preventivo programado sin costo adicional para el contratista.",
    imageUrl: "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?q=80&w=1200&auto=format&fit=crop",
    iconName: "Truck",
    capabilities: [
      "Maquinaria pesada para excavación, cargue y movimiento masivo de tierras",
      "Equipos de compactación dinámica y acabado de sub-bases",
      "Generación eléctrica insonorizada de 20 kVA a 250 kVA",
      "Sistemas de encofrado metálico y andamiaje multidireccional normado",
      "Reemplazo inmediato de equipo ante cualquier eventualidad técnica en obra",
    ],
    workflow: [
      { step: "01", title: "Definición técnica", detail: "Evaluamos las condiciones del frente de trabajo, terreno y requerimientos de producción." },
      { step: "02", title: "Reserva y alistamiento", detail: "Inspección rigurosa de 40 puntos mecánicos, hidráulicos y de seguridad previa al despacho." },
      { step: "03", title: "Despacho a pie de obra", detail: "Coordinación logística puntual con acta de entrega digital y check-list conjunto." },
      { step: "04", title: "Acompañamiento continuo", detail: "Seguimiento de horómetros, revisiones periódicas y soporte técnico prioritario." },
    ],
    commercialNote: "Planes corporativos con tarifas preferenciales para proyectos de mediana y larga duración.",
  },
  {
    id: "suministro-materiales",
    slug: "suministro-de-materiales-y-soluciones",
    name: "Suministro de Materiales y Soluciones",
    tagline: "Abastecimiento técnico para cimentaciones, losas y cerramientos",
    summary: "Despacho programado de concretos premezclados, sistemas aligerados en EPS, formaletas y consumibles de alto estándar.",
    description: "Centralice sus compras estructurales con un único aliado. Gestionamos el suministro continuo de concreto bombeable dosificado bajo NSR-10, casetones modulados y perdidos en icopor de densidad controlada, y perfiles de junta para pisos industriales.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    iconName: "PackageCheck",
    capabilities: [
      "Concretos estructurales convencionales e industrializados acelerados",
      "Casetones perdidos en EPS autoextinguible cortados a medida exacta de viguetas",
      "Casetones recuperables de polipropileno virgen de alta durabilidad",
      "Paneles aligerados termoacústicos para fachadas y cerramientos rápidos",
      "Discos diamantados, cordón de respaldo y sellos elastoméricos para pavimentos",
    ],
    workflow: [
      { step: "01", title: "Cubicación sobre planos", detail: "Despiece milimétrico para evitar desperdicio de material y optimizar fletes." },
      { step: "02", title: "Programación de despachos", detail: "Cronograma alineado al avance de fundidas y capacidad de recepción de la obra." },
      { step: "03", title: "Control de calidad", detail: "Remisiones técnicas, certificados de dosificación y toma de muestras in situ." },
    ],
    commercialNote: "Suministro directo a pie de obra con cobertura en corredores industriales principales.",
  },
  {
    id: "transporte-logistica",
    slug: "transporte-y-logistica-especializada",
    name: "Transporte y Logística Especializada",
    tagline: "Despacho seguro y puntual en Bogotá y zonas aledañas de la Sabana",
    summary: "Flota propia y aliada de camas bajas, camiones grúa con brazo articulado y furgones para movilización express.",
    description: "La logística es el corazón de la disponibilidad. Coordinamos la movilización de maquinaria pesada, izaje de módulos de andamio y transporte seguro de elementos aligerados de gran volumen, con rutas programadas en Bogotá y corredores industriales de la Sabana (Cota, Chía, Siberia, Funza, Mosquera, Soacha, Tocancipá y Madrid).",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    iconName: "Compass",
    capabilities: [
      "Camas bajas de 2 a 4 ejes para maquinaria sobre orugas de hasta 40 toneladas",
      "Camiones grúa con brazo hidráulico articulado para cargue y descargue autónomo",
      "Transporte de formaleta y andamios zunchados y rotulados para fácil descargue",
      "Vehículos de respuesta rápida para entrega de herramientas auxiliares y repuestos",
    ],
    workflow: [
      { step: "01", title: "Ruta y accesos", detail: "Verificación de vías de ingreso, radios de giro y cables aéreos en el sitio de destino." },
      { step: "02", title: "Permisos viales", detail: "Gestión de autorizaciones de carga ancha o pesada ante entidades viales cuando aplique." },
      { step: "03", title: "Descargue y ubicación", detail: "Operación de izaje seguro guiada por señaleros y personal calificado." },
    ],
    commercialNote: "Tarifas de flete transparentes cotizadas en la propuesta integral de alquiler o suministro.",
  },
  {
    id: "mantenimiento-reparacion",
    slug: "mantenimiento-y-soporte-en-campo",
    name: "Mantenimiento y Soporte en Campo",
    tagline: "Cero tiempos muertos: cuadrillas técnicas listas para responder",
    summary: "Asistencia electromecánica preventiva y correctiva in situ para garantizar máxima continuidad operativa.",
    description: "Sabemos el costo que representa una parada de maquinaria en obra. Contamos con técnicos móviles equipados con herramientas de diagnóstico, lubricantes y repuestos críticos de alta rotación para intervenir en campo o realizar cambio preventivo de equipos.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    iconName: "Wrench",
    capabilities: [
      "Diagnóstico computarizado de sistemas diésel y electro-hidráulicos",
      "Mantenimiento preventivo por horómetro (cambio de filtros, aceites y engrase)",
      "Reparación in situ de mangueras hidráulicas y sistemas de encendido",
      "Taller central para overhauls mayores y calibración de instrumentos",
    ],
    workflow: [
      { step: "01", title: "Reporte inmediato", detail: "Canal prioritario vía WhatsApp y soporte telefónico directo con el jefe de taller." },
      { step: "02", title: "Despacho técnico", detail: "Movilización de cuadrilla móvil con repuestos específicos identificados." },
      { step: "03", title: "Solución o reemplazo", detail: "Si la falla supera el tiempo estándar de intervención, sustituimos el equipo." },
    ],
    commercialNote: "Mantenimiento por desgaste normal incluido sin costo adicional en contratos de alquiler.",
  },
  {
    id: "asistencia-tecnica-modulacion",
    slug: "asistencia-tecnica-y-modulacion",
    name: "Asistencia Técnica y Asesoría en Obra",
    tagline: "Ingeniería aplicada para optimizar rendimiento y seguridad",
    summary: "Modulación de formaletas, memorias de cálculo para andamios, diseño de mezclas y acompañamiento en fundidas.",
    description: "Ponemos a disposición de su departamento técnico ingenieros civiles y mecánicos especializados en optimización de encofrados, planes de vaciado y cálculo de cargas de apuntalamiento, asegurando que cada metro cuadrado rinda al máximo.",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    iconName: "ShieldCheck",
    capabilities: [
      "Modulación paramétrica en CAD/BIM de formaletas metálicas y sistemas de losa",
      "Planos de montaje y memorias de cálculo para andamiaje normado en alturas",
      "Asesoría en diseño de juntas de dilatación y especificación de selladores",
      "Capacitación en obra para cuadrillas de operarios en uso seguro de equipos",
    ],
    workflow: [
      { step: "01", title: "Recepción de planos", detail: "Análisis de estructuras, alturas libres, espesores y plazos de desencofrado." },
      { step: "02", title: "Propuesta de despiece", detail: "Entrega de planos de modulación con listado exacto de piezas requeridas." },
      { step: "03", title: "Capacitación en arranque", detail: "Acompañamiento en el primer armado y vaciado para asegurar técnica correcta." },
    ],
    commercialNote: "Servicio de ingeniería integrado en proyectos contratados con BRONTO.",
  },
  {
    id: "capacitacion-operadores",
    slug: "capacitacion-y-certificacion-de-operadores",
    name: "Escuela de Operadores y Capacitación Técnica",
    tagline: "Formación especializada en maquinaria pesada, seguridad operacional y certificación laboral",
    summary: "Entrenamiento teórico-práctico para operadores de línea amarilla, inspección preoperacional, eficiencia en combustible y certificación técnica verificable.",
    description: "Inspirada en el modelo de excelencia de escuelas técnicas de maquinaria pesada como Dozer Maquinarias, BRONTO brinda capacitación profesional y certificación de competencias laborales para operadores de construcción y minería. Ofrecemos formación in-company directamente en frentes de obra o en nuestro patio central en Bogotá y la Sabana, cubriendo operación segura de excavadoras, retrocargadores, minicargadores y rodillos, mecánica básica de campo, sistemas electro-hidráulicos, topografía de obra y normas de seguridad industrial (SST/HSE).",
    imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&auto=format&fit=crop",
    iconName: "GraduationCap",
    capabilities: [
      "Operación técnica y destreza en excavadoras de orugas, retroexcavadoras, minicargadores y rodillos compactadores",
      "Protocolo estricto de inspección preoperacional de 40 puntos y mantenimiento autónomo diario",
      "Técnicas de excavación eficiente, zanjeo, empuje (pushing), nivelación y perfilado de taludes",
      "Manejo defensivo en obra, visibilidad en puntos ciegos, prevención de volcamientos e izaje seguro",
      "Operación económica para reducción de consumo de combustible y menor desgaste de componentes",
      "Expedición de carnet de operador certificado y diploma con código de verificación QR para interventorías",
    ],
    workflow: [
      { step: "01", title: "Diagnóstico inicial", detail: "Evaluamos el nivel de experiencia del personal y los requerimientos específicos de la obra o flota." },
      { step: "02", title: "Módulo técnico-normativo", detail: "Capacitación en mecánica preventiva, seguridad industrial, sistemas hidráulicos y telemetría." },
      { step: "03", title: "Práctica en campo y maniobras", detail: "Horas de práctica real en máquina desarrollando técnicas de precisión, cargue y control de ciclo." },
      { step: "04", title: "Evaluación y certificación", detail: "Prueba práctica estandarizada, entrega de carnet de operador certificado y registro oficial." },
    ],
    commercialNote: "Planes corporativos in-company para constructoras y cursos individuales con cupos mensuales.",
  },
];
