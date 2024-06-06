<template>
    <div class="min-h-full">
      <NavigationBar />
      <div class="bg-gray-100 h-1"></div>
      <div class="py-10">
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">{{ t('myKvk') }}</h1>
          <p class="mt-2 text-gray-600">{{ t('welcomeMessage') }}</p>
          <div class="mt-8">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('organisations') }}</h2>
            <div class="mt-4">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">{{ t('organisationName') }}</h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ t('organisationDetails') }}</p>
                </div>
                <div class="border-t border-gray-200">
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">{{ t('activities') }}</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ t('activityDetails') }}</dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">{{ t('visitAddress') }}</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ t('addressDetails') }}</dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">{{ t('phoneNumber') }}</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ t('phoneDetails') }}</dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:px-6">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">{{ t('viewAllDetails') }}</a>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  import NavigationBar from '@/components/NavigationBar.vue'
  
  const { t } = useI18n({
    messages: {
      en: {
        myKvk: 'My KVK',
        welcomeMessage: 'You are logged into My KVK. Below you see the organizations where you fulfill a role and the details of the organizations.',
        organisations: 'Organisations',
        organisationName: 'Nieuwlaar Engineering',
        organisationDetails: 'KVK number: 70123101, Function(s): Owner',
        activities: 'Activities',
        activityDetails: 'SBI code: 6201, Developing, producing, and publishing software',
        visitAddress: 'Visit Address',
        addressDetails: 'Oudegracht 61 G, 3511AD Utrecht',
        phoneNumber: 'Phone Number',
        phoneDetails: '(+31) 0645957523',
        viewAllDetails: 'View all details',
      },
      nl: {
        myKvk: 'Mijn KVK',
        welcomeMessage: 'Je bent ingelogd bij Mijn KVK. Hieronder zie je de organisaties waar je een functie vervult en de gegevens van de organisaties.',
        organisations: 'Organisaties',
        organisationName: 'Nieuwlaar Engineering',
        organisationDetails: 'KVK-nummer: 70123101, Functie(s): Eigenaar',
        activities: 'Bedrijfsactiviteiten',
        activityDetails: 'SBI code: 6201, Ontwikkelen, produceren en uitgeven van software',
        visitAddress: 'Bezoekadres',
        addressDetails: 'Oudegracht 61 G, 3511AD Utrecht',
        phoneNumber: 'Telefoonnummer',
        phoneDetails: '(+31) 0645957523',
        viewAllDetails: 'Inzien alle gegevens',
      }
    }
  })
  </script>