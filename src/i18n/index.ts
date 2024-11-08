import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationEn } from '@/src/i18n/translation-en';
import { translationUa } from '@/src/i18n/translation-ua';

export const resources = {
  en: {
    translation: translationEn,
  },
  ua: {
    translation: translationUa
  }
};

let lng = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
