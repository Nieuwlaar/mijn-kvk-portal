<template>
  <div class="min-h-full">
    <NavigationBar />
    <div class="bg-gray-100 h-1"></div>
    <div class="py-10">
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ t('myKvk') }}</h1>
        <p class="mt-2 text-gray-600">{{ t('welcomeMessage') }}</p>
        <div class="mt-8">
          <div class="mt-4">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">{{ organisationName }}</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ organisationDetails }}</p>
              </div>
              <div class="border-t border-gray-200">
                <dl>
                  <div v-if="showDetails" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">{{ t('activities') }}</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ activityDetails }}</dd>
                  </div>
                  <div v-if="showDetails" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">{{ t('visitAddress') }}</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ addressDetails }}</dd>
                  </div>
                  <div v-if="showDetails" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">{{ t('phoneNumber') }}</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ phoneDetails }}</dd>
                  </div>
                  <div class="bg-white px-4 py-5 sm:px-6">
                    <a href="#" @click.prevent="toggleDetails" class="text-indigo-600 hover:text-indigo-900">
                      {{ showDetails ? t('viewLessDetails') : t('viewAllDetails') }}
                    </a>
                  </div>

                </dl>
              </div>
            </div>
            <div class="mt-4 bg-white px-4 py-5 sm:px-6">
              <h3 class="text-xl mb-4 leading-6 font-medium text-gray-900">{{ t('personalWallet') }}</h3>
              <label for="personalWallet" class="block text-sm text-sm text-gray-500">{{ t('choosePersonalWallet') }}</label>
              <div class="mt-3 flex items-center">
                <select id="personalWallet" v-model="selectedPersonalWallet" class="bloc border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style="width: 25ch;">
                  <option value="RDW">RDW NiScy</option>
                  <option value="NLWallet">NL Wallet</option>
                </select>

                <button
                  @click="redirectToPersonalWallet"
                  class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ t('createPersonalWallet') }}
                </button>
              </div>
            </div>
            <div class="mt-4 bg-white px-4 py-5 sm:px-6">
              <h3 class="text-xl mb-4 leading-6 font-medium text-gray-900">{{ t('organizationalWallet') }}</h3>
              <label for="wallet" class="block text-sm text-sm text-gray-500">{{ t('chooseWallet') }}</label>
              <div class="mt-3 flex items-center">
                <select id="wallet" v-model="selectedWallet" class="bloc border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" style="width: 25ch;">
                  <option value="OrgWallet">OrgWallet</option>
                  <option value="Gimly">Gimly</option>
                  <option value="Archipels">Archipels</option>
                  <option value="MiniSuomi">MiniSuomi</option>
                </select>

                <button
                  @click="redirectToWallet"
                  class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {{ t('createOrganizationalWallet') }}
                </button>
              </div>
              <!-- <p class="mt-2 text-indigo-600 hover:text-indigo-900 cursor-pointer" @click="showConnectWalletPopup">{{ t('alreadyHaveWallet') }}</p> -->
              <!-- <div>
                  <button @click="issueLPID" class="mt-4 bg-blue-500 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded">{{  t('LottesKnop') }}</button>
              </div> -->
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

    <MiniSuomiDialog 
      v-if="isMiniSuomiDialogVisible" 
      :kvkNumber="kvkNumber"
      @close="hideMiniSuomiDialog"
    />

    <RdwNiscyDialog 
      v-if="isRdwNiscyDialogVisible && bevoegdheidUittreksel" 
      :kvkNumber="kvkNumber"
      :legalName="bevoegdheidUittreksel.legal_person_name"
      @close="hideRdwNiscyDialog"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavigationBar from '@/components/NavigationBar.vue'
import MiniSuomiDialog from '@/components/MiniSuomiDialog.vue'
import RdwNiscyDialog from '@/components/RdwNiscyDialog.vue'

const { t } = useI18n({
  messages: {
    en: {
      myKvk: 'My KVK',
      welcomeMessage: 'You are logged into My KVK. Below you see the organizations where you fulfill a role and the details of the organizations.',
      activities: 'Activities',
      visitAddress: 'Visit Address',
      phoneNumber: 'Phone Number',
      viewAllDetails: 'View all details',
      viewLessDetails: 'View less details',
      chooseWallet: 'Choose an organizational wallet to issue credentials to',
      createOrganizationalWallet: 'Issue Credentials',
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
      LottesKnop: 'Issue LPID',
      personalWallet: 'Personal wallet',
      choosePersonalWallet: 'Choose a personal wallet to issue credentials to',
      createPersonalWallet: 'Issue Credentials',
    },
    nl: {
      myKvk: 'Mijn KVK',
      welcomeMessage: 'Je bent ingelogd bij Mijn KVK. Hieronder zie je de organisaties waar je een functie vervult en de gegevens van de organisaties.',
      activities: 'Bedrijfsactiviteiten',
      visitAddress: 'Bezoekadres',
      phoneNumber: 'Telefoonnummer',
      viewAllDetails: 'Inzien alle gegevens',
      viewLessDetails: 'Laat minder zien',
      chooseWallet: 'Kies een organisatie wallet om credentials naar te sturen',
      createOrganizationalWallet: 'Credentials uitgeven',
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
      LottesKnop: 'Uitgifte LPID',
      personalWallet: 'Persoonlijke wallet',
      choosePersonalWallet: 'Kies een persoonlijke wallet om credentials naar te sturen',
      createPersonalWallet: 'Credentials uitgeven',
    }
  }
})

const jwtToken = ref('')
const kvkNumber = ref('')
const route = useRoute();
const selectedWallet = ref('OrgWallet')
const isCreateWalletPopupVisible = ref(false)
const isConnectWalletPopupVisible = ref(false)
const walletUrl = ref('')
const isMiniSuomiDialogVisible = ref(false)
const isRdwNiscyDialogVisible = ref(false)
const lpidUrl = ref('http://example.com/lpid')  // Replace with actual URL
const certificateUrl = ref('http://example.com/certificate')  // Replace with actual URL
const selectedPersonalWallet = ref('RDW')

// Add a ref for bevoegdheidUittreksel
const bevoegdheidUittreksel = ref(null)

const redirectToWallet = async () => {
  console.log('redirectToWallet called');
  console.log('Selected wallet:', selectedWallet.value);

  if (selectedWallet.value === 'OrgWallet') {
    console.log('OrgWallet selected');
    await issueAttestation('LPID');
    await issueAttestation('EUCC');
    window.open('http://localhost:5174/authorize', '_blank');
  } else if (selectedWallet.value === 'Archipels') {
    console.log('Archipels selected');
    window.open('https://app.archipels.io', '_blank');
  } else if (selectedWallet.value === 'MiniSuomi') {
    console.log('MiniSuomi selected');
    isMiniSuomiDialogVisible.value = true;
  } else {
    console.log('Gimly selected');
    window.open('https://wallet-api.dev.gimly.io/issue', '_blank');
  }
}

const issueAttestation = async (attestationType) => {
  try {
    // Determine the correct endpoint based on the attestation type
    const endpoint = attestationType === 'LPID' 
      ? '/issue-attestation/lpid' 
      : '/issue-attestation/eucc';

    const response = await fetch(`https://kvk-issuance-service.nieuwlaar.com/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        attestation_type: attestationType,  // Send the attestation type ('LPID' or 'EUCC')
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to issue ${attestationType}: ${response.statusText}`);
    }

    console.log(`${attestationType} issued successfully`);
  } catch (error) {
    console.error(`Error issuing ${attestationType}:`, error);
  }
}


// New reactive properties for the organisation details
const organisationName = ref('')
const organisationDetails = ref('')
const activityDetails = ref('')
const addressDetails = ref('')
const phoneDetails = ref('')

// State to control the visibility of the additional details
const showDetails = ref(false)

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
  console.log('Validating wallet with URL:', walletUrl.value)
  hideConnectWalletPopup()
}

// Function to toggle the visibility of the additional details
const toggleDetails = () => {
  event.preventDefault();
  showDetails.value = !showDetails.value
}

const hideMiniSuomiDialog = () => {
  isMiniSuomiDialogVisible.value = false
}

const hideRdwNiscyDialog = () => {
  isRdwNiscyDialogVisible.value = false
}

const redirectToPersonalWallet = async () => {
  console.log('redirectToPersonalWallet called');
  console.log('Selected personal wallet:', selectedPersonalWallet.value);

  if (selectedPersonalWallet.value === 'RDW') {
    console.log('RDW NiScy selected');
    isRdwNiscyDialogVisible.value = true;
  } else if (selectedPersonalWallet.value === 'NLWallet') {
    console.log('NL Wallet selected');
    // Add NL Wallet specific logic here
  }
}

onMounted(async () => {
  kvkNumber.value = route.query.kvkNumber;
  console.log('KVK number:', kvkNumber.value);
  const data = ref(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://kvk-issuance-service.nieuwlaar.com/bevoegdheid/company-certificate/${kvkNumber.value}`);
      if (response.ok) {
        const fetchedData = await response.json();
        data.value = fetchedData; // Update the reactive state
        console.log('Data received:', fetchedData);
        // Store the bevoegdheidUittreksel data
        bevoegdheidUittreksel.value = fetchedData.data;
      } else {
        console.error('Failed to fetch data from the backend.');
      }
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
    }
  };
  await fetchData();

  if (bevoegdheidUittreksel.value) {
    // Update the reactive properties with the received data
    organisationName.value = bevoegdheidUittreksel.value.legal_person_name;
    organisationDetails.value = `KVK number: ${bevoegdheidUittreksel.value.registration_number}`;
    activityDetails.value = `SBI code: ${bevoegdheidUittreksel.value.object}`;
    addressDetails.value = bevoegdheidUittreksel.value.postal_address;
    phoneDetails.value = bevoegdheidUittreksel.value.electronic_address;
  }
  await createWallet();
});
const createWallet = async () => {
  try {
    // Step 1: Fetch the JWT token
    console.log('Fetching JWT token for organization:', kvkNumber.value);
    const jwtResponse = await fetch(`https://kvk-issuance-service.nieuwlaar.com/${kvkNumber.value}/jwt_token`);
    if (!jwtResponse.ok) {
      throw new Error('Failed to fetch JWT token');
    }
    console.log('JWT token response:', jwtResponse);
    const jwtData = await jwtResponse.json();
    console.log('JWT data:', jwtData);
    jwtToken.value = jwtData[0];
    console.log('JWT token received:', jwtToken);
    // Step 2: Use the JWT token in the POST request
    // console.log('Creating wallet for organization:', selectedWallet.value);
    // const createWalletRequest = new XMLHttpRequest();
    // createWalletRequest.open('POST', 'https://wallet-api.dev.gimly.io/issue', false);
    // createWalletRequest.setRequestHeader('Content-Type', 'application/json');
    // createWalletRequest.setRequestHeader('jwt', jwtToken);

    // createWalletRequest.send();

    if (createWalletRequest.status !== 200) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error creating wallet:', error);
  }
};
</script>
