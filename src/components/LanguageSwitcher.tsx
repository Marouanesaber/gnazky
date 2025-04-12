
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { translations } from "@/utils/translations";

// Define TranslationKey type
export type TranslationKey = keyof typeof translations.en;

// Language type
export type Language = "en" | "zh";

// Create a context for language
interface LanguageContextType {
  language: Language;
  t: (key: TranslationKey) => string;
  changeLanguage: (newLanguage: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t: (key) => String(key),
  changeLanguage: () => {},
});

// Language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "zh"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use the language context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Flag SVG components
const USFlag = () => (
  <svg className="h-4 w-4 mr-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#f0f0f0"/>
    <g fill="#d80027">
      <rect width="512" height="39.4" y="39.4"/>
      <rect width="512" height="39.4" y="118.2"/>
      <rect width="512" height="39.4" y="196.9"/>
      <rect width="512" height="39.4" y="275.7"/>
      <rect width="512" height="39.4" y="354.5"/>
      <rect width="512" height="39.4" y="433.2"/>
    </g>
    <rect width="275.7" height="275.7" fill="#2e3560"/>
    <g fill="#f0f0f0">
      <path d="M38 66.8l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6H35z"/>
      <path d="M84.4 66.8l3.3 9.5H98l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M130.7 66.8l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6H128z"/>
      <path d="M177.1 66.8l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M223.5 66.8l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M61.2 91.6l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M107.6 91.6l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M154 91.6l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M200.3 91.6l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6h10.3z"/>
      <path d="M246.7 91.6l3.3 9.5h10.3l-8.4 6 3.3 9.5-8.4-6-8.4 6 3.3-9.5-8.4-6H244z"/>
    </g>
  </svg>
);

const CNFlag = () => (
  <svg className="h-4 w-4 mr-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#d80027"/>
    <g fill="#ffda44">
      <path d="M140.1 155.8l22.1 68h71.5l-57.8 42.1 22.1 68-57.9-42-57.9 42 22.2-68-57.9-42.1H118z"/>
      <path d="M303.5 219.2l-16.9 20.8-28-6.7 19.4 18.3-8.8 27.2 25.6-12.3 23 16-6.1-27.6 21-18-28.1 5.2z"/>
      <path d="M337.1 167.6l3 28.4-23.8 15.8 28.6 3.5 11.7 26.4 11.7-26.4 28.6-3.5-23.8-15.8 3-28.4-19.5 20.7z"/>
      <path d="M382.4 107.8l-1.9 21.1-18.8 10.5 20.8 5.1 7 20 12.5-17.9 21.1.6-14.2-16.2 6.2-20.3-19.3 11.7z"/>
      <path d="M304.2 54l7.7 23.1-15 19.2 24.5-1.7 14.3 19.7 3.8-24.2 22.7-9.2-22.2-10.2 1-24.6-17.3 17.5z"/>
    </g>
  </svg>
);

// Language switcher component
export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 font-montserrat">
          <Globe className="h-4 w-4" />
          <span>{language === "en" ? "English" : "中文"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")} className="flex items-center">
          <USFlag />
          <span className={language === "en" ? "font-bold" : ""}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("zh")} className="flex items-center">
          <CNFlag />
          <span className={language === "zh" ? "font-bold" : ""}>中文</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
