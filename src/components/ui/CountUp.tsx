"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

/**
 * "50+1", "2000" gibi değerlerdeki baştaki sayıyı 0'dan hedefe sayarak animasyonlar,
 * geri kalan eki ("+1" gibi) sabit bırakır. "SKS" gibi sayısal olmayan değerlerde
 * animasyon uygulanmaz, değer olduğu gibi gösterilir.
 */
export function CountUp({ value, duration = 1.2, className }: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(target ?? 0);

  useEffect(() => {
    if (target === null || !isInView) return;
    if (shouldReduceMotion) {
      setDisplay(target);
      return;
    }

    setDisplay(0);
    const start = performance.now();
    const durationMs = duration * 1000;
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, shouldReduceMotion, target, duration]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
