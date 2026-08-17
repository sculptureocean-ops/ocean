import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export function SeoHead() {
  const { language } = useLanguage();

  useEffect(() => {
    // 1. Update HTML lang attribute
    document.documentElement.lang = language;

    // 2. Update dynamic document title
    if (language === "hi") {
      document.title = "ओशियन स्कल्पचर (oceansculpture) | महिला स्वास्थ्य, सर्वाइकल कैंसर जागरूकता और रोकथाम";
    } else {
      document.title = "OCEAN SCULPTURE (oceansculpture.co) | Empowering Women's Healthcare & Cervical Cancer Prevention";
    }

    // 3. Update dynamic meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (language === "hi") {
        metaDescription.setAttribute(
          "content",
          "ओशियन स्कल्पचर और सशक्त फाउंडेशन के सहयोग से महिलाओं को सर्वाइकल कैंसर जागरूकता, शीघ्र जांच (Screening), फ्री मेडिकल कैंप और एचपीवी टीकाकरण के माध्यम से सशक्त बनाया जा रहा है।"
        );
      } else {
        metaDescription.setAttribute(
          "content",
          "OCEAN SCULPTURE in collaboration with Sashakti Foundation empowers women through cervical cancer awareness, early detection, free screening camps, HPV vaccination, and preventive healthcare."
        );
      }
    }
  }, [language]);

  return null;
}
