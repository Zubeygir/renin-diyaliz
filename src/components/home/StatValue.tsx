"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatValueProps {
  value: string;
  countUp?: boolean;
  className?: string;
}

export function StatValue({ value, countUp, className }: StatValueProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const shouldAnimate = Boolean(countUp && target !== null);

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldAnimate ? 0 : target ?? value);

  useEffect(() => {
    if (!shouldAnimate || target === null) return;
    if (reduceMotion || !isInView) {
      if (reduceMotion) setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, shouldAnimate, target]);

  if (!shouldAnimate) {
    return (
      <span className={className} ref={ref}>
        {value}
      </span>
    );
  }

  return (
    <span className={className} ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
