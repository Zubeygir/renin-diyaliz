"use client";

import { motion } from "framer-motion";
import { fadeUpItem } from "@/components/ui/AnimateGroup";

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

// AnimateGroup'un stagger'ladığı liste öğeleri için tek tek kullanılır (bkz. docs/design-language.md).
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={fadeUpItem} className={className}>
      {children}
    </motion.div>
  );
}
