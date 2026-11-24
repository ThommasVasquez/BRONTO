import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";
import { SiteChrome } from "@/components/common/SiteChrome";
import { QuoteBasketProvider } from "@/components/quote/QuoteBasketProvider";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ClientAuthProvider } from "@/components/auth/ClientAuthProvider";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#17191D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "BRONTO® | Maquinaria Pesada, Formaletas y Concreto para Obra",
    template: "%s | BRONTO®",
  },
  description: siteConfig.description,
  applicationName: "BRONTO®",
  appleWebApp: {
    title: "BRONTO®",
    capable: true,
    statusBarStyle: "black-translucent",
  },
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
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icons/icon-192-v3.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512-v3.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-192-v3.png", sizes: "192x192", type: "image/png" },
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
    <html
      lang="es"
      className={`dark scroll-smooth ${barlowCondensed.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192-v3.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512-v3.png" />
      </head>
      <body className="bg-storm text-[#F5F7F9] min-h-screen flex flex-col font-sans antialiased selection:bg-[#FF5F00] selection:text-[#111316]">
        <ThemeProvider>
          <ClientAuthProvider>
            <QuoteBasketProvider>
              <SiteChrome>
                {children}
              </SiteChrome>
            </QuoteBasketProvider>
          </ClientAuthProvider>
        </ThemeProvider>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    reg.update();
                  }).catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
