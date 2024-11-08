'use client';
import { ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const languageMap: Record<string, string> = {
  en: '🇺🇸',
  ua: '🇺🇦',
};

export const ButtonLanguage = (): ReactElement => {
  const { i18n } = useTranslation();
  
  const switchLanguage = useCallback(() => {
    const isEng = i18n.language === 'en';
    const newLang = isEng ? 'ua' : 'en';
    
    void i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  }, [i18n]);
  
  return (
    <div
      className="select-none px-6 hover:animate-pulse py-4  flex justify-center items-center cursor-pointer"
      onClick={switchLanguage}
    >
      <span className="text-heading-two">
        {languageMap[i18n.language]}
      </span>
    </div>
  );
};
