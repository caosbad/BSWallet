import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import detector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
// const resources = {
//   en: {
//     translation: {
//       'Welcome to React': 'Welcome to React and react-i18next'
//     }
//   }
// };

i18n
  .use(XHR)
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'zh_CN',
    keySeparator: false, // we do not use keys in form messages.welcome
    react: {
      useSuspense: false //   <---- this will do the magic
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
      load: 'all',
    }
  });

export default i18n;
