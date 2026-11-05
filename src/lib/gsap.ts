"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

export const initGSAP = () => {
  if (typeof window === "undefined") return { gsap, ScrollTrigger: null };

  if (!isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }

  return { gsap, ScrollTrigger };
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

