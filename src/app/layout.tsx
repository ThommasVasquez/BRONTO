import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PwaInstallPrompt } from "@/components/common/PwaInstallPrompt";
import { QuoteBasketProvider } from "@/components/quote/QuoteBasketProvider";

export const viewport: Viewport = {
  themeColor: "#FEE123",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "BRONTO | Equipos, Maquinaria y Soluciones para Construcción",
    template: "%s | BRONTO",
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,
  authors: [{ name: "BRONTO Colombia" }, { name: "ENERGYSOFTmedia", url: "https://energysoftmedia.com" }],
  generator: "Next.js",
  keywords: [
    "alquiler de maquinaria bogota",
    "alquiler de equipos de construccion sabana de bogota",
    "maquinaria pesada chia cota mosquera funza",
    "alquiler formaletas bogota",
    "andamios certificados multidireccionales cundinamarca",
    "plantas electricas diesel bogota",
    "concreto premezclado bogota sabana",
    "casetones aligerados icopor bogota",
    "pida todo en bronto",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-[#151515] text-white min-h-screen flex flex-col font-sans antialiased selection:bg-bronto-yellow selection:text-[#151515]">
        <QuoteBasketProvider>
          <Header />
          <main className="flex-1 w-full" id="main-content">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <PwaInstallPrompt />
        </QuoteBasketProvider>

        {/* Registro seguro del Service Worker para PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      // SW registrado satisfactoriamente
                    },
                    function(err) {
                      // Fallo no crítico de registro
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
