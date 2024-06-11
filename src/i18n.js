import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from '../public/locales/en/translation.json';
import translationRU from '../public/locales/ru/translation.json';
import translationKK from '../public/locales/kk/translation.json';
import translationKO from '../public/locales/ko/translation.json';
import translationBE from '../public/locales/be/translation.json';
import translationUK from '../public/locales/uk/translation.json';
import translationZH from '../public/locales/zh/translation.json';

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
