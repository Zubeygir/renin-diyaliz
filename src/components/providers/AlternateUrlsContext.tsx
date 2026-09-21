"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AlternateUrls = {
  tr?: string | null;
  en?: string | null;
  de?: string | null;
  ar?: string | null;
};

type AlternateUrlsContextType = {
  alternateUrls: AlternateUrls;
  setAlternateUrls: (urls: AlternateUrls) => void;
};

const AlternateUrlsContext = createContext<AlternateUrlsContextType>({
  alternateUrls: {},
  setAlternateUrls: () => {},
});

export function AlternateUrlsProvider({ children }: { children: ReactNode }) {
  const [alternateUrls, setAlternateUrls] = useState<AlternateUrls>({});

  return (
    <AlternateUrlsContext.Provider value={{ alternateUrls, setAlternateUrls }}>
      {children}
    </AlternateUrlsContext.Provider>
  );
}

export function useAlternateUrls() {
  return useContext(AlternateUrlsContext);
}

export function SetAlternateUrls({ tr, en, de, ar }: AlternateUrls) {
  const { setAlternateUrls } = useAlternateUrls();

  useEffect(() => {
    setAlternateUrls({ tr, en, de, ar });
    return () => {
      setAlternateUrls({ tr: null, en: null, de: null, ar: null });
    };
  }, [tr, en, de, ar, setAlternateUrls]);

  return null;
}
