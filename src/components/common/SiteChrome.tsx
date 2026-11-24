"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { PwaInstallPrompt } from "./PwaInstallPrompt";

export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isClientApp, setIsClientApp] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isPathApp = window.location.pathname === "/app" || window.location.pathname.startsWith("/app");
      setIsClientApp(isPathApp);
    }
  }, [pathname]);

  const isApp =
    isClientApp ||
    pathname === "/app" ||
    pathname?.startsWith("/app/") ||
    (typeof window !== "undefined" && (window.location.pathname === "/app" || window.location.pathname.startsWith("/app")));

  return (
    <>
      {!isApp && <Header />}
      <main className="flex-1 w-full" id="main-content">
        {children}
      </main>
      {!isApp && <Footer />}
      {!isApp && <WhatsAppButton />}
      {!isApp && <PwaInstallPrompt />}
    </>
  );
};

