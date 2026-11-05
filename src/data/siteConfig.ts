export interface SiteConfig {
  brandName: string;
  legalBrandName: string;
  showRegisteredSymbol: boolean;
  tagline: string;
  slogan: string;
  secondarySlogan: string;
  description: string;
  siteUrl: string;
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    address: string;
    city: string;
    country: string;
    operationHours: string;
    emergencySupport: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
    youtube: string;
  };
  developer: {
    label: string;
    name: string;
    url: string;
  };
  colors: {
    industrialYellow: string;
    carbonBlack: string;
    graphite: string;
    white: string;
    technicalGray: string;
    energeticOrange: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: "BRONTO",
  legalBrandName: "BRONTO S.A.S. (En estructuración comercial)",
  showRegisteredSymbol: false, // Regla estricta: mientras no se confirme el registro marcario, no mostrar ® en piezas públicas
  tagline: "PIDA TODO EN BRONTO.",
  slogan: "LA OBRA NO SE DETIENE.",
  secondarySlogan: "Equipos, maquinaria y soluciones para construir sin límites.",
  description: "Plataforma colombiana especializada en alquiler y suministro de maquinaria pesada, equipos menores, formaletas, concretos y sistemas modulados para la construcción y la industria.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bronto.com.co",
  contact: {
    phone: "+57 (601) 745-0000", // Placeholder configurable de contacto
    phoneFormatted: "6017450000",
    whatsapp: "573100000000", // Configurable por el cliente
    whatsappFormatted: "+57 310 000 0000",
    email: "comercial@bronto.com.co",
    address: "Parque Industrial y Logístico, Eje Nacional",
    city: "Bogotá D.C. / Cobertura Nacional",
    country: "Colombia",
    operationHours: "Lunes a Viernes: 6:00 a.m. - 6:00 p.m. | Sábados: 7:00 a.m. - 1:00 p.m.",
    emergencySupport: "Despacho y asistencia técnica 24/7 para proyectos de alta criticidad",
  },
  social: {
    instagram: "https://instagram.com/bronto_colombia",
    linkedin: "https://linkedin.com/company/bronto-colombia",
    facebook: "https://facebook.com/bronto.colombia",
    youtube: "https://youtube.com/@bronto-colombia",
  },
  developer: {
    label: "Desarrollado por",
    name: "ENERGYSOFTmedia® ⚡️",
    url: "https://energysoftmedia.com",
  },
  colors: {
    industrialYellow: "#FEE123",
    carbonBlack: "#151515",
    graphite: "#242424",
    white: "#FFFFFF",
    technicalGray: "#A6A6A6",
    energeticOrange: "#FF6511",
  },
};
