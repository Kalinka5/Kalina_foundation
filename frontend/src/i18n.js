import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationUA from "./locales/ua/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
};

const savedLanguage = localStorage.getItem("i18nextLng") || "ua"; // Get saved language or default to 'ua'

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Initialize with the saved language
  fallbackLng: "ua",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
