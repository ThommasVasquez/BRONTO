import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Ruta de navegación" className="py-3 text-xs">
      <ol className="flex items-center flex-wrap gap-1.5 text-[#B8C1CC]">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#FF5F00] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Inicio</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#8E99A6]" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[#FF5F00] transition-colors truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-semibold truncate max-w-[240px]">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-[#8E99A6]" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

