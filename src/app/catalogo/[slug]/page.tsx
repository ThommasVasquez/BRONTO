import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { catalogProducts, catalogCategories } from "@/data/catalogData";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";
import { ProductDetailClient } from "./ProductDetailClient";
import { 
  CheckCircle2, 
  ShieldAlert, 
  FileDown, 
  ArrowRight,
  Eye
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return catalogProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = catalogProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Equipo no encontrado | BRONTO",
    };
  }

  return {
    title: `${product.name} | Catálogo BRONTO`,
    description: `${product.shortDescription} Consulte especificaciones técnicas y cotización de ${product.name} para proyectos en Colombia.`,
    alternates: {
      canonical: `/catalogo/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | BRONTO Colombia`,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0].url] : [],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = catalogProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const category = catalogCategories.find((c) => c.id === product.categoryId);
  const relatedProducts = catalogProducts
    .filter((p) => product.relatedSlugs.includes(p.slug) || (p.categoryId === product.categoryId && p.id !== product.id))
    .slice(0, 3);

  const productSchema = getProductSchema(product);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Catálogo", url: "/catalogo" },
    { name: category ? category.shortName : "Categoría", url: `/catalogo?categoria=${product.categoryId}` },
    { name: product.name, url: `/catalogo/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pt-28 pb-24 bg-[#151515] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Catálogo", href: "/catalogo" },
              { label: category ? category.shortName : "Familia", href: `/catalogo?categoria=${product.categoryId}` },
              { label: product.name },
            ]}
          />

          {/* Bloque Superior: Galería Interactiva + Ficha Comercial */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Componente Cliente para Galería y Cotizador Directo */}
            <ProductDetailClient product={product} />

            {/* Columna Derecha: Especificaciones Técnicas y Condiciones */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tabla de Especificaciones Técnicas */}
              <div className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-bronto-yellow font-bold mb-4 flex items-center justify-between">
                  <span>Ficha Técnica y Parámetros</span>
                  <span className="text-[10px] text-white/50">NSR-10 / Estándar</span>
                </h3>

                <div className="divide-y divide-[#2B2B2B]">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className={`py-2.5 flex items-center justify-between text-xs font-mono ${
                        spec.highlight ? "text-bronto-yellow font-bold" : "text-white"
                      }`}
                    >
                      <span className="text-white/60">{spec.label}</span>
                      <span className="text-right pl-4">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Características Clave y Respaldo */}
              <div className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3">
                  Características de Rendimiento
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-bronto-gray font-sans">
                      <CheckCircle2 className="w-4 h-4 text-bronto-yellow shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Condiciones de Alquiler / Suministro */}
              {(product.rentalConditions || product.supplyConditions || product.serviceConditions) && (
                <div className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-6 text-xs font-sans text-white/80 space-y-2">
                  <span className="font-mono text-[11px] uppercase font-bold text-bronto-yellow flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Condiciones Comerciales de Despacho
                  </span>
                  <ul className="space-y-1.5 list-disc list-inside text-bronto-gray text-[11px] pt-1">
                    {product.rentalConditions?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                    {product.supplyConditions?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                    {product.serviceConditions?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ficha técnica PDF demostrativa */}
              <div className="p-4 bg-[#1F1F1F] border border-[#333333] rounded-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-bronto-carbon border border-[#333333] text-bronto-yellow rounded-sm">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-white font-bold block">
                      Ficha Técnica Homologada
                    </span>
                    <span className="text-[11px] text-bronto-gray">
                      Formato PDF &bull; {product.sku}
                    </span>
                  </div>
                </div>

                <a
                  href={`/contacto?asunto=Ficha-${product.sku}`}
                  className="px-3 py-1.5 border border-white/20 hover:border-bronto-yellow text-white hover:text-bronto-yellow font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
                >
                  Solicitar PDF
                </a>
              </div>
            </div>
          </div>

          {/* Sección de Equipos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#242424]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
                    SOLUCIONES COMPLEMENTARIAS
                  </span>
                  <h3 className="font-heading uppercase text-2xl sm:text-3xl font-black text-white mt-1">
                    EQUIPOS RELACIONADOS
                  </h3>
                </div>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-bronto-yellow hover:underline"
                >
                  <span>Ver catálogo completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-4 flex flex-col justify-between group hover:border-bronto-yellow transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${rel.images[0]?.url}')` }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[9px] font-mono uppercase text-bronto-yellow font-bold rounded-sm">
                        {rel.modality.replace("_", " & ")}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-white/50">{rel.sku}</span>
                      <h4 className="font-heading uppercase text-base font-bold text-white group-hover:text-bronto-yellow transition-colors mt-0.5">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-bronto-gray mt-1 line-clamp-2 font-sans">
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#2B2B2B]">
                      <Link
                        href={`/catalogo/${rel.slug}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-[#252525] hover:bg-bronto-yellow hover:text-[#151515] text-white text-xs font-mono uppercase rounded-sm transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver equipo</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

