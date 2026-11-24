import React from "react";
import Link from "next/link";
import Image from "next/image";

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
        alt="Símbolo Escarabajo Dynastes BRONTO®"
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
  const sizeMap = {
    sm: {
      full: { width: 108, height: 55, className: "h-8 sm:h-9 w-auto" },
      symbol: { width: 47, height: 20, className: "h-5 w-auto" },
    },
    md: {
      full: { width: 142, height: 72, className: "h-10 sm:h-11 w-auto" },
      symbol: { width: 66, height: 28, className: "h-7 w-auto" },
    },
    lg: {
      full: { width: 186, height: 94, className: "h-14 w-auto" },
      symbol: { width: 94, height: 40, className: "h-10 w-auto" },
    },
    xl: {
      full: { width: 248, height: 126, className: "h-18 w-auto" },
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
            alt="Símbolo Escarabajo Dynastes BRONTO®"
            width={currentSize.symbol.width}
            height={currentSize.symbol.height}
            className={`${currentSize.symbol.className} object-contain`}
            priority
          />
        </div>
      ) : (
        <div className="relative flex items-center">
          {/* Siempre usamos el logotipo con texto BRONTO® en blanco puro (#FFFFFF) y escarabajo Naranja Seguridad (#FF5F00) para máximo contraste sobre Gris Tormenta y Negro Mate */}
          <Image
            src="/brand/bronto-logo.png"
            alt="BRONTO® — Maquinaria, Formaletas y Concreto"
            width={currentSize.full.width}
            height={currentSize.full.height}
            className={`${currentSize.full.className} object-contain`}
            priority
          />
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link
        href="/"
        className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F00]"
        aria-label="Ir al inicio de BRONTO®"
      >
        {content}
      </Link>
    );
  }

  return content;
};
