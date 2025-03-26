
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

// Simple language context to be expanded with proper i18n library as needed
export type Language = "en" | "zh";

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.lang = newLanguage;
    
    // Reload the page to apply language changes
    // In a real implementation, this would use a proper i18n library
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{language === "en" ? "English" : "中文"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <span className={language === "en" ? "font-bold" : ""}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("zh")}>
          <span className={language === "zh" ? "font-bold" : ""}>中文</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
