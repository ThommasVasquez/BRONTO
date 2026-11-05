import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

interface BrandLogoProps {
  variant?: "full" | "symbol" | "wordmark";
  color?: "default" | "yellow" | "dark" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withLink?: boolean;
}

export const DynastesBeetleSymbol: React.FC<{ className?: string; colorFill?: string }> = ({
  className = "w-8 h-8",
  colorFill = "currentColor",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Símbolo Escarabajo Dynastes BRONTO"
    >
      {/* Símbolo hercúleo Dynastes: silueta estilizada y precisa para identidad industrial */}
      {/* Cuerno torácico superior dominante (característica distintiva Dynastes) */}
      <path
        d="M50 4C51.5 12 55 19 62 23C56 24 53 28 52 34C51 31 49 31 48 34C47 28 44 24 38 23C45 19 48.5 12 50 4Z"
        fill={colorFill}
      />
      {/* Cuerno cefálico inferior curvo hacia arriba con dientes interiores */}
      <path
        d="M50 14C49 20 46 25 43 28C47 28.5 48.5 25 50 20C51.5 25 53 28.5 57 28C54 25 51 20 50 14Z"
        fill={colorFill}
      />
      {/* Pronoto / Escudo torácico superior imponente */}
      <path
        d="M32 35C32 30 38 28 50 28C62 28 68 30 68 35C70 42 71 49 69 51C65 52 57 51 50 52C43 51 35 52 31 51C29 49 30 42 32 35Z"
        fill={colorFill}
      />
      {/* Élitros / Coraza principal del escarabajo */}
      <path
        d="M31 54C34 53 43 54.5 49 55V88C40 85 30 76 29 65C28.5 60 29.5 56 31 54Z"
        fill={colorFill}
      />
      <path
        d="M69 54C66 53 57 54.5 51 55V88C60 85 70 76 71 65C71.5 60 70.5 56 69 54Z"
        fill={colorFill}
      />
      {/* Sutura élitros / línea central de potencia */}
      <line x1="50" y1="54" x2="50" y2="88" stroke="#151515" strokeWidth="1.5" />
      {/* Patas anteriores articuladas de prensión */}
      <path
        d="M29 38C22 34 16 32 10 34C9 35 11 37 15 37C21 37 25 41 28 44L29 38Z"
        fill={colorFill}
      />
      <path
        d="M71 38C78 34 84 32 90 34C91 35 89 37 85 37C79 37 75 41 72 44L71 38Z"
        fill={colorFill}
      />
      {/* Patas medias */}
      <path
        d="M28 49C19 49 14 53 8 61C7 62 9 63 12 61C17 57 22 56 27 55L28 49Z"
        fill={colorFill}
      />
      <path
        d="M72 49C81 49 86 53 92 61C93 62 91 63 88 61C83 57 78 56 73 55L72 49Z"
        fill={colorFill}
      />
      {/* Patas posteriores de anclaje de gran fuerza */}
      <path
        d="M30 67C22 71 16 79 12 90C11 92 13 93 16 90C20 83 25 78 31 74L30 67Z"
        fill={colorFill}
      />
      <path
        d="M70 67C78 71 84 79 88 90C89 92 87 93 84 90C80 83 75 78 69 74L70 67Z"
        fill={colorFill}
      />
      {/* Micro-detalle reflectante naranja energético para acento técnico */}
      <circle cx="50" cy="33" r="2.2" fill="#FF6511" />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "full",
  color = "default",
  size = "md",
  className = "",
  withLink = true,
}) => {
  const sizeMap = {
    sm: { symbol: "w-6 h-6", text: "text-lg tracking-wider", tag: "text-[9px]" },
    md: { symbol: "w-9 h-9", text: "text-2xl tracking-wider", tag: "text-[10px]" },
    lg: { symbol: "w-12 h-12", text: "text-3xl tracking-wider", tag: "text-xs" },
    xl: { symbol: "w-16 h-16", text: "text-4xl tracking-wider", tag: "text-sm" },
  };

  const currentSize = sizeMap[size];

  let colorClasses = {
    symbolFill: "#FEE123",
    textClass: "text-white",
    taglineClass: "text-[#A6A6A6]",
  };

  if (color === "yellow") {
    colorClasses = {
      symbolFill: "#151515",
      textClass: "text-[#151515]",
      taglineClass: "text-[#151515]/80",
    };
  } else if (color === "dark") {
    colorClasses = {
      symbolFill: "#151515",
      textClass: "text-[#151515]",
      taglineClass: "text-[#242424]",
    };
  } else if (color === "white") {
    colorClasses = {
      symbolFill: "#FFFFFF",
      textClass: "text-white",
      taglineClass: "text-white/70",
    };
  }

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {variant !== "wordmark" && (
        <div className="relative flex items-center justify-center shrink-0">
          <DynastesBeetleSymbol
            className={`${currentSize.symbol} transition-transform duration-300 group-hover:scale-105`}
            colorFill={colorClasses.symbolFill}
          />
        </div>
      )}

      {variant !== "symbol" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center">
            <span
              className={`font-black font-heading uppercase ${currentSize.text} ${colorClasses.textClass} tracking-tight font-extrabold`}
              style={{ letterSpacing: "-0.03em" }}
            >
              BRONTO
            </span>
            {/* Preparado para incorporar ® cuando se confirme el registro marcario oficial */}
            {siteConfig.showRegisteredSymbol && (
              <span className="text-[10px] font-bold text-bronto-yellow ml-0.5 align-super">
                ®
              </span>
            )}
          </div>
          <span
            className={`font-mono uppercase font-semibold text-[9px] tracking-widest text-bronto-gray transition-colors group-hover:text-bronto-yellow`}
            style={{ letterSpacing: "0.15em" }}
          >
            EQUIPOS &bull; OBRA &bull; INDUSTRIA
          </span>
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
