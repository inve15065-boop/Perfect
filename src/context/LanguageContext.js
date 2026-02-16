import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

const translations = {
  en: {
    welcome: "Welcome",
    community: "Community Chat",
    ask: "Ask anything...",
    send: "Send",
    planReminder: "Your Learning Plan",
  },
  am: {
    welcome: "እንኳን ደህና መጣህ",
    community: "የማህበረሰብ ውይይት",
    ask: "ማንኛውንም ጥያቄ ጠይቅ...",
    send: "ላክ",
    planReminder: "የትምህርት እቅድዎ",
  },
  ti: {
    welcome: "እንቋዕ ደሓን መጻእኩም",
    community: "ኮሙኒቲ ቻት",
    ask: "ንጥቂ ጥያቄ ጠይቅ...",
    send: "ላክ",
    planReminder: "እቅድ ትምህርቲኻ",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
