import { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // "en", "am", "ti"

  const translate = (textObj) => {
    // textObj example: { en: "Hello", am: "ሰላም", ti: "ሰላም" }
    return textObj[language] || textObj.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
