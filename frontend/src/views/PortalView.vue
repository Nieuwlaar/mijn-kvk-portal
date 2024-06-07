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
              <div class="bg-white px-4 py-5 sm:px-6">
                <h3 class="text-xl mb-4 leading-6 font-medium text-gray-900">{{ t('organizationalWallet') }}</h3>
                <label for="wallet" class="block text-sm font-medium text-gray-700">{{ t('chooseWallet') }}</label>
                <select id="wallet" v-model="selectedWallet" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="Gimly">Gimly</option>
                  <option value="Archipels">Archipels</option>
                </select>
                <button @click="showCreateWalletPopup" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{{ t('createOrganizationalWallet') }}</button>
                <p class="mt-4 text-gray-600">{{ t('alreadyHaveWallet') }}</p>
                <button @click="showConnectWalletPopup" class="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{{ t('connectExistingWallet') }}</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isCreateWalletPopupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ t('organizationalWallet') }}</h2>
          <p class="mt-2 text-gray-600">{{ t('createWalletFlow') }}</p>
        </div>
        <div class="px-6 py-4 flex justify-center">
          <button @click="hideCreateWalletPopup" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{{ t('close') }}</button>
        </div>
      </div>
    </div>

    <div v-if="isConnectWalletPopupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ t('connectWalletTitle') }}</h2>
          <p class="mt-2 text-gray-600">{{ t('connectWalletSubtitle') }}</p>
          <div class="mt-4">
            <label for="walletUrl" class="mb-4 block text-sm font-medium text-gray-700">{{ t('walletUrl') }}</label>
            <input v-model="walletUrl" id="walletUrl" type="text" class="w-full px-4 py-2 border rounded-md" />
          </div>
        </div>
        <div class="px-6 py-4 flex justify-center">
          <button @click="validateWallet" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">{{ t('validate') }}</button>
          <button @click="hideConnectWalletPopup" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{{ t('cancel') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
      chooseWallet: 'Choose an organizational wallet',
      createOrganizationalWallet: 'Create organizational wallet',
      connectExistingWallet: 'Connect existing organizational wallet',
      alreadyHaveWallet: 'Already have an organizational wallet?',
      organizationalWallet: 'Organizational wallet',
      createWalletFlow: 'The create organizational wallet flow at Gimly should now be initialized.',
      connectWalletTitle: 'Connect your organizational wallet',
      connectWalletSubtitle: 'We have to connect your installed organizational wallet with our data to activate the wallet. Please provide below\'s information to validate your organizational wallet:',
      walletUrl: 'URL to organizational wallet:',
      validate: 'Validate wallet',
      close: 'Close',
      cancel: 'Cancel',
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
      chooseWallet: 'Kies een organisatie wallet',
      createOrganizationalWallet: 'Maak organisatie wallet aan',
      connectExistingWallet: 'Verbind bestaande organisatie wallet',
      alreadyHaveWallet: 'Heeft u al een organisatie wallet?',
      organizationalWallet: 'Organisatie wallet',
      createWalletFlow: 'De aanmaak van de organisatie wallet bij Gimly zou nu moeten starten.',
      connectWalletTitle: 'Verbind uw organisatie wallet',
      connectWalletSubtitle: 'We moeten uw geïnstalleerde organisatie wallet met onze gegevens verbinden om de wallet te activeren. Geef hieronder de informatie op om uw organisatie wallet te valideren:',
      walletUrl: 'URL naar organisatie wallet:',
      validate: 'Valideer wallet',
      close: 'Sluiten',
      cancel: 'Annuleren',
    }
  }
})

const selectedWallet = ref('Gimly')
const isCreateWalletPopupVisible = ref(false)
const isConnectWalletPopupVisible = ref(false)
const walletUrl = ref('')

const showCreateWalletPopup = () => {
  isCreateWalletPopupVisible.value = true
}

const hideCreateWalletPopup = () => {
  isCreateWalletPopupVisible.value = false
}

const showConnectWalletPopup = () => {
  isConnectWalletPopupVisible.value = true
}

const hideConnectWalletPopup = () => {
  isConnectWalletPopupVisible.value = false
}

const validateWallet = () => {
  // Add your validation logic here
  console.log('Validating wallet with URL:', walletUrl.value)
  hideConnectWalletPopup()
}
</script>
