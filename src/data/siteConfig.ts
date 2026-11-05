export interface SiteConfig {
  brandName: string;
  legalBrandName: string;
  showRegisteredSymbol: boolean;
  tagline: string;
  slogan: string;
  secondarySlogan: string;
  description: string;
  coverageArea: string;
  coverageMunicipalities: string[];
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
    signatureText: string;
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
  legalBrandName: "BRONTO S.A.S.",
  showRegisteredSymbol: false, // Regla estricta: mientras no se confirme el registro marcario, no mostrar ® en piezas públicas
  tagline: "PIDA TODO EN BRONTO.",
  slogan: "LA OBRA NO SE DETIENE.",
  secondarySlogan: "Equipos, maquinaria y soluciones para construir sin límites.",
  description: "Plataforma especializada en alquiler y suministro de maquinaria pesada, equipos menores, formaletas, concretos y sistemas modulados para construcción e industria en Bogotá y zonas aledañas de la Sabana.",
  coverageArea: "Bogotá D.C. y Zonas Aledañas (Sabana Centro y Occidente)",
  coverageMunicipalities: [
    "Bogotá D.C.",
    "Chía",
    "Cajicá",
    "Cota / Siberia",
    "Mosquera",
    "Funza",
    "Madrid",
    "Facatativá",
    "Soacha",
    "Zipaquirá",
    "Tocancipá",
    "Sopó",
    "Tenjo",
    "Subachoque",
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://bronto.com.co",
  contact: {
    phone: "+57 (601) 745-0000",
    phoneFormatted: "6017450000",
    whatsapp: "573100000000",
    whatsappFormatted: "+57 310 000 0000",
    email: "comercial@bronto.com.co",
    address: "Corredor Industrial Sabana Occidente / Calle 80",
    city: "Bogotá D.C. y Sabana",
    country: "Colombia",
    operationHours: "Lunes a Viernes: 6:00 a.m. - 6:00 p.m. | Sábados: 7:00 a.m. - 1:00 p.m.",
    emergencySupport: "Despacho express y asistencia técnica prioritaria en frentes de obra de Bogotá y municipios aledaños",
  },
  social: {
    instagram: "https://instagram.com/bronto_colombia",
    linkedin: "https://linkedin.com/company/bronto-colombia",
    facebook: "https://facebook.com/bronto.colombia",
    youtube: "https://youtube.com/@bronto-colombia",
  },
  developer: {
    signatureText: "Desarrollado con todo el poder de ENERGYSOFTmedia® | Software con Energía! ⚡️",
    name: "ENERGYSOFTmedia®",
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
