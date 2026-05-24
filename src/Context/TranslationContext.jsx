import { useTranslation } from "react-i18next";
import { useContext, createContext, useEffect } from "react";

const TranslationContext = createContext();

export default function TranslationProvider({ children }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <TranslationContext.Provider value={{ t, i18n }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslations = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslations must be used within a TranslationProvider");
  }
  return context;
};
