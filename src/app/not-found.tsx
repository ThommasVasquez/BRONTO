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
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            ERROR 404 &bull; PÁGINA NO ENCONTRADA
          </span>
          <h1 className="font-heading uppercase text-4xl sm:text-5xl font-black text-white mt-2">
            FRENTE NO ENCONTRADO
          </h1>
          <p className="mt-3 text-sm text-bronto-gray font-sans">
            La ruta o referencia solicitada no existe o fue reubicada en nuestro catálogo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-bronto-yellow text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>

          <Link
            href="/catalogo"
            className="w-full sm:w-auto px-6 py-3 border border-[#333333] hover:border-white text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver catálogo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
