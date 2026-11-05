import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

interface BrandLogoProps {
  variant?: "full" | "symbol" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withLink?: boolean;
}

export const DynastesBeetleSymbol: React.FC<{
  className?: string;
  colorFill?: string;
  size?: number;
}> = ({ className = "w-8 h-8", size = 80 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Image
        src="/brand/bronto-beetle.png"
        alt="Símbolo Escarabajo Dynastes BRONTO"
        width={size}
        height={Math.round(size * 0.426)}
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  withLink = true,
}) => {
  // Proporciones oficiales exactas del recurso marcario original sin deformación (ratio: 1.97)
  const sizeMap = {
    sm: {
      full: { width: 110, height: 56, className: "h-9 w-auto" },
      symbol: { width: 47, height: 20, className: "h-5 w-auto" },
    },
    md: {
      full: { width: 148, height: 75, className: "h-12 w-auto" },
      symbol: { width: 66, height: 28, className: "h-7 w-auto" },
    },
    lg: {
      full: { width: 197, height: 100, className: "h-16 w-auto" },
      symbol: { width: 94, height: 40, className: "h-10 w-auto" },
    },
    xl: {
      full: { width: 260, height: 132, className: "h-20 w-auto" },
      symbol: { width: 127, height: 54, className: "h-14 w-auto" },
    },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      {variant === "symbol" ? (
        <div className="relative flex items-center justify-center">
          <Image
            src="/brand/bronto-beetle.png"
            alt="Símbolo Escarabajo Dynastes BRONTO"
            width={currentSize.symbol.width}
            height={currentSize.symbol.height}
            className={`${currentSize.symbol.className} object-contain transition-transform duration-300 group-hover:scale-105`}
            priority
          />
        </div>
      ) : (
        <div className="relative flex items-center">
          {/* Logo para Modo Oscuro (letras BRONTO en blanco) */}
          <Image
            src="/brand/bronto-logo.png"
            alt="BRONTO - Equipos para Construcción e Industria"
            width={currentSize.full.width}
            height={currentSize.full.height}
            className={`${currentSize.full.className} hidden dark:block object-contain transition-transform duration-300 group-hover:scale-105`}
            priority
          />
          {/* Logo para Modo Claro (letras BRONTO en carbón oscuro) */}
          <Image
            src="/brand/bronto-logo-dark-text.png"
            alt="BRONTO - Equipos para Construcción e Industria"
            width={currentSize.full.width}
            height={currentSize.full.height}
            className={`${currentSize.full.className} block dark:hidden object-contain transition-transform duration-300 group-hover:scale-105`}
            priority
          />
          {siteConfig.showRegisteredSymbol && (
            <span className="text-[10px] font-bold text-bronto-yellow ml-0.5 align-super">
              ®
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link
        href="/"
        className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-bronto-yellow rounded-sm"
        aria-label="Ir a la página de inicio de BRONTO"
      >
        {content}
      </Link>
    );
  }

  return content;
};
