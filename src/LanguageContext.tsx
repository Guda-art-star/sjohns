import React, { createContext, useContext } from "react";

type Language = "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (text: string) => text,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const t = (text: string) => text;
  const setLanguage = () => {};

  return (
    <LanguageContext.Provider value={{ language: "en", setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
