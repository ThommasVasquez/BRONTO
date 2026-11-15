"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { PwaInstallPrompt } from "./PwaInstallPrompt";

export const SiteChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isApp = pathname === "/app" || pathname?.startsWith("/app/");

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
