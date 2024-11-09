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
    void i18n.changeLanguage(i18n.language === 'en' ? 'ua' : 'en');
  }, [i18n]);

  return (
    <div
      className="select-none  md:py-4 flex justify-center px-6 items-center cursor-pointer"
      onClick={switchLanguage}
    >
      <span className="text-heading-three">
        {languageMap[i18n.language]}
      </span>
    </div>
  );
};
