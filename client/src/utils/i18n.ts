import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//@ts-ignore
i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: localStorage.getItem("i18nextLng") || "en",
    fallBackLng: "en",
    whiteliste: ["en", "fr", "de"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}",
    },
  });

export default i18n;
