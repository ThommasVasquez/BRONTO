import React from "react";
import Link from "next/link";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 bg-[#151515] min-h-screen text-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <DynastesBeetleSymbol className="w-20 h-20 mx-auto" size={100} />

        <div>
          <h1 className="uppercase text-4xl sm:text-5xl font-black text-white mt-2">
            Página No Encontrada
          </h1>
          <p className="mt-3 text-sm text-white/70">
            La ruta o referencia solicitada no existe o fue reubicada en nuestro catálogo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>

          <Link
            href="/catalogo"
            className="w-full sm:w-auto px-6 py-3 border border-[#333333] hover:border-white text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver catálogo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

