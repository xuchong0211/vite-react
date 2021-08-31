import React from "react";
import { LOCALES } from "../../i18n/locales";
import intl from "react-intl-universal";

export type localeTypes = {
  locale: string | undefined;
  setLocale: (currentLocale: string) => void;
};

const Context = React.createContext<localeTypes | undefined>(undefined);

function AppLocaleProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [locale, setLocale] = React.useState<string | undefined>(undefined);
  const value = { locale, setLocale };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useLocale(): localeTypes {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  const { locale, setLocale } = context;

  const updateLocale = (currentLocale: string) => {
    intl
      .init({
        currentLocale,
        locales: LOCALES,
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        console.log("update locale in hook===========", currentLocale);
        setLocale(currentLocale);
      });
  };

  return { locale, setLocale: updateLocale };
}

export { AppLocaleProvider, useLocale };
