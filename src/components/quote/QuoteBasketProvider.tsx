"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ModalityType } from "@/types/catalog";
import { QuoteItem } from "@/types/quote";
import { catalogProducts } from "@/data/catalogData";

interface QuoteBasketContextType {
  items: QuoteItem[];
  addItem: (product: Product, quantity?: number, modality?: ModalityType, duration?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateDuration: (productId: string, duration: string) => void;
  clearBasket: () => void;
  isInBasket: (productId: string) => boolean;
  totalCount: number;
}

const QuoteBasketContext = createContext<QuoteBasketContextType | undefined>(undefined);

const STORAGE_KEY = "bronto_quote_basket_v1";

export const QuoteBasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carga inicial desde localStorage con reconciliación de catálogo
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: QuoteItem[] = JSON.parse(saved);
        const reconciled = parsed
          .map((item) => {
            const fresh = catalogProducts.find((p) => p.id === item.product?.id);
            return {
              ...item,
              product: fresh || item.product,
            };
          })
          .filter((item) => item.product && item.product.id);
        setItems(reconciled);
      }
    } catch {
      // Ignorar en SSR o modo privado restringido
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persistencia al cambiar items
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Ignorar
      }
    }
  }, [items, isLoaded]);

  const addItem = (
    product: Product,
    quantity: number = 1,
    modality: ModalityType = product.modality,
    duration: string = "1 mes"
  ) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, modality, estimatedDuration: duration }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateDuration = (productId: string, duration: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, estimatedDuration: duration } : item
      )
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const isInBasket = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QuoteBasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateDuration,
        clearBasket,
        isInBasket,
        totalCount,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  );
};

export const useQuoteBasket = () => {
  const context = useContext(QuoteBasketContext);
  if (!context) {
    throw new Error("useQuoteBasket debe utilizarse dentro de un QuoteBasketProvider");
  }
  return context;
};

