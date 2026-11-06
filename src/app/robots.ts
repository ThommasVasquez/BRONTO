import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/offline",
        ],
      },
      // Reglas favorables para rastreadores de motores generativos (GEO)
      {
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: [
          "/",
          "/catalogo",
          "/catalogo/",
          "/servicios",
          "/nosotros",
          "/preguntas-frecuentes",
          "/llms.txt",
        ],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}

