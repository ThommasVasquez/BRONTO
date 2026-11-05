"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ActiveProject {
  id: string;
  name: string;
  location: string;
  municipality: string;
  startDate: string;
  residentEngineer: string;
  status: "activo" | "por_iniciar" | "finalizado";
}

export interface RentedItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  projectName: string;
  horometerHours: number;
  startDate: string;
  nextMaintenance: string;
  status: "operativo" | "en_mantenimiento" | "programado";
}

export interface TechnicalDocument {
  id: string;
  title: string;
  type: "Acta de Entrega" | "Certificado Alturas Res. 4272" | "Certificado Dosificación NSR-10" | "Remisión Cama Baja";
  date: string;
  skuRef: string;
}

export interface ClientUser {
  id: string;
  companyName: string;
  nit: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  activeProjects: ActiveProject[];
  rentedEquipment: RentedItem[];
  documents: TechnicalDocument[];
}

export const DEMO_CLIENTS: ClientUser[] = [
  {
    id: "cli-bolivar",
    companyName: "Constructora Bolívar S.A.S.",
    nit: "860.051.240-1",
    contactName: "Ing. Carlos Méndez",
    email: "carlos.mendez@constructorabolivar.com",
    phone: "+57 310 445 8899",
    city: "Bogotá D.C.",
    activeProjects: [
      {
        id: "prj-01",
        name: "Proyecto Residencial Sabana Park",
        location: "Km 4 Vía Cota - Chía",
        municipality: "Cota / Chía",
        startDate: "15 de Enero de 2026",
        residentEngineer: "Ing. Carlos Méndez",
        status: "activo",
      },
      {
        id: "prj-02",
        name: "Frente Industrial Corredor Siberia",
        location: "Parque Industrial Los Robles, Calle 80",
        municipality: "Siberia / Tenjo",
        startDate: "02 de Marzo de 2026",
        residentEngineer: "Ing. Valentina Rojas",
        status: "activo",
      },
    ],
    rentedEquipment: [
      {
        id: "rent-01",
        name: "Retroexcavadora Sobre Orugas 20T",
        sku: "BRT-MAQ-001",
        category: "Maquinaria Pesada",
        projectName: "Proyecto Residencial Sabana Park",
        horometerHours: 428,
        startDate: "15/01/2026",
        nextMaintenance: "500 Horas (Preventivo en campo)",
        status: "operativo",
      },
      {
        id: "rent-02",
        name: "Sistema de Encofrado Metálico Steel-Ply",
        sku: "BRT-FOR-001",
        category: "Formaletas y Encofrados",
        projectName: "Proyecto Residencial Sabana Park",
        horometerHours: 0,
        startDate: "20/01/2026",
        nextMaintenance: "Revisión de aplomes quincenal",
        status: "operativo",
      },
      {
        id: "rent-03",
        name: "Generador Diésel Insonorizado 100 kVA",
        sku: "BRT-MAQ-004",
        category: "Equipos Eléctricos",
        projectName: "Frente Industrial Corredor Siberia",
        horometerHours: 312,
        startDate: "02/03/2026",
        nextMaintenance: "400 Horas (Cambio de filtros)",
        status: "operativo",
      },
    ],
    documents: [
      {
        id: "doc-01",
        title: "Acta de Entrega e Inspección Digital 40 Puntos - BRT-MAQ-001",
        type: "Acta de Entrega",
        date: "15/01/2026",
        skuRef: "BRT-MAQ-001",
      },
      {
        id: "doc-02",
        title: "Certificado de Conformidad Andamios Multidireccionales Res. 4272",
        type: "Certificado Alturas Res. 4272",
        date: "20/01/2026",
        skuRef: "BRT-FOR-002",
      },
      {
        id: "doc-03",
        title: "Certificado de Dosificación Concreto 4000 PSI NTC 3318 / NSR-10",
        type: "Certificado Dosificación NSR-10",
        date: "10/02/2026",
        skuRef: "BRT-CON-001",
      },
      {
        id: "doc-04",
        title: "Remisión y Planilla de Transporte Cama Baja Calle 80",
        type: "Remisión Cama Baja",
        date: "02/03/2026",
        skuRef: "BRT-MAQ-004",
      },
    ],
  },
];

interface ClientAuthContextType {
  user: ClientUser | null;
  isLoggedIn: boolean;
  login: (emailOrNit: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithDemo: (demoId: string) => void;
  register: (data: Partial<ClientUser>) => Promise<{ success: boolean }>;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ClientUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bronto-client-user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const login = async (emailOrNit: string, _pass: string) => {
    // Si coincide con el NIT o email de Bolívar
    const found = DEMO_CLIENTS.find(
      (c) =>
        c.email.toLowerCase() === emailOrNit.toLowerCase().trim() ||
        c.nit.replace(/[^0-9]/g, "") === emailOrNit.replace(/[^0-9]/g, "")
    );

    if (found) {
      setUser(found);
      try {
        localStorage.setItem("bronto-client-user", JSON.stringify(found));
      } catch {}
      return { success: true };
    }

    // Permite acceso como cliente verificado para cualquier NIT válido
    const customUser: ClientUser = {
      id: `cli-${Date.now()}`,
      companyName: emailOrNit.includes("@") ? "Constructora e Ingeniería Aliada" : `Contratista NIT ${emailOrNit}`,
      nit: emailOrNit.includes("@") ? "900.554.120-3" : emailOrNit,
      contactName: "Ingeniero Residente",
      email: emailOrNit.includes("@") ? emailOrNit : "residente@constructora.com",
      phone: "+57 315 705 2810",
      city: "Bogotá D.C. y Sabana",
      activeProjects: [
        {
          id: "prj-demo",
          name: "Obra Corredor Occidental Bogotá",
          location: "Av. Calle 80 # 115-40",
          municipality: "Bogotá D.C. / Funza",
          startDate: "01/02/2026",
          residentEngineer: "Ingeniero Residente",
          status: "activo",
        },
      ],
      rentedEquipment: [
        {
          id: "rent-custom-1",
          name: "Rodillo Compactador Monocilíndrico 10T",
          sku: "BRT-MAQ-003",
          category: "Compactación",
          projectName: "Obra Corredor Occidental Bogotá",
          horometerHours: 195,
          startDate: "05/02/2026",
          nextMaintenance: "250 Horas",
          status: "operativo",
        },
      ],
      documents: [
        {
          id: "doc-custom-1",
          title: "Acta de Despacho y Prueba de Carga Inicial",
          type: "Acta de Entrega",
          date: "05/02/2026",
          skuRef: "BRT-MAQ-003",
        },
      ],
    };

    setUser(customUser);
    try {
      localStorage.setItem("bronto-client-user", JSON.stringify(customUser));
    } catch {}
    return { success: true };
  };

  const loginWithDemo = (demoId: string) => {
    const demo = DEMO_CLIENTS.find((c) => c.id === demoId) || DEMO_CLIENTS[0];
    setUser(demo);
    try {
      localStorage.setItem("bronto-client-user", JSON.stringify(demo));
    } catch {}
  };

  const register = async (data: Partial<ClientUser>) => {
    const newUser: ClientUser = {
      id: `cli-${Date.now()}`,
      companyName: data.companyName || "Nueva Constructora",
      nit: data.nit || "900.000.000-0",
      contactName: data.contactName || "Ingeniero Contacto",
      email: data.email || "contacto@empresa.com",
      phone: data.phone || "+57 300 000 0000",
      city: data.city || "Bogotá D.C.",
      activeProjects: [],
      rentedEquipment: [],
      documents: [],
    };

    setUser(newUser);
    try {
      localStorage.setItem("bronto-client-user", JSON.stringify(newUser));
    } catch {}
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("bronto-client-user");
    } catch {}
  };

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        loginWithDemo,
        register,
        logout,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error("useClientAuth must be used within a ClientAuthProvider");
  }
  return context;
};

