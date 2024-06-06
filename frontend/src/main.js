// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import './style.css'

const messages = {
  en: {
    myKvk: 'My KVK',
    depositYourAnnual: 'Deposit your annual accounts or request your identification details of legal entities for your Organization Wallet.',
    loginWithDigiD: 'Log in with DigiD Hoog',
    moreInformation: 'More information',
    organizationWallet: 'Organization Wallet',
    requestKvKAttestations: 'Request KVK attestations for your Organization Wallet.',
    loginWithEUWallet: 'Log in with EU Wallet',
    language: 'English',
    login: 'Log in',
    search: 'Search',
    current: 'Current',
    entrepreneurship: 'Entrepreneurship',
    register: 'Register',
    helpContact: 'Help & Contact',
    popupTitle: 'Logging in with following details:',
    popupSubtitle: 'These 3 fields below should be replaced with NP wallet authentication flow',
    familyName: 'Family name:',
    name: 'Name:',
    birthdate: 'Birthdate:',
    cancel: 'Cancel',
    kvkNumber: 'KVK number:',
  },
  nl: {
    myKvk: 'Mijn KVK',
    depositYourAnnual: 'Deponeer uw jaarrekening of vraag uw identificatiegegevens van rechtspersonen aan voor uw Organisatie Wallet aan.',
    loginWithDigiD: 'Log in met DigiD Hoog',
    moreInformation: 'Meer informatie',
    organizationWallet: 'Organisatie Wallet',
    requestKvKAttestations: 'Vraag KVK attesties op voor in uw Organisatie Wallet.',
    loginWithEUWallet: 'Log in met EU Wallet',
    language: 'Nederlands',
    login: 'Inloggen',
    search: 'Zoeken',
    current: 'Actueel',
    entrepreneurship: 'Ondernemen',
    register: 'Handelsregister',
    helpContact: 'Hulp & Contact',
    popupTitle: 'Inloggen met de volgende gegevens:',
    popupSubtitle: 'Deze 3 velden hieronder moet worden vervangen door NP wallet-authenticatiestroom',
    familyName: 'Achternaam:',
    name: 'Naam:',
    birthdate: 'Geboortedatum:',
    cancel: 'Annuleren',
    kvkNumber: 'KVK nummer:',
  }
}

const i18n = createI18n({
  locale: 'nl',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
