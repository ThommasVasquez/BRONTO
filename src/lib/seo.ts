import { siteConfig } from "@/data/siteConfig";
import { Product } from "@/types/catalog";
import { FAQItem } from "@/data/faqData";
import { ServiceItem } from "@/data/servicesData";

export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    alternateName: "BRONTO Colombia",
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/icons/icon-512.png`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
  };
};

export const getWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brandName,
    url: siteConfig.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/catalogo?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
};

export const getProductSchema = (product: Product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "COP",
      price: "0", // Cotización a convenir según plazos y volumen
      description: product.priceNote,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${siteConfig.siteUrl}/catalogo/${product.slug}`,
    },
  };
};

export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  };
};

export const getFAQSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const getServiceSchema = (service: ServiceItem) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.tagline,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    url: `${siteConfig.siteUrl}/servicios#${service.id}`,
  };
};
