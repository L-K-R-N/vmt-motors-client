import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from '../src/locales/en/translation.json';
import translationRU from '../src/locales/ru/translation.json';
import translationKK from '../src/locales/kk/translation.json';
import translationKO from '../src/locales/ko/translation.json';
import translationBE from '../src/locales/be/translation.json';
import translationUK from '../src/locales/uk/translation.json';
import translationZH from '../src/locales/zh/translation.json';

const resources = {
   en: {
      translation: translationEN,
   },
   be: {
      translation: translationBE,
   },
   ru: {
      translation: translationRU,
   },
   kk: {
      translation: translationKK,
   },
   ko: {
      translation: translationKO,
   },
   zh: {
      translation: translationZH,
   },
   uk: {
      translation: translationUK,
   },
};

i18next
   .use(HttpBackend)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      resources,
      fallbackLng: 'en',
      debug: true,
      detection: {
         order: ['queryString', 'cookie'],
         cache: ['cookie'],
      },
      interpolation: {
         excapeValue: false,
      },
   });
