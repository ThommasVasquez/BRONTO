export interface FAQItem {
  id: string;
  category: "general" | "alquiler" | "suministro" | "cotizacion" | "logistica";
  categoryLabel: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "que-es-bronto",
    category: "general",
    categoryLabel: "Sobre BRONTO",
    question: "¿Qué es BRONTO y qué tipo de soluciones ofrece para la construcción?",
    answer: "BRONTO es una plataforma y compañía colombiana especializada en el alquiler y suministro integral de equipos, maquinaria pesada y liviana, sistemas de formaleta metálica, andamios certificados, concretos premezclados e industrializados, y sistemas modulados en EPS para el sector de la construcción y la industria. Nuestro objetivo es que los constructores encuentren todo en un único aliado confiable bajo el lema: 'PIDA TODO EN BRONTO.'",
  },
  {
    id: "como-solicitar-cotizacion",
    category: "cotizacion",
    categoryLabel: "Cotizaciones",
    question: "¿Cómo funciona el proceso de cotización en la plataforma?",
    answer: "Es ágil y directo: puede explorar nuestro catálogo comercial, seleccionar los equipos o materiales requeridos agregándolos a la lista de cotización con sus cantidades estimadas, indicar la ciudad o ubicación del proyecto y la duración esperada de la obra. Al enviar el formulario o contactarnos vía WhatsApp con el resumen generado, un asesor técnico-comercial le responderá con una propuesta económica detallada y formal.",
  },
  {
    id: "requisitos-alquiler",
    category: "alquiler",
    categoryLabel: "Alquiler de Equipos",
    question: "¿Cuáles son los requisitos habituales para alquilar maquinaria o equipos?",
    answer: "Para personas jurídicas y empresas constructoras, los requisitos estándar incluyen: Cámara de Comercio actualizada (no mayor a 30 días), copia del RUT, cédula del representante legal, referencias comerciales del sector, y diligenciamiento del formato de vinculación. Para proyectos de maquinaria pesada, se solicita póliza de seguro de equipo de contratistas (TREC) o acuerdo de cobertura amparada.",
  },
  {
    id: "operador-incluido",
    category: "alquiler",
    categoryLabel: "Alquiler de Equipos",
    question: "¿La maquinaria pesada se alquila con operador o en renta seca?",
    answer: "Disponemos de ambas modalidades según las necesidades de su frente de trabajo: en 'renta seca' (el contratista suministra su operador y combustible), o con 'operador certificado BRONTO', quien cuenta con certificaciones vigentes de competencias laborales, seguridad y salud en el trabajo (SST) y amplia experiencia en maniobras complejas.",
  },
  {
    id: "cobertura-geografica",
    category: "logistica",
    categoryLabel: "Logística y Despacho",
    question: "¿En qué ciudades y regiones de Colombia prestan servicio?",
    answer: "BRONTO cuenta con capacidad de coordinación logística para despachos a nivel nacional en Colombia, cubriendo las principales áreas metropolitanas (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Eje Cafetero) así como frentes de obra en corredores viales, hidroeléctricas y proyectos industriales en regiones intermedias previa validación de acceso.",
  },
  {
    id: "que-pasa-si-equipo-falla",
    category: "alquiler",
    categoryLabel: "Alquiler de Equipos",
    question: "¿Qué sucede si un equipo presenta una falla mecánica durante la obra?",
    answer: "La obra no se detiene. Nuestro compromiso operativo contempla asistencia técnica prioritaria en campo con mecánicos especializados. Si el diagnóstico determina que la reparación requiere tiempo prolongado, procedemos con el cambio y sustitución inmediata de la unidad por una de características equivalentes sin costo de alquiler adicional por el tiempo de inactividad técnica justificada.",
  },
  {
    id: "suministro-concreto-dosificacion",
    category: "suministro",
    categoryLabel: "Suministro y Materiales",
    question: "¿El concreto premezclado cumple con la norma sismorresistente colombiana NSR-10?",
    answer: "Sí. Todas las formulaciones de concreto estructural premezclado e industrializado despachadas cumplen rigurosamente con los lineamientos de la Norma Colombiana de Diseño y Construcción Sismo Resistente (NSR-10, Título C) y la norma técnica NTC 3318. Cada viaje incluye remisión técnica con asentamiento especificado y se expide certificado de dosificación.",
  },
  {
    id: "modulacion-formaletas",
    category: "suministro",
    categoryLabel: "Suministro y Materiales",
    question: "¿BRONTO asesora en la modulación de planos para formaletas y andamios?",
    answer: "Totalmente. Nuestro departamento técnico de ingeniería revisa sus planos estructurales y arquitectónicos en DWG/Revit para entregarle una propuesta de modulación optimizada con el despiece exacto de paneles metálicos, esquineros, corbatas, cuñas y puntales, evitando el sobrecosto por alquiler de piezas innecesarias.",
  },
  {
    id: "tiempo-anticipacion-reserva",
    category: "cotizacion",
    categoryLabel: "Cotizaciones",
    question: "¿Con cuánta anticipación debo reservar los equipos o la maquinaria?",
    answer: "Para equipos de alta rotación (compactadores menores, martillos, motobombas y andamios) podemos despachar en un plazo de 24 a 48 horas hábiles según disponibilidad en bodega. Para maquinaria pesada (excavadoras de 20T, motoniveladoras, rodillos de 10T) o sistemas masivos de formaleta y concreto, sugerimos coordinar la reserva con 3 a 5 días de antelación para asegurar la logística de transporte y los turnos de fundida.",
  },
];
