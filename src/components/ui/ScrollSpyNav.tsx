"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollSpyNavItem {
  id: string;
  label: string;
}

export function ScrollSpyNav({ items }: { items: ScrollSpyNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-112px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="flex flex-col space-y-2">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "text-sm font-medium py-1 border-l-2 pl-2.5 -ml-2.5 transition-all",
              isActive
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground hover:translate-x-0.5 hover:border-primary"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
