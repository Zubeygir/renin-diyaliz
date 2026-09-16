"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { JsonLd, faqPageJsonLd } from "@/components/seo/JsonLd";

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items, className = "" }: { items: FAQItem[], className?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Automate FAQPage Structured Data injection */}
      <JsonLd data={faqPageJsonLd(items)} />

      <div className={`divide-y divide-border border-b border-border ${className}`}>
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left transition-colors group cursor-pointer"
              aria-expanded={activeIndex === index}
            >
              <span className="font-heading text-base sm:text-lg font-medium text-foreground pr-4 group-hover:text-primary transition-colors">
                {item.question}
              </span>
              <div className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                {activeIndex === index ? (
                  <RiSubtractLine size={20} />
                ) : (
                  <RiAddLine size={20} />
                )}
              </div>
            </button>
            
            {/* DOM-persistent & Pure-CSS/Motion-transitioned for full search indexing */}
            <motion.div
              initial={false}
              animate={{ 
                height: activeIndex === index ? "auto" : 0
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-5 pt-1 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-[70ch]">
                {item.answer}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
}
