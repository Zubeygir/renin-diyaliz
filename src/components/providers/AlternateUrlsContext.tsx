"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AlternateUrls = {
  tr?: string | null;
  en?: string | null;
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

export function SetAlternateUrls({ tr, en }: AlternateUrls) {
  const { setAlternateUrls } = useAlternateUrls();

  useEffect(() => {
    setAlternateUrls({ tr, en });
    return () => {
      setAlternateUrls({ tr: null, en: null });
    };
  }, [tr, en, setAlternateUrls]);

  return null;
}
